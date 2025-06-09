// Tipos para el módulo de órdenes
export interface OrdenProducto {
  id: number
  productoId: string
  nombre: string
  cantidad: number
  precio: number
  subtotal: number
  observaciones?: string
  // Nuevos campos para gestión de stock
  cantidadInventario: number
  cantidadProduccion: number
  estadoStock: "inventario" | "produccion" | "mixto"
  historialStock: StockHistorialItem[]
}

export interface StockHistorialItem {
  id: number
  fecha: string
  usuario: string
  accion: string
  cantidadInventario: number
  cantidadProduccion: number
  comentario?: string
}

export interface ComponenteProducto {
  id: number
  nombre: string
  cantidad: number
  unidad: string
}

export interface EspecificacionTecnica {
  id: number
  nombre: string
  estandar: number
  desviacion: number
  minimo: number
  maximo: number
  unidad: string
}

export interface ParametroInyeccion {
  id: number
  seccion: string
  maquina: string
  nombre: string
  valor: number
  unidad: string
}

export interface Producto {
  id: number
  codigo: string
  nombre: string
  color: string
  tipo: string
  cicloTeorico: number
  peso: number
  dosificacion: number
  tipoEmpaque: string
  unidadEmpaque: number
  imagen?: string
  fichaTecnica?: string
  planoTecnico?: string
  instructivoEmpaque?: string
  estado: string
  fechaCreacion: string
  fechaActualizacion: string
  componentes: ComponenteProducto[]
  especificaciones: EspecificacionTecnica[]
  parametrosInyeccion: ParametroInyeccion[]
  maquinasCompatibles?: number[] // Añadimos este campo para almacenar los IDs de las máquinas compatibles
}

// Resto de tipos existentes...

export interface Molde {
  id: number
  nombre: string
  referencia: string
  numeroCavidades: number
  tipoInyeccion: string
  estado: string
  productosAsociados: number[]
  fechaCreacion: string
  fechaActualizacion: string
  imagen?: string
  descripcion?: string
  notas?: string
  dimensiones?: {
    largo: number
    ancho: number
    alto: number
  }
  area?: string
  maquinasCompatibles?: string[] // Añadido para almacenar los IDs de las máquinas compatibles
}

export interface Cliente {
  id: number
  nombre: string
  direccion: string
  telefono: string
  email: string
  rfc: string
  creditoDisponible: number
  modoPago: string
  comercialId?: string
  estado: "Activo" | "Inactivo"
}

// Tipos para el módulo de dotación
export interface TipoDotacion {
  id: string
  nombre: string
  descripcion: string
}

export interface InventarioDotacion {
  id: string
  tipoDotacionId: string
  talla: string
  cantidadDisponible: number
}

export interface ItemEntregaDotacion {
  id: string
  inventarioDotacionId: string
  tipoDotacion: string
  talla: string
  cantidad: number
}

export interface EntregaDotacion {
  id: string
  empleadoId: string
  empleadoNombre: string
  fechaEntrega: string
  estado: "pendiente" | "entregado" | "cancelado"
  observaciones: string
  items: ItemEntregaDotacion[]
}
