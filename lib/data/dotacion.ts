import type { TipoDotacion, InventarioDotacion, EntregaDotacion } from "../types"

// Datos de ejemplo para tipos de dotación
export const tiposDotacion: TipoDotacion[] = [
  {
    id: "tipo-1",
    nombre: "Camisa de trabajo",
    categoria: "Ropa de trabajo",
    descripcion: "Camisa de manga larga con logo de la empresa",
    fechaCreacion: "2023-01-15T10:30:00Z",
    fechaActualizacion: "2023-01-15T10:30:00Z",
  },
  {
    id: "tipo-2",
    nombre: "Pantalón industrial",
    categoria: "Ropa de trabajo",
    descripcion: "Pantalón resistente para trabajo en planta",
    fechaCreacion: "2023-01-15T11:15:00Z",
    fechaActualizacion: "2023-02-20T09:45:00Z",
  },
  {
    id: "tipo-3",
    nombre: "Botas de seguridad",
    categoria: "Calzado",
    descripcion: "Botas con punta de acero y suela antideslizante",
    fechaCreacion: "2023-01-16T14:20:00Z",
    fechaActualizacion: "2023-01-16T14:20:00Z",
  },
  {
    id: "tipo-4",
    nombre: "Casco de protección",
    categoria: "Equipo de protección",
    descripcion: "Casco de seguridad para áreas de producción",
    fechaCreacion: "2023-01-18T08:10:00Z",
    fechaActualizacion: "2023-03-05T16:30:00Z",
  },
  {
    id: "tipo-5",
    nombre: "Guantes de trabajo",
    categoria: "Equipo de protección",
    descripcion: "Guantes resistentes a cortes y abrasiones",
    fechaCreacion: "2023-01-20T13:45:00Z",
    fechaActualizacion: "2023-01-20T13:45:00Z",
  },
  {
    id: "tipo-6",
    nombre: "Gafas de seguridad",
    categoria: "Equipo de protección",
    descripcion: "Gafas protectoras para trabajo en planta",
    fechaCreacion: "2023-01-22T09:30:00Z",
    fechaActualizacion: "2023-01-22T09:30:00Z",
  },
  {
    id: "tipo-7",
    nombre: "Chaleco reflectante",
    categoria: "Ropa de trabajo",
    descripcion: "Chaleco de alta visibilidad para áreas de tránsito",
    fechaCreacion: "2023-01-25T15:20:00Z",
    fechaActualizacion: "2023-04-10T11:15:00Z",
  },
]

// Datos de ejemplo para inventario de dotación
export const inventarioDotacion: InventarioDotacion[] = [
  {
    id: "inv-1",
    tipoDotacionId: "tipo-1",
    tipoDotacion: "Camisa de trabajo",
    categoria: "Ropa de trabajo",
    talla: "S",
    cantidadDisponible: 15,
    stockMinimo: 5,
    estado: "ok",
    fechaUltimaActualizacion: "2023-05-10T08:30:00Z",
  },
  {
    id: "inv-2",
    tipoDotacionId: "tipo-1",
    tipoDotacion: "Camisa de trabajo",
    categoria: "Ropa de trabajo",
    talla: "M",
    cantidadDisponible: 8,
    stockMinimo: 10,
    estado: "bajo_stock",
    fechaUltimaActualizacion: "2023-05-10T08:30:00Z",
  },
  {
    id: "inv-3",
    tipoDotacionId: "tipo-1",
    tipoDotacion: "Camisa de trabajo",
    categoria: "Ropa de trabajo",
    talla: "L",
    cantidadDisponible: 20,
    stockMinimo: 10,
    estado: "ok",
    fechaUltimaActualizacion: "2023-05-10T08:30:00Z",
  },
  {
    id: "inv-4",
    tipoDotacionId: "tipo-1",
    tipoDotacion: "Camisa de trabajo",
    categoria: "Ropa de trabajo",
    talla: "XL",
    cantidadDisponible: 12,
    stockMinimo: 5,
    estado: "ok",
    fechaUltimaActualizacion: "2023-05-10T08:30:00Z",
  },
  {
    id: "inv-5",
    tipoDotacionId: "tipo-2",
    tipoDotacion: "Pantalón industrial",
    categoria: "Ropa de trabajo",
    talla: "30",
    cantidadDisponible: 0,
    stockMinimo: 5,
    estado: "agotado",
    fechaUltimaActualizacion: "2023-05-12T14:15:00Z",
  },
  {
    id: "inv-6",
    tipoDotacionId: "tipo-2",
    tipoDotacion: "Pantalón industrial",
    categoria: "Ropa de trabajo",
    talla: "32",
    cantidadDisponible: 7,
    stockMinimo: 5,
    estado: "ok",
    fechaUltimaActualizacion: "2023-05-12T14:15:00Z",
  },
  {
    id: "inv-7",
    tipoDotacionId: "tipo-2",
    tipoDotacion: "Pantalón industrial",
    categoria: "Ropa de trabajo",
    talla: "34",
    cantidadDisponible: 10,
    stockMinimo: 5,
    estado: "ok",
    fechaUltimaActualizacion: "2023-05-12T14:15:00Z",
  },
  {
    id: "inv-8",
    tipoDotacionId: "tipo-2",
    tipoDotacion: "Pantalón industrial",
    categoria: "Ropa de trabajo",
    talla: "36",
    cantidadDisponible: 3,
    stockMinimo: 5,
    estado: "bajo_stock",
    fechaUltimaActualizacion: "2023-05-12T14:15:00Z",
  },
  {
    id: "inv-9",
    tipoDotacionId: "tipo-3",
    tipoDotacion: "Botas de seguridad",
    categoria: "Calzado",
    talla: "38",
    cantidadDisponible: 4,
    stockMinimo: 3,
    estado: "ok",
    fechaUltimaActualizacion: "2023-05-15T09:45:00Z",
  },
  {
    id: "inv-10",
    tipoDotacionId: "tipo-3",
    tipoDotacion: "Botas de seguridad",
    categoria: "Calzado",
    talla: "40",
    cantidadDisponible: 6,
    stockMinimo: 3,
    estado: "ok",
    fechaUltimaActualizacion: "2023-05-15T09:45:00Z",
  },
  {
    id: "inv-11",
    tipoDotacionId: "tipo-3",
    tipoDotacion: "Botas de seguridad",
    categoria: "Calzado",
    talla: "42",
    cantidadDisponible: 2,
    stockMinimo: 3,
    estado: "bajo_stock",
    fechaUltimaActualizacion: "2023-05-15T09:45:00Z",
  },
  {
    id: "inv-12",
    tipoDotacionId: "tipo-4",
    tipoDotacion: "Casco de protección",
    categoria: "Equipo de protección",
    talla: "Único",
    cantidadDisponible: 25,
    stockMinimo: 10,
    estado: "ok",
    fechaUltimaActualizacion: "2023-05-18T11:30:00Z",
  },
  {
    id: "inv-13",
    tipoDotacionId: "tipo-5",
    tipoDotacion: "Guantes de trabajo",
    categoria: "Equipo de protección",
    talla: "S",
    cantidadDisponible: 8,
    stockMinimo: 10,
    estado: "bajo_stock",
    fechaUltimaActualizacion: "2023-05-20T13:20:00Z",
  },
  {
    id: "inv-14",
    tipoDotacionId: "tipo-5",
    tipoDotacion: "Guantes de trabajo",
    categoria: "Equipo de protección",
    talla: "M",
    cantidadDisponible: 15,
    stockMinimo: 10,
    estado: "ok",
    fechaUltimaActualizacion: "2023-05-20T13:20:00Z",
  },
  {
    id: "inv-15",
    tipoDotacionId: "tipo-5",
    tipoDotacion: "Guantes de trabajo",
    categoria: "Equipo de protección",
    talla: "L",
    cantidadDisponible: 12,
    stockMinimo: 10,
    estado: "ok",
    fechaUltimaActualizacion: "2023-05-20T13:20:00Z",
  },
]

// Datos de ejemplo para entregas de dotación
// export const entregasDotacion: EntregaDotacion[] = [
//   {
//     id: "entrega-1",
//     empleadoId: "emp-1",
//     empleadoNombre: "Juan Pérez",
//     items: [
//       {
//         id: "item-1",
//         inventarioDotacionId: "inv-3",
//         tipoDotacion: "Camisa de trabajo",
//         talla: "L",
//         cantidad: 2,
//       },
//       {
//         id: "item-2",
//         inventarioDotacionId: "inv-7",
//         tipoDotacion: "Pantalón industrial",
//         talla: "34",
//         cantidad: 2,
//       },
//       {
//         id: "item-3",
//         inventarioDotacionId: "inv-10",
//         tipoDotacion: "Botas de seguridad",
//         talla: "40",
//         cantidad: 1,
//       },
//     ],
//     fechaEntrega: "2023-06-01T09:15:00Z",
//     observaciones: "Entrega semestral programada",
//     estado: "entregado",
//   },
//   {
//     id: "entrega-2",
//     empleadoId: "emp-2",
//     empleadoNombre: "María Rodríguez",
//     items: [
//       {
//         id: "item-4",
//         inventarioDotacionId: "inv-2",
//         tipoDotacion: "Camisa de trabajo",
//         talla: "M",
//         cantidad: 2,
//       },
//       {
//         id: "item-5",
//         inventarioDotacionId: "inv-6",
//         tipoDotacion: "Pantalón industrial",
//         talla: "32",
//         cantidad: 2,
//       },
//       {
//         id: "item-6",
//         inventarioDotacionId: "inv-9",
//         tipoDotacion: "Botas de seguridad",
//         talla: "38",
//         cantidad: 1,
//       },
//     ],
//     fechaEntrega: "2023-06-02T10:30:00Z",
//     observaciones: "Entrega por ingreso a la empresa",
//     estado: "entregado",
//   },
//   {
//     id: "entrega-3",
//     empleadoId: "emp-3",
//     empleadoNombre: "Carlos Gómez",
//     items: [
//       {
//         id: "item-7",
//         inventarioDotacionId: "inv-4",
//         tipoDotacion: "Camisa de trabajo",
//         talla: "XL",
//         cantidad: 2,
//       },
//       {
//         id: "item-8",
//         inventarioDotacionId: "inv-8",
//         tipoDotacion: "Pantalón industrial",
//         talla: "36",
//         cantidad: 2,
//       },
//       {
//         id: "item-9",
//         inventarioDotacionId: "inv-11",
//         tipoDotacion: "Botas de seguridad",
//         talla: "42",
//         cantidad: 1,
//       },
//     ],
//     fechaEntrega: "2023-06-15T00:00:00Z",
//     observaciones: "Pendiente de entrega",
//     estado: "pendiente",
//   },
// ]

// Funciones para obtener datos
export async function getTiposDotacion(): Promise<TipoDotacion[]> {
  // Simulación de datos para desarrollo
  return [
    { id: "tipo-1", nombre: "Camisa de trabajo", descripcion: "Camisa de trabajo con logo de la empresa" },
    { id: "tipo-2", nombre: "Zapatos de seguridad", descripcion: "Zapatos con punta de acero" },
    { id: "tipo-3", nombre: "Chaleco reflectante", descripcion: "Chaleco de alta visibilidad" },
    { id: "tipo-4", nombre: "Casco de seguridad", descripcion: "Casco de protección" },
    { id: "tipo-5", nombre: "Guantes de trabajo", descripcion: "Guantes resistentes a cortes" },
  ]
}

export async function getTipoDotacionById(id: string) {
  // Simulamos una llamada a API
  await new Promise((resolve) => setTimeout(resolve, 300))
  return tiposDotacion.find((tipo) => tipo.id === id)
}

export async function getInventarioDotacion(): Promise<InventarioDotacion[]> {
  // Simulación de datos para desarrollo
  return [
    { id: "inv-1", tipoDotacionId: "tipo-1", talla: "S", cantidadDisponible: 15 },
    { id: "inv-2", tipoDotacionId: "tipo-1", talla: "M", cantidadDisponible: 20 },
    { id: "inv-3", tipoDotacionId: "tipo-1", talla: "L", cantidadDisponible: 18 },
    { id: "inv-4", tipoDotacionId: "tipo-2", talla: "40", cantidadDisponible: 5 },
    { id: "inv-5", tipoDotacionId: "tipo-2", talla: "42", cantidadDisponible: 8 },
    { id: "inv-6", tipoDotacionId: "tipo-2", talla: "44", cantidadDisponible: 6 },
    { id: "inv-7", tipoDotacionId: "tipo-3", talla: "M", cantidadDisponible: 12 },
    { id: "inv-8", tipoDotacionId: "tipo-3", talla: "L", cantidadDisponible: 10 },
    { id: "inv-9", tipoDotacionId: "tipo-4", talla: "Universal", cantidadDisponible: 25 },
    { id: "inv-10", tipoDotacionId: "tipo-5", talla: "S", cantidadDisponible: 30 },
    { id: "inv-11", tipoDotacionId: "tipo-5", talla: "M", cantidadDisponible: 28 },
    { id: "inv-12", tipoDotacionId: "tipo-5", talla: "L", cantidadDisponible: 22 },
  ]
}

export async function getInventarioDotacionById(id: string) {
  // Simulamos una llamada a API
  await new Promise((resolve) => setTimeout(resolve, 300))
  return inventarioDotacion.find((item) => item.id === id)
}

export async function getEntregasDotacion(): Promise<EntregaDotacion[]> {
  // Simulación de datos para desarrollo
  return [
    {
      id: "entrega-1",
      empleadoId: "emp-1",
      empleadoNombre: "Juan Pérez",
      fechaEntrega: "2023-05-15T10:00:00Z",
      estado: "entregado",
      observaciones: "Entrega inicial",
      items: [
        {
          id: "item-1",
          inventarioDotacionId: "tipo-1-M",
          tipoDotacion: "Camisa de trabajo",
          talla: "M",
          cantidad: 2,
        },
        {
          id: "item-2",
          inventarioDotacionId: "tipo-2-42",
          tipoDotacion: "Zapatos de seguridad",
          talla: "42",
          cantidad: 1,
        },
      ],
    },
    {
      id: "entrega-2",
      empleadoId: "emp-2",
      empleadoNombre: "María Rodríguez",
      fechaEntrega: "2023-06-20T14:30:00Z",
      estado: "pendiente",
      observaciones: "",
      items: [
        {
          id: "item-3",
          inventarioDotacionId: "tipo-1-S",
          tipoDotacion: "Camisa de trabajo",
          talla: "S",
          cantidad: 3,
        },
      ],
    },
    {
      id: "entrega-3",
      empleadoId: "emp-3",
      empleadoNombre: "Carlos Gómez",
      fechaEntrega: "2023-07-05T09:15:00Z",
      estado: "entregado",
      observaciones: "Reposición por desgaste",
      items: [
        {
          id: "item-4",
          inventarioDotacionId: "tipo-3-L",
          tipoDotacion: "Chaleco reflectante",
          talla: "L",
          cantidad: 1,
        },
        {
          id: "item-5",
          inventarioDotacionId: "tipo-4-U",
          tipoDotacion: "Casco de seguridad",
          talla: "Universal",
          cantidad: 1,
        },
      ],
    },
  ]
}

export async function getEntregaDotacionById(id: string): Promise<EntregaDotacion | null> {
  const entregas = await getEntregasDotacion()
  return entregas.find((entrega) => entrega.id === id) || null
}

// Categorías de dotación predefinidas
export const categoriasDotacion = [
  "Ropa de trabajo",
  "Calzado",
  "Equipo de protección",
  "Accesorios",
  "Uniformes administrativos",
  "Otros",
]
