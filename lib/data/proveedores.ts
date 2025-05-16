export interface Proveedor {
  id: string
  nombre: string
  nit: string
  tipo: string
  direccion: string
  ciudad: string
  departamento: string
  pais: string
  celular: string
  email: string
  estado: "Activo" | "Inactivo"
  observaciones: string
  condicionesPago: string
  formaPago: "Transferencia" | "Cheque" | "Efectivo"
  createdAt: string
  updatedAt: string
  logo?: string
}

export interface CompraProveedor {
  id: string
  proveedorId: string
  fecha: string
  materiaPrima: string
  materiaPrimaId: string
  cantidad: number
  unidad: string
  precioUnitario: number
  total: number
  estadoPago: "Pagado" | "Pendiente" | "Parcial"
}

export interface MateriaPrimaProveedor {
  id: string
  proveedorId: string
  materiaPrimaId: string
  nombre: string
  codigo: string
  precio: number
  tiempoEntrega: string
  observaciones: string
}

// Datos mock de proveedores
const proveedores: Proveedor[] = [
  {
    id: "prov-001",
    nombre: "Polímeros Industriales S.A.",
    nit: "900.123.456-7",
    tipo: "Materia Prima",
    direccion: "Calle 45 # 23-67",
    ciudad: "Bogotá",
    departamento: "Cundinamarca",
    pais: "Colombia",
    celular: "315-789-4567",
    email: "contacto@polimerosindustriales.com",
    estado: "Activo",
    observaciones: "Proveedor principal de resinas plásticas",
    condicionesPago: "30 días",
    formaPago: "Transferencia",
    createdAt: "2023-01-15T10:30:00Z",
    updatedAt: "2023-06-20T14:45:00Z",
    logo: "/proveedores/polimeros-industriales.png",
  },
  {
    id: "prov-002",
    nombre: "Colorantes Químicos Ltda.",
    nit: "800.456.789-1",
    tipo: "Materia Prima",
    direccion: "Carrera 67 # 12-34",
    ciudad: "Medellín",
    departamento: "Antioquia",
    pais: "Colombia",
    celular: "310-234-5678",
    email: "ventas@colorantesquimicos.com",
    estado: "Activo",
    observaciones: "Especialistas en pigmentos y colorantes para plásticos",
    condicionesPago: "15 días",
    formaPago: "Cheque",
    createdAt: "2023-02-10T09:15:00Z",
    updatedAt: "2023-07-05T11:20:00Z",
    logo: "/proveedores/colorantes-quimicos.png",
  },
  {
    id: "prov-003",
    nombre: "Maquinaria Plástica Internacional",
    nit: "901.234.567-8",
    tipo: "Maquinaria",
    direccion: "Av. Industrial 123",
    ciudad: "Cali",
    departamento: "Valle del Cauca",
    pais: "Colombia",
    celular: "320-345-6789",
    email: "info@maquinariaplastica.com",
    estado: "Activo",
    observaciones: "Importadores de maquinaria para inyección y extrusión",
    condicionesPago: "60 días",
    formaPago: "Transferencia",
    createdAt: "2023-03-05T14:00:00Z",
    updatedAt: "2023-08-12T16:30:00Z",
    logo: "/proveedores/maquinaria-plastica.png",
  },
  {
    id: "prov-004",
    nombre: "Repuestos Técnicos S.A.S.",
    nit: "800.987.654-3",
    tipo: "Repuestos",
    direccion: "Calle 78 # 45-67",
    ciudad: "Barranquilla",
    departamento: "Atlántico",
    pais: "Colombia",
    celular: "317-456-7890",
    email: "repuestos@tecnicossas.com",
    estado: "Activo",
    observaciones: "Proveedores de repuestos para maquinaria de inyección",
    condicionesPago: "45 días",
    formaPago: "Cheque",
    createdAt: "2023-04-20T11:45:00Z",
    updatedAt: "2023-09-01T10:15:00Z",
    logo: "/proveedores/repuestos-tecnicos.png",
  },
  {
    id: "prov-005",
    nombre: "Servicios Logísticos Integrados",
    nit: "901.876.543-2",
    tipo: "Servicios",
    direccion: "Carrera 34 # 56-78",
    ciudad: "Bucaramanga",
    departamento: "Santander",
    pais: "Colombia",
    celular: "314-567-8901",
    email: "contacto@logisticosintegrados.com",
    estado: "Inactivo",
    observaciones: "Empresa de transporte y logística especializada",
    condicionesPago: "15 días",
    formaPago: "Efectivo",
    createdAt: "2023-05-12T08:30:00Z",
    updatedAt: "2023-10-15T09:45:00Z",
    logo: "/proveedores/servicios-logisticos.png",
  },
]

// Datos mock de compras a proveedores
const comprasProveedores: CompraProveedor[] = [
  {
    id: "comp-001",
    proveedorId: "prov-001",
    fecha: "2023-06-15T10:00:00Z",
    materiaPrima: "Polietileno de Alta Densidad",
    materiaPrimaId: "mp-001",
    cantidad: 500,
    unidad: "kg",
    precioUnitario: 8500,
    total: 4250000,
    estadoPago: "Pagado",
  },
  {
    id: "comp-002",
    proveedorId: "prov-001",
    fecha: "2023-07-20T14:30:00Z",
    materiaPrima: "Polipropileno",
    materiaPrimaId: "mp-002",
    cantidad: 300,
    unidad: "kg",
    precioUnitario: 9200,
    total: 2760000,
    estadoPago: "Pagado",
  },
  {
    id: "comp-003",
    proveedorId: "prov-002",
    fecha: "2023-08-05T09:15:00Z",
    materiaPrima: "Pigmento Azul",
    materiaPrimaId: "mp-003",
    cantidad: 50,
    unidad: "kg",
    precioUnitario: 45000,
    total: 2250000,
    estadoPago: "Pendiente",
  },
  {
    id: "comp-004",
    proveedorId: "prov-001",
    fecha: "2023-09-10T11:45:00Z",
    materiaPrima: "PET Reciclado",
    materiaPrimaId: "mp-004",
    cantidad: 400,
    unidad: "kg",
    precioUnitario: 6800,
    total: 2720000,
    estadoPago: "Parcial",
  },
  {
    id: "comp-005",
    proveedorId: "prov-002",
    fecha: "2023-10-18T15:20:00Z",
    materiaPrima: "Aditivo UV",
    materiaPrimaId: "mp-005",
    cantidad: 25,
    unidad: "kg",
    precioUnitario: 78000,
    total: 1950000,
    estadoPago: "Pendiente",
  },
]

// Datos mock de materias primas por proveedor
const materiasPrimasProveedores: MateriaPrimaProveedor[] = [
  {
    id: "mpp-001",
    proveedorId: "prov-001",
    materiaPrimaId: "mp-001",
    nombre: "Polietileno de Alta Densidad",
    codigo: "HDPE-001",
    precio: 8500,
    tiempoEntrega: "5 días",
    observaciones: "Calidad premium, certificado FDA",
  },
  {
    id: "mpp-002",
    proveedorId: "prov-001",
    materiaPrimaId: "mp-002",
    nombre: "Polipropileno",
    codigo: "PP-001",
    precio: 9200,
    tiempoEntrega: "7 días",
    observaciones: "Grado inyección, alta fluidez",
  },
  {
    id: "mpp-003",
    proveedorId: "prov-001",
    materiaPrimaId: "mp-004",
    nombre: "PET Reciclado",
    codigo: "RPET-001",
    precio: 6800,
    tiempoEntrega: "3 días",
    observaciones: "Post-consumo, lavado y procesado",
  },
  {
    id: "mpp-004",
    proveedorId: "prov-002",
    materiaPrimaId: "mp-003",
    nombre: "Pigmento Azul",
    codigo: "PIG-B001",
    precio: 45000,
    tiempoEntrega: "10 días",
    observaciones: "Alta concentración, uso alimentario",
  },
  {
    id: "mpp-005",
    proveedorId: "prov-002",
    materiaPrimaId: "mp-005",
    nombre: "Aditivo UV",
    codigo: "ADT-UV001",
    precio: 78000,
    tiempoEntrega: "15 días",
    observaciones: "Protección UV de larga duración",
  },
]

// Funciones para obtener datos
export async function getProveedores() {
  return proveedores
}

export async function getProveedoresByTipo(tipo: string) {
  return proveedores.filter((p) => p.tipo === tipo)
}

export async function getProveedoresByEstado(estado: string) {
  return proveedores.filter((p) => p.estado === estado)
}

export async function getProveedorById(id: string) {
  return proveedores.find((p) => p.id === id)
}

export async function getComprasByProveedorId(proveedorId: string) {
  return comprasProveedores.filter((c) => c.proveedorId === proveedorId)
}

export async function getMateriasPrimasByProveedorId(proveedorId: string) {
  return materiasPrimasProveedores.filter((mp) => mp.proveedorId === proveedorId)
}

export async function searchProveedores(query: string) {
  const lowerQuery = query.toLowerCase()
  return proveedores.filter(
    (p) => p.nombre.toLowerCase().includes(lowerQuery) || p.nit.toLowerCase().includes(lowerQuery),
  )
}
