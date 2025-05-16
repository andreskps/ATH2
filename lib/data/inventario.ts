// Datos de ejemplo para el inventario
interface InventarioItem {
  productoId: string
  cantidad: number
  ubicacion: string
  lote?: string
}

// Datos de ejemplo para el inventario
const inventarioData: InventarioItem[] = [
  { productoId: "1", cantidad: 3000, ubicacion: "Almacén A-12" },
  { productoId: "2", cantidad: 8000, ubicacion: "Almacén B-05" },
  { productoId: "3", cantidad: 1500, ubicacion: "Almacén C-08" },
  { productoId: "4", cantidad: 500, ubicacion: "Almacén A-15" },
  { productoId: "5", cantidad: 2000, ubicacion: "Almacén D-03" },
]

// Obtener el stock disponible para un producto
export function getStockDisponible(productoId: string): number {
  const item = inventarioData.find((item) => item.productoId === productoId)
  return item ? item.cantidad : 0
}

// Reservar stock para una orden
export function reservarStock(productoId: string, cantidad: number): boolean {
  const index = inventarioData.findIndex((item) => item.productoId === productoId)
  if (index === -1 || inventarioData[index].cantidad < cantidad) {
    return false
  }

  inventarioData[index].cantidad -= cantidad
  return true
}

// Verificar y reservar stock para un producto
export function verificarYReservarStock(
  productoId: string,
  cantidadRequerida: number,
): {
  cantidadInventario: number
  cantidadProduccion: number
  estadoStock: "inventario" | "produccion" | "mixto"
} {
  const stockDisponible = getStockDisponible(productoId)

  // Si hay suficiente stock
  if (stockDisponible >= cantidadRequerida) {
    reservarStock(productoId, cantidadRequerida)
    return {
      cantidadInventario: cantidadRequerida,
      cantidadProduccion: 0,
      estadoStock: "inventario",
    }
  }
  // Si hay stock parcial
  else if (stockDisponible > 0) {
    reservarStock(productoId, stockDisponible)
    return {
      cantidadInventario: stockDisponible,
      cantidadProduccion: cantidadRequerida - stockDisponible,
      estadoStock: "mixto",
    }
  }
  // Si no hay stock
  else {
    return {
      cantidadInventario: 0,
      cantidadProduccion: cantidadRequerida,
      estadoStock: "produccion",
    }
  }
}

// Función para obtener un item de inventario por ID de producto
export function getInventarioByProductoId(productoId: string): InventarioItem | undefined {
  return inventarioData.find((item) => item.productoId === productoId)
}
