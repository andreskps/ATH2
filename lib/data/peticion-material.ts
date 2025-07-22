export interface ItemPeticion {
  id: string
  materiaPrima: string
  lote: string
  proveedor: string
  cantidadSolicitada: number
  unidad: string
  stockDisponible: number
  fechaVencimiento: string
  notas?: string
  estado: "suficiente" | "bajo" | "insuficiente"
}

export interface PeticionMaterial {
  id: string
  ordenProduccion: string
  producto: string
  cantidadProducir: number
  fechaProgramada: string
  solicitante: string
  fechaSolicitud: string
  estado: "pendiente" | "aprobada" | "rechazada"
  motivoRechazo?: string
  items: ItemPeticion[]
  notasGenerales?: string
  historial: {
    fecha: string
    accion: string
    usuario: string
    detalles?: string
  }[]
}

export const peticionesMaterial: PeticionMaterial[] = [
  {
    id: "PET-001",
    ordenProduccion: "OP-2025-001",
    producto: "Vaso 200ml Transparente",
    cantidadProducir: 5000,
    fechaProgramada: "2025-01-30T08:00:00Z",
    solicitante: "Carlos Mendoza",
    fechaSolicitud: "2025-01-22T10:30:00Z",
    estado: "pendiente",
    items: [
      {
        id: "item-1",
        materiaPrima: "PP Transparente",
        lote: "LOT-PP-001",
        proveedor: "Petroquímica del Norte",
        cantidadSolicitada: 150,
        unidad: "kg",
        stockDisponible: 200,
        fechaVencimiento: "2025-06-15T00:00:00Z",
        estado: "suficiente",
      },
      {
        id: "item-2",
        materiaPrima: "Aditivo UV",
        lote: "LOT-UV-003",
        proveedor: "Químicos Industriales SA",
        cantidadSolicitada: 5,
        unidad: "kg",
        stockDisponible: 8,
        fechaVencimiento: "2025-12-20T00:00:00Z",
        estado: "bajo",
      },
    ],
    notasGenerales: "Producción urgente para cliente prioritario",
    historial: [
      {
        fecha: "2025-01-22T10:30:00Z",
        accion: "Petición creada",
        usuario: "Carlos Mendoza",
        detalles: "Petición inicial para orden OP-2025-001",
      },
    ],
  },
  {
    id: "PET-002",
    ordenProduccion: "OP-2025-002",
    producto: "Botella 500ml Azul",
    cantidadProducir: 3000,
    fechaProgramada: "2025-01-28T14:00:00Z",
    solicitante: "Ana García",
    fechaSolicitud: "2025-01-21T15:45:00Z",
    estado: "aprobada",
    items: [
      {
        id: "item-3",
        materiaPrima: "PET Cristal",
        lote: "LOT-PET-005",
        proveedor: "Plásticos del Sur",
        cantidadSolicitada: 120,
        unidad: "kg",
        stockDisponible: 180,
        fechaVencimiento: "2025-08-10T00:00:00Z",
        estado: "suficiente",
      },
      {
        id: "item-4",
        materiaPrima: "Colorante Azul",
        lote: "LOT-COL-012",
        proveedor: "Colorantes Especiales",
        cantidadSolicitada: 3,
        unidad: "kg",
        stockDisponible: 15,
        fechaVencimiento: "2025-10-05T00:00:00Z",
        estado: "suficiente",
      },
    ],
    historial: [
      {
        fecha: "2025-01-21T15:45:00Z",
        accion: "Petición creada",
        usuario: "Ana García",
      },
      {
        fecha: "2025-01-22T09:15:00Z",
        accion: "Petición aprobada",
        usuario: "Luis Rodríguez",
        detalles: "Materiales disponibles, aprobación automática",
      },
    ],
  },
  {
    id: "PET-003",
    ordenProduccion: "OP-2025-003",
    producto: "Bandeja Rectangular",
    cantidadProducir: 2000,
    fechaProgramada: "2025-02-01T10:00:00Z",
    solicitante: "Miguel Torres",
    fechaSolicitud: "2025-01-20T11:20:00Z",
    estado: "rechazada",
    motivoRechazo: "Stock insuficiente de HDPE Negro",
    items: [
      {
        id: "item-5",
        materiaPrima: "HDPE Negro",
        lote: "LOT-HDPE-008",
        proveedor: "Polímeros Avanzados",
        cantidadSolicitada: 80,
        unidad: "kg",
        stockDisponible: 45,
        fechaVencimiento: "2025-07-30T00:00:00Z",
        estado: "insuficiente",
      },
    ],
    historial: [
      {
        fecha: "2025-01-20T11:20:00Z",
        accion: "Petición creada",
        usuario: "Miguel Torres",
      },
      {
        fecha: "2025-01-21T08:30:00Z",
        accion: "Petición rechazada",
        usuario: "Luis Rodríguez",
        detalles: "Stock insuficiente, se requiere nueva orden de compra",
      },
    ],
  },
]

// Datos para los dropdowns
export const ordenesProduccion = [
  { id: "OP-2025-001", producto: "Vaso 200ml Transparente", cantidad: 5000, fechaProgramada: "2025-01-30" },
  { id: "OP-2025-002", producto: "Botella 500ml Azul", cantidad: 3000, fechaProgramada: "2025-01-28" },
  { id: "OP-2025-003", producto: "Bandeja Rectangular", cantidad: 2000, fechaProgramada: "2025-02-01" },
  { id: "OP-2025-004", producto: "Tapa Rosca 28mm", cantidad: 10000, fechaProgramada: "2025-02-03" },
  { id: "OP-2025-005", producto: "Envase 1L Transparente", cantidad: 1500, fechaProgramada: "2025-02-05" },
]

export const materiasPrimasDisponibles = [
  {
    id: "mp-1",
    nombre: "PP Transparente",
    tipo: "Polipropileno",
    unidad: "kg",
    lotes: [
      { id: "LOT-PP-001", proveedor: "Petroquímica del Norte", stock: 200, fechaVencimiento: "2025-06-15" },
      { id: "LOT-PP-002", proveedor: "Plásticos Industriales", stock: 150, fechaVencimiento: "2025-05-20" },
    ],
  },
  {
    id: "mp-2",
    nombre: "PET Cristal",
    tipo: "Polietileno Tereftalato",
    unidad: "kg",
    lotes: [
      { id: "LOT-PET-005", proveedor: "Plásticos del Sur", stock: 180, fechaVencimiento: "2025-08-10" },
      { id: "LOT-PET-006", proveedor: "Petroquímica del Norte", stock: 220, fechaVencimiento: "2025-09-15" },
    ],
  },
  {
    id: "mp-3",
    nombre: "HDPE Negro",
    tipo: "Polietileno de Alta Densidad",
    unidad: "kg",
    lotes: [
      { id: "LOT-HDPE-008", proveedor: "Polímeros Avanzados", stock: 45, fechaVencimiento: "2025-07-30" },
      { id: "LOT-HDPE-009", proveedor: "Químicos del Centro", stock: 80, fechaVencimiento: "2025-08-25" },
    ],
  },
  {
    id: "mp-4",
    nombre: "Aditivo UV",
    tipo: "Aditivo",
    unidad: "kg",
    lotes: [
      { id: "LOT-UV-003", proveedor: "Químicos Industriales SA", stock: 8, fechaVencimiento: "2025-12-20" },
      { id: "LOT-UV-004", proveedor: "Aditivos Especiales", stock: 12, fechaVencimiento: "2026-01-10" },
    ],
  },
  {
    id: "mp-5",
    nombre: "Colorante Azul",
    tipo: "Colorante",
    unidad: "kg",
    lotes: [
      { id: "LOT-COL-012", proveedor: "Colorantes Especiales", stock: 15, fechaVencimiento: "2025-10-05" },
      { id: "LOT-COL-013", proveedor: "Pigmentos Industriales", stock: 20, fechaVencimiento: "2025-11-20" },
    ],
  },
]
