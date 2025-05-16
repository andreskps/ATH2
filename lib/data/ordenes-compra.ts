// Definir los tipos
export type EstadoOrdenCompra = "creado" | "recibido-parcial" | "recibido" | "cerrado"

export interface OrdenCompra {
  id: string
  numero: string
  proveedorId: string
  proveedorNombre: string
  estado: EstadoOrdenCompra
  fechaEmision: string
  fechaEntregaEstimada: string
  usuarioResponsableId: string
  usuarioResponsableNombre: string
  total: number
  moneda: string
  items: OrdenCompraItem[]
  comentarios: string
  historialCambios: HistorialCambio[]
  recepciones: RecepcionMaterial[]
  createdAt: string
  updatedAt: string
}

export interface OrdenCompraItem {
  id: string
  materiaPrimaId: string
  materiaPrimaNombre: string
  cantidad: number
  unidad: string
  precioUnitario: number
  subtotal: number
  cantidadRecibida: number
}

export interface HistorialCambio {
  id: string
  fecha: string
  estadoAnterior: EstadoOrdenCompra
  estadoNuevo: EstadoOrdenCompra
  usuarioId: string
  usuarioNombre: string
  comentario?: string
}

export interface RecepcionMaterial {
  id: string
  ordenCompraId: string
  fecha: string
  usuarioId: string
  usuarioNombre: string
  observaciones: string
  items: RecepcionItem[]
  esCompleta: boolean
}

export interface RecepcionItem {
  id: string
  ordenCompraItemId: string
  materiaPrimaId: string
  materiaPrimaNombre: string
  cantidadRecibida: number
  unidad: string
}

// Datos estáticos de órdenes de compra
const ordenesCompraEstaticas: OrdenCompra[] = [
  // Orden 1: Estado "creado"
  {
    id: "oc-001",
    numero: "OC-2023-1001",
    proveedorId: "prov-001",
    proveedorNombre: "Polímeros Industriales S.A.",
    estado: "creado",
    fechaEmision: "2023-05-15T10:30:00Z",
    fechaEntregaEstimada: "2023-05-30T10:30:00Z",
    usuarioResponsableId: "user-001",
    usuarioResponsableNombre: "Carlos Rodríguez",
    total: 15750.0,
    moneda: "MXN",
    items: [
      {
        id: "item-001-1",
        materiaPrimaId: "mp-001",
        materiaPrimaNombre: "Polietileno de alta densidad",
        cantidad: 500,
        unidad: "kg",
        precioUnitario: 25.0,
        subtotal: 12500.0,
        cantidadRecibida: 0,
      },
      {
        id: "item-001-2",
        materiaPrimaId: "mp-004",
        materiaPrimaNombre: "Pigmento azul",
        cantidad: 50,
        unidad: "kg",
        precioUnitario: 65.0,
        subtotal: 3250.0,
        cantidadRecibida: 0,
      },
    ],
    comentarios: "Orden urgente para producción de botellas de 500ml.",
    historialCambios: [
      {
        id: "hist-001-1",
        fecha: "2023-05-15T10:30:00Z",
        estadoAnterior: "creado",
        estadoNuevo: "creado",
        usuarioId: "user-001",
        usuarioNombre: "Carlos Rodríguez",
        comentario: "Orden de compra creada",
      },
    ],
    recepciones: [],
    createdAt: "2023-05-15T10:30:00Z",
    updatedAt: "2023-05-15T10:30:00Z",
  },

  // Orden 2: Estado "recibido-parcial"
  {
    id: "oc-002",
    numero: "OC-2023-1002",
    proveedorId: "prov-002",
    proveedorNombre: "Químicos del Norte",
    estado: "recibido-parcial",
    fechaEmision: "2023-04-20T09:15:00Z",
    fechaEntregaEstimada: "2023-05-10T09:15:00Z",
    usuarioResponsableId: "user-002",
    usuarioResponsableNombre: "Ana Martínez",
    total: 28500.0,
    moneda: "MXN",
    items: [
      {
        id: "item-002-1",
        materiaPrimaId: "mp-002",
        materiaPrimaNombre: "Polipropileno",
        cantidad: 800,
        unidad: "kg",
        precioUnitario: 30.0,
        subtotal: 24000.0,
        cantidadRecibida: 500,
      },
      {
        id: "item-002-2",
        materiaPrimaId: "mp-005",
        materiaPrimaNombre: "Aditivo UV",
        cantidad: 30,
        unidad: "kg",
        precioUnitario: 150.0,
        subtotal: 4500.0,
        cantidadRecibida: 30,
      },
    ],
    comentarios: "El proveedor informó que el resto del polipropileno llegará en una semana.",
    historialCambios: [
      {
        id: "hist-002-1",
        fecha: "2023-04-20T09:15:00Z",
        estadoAnterior: "creado",
        estadoNuevo: "creado",
        usuarioId: "user-002",
        usuarioNombre: "Ana Martínez",
        comentario: "Orden de compra creada",
      },
      {
        id: "hist-002-2",
        fecha: "2023-05-05T14:20:00Z",
        estadoAnterior: "creado",
        estadoNuevo: "recibido-parcial",
        usuarioId: "user-003",
        usuarioNombre: "Miguel López",
        comentario: "Se recibió el aditivo UV completo y 500kg de polipropileno",
      },
    ],
    recepciones: [
      {
        id: "rec-002-1",
        ordenCompraId: "oc-002",
        fecha: "2023-05-05T14:20:00Z",
        usuarioId: "user-003",
        usuarioNombre: "Miguel López",
        observaciones: "El material llegó en buenas condiciones. Falta el resto del polipropileno.",
        items: [
          {
            id: "rec-item-002-1-1",
            ordenCompraItemId: "item-002-1",
            materiaPrimaId: "mp-002",
            materiaPrimaNombre: "Polipropileno",
            cantidadRecibida: 500,
            unidad: "kg",
          },
          {
            id: "rec-item-002-1-2",
            ordenCompraItemId: "item-002-2",
            materiaPrimaId: "mp-005",
            materiaPrimaNombre: "Aditivo UV",
            cantidadRecibida: 30,
            unidad: "kg",
          },
        ],
        esCompleta: false,
      },
    ],
    createdAt: "2023-04-20T09:15:00Z",
    updatedAt: "2023-05-05T14:20:00Z",
  },

  // Orden 3: Estado "recibido"
  {
    id: "oc-003",
    numero: "OC-2023-1003",
    proveedorId: "prov-003",
    proveedorNombre: "Plásticos Reciclados S.A.",
    estado: "recibido",
    fechaEmision: "2023-03-10T11:45:00Z",
    fechaEntregaEstimada: "2023-03-25T11:45:00Z",
    usuarioResponsableId: "user-001",
    usuarioResponsableNombre: "Carlos Rodríguez",
    total: 42000.0,
    moneda: "MXN",
    items: [
      {
        id: "item-003-1",
        materiaPrimaId: "mp-007",
        materiaPrimaNombre: "PET reciclado",
        cantidad: 1200,
        unidad: "kg",
        precioUnitario: 35.0,
        subtotal: 42000.0,
        cantidadRecibida: 1200,
      },
    ],
    comentarios: "Material recibido en perfectas condiciones.",
    historialCambios: [
      {
        id: "hist-003-1",
        fecha: "2023-03-10T11:45:00Z",
        estadoAnterior: "creado",
        estadoNuevo: "creado",
        usuarioId: "user-001",
        usuarioNombre: "Carlos Rodríguez",
        comentario: "Orden de compra creada",
      },
      {
        id: "hist-003-2",
        fecha: "2023-03-20T10:30:00Z",
        estadoAnterior: "creado",
        estadoNuevo: "recibido-parcial",
        usuarioId: "user-004",
        usuarioNombre: "Laura Sánchez",
        comentario: "Se recibieron 600kg de PET reciclado",
      },
      {
        id: "hist-003-3",
        fecha: "2023-03-25T16:15:00Z",
        estadoAnterior: "recibido-parcial",
        estadoNuevo: "recibido",
        usuarioId: "user-004",
        usuarioNombre: "Laura Sánchez",
        comentario: "Se completó la recepción del PET reciclado",
      },
    ],
    recepciones: [
      {
        id: "rec-003-1",
        ordenCompraId: "oc-003",
        fecha: "2023-03-20T10:30:00Z",
        usuarioId: "user-004",
        usuarioNombre: "Laura Sánchez",
        observaciones: "Primera entrega de PET reciclado.",
        items: [
          {
            id: "rec-item-003-1-1",
            ordenCompraItemId: "item-003-1",
            materiaPrimaId: "mp-007",
            materiaPrimaNombre: "PET reciclado",
            cantidadRecibida: 600,
            unidad: "kg",
          },
        ],
        esCompleta: false,
      },
      {
        id: "rec-003-2",
        ordenCompraId: "oc-003",
        fecha: "2023-03-25T16:15:00Z",
        usuarioId: "user-004",
        usuarioNombre: "Laura Sánchez",
        observaciones: "Entrega final de PET reciclado. Material en excelentes condiciones.",
        items: [
          {
            id: "rec-item-003-2-1",
            ordenCompraItemId: "item-003-1",
            materiaPrimaId: "mp-007",
            materiaPrimaNombre: "PET reciclado",
            cantidadRecibida: 600,
            unidad: "kg",
          },
        ],
        esCompleta: true,
      },
    ],
    createdAt: "2023-03-10T11:45:00Z",
    updatedAt: "2023-03-25T16:15:00Z",
  },

  // Orden 4: Estado "cerrado"
  {
    id: "oc-004",
    numero: "OC-2023-1004",
    proveedorId: "prov-004",
    proveedorNombre: "Colorantes Industriales",
    estado: "cerrado",
    fechaEmision: "2023-02-05T08:30:00Z",
    fechaEntregaEstimada: "2023-02-20T08:30:00Z",
    usuarioResponsableId: "user-003",
    usuarioResponsableNombre: "Miguel López",
    total: 18750.0,
    moneda: "MXN",
    items: [
      {
        id: "item-004-1",
        materiaPrimaId: "mp-004",
        materiaPrimaNombre: "Pigmento azul",
        cantidad: 100,
        unidad: "kg",
        precioUnitario: 65.0,
        subtotal: 6500.0,
        cantidadRecibida: 100,
      },
      {
        id: "item-004-2",
        materiaPrimaId: "mp-006",
        materiaPrimaNombre: "Masterbatch",
        cantidad: 75,
        unidad: "kg",
        precioUnitario: 110.0,
        subtotal: 8250.0,
        cantidadRecibida: 75,
      },
      {
        id: "item-004-3",
        materiaPrimaId: "mp-005",
        materiaPrimaNombre: "Aditivo UV",
        cantidad: 20,
        unidad: "kg",
        precioUnitario: 150.0,
        subtotal: 3000.0,
        cantidadRecibida: 20,
      },
      {
        id: "item-004-4",
        materiaPrimaId: "mp-008",
        materiaPrimaNombre: "Pigmento verde",
        cantidad: 10,
        unidad: "kg",
        precioUnitario: 100.0,
        subtotal: 1000.0,
        cantidadRecibida: 10,
      },
    ],
    comentarios: "Orden completada y facturada. Factura #F-2023-089.",
    historialCambios: [
      {
        id: "hist-004-1",
        fecha: "2023-02-05T08:30:00Z",
        estadoAnterior: "creado",
        estadoNuevo: "creado",
        usuarioId: "user-003",
        usuarioNombre: "Miguel López",
        comentario: "Orden de compra creada",
      },
      {
        id: "hist-004-2",
        fecha: "2023-02-15T13:45:00Z",
        estadoAnterior: "creado",
        estadoNuevo: "recibido-parcial",
        usuarioId: "user-002",
        usuarioNombre: "Ana Martínez",
        comentario: "Se recibieron los pigmentos y aditivos parcialmente",
      },
      {
        id: "hist-004-3",
        fecha: "2023-02-20T10:20:00Z",
        estadoAnterior: "recibido-parcial",
        estadoNuevo: "recibido",
        usuarioId: "user-002",
        usuarioNombre: "Ana Martínez",
        comentario: "Se completó la recepción de todos los materiales",
      },
      {
        id: "hist-004-4",
        fecha: "2023-03-05T09:10:00Z",
        estadoAnterior: "recibido",
        estadoNuevo: "cerrado",
        usuarioId: "user-001",
        usuarioNombre: "Carlos Rodríguez",
        comentario: "Orden cerrada administrativamente. Factura pagada.",
      },
    ],
    recepciones: [
      {
        id: "rec-004-1",
        ordenCompraId: "oc-004",
        fecha: "2023-02-15T13:45:00Z",
        usuarioId: "user-002",
        usuarioNombre: "Ana Martínez",
        observaciones: "Primera entrega de pigmentos y aditivos.",
        items: [
          {
            id: "rec-item-004-1-1",
            ordenCompraItemId: "item-004-1",
            materiaPrimaId: "mp-004",
            materiaPrimaNombre: "Pigmento azul",
            cantidadRecibida: 50,
            unidad: "kg",
          },
          {
            id: "rec-item-004-1-2",
            ordenCompraItemId: "item-004-2",
            materiaPrimaId: "mp-006",
            materiaPrimaNombre: "Masterbatch",
            cantidadRecibida: 30,
            unidad: "kg",
          },
          {
            id: "rec-item-004-1-3",
            ordenCompraItemId: "item-004-3",
            materiaPrimaId: "mp-005",
            materiaPrimaNombre: "Aditivo UV",
            cantidadRecibida: 10,
            unidad: "kg",
          },
        ],
        esCompleta: false,
      },
      {
        id: "rec-004-2",
        ordenCompraId: "oc-004",
        fecha: "2023-02-20T10:20:00Z",
        usuarioId: "user-002",
        usuarioNombre: "Ana Martínez",
        observaciones: "Entrega final de todos los materiales pendientes.",
        items: [
          {
            id: "rec-item-004-2-1",
            ordenCompraItemId: "item-004-1",
            materiaPrimaId: "mp-004",
            materiaPrimaNombre: "Pigmento azul",
            cantidadRecibida: 50,
            unidad: "kg",
          },
          {
            id: "rec-item-004-2-2",
            ordenCompraItemId: "item-004-2",
            materiaPrimaId: "mp-006",
            materiaPrimaNombre: "Masterbatch",
            cantidadRecibida: 45,
            unidad: "kg",
          },
          {
            id: "rec-item-004-2-3",
            ordenCompraItemId: "item-004-3",
            materiaPrimaId: "mp-005",
            materiaPrimaNombre: "Aditivo UV",
            cantidadRecibida: 10,
            unidad: "kg",
          },
          {
            id: "rec-item-004-2-4",
            ordenCompraItemId: "item-004-4",
            materiaPrimaId: "mp-008",
            materiaPrimaNombre: "Pigmento verde",
            cantidadRecibida: 10,
            unidad: "kg",
          },
        ],
        esCompleta: true,
      },
    ],
    createdAt: "2023-02-05T08:30:00Z",
    updatedAt: "2023-03-05T09:10:00Z",
  },

  // Orden 5: Estado "cerrado"
  {
    id: "oc-005",
    numero: "OC-2023-1005",
    proveedorId: "prov-001",
    proveedorNombre: "Polímeros Industriales S.A.",
    estado: "cerrado",
    fechaEmision: "2023-01-15T14:00:00Z",
    fechaEntregaEstimada: "2023-01-30T14:00:00Z",
    usuarioResponsableId: "user-002",
    usuarioResponsableNombre: "Ana Martínez",
    total: 52500.0,
    moneda: "MXN",
    items: [
      {
        id: "item-005-1",
        materiaPrimaId: "mp-001",
        materiaPrimaNombre: "Polietileno de alta densidad",
        cantidad: 1500,
        unidad: "kg",
        precioUnitario: 25.0,
        subtotal: 37500.0,
        cantidadRecibida: 1500,
      },
      {
        id: "item-005-2",
        materiaPrimaId: "mp-002",
        materiaPrimaNombre: "Polipropileno",
        cantidad: 500,
        unidad: "kg",
        precioUnitario: 30.0,
        subtotal: 15000.0,
        cantidadRecibida: 500,
      },
    ],
    comentarios: "Orden para producción del primer trimestre. Cerrada y archivada.",
    historialCambios: [
      {
        id: "hist-005-1",
        fecha: "2023-01-15T14:00:00Z",
        estadoAnterior: "creado",
        estadoNuevo: "creado",
        usuarioId: "user-002",
        usuarioNombre: "Ana Martínez",
        comentario: "Orden de compra creada",
      },
      {
        id: "hist-005-2",
        fecha: "2023-01-25T11:30:00Z",
        estadoAnterior: "creado",
        estadoNuevo: "recibido",
        usuarioId: "user-004",
        usuarioNombre: "Laura Sánchez",
        comentario: "Se recibió todo el material en un solo envío",
      },
      {
        id: "hist-005-3",
        fecha: "2023-02-10T15:45:00Z",
        estadoAnterior: "recibido",
        estadoNuevo: "cerrado",
        usuarioId: "user-001",
        usuarioNombre: "Carlos Rodríguez",
        comentario: "Orden cerrada y facturada. Factura #F-2023-042.",
      },
    ],
    recepciones: [
      {
        id: "rec-005-1",
        ordenCompraId: "oc-005",
        fecha: "2023-01-25T11:30:00Z",
        usuarioId: "user-004",
        usuarioNombre: "Laura Sánchez",
        observaciones: "Entrega completa de todos los materiales en un solo envío. Material en perfectas condiciones.",
        items: [
          {
            id: "rec-item-005-1-1",
            ordenCompraItemId: "item-005-1",
            materiaPrimaId: "mp-001",
            materiaPrimaNombre: "Polietileno de alta densidad",
            cantidadRecibida: 1500,
            unidad: "kg",
          },
          {
            id: "rec-item-005-1-2",
            ordenCompraItemId: "item-005-2",
            materiaPrimaId: "mp-002",
            materiaPrimaNombre: "Polipropileno",
            cantidadRecibida: 500,
            unidad: "kg",
          },
        ],
        esCompleta: true,
      },
    ],
    createdAt: "2023-01-15T14:00:00Z",
    updatedAt: "2023-02-10T15:45:00Z",
  },
]

// Función para obtener todas las órdenes de compra
export async function getOrdenesCompra(): Promise<OrdenCompra[]> {
  // Simular retraso de red
  await new Promise((resolve) => setTimeout(resolve, 500))
  return ordenesCompraEstaticas
}

// Función para obtener una orden de compra por ID
export async function getOrdenCompraById(id: string): Promise<OrdenCompra | null> {
  // Simular retraso de red
  await new Promise((resolve) => setTimeout(resolve, 500))
  return ordenesCompraEstaticas.find((orden) => orden.id === id) || null
}

// Función para buscar órdenes de compra
export async function searchOrdenesCompra(query: string): Promise<OrdenCompra[]> {
  // Simular retraso de red
  await new Promise((resolve) => setTimeout(resolve, 500))

  if (!query) return ordenesCompraEstaticas

  const lowerQuery = query.toLowerCase()
  return ordenesCompraEstaticas.filter(
    (orden) =>
      orden.numero.toLowerCase().includes(lowerQuery) ||
      orden.proveedorNombre.toLowerCase().includes(lowerQuery) ||
      orden.usuarioResponsableNombre.toLowerCase().includes(lowerQuery),
  )
}

// Función para filtrar órdenes de compra
export async function filterOrdenesCompra({
  estado,
  proveedor,
  fechaDesde,
  fechaHasta,
  responsable,
}: {
  estado?: EstadoOrdenCompra
  proveedor?: string
  fechaDesde?: string
  fechaHasta?: string
  responsable?: string
}): Promise<OrdenCompra[]> {
  // Simular retraso de red
  await new Promise((resolve) => setTimeout(resolve, 500))
  let ordenesCompra = ordenesCompraEstaticas

  if (estado) {
    ordenesCompra = ordenesCompra.filter((orden) => orden.estado === estado)
  }

  if (proveedor) {
    ordenesCompra = ordenesCompra.filter((orden) =>
      orden.proveedorNombre.toLowerCase().includes(proveedor.toLowerCase()),
    )
  }

  if (fechaDesde) {
    const desde = new Date(fechaDesde)
    ordenesCompra = ordenesCompra.filter((orden) => new Date(orden.fechaEmision) >= desde)
  }

  if (fechaHasta) {
    const hasta = new Date(fechaHasta)
    ordenesCompra = ordenesCompra.filter((orden) => new Date(orden.fechaEmision) <= hasta)
  }

  if (responsable) {
    ordenesCompra = ordenesCompra.filter((orden) =>
      orden.usuarioResponsableNombre.toLowerCase().includes(responsable.toLowerCase()),
    )
  }

  return ordenesCompra
}

// Función para obtener todas las recepciones
export async function getRecepciones(): Promise<RecepcionMaterial[]> {
  // Simular retraso de red
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Extraer todas las recepciones de todas las órdenes
  const recepciones: RecepcionMaterial[] = []
  ordenesCompraEstaticas.forEach((orden) => {
    orden.recepciones.forEach((recepcion) => {
      recepciones.push({
        ...recepcion,
        ordenNumero: orden.numero,
        proveedorNombre: orden.proveedorNombre,
      })
    })
  })

  return recepciones
}

// Función para registrar una recepción de material
export async function registrarRecepcion(
  ordenId: string,
  recepcion: {
    items: { ordenCompraItemId: string; cantidadRecibida: number }[]
    observaciones: string
    esCompleta: boolean
  },
): Promise<{ success: boolean; message: string; orden?: OrdenCompra }> {
  // Simular retraso de red
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Buscar la orden
  const ordenIndex = ordenesCompraEstaticas.findIndex((o) => o.id === ordenId)
  if (ordenIndex === -1) {
    return { success: false, message: "Orden no encontrada" }
  }

  const orden = { ...ordenesCompraEstaticas[ordenIndex] }

  // Validar que la orden no esté cerrada
  if (orden.estado === "cerrado") {
    return { success: false, message: "No se puede registrar recepción en una orden cerrada" }
  }

  // Validar que la orden no esté completamente recibida
  if (orden.estado === "recibido" && recepcion.esCompleta === false) {
    return { success: false, message: "La orden ya está completamente recibida" }
  }

  // Crear nueva recepción
  const nuevaRecepcion: RecepcionMaterial = {
    id: `rec-${ordenId}-${orden.recepciones.length + 1}`,
    ordenCompraId: ordenId,
    fecha: new Date().toISOString(),
    usuarioId: "user-001", // Usuario actual (simulado)
    usuarioNombre: "Carlos Rodríguez", // Usuario actual (simulado)
    observaciones: recepcion.observaciones,
    items: [],
    esCompleta: recepcion.esCompleta,
  }

  // Procesar cada ítem de la recepción
  for (const item of recepcion.items) {
    const ordenItem = orden.items.find((i) => i.id === item.ordenCompraItemId)
    if (!ordenItem) {
      return { success: false, message: `Ítem ${item.ordenCompraItemId} no encontrado en la orden` }
    }

    // Validar que la cantidad recibida no exceda la cantidad pendiente
    const cantidadPendiente = ordenItem.cantidad - ordenItem.cantidadRecibida
    if (item.cantidadRecibida > cantidadPendiente) {
      return {
        success: false,
        message: `La cantidad recibida (${item.cantidadRecibida}) excede la cantidad pendiente (${cantidadPendiente}) para ${ordenItem.materiaPrimaNombre}`,
      }
    }

    // Actualizar la cantidad recibida del ítem en la orden
    ordenItem.cantidadRecibida += item.cantidadRecibida

    // Agregar el ítem a la recepción
    nuevaRecepcion.items.push({
      id: `rec-item-${ordenId}-${orden.recepciones.length + 1}-${nuevaRecepcion.items.length + 1}`,
      ordenCompraItemId: item.ordenCompraItemId,
      materiaPrimaId: ordenItem.materiaPrimaId,
      materiaPrimaNombre: ordenItem.materiaPrimaNombre,
      cantidadRecibida: item.cantidadRecibida,
      unidad: ordenItem.unidad,
    })
  }

  // Determinar el nuevo estado de la orden
  let nuevoEstado: EstadoOrdenCompra = orden.estado
  const todosItemsCompletos = orden.items.every((item) => item.cantidadRecibida >= item.cantidad)

  if (todosItemsCompletos) {
    nuevoEstado = recepcion.esCompleta ? "cerrado" : "recibido"
  } else if (orden.items.some((item) => item.cantidadRecibida > 0)) {
    nuevoEstado = "recibido-parcial"
  }

  // Agregar cambio al historial si el estado cambió
  if (nuevoEstado !== orden.estado) {
    orden.historialCambios.push({
      id: `hist-${ordenId}-${orden.historialCambios.length + 1}`,
      fecha: nuevaRecepcion.fecha,
      estadoAnterior: orden.estado,
      estadoNuevo: nuevoEstado,
      usuarioId: nuevaRecepcion.usuarioId,
      usuarioNombre: nuevaRecepcion.usuarioNombre,
      comentario: recepcion.observaciones,
    })
    orden.estado = nuevoEstado
  }

  // Agregar la recepción a la orden
  orden.recepciones.push(nuevaRecepcion)
  orden.updatedAt = nuevaRecepcion.fecha

  // Actualizar la orden en el array
  ordenesCompraEstaticas[ordenIndex] = orden

  return { success: true, message: "Recepción registrada correctamente", orden }
}
