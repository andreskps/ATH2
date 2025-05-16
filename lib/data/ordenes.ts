import type { Cliente } from "@/lib/types"
import { getClientes } from "@/lib/data/clientes"
import { verificarYReservarStock } from "@/lib/data/inventario"

// Tipos para el módulo de órdenes
export interface OrdenProducto {
  id: number
  productoId: string
  nombre: string
  cantidad: number
  precio: number
  subtotal: number
  observaciones?: string
  // Nuevos campos para gestión de stock
  cantidadInventario: number
  cantidadProduccion: number
  estadoStock: "inventario" | "produccion" | "mixto"
  historialStock: StockHistorialItem[]
}

export interface StockHistorialItem {
  id: number
  fecha: string
  usuario: string
  accion: string
  cantidadInventario: number
  cantidadProduccion: number
  comentario?: string
}

export interface CambioEstado {
  id: number
  fecha: string
  estadoAnterior: string
  estadoNuevo: string
  usuario: string
  comentario?: string
}

export interface Comentario {
  id: number
  fecha: string
  usuario: string
  texto: string
}

// Actualizar la interfaz Orden para incluir el campo cotizacionPdf
export interface Orden {
  id: number
  codigo: string
  clienteId: number
  cliente?: Cliente
  fechaCreacion: string
  fechaEntrega?: string
  productos: OrdenProducto[]
  subtotal: number
  descuento: number
  impuestos: number
  total: number
  estado: string
  formaPago: string
  historialEstados: CambioEstado[]
  comentarios: Comentario[]
  creadorId: number
  creador: string
  maquinaAsignada?: string
  fechaInicioProd?: string
  fechaFinProd?: string
  // Nuevos campos para resumen de stock
  requiereProduccion: boolean
  resumenStock: {
    totalProductos: number
    productosInventario: number
    productosProduccion: number
    productosMixtos: number
  }
  // Nuevo campo para almacenar la referencia al PDF de cotización
  cotizacionPdf?: string
}

// Estados de las órdenes
export const estadosOrden = {
  ordenAbierta: {
    label: "Orden Abierta",
    color: "bg-blue-100 text-blue-800",
    description: "Orden creada, pendiente de aprobación",
    icon: "FileEdit",
  },
  pendientePago: {
    label: "Pendiente de Pago",
    color: "bg-yellow-100 text-yellow-800",
    description: "Esperando confirmación del pago",
    icon: "CreditCard",
  },
  liberadaProduccion: {
    label: "Liberada para Producción",
    color: "bg-green-100 text-green-800",
    description: "Pago confirmado, lista para producción",
    icon: "CheckCircle",
  },
  enProduccion: {
    label: "En Producción",
    color: "bg-indigo-100 text-indigo-800",
    description: "Actualmente en proceso de producción",
    icon: "Factory",
  },
  productoTerminado: {
    label: "Producto Terminado",
    color: "bg-purple-100 text-purple-800",
    description: "Producción finalizada, pendiente de cierre técnico",
    icon: "CheckSquare",
  },
  cierreTecnico: {
    label: "Cierre Técnico",
    color: "bg-teal-100 text-teal-800",
    description: "Verificación técnica completada",
    icon: "ClipboardCheck",
  },
  facturadoEntregado: {
    label: "Facturado/Entregado",
    color: "bg-emerald-100 text-emerald-800",
    description: "Orden facturada y entregada al cliente",
    icon: "Package",
  },
  molido: {
    label: "Molido",
    color: "bg-red-100 text-red-800",
    description: "Producto con defectos de calidad o en reproceso",
    icon: "Recycle",
  },
  devolucion: {
    label: "Devolución",
    color: "bg-amber-100 text-amber-800",
    description: "Productos devueltos por el cliente",
    icon: "RotateCcw",
  },
  cancelada: {
    label: "Cancelada",
    color: "bg-red-100 text-red-800",
    description: "Orden cancelada",
    icon: "XCircle",
  },
}

// Definir las transiciones permitidas para cada estado
export const transicionesEstado = {
  ordenAbierta: [
    { estado: "pendientePago", label: "Enviar a pendiente de pago", roles: ["comercial", "admin"] },
    { estado: "cancelada", label: "Cancelar orden", roles: ["comercial", "admin"] },
  ],
  pendientePago: [
    { estado: "liberadaProduccion", label: "Aprobar pago", roles: ["finanzas", "admin"] },
    { estado: "ordenAbierta", label: "Volver a orden abierta", roles: ["finanzas", "admin"] },
    { estado: "cancelada", label: "Cancelar orden", roles: ["finanzas", "comercial", "admin"] },
  ],
  liberadaProduccion: [
    { estado: "enProduccion", label: "Iniciar producción", roles: ["produccion", "admin"] },
    { estado: "pendientePago", label: "Volver a pendiente de pago", roles: ["finanzas", "admin"] },
    { estado: "cancelada", label: "Cancelar orden", roles: ["produccion", "admin"] },
  ],
  enProduccion: [
    { estado: "productoTerminado", label: "Finalizar producción", roles: ["produccion", "admin"] },
    { estado: "molido", label: "Enviar a molido", roles: ["produccion", "calidad", "admin"] },
    { estado: "liberadaProduccion", label: "Volver a liberada", roles: ["produccion", "admin"] },
  ],
  productoTerminado: [
    { estado: "cierreTecnico", label: "Realizar cierre técnico", roles: ["calidad", "admin"] },
    { estado: "molido", label: "Enviar a molido", roles: ["calidad", "admin"] },
    { estado: "enProduccion", label: "Volver a producción", roles: ["produccion", "admin"] },
  ],
  cierreTecnico: [
    { estado: "facturadoEntregado", label: "Facturar y entregar", roles: ["comercial", "finanzas", "admin"] },
    { estado: "productoTerminado", label: "Volver a producto terminado", roles: ["calidad", "admin"] },
  ],
  facturadoEntregado: [
    { estado: "devolucion", label: "Registrar devolución", roles: ["comercial", "logistica", "admin"] },
  ],
  molido: [
    { estado: "enProduccion", label: "Volver a producción", roles: ["produccion", "admin"] },
    { estado: "cancelada", label: "Cancelar orden", roles: ["produccion", "admin"] },
  ],
  devolucion: [
    { estado: "enProduccion", label: "Reprocesar", roles: ["produccion", "admin"] },
    { estado: "molido", label: "Enviar a molido", roles: ["produccion", "admin"] },
    { estado: "cancelada", label: "Cancelar orden", roles: ["comercial", "admin"] },
  ],
  cancelada: [],
}

// Formas de pago disponibles
export const formasPago = {
  anticipo: "Anticipo",
  credito: "Crédito",
  contado: "Contado",
  transferencia: "Transferencia bancaria",
  tarjeta: "Tarjeta de crédito/débito",
  cheque: "Cheque",
}

// Datos de ejemplo para órdenes
const ordenesData: Orden[] = [
  {
    id: 101,
    codigo: "OV-2023-101",
    clienteId: 1,
    cliente: { id: 1, nombre: "Industrias Plásticas ABC", nit: "900123456-7" },
    fechaCreacion: "2023-12-01",
    fechaEntrega: "2023-12-20",
    productos: [
      {
        id: 201,
        productoId: "1",
        nombre: "Botella PET 500ml",
        cantidad: 8000,
        precio: 750,
        subtotal: 6000000,
        cantidadInventario: 3000,
        cantidadProduccion: 5000,
        estadoStock: "mixto",
        historialStock: [],
      },
      {
        id: 202,
        productoId: "2",
        nombre: "Tapa rosca estándar",
        cantidad: 8000,
        precio: 300,
        subtotal: 2400000,
        cantidadInventario: 2000,
        cantidadProduccion: 6000,
        estadoStock: "mixto",
        historialStock: [],
      },
    ],
    subtotal: 8400000,
    descuento: 400000,
    impuestos: 1520000,
    total: 9520000,
    estado: "liberadaProduccion",
    formaPago: "anticipo",
    historialEstados: [],
    comentarios: [],
    creadorId: 3,
    creador: "Carlos Gómez",
    requiereProduccion: true,
    resumenStock: {
      totalProductos: 2,
      productosInventario: 0,
      productosProduccion: 0,
      productosMixtos: 2,
    },
  },
  {
    id: 102,
    codigo: "OV-2023-102",
    clienteId: 2,
    cliente: { id: 2, nombre: "Envases Industriales XYZ", nit: "901234567-8" },
    fechaCreacion: "2023-12-05",
    fechaEntrega: "2023-12-25",
    productos: [
      {
        id: 203,
        productoId: "3",
        nombre: "Contenedor rectangular 1L",
        cantidad: 5000,
        precio: 1200,
        subtotal: 6000000,
        cantidadInventario: 0,
        cantidadProduccion: 5000,
        estadoStock: "produccion",
        historialStock: [],
      },
    ],
    subtotal: 6000000,
    descuento: 0,
    impuestos: 1140000,
    total: 7140000,
    estado: "enProduccion",
    formaPago: "credito",
    historialEstados: [],
    comentarios: [],
    creadorId: 3,
    creador: "Carlos Gómez",
    maquinaAsignada: "Inyectora #2",
    fechaInicioProd: "2023-12-07T08:30:00",
    requiereProduccion: true,
    resumenStock: {
      totalProductos: 1,
      productosInventario: 0,
      productosProduccion: 1,
      productosMixtos: 0,
    },
  },
  {
    id: 1,
    codigo: "OV-2023-001",
    clienteId: 1,
    fechaCreacion: "2023-11-10",
    fechaEntrega: "2023-11-25",
    productos: [
      {
        id: 1,
        productoId: "1",
        nombre: "Botella PET 500ml",
        cantidad: 5000,
        precio: 750,
        subtotal: 3750000,
        observaciones: "Etiqueta personalizada según diseño adjunto",
        cantidadInventario: 3000,
        cantidadProduccion: 2000,
        estadoStock: "mixto",
        historialStock: [
          {
            id: 1,
            fecha: "2023-11-10T10:35:00",
            usuario: "Carlos Gómez",
            accion: "Verificación inicial de stock",
            cantidadInventario: 3000,
            cantidadProduccion: 2000,
            comentario: "Stock parcial disponible",
          },
        ],
      },
      {
        id: 2,
        productoId: "2",
        nombre: "Tapa rosca estándar",
        cantidad: 5000,
        precio: 300,
        subtotal: 1500000,
        cantidadInventario: 5000,
        cantidadProduccion: 0,
        estadoStock: "inventario",
        historialStock: [
          {
            id: 1,
            fecha: "2023-11-10T10:35:00",
            usuario: "Carlos Gómez",
            accion: "Verificación inicial de stock",
            cantidadInventario: 5000,
            cantidadProduccion: 0,
            comentario: "Stock completo disponible",
          },
        ],
      },
    ],
    subtotal: 5250000,
    descuento: 250000,
    impuestos: 950000,
    total: 5950000,
    estado: "enProduccion",
    formaPago: "anticipo",
    historialEstados: [
      {
        id: 1,
        fecha: "2023-11-10T10:30:00",
        estadoAnterior: "",
        estadoNuevo: "ordenAbierta",
        usuario: "Carlos Gómez",
      },
      {
        id: 2,
        fecha: "2023-11-11T14:20:00",
        estadoAnterior: "ordenAbierta",
        estadoNuevo: "pendientePago",
        usuario: "Carlos Gómez",
        comentario: "Enviada para aprobación de pago",
      },
      {
        id: 3,
        fecha: "2023-11-12T09:15:00",
        estadoAnterior: "pendientePago",
        estadoNuevo: "liberadaProduccion",
        usuario: "Ana Martínez",
        comentario: "Pago de anticipo confirmado",
      },
      {
        id: 4,
        fecha: "2023-11-13T08:30:00",
        estadoAnterior: "liberadaProduccion",
        estadoNuevo: "enProduccion",
        usuario: "Pedro Ramírez",
        comentario: "Iniciada producción en Inyectora #3",
      },
    ],
    comentarios: [
      {
        id: 1,
        fecha: "2023-11-10T15:45:00",
        usuario: "Carlos Gómez",
        texto: "Cliente solicita entrega urgente antes del 25 de noviembre",
      },
      {
        id: 2,
        fecha: "2023-11-12T10:30:00",
        usuario: "Ana Martínez",
        texto: "Se programó producción prioritaria para cumplir con fecha de entrega",
      },
    ],
    creadorId: 3,
    creador: "Carlos Gómez",
    maquinaAsignada: "Inyectora #3",
    fechaInicioProd: "2023-11-13T08:30:00",
    requiereProduccion: true,
    resumenStock: {
      totalProductos: 2,
      productosInventario: 1,
      productosProduccion: 0,
      productosMixtos: 1,
    },
  },
  {
    id: 2,
    codigo: "OV-2023-002",
    clienteId: 2,
    fechaCreacion: "2023-11-15",
    fechaEntrega: "2023-12-05",
    productos: [
      {
        id: 3,
        productoId: "3",
        nombre: "Contenedor rectangular 1L",
        cantidad: 3000,
        precio: 1200,
        subtotal: 3600000,
        cantidadInventario: 3000,
        cantidadProduccion: 0,
        estadoStock: "inventario",
        historialStock: [
          {
            id: 1,
            fecha: "2023-11-15T11:25:00",
            usuario: "Carlos Gómez",
            accion: "Verificación inicial de stock",
            cantidadInventario: 3000,
            cantidadProduccion: 0,
            comentario: "Stock completo disponible",
          },
        ],
      },
    ],
    subtotal: 3600000,
    descuento: 0,
    impuestos: 684000,
    total: 4284000,
    estado: "ordenAbierta",
    formaPago: "credito",
    historialEstados: [
      {
        id: 4,
        fecha: "2023-11-15T11:20:00",
        estadoAnterior: "",
        estadoNuevo: "ordenAbierta",
        usuario: "Carlos Gómez",
      },
    ],
    comentarios: [],
    creadorId: 3,
    creador: "Carlos Gómez",
    requiereProduccion: false,
    resumenStock: {
      totalProductos: 1,
      productosInventario: 1,
      productosProduccion: 0,
      productosMixtos: 0,
    },
  },
  {
    id: 3,
    codigo: "OV-2023-003",
    clienteId: 4,
    fechaCreacion: "2023-11-05",
    fechaEntrega: "2023-11-20",
    productos: [
      {
        id: 4,
        productoId: "4",
        nombre: "Botella HDPE 1L",
        cantidad: 2000,
        precio: 950,
        subtotal: 1900000,
        cantidadInventario: 1000,
        cantidadProduccion: 1000,
        estadoStock: "mixto",
        historialStock: [
          {
            id: 1,
            fecha: "2023-11-05T09:15:00",
            usuario: "Carlos Gómez",
            accion: "Verificación inicial de stock",
            cantidadInventario: 1000,
            cantidadProduccion: 1000,
            comentario: "Stock parcial disponible",
          },
        ],
      },
      {
        id: 5,
        productoId: "2",
        nombre: "Tapa rosca estándar",
        cantidad: 2000,
        precio: 300,
        subtotal: 600000,
        cantidadInventario: 2000,
        cantidadProduccion: 0,
        estadoStock: "inventario",
        historialStock: [
          {
            id: 1,
            fecha: "2023-11-05T09:15:00",
            usuario: "Carlos Gómez",
            accion: "Verificación inicial de stock",
            cantidadInventario: 2000,
            cantidadProduccion: 0,
            comentario: "Stock completo disponible",
          },
        ],
      },
    ],
    subtotal: 2500000,
    descuento: 100000,
    impuestos: 456000,
    total: 2856000,
    estado: "facturadoEntregado",
    formaPago: "contado",
    historialEstados: [
      {
        id: 5,
        fecha: "2023-11-05T09:10:00",
        estadoAnterior: "",
        estadoNuevo: "ordenAbierta",
        usuario: "Carlos Gómez",
      },
      {
        id: 6,
        fecha: "2023-11-05T16:30:00",
        estadoAnterior: "ordenAbierta",
        estadoNuevo: "pendientePago",
        usuario: "Carlos Gómez",
      },
      {
        id: 7,
        fecha: "2023-11-06T10:15:00",
        estadoAnterior: "pendientePago",
        estadoNuevo: "liberadaProduccion",
        usuario: "Ana Martínez",
      },
      {
        id: 8,
        fecha: "2023-11-08T08:15:00",
        estadoAnterior: "liberadaProduccion",
        estadoNuevo: "enProduccion",
        usuario: "Pedro Ramírez",
      },
      {
        id: 9,
        fecha: "2023-11-15T14:20:00",
        estadoAnterior: "enProduccion",
        estadoNuevo: "productoTerminado",
        usuario: "Pedro Ramírez",
      },
      {
        id: 10,
        fecha: "2023-11-16T09:30:00",
        estadoAnterior: "productoTerminado",
        estadoNuevo: "cierreTecnico",
        usuario: "María López",
      },
      {
        id: 11,
        fecha: "2023-11-18T15:30:00",
        estadoAnterior: "cierreTecnico",
        estadoNuevo: "facturadoEntregado",
        usuario: "Laura Sánchez",
        comentario: "Cliente recibió conforme",
      },
    ],
    comentarios: [
      {
        id: 3,
        fecha: "2023-11-15T15:00:00",
        usuario: "Pedro Ramírez",
        texto: "Producción finalizada con calidad óptima",
      },
      {
        id: 4,
        fecha: "2023-11-18T16:00:00",
        usuario: "Laura Sánchez",
        texto: "Cliente muy satisfecho con la calidad del producto",
      },
    ],
    creadorId: 3,
    creador: "Carlos Gómez",
    maquinaAsignada: "Inyectora #1",
    fechaInicioProd: "2023-11-08T08:15:00",
    fechaFinProd: "2023-11-15T14:20:00",
    requiereProduccion: true,
    resumenStock: {
      totalProductos: 2,
      productosInventario: 1,
      productosProduccion: 0,
      productosMixtos: 1,
    },
  },
  {
    id: 4,
    codigo: "OV-2023-004",
    clienteId: 3,
    fechaCreacion: "2023-11-18",
    fechaEntrega: "2023-12-10",
    productos: [
      {
        id: 6,
        productoId: "5",
        nombre: "Envase cosmético 100ml",
        cantidad: 10000,
        precio: 1500,
        subtotal: 15000000,
        cantidadInventario: 0,
        cantidadProduccion: 10000,
        estadoStock: "produccion",
        historialStock: [
          {
            id: 1,
            fecha: "2023-11-18T10:35:00",
            usuario: "Carlos Gómez",
            accion: "Verificación inicial de stock",
            cantidadInventario: 0,
            cantidadProduccion: 10000,
            comentario: "Requiere producción completa",
          },
        ],
      },
    ],
    subtotal: 15000000,
    descuento: 1500000,
    impuestos: 2565000,
    total: 16065000,
    estado: "pendientePago",
    formaPago: "anticipo",
    historialEstados: [
      {
        id: 11,
        fecha: "2023-11-18T10:30:00",
        estadoAnterior: "",
        estadoNuevo: "ordenAbierta",
        usuario: "Carlos Gómez",
      },
      {
        id: 12,
        fecha: "2023-11-19T09:45:00",
        estadoAnterior: "ordenAbierta",
        estadoNuevo: "pendientePago",
        usuario: "Carlos Gómez",
        comentario: "Cliente solicitó factura proforma para proceder con el pago",
      },
    ],
    comentarios: [
      {
        id: 5,
        fecha: "2023-11-19T11:30:00",
        usuario: "Carlos Gómez",
        texto: "Se envió factura proforma por correo electrónico",
      },
    ],
    creadorId: 3,
    creador: "Carlos Gómez",
    requiereProduccion: true,
    resumenStock: {
      totalProductos: 1,
      productosInventario: 0,
      productosProduccion: 1,
      productosMixtos: 0,
    },
  },
  {
    id: 5,
    codigo: "OV-2023-005",
    clienteId: 5,
    fechaCreacion: "2023-11-01",
    fechaEntrega: "2023-11-15",
    productos: [
      {
        id: 7,
        productoId: "1",
        nombre: "Botella PET 500ml",
        cantidad: 8000,
        precio: 750,
        subtotal: 6000000,
        cantidadInventario: 8000,
        cantidadProduccion: 0,
        estadoStock: "inventario",
        historialStock: [
          {
            id: 1,
            fecha: "2023-11-01T14:25:00",
            usuario: "Carlos Gómez",
            accion: "Verificación inicial de stock",
            cantidadInventario: 8000,
            cantidadProduccion: 0,
            comentario: "Stock completo disponible",
          },
        ],
      },
    ],
    subtotal: 6000000,
    descuento: 300000,
    impuestos: 1083000,
    total: 6783000,
    estado: "cancelada",
    formaPago: "credito",
    historialEstados: [
      {
        id: 13,
        fecha: "2023-11-01T14:20:00",
        estadoAnterior: "",
        estadoNuevo: "ordenAbierta",
        usuario: "Carlos Gómez",
      },
      {
        id: 14,
        fecha: "2023-11-02T10:15:00",
        estadoAnterior: "ordenAbierta",
        estadoNuevo: "pendientePago",
        usuario: "Carlos Gómez",
      },
      {
        id: 15,
        fecha: "2023-11-10T16:30:00",
        estadoAnterior: "pendientePago",
        estadoNuevo: "cancelada",
        usuario: "Ana Martínez",
        comentario: "Cliente canceló el pedido por problemas financieros",
      },
    ],
    comentarios: [
      {
        id: 6,
        fecha: "2023-11-10T16:35:00",
        usuario: "Ana Martínez",
        texto: "Se contactó al cliente para confirmar motivo de cancelación",
      },
    ],
    creadorId: 3,
    creador: "Carlos Gómez",
    requiereProduccion: false,
    resumenStock: {
      totalProductos: 1,
      productosInventario: 1,
      productosProduccion: 0,
      productosMixtos: 0,
    },
  },
  {
    id: 6,
    codigo: "OV-2023-006",
    clienteId: 1,
    fechaCreacion: "2023-11-08",
    fechaEntrega: "2023-11-30",
    productos: [
      {
        id: 8,
        productoId: "1",
        nombre: "Botella PET 500ml",
        cantidad: 3000,
        precio: 750,
        subtotal: 2250000,
        cantidadInventario: 1500,
        cantidadProduccion: 1500,
        estadoStock: "mixto",
        historialStock: [
          {
            id: 1,
            fecha: "2023-11-08T09:25:00",
            usuario: "Carlos Gómez",
            accion: "Verificación inicial de stock",
            cantidadInventario: 1500,
            cantidadProduccion: 1500,
            comentario: "Stock parcial disponible",
          },
        ],
      },
    ],
    subtotal: 2250000,
    descuento: 0,
    impuestos: 427500,
    total: 2677500,
    estado: "molido",
    formaPago: "anticipo",
    historialEstados: [
      {
        id: 16,
        fecha: "2023-11-08T09:20:00",
        estadoAnterior: "",
        estadoNuevo: "ordenAbierta",
        usuario: "Carlos Gómez",
      },
      {
        id: 17,
        fecha: "2023-11-08T14:30:00",
        estadoAnterior: "ordenAbierta",
        estadoNuevo: "pendientePago",
        usuario: "Carlos Gómez",
      },
      {
        id: 18,
        fecha: "2023-11-09T10:15:00",
        estadoAnterior: "pendientePago",
        estadoNuevo: "liberadaProduccion",
        usuario: "Ana Martínez",
      },
      {
        id: 19,
        fecha: "2023-11-10T08:30:00",
        estadoAnterior: "liberadaProduccion",
        estadoNuevo: "enProduccion",
        usuario: "Pedro Ramírez",
      },
      {
        id: 20,
        fecha: "2023-11-12T15:45:00",
        estadoAnterior: "enProduccion",
        estadoNuevo: "molido",
        usuario: "Pedro Ramírez",
        comentario: "Defectos de calidad en el material, se envía a molido para reproceso",
      },
    ],
    comentarios: [
      {
        id: 7,
        fecha: "2023-11-12T16:00:00",
        usuario: "Pedro Ramírez",
        texto: "Se detectaron burbujas en el material. Se programará reproceso después de molido.",
      },
    ],
    creadorId: 3,
    creador: "Carlos Gómez",
    maquinaAsignada: "Inyectora #2",
    fechaInicioProd: "2023-11-10T08:30:00",
    requiereProduccion: true,
    resumenStock: {
      totalProductos: 1,
      productosInventario: 0,
      productosProduccion: 0,
      productosMixtos: 1,
    },
  },
  {
    id: 7,
    codigo: "OV-2023-007",
    clienteId: 4,
    fechaCreacion: "2023-11-03",
    fechaEntrega: "2023-11-18",
    productos: [
      {
        id: 9,
        productoId: "4",
        nombre: "Botella HDPE 1L",
        cantidad: 4000,
        precio: 950,
        subtotal: 3800000,
        cantidadInventario: 0,
        cantidadProduccion: 4000,
        estadoStock: "produccion",
        historialStock: [
          {
            id: 1,
            fecha: "2023-11-03T10:25:00",
            usuario: "Carlos Gómez",
            accion: "Verificación inicial de stock",
            cantidadInventario: 0,
            cantidadProduccion: 4000,
            comentario: "Requiere producción completa",
          },
        ],
      },
    ],
    subtotal: 3800000,
    descuento: 200000,
    impuestos: 684000,
    total: 4284000,
    estado: "devolucion",
    formaPago: "contado",
    historialEstados: [
      {
        id: 21,
        fecha: "2023-11-03T10:20:00",
        estadoAnterior: "",
        estadoNuevo: "ordenAbierta",
        usuario: "Carlos Gómez",
      },
      {
        id: 22,
        fecha: "2023-11-03T15:30:00",
        estadoAnterior: "ordenAbierta",
        estadoNuevo: "pendientePago",
        usuario: "Carlos Gómez",
      },
      {
        id: 23,
        fecha: "2023-11-04T09:15:00",
        estadoAnterior: "pendientePago",
        estadoNuevo: "liberadaProduccion",
        usuario: "Ana Martínez",
      },
      {
        id: 24,
        fecha: "2023-11-05T08:30:00",
        estadoAnterior: "liberadaProduccion",
        estadoNuevo: "enProduccion",
        usuario: "Pedro Ramírez",
      },
      {
        id: 25,
        fecha: "2023-11-10T14:20:00",
        estadoAnterior: "enProduccion",
        estadoNuevo: "productoTerminado",
        usuario: "Pedro Ramírez",
      },
      {
        id: 26,
        fecha: "2023-11-11T09:30:00",
        estadoAnterior: "productoTerminado",
        estadoNuevo: "cierreTecnico",
        usuario: "María López",
      },
      {
        id: 27,
        fecha: "2023-11-12T15:30:00",
        estadoAnterior: "cierreTecnico",
        estadoNuevo: "facturadoEntregado",
        usuario: "Laura Sánchez",
      },
      {
        id: 28,
        fecha: "2023-11-15T10:45:00",
        estadoAnterior: "facturadoEntregado",
        estadoNuevo: "devolucion",
        usuario: "Carlos Gómez",
        comentario: "Cliente devolvió productos por problemas de color",
      },
    ],
    comentarios: [
      {
        id: 8,
        fecha: "2023-11-15T11:00:00",
        usuario: "Carlos Gómez",
        texto:
          "Cliente reporta que el color no coincide con la muestra aprobada. Se evaluará si es posible reprocesar.",
      },
    ],
    creadorId: 3,
    creador: "Carlos Gómez",
    maquinaAsignada: "Inyectora #1",
    fechaInicioProd: "2023-11-05T08:30:00",
    fechaFinProd: "2023-11-10T14:20:00",
    requiereProduccion: true,
    resumenStock: {
      totalProductos: 1,
      productosInventario: 0,
      productosProduccion: 1,
      productosMixtos: 0,
    },
  },
]

// Datos de ejemplo para empleados y sus roles
export const empleados = [
  { id: 1, nombre: "Juan Pérez", rol: "admin" },
  { id: 2, nombre: "María López", rol: "calidad" },
  { id: 3, nombre: "Carlos Gómez", rol: "comercial" },
  { id: 4, nombre: "Ana Martínez", rol: "finanzas" },
  { id: 5, nombre: "Pedro Ramírez", rol: "produccion" },
  { id: 6, nombre: "Laura Sánchez", rol: "logistica" },
]

// Datos simplificados de productos para uso en formularios
export const productos = [
  { id: "1", nombre: "Botella PET 500ml", precio: 750 },
  { id: "2", nombre: "Tapa rosca estándar", precio: 300 },
  { id: "3", nombre: "Contenedor rectangular 1L", precio: 1200 },
  { id: "4", nombre: "Botella HDPE 1L", precio: 950 },
  { id: "5", nombre: "Envase cosmético 100ml", precio: 1500 },
]

// Datos de maquinaria disponible para asignación
export const maquinaria = [
  { id: 1, nombre: "Inyectora #1", tipo: "Inyectora hidráulica", disponible: true },
  { id: 2, nombre: "Inyectora #2", tipo: "Inyectora eléctrica", disponible: true },
  { id: 3, nombre: "Inyectora #3", tipo: "Inyectora hidráulica", disponible: false },
  { id: 4, nombre: "Sopladora #1", tipo: "Sopladora", disponible: true },
  { id: 5, nombre: "Extrusora #1", tipo: "Extrusora", disponible: true },
]

// Funciones para acceder a los datos

// Obtener todas las órdenes
export function getOrdenes(): Orden[] {
  // Añadir información del cliente a cada orden
  return ordenesData.map((orden) => {
    const cliente = getClientes().find((c) => c.id === orden.clienteId)
    return { ...orden, cliente }
  })
}

// Obtener una orden por su ID
export function getOrdenById(id: number): Orden | undefined {
  const orden = ordenesData.find((orden) => orden.id === id)
  if (!orden) return undefined

  const cliente = getClientes().find((c) => c.id === orden.clienteId)
  return { ...orden, cliente }
}

// Obtener órdenes filtradas
export function getOrdenesFiltradas({
  estado,
  clienteId,
  fechaDesde,
  fechaHasta,
  busqueda,
}: {
  estado?: string
  clienteId?: number
  fechaDesde?: string
  fechaHasta?: string
  busqueda?: string
}): Orden[] {
  // Obtener todas las órdenes una sola vez
  const ordenes = getOrdenes()

  // Filtrar por estado
  let ordenesFiltradas =
    estado && estado !== "todos" && estado !== "all" ? ordenes.filter((orden) => orden.estado === estado) : ordenes

  // Filtrar por cliente
  if (clienteId && clienteId > 0) {
    ordenesFiltradas = ordenesFiltradas.filter((orden) => orden.clienteId === clienteId)
  }

  // Filtrar por fecha desde
  if (fechaDesde) {
    const fechaDesdeObj = new Date(fechaDesde)
    ordenesFiltradas = ordenesFiltradas.filter((orden) => new Date(orden.fechaCreacion) >= fechaDesdeObj)
  }

  // Filtrar por fecha hasta
  if (fechaHasta) {
    const fechaHastaObj = new Date(fechaHasta)
    ordenesFiltradas = ordenesFiltradas.filter((orden) => new Date(orden.fechaCreacion) <= fechaHastaObj)
  }

  // Filtrar por búsqueda (código o nombre del cliente)
  if (busqueda) {
    const busquedaLower = busqueda.toLowerCase()
    ordenesFiltradas = ordenesFiltradas.filter(
      (orden) =>
        orden.codigo.toLowerCase().includes(busquedaLower) ||
        (orden.cliente?.nombre && orden.cliente.nombre.toLowerCase().includes(busquedaLower)),
    )
  }

  return ordenesFiltradas
}

// Crear una nueva orden
export function createOrden(orden: Omit<Orden, "id" | "codigo">): Orden {
  const newId = Math.max(...ordenesData.map((o) => o.id)) + 1
  const newCodigo = `OV-${new Date().getFullYear()}-${String(newId).padStart(3, "0")}`

  // Verificar y reservar stock para cada producto
  const productosConStock = orden.productos.map((producto) => {
    const stockInfo = verificarYReservarStock(producto.productoId, producto.cantidad)

    // Crear registro en el historial de stock
    const historialItem: StockHistorialItem = {
      id: 1,
      fecha: new Date().toISOString(),
      usuario: orden.creador,
      accion: "Verificación inicial de stock",
      cantidadInventario: stockInfo.cantidadInventario,
      cantidadProduccion: stockInfo.cantidadProduccion,
      comentario:
        stockInfo.estadoStock === "inventario"
          ? "Stock completo disponible"
          : stockInfo.estadoStock === "produccion"
            ? "Requiere producción completa"
            : "Stock parcial disponible",
    }

    return {
      ...producto,
      cantidadInventario: stockInfo.cantidadInventario,
      cantidadProduccion: stockInfo.cantidadProduccion,
      estadoStock: stockInfo.estadoStock,
      historialStock: [historialItem],
    }
  })

  // Calcular resumen de stock
  const resumenStock = {
    totalProductos: productosConStock.length,
    productosInventario: productosConStock.filter((p) => p.estadoStock === "inventario").length,
    productosProduccion: productosConStock.filter((p) => p.estadoStock === "produccion").length,
    productosMixtos: productosConStock.filter((p) => p.estadoStock === "mixto").length,
  }

  // Determinar si la orden requiere producción
  const requiereProduccion = productosConStock.some((p) => p.estadoStock === "produccion" || p.estadoStock === "mixto")

  const newOrden = {
    ...orden,
    id: newId,
    codigo: newCodigo,
    productos: productosConStock,
    requiereProduccion,
    resumenStock,
  } as Orden

  ordenesData.push(newOrden)
  return newOrden
}

// Actualizar una orden existente
export function updateOrden(id: number, orden: Partial<Orden>): Orden | undefined {
  const index = ordenesData.findIndex((o) => o.id === id)
  if (index === -1) return undefined

  // Solo permitir actualización si el estado es "ordenAbierta"
  if (ordenesData[index].estado !== "ordenAbierta") {
    throw new Error("No se puede editar una orden que no está en estado de orden abierta")
  }

  ordenesData[index] = { ...ordenesData[index], ...orden }
  return getOrdenById(id)
}

// Cambiar el estado de una orden
export function cambiarEstadoOrden(
  id: number,
  nuevoEstado: string,
  usuario: string,
  comentario?: string,
  datosAdicionales?: Record<string, any>,
): Orden | undefined {
  const index = ordenesData.findIndex((o) => o.id === id)
  if (index === -1) return undefined

  const estadoAnterior = ordenesData[index].estado
  ordenesData[index].estado = nuevoEstado

  // Añadir datos adicionales según el estado
  if (datosAdicionales) {
    if (nuevoEstado === "enProduccion") {
      ordenesData[index].maquinaAsignada = datosAdicionales.maquinaAsignada || ordenesData[index].maquinaAsignada
      ordenesData[index].fechaInicioProd = new Date().toISOString()
    }
    if (nuevoEstado === "productoTerminado") {
      ordenesData[index].fechaFinProd = new Date().toISOString()
    }
  }

  // Añadir al historial de estados
  const newCambioId =
    ordenesData[index].historialEstados.length > 0
      ? Math.max(...ordenesData[index].historialEstados.map((h) => h.id)) + 1
      : 1

  ordenesData[index].historialEstados.push({
    id: newCambioId,
    fecha: new Date().toISOString(),
    estadoAnterior,
    estadoNuevo: nuevoEstado,
    usuario,
    comentario,
  })

  return getOrdenById(id)
}

// Añadir un comentario a una orden
export function addComentarioToOrden(id: number, usuario: string, texto: string): Comentario | undefined {
  const orden = ordenesData.find((o) => o.id === id)
  if (!orden) return undefined

  const newId = orden.comentarios.length > 0 ? Math.max(...orden.comentarios.map((c) => c.id)) + 1 : 1

  const newComentario = {
    id: newId,
    fecha: new Date().toISOString(),
    usuario,
    texto,
  }

  orden.comentarios.push(newComentario)
  return newComentario
}

// Obtener el rol del usuario actual (simulado)
export function getRolUsuarioActual(): string {
  // En una aplicación real, esto vendría de la sesión del usuario
  return "comercial" // Por defecto, asumimos rol comercial para las pruebas
}

// Verificar si un usuario puede realizar una acción según su rol
export function puedeRealizarAccion(accion: string, rol: string): boolean {
  const permisos = {
    crearOrden: ["admin", "comercial"],
    editarOrden: ["admin", "comercial"],
    confirmarPago: ["admin", "finanzas"],
    iniciarProduccion: ["admin", "produccion"],
    completarProduccion: ["admin", "produccion"],
    realizarCierreTecnico: ["admin", "calidad"],
    facturarEntregar: ["admin", "comercial", "finanzas"],
    registrarDevolucion: ["admin", "comercial", "logistica"],
    enviarAMolido: ["admin", "produccion", "calidad"],
    cancelarOrden: ["admin", "comercial", "finanzas"],
    verTodasLasOrdenes: ["admin"],
  }

  return permisos[accion as keyof typeof permisos]?.includes(rol) || false
}

// Obtener las acciones disponibles para una orden según su estado y el rol del usuario
export function getAccionesDisponibles(estado: string, rol: string): string[] {
  // Obtener las transiciones disponibles para el estado actual
  const transiciones = transicionesEstado[estado as keyof typeof transicionesEstado] || []

  // Filtrar por rol
  return transiciones.filter((t) => t.roles.includes(rol)).map((t) => t.estado)
}

// Obtener las transiciones disponibles para un estado y rol específicos
export function getTransicionesDisponibles(estado: string, rol: string): any[] {
  const transiciones = transicionesEstado[estado as keyof typeof transicionesEstado] || []
  return transiciones.filter((t) => t.roles.includes(rol))
}
