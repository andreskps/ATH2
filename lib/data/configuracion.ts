import type { Contrato, Cargo, Area } from "@/lib/types"

// Datos de Contratos - Simplificado
export const contratos: Contrato[] = [
  {
    id: "1",
    nombre: "Contrato Indefinido",
    descripcion: "Contrato a término indefinido para personal de planta",
    activo: true,
    fechaCreacion: "2024-01-15",
    fechaActualizacion: "2024-01-15",
  },
  {
    id: "2",
    nombre: "Contrato Fijo",
    descripcion: "Contrato a término fijo de un año",
    activo: true,
    fechaCreacion: "2024-01-10",
    fechaActualizacion: "2024-02-01",
  },
  {
    id: "3",
    nombre: "Contrato Temporal",
    descripcion: "Contrato temporal para proyectos específicos",
    activo: true,
    fechaCreacion: "2024-02-01",
    fechaActualizacion: "2024-02-01",
  },
  {
    id: "4",
    nombre: "Contrato de Prácticas",
    descripcion: "Contrato para estudiantes en práctica profesional",
    activo: false,
    fechaCreacion: "2024-01-20",
    fechaActualizacion: "2024-01-20",
  },
]

// Datos de Cargos - Simplificado
export const cargos: Cargo[] = [
  {
    id: "1",
    nombre: "Operario de Producción",
    descripcion: "Encargado de operar las máquinas de producción",
    activo: true,
    fechaCreacion: "2024-01-15",
    fechaActualizacion: "2024-01-15",
  },
  {
    id: "2",
    nombre: "Supervisor",
    descripcion: "Supervisa las actividades del área de producción",
    activo: true,
    fechaCreacion: "2024-01-10",
    fechaActualizacion: "2024-02-01",
  },
  {
    id: "3",
    nombre: "Técnico de Mantenimiento",
    descripcion: "Realiza mantenimiento de maquinaria y equipos",
    activo: true,
    fechaCreacion: "2024-01-08",
    fechaActualizacion: "2024-01-08",
  },
  {
    id: "4",
    nombre: "Analista de Calidad",
    descripcion: "Controla la calidad de los productos fabricados",
    activo: true,
    fechaCreacion: "2024-01-12",
    fechaActualizacion: "2024-01-12",
  },
  {
    id: "5",
    nombre: "Auxiliar Administrativo",
    descripcion: "Apoya las labores administrativas de la empresa",
    activo: false,
    fechaCreacion: "2024-01-05",
    fechaActualizacion: "2024-01-05",
  },
]

// Datos de Áreas - Simplificado
export const areas: Area[] = [
  {
    id: "1",
    nombre: "Producción",
    descripcion: "Área encargada de la fabricación de productos",
    activo: true,
    fechaCreacion: "2024-01-01",
    fechaActualizacion: "2024-01-01",
  },
  {
    id: "2",
    nombre: "Calidad",
    descripcion: "Área responsable del control de calidad",
    activo: true,
    fechaCreacion: "2024-01-01",
    fechaActualizacion: "2024-01-15",
  },
  {
    id: "3",
    nombre: "Mantenimiento",
    descripcion: "Área de mantenimiento de equipos y maquinaria",
    activo: true,
    fechaCreacion: "2024-01-01",
    fechaActualizacion: "2024-02-01",
  },
  {
    id: "4",
    nombre: "Administración",
    descripcion: "Área administrativa y de recursos humanos",
    activo: true,
    fechaCreacion: "2024-01-01",
    fechaActualizacion: "2024-01-10",
  },
  {
    id: "5",
    nombre: "Ventas",
    descripcion: "Área comercial y de ventas",
    activo: true,
    fechaCreacion: "2024-01-01",
    fechaActualizacion: "2024-02-05",
  },
  {
    id: "6",
    nombre: "Bodega",
    descripcion: "Área de almacenamiento y logística",
    activo: false,
    fechaCreacion: "2024-01-01",
    fechaActualizacion: "2024-01-01",
  },
]

// Funciones de gestión simplificadas
export function obtenerContratos(): Contrato[] {
  return contratos
}

export function obtenerContratoPorId(id: string): Contrato | undefined {
  return contratos.find((contrato) => contrato.id === id)
}

export function obtenerCargos(): Cargo[] {
  return cargos
}

export function obtenerCargoPorId(id: string): Cargo | undefined {
  return cargos.find((cargo) => cargo.id === id)
}

export function obtenerAreas(): Area[] {
  return areas
}

export function obtenerAreaPorId(id: string): Area | undefined {
  return areas.find((area) => area.id === id)
}

export function crearContrato(contrato: Omit<Contrato, "id" | "fechaCreacion" | "fechaActualizacion">): Contrato {
  const nuevoContrato: Contrato = {
    ...contrato,
    id: (contratos.length + 1).toString(),
    fechaCreacion: new Date().toISOString().split("T")[0],
    fechaActualizacion: new Date().toISOString().split("T")[0],
  }
  contratos.push(nuevoContrato)
  return nuevoContrato
}

export function actualizarContrato(id: string, datos: Partial<Contrato>): Contrato | null {
  const index = contratos.findIndex((c) => c.id === id)
  if (index === -1) return null

  contratos[index] = {
    ...contratos[index],
    ...datos,
    fechaActualizacion: new Date().toISOString().split("T")[0],
  }
  return contratos[index]
}

export function eliminarContrato(id: string): boolean {
  const index = contratos.findIndex((c) => c.id === id)
  if (index === -1) return false

  contratos.splice(index, 1)
  return true
}

export function crearCargo(cargo: Omit<Cargo, "id" | "fechaCreacion" | "fechaActualizacion">): Cargo {
  const nuevoCargo: Cargo = {
    ...cargo,
    id: (cargos.length + 1).toString(),
    fechaCreacion: new Date().toISOString().split("T")[0],
    fechaActualizacion: new Date().toISOString().split("T")[0],
  }
  cargos.push(nuevoCargo)
  return nuevoCargo
}

export function actualizarCargo(id: string, datos: Partial<Cargo>): Cargo | null {
  const index = cargos.findIndex((c) => c.id === id)
  if (index === -1) return null

  cargos[index] = {
    ...cargos[index],
    ...datos,
    fechaActualizacion: new Date().toISOString().split("T")[0],
  }
  return cargos[index]
}

export function eliminarCargo(id: string): boolean {
  const index = cargos.findIndex((c) => c.id === id)
  if (index === -1) return false

  cargos.splice(index, 1)
  return true
}

export function crearArea(area: Omit<Area, "id" | "fechaCreacion" | "fechaActualizacion">): Area {
  const nuevaArea: Area = {
    ...area,
    id: (areas.length + 1).toString(),
    fechaCreacion: new Date().toISOString().split("T")[0],
    fechaActualizacion: new Date().toISOString().split("T")[0],
  }
  areas.push(nuevaArea)
  return nuevaArea
}

export function actualizarArea(id: string, datos: Partial<Area>): Area | null {
  const index = areas.findIndex((a) => a.id === id)
  if (index === -1) return null

  areas[index] = {
    ...areas[index],
    ...datos,
    fechaActualizacion: new Date().toISOString().split("T")[0],
  }
  return areas[index]
}

export function eliminarArea(id: string): boolean {
  const index = areas.findIndex((a) => a.id === id)
  if (index === -1) return false

  areas.splice(index, 1)
  return true
}
