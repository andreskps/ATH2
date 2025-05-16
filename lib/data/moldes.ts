import type { Molde } from "@/lib/types"

export const moldes: Molde[] = [
  {
    id: 1,
    nombre: "Molde Botella 500ml",
    referencia: "MB-500",
    numeroCavidades: 4,
    tipoInyeccion: "Hidráulica",
    estado: "Activo",
    productosAsociados: [1],
    fechaCreacion: "2023-01-15",
    fechaActualizacion: "2023-01-15",
    imagen: "/baking-molds.png",
    descripcion: "Molde para botellas de plástico de 500ml con cuello estándar.",
    notas: "Requiere mantenimiento preventivo cada 10,000 ciclos.",
    dimensiones: {
      largo: 300,
      ancho: 200,
      alto: 150,
    },
    area: "Inyección PET",
  },
  {
    id: 2,
    nombre: "Molde Tapa Rosca",
    referencia: "MTR-01",
    numeroCavidades: 8,
    tipoInyeccion: "Eléctrica",
    estado: "Activo",
    productosAsociados: [2],
    fechaCreacion: "2023-02-10",
    fechaActualizacion: "2023-02-10",
    imagen: "/baking-molds.png",
    descripcion: "Molde para tapas con rosca estándar de 28mm.",
    notas: "Compatible con botellas de la serie MB.",
    dimensiones: {
      largo: 250,
      ancho: 250,
      alto: 100,
    },
    area: "Tapas y Cierres",
  },
  {
    id: 3,
    nombre: "Molde Contenedor 1L",
    referencia: "MC-1L",
    numeroCavidades: 2,
    tipoInyeccion: "Hidráulica",
    estado: "En Mantenimiento",
    productosAsociados: [3],
    fechaCreacion: "2023-03-05",
    fechaActualizacion: "2023-05-20",
    imagen: "/baking-molds.png",
    descripcion: "Molde para contenedores de 1 litro con tapa hermética.",
    notas: "Actualmente en mantenimiento por desgaste en las cavidades.",
    dimensions: {
      largo: 400,
      ancho: 300,
      alto: 200,
    },
    area: "Contenedores",
  },
  {
    id: 4,
    nombre: "Molde Botella HDPE 1L",
    referencia: "MB-HDPE-1L",
    numeroCavidades: 4,
    tipoInyeccion: "Híbrida",
    estado: "Activo",
    productosAsociados: [4],
    fechaCreacion: "2023-04-12",
    fechaActualizacion: "2023-04-12",
    imagen: "/baking-molds.png",
    descripcion: "Molde para botellas HDPE de 1 litro con asa integrada.",
    notas: "Optimizado para ciclos rápidos de producción.",
    dimensions: {
      largo: 350,
      ancho: 250,
      alto: 200,
    },
    area: "Inyección HDPE",
  },
  {
    id: 5,
    nombre: "Molde Envase Cosmético",
    referencia: "MEC-01",
    numeroCavidades: 6,
    tipoInyeccion: "Eléctrica",
    estado: "Fuera de Servicio",
    productosAsociados: [5],
    fechaCreacion: "2023-05-18",
    fechaActualizacion: "2023-06-30",
    imagen: "/baking-molds.png",
    descripcion: "Molde para envases cosméticos con acabado de alta calidad.",
    notas: "Fuera de servicio por rotura en el sistema de refrigeración.",
    dimensions: {
      largo: 280,
      ancho: 220,
      alto: 180,
    },
    area: "Cosméticos",
  },
  {
    id: 6,
    nombre: "Molde Botella 750ml",
    referencia: "MB-750",
    numeroCavidades: 4,
    tipoInyeccion: "Hidráulica",
    estado: "Activo",
    productosAsociados: [],
    fechaCreacion: "2023-06-15",
    fechaActualizacion: "2023-06-15",
    imagen: "/baking-molds.png",
    descripcion: "Molde para botellas de plástico de 750ml con cuello ancho.",
    notas: "Nuevo molde optimizado para ciclos rápidos.",
    dimensions: {
      largo: 320,
      ancho: 210,
      alto: 160,
    },
    area: "Inyección PET",
  },
  {
    id: 7,
    nombre: "Molde Tapa Flip-Top",
    referencia: "MTF-01",
    numeroCavidades: 6,
    tipoInyeccion: "Eléctrica",
    estado: "Activo",
    productosAsociados: [],
    fechaCreacion: "2023-07-10",
    fechaActualizacion: "2023-07-10",
    imagen: "/baking-molds.png",
    descripcion: "Molde para tapas flip-top para botellas de condimentos.",
    notas: "Diseño ergonómico para fácil apertura.",
    dimensions: {
      largo: 230,
      ancho: 230,
      alto: 90,
    },
    area: "Tapas y Cierres",
  },
  {
    id: 8,
    nombre: "Molde Contenedor 2L",
    referencia: "MC-2L",
    numeroCavidades: 2,
    tipoInyeccion: "Hidráulica",
    estado: "Activo",
    productosAsociados: [],
    fechaCreacion: "2023-08-05",
    fechaActualizacion: "2023-08-05",
    imagen: "/baking-molds.png",
    descripcion: "Molde para contenedores de 2 litros con asas laterales.",
    notas: "Reforzado para mayor durabilidad.",
    dimensions: {
      largo: 450,
      ancho: 320,
      alto: 220,
    },
    area: "Contenedores",
  },
  {
    id: 9,
    nombre: "Molde Botella HDPE 2L",
    referencia: "MB-HDPE-2L",
    numeroCavidades: 2,
    tipoInyeccion: "Híbrida",
    estado: "Activo",
    productosAsociados: [],
    fechaCreacion: "2023-09-12",
    fechaActualizacion: "2023-09-12",
    imagen: "/baking-molds.png",
    descripcion: "Molde para botellas HDPE de 2 litros con asa ergonómica.",
    notas: "Diseñado para productos químicos y detergentes.",
    dimensions: {
      largo: 380,
      ancho: 270,
      alto: 230,
    },
    area: "Inyección HDPE",
  },
  {
    id: 10,
    nombre: "Molde Envase Crema Facial",
    referencia: "MEC-02",
    numeroCavidades: 8,
    tipoInyeccion: "Eléctrica",
    estado: "Activo",
    productosAsociados: [],
    fechaCreacion: "2023-10-18",
    fechaActualizacion: "2023-10-18",
    imagen: "/baking-molds.png",
    descripcion: "Molde para envases de crema facial con acabado premium.",
    notas: "Incluye sistema de refrigeración avanzado para ciclos rápidos.",
    dimensions: {
      largo: 260,
      ancho: 200,
      alto: 160,
    },
    area: "Cosméticos",
  },
]

export async function getMoldes() {
  return moldes
}

export async function getMolde(id: number) {
  return moldes.find((molde) => molde.id === id)
}

export async function getMoldeByReferencia(referencia: string) {
  return moldes.find((molde) => molde.referencia === referencia)
}

export async function getMoldesByEstado(estado: string) {
  return moldes.filter((molde) => molde.estado === estado)
}

export async function getMoldesByTipoInyeccion(tipoInyeccion: string) {
  return moldes.filter((molde) => molde.tipoInyeccion === tipoInyeccion)
}

export async function getMoldesByNumeroCavidades(numeroCavidades: number) {
  return moldes.filter((molde) => molde.numeroCavidades === numeroCavidades)
}

export async function getMoldesByProductoId(productoId: number) {
  return moldes.filter((molde) => molde.productosAsociados.includes(productoId))
}

// Función para verificar si una referencia ya existe
export function checkReferenciaExists(referencia: string) {
  return moldes.some((molde) => molde.referencia === referencia)
}

// Función para crear un nuevo molde
export function createMolde(data: any) {
  const newId = Math.max(...moldes.map((m) => m.id)) + 1
  const fechaActual = new Date().toISOString().split("T")[0]

  const nuevoMolde: Molde = {
    id: newId,
    nombre: data.nombre,
    referencia: data.referencia,
    numeroCavidades: data.cavidades,
    tipoInyeccion: data.tipoInyeccion,
    estado: data.estado,
    productosAsociados: [],
    fechaCreacion: fechaActual,
    fechaActualizacion: fechaActual,
    imagen: "/baking-molds.png", // Imagen por defecto
    descripcion: data.descripcion || "",
    notas: data.notas || "",
    dimensiones: {
      largo: data.largo || 0,
      ancho: data.ancho || 0,
      alto: data.alto || 0,
    },
    area: data.area || "",
    maquinasCompatibles: data.maquinasCompatibles || [],
  }

  moldes.push(nuevoMolde)
  return nuevoMolde
}

// Función para actualizar un molde existente
export function updateMolde(id: number, data: any) {
  const index = moldes.findIndex((m) => m.id === id)
  if (index !== -1) {
    moldes[index] = {
      ...moldes[index],
      nombre: data.nombre,
      referencia: data.referencia,
      numeroCavidades: data.cavidades,
      tipoInyeccion: data.tipoInyeccion,
      estado: data.estado,
      descripcion: data.descripcion || "",
      notas: data.notas || "",
      dimensiones: {
        largo: data.largo || 0,
        ancho: data.ancho || 0,
        alto: data.alto || 0,
      },
      area: data.area || "",
      maquinasCompatibles: data.maquinasCompatibles || [],
      fechaActualizacion: new Date().toISOString().split("T")[0],
    }
    return moldes[index]
  }
  throw new Error(`Molde con ID ${id} no encontrado`)
}

// Función para actualizar el estado de un molde
export function updateMoldeEstado(id: number, nuevoEstado: string) {
  const index = moldes.findIndex((molde) => molde.id === id)
  if (index !== -1) {
    moldes[index] = {
      ...moldes[index],
      estado: nuevoEstado,
      fechaActualizacion: new Date().toISOString().split("T")[0],
    }
    return { success: true }
  }
  return { success: false, message: "Molde no encontrado" }
}

// Función para eliminar un molde
export function deleteMolde(id: number) {
  const index = moldes.findIndex((molde) => molde.id === id)
  if (index !== -1) {
    // Verificar si el molde tiene productos asociados
    if (moldes[index].productosAsociados.length > 0) {
      return {
        success: false,
        message: "No se puede eliminar el molde porque tiene productos asociados. Desasocie los productos primero.",
      }
    }

    // Eliminar el molde
    moldes.splice(index, 1)
    return { success: true }
  }
  return { success: false, message: "Molde no encontrado" }
}
