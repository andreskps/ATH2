import { getEmpleados } from "@/lib/data/empleados"

// Tipos
export interface Equipo {
  id: string
  nombre: string
  area: string
  supervisor: string
  operarios: string[]
}

export interface Turno {
  id: string
  fecha: string
  categoria: string
  area: string
  supervisor: string
  operarios: string[]
  estado: "Pendiente" | "Confirmado" | "En Progreso" | "Completado" | "Cancelado"
  equipoId?: string
  createdAt: string
  updatedAt: string
}

// Datos de ejemplo para equipos
export const equipos: Equipo[] = [
  {
    id: "equipo-1",
    nombre: "Equipo Inyección A",
    area: "Inyección",
    supervisor: "2", // ID de María López (supervisor de calidad)
    operarios: ["1", "5"], // IDs de Juan Pérez y Carlos Rodríguez
  },
  {
    id: "equipo-2",
    nombre: "Equipo PET B",
    area: "PET",
    supervisor: "4", // ID de Ana Martínez
    operarios: ["3", "5"], // IDs de Roberto García y Carlos Rodríguez
  },
  {
    id: "equipo-3",
    nombre: "Equipo Soplado C",
    area: "Soplado",
    supervisor: "2", // ID de María López
    operarios: ["1", "3"], // IDs de Juan Pérez y Roberto García
  },
]

// Datos de ejemplo para turnos
export const turnos: Turno[] = [
  {
    id: "turno-1",
    fecha: "2023-11-15",
    categoria: "A",
    area: "Inyección",
    supervisor: "2", // ID de María López
    operarios: ["1", "5"], // IDs de Juan Pérez y Carlos Rodríguez
    estado: "Completado",
    equipoId: "equipo-1",
    createdAt: "2023-11-10T08:00:00Z",
    updatedAt: "2023-11-15T18:00:00Z",
  },
  {
    id: "turno-2",
    fecha: "2023-11-16",
    categoria: "B",
    area: "PET",
    supervisor: "4", // ID de Ana Martínez
    operarios: ["3", "5"], // IDs de Roberto García y Carlos Rodríguez
    estado: "Confirmado",
    equipoId: "equipo-2",
    createdAt: "2023-11-10T09:30:00Z",
    updatedAt: "2023-11-14T14:15:00Z",
  },
  {
    id: "turno-3",
    fecha: "2023-11-17",
    categoria: "C",
    area: "Soplado",
    supervisor: "2", // ID de María López
    operarios: ["1", "3"], // IDs de Juan Pérez y Roberto García
    estado: "Pendiente",
    equipoId: "equipo-3",
    createdAt: "2023-11-11T10:45:00Z",
    updatedAt: "2023-11-11T10:45:00Z",
  },
  {
    id: "turno-4",
    fecha: "2023-11-18",
    categoria: "A",
    area: "Inyección",
    supervisor: "2", // ID de María López
    operarios: ["1", "5"], // IDs de Juan Pérez y Carlos Rodríguez
    estado: "Pendiente",
    equipoId: "equipo-1",
    createdAt: "2023-11-12T08:30:00Z",
    updatedAt: "2023-11-12T08:30:00Z",
  },
  {
    id: "turno-5",
    fecha: "2023-11-19",
    categoria: "B",
    area: "PET",
    supervisor: "4", // ID de Ana Martínez
    operarios: ["3", "5"], // IDs de Roberto García y Carlos Rodríguez
    estado: "Pendiente",
    equipoId: "equipo-2",
    createdAt: "2023-11-13T09:15:00Z",
    updatedAt: "2023-11-13T09:15:00Z",
  },
]

// Funciones de utilidad

// Obtener todos los turnos
export function getTurnos(): Turno[] {
  return turnos
}

// Obtener un turno por su ID
export function getTurnoById(id: string): Turno | undefined {
  return turnos.find((turno) => turno.id === id)
}

// Obtener turnos por fecha
export function getTurnosByFecha(fecha: string): Turno[] {
  return turnos.filter((turno) => turno.fecha === fecha)
}

// Obtener turnos por estado
export function getTurnosByEstado(estado: string): Turno[] {
  return turnos.filter((turno) => turno.estado === estado)
}

// Obtener turnos por área
export function getTurnosByArea(area: string): Turno[] {
  return turnos.filter((turno) => turno.area === area)
}

// Obtener turnos por categoría
export function getTurnosByCategoria(categoria: string): Turno[] {
  return turnos.filter((turno) => turno.categoria === categoria)
}

// Obtener turnos por supervisor
export function getTurnosBySupervisor(supervisorId: string): Turno[] {
  return turnos.filter((turno) => turno.supervisor === supervisorId)
}

// Obtener turnos por operario
export function getTurnosByOperario(operarioId: string): Turno[] {
  return turnos.filter((turno) => turno.operarios.includes(operarioId))
}

// Obtener un equipo por su ID
export function getEquipoById(id: string): Equipo | undefined {
  return equipos.find((equipo) => equipo.id === id)
}

// Verificar si un empleado está disponible en una fecha específica
export function isEmpleadoDisponible(empleadoId: string, fecha: string): boolean {
  // Verificar si el empleado ya está asignado a un turno en esa fecha
  const turnosEnFecha = getTurnosByFecha(fecha)
  return !turnosEnFecha.some((turno) => turno.supervisor === empleadoId || turno.operarios.includes(empleadoId))
}

// Obtener el nombre completo de un empleado por su ID
export function getNombreEmpleado(empleadoId: string): string {
  const empleado = getEmpleados().find((emp) => emp.id.toString() === empleadoId)
  if (empleado) {
    return `${empleado.nombre} ${empleado.apellidos || ""}`
  }
  return "Empleado no encontrado"
}
