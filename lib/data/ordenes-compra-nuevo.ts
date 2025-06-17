// Definir los tipos
export type EstadoOrdenCompra = "creada" | "confirmada" | "recibida-parcial" | "recibida" | "cerrada"

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
  {
    id: "oc-001",
    numero: "OC-2024-1001",
    proveedorId: "prov-001",
    proveedorNombre: "Polímeros Industriales S.A.",
    estado: "confirmada",
    fechaEmision: "2024-01-15T10:30:00Z",
    fechaEntregaEstimada: "2024-01-30T10:30:00Z",
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
        fecha: "2024-01-15T10:30:00Z",
        estadoAnterior: "creada",
        estadoNuevo: "creada",
        usuarioId: "user-001",
        usuarioNombre: "Carlos Rodríguez",
        comentario: "Orden de compra creada",
      },
      {
        id: "hist-001-2",
        fecha: "2024-01-16T14:20:00Z",
        estadoAnterior: "creada",
        estadoNuevo: "confirmada",
        usuarioId: "user-001",
        usuarioNombre: "Carlos Rodríguez",
        comentario: "Orden confirmada y enviada al proveedor",
      },
    ],
    recepciones: [],
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-16T14:20:00Z",
  },
  {
    id: "oc-002",
    numero: "OC-2024-1002",
    proveedorId: "prov-002",
    proveedorNombre: "Químicos del Norte",
    estado: "recibida-parcial",
    fechaEmision: "2024-01-10T09:15:00Z",
    fechaEntregaEstimada: "2024-01-25T09:15:00Z",
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
        fecha: "2024-01-10T09:15:00Z",
        estadoAnterior: "creada",
        estadoNuevo: "creada",
        usuarioId: "user-002",
        usuarioNombre: "Ana Martínez",
        comentario: "Orden de compra creada",
      },
      {
        id: "hist-002-2",
        fecha: "2024-01-20T14:20:00Z",
        estadoAnterior: "creada",
        estadoNuevo: "confirmada",
        usuarioId: "user-002",
        usuarioNombre: "Ana Martínez",
        comentario: "Orden confirmada",
      },
      {
        id: "hist-002-3",
        fecha: "2024-01-22T14:20:00Z",
        estadoAnterior: "confirmada",
        estadoNuevo: "recibida-parcial",
        usuarioId: "user-003",
        usuarioNombre: "Miguel López",
        comentario: "Se recibió el aditivo UV completo y 500kg de polipropileno",
      },
    ],
    recepciones: [
      {
        id: "rec-002-1",
        ordenCompraId: "oc-002",
        fecha: "2024-01-22T14:20:00Z",
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
    createdAt: "2024-01-10T09:15:00Z",
    updatedAt: "2024-01-22T14:20:00Z",
  },
  {
    id: "oc-003",
    numero: "OC-2024-1003",
    proveedorId: "prov-001",
    proveedorNombre: "Polímeros Industriales S.A.",
    estado: "creada",
    fechaEmision: "2024-01-20T11:45:00Z",
    fechaEntregaEstimada: "2024-02-05T11:45:00Z",
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
        cantidadRecibida: 0,
      },
    ],
    comentarios: "Orden para nueva línea de productos ecológicos.",
    historialCambios: [
      {
        id: "hist-003-1",
        fecha: "2024-01-20T11:45:00Z",
        estadoAnterior: "creada",
        estadoNuevo: "creada",
        usuarioId: "user-001",
        usuarioNombre: "Carlos Rodríguez",
        comentario: "Orden de compra creada",
      },
    ],
    recepciones: [],
    createdAt: "2024-01-20T11:45:00Z",
    updatedAt: "2024-01-20T11:45:00Z",
  },
]

// Función para obtener todas las órdenes de compra
export async function getOrdenesCompra(): Promise<OrdenCompra[]> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return [...ordenesCompraEstaticas].sort(
    (a, b) => new Date(b.fechaEmision).getTime() - new Date(a.fechaEmision).getTime(),
  )
}

// Función para obtener una orden de compra por ID
export async function getOrdenCompraById(id: string): Promise<OrdenCompra | null> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return ordenesCompraEstaticas.find((orden) => orden.id === id) || null
}

// Función para crear una nueva orden de compra
export async function crearOrdenCompra(data: {
  proveedorId: string
  proveedorNombre: string
  fechaEntregaEstimada: string
  comentarios: string
  items: Omit<OrdenCompraItem, "id" | "cantidadRecibida">[]
}): Promise<{ success: boolean; message: string; orden?: OrdenCompra }> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const nuevoId = `oc-${String(ordenesCompraEstaticas.length + 1).padStart(3, "0")}`
  const nuevoNumero = `OC-2024-${String(ordenesCompraEstaticas.length + 1001)}`

  const total = data.items.reduce((sum, item) => sum + item.subtotal, 0)

  const nuevaOrden: OrdenCompra = {
    id: nuevoId,
    numero: nuevoNumero,
    proveedorId: data.proveedorId,
    proveedorNombre: data.proveedorNombre,
    estado: "creada",
    fechaEmision: new Date().toISOString(),
    fechaEntregaEstimada: data.fechaEntregaEstimada,
    usuarioResponsableId: "user-001",
    usuarioResponsableNombre: "Carlos Rodríguez",
    total,
    moneda: "MXN",
    items: data.items.map((item, index) => ({
      ...item,
      id: `item-${nuevoId}-${index + 1}`,
      cantidadRecibida: 0,
    })),
    comentarios: data.comentarios,
    historialCambios: [
      {
        id: `hist-${nuevoId}-1`,
        fecha: new Date().toISOString(),
        estadoAnterior: "creada",
        estadoNuevo: "creada",
        usuarioId: "user-001",
        usuarioNombre: "Carlos Rodríguez",
        comentario: "Orden de compra creada",
      },
    ],
    recepciones: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  ordenesCompraEstaticas.push(nuevaOrden)

  return {
    success: true,
    message: `Orden de compra ${nuevoNumero} creada exitosamente`,
    orden: nuevaOrden,
  }
}

// Función para actualizar una orden de compra
export async function actualizarOrdenCompra(
  id: string,
  data: {
    proveedorId: string
    proveedorNombre: string
    fechaEntregaEstimada: string
    comentarios: string
    items: Omit<OrdenCompraItem, "id" | "cantidadRecibida">[]
  },
): Promise<{ success: boolean; message: string; orden?: OrdenCompra }> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const ordenIndex = ordenesCompraEstaticas.findIndex((o) => o.id === id)
  if (ordenIndex === -1) {
    return { success: false, message: "Orden no encontrada" }
  }

  const orden = ordenesCompraEstaticas[ordenIndex]

  if (orden.estado !== "creada") {
    return { success: false, message: "Solo se pueden editar órdenes en estado 'creada'" }
  }

  const total = data.items.reduce((sum, item) => sum + item.subtotal, 0)

  const ordenActualizada: OrdenCompra = {
    ...orden,
    proveedorId: data.proveedorId,
    proveedorNombre: data.proveedorNombre,
    fechaEntregaEstimada: data.fechaEntregaEstimada,
    comentarios: data.comentarios,
    total,
    items: data.items.map((item, index) => ({
      ...item,
      id: `item-${id}-${index + 1}`,
      cantidadRecibida: 0,
    })),
    updatedAt: new Date().toISOString(),
  }

  ordenesCompraEstaticas[ordenIndex] = ordenActualizada

  return {
    success: true,
    message: `Orden de compra ${orden.numero} actualizada exitosamente`,
    orden: ordenActualizada,
  }
}

// Función para confirmar una orden de compra
export async function confirmarOrdenCompra(
  id: string,
  comentario?: string,
): Promise<{ success: boolean; message: string; orden?: OrdenCompra }> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const ordenIndex = ordenesCompraEstaticas.findIndex((o) => o.id === id)
  if (ordenIndex === -1) {
    return { success: false, message: "Orden no encontrada" }
  }

  const orden = { ...ordenesCompraEstaticas[ordenIndex] }

  if (orden.estado !== "creada") {
    return { success: false, message: "Solo se pueden confirmar órdenes en estado 'creada'" }
  }

  orden.estado = "confirmada"
  orden.updatedAt = new Date().toISOString()

  orden.historialCambios.push({
    id: `hist-${id}-${orden.historialCambios.length + 1}`,
    fecha: new Date().toISOString(),
    estadoAnterior: "creada",
    estadoNuevo: "confirmada",
    usuarioId: "user-001",
    usuarioNombre: "Carlos Rodríguez",
    comentario: comentario || "Orden confirmada",
  })

  ordenesCompraEstaticas[ordenIndex] = orden

  return {
    success: true,
    message: `Orden de compra ${orden.numero} confirmada exitosamente`,
    orden,
  }
}

// Función para registrar una recepción
export async function registrarRecepcion(
  ordenId: string,
  recepcion: {
    items: { ordenCompraItemId: string; cantidadRecibida: number }[]
    observaciones: string
    esCompleta: boolean
  },
): Promise<{ success: boolean; message: string; orden?: OrdenCompra }> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const ordenIndex = ordenesCompraEstaticas.findIndex((o) => o.id === ordenId)
  if (ordenIndex === -1) {
    return { success: false, message: "Orden no encontrada" }
  }

  const orden = { ...ordenesCompraEstaticas[ordenIndex] }

  if (!["confirmada", "recibida-parcial"].includes(orden.estado)) {
    return { success: false, message: "Solo se pueden recepcionar órdenes confirmadas o parcialmente recibidas" }
  }

  // Crear nueva recepción
  const nuevaRecepcion: RecepcionMaterial = {
    id: `rec-${ordenId}-${orden.recepciones.length + 1}`,
    ordenCompraId: ordenId,
    fecha: new Date().toISOString(),
    usuarioId: "user-001",
    usuarioNombre: "Carlos Rodríguez",
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

    const cantidadPendiente = ordenItem.cantidad - ordenItem.cantidadRecibida
    if (item.cantidadRecibida > cantidadPendiente) {
      return {
        success: false,
        message: `La cantidad recibida (${item.cantidadRecibida}) excede la cantidad pendiente (${cantidadPendiente}) para ${ordenItem.materiaPrimaNombre}`,
      }
    }

    ordenItem.cantidadRecibida += item.cantidadRecibida

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
    nuevoEstado = recepcion.esCompleta ? "cerrada" : "recibida"
  } else if (orden.items.some((item) => item.cantidadRecibida > 0)) {
    nuevoEstado = "recibida-parcial"
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

  orden.recepciones.push(nuevaRecepcion)
  orden.updatedAt = nuevaRecepcion.fecha

  ordenesCompraEstaticas[ordenIndex] = orden

  return { success: true, message: "Recepción registrada correctamente", orden }
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
  await new Promise((resolve) => setTimeout(resolve, 500))
  let ordenesCompra = [...ordenesCompraEstaticas]

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

  return ordenesCompra.sort((a, b) => new Date(b.fechaEmision).getTime() - new Date(a.fechaEmision).getTime())
}
