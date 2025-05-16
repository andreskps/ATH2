// Tipos para maquinaria
export type TipoMaquina = "Inyección" | "Extrusión" | "Soplado" | "Termoformado" | "Otro"
export type EstadoMaquina = "Activa" | "En Mantenimiento" | "Inactiva" | "Fuera de Servicio"

export interface Maquina {
  id: string
  codigo: string
  nombre: string
  modelo: string
  marca: string
  tipo: TipoMaquina
  fechaAdquisicion: string
  ubicacion: string
  estado: EstadoMaquina
  capacidad: string
  tonelaje?: number
  ciclosPorMinuto?: number
  observaciones?: string
  imagen?: string
}

export interface EventoMantenimiento {
  id: string
  maquinaId: string
  fecha: string
  tipo: "Preventivo" | "Correctivo"
  descripcion: string
  tiempoFuera?: string // en horas
  responsable: string
  estado: "Completado" | "En Proceso" | "Programado"
}

// Datos mock para maquinaria
export const maquinaria: Maquina[] = [
  {
    id: "1",
    codigo: "INY-001",
    nombre: "Inyectora Hidráulica Principal",
    modelo: "HT-450",
    marca: "Haitian",
    tipo: "Inyección",
    fechaAdquisicion: "2020-03-15",
    ubicacion: "Área A - Inyección",
    estado: "Activa",
    capacidad: "450 toneladas",
    tonelaje: 450,
    ciclosPorMinuto: 4,
    observaciones: "Máquina principal para productos de gran tamaño",
    imagen: "/maquinaria/inyectora-hidraulica.png",
  },
  {
    id: "2",
    codigo: "INY-002",
    nombre: "Inyectora Eléctrica Precisión",
    modelo: "E-180",
    marca: "Engel",
    tipo: "Inyección",
    fechaAdquisicion: "2021-06-22",
    ubicacion: "Área A - Inyección",
    estado: "Activa",
    capacidad: "180 toneladas",
    tonelaje: 180,
    ciclosPorMinuto: 6,
    observaciones: "Alta precisión para piezas técnicas",
    imagen: "/maquinaria/inyectora-electrica.png",
  },
  {
    id: "3",
    codigo: "EXT-001",
    nombre: "Extrusora Línea 1",
    modelo: "SJ-65",
    marca: "Jwell",
    tipo: "Extrusión",
    fechaAdquisicion: "2019-11-10",
    ubicacion: "Área B - Extrusión",
    estado: "En Mantenimiento",
    capacidad: "65mm",
    ciclosPorMinuto: 0,
    observaciones: "Mantenimiento programado mensual",
    imagen: "/maquinaria/extrusora.png",
  },
  {
    id: "4",
    codigo: "SOP-001",
    nombre: "Sopladora Automática",
    modelo: "BM-5000",
    marca: "Bekum",
    tipo: "Soplado",
    fechaAdquisicion: "2022-01-05",
    ubicacion: "Área C - Soplado",
    estado: "Activa",
    capacidad: "5L máximo",
    ciclosPorMinuto: 8,
    observaciones: "Para botellas y envases",
    imagen: "/maquinaria/sopladora.png",
  },
  {
    id: "5",
    codigo: "INY-003",
    nombre: "Inyectora Hidráulica Secundaria",
    modelo: "HT-300",
    marca: "Haitian",
    tipo: "Inyección",
    fechaAdquisicion: "2018-09-20",
    ubicacion: "Área A - Inyección",
    estado: "Inactiva",
    capacidad: "300 toneladas",
    tonelaje: 300,
    ciclosPorMinuto: 5,
    observaciones: "Reserva para picos de producción",
    imagen: "/maquinaria/inyectora-hidraulica-2.png",
  },
]

// Datos mock para eventos de mantenimiento
export const eventosMantenimiento: EventoMantenimiento[] = [
  {
    id: "1",
    maquinaId: "3",
    fecha: "2023-04-15",
    tipo: "Preventivo",
    descripcion: "Cambio de aceite hidráulico y revisión general",
    tiempoFuera: "8",
    responsable: "Juan Pérez",
    estado: "Completado",
  },
  {
    id: "2",
    maquinaId: "1",
    fecha: "2023-03-10",
    tipo: "Correctivo",
    descripcion: "Reparación de sistema de cierre",
    tiempoFuera: "24",
    responsable: "Carlos Rodríguez",
    estado: "Completado",
  },
  {
    id: "3",
    maquinaId: "3",
    fecha: "2023-05-20",
    tipo: "Preventivo",
    descripcion: "Mantenimiento programado mensual",
    tiempoFuera: "6",
    responsable: "Juan Pérez",
    estado: "En Proceso",
  },
  {
    id: "4",
    maquinaId: "2",
    fecha: "2023-06-05",
    tipo: "Preventivo",
    descripcion: "Calibración de sensores",
    tiempoFuera: "4",
    responsable: "María López",
    estado: "Programado",
  },
]

// Funciones para obtener datos
export async function getMaquinas() {
  // Simular delay de red
  await new Promise((resolve) => setTimeout(resolve, 800))
  return maquinaria
}

export async function getMaquinaById(id: string) {
  // Simular delay de red
  await new Promise((resolve) => setTimeout(resolve, 500))
  return maquinaria.find((m) => m.id === id)
}

export async function getEventosMantenimientoByMaquinaId(maquinaId: string) {
  // Simular delay de red
  await new Promise((resolve) => setTimeout(resolve, 700))
  return eventosMantenimiento.filter((e) => e.maquinaId === maquinaId)
}
