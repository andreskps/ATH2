import type { Producto, ComponenteProducto, EspecificacionTecnica, ParametroInyeccion } from "@/lib/types"

// Datos de ejemplo para productos
const productosData: Producto[] = [
  {
    id: 1,
    codigo: "PL-001",
    nombre: "Botella PET 500ml",
    color: "Transparente",
    tipo: "Botella",
    cicloTeorico: 12,
    peso: 15.5,
    dosificacion: 0.8,
    tipoEmpaque: "Caja",
    unidadEmpaque: 100,
    imagen: "/productos/botella-500ml.png",
    fichaTecnica: "/productos/fichas/botella-500ml-ficha.pdf",
    planoTecnico: "/productos/planos/botella-500ml-plano.pdf",
    instructivoEmpaque: "/productos/instructivos/botella-500ml-instructivo.pdf",
    estado: "Activo",
    fechaCreacion: "2022-05-10",
    fechaActualizacion: "2023-08-15",
    componentes: [
      {
        id: 1,
        nombre: "PET Virgen",
        cantidad: 12.5,
        unidad: "g",
      },
      {
        id: 2,
        nombre: "PET Reciclado",
        cantidad: 3.0,
        unidad: "g",
      },
    ],
    especificaciones: [
      {
        id: 1,
        nombre: "Peso",
        estandar: 15.5,
        desviacion: 0.2,
        minimo: 15.3,
        maximo: 15.7,
        unidad: "g",
      },
      {
        id: 2,
        nombre: "Capacidad de rebose",
        estandar: 520,
        desviacion: 5,
        minimo: 515,
        maximo: 525,
        unidad: "ml",
      },
      {
        id: 3,
        nombre: "Altura total",
        estandar: 200,
        desviacion: 0.5,
        minimo: 199.5,
        maximo: 200.5,
        unidad: "mm",
      },
    ],
    parametrosInyeccion: [
      {
        id: 1,
        seccion: "Temperatura",
        maquina: "INY31",
        nombre: "Zona 1",
        valor: 280,
        unidad: "°C",
      },
      {
        id: 2,
        seccion: "Temperatura",
        maquina: "INY31",
        nombre: "Zona 2",
        valor: 275,
        unidad: "°C",
      },
      {
        id: 3,
        seccion: "Inyección",
        maquina: "INY31",
        nombre: "Presión de inyección",
        valor: 85,
        unidad: "bar",
      },
      {
        id: 4,
        seccion: "Inyección",
        maquina: "INY31",
        nombre: "Tiempo de inyección",
        valor: 2.5,
        unidad: "s",
      },
      {
        id: 5,
        seccion: "Carga",
        maquina: "INY31",
        nombre: "Velocidad de carga",
        valor: 40,
        unidad: "mm/s",
      },
    ],
  },
  {
    id: 2,
    codigo: "PL-002",
    nombre: "Tapa rosca estándar",
    color: "Azul",
    tipo: "Tapa",
    cicloTeorico: 8,
    peso: 2.8,
    dosificacion: 0.3,
    tipoEmpaque: "Bolsa",
    unidadEmpaque: 500,
    imagen: "/productos/tapa-rosca.png",
    fichaTecnica: "/productos/fichas/tapa-rosca-ficha.pdf",
    planoTecnico: "/productos/planos/tapa-rosca-plano.pdf",
    estado: "Activo",
    fechaCreacion: "2022-06-15",
    fechaActualizacion: "2023-07-20",
    componentes: [
      {
        id: 3,
        nombre: "Polipropileno",
        cantidad: 2.8,
        unidad: "g",
      },
    ],
    especificaciones: [
      {
        id: 4,
        nombre: "Peso",
        estandar: 2.8,
        desviacion: 0.1,
        minimo: 2.7,
        maximo: 2.9,
        unidad: "g",
      },
      {
        id: 5,
        nombre: "Diámetro rosca",
        estandar: 28,
        desviacion: 0.2,
        minimo: 27.8,
        maximo: 28.2,
        unidad: "mm",
      },
    ],
    parametrosInyeccion: [
      {
        id: 6,
        seccion: "Temperatura",
        maquina: "INY32",
        nombre: "Zona 1",
        valor: 220,
        unidad: "°C",
      },
      {
        id: 7,
        seccion: "Inyección",
        maquina: "INY32",
        nombre: "Presión de inyección",
        valor: 70,
        unidad: "bar",
      },
    ],
  },
  {
    id: 3,
    codigo: "PL-003",
    nombre: "Contenedor rectangular 1L",
    color: "Blanco",
    tipo: "Contenedor",
    cicloTeorico: 15,
    peso: 45.2,
    dosificacion: 1.2,
    tipoEmpaque: "Caja",
    unidadEmpaque: 50,
    imagen: "/productos/contenedor-1l.png",
    estado: "Activo",
    fechaCreacion: "2022-08-05",
    fechaActualizacion: "2023-09-10",
    componentes: [
      {
        id: 4,
        nombre: "Polipropileno",
        cantidad: 45.2,
        unidad: "g",
      },
    ],
    especificaciones: [
      {
        id: 6,
        nombre: "Peso",
        estandar: 45.2,
        desviacion: 0.5,
        minimo: 44.7,
        maximo: 45.7,
        unidad: "g",
      },
      {
        id: 7,
        nombre: "Capacidad",
        estandar: 1000,
        desviacion: 10,
        minimo: 990,
        maximo: 1010,
        unidad: "ml",
      },
    ],
    parametrosInyeccion: [
      {
        id: 8,
        seccion: "Temperatura",
        maquina: "INY33",
        nombre: "Zona 1",
        valor: 230,
        unidad: "°C",
      },
    ],
  },
  {
    id: 4,
    codigo: "PL-004",
    nombre: "Botella HDPE 1L",
    color: "Natural",
    tipo: "Botella",
    cicloTeorico: 14,
    peso: 28.5,
    dosificacion: 0.9,
    tipoEmpaque: "Caja",
    unidadEmpaque: 80,
    imagen: "/productos/botella-hdpe-1l.png",
    estado: "Activo",
    fechaCreacion: "2022-09-20",
    fechaActualizacion: "2023-10-05",
    componentes: [
      {
        id: 5,
        nombre: "HDPE",
        cantidad: 28.5,
        unidad: "g",
      },
    ],
    especificaciones: [
      {
        id: 8,
        nombre: "Peso",
        estandar: 28.5,
        desviacion: 0.3,
        minimo: 28.2,
        maximo: 28.8,
        unidad: "g",
      },
    ],
    parametrosInyeccion: [
      {
        id: 9,
        seccion: "Temperatura",
        maquina: "INY31",
        nombre: "Zona 1",
        valor: 240,
        unidad: "°C",
      },
    ],
  },
  {
    id: 5,
    codigo: "PL-005",
    nombre: "Envase cosmético 120ml",
    color: "Blanco",
    tipo: "Envase",
    cicloTeorico: 10,
    peso: 12.3,
    dosificacion: 0.6,
    tipoEmpaque: "Caja",
    unidadEmpaque: 200,
    imagen: "/productos/envase-cosmetico.png",
    estado: "En Desarrollo",
    fechaCreacion: "2023-01-15",
    fechaActualizacion: "2023-11-01",
    componentes: [
      {
        id: 6,
        nombre: "PET",
        cantidad: 12.3,
        unidad: "g",
      },
    ],
    especificaciones: [
      {
        id: 9,
        nombre: "Peso",
        estandar: 12.3,
        desviacion: 0.2,
        minimo: 12.1,
        maximo: 12.5,
        unidad: "g",
      },
    ],
    parametrosInyeccion: [
      {
        id: 10,
        seccion: "Temperatura",
        maquina: "INY32",
        nombre: "Zona 1",
        valor: 260,
        unidad: "°C",
      },
    ],
  },
]

// Funciones para acceder a los datos

// Obtener todos los productos
export function getProductos() {
  return productosData
}

// Obtener un producto por su ID
export function getProductoById(id: number) {
  return productosData.find((producto) => producto.id === id)
}

// Verificar si un código ya existe
export function codigoExists(codigo: string, excludeId?: number) {
  return productosData.some(
    (producto) => producto.codigo === codigo && (excludeId === undefined || producto.id !== excludeId),
  )
}

// Crear un nuevo producto
export function createProducto(producto: Omit<Producto, "id">) {
  const newId = Math.max(...productosData.map((p) => p.id)) + 1
  const newProducto = { ...producto, id: newId } as Producto
  productosData.push(newProducto)
  return newProducto
}

// Actualizar un producto existente
export function updateProducto(id: number, producto: Partial<Producto>) {
  const index = productosData.findIndex((p) => p.id === id)
  if (index === -1) return undefined

  productosData[index] = {
    ...productosData[index],
    ...producto,
    fechaActualizacion: new Date().toISOString().split("T")[0],
  }
  return productosData[index]
}

// Cambiar el estado de un producto
export function toggleProductoEstado(id: number, nuevoEstado: "Activo" | "Descontinuado" | "En Desarrollo") {
  const index = productosData.findIndex((p) => p.id === id)
  if (index === -1) return undefined

  productosData[index].estado = nuevoEstado
  productosData[index].fechaActualizacion = new Date().toISOString().split("T")[0]
  return productosData[index]
}

// Eliminar un producto
export function deleteProducto(id: number) {
  const index = productosData.findIndex((p) => p.id === id)
  if (index === -1) return false

  productosData.splice(index, 1)
  return true
}

// Añadir un componente a un producto
export function addComponenteToProducto(productoId: number, componente: Omit<ComponenteProducto, "id">) {
  const producto = getProductoById(productoId)
  if (!producto) return undefined

  const newId = producto.componentes.length > 0 ? Math.max(...producto.componentes.map((c) => c.id)) + 1 : 1

  const newComponente = { ...componente, id: newId }
  producto.componentes.push(newComponente)
  producto.fechaActualizacion = new Date().toISOString().split("T")[0]

  return newComponente
}

// Eliminar un componente de un producto
export function removeComponenteFromProducto(productoId: number, componenteId: number) {
  const producto = getProductoById(productoId)
  if (!producto) return false

  const index = producto.componentes.findIndex((c) => c.id === componenteId)
  if (index === -1) return false

  producto.componentes.splice(index, 1)
  producto.fechaActualizacion = new Date().toISOString().split("T")[0]

  return true
}

// Añadir una especificación técnica a un producto
export function addEspecificacionToProducto(productoId: number, especificacion: Omit<EspecificacionTecnica, "id">) {
  const producto = getProductoById(productoId)
  if (!producto) return undefined

  const newId = producto.especificaciones.length > 0 ? Math.max(...producto.especificaciones.map((e) => e.id)) + 1 : 1

  const newEspecificacion = { ...especificacion, id: newId }
  producto.especificaciones.push(newEspecificacion)
  producto.fechaActualizacion = new Date().toISOString().split("T")[0]

  return newEspecificacion
}

// Eliminar una especificación técnica de un producto
export function removeEspecificacionFromProducto(productoId: number, especificacionId: number) {
  const producto = getProductoById(productoId)
  if (!producto) return false

  const index = producto.especificaciones.findIndex((e) => e.id === especificacionId)
  if (index === -1) return false

  producto.especificaciones.splice(index, 1)
  producto.fechaActualizacion = new Date().toISOString().split("T")[0]

  return true
}

// Añadir un parámetro de inyección a un producto
export function addParametroInyeccionToProducto(productoId: number, parametro: Omit<ParametroInyeccion, "id">) {
  const producto = getProductoById(productoId)
  if (!producto) return undefined

  const newId =
    producto.parametrosInyeccion.length > 0 ? Math.max(...producto.parametrosInyeccion.map((p) => p.id)) + 1 : 1

  const newParametro = { ...parametro, id: newId }
  producto.parametrosInyeccion.push(newParametro)
  producto.fechaActualizacion = new Date().toISOString().split("T")[0]

  return newParametro
}

// Eliminar un parámetro de inyección de un producto
export function removeParametroInyeccionFromProducto(productoId: number, parametroId: number) {
  const producto = getProductoById(productoId)
  if (!producto) return false

  const index = producto.parametrosInyeccion.findIndex((p) => p.id === parametroId)
  if (index === -1) return false

  producto.parametrosInyeccion.splice(index, 1)
  producto.fechaActualizacion = new Date().toISOString().split("T")[0]

  return true
}
