export interface MateriaPrima {
  id: string
  nombre: string
  codigo: string
  tipo: string
  unidadMedida: string
  descripcion?: string
  imagen?: string
  fechaCreacion: string
  ultimaActualizacion: string
  stockMinimo: number
}

export interface ProveedorMateriaPrima {
  id: string
  materiaPrimaId: string
  proveedorId: string
  proveedorNombre: string
  precio: number
  tiempoEntrega: string
  calidad: "Alta" | "Media" | "Baja"
  observaciones?: string
  esPreferido: boolean
  ultimaCompra?: string
}

export interface StockMateriaPrima {
  id: string
  materiaPrimaId: string
  proveedorId: string
  proveedorNombre: string
  lote: string
  cantidad: number
  fechaRecepcion: string
  fechaCaducidad?: string
  ubicacion?: string
  observaciones?: string
}

export interface MovimientoMateriaPrima {
  id: string
  materiaPrimaId: string
  stockId: string
  proveedorId: string
  proveedorNombre: string
  lote: string
  tipo: "entrada" | "salida"
  cantidad: number
  motivo: string
  fecha: string
  usuario: string
  ordenProduccionId?: string
  ordenCompraId?: string
  observaciones?: string
}

// Datos mock para materia prima
export const materiasPrimas: MateriaPrima[] = [
  {
    id: "mp001",
    nombre: "Polietileno de Alta Densidad",
    codigo: "HDPE-001",
    tipo: "Resina",
    unidadMedida: "Kg",
    imagen: "/materia-prima/polietileno.png",
    fechaCreacion: "2023-01-15T08:30:00Z",
    ultimaActualizacion: "2023-06-20T14:45:00Z",
    stockMinimo: 500,
  },
  {
    id: "mp002",
    nombre: "Pigmento Azul",
    codigo: "PIG-B001",
    tipo: "Pigmento",
    unidadMedida: "Kg",
    imagen: "/materia-prima/pigmento-azul.png",
    fechaCreacion: "2023-02-10T10:15:00Z",
    ultimaActualizacion: "2023-07-05T09:30:00Z",
    stockMinimo: 20,
  },
  {
    id: "mp003",
    nombre: "Aditivo Estabilizador UV",
    codigo: "ADT-UV002",
    tipo: "Aditivo",
    unidadMedida: "Kg",
    imagen: "/materia-prima/aditivo-uv.png",
    fechaCreacion: "2023-03-05T11:45:00Z",
    ultimaActualizacion: "2023-08-12T16:20:00Z",
    stockMinimo: 15,
  },
  {
    id: "mp004",
    nombre: "PET Reciclado",
    codigo: "RPET-001",
    tipo: "Reciclado",
    unidadMedida: "Kg",
    imagen: "/materia-prima/pet-reciclado.png",
    fechaCreacion: "2023-04-20T09:00:00Z",
    ultimaActualizacion: "2023-09-01T13:10:00Z",
    stockMinimo: 300,
  },
  {
    id: "mp005",
    nombre: "Masterbatch Negro",
    codigo: "MB-BLK001",
    tipo: "Masterbatch",
    unidadMedida: "Kg",
    imagen: "/materia-prima/masterbatch.png",
    fechaCreacion: "2023-05-12T14:30:00Z",
    ultimaActualizacion: "2023-10-15T10:45:00Z",
    stockMinimo: 50,
  },
  {
    id: "mp006",
    nombre: "Polipropileno",
    codigo: "PP-001",
    tipo: "Resina",
    unidadMedida: "Kg",
    fechaCreacion: "2023-06-18T08:45:00Z",
    ultimaActualizacion: "2023-11-05T15:30:00Z",
    stockMinimo: 400,
  },
  {
    id: "mp007",
    nombre: "Masterbatch Rojo",
    codigo: "MB-RED001",
    tipo: "Masterbatch",
    unidadMedida: "Kg",
    fechaCreacion: "2023-07-25T11:20:00Z",
    ultimaActualizacion: "2023-12-10T09:15:00Z",
    stockMinimo: 30,
  },
  {
    id: "mp008",
    nombre: "Aditivo Antioxidante",
    codigo: "ADT-AO001",
    tipo: "Aditivo",
    unidadMedida: "Kg",
    fechaCreacion: "2023-08-30T13:40:00Z",
    ultimaActualizacion: "2024-01-20T14:50:00Z",
    stockMinimo: 15,
  },
]

// Datos mock para proveedores de materia prima
export const proveedoresMateriaPrima: ProveedorMateriaPrima[] = [
  {
    id: "pmp001",
    materiaPrimaId: "mp001",
    proveedorId: "prov-001",
    proveedorNombre: "Polímeros Industriales S.A.",
    precio: 2.5,
    tiempoEntrega: "5 días",
    calidad: "Alta",
    esPreferido: true,
    ultimaCompra: "2023-12-10T09:30:00Z",
  },
  {
    id: "pmp002",
    materiaPrimaId: "mp001",
    proveedorId: "prov-003",
    proveedorNombre: "Plásticos Reciclados S.A.",
    precio: 2.3,
    tiempoEntrega: "7 días",
    calidad: "Media",
    esPreferido: false,
    ultimaCompra: "2023-10-05T14:20:00Z",
  },
  {
    id: "pmp003",
    materiaPrimaId: "mp002",
    proveedorId: "prov-002",
    proveedorNombre: "Colorantes Químicos Ltda.",
    precio: 15.75,
    tiempoEntrega: "10 días",
    calidad: "Alta",
    esPreferido: true,
    ultimaCompra: "2023-12-18T10:45:00Z",
  },
  {
    id: "pmp004",
    materiaPrimaId: "mp003",
    proveedorId: "prov-002",
    proveedorNombre: "Colorantes Químicos Ltda.",
    precio: 28.9,
    tiempoEntrega: "10 días",
    calidad: "Alta",
    esPreferido: true,
    ultimaCompra: "2023-12-20T11:30:00Z",
  },
  {
    id: "pmp005",
    materiaPrimaId: "mp004",
    proveedorId: "prov-003",
    proveedorNombre: "Plásticos Reciclados S.A.",
    precio: 1.8,
    tiempoEntrega: "3 días",
    calidad: "Media",
    esPreferido: true,
    ultimaCompra: "2024-01-05T10:20:00Z",
  },
  {
    id: "pmp006",
    materiaPrimaId: "mp005",
    proveedorId: "prov-002",
    proveedorNombre: "Colorantes Químicos Ltda.",
    precio: 8.5,
    tiempoEntrega: "10 días",
    calidad: "Alta",
    esPreferido: true,
    ultimaCompra: "2023-10-18T15:20:00Z",
  },
  {
    id: "pmp007",
    materiaPrimaId: "mp006",
    proveedorId: "prov-001",
    proveedorNombre: "Polímeros Industriales S.A.",
    precio: 2.3,
    tiempoEntrega: "5 días",
    calidad: "Alta",
    esPreferido: true,
    ultimaCompra: "2023-11-05T15:30:00Z",
  },
  {
    id: "pmp008",
    materiaPrimaId: "mp007",
    proveedorId: "prov-002",
    proveedorNombre: "Colorantes Químicos Ltda.",
    precio: 9.2,
    tiempoEntrega: "10 días",
    calidad: "Alta",
    esPreferido: true,
    ultimaCompra: "2023-12-10T09:15:00Z",
  },
  {
    id: "pmp009",
    materiaPrimaId: "mp008",
    proveedorId: "prov-002",
    proveedorNombre: "Colorantes Químicos Ltda.",
    precio: 32.5,
    tiempoEntrega: "10 días",
    calidad: "Alta",
    esPreferido: true,
    ultimaCompra: "2024-01-20T14:50:00Z",
  },
]

// Datos mock para stock de materia prima
export const stockMateriaPrima: StockMateriaPrima[] = [
  {
    id: "smp001",
    materiaPrimaId: "mp001",
    proveedorId: "prov-001",
    proveedorNombre: "Polímeros Industriales S.A.",
    lote: "L-2023-12-10",
    cantidad: 800,
    fechaRecepcion: "2023-12-10T09:30:00Z",
    ubicacion: "Almacén A, Estante 1",
  },
  {
    id: "smp002",
    materiaPrimaId: "mp001",
    proveedorId: "prov-003",
    proveedorNombre: "Plásticos Reciclados S.A.",
    lote: "L-2023-10-05",
    cantidad: 400,
    fechaRecepcion: "2023-10-05T14:20:00Z",
    ubicacion: "Almacén A, Estante 2",
  },
  {
    id: "smp003",
    materiaPrimaId: "mp002",
    proveedorId: "prov-002",
    proveedorNombre: "Colorantes Químicos Ltda.",
    lote: "L-2023-12-18",
    cantidad: 50,
    fechaRecepcion: "2023-12-18T10:45:00Z",
    ubicacion: "Almacén B, Estante 3",
  },
  {
    id: "smp004",
    materiaPrimaId: "mp003",
    proveedorId: "prov-002",
    proveedorNombre: "Colorantes Químicos Ltda.",
    lote: "L-2023-12-20",
    cantidad: 30,
    fechaRecepcion: "2023-12-20T11:30:00Z",
    ubicacion: "Almacén B, Estante 4",
  },
  {
    id: "smp005",
    materiaPrimaId: "mp004",
    proveedorId: "prov-003",
    proveedorNombre: "Plásticos Reciclados S.A.",
    lote: "L-2024-01-05",
    cantidad: 800,
    fechaRecepcion: "2024-01-05T10:20:00Z",
    ubicacion: "Almacén C, Estante 1",
  },
  {
    id: "smp006",
    materiaPrimaId: "mp005",
    proveedorId: "prov-002",
    proveedorNombre: "Colorantes Químicos Ltda.",
    lote: "L-2023-10-18",
    cantidad: 100,
    fechaRecepcion: "2023-10-18T15:20:00Z",
    ubicacion: "Almacén B, Estante 5",
  },
  {
    id: "smp007",
    materiaPrimaId: "mp006",
    proveedorId: "prov-001",
    proveedorNombre: "Polímeros Industriales S.A.",
    lote: "L-2023-11-05",
    cantidad: 950,
    fechaRecepcion: "2023-11-05T15:30:00Z",
    ubicacion: "Almacén A, Estante 3",
  },
  {
    id: "smp008",
    materiaPrimaId: "mp007",
    proveedorId: "prov-002",
    proveedorNombre: "Colorantes Químicos Ltda.",
    lote: "L-2023-12-10",
    cantidad: 45,
    fechaRecepcion: "2023-12-10T09:15:00Z",
    ubicacion: "Almacén B, Estante 6",
  },
  {
    id: "smp009",
    materiaPrimaId: "mp008",
    proveedorId: "prov-002",
    proveedorNombre: "Colorantes Químicos Ltda.",
    lote: "L-2024-01-20",
    cantidad: 10,
    fechaRecepcion: "2024-01-20T14:50:00Z",
    ubicacion: "Almacén B, Estante 7",
  },
]

// Datos mock para movimientos de materia prima
export const movimientosMateriaPrima: MovimientoMateriaPrima[] = [
  {
    id: "mov001",
    materiaPrimaId: "mp001",
    stockId: "smp001",
    proveedorId: "prov-001",
    proveedorNombre: "Polímeros Industriales S.A.",
    lote: "L-2023-12-10",
    tipo: "entrada",
    cantidad: 500,
    motivo: "Compra",
    fecha: "2023-12-10T09:30:00Z",
    usuario: "Juan Pérez",
    ordenCompraId: "oc-001",
    observaciones: "Lote #12345",
  },
  {
    id: "mov002",
    materiaPrimaId: "mp001",
    stockId: "smp001",
    proveedorId: "prov-001",
    proveedorNombre: "Polímeros Industriales S.A.",
    lote: "L-2023-12-10",
    tipo: "salida",
    cantidad: 100,
    motivo: "Producción",
    fecha: "2023-12-15T14:20:00Z",
    usuario: "María Gómez",
    ordenProduccionId: "op-789",
    observaciones: "Orden #789",
  },
  {
    id: "mov003",
    materiaPrimaId: "mp002",
    stockId: "smp003",
    proveedorId: "prov-002",
    proveedorNombre: "Colorantes Químicos Ltda.",
    lote: "L-2023-12-18",
    tipo: "entrada",
    cantidad: 25,
    motivo: "Compra",
    fecha: "2023-12-18T10:45:00Z",
    usuario: "Juan Pérez",
    ordenCompraId: "oc-003",
    observaciones: "Lote #AB123",
  },
  {
    id: "mov004",
    materiaPrimaId: "mp003",
    stockId: "smp004",
    proveedorId: "prov-002",
    proveedorNombre: "Colorantes Químicos Ltda.",
    lote: "L-2023-12-20",
    tipo: "entrada",
    cantidad: 15,
    motivo: "Compra",
    fecha: "2023-12-20T11:30:00Z",
    usuario: "Juan Pérez",
    ordenCompraId: "oc-004",
  },
  {
    id: "mov005",
    materiaPrimaId: "mp002",
    stockId: "smp003",
    proveedorId: "prov-002",
    proveedorNombre: "Colorantes Químicos Ltda.",
    lote: "L-2023-12-18",
    tipo: "salida",
    cantidad: 5,
    motivo: "Producción",
    fecha: "2023-12-22T09:15:00Z",
    usuario: "María Gómez",
    ordenProduccionId: "op-790",
    observaciones: "Orden #790",
  },
  {
    id: "mov006",
    materiaPrimaId: "mp001",
    stockId: "smp001",
    proveedorId: "prov-001",
    proveedorNombre: "Polímeros Industriales S.A.",
    lote: "L-2023-12-10",
    tipo: "salida",
    cantidad: 200,
    motivo: "Producción",
    fecha: "2023-12-28T13:40:00Z",
    usuario: "María Gómez",
    ordenProduccionId: "op-795",
    observaciones: "Orden #795",
  },
  {
    id: "mov007",
    materiaPrimaId: "mp004",
    stockId: "smp005",
    proveedorId: "prov-003",
    proveedorNombre: "Plásticos Reciclados S.A.",
    lote: "L-2024-01-05",
    tipo: "entrada",
    cantidad: 300,
    motivo: "Compra",
    fecha: "2024-01-05T10:20:00Z",
    usuario: "Juan Pérez",
    ordenCompraId: "oc-005",
    observaciones: "Lote #CD456",
  },
  {
    id: "mov008",
    materiaPrimaId: "mp003",
    stockId: "smp004",
    proveedorId: "prov-002",
    proveedorNombre: "Colorantes Químicos Ltda.",
    lote: "L-2023-12-20",
    tipo: "salida",
    cantidad: 8,
    motivo: "Merma",
    fecha: "2024-01-10T15:30:00Z",
    usuario: "Carlos Rodríguez",
    observaciones: "Material contaminado",
  },
]

// Función para obtener todas las materias primas
export async function getMateriaPrima() {
  return materiasPrimas
}

// Add this function after getMateriaPrima():
export async function getMateriasPrimas() {
  return materiasPrimas
}

// Función para obtener una materia prima por ID
export async function getMateriaPrimaById(id: string) {
  return materiasPrimas.find((mp) => mp.id === id)
}

// Función para obtener los proveedores de una materia prima
export async function getProveedoresMateriaPrima(materiaPrimaId: string) {
  return proveedoresMateriaPrima.filter((pmp) => pmp.materiaPrimaId === materiaPrimaId)
}

// Función para obtener el stock de una materia prima
export async function getStockMateriaPrima(materiaPrimaId: string) {
  return stockMateriaPrima.filter((smp) => smp.materiaPrimaId === materiaPrimaId)
}

// Función para obtener el stock total de una materia prima
export async function getStockTotalMateriaPrima(materiaPrimaId: string) {
  const stocks = await getStockMateriaPrima(materiaPrimaId)
  return stocks.reduce((total, stock) => total + stock.cantidad, 0)
}

// Función para obtener los movimientos de una materia prima
export async function getMovimientosMateriaPrima(materiaPrimaId: string) {
  return movimientosMateriaPrima.filter((mov) => mov.materiaPrimaId === materiaPrimaId)
}

// Función para obtener los tipos de materia prima únicos
export async function getTiposMateriaPrima() {
  const tipos = new Set(materiasPrimas.map((mp) => mp.tipo))
  return Array.from(tipos)
}

// Función para obtener los proveedores únicos
export async function getProveedoresMateriaPrimaUnicos() {
  const proveedores = new Set(proveedoresMateriaPrima.map((pmp) => pmp.proveedorNombre))
  return Array.from(proveedores)
}

// Función para registrar un movimiento de materia prima
export async function registrarMovimientoMateriaPrima(movimiento: Omit<MovimientoMateriaPrima, "id" | "fecha">) {
  // En una aplicación real, aquí se guardaría en la base de datos
  // y se actualizaría el stock correspondiente

  // Simulamos la creación de un nuevo movimiento
  const nuevoMovimiento: MovimientoMateriaPrima = {
    id: `mov${movimientosMateriaPrima.length + 1}`.padStart(6, "0"),
    fecha: new Date().toISOString(),
    ...movimiento,
  }

  // Actualizamos el stock
  const stockIndex = stockMateriaPrima.findIndex((s) => s.id === movimiento.stockId)
  if (stockIndex >= 0) {
    if (movimiento.tipo === "entrada") {
      stockMateriaPrima[stockIndex].cantidad += movimiento.cantidad
    } else {
      stockMateriaPrima[stockIndex].cantidad -= movimiento.cantidad
    }
  }

  // Agregamos el movimiento a la lista
  movimientosMateriaPrima.push(nuevoMovimiento)

  return nuevoMovimiento
}
