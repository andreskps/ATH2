import { getOrdenById, getOrdenes } from "@/lib/data/ordenes"
import { getProductoById } from "@/lib/data/productos"
import { getMolde } from "@/lib/data/moldes"
import { getEmpleadosByRol } from "@/lib/data/empleados"
import { getMaquinaById } from "@/lib/data/maquinaria"
import { getInventarioByProductoId } from "@/lib/data/inventario"

// Datos de ejemplo para programaciones
const programaciones = [
  {
    id: 1,
    ordenId: 3,
    productoId: "4", // Botella HDPE 1L
    maquinaId: "1", // Inyectora Hidráulica Principal
    moldeId: 2, // Molde para botellas
    fechaInicio: "2023-06-15",
    fechaFin: "2023-06-17",
    turno: "mañana",
    operarioIds: [1, 3],
    responsableId: 1,
    estado: "completada",
    cantidadProgramada: 2000,
    cantidadProducida: 2000,
    observaciones: "Producción completada sin incidencias",
    horaInicio: "07:00",
    horaFin: "15:00",
    eficiencia: 98,
    tiempoPreparacion: 45, // minutos
    tiempoCierre: 30, // minutos
    paradas: [
      {
        id: 1,
        fecha: "2023-06-16",
        duracion: 30, // minutos
        motivo: "Cambio de material",
        responsable: "Juan Pérez",
      },
    ],
  },
  {
    id: 2,
    ordenId: 1,
    productoId: "1", // Botella PET 500ml
    maquinaId: "2", // Inyectora Eléctrica Precisión
    moldeId: 1, // Molde para botellas pequeñas
    fechaInicio: "2023-06-20",
    fechaFin: "2023-06-22",
    turno: "tarde",
    operarioIds: [2, 5],
    responsableId: 2,
    estado: "enProceso",
    cantidadProgramada: 5000,
    cantidadProducida: 2500,
    observaciones: "Producción en curso, 50% completado",
    horaInicio: "15:00",
    horaFin: "23:00",
    eficiencia: 92,
    tiempoPreparacion: 60, // minutos
    paradas: [
      {
        id: 2,
        fecha: "2023-06-21",
        duracion: 45, // minutos
        motivo: "Ajuste de parámetros",
        responsable: "María López",
      },
    ],
  },
  {
    id: 3,
    ordenId: 2,
    productoId: "3", // Contenedor rectangular 1L
    maquinaId: "3", // Extrusora Línea 1
    moldeId: 3, // Molde para contenedores
    fechaInicio: "2023-06-25",
    fechaFin: "2023-06-27",
    turno: "noche",
    operarioIds: [1, 4],
    responsableId: 5,
    estado: "pendiente",
    cantidadProgramada: 3000,
    cantidadProducida: 0,
    observaciones: "Programación pendiente de iniciar",
    horaInicio: "23:00",
    horaFin: "07:00",
    tiempoPreparacion: 50, // minutos
  },
  {
    id: 4,
    ordenId: 4,
    productoId: "5", // Envase cosmético 100ml
    maquinaId: "4", // Sopladora Automática
    moldeId: 4, // Molde para envases cosméticos
    fechaInicio: "2023-07-01",
    fechaFin: "2023-07-05",
    turno: "mañana",
    operarioIds: [3, 5],
    responsableId: 2,
    estado: "cancelada",
    cantidadProgramada: 10000,
    cantidadProducida: 0,
    observaciones: "Cancelada por cambio en especificaciones del cliente",
    horaInicio: "07:00",
    horaFin: "15:00",
  },
  {
    id: 5,
    ordenId: 6,
    productoId: "1", // Botella PET 500ml
    maquinaId: "1", // Inyectora Hidráulica Principal
    moldeId: 1, // Molde para botellas pequeñas
    fechaInicio: "2023-07-10",
    fechaFin: "2023-07-12",
    turno: "tarde",
    operarioIds: [2, 4],
    responsableId: 5,
    estado: "completada",
    cantidadProgramada: 3000,
    cantidadProducida: 2850,
    observaciones: "Producción completada con rendimiento del 95%",
    horaInicio: "15:00",
    horaFin: "23:00",
    eficiencia: 95,
    tiempoPreparacion: 40, // minutos
    tiempoCierre: 35, // minutos
    paradas: [
      {
        id: 3,
        fecha: "2023-07-11",
        duracion: 60, // minutos
        motivo: "Mantenimiento preventivo",
        responsable: "Roberto García",
      },
    ],
  },
  {
    id: 6,
    ordenId: 7,
    productoId: "4", // Botella HDPE 1L
    maquinaId: "5", // Inyectora Hidráulica Secundaria
    moldeId: 2, // Molde para botellas
    fechaInicio: "2023-07-15",
    fechaFin: "2023-07-18",
    turno: "mañana",
    operarioIds: [1, 5],
    responsableId: 1,
    estado: "enProceso",
    cantidadProgramada: 4000,
    cantidadProducida: 1500,
    observaciones: "Producción en curso, 37.5% completado",
    horaInicio: "07:00",
    horaFin: "15:00",
    eficiencia: 88,
    tiempoPreparacion: 55, // minutos
    paradas: [
      {
        id: 4,
        fecha: "2023-07-16",
        duracion: 90, // minutos
        motivo: "Fallo en sistema de refrigeración",
        responsable: "Pedro Ramírez",
      },
    ],
  },
  {
    id: 7,
    ordenId: 1,
    productoId: "2", // Tapa rosca estándar
    maquinaId: "2", // Inyectora Eléctrica Precisión
    moldeId: 5, // Molde para tapas
    fechaInicio: "2023-07-20",
    fechaFin: "2023-07-21",
    turno: "noche",
    operarioIds: [3, 4],
    responsableId: 2,
    estado: "pendiente",
    cantidadProgramada: 5000,
    cantidadProducida: 0,
    observaciones: "Programación para tapas de la orden OV-2023-001",
    horaInicio: "23:00",
    horaFin: "07:00",
    tiempoPreparacion: 30, // minutos
  },
]

// Datos de ejemplo para moldes disponibles para programación
export const moldesDisponibles = [
  {
    id: 1,
    nombre: "Molde para botellas pequeñas",
    tipoInyeccion: "Hidráulica",
    cavidades: 4,
    compatibleMaquinas: ["1", "2", "5"],
  },
  {
    id: 2,
    nombre: "Molde para botellas medianas",
    tipoInyeccion: "Hidráulica",
    cavidades: 2,
    compatibleMaquinas: ["1", "5"],
  },
  { id: 3, nombre: "Molde para contenedores", tipoInyeccion: "Eléctrica", cavidades: 1, compatibleMaquinas: ["2"] },
  {
    id: 4,
    nombre: "Molde para envases cosméticos",
    tipoInyeccion: "Híbrida",
    cavidades: 8,
    compatibleMaquinas: ["1", "2", "4", "5"],
  },
  { id: 5, nombre: "Molde para tapas", tipoInyeccion: "Eléctrica", cavidades: 16, compatibleMaquinas: ["2"] },
]

// Datos de ejemplo para turnos de trabajo
export const turnos = [
  { id: "mañana", nombre: "Mañana", horaInicio: "07:00", horaFin: "15:00" },
  { id: "tarde", nombre: "Tarde", horaInicio: "15:00", horaFin: "23:00" },
  { id: "noche", nombre: "Noche", horaInicio: "23:00", horaFin: "07:00" },
]

// Datos de ejemplo para estados de programación
export const estadosProgramacion = [
  { id: "pendiente", nombre: "Pendiente", color: "bg-yellow-100 text-yellow-800" },
  { id: "enProceso", nombre: "En Proceso", color: "bg-blue-100 text-blue-800" },
  { id: "completada", nombre: "Completada", color: "bg-green-100 text-green-800" },
  { id: "cancelada", nombre: "Cancelada", color: "bg-red-100 text-red-800" },
  { id: "pausada", nombre: "Pausada", color: "bg-orange-100 text-orange-800" },
]

// Función para obtener todas las programaciones
export function getProgramaciones() {
  return programaciones
}

// Función para obtener una programación por ID
export function getProgramacionById(id: number) {
  return programaciones.find((prog) => prog.id === id)
}

// Función para obtener programaciones por orden
export function getProgramacionesByOrdenId(ordenId: number) {
  return programaciones.filter((prog) => prog.ordenId === ordenId)
}

// Función para obtener programaciones por máquina
export function getProgramacionesByMaquinaId(maquinaId: string) {
  return programaciones.filter((prog) => prog.maquinaId === maquinaId)
}

// Función para obtener programaciones por estado
export function getProgramacionesByEstado(estado: string) {
  return programaciones.filter((prog) => prog.estado === estado)
}

// Función para obtener órdenes liberadas para programación
export function getOrdenesLiberadas() {
  // Filtramos las órdenes que están en estado "liberadaProduccion" o "enProduccion"
  // Estos estados indican que la orden está lista para ser programada o ya está en producción
  return getOrdenes().filter((orden) => orden.estado === "liberadaProduccion" || orden.estado === "enProduccion")
}

// Función para obtener productos pendientes de programar para una orden
export function getProductosParaProgramar(ordenId: number) {
  const orden = getOrdenById(ordenId)
  if (!orden || !orden.productos) return []

  // Verificar si es una de nuestras órdenes de ejemplo
  const esOrdenEjemplo = [1, 2, 3].includes(ordenId)

  const productosParaProgramar = []

  for (const productoOrden of orden.productos) {
    // Para órdenes de ejemplo, siempre consideramos que hay productos pendientes
    if (esOrdenEjemplo) {
      const producto = getProductoById(productoOrden.productoId)
      if (producto) {
        productosParaProgramar.push({
          id: productoOrden.id,
          productoId: productoOrden.productoId,
          nombre: producto.nombre || productoOrden.nombre,
          cantidadTotal: productoOrden.cantidad,
          cantidadProgramada: 0,
          cantidadPendiente: productoOrden.cantidad,
        })
      }
      continue
    }

    // Para órdenes reales, verificamos las programaciones existentes
    const programacionesExistentes = programaciones.filter(
      (prog) => prog.ordenId === ordenId && prog.productoId === productoOrden.productoId,
    )

    // Calcular cantidad ya programada
    const cantidadProgramada = programacionesExistentes.reduce((total, prog) => total + prog.cantidadProgramada, 0)

    // Si hay cantidad pendiente por programar
    if (cantidadProgramada < productoOrden.cantidad) {
      const producto = getProductoById(productoOrden.productoId)
      if (producto) {
        productosParaProgramar.push({
          id: productoOrden.id,
          productoId: productoOrden.productoId,
          nombre: producto.nombre,
          cantidadTotal: productoOrden.cantidad,
          cantidadProgramada,
          cantidadPendiente: productoOrden.cantidad - cantidadProgramada,
        })
      }
    }
  }

  return productosParaProgramar
}

// Función para obtener detalles completos de un producto para programar
export function getDetallesProductoParaProgramar(ordenId: number, productoId: string) {
  const orden = getOrdenById(ordenId)
  if (!orden) return null

  const productoOrden = orden.productos.find((p) => p.productoId.toString() === productoId)
  if (!productoOrden) return null

  const producto = getProductoById(productoOrden.productoId)
  if (!producto) return null

  // Obtener el molde asociado al producto
  const molde = producto.moldeId ? getMolde(producto.moldeId) : null

  // Obtener cantidad en inventario
  const inventario = getInventarioByProductoId(producto.id)
  const cantidadInventario = inventario ? inventario.cantidad : 0

  // Calcular cantidad ya programada
  const programacionesExistentes = programaciones.filter(
    (prog) => prog.ordenId === ordenId && prog.productoId === productoOrden.productoId,
  )
  const cantidadProgramada = programacionesExistentes.reduce((total, prog) => total + prog.cantidadProgramada, 0)
  const cantidadPendiente = productoOrden.cantidad - cantidadProgramada

  return {
    producto,
    productoOrden,
    molde,
    cantidadInventario,
    cantidadProduccion: cantidadProgramada,
    cantidadPendiente,
  }
}

// Función para verificar disponibilidad de una máquina en un rango de fechas
export function verificarDisponibilidadMaquina(
  maquinaId: string,
  fechaInicio: string,
  fechaFin: string,
  turno: string,
) {
  // Verificar si la máquina existe y está activa
  const maquina = getMaquinaById(maquinaId)
  if (!maquina || maquina.estado !== "Activa") {
    return { disponible: false, mensaje: "La máquina no está disponible o no existe" }
  }

  // Buscar programaciones que se solapen con el rango de fechas y turno
  const programacionesSolapadas = programaciones.filter(
    (prog) =>
      prog.maquinaId === maquinaId &&
      prog.estado !== "cancelada" &&
      ((prog.fechaInicio <= fechaInicio && prog.fechaFin >= fechaInicio) ||
        (prog.fechaInicio <= fechaFin && prog.fechaFin >= fechaFin) ||
        (prog.fechaInicio >= fechaInicio && prog.fechaFin <= fechaFin)) &&
      prog.turno === turno,
  )

  if (programacionesSolapadas.length > 0) {
    return {
      disponible: false,
      mensaje: "La máquina ya tiene programaciones en el rango de fechas y turno seleccionados",
      conflictos: programacionesSolapadas,
    }
  }

  return { disponible: true }
}

// Función para verificar compatibilidad entre molde y máquina
export function verificarCompatibilidadMoldeMaquina(moldeId: number, maquinaId: string) {
  // Buscar en los datos de moldes disponibles
  const molde = moldesDisponibles.find((m) => m.id === moldeId)
  if (!molde) return false

  // Verificar si la máquina está en la lista de compatibles
  return molde.compatibleMaquinas.includes(maquinaId)
}

// Función para obtener operarios disponibles por turno
export function getOperariosDisponiblesPorTurno(turno: string, fecha: string) {
  // En un sistema real, verificaríamos la disponibilidad real de los operarios
  // Para este ejemplo, simplemente devolvemos operarios filtrados por rol

  const operarios = getEmpleadosByRol("Operario")

  // Simulamos disponibilidad basada en programaciones existentes
  return operarios.filter((operario) => {
    // Verificar si el operario ya está asignado a otra programación en la misma fecha y turno
    const programacionesOperario = programaciones.filter(
      (prog) =>
        prog.operarioIds.includes(operario.id) &&
        prog.fechaInicio <= fecha &&
        prog.fechaFin >= fecha &&
        prog.turno === turno &&
        prog.estado !== "cancelada",
    )

    return programacionesOperario.length === 0
  })
}

// Función para obtener todos los moldes disponibles
export function getMoldesDisponibles() {
  return moldesDisponibles
}

// Función para obtener todos los turnos
export function getTurnos() {
  return turnos
}

// Función para obtener todos los estados de programación
export function getEstadosProgramacion() {
  return estadosProgramacion
}

// Función para crear una nueva programación
export function crearProgramacion(data: any) {
  const newId = Math.max(...programaciones.map((p) => p.id)) + 1

  // Obtener información del turno
  const turnoInfo = turnos.find((t) => t.id === data.turno)

  const nuevaProgramacion = {
    id: newId,
    ordenId: data.ordenId,
    productoId: data.productoId,
    maquinaId: data.maquinaId,
    moldeId: data.moldeId,
    fechaInicio: data.fechaInicio,
    fechaFin: data.fechaFin,
    turno: data.turno,
    horaInicio: turnoInfo ? turnoInfo.horaInicio : "00:00",
    horaFin: turnoInfo ? turnoInfo.horaFin : "00:00",
    operarioIds: data.operarioIds,
    responsableId: data.responsableId,
    estado: "pendiente",
    cantidadProgramada: data.cantidadProgramada,
    cantidadProducida: 0,
    observaciones: data.observaciones || "",
    tiempoPreparacion: data.tiempoPreparacion || 30,
    eficiencia: 0,
    paradas: [],
  }

  programaciones.push(nuevaProgramacion)
  return nuevaProgramacion
}

// Función para actualizar el estado de una programación
export function actualizarEstadoProgramacion(id: number, nuevoEstado: string, cantidadProducida?: number) {
  const index = programaciones.findIndex((prog) => prog.id === id)
  if (index === -1) return { success: false, message: "Programación no encontrada" }

  programaciones[index] = {
    ...programaciones[index],
    estado: nuevoEstado,
    ...(cantidadProducida !== undefined && { cantidadProducida }),
  }

  return { success: true, programacion: programaciones[index] }
}

// Función para registrar una parada en una programación
export function registrarParada(
  programacionId: number,
  parada: { fecha: string; duracion: number; motivo: string; responsable: string },
) {
  const index = programaciones.findIndex((prog) => prog.id === programacionId)
  if (index === -1) return { success: false, message: "Programación no encontrada" }

  const nuevaParada = {
    id: programaciones[index].paradas ? Math.max(...programaciones[index].paradas.map((p) => p.id), 0) + 1 : 1,
    ...parada,
  }

  if (!programaciones[index].paradas) {
    programaciones[index].paradas = []
  }

  programaciones[index].paradas.push(nuevaParada)
  return { success: true, parada: nuevaParada }
}

// Función para actualizar la eficiencia de una programación
export function actualizarEficiencia(programacionId: number, eficiencia: number) {
  const index = programaciones.findIndex((prog) => prog.id === programacionId)
  if (index === -1) return { success: false, message: "Programación no encontrada" }

  programaciones[index].eficiencia = eficiencia
  return { success: true, programacion: programaciones[index] }
}

// Función para completar una programación
export function completarProgramacion(programacionId: number, cantidadProducida: number, tiempoCierre: number) {
  const index = programaciones.findIndex((prog) => prog.id === programacionId)
  if (index === -1) return { success: false, message: "Programación no encontrada" }

  programaciones[index] = {
    ...programaciones[index],
    estado: "completada",
    cantidadProducida,
    tiempoCierre,
    eficiencia: Math.round((cantidadProducida / programaciones[index].cantidadProgramada) * 100),
  }

  return { success: true, programacion: programaciones[index] }
}

// Función para eliminar una programación
export function eliminarProgramacion(id: number) {
  const index = programaciones.findIndex((prog) => prog.id === id)
  if (index === -1) return { success: false, message: "Programación no encontrada" }

  programaciones.splice(index, 1)
  return { success: true }
}

// Función para obtener estadísticas de programación
export function getEstadisticasProgramacion() {
  const total = programaciones.length
  const completadas = programaciones.filter((p) => p.estado === "completada").length
  const enProceso = programaciones.filter((p) => p.estado === "enProceso").length
  const pendientes = programaciones.filter((p) => p.estado === "pendiente").length
  const canceladas = programaciones.filter((p) => p.estado === "cancelada").length

  const eficienciaPromedio =
    programaciones.filter((p) => p.estado === "completada" && p.eficiencia).reduce((sum, p) => sum + p.eficiencia, 0) /
      completadas || 0

  const cantidadProgramadaTotal = programaciones.reduce((sum, p) => sum + p.cantidadProgramada, 0)
  const cantidadProducidaTotal = programaciones.reduce((sum, p) => sum + p.cantidadProducida, 0)

  return {
    total,
    completadas,
    enProceso,
    pendientes,
    canceladas,
    eficienciaPromedio,
    cantidadProgramadaTotal,
    cantidadProducidaTotal,
    porcentajeCompletado: Math.round((cantidadProducidaTotal / cantidadProgramadaTotal) * 100) || 0,
  }
}

// Función para obtener programaciones por rango de fechas
export function getProgramacionesByRangoFechas(fechaInicio: string, fechaFin: string) {
  return programaciones.filter(
    (prog) =>
      (prog.fechaInicio >= fechaInicio && prog.fechaInicio <= fechaFin) ||
      (prog.fechaFin >= fechaInicio && prog.fechaFin <= fechaFin) ||
      (prog.fechaInicio <= fechaInicio && prog.fechaFin >= fechaFin),
  )
}

// Función para obtener programaciones por producto
export function getProgramacionesByProductoId(productoId: string) {
  return programaciones.filter((prog) => prog.productoId === productoId)
}

// Función para obtener programaciones por responsable
export function getProgramacionesByResponsableId(responsableId: number) {
  return programaciones.filter((prog) => prog.responsableId === responsableId)
}

// Función para obtener programaciones por operario
export function getProgramacionesByOperarioId(operarioId: number) {
  return programaciones.filter((prog) => prog.operarioIds.includes(operarioId))
}

// Función para obtener programaciones por molde
export function getProgramacionesByMoldeId(moldeId: number) {
  return programaciones.filter((prog) => prog.moldeId === moldeId)
}
