import type { Cliente, Venta } from "@/lib/types"

// Datos de ejemplo para clientes
const clientesData: Cliente[] = [
  {
    id: 1,
    nit: "900.123.456-7",
    nombre: "Industrias Plásticas S.A.",
    ciudad: "Bogotá",
    telefono: "601-123-4567",
    email: "contacto@industriasplasticas.com",
    modoPago: "Crédito",
    comercialId: "1",
    estado: "Activo",
    contactoPrincipal: {
      nombre: "Fernando Ruiz",
      telefono: "315-123-4567",
    },
    observaciones: "Cliente preferencial con línea de crédito aprobada de $50.000.000",
    direcciones: [
      {
        id: 1,
        direccion: "Calle 80 # 45-23, Zona Industrial",
        ciudad: "Bogotá",
        telefono: "601-123-4567",
        esPrincipal: true,
      },
      {
        id: 2,
        direccion: "Carrera 15 # 78-45, Bodega 3",
        ciudad: "Bogotá",
        telefono: "601-987-6543",
        esPrincipal: false,
      },
    ],
    fechaCreacion: "2020-05-15",
    ultimaCompra: "2023-10-20",
  },
  {
    id: 2,
    nit: "800.456.789-1",
    nombre: "Empaques Modernos Ltda.",
    ciudad: "Medellín",
    telefono: "604-234-5678",
    email: "info@empaquesmodernos.com",
    modoPago: "Contado",
    comercialId: "3",
    estado: "Activo",
    contactoPrincipal: {
      nombre: "Lucía Hernández",
      telefono: "320-234-5678",
    },
    direcciones: [
      {
        id: 3,
        direccion: "Carrera 50 # 34-12, Sector El Poblado",
        ciudad: "Medellín",
        telefono: "604-234-5678",
        esPrincipal: true,
      },
    ],
    fechaCreacion: "2021-02-10",
    ultimaCompra: "2023-11-05",
  },
  {
    id: 3,
    nit: "901.789.123-4",
    nombre: "Plásticos del Norte S.A.S.",
    ciudad: "Barranquilla",
    telefono: "605-345-6789",
    email: "ventas@plasticosnorte.com",
    modoPago: "Crédito",
    comercialId: "2",
    estado: "Inactivo",
    contactoPrincipal: {
      nombre: "Javier Morales",
      telefono: "310-345-6789",
    },
    observaciones: "Cliente con pagos pendientes. Suspendido temporalmente.",
    direcciones: [
      {
        id: 4,
        direccion: "Vía 40 # 73-290, Zona Portuaria",
        ciudad: "Barranquilla",
        telefono: "605-345-6789",
        esPrincipal: true,
      },
    ],
    fechaCreacion: "2019-08-22",
    ultimaCompra: "2023-06-15",
  },
  {
    id: 4,
    nit: "860.234.567-8",
    nombre: "Envases Industriales de Colombia",
    ciudad: "Cali",
    telefono: "602-456-7890",
    email: "comercial@envasesind.com",
    modoPago: "Otro",
    comercialId: "4",
    estado: "Activo",
    contactoPrincipal: {
      nombre: "Carmen Vega",
      telefono: "300-456-7890",
    },
    observaciones: "Pago con anticipo del 50% y 50% contra entrega",
    direcciones: [
      {
        id: 5,
        direccion: "Calle 5 # 34-56, Zona Industrial Acopi",
        ciudad: "Cali",
        telefono: "602-456-7890",
        esPrincipal: true,
      },
      {
        id: 6,
        direccion: "Avenida 6N # 23-45, Bodega 7",
        ciudad: "Cali",
        telefono: "602-567-8901",
        esPrincipal: false,
      },
    ],
    fechaCreacion: "2020-11-30",
    ultimaCompra: "2023-11-18",
  },
  {
    id: 5,
    nit: "830.345.678-9",
    nombre: "Manufacturas Plásticas S.A.",
    ciudad: "Bucaramanga",
    telefono: "607-567-8901",
    email: "info@manuplasticas.com",
    modoPago: "Contado",
    comercialId: "5",
    estado: "Activo",
    contactoPrincipal: {
      nombre: "Ricardo Torres",
      telefono: "314-567-8901",
    },
    direcciones: [
      {
        id: 7,
        direccion: "Carrera 27 # 56-78, Zona Industrial",
        ciudad: "Bucaramanga",
        telefono: "607-567-8901",
        esPrincipal: true,
      },
    ],
    fechaCreacion: "2022-01-15",
    ultimaCompra: "2023-10-30",
  },
]

// Datos de ejemplo para ventas
const ventasData: Venta[] = [
  {
    id: 1,
    clienteId: 1,
    fecha: "2023-10-20",
    total: 5250000,
    estado: "Completada",
    productos: [
      {
        id: 1,
        nombre: "Botella PET 500ml",
        cantidad: 5000,
        precio: 750,
        subtotal: 3750000,
      },
      {
        id: 2,
        nombre: "Tapa rosca estándar",
        cantidad: 5000,
        precio: 300,
        subtotal: 1500000,
      },
    ],
  },
  {
    id: 2,
    clienteId: 1,
    fecha: "2023-09-15",
    total: 4800000,
    estado: "Completada",
    productos: [
      {
        id: 3,
        nombre: "Contenedor rectangular 1L",
        cantidad: 2000,
        precio: 1200,
        subtotal: 2400000,
      },
      {
        id: 4,
        nombre: "Tapa para contenedor rectangular",
        cantidad: 2000,
        precio: 1200,
        subtotal: 2400000,
      },
    ],
  },
  {
    id: 3,
    clienteId: 2,
    fecha: "2023-11-05",
    total: 7500000,
    estado: "Completada",
    productos: [
      {
        id: 5,
        nombre: "Bolsa HDPE 20x30cm",
        cantidad: 50000,
        precio: 150,
        subtotal: 7500000,
      },
    ],
  },
  {
    id: 4,
    clienteId: 3,
    fecha: "2023-06-15",
    total: 3200000,
    estado: "Completada",
    productos: [
      {
        id: 1,
        nombre: "Botella PET 500ml",
        cantidad: 3000,
        precio: 750,
        subtotal: 2250000,
      },
      {
        id: 2,
        nombre: "Tapa rosca estándar",
        cantidad: 3000,
        precio: 300,
        subtotal: 900000,
      },
      {
        id: 6,
        nombre: "Etiqueta personalizada",
        cantidad: 3000,
        precio: 50,
        subtotal: 150000,
      },
    ],
  },
  {
    id: 5,
    clienteId: 4,
    fecha: "2023-11-18",
    total: 9600000,
    estado: "Completada",
    productos: [
      {
        id: 7,
        nombre: "Envase industrial 5L",
        cantidad: 1200,
        precio: 8000,
        subtotal: 9600000,
      },
    ],
  },
  {
    id: 6,
    clienteId: 5,
    fecha: "2023-10-30",
    total: 4250000,
    estado: "Completada",
    productos: [
      {
        id: 8,
        nombre: "Tubo PVC 1/2 pulgada x 3m",
        cantidad: 500,
        precio: 8500,
        subtotal: 4250000,
      },
    ],
  },
  {
    id: 7,
    clienteId: 1,
    fecha: "2023-08-10",
    total: 6300000,
    estado: "Completada",
    productos: [
      {
        id: 9,
        nombre: "Botella PET 1L",
        cantidad: 4000,
        precio: 1200,
        subtotal: 4800000,
      },
      {
        id: 10,
        nombre: "Tapa rosca grande",
        cantidad: 4000,
        precio: 375,
        subtotal: 1500000,
      },
    ],
  },
]

// Funciones para acceder a los datos

// Obtener todos los clientes
export function getClientes(): Cliente[] {
  return clientesData
}

// Obtener un cliente por su ID
export function getClienteById(id: number): Cliente | undefined {
  return clientesData.find((cliente) => cliente.id === id)
}

// Verificar si un NIT ya existe
export function nitExists(nit: string, excludeId?: number): boolean {
  return clientesData.some((cliente) => cliente.nit === nit && (excludeId === undefined || cliente.id !== excludeId))
}

// Obtener ventas por cliente
export function getVentasByClienteId(clienteId: number): Venta[] {
  return ventasData.filter((venta) => venta.clienteId === clienteId)
}

// Crear un nuevo cliente
export function createCliente(cliente: Omit<Cliente, "id">): Cliente {
  const newId = Math.max(...clientesData.map((c) => c.id)) + 1
  const newCliente = { ...cliente, id: newId } as Cliente
  clientesData.push(newCliente)
  return newCliente
}

// Actualizar un cliente existente
export function updateCliente(id: number, cliente: Partial<Cliente>): Cliente | undefined {
  const index = clientesData.findIndex((c) => c.id === id)
  if (index === -1) return undefined

  // Si se actualizan las direcciones, asegurarse de que haya al menos una principal
  if (cliente.direcciones) {
    const hasPrincipal = cliente.direcciones.some((dir) => dir.esPrincipal)
    if (!hasPrincipal && cliente.direcciones.length > 0) {
      cliente.direcciones[0].esPrincipal = true
    }
  }

  clientesData[index] = { ...clientesData[index], ...cliente }
  return clientesData[index]
}

// Cambiar el estado de un cliente
export function toggleClienteEstado(id: number): Cliente | undefined {
  const index = clientesData.findIndex((c) => c.id === id)
  if (index === -1) return undefined

  clientesData[index].estado = clientesData[index].estado === "Activo" ? "Inactivo" : "Activo"
  return clientesData[index]
}

// Eliminar un cliente
export function deleteCliente(id: number): boolean {
  const index = clientesData.findIndex((c) => c.id === id)
  if (index === -1) return false

  clientesData.splice(index, 1)
  return true
}
