export interface ParametroProduccion {
  id: string
  name: string
  product: string
  productId: string
  machine: string
  machineId: string
  status: "validated" | "pending" | "rejected" | "draft"
  createdAt: string
  createdBy: string
  updatedAt: string
  rawMaterials: string[]
  temperatures: {
    zona1: number
    zona2: number
    zona3: number
    boquilla: number
    molde: number
  }
  pressures: {
    inyeccion: number
    mantenimiento: number
    contrapresion: number
  }
  times: {
    inyeccion: number
    enfriamiento: number
    ciclo_total: number
  }
  speeds: {
    inyeccion: number
    dosificacion: number
  }
  notes?: string
}

export interface Product {
  id: string
  name: string
  code: string
}

export interface Machine {
  id: string
  name: string
  code: string
  type: string
}

export interface RawMaterial {
  id: string
  name: string
  type: string
  code: string
}

// Datos de ejemplo
export const sampleProducts: Product[] = [
  { id: "1", name: "Vaso 200ml", code: "V200" },
  { id: "2", name: "Botella 500ml", code: "B500" },
  { id: "3", name: "Bandeja Rectangular", code: "BR001" },
  { id: "4", name: "Tapa Rosca 28mm", code: "TR28" },
  { id: "5", name: "Envase Cuadrado 1L", code: "EC1000" },
]

export const sampleMachines: Machine[] = [
  { id: "INY-001", name: "Inyectora Industrial 1", code: "INY-001", type: "Inyección" },
  { id: "INY-002", name: "Inyectora Industrial 2", code: "INY-002", type: "Inyección" },
  { id: "TERMO-01", name: "Termoformadora 1", code: "TERMO-01", type: "Termoformado" },
  { id: "SOPLO-01", name: "Sopladora 1", code: "SOPLO-01", type: "Soplado" },
]

export const sampleRawMaterials: RawMaterial[] = [
  { id: "uuid-1", name: "PP Transparente", type: "Polipropileno", code: "PP-TRANS" },
  { id: "uuid-2", name: "PET Cristal", type: "Polietileno", code: "PET-CRIS" },
  { id: "uuid-3", name: "Aditivo UV", type: "Aditivo", code: "ADD-UV" },
  { id: "uuid-4", name: "Colorante Azul", type: "Colorante", code: "COL-AZUL" },
  { id: "uuid-5", name: "HDPE Natural", type: "Polietileno", code: "HDPE-NAT" },
  { id: "uuid-6", name: "Estabilizante Térmico", type: "Aditivo", code: "EST-TERM" },
]

export const sampleParametros: ParametroProduccion[] = [
  {
    id: "1",
    name: "Vaso 200ml - PP Transparente",
    product: "Vaso 200ml",
    productId: "1",
    machine: "INY-001",
    machineId: "INY-001",
    status: "validated",
    createdAt: "2025-06-26T10:30:00Z",
    createdBy: "Juan Martínez",
    updatedAt: "2025-06-26T10:30:00Z",
    rawMaterials: ["uuid-1", "uuid-3"],
    temperatures: { zona1: 180, zona2: 185, zona3: 190, boquilla: 200, molde: 45 },
    pressures: { inyeccion: 120, mantenimiento: 80, contrapresion: 15 },
    times: { inyeccion: 2.5, enfriamiento: 18.0, ciclo_total: 25.0 },
    speeds: { inyeccion: 85, dosificacion: 120 },
    notes: "Parámetros optimizados para producción de vasos transparentes.",
  },
  {
    id: "2",
    name: "Botella 500ml - PET Cristal",
    product: "Botella 500ml",
    productId: "2",
    machine: "SOPLO-01",
    machineId: "SOPLO-01",
    status: "pending",
    createdAt: "2025-06-25T14:20:00Z",
    createdBy: "María García",
    updatedAt: "2025-06-25T14:20:00Z",
    rawMaterials: ["uuid-2", "uuid-6"],
    temperatures: { zona1: 220, zona2: 225, zona3: 230, boquilla: 240, molde: 60 },
    pressures: { inyeccion: 150, mantenimiento: 100, contrapresion: 20 },
    times: { inyeccion: 3.0, enfriamiento: 22.0, ciclo_total: 30.0 },
    speeds: { inyeccion: 75, dosificacion: 100 },
    notes: "Requiere validación de temperaturas de molde.",
  },
  {
    id: "3",
    name: "Bandeja Rectangular - HDPE",
    product: "Bandeja Rectangular",
    productId: "3",
    machine: "TERMO-01",
    machineId: "TERMO-01",
    status: "validated",
    createdAt: "2025-06-24T09:15:00Z",
    createdBy: "Carlos López",
    updatedAt: "2025-06-24T09:15:00Z",
    rawMaterials: ["uuid-5", "uuid-4"],
    temperatures: { zona1: 160, zona2: 165, zona3: 170, boquilla: 175, molde: 40 },
    pressures: { inyeccion: 90, mantenimiento: 60, contrapresion: 10 },
    times: { inyeccion: 2.0, enfriamiento: 15.0, ciclo_total: 20.0 },
    speeds: { inyeccion: 95, dosificacion: 130 },
    notes: "Parámetros estables para producción continua.",
  },
]

// Funciones para obtener datos
export async function getParametros(): Promise<ParametroProduccion[]> {
  // Simular delay de API
  await new Promise((resolve) => setTimeout(resolve, 500))
  return sampleParametros
}

export async function getParametroById(id: string): Promise<ParametroProduccion | null> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return sampleParametros.find((p) => p.id === id) || null
}

export async function getProducts(): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 200))
  return sampleProducts
}

export async function getMachines(): Promise<Machine[]> {
  await new Promise((resolve) => setTimeout(resolve, 200))
  return sampleMachines
}

export async function getRawMaterials(): Promise<RawMaterial[]> {
  await new Promise((resolve) => setTimeout(resolve, 200))
  return sampleRawMaterials
}

export async function createParametro(
  parametro: Omit<ParametroProduccion, "id" | "createdAt" | "updatedAt">,
): Promise<ParametroProduccion> {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const newParametro: ParametroProduccion = {
    ...parametro,
    id: Math.random().toString(36).substr(2, 9),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  return newParametro
}

export async function updateParametro(
  id: string,
  parametro: Partial<ParametroProduccion>,
): Promise<ParametroProduccion> {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const existing = sampleParametros.find((p) => p.id === id)
  if (!existing) throw new Error("Parámetro no encontrado")

  return {
    ...existing,
    ...parametro,
    updatedAt: new Date().toISOString(),
  }
}

export async function deleteParametro(id: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  // En una aplicación real, aquí eliminarías el parámetro
}
