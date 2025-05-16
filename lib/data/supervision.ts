import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"

export type TipoParada =
  | "Cambio de molde"
  | "Mantenimiento"
  | "Falta de material"
  | "Falla mecánica"
  | "Falla eléctrica"
  | "Ajuste de parámetros"
  | "Cambio de turno"
  | "Descanso"
  | "Otro"

export type TipoDefecto =
  | "Rebabas"
  | "Rechupes"
  | "Líneas de flujo"
  | "Burbujas"
  | "Deformación"
  | "Manchas"
  | "Piezas incompletas"
  | "Otro"

export interface Parada {
  id: string
  supervisionId: string
  tipo: TipoParada
  inicio: Date
  fin: Date | null
  duracion: number | null
  motivo: string
  responsable: string
}

export interface Defecto {
  id: string
  supervisionId: string
  tipo: TipoDefecto
  cantidad: number
  fecha: Date
  descripcion: string
  accionCorrectiva: string
}

export interface RegistroProduccion {
  id: string
  supervisionId: string
  fecha: Date
  cantidadProducida: number
  cantidadDefectuosa: number
  eficiencia: number
  observaciones: string
}

export interface Supervision {
  id: string
  programacionId: string
  ordenId: string
  productoId: string
  maquinaId: string
  supervisor: string
  operador: string
  estado: "pendiente" | "en_produccion" | "pausada" | "finalizada"
  fechaInicio: Date | null
  fechaFin: Date | null
  cantidadProgramada: number
  cantidadProducida: number
  cantidadDefectuosa: number
  eficienciaGeneral: number
  tiempoTotal: number
  tiempoParadas: number
  cicloPromedio: number
  ultimaActualizacion: Date
}

// Datos de ejemplo para supervisiones
export const supervisiones: Supervision[] = [
  {
    id: "1",
    programacionId: "1",
    ordenId: "ORD-2023-001",
    productoId: "1",
    maquinaId: "1",
    supervisor: "Carlos Mendoza",
    operador: "Juan Pérez",
    estado: "en_produccion",
    fechaInicio: new Date(2023, 5, 15, 8, 0, 0),
    fechaFin: null,
    cantidadProgramada: 5000,
    cantidadProducida: 2500,
    cantidadDefectuosa: 75,
    eficienciaGeneral: 92.5,
    tiempoTotal: 480, // minutos
    tiempoParadas: 45, // minutos
    cicloPromedio: 12.5, // segundos
    ultimaActualizacion: new Date(2023, 5, 15, 14, 30, 0),
  },
  {
    id: "2",
    programacionId: "2",
    ordenId: "ORD-2023-002",
    productoId: "2",
    maquinaId: "2",
    supervisor: "Ana Gómez",
    operador: "Roberto Sánchez",
    estado: "finalizada",
    fechaInicio: new Date(2023, 5, 14, 7, 0, 0),
    fechaFin: new Date(2023, 5, 14, 19, 0, 0),
    cantidadProgramada: 10000,
    cantidadProducida: 9800,
    cantidadDefectuosa: 120,
    eficienciaGeneral: 97.8,
    tiempoTotal: 720, // minutos
    tiempoParadas: 35, // minutos
    cicloPromedio: 4.2, // segundos
    ultimaActualizacion: new Date(2023, 5, 14, 19, 0, 0),
  },
  {
    id: "3",
    programacionId: "3",
    ordenId: "ORD-2023-003",
    productoId: "3",
    maquinaId: "3",
    supervisor: "Miguel Torres",
    operador: "Laura Díaz",
    estado: "pausada",
    fechaInicio: new Date(2023, 5, 15, 6, 0, 0),
    fechaFin: null,
    cantidadProgramada: 3000,
    cantidadProducida: 1200,
    cantidadDefectuosa: 45,
    eficienciaGeneral: 90.2,
    tiempoTotal: 360, // minutos
    tiempoParadas: 90, // minutos
    cicloPromedio: 15.8, // segundos
    ultimaActualizacion: new Date(2023, 5, 15, 12, 0, 0),
  },
  {
    id: "4",
    programacionId: "4",
    ordenId: "ORD-2023-004",
    productoId: "4",
    maquinaId: "4",
    supervisor: "Sofía Ramírez",
    operador: "Pedro Martínez",
    estado: "pendiente",
    fechaInicio: null,
    fechaFin: null,
    cantidadProgramada: 8000,
    cantidadProducida: 0,
    cantidadDefectuosa: 0,
    eficienciaGeneral: 0,
    tiempoTotal: 0,
    tiempoParadas: 0,
    cicloPromedio: 0,
    ultimaActualizacion: new Date(2023, 5, 15, 16, 0, 0),
  },
  {
    id: "5",
    programacionId: "5",
    ordenId: "ORD-2023-005",
    productoId: "5",
    maquinaId: "5",
    supervisor: "Javier López",
    operador: "María Rodríguez",
    estado: "pendiente",
    fechaInicio: null,
    fechaFin: null,
    cantidadProgramada: 12000,
    cantidadProducida: 0,
    cantidadDefectuosa: 0,
    eficienciaGeneral: 0,
    tiempoTotal: 0,
    tiempoParadas: 0,
    cicloPromedio: 0,
    ultimaActualizacion: new Date(2023, 5, 16, 8, 0, 0),
  },
]

// Datos de ejemplo para paradas
export const paradas: Parada[] = [
  {
    id: "1",
    supervisionId: "1",
    tipo: "Cambio de molde",
    inicio: new Date(2023, 5, 15, 10, 0, 0),
    fin: new Date(2023, 5, 15, 10, 30, 0),
    duracion: 30,
    motivo: "Cambio programado de molde",
    responsable: "Juan Pérez",
  },
  {
    id: "2",
    supervisionId: "1",
    tipo: "Falla mecánica",
    inicio: new Date(2023, 5, 15, 13, 15, 0),
    fin: new Date(2023, 5, 15, 13, 30, 0),
    duracion: 15,
    motivo: "Problema con el sistema hidráulico",
    responsable: "Carlos Mendoza",
  },
  {
    id: "3",
    supervisionId: "2",
    tipo: "Ajuste de parámetros",
    inicio: new Date(2023, 5, 14, 9, 45, 0),
    fin: new Date(2023, 5, 14, 10, 0, 0),
    duracion: 15,
    motivo: "Ajuste de temperatura y presión",
    responsable: "Roberto Sánchez",
  },
  {
    id: "4",
    supervisionId: "2",
    tipo: "Descanso",
    inicio: new Date(2023, 5, 14, 12, 0, 0),
    fin: new Date(2023, 5, 14, 12, 20, 0),
    duracion: 20,
    motivo: "Descanso programado",
    responsable: "Ana Gómez",
  },
  {
    id: "5",
    supervisionId: "3",
    tipo: "Falta de material",
    inicio: new Date(2023, 5, 15, 8, 30, 0),
    fin: new Date(2023, 5, 15, 9, 30, 0),
    duracion: 60,
    motivo: "Espera de materia prima",
    responsable: "Miguel Torres",
  },
  {
    id: "6",
    supervisionId: "3",
    tipo: "Falla eléctrica",
    inicio: new Date(2023, 5, 15, 11, 0, 0),
    fin: null,
    duracion: null,
    motivo: "Problema con el sistema de control",
    responsable: "Laura Díaz",
  },
]

// Datos de ejemplo para defectos
export const defectos: Defecto[] = [
  {
    id: "1",
    supervisionId: "1",
    tipo: "Rebabas",
    cantidad: 45,
    fecha: new Date(2023, 5, 15, 11, 0, 0),
    descripcion: "Exceso de material en las uniones",
    accionCorrectiva: "Ajuste de presión de cierre",
  },
  {
    id: "2",
    supervisionId: "1",
    tipo: "Rechupes",
    cantidad: 30,
    fecha: new Date(2023, 5, 15, 13, 0, 0),
    descripcion: "Hundimientos en la superficie",
    accionCorrectiva: "Aumento de tiempo de enfriamiento",
  },
  {
    id: "3",
    supervisionId: "2",
    tipo: "Burbujas",
    cantidad: 65,
    fecha: new Date(2023, 5, 14, 10, 30, 0),
    descripcion: "Burbujas de aire en el producto",
    accionCorrectiva: "Ajuste de temperatura de inyección",
  },
  {
    id: "4",
    supervisionId: "2",
    tipo: "Líneas de flujo",
    cantidad: 55,
    fecha: new Date(2023, 5, 14, 15, 0, 0),
    descripcion: "Marcas visibles en la dirección del flujo",
    accionCorrectiva: "Aumento de temperatura del molde",
  },
  {
    id: "5",
    supervisionId: "3",
    tipo: "Piezas incompletas",
    cantidad: 25,
    fecha: new Date(2023, 5, 15, 7, 30, 0),
    descripcion: "Piezas con llenado incompleto",
    accionCorrectiva: "Aumento de presión de inyección",
  },
  {
    id: "6",
    supervisionId: "3",
    tipo: "Deformación",
    cantidad: 20,
    fecha: new Date(2023, 5, 15, 10, 0, 0),
    descripcion: "Deformación durante la extracción",
    accionCorrectiva: "Ajuste del sistema de expulsión",
  },
]

// Datos de ejemplo para registros de producción
export const registrosProduccion: RegistroProduccion[] = [
  {
    id: "1",
    supervisionId: "1",
    fecha: new Date(2023, 5, 15, 9, 0, 0),
    cantidadProducida: 800,
    cantidadDefectuosa: 15,
    eficiencia: 94.5,
    observaciones: "Producción estable",
  },
  {
    id: "2",
    supervisionId: "1",
    fecha: new Date(2023, 5, 15, 12, 0, 0),
    cantidadProducida: 750,
    cantidadDefectuosa: 25,
    eficiencia: 91.2,
    observaciones: "Ligero aumento en defectos",
  },
  {
    id: "3",
    supervisionId: "1",
    fecha: new Date(2023, 5, 15, 14, 0, 0),
    cantidadProducida: 950,
    cantidadDefectuosa: 35,
    eficiencia: 92.8,
    observaciones: "Recuperación después de parada",
  },
  {
    id: "4",
    supervisionId: "2",
    fecha: new Date(2023, 5, 14, 10, 0, 0),
    cantidadProducida: 2500,
    cantidadDefectuosa: 30,
    eficiencia: 98.2,
    observaciones: "Excelente rendimiento",
  },
  {
    id: "5",
    supervisionId: "2",
    fecha: new Date(2023, 5, 14, 14, 0, 0),
    cantidadProducida: 3800,
    cantidadDefectuosa: 45,
    eficiencia: 97.5,
    observaciones: "Ritmo constante",
  },
  {
    id: "6",
    supervisionId: "2",
    fecha: new Date(2023, 5, 14, 18, 0, 0),
    cantidadProducida: 3500,
    cantidadDefectuosa: 45,
    eficiencia: 97.8,
    observaciones: "Finalización sin incidentes",
  },
  {
    id: "7",
    supervisionId: "3",
    fecha: new Date(2023, 5, 15, 7, 0, 0),
    cantidadProducida: 450,
    cantidadDefectuosa: 15,
    eficiencia: 93.5,
    observaciones: "Inicio con ajustes",
  },
  {
    id: "8",
    supervisionId: "3",
    fecha: new Date(2023, 5, 15, 10, 0, 0),
    cantidadProducida: 750,
    cantidadDefectuosa: 30,
    eficiencia: 88.4,
    observaciones: "Problemas con la calidad",
  },
]

// Funciones de utilidad para obtener datos
export function getSupervision(id: string): Supervision | undefined {
  return supervisiones.find((s) => s.id === id)
}

export function getSupervisionesPorEstado(estado: Supervision["estado"]): Supervision[] {
  return supervisiones.filter((s) => s.estado === estado)
}

export function getParadasPorSupervision(supervisionId: string): Parada[] {
  return paradas.filter((p) => p.supervisionId === supervisionId)
}

export function getDefectosPorSupervision(supervisionId: string): Defecto[] {
  return defectos.filter((d) => d.supervisionId === supervisionId)
}

export function getRegistrosPorSupervision(supervisionId: string): RegistroProduccion[] {
  return registrosProduccion.filter((r) => r.supervisionId === supervisionId)
}

export function getEstadoSupervisionLabel(estado: Supervision["estado"]): string {
  const labels = {
    pendiente: "Pendiente",
    en_produccion: "En producción",
    pausada: "Pausada",
    finalizada: "Finalizada",
  }
  return labels[estado]
}

export function getEstadoSupervisionColor(estado: Supervision["estado"]): string {
  const colors = {
    pendiente: "text-yellow-500",
    en_produccion: "text-green-500",
    pausada: "text-orange-500",
    finalizada: "text-blue-500",
  }
  return colors[estado]
}

export function formatTiempoTranscurrido(fecha: Date | null): string {
  if (!fecha) return "N/A"
  return formatDistanceToNow(fecha, { addSuffix: true, locale: es })
}

export function calcularProgreso(producido: number, programado: number): number {
  if (programado === 0) return 0
  const progreso = (producido / programado) * 100
  return Math.min(Math.round(progreso), 100)
}
