// Tipos para las estadísticas de OEE
export interface OEEData {
  id: string
  maquinaId: string
  maquinaNombre: string
  fecha: Date
  disponibilidad: number // porcentaje (0-100)
  rendimiento: number // porcentaje (0-100)
  calidad: number // porcentaje (0-100)
  oee: number // porcentaje (0-100)
  tiempoOperacion: number // minutos
  tiempoProgramado: number // minutos
  unidadesProducidas: number
  unidadesProgramadas: number
  unidadesDefectuosas: number
}

export interface OEEHistorico {
  fecha: string // formato YYYY-MM-DD
  oee: number
  disponibilidad: number
  rendimiento: number
  calidad: number
}

export interface OEEPorMaquina {
  maquinaId: string
  maquinaNombre: string
  oee: number
  disponibilidad: number
  rendimiento: number
  calidad: number
  tendencia: number[] // últimos 7 valores de OEE para mostrar tendencia
}

// Datos de ejemplo para OEE
export const oeeData: OEEData[] = [
  {
    id: "1",
    maquinaId: "1",
    maquinaNombre: "Inyectora Hidráulica 150T",
    fecha: new Date(2023, 9, 15),
    disponibilidad: 92.5,
    rendimiento: 88.3,
    calidad: 98.2,
    oee: 80.1, // disponibilidad * rendimiento * calidad / 10000
    tiempoOperacion: 445,
    tiempoProgramado: 480,
    unidadesProducidas: 3532,
    unidadesProgramadas: 4000,
    unidadesDefectuosas: 64,
  },
  {
    id: "2",
    maquinaId: "2",
    maquinaNombre: "Inyectora Eléctrica 100T",
    fecha: new Date(2023, 9, 15),
    disponibilidad: 97.1,
    rendimiento: 94.5,
    calidad: 99.3,
    oee: 91.2,
    tiempoOperacion: 466,
    tiempoProgramado: 480,
    unidadesProducidas: 5197,
    unidadesProgramadas: 5500,
    unidadesDefectuosas: 36,
  },
  {
    id: "3",
    maquinaId: "3",
    maquinaNombre: "Extrusora 75mm",
    fecha: new Date(2023, 9, 15),
    disponibilidad: 88.7,
    rendimiento: 82.4,
    calidad: 97.5,
    oee: 71.3,
    tiempoOperacion: 426,
    tiempoProgramado: 480,
    unidadesProducidas: 2884,
    unidadesProgramadas: 3500,
    unidadesDefectuosas: 72,
  },
  {
    id: "4",
    maquinaId: "4",
    maquinaNombre: "Sopladora 5L",
    fecha: new Date(2023, 9, 15),
    disponibilidad: 94.8,
    rendimiento: 91.2,
    calidad: 98.7,
    oee: 85.3,
    tiempoOperacion: 455,
    tiempoProgramado: 480,
    unidadesProducidas: 4104,
    unidadesProgramadas: 4500,
    unidadesDefectuosas: 53,
  },
  {
    id: "5",
    maquinaId: "5",
    maquinaNombre: "Inyectora Hidráulica 200T",
    fecha: new Date(2023, 9, 15),
    disponibilidad: 90.2,
    rendimiento: 87.6,
    calidad: 96.8,
    oee: 76.4,
    tiempoOperacion: 433,
    tiempoProgramado: 480,
    unidadesProducidas: 3066,
    unidadesProgramadas: 3500,
    unidadesDefectuosas: 98,
  },
]

// Datos históricos de OEE para gráficos
export const oeeHistorico: OEEHistorico[] = [
  { fecha: "2023-10-09", oee: 78.5, disponibilidad: 91.2, rendimiento: 87.3, calidad: 98.5 },
  { fecha: "2023-10-10", oee: 79.8, disponibilidad: 92.5, rendimiento: 87.8, calidad: 98.2 },
  { fecha: "2023-10-11", oee: 81.2, disponibilidad: 93.1, rendimiento: 88.5, calidad: 98.4 },
  { fecha: "2023-10-12", oee: 80.5, disponibilidad: 92.8, rendimiento: 88.0, calidad: 98.3 },
  { fecha: "2023-10-13", oee: 82.7, disponibilidad: 94.2, rendimiento: 89.3, calidad: 98.1 },
  { fecha: "2023-10-14", oee: 83.5, disponibilidad: 94.8, rendimiento: 89.7, calidad: 98.2 },
  { fecha: "2023-10-15", oee: 80.9, disponibilidad: 92.7, rendimiento: 88.8, calidad: 98.3 },
]

// Datos de OEE por máquina
export const oeePorMaquina: OEEPorMaquina[] = [
  {
    maquinaId: "1",
    maquinaNombre: "Inyectora Hidráulica 150T",
    oee: 80.1,
    disponibilidad: 92.5,
    rendimiento: 88.3,
    calidad: 98.2,
    tendencia: [78.2, 79.5, 77.8, 80.3, 79.8, 81.2, 80.1],
  },
  {
    maquinaId: "2",
    maquinaNombre: "Inyectora Eléctrica 100T",
    oee: 91.2,
    disponibilidad: 97.1,
    rendimiento: 94.5,
    calidad: 99.3,
    tendencia: [89.5, 90.2, 90.8, 91.5, 90.7, 91.0, 91.2],
  },
  {
    maquinaId: "3",
    maquinaNombre: "Extrusora 75mm",
    oee: 71.3,
    disponibilidad: 88.7,
    rendimiento: 82.4,
    calidad: 97.5,
    tendencia: [68.5, 69.2, 70.5, 71.8, 70.9, 71.2, 71.3],
  },
  {
    maquinaId: "4",
    maquinaNombre: "Sopladora 5L",
    oee: 85.3,
    disponibilidad: 94.8,
    rendimiento: 91.2,
    calidad: 98.7,
    tendencia: [83.2, 84.5, 84.8, 85.2, 84.7, 85.0, 85.3],
  },
  {
    maquinaId: "5",
    maquinaNombre: "Inyectora Hidráulica 200T",
    oee: 76.4,
    disponibilidad: 90.2,
    rendimiento: 87.6,
    calidad: 96.8,
    tendencia: [74.5, 75.2, 75.8, 76.5, 75.9, 76.2, 76.4],
  },
]

// Función para obtener el color según el valor de OEE
export function getOEEColor(value: number): string {
  if (value >= 85) return "text-green-500"
  if (value >= 75) return "text-yellow-500"
  if (value >= 65) return "text-orange-500"
  return "text-red-500"
}

// Función para obtener el color de fondo según el valor de OEE
export function getOEEBackgroundColor(value: number): string {
  if (value >= 85) return "bg-green-100"
  if (value >= 75) return "bg-yellow-100"
  if (value >= 65) return "bg-orange-100"
  return "bg-red-100"
}

// Función para obtener el estado del OEE
export function getOEEStatus(value: number): string {
  if (value >= 85) return "Excelente"
  if (value >= 75) return "Bueno"
  if (value >= 65) return "Regular"
  return "Deficiente"
}

// Función para obtener datos de OEE por fecha
export function getOEEByDate(date: Date): OEEData[] {
  return oeeData.filter(
    (data) =>
      data.fecha.getFullYear() === date.getFullYear() &&
      data.fecha.getMonth() === date.getMonth() &&
      data.fecha.getDate() === date.getDate(),
  )
}

// Función para obtener datos de OEE por máquina
export function getOEEByMachine(machineId: string): OEEData[] {
  return oeeData.filter((data) => data.maquinaId === machineId)
}

// Función para calcular el OEE promedio
export function getAverageOEE(data: OEEData[]): number {
  if (data.length === 0) return 0
  const sum = data.reduce((acc, curr) => acc + curr.oee, 0)
  return Math.round((sum / data.length) * 10) / 10
}

// Función para calcular la disponibilidad promedio
export function getAverageAvailability(data: OEEData[]): number {
  if (data.length === 0) return 0
  const sum = data.reduce((acc, curr) => acc + curr.disponibilidad, 0)
  return Math.round((sum / data.length) * 10) / 10
}

// Función para calcular el rendimiento promedio
export function getAveragePerformance(data: OEEData[]): number {
  if (data.length === 0) return 0
  const sum = data.reduce((acc, curr) => acc + curr.rendimiento, 0)
  return Math.round((sum / data.length) * 10) / 10
}

// Función para calcular la calidad promedio
export function getAverageQuality(data: OEEData[]): number {
  if (data.length === 0) return 0
  const sum = data.reduce((acc, curr) => acc + curr.calidad, 0)
  return Math.round((sum / data.length) * 10) / 10
}
