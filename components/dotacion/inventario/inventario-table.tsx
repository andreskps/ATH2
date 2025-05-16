"use client"

import { useState, useEffect } from "react"
import type { InventarioDotacion } from "@/lib/types"
import { InventarioTableHeader } from "./inventario-table-header"
import { InventarioTableSkeleton } from "./inventario-table-skeleton"
import { InventarioActions } from "./inventario-actions"
import { Badge } from "@/components/ui/badge"

interface InventarioTableProps {
  inventario: InventarioDotacion[]
  isLoading?: boolean
  filtros?: {
    busqueda: string
    categoria: string
    talla: string
    estado: string
  }
}

export function InventarioTable({
  inventario,
  isLoading = false,
  filtros = { busqueda: "", categoria: "", talla: "", estado: "" },
}: InventarioTableProps) {
  const [sortColumn, setSortColumn] = useState<string>("tipoDotacion")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [filteredInventario, setFilteredInventario] = useState<InventarioDotacion[]>([])

  useEffect(() => {
    if (!isLoading && inventario) {
      // Aplicar filtros
      let filtered = [...inventario]

      if (filtros.busqueda) {
        const busqueda = filtros.busqueda.toLowerCase()
        filtered = filtered.filter((item) => item.tipoDotacion.toLowerCase().includes(busqueda))
      }

      if (filtros.categoria && filtros.categoria !== "all") {
        filtered = filtered.filter((item) => item.categoria === filtros.categoria)
      }

      if (filtros.talla && filtros.talla !== "all") {
        filtered = filtered.filter((item) => item.talla === filtros.talla)
      }

      if (filtros.estado && filtros.estado !== "all") {
        filtered = filtered.filter((item) => item.estado === filtros.estado)
      }

      // Aplicar ordenamiento
      filtered.sort((a, b) => {
        const aValue = a[sortColumn as keyof InventarioDotacion]
        const bValue = b[sortColumn as keyof InventarioDotacion]

        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
        }

        if (typeof aValue === "number" && typeof bValue === "number") {
          return sortDirection === "asc" ? aValue - bValue : bValue - aValue
        }

        return 0
      })

      setFilteredInventario(filtered)
    }
  }, [
    inventario,
    sortColumn,
    sortDirection,
    isLoading,
    filtros.busqueda,
    filtros.categoria,
    filtros.talla,
    filtros.estado,
  ])

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "ok":
        return <Badge className="bg-green-500 hover:bg-green-600">OK</Badge>
      case "bajo_stock":
        return <Badge className="bg-amber-500 hover:bg-amber-600">Bajo stock</Badge>
      case "agotado":
        return <Badge className="bg-red-500 hover:bg-red-600">Agotado</Badge>
      default:
        return <Badge>{estado}</Badge>
    }
  }

  return (
    <div className="rounded-md border">
      <div className="relative w-full overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <InventarioTableHeader sortColumn={sortColumn} sortDirection={sortDirection} onSort={handleSort} />
          <tbody>
            {isLoading ? (
              <InventarioTableSkeleton />
            ) : filteredInventario.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-4 text-center text-muted-foreground">
                  No se encontraron resultados
                </td>
              </tr>
            ) : (
              filteredInventario.map((item) => (
                <tr key={item.id} className="border-b transition-colors hover:bg-muted/50">
                  <td className="p-4 font-medium">{item.tipoDotacion}</td>
                  <td className="p-4">{item.categoria}</td>
                  <td className="p-4">{item.talla}</td>
                  <td className="p-4 text-center">{item.cantidadDisponible}</td>
                  <td className="p-4 text-center">{item.stockMinimo}</td>
                  <td className="p-4 text-center">{getEstadoBadge(item.estado)}</td>
                  <td className="p-4 text-right">
                    <InventarioActions item={item} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
