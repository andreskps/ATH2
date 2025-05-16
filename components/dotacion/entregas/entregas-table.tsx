"use client"

import { useState, useEffect } from "react"
import { format, parseISO } from "date-fns"
import { es } from "date-fns/locale"
import { Badge } from "@/components/ui/badge"
import { EntregasTableHeader } from "./entregas-table-header"
import { EntregasTableSkeleton } from "./entregas-table-skeleton"
import { EntregaActions } from "./entrega-actions"
import type { EntregaDotacion, ItemEntregaDotacion } from "@/lib/types"

interface EntregasTableProps {
  entregas: EntregaDotacion[]
  isLoading?: boolean
  filtros: {
    busqueda: string
    tipoDotacion: string
    estado: string
    fechaDesde: Date | undefined
    fechaHasta: Date | undefined
  }
}

export function EntregasTable({ entregas, isLoading = false, filtros }: EntregasTableProps) {
  const [sortColumn, setSortColumn] = useState("fechaEntrega")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [filteredEntregas, setFilteredEntregas] = useState<EntregaDotacion[]>([])

  // Función para manejar el ordenamiento
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  // Filtrar y ordenar entregas
  useEffect(() => {
    let result = [...entregas]

    // Aplicar filtros
    if (filtros.busqueda) {
      const busqueda = filtros.busqueda.toLowerCase()
      result = result.filter((entrega) => entrega.empleadoNombre.toLowerCase().includes(busqueda))
    }

    if (filtros.tipoDotacion && filtros.tipoDotacion !== "all") {
      result = result.filter((entrega) =>
        entrega.items.some((item) => item.inventarioDotacionId.includes(filtros.tipoDotacion)),
      )
    }

    if (filtros.estado && filtros.estado !== "all") {
      result = result.filter((entrega) => entrega.estado === filtros.estado)
    }

    if (filtros.fechaDesde) {
      result = result.filter((entrega) => new Date(entrega.fechaEntrega) >= filtros.fechaDesde!)
    }

    if (filtros.fechaHasta) {
      // Ajustar la fecha hasta para incluir todo el día
      const fechaHasta = new Date(filtros.fechaHasta)
      fechaHasta.setHours(23, 59, 59, 999)
      result = result.filter((entrega) => new Date(entrega.fechaEntrega) <= fechaHasta)
    }

    // Ordenar resultados
    result.sort((a, b) => {
      let valueA: any
      let valueB: any

      switch (sortColumn) {
        case "empleadoNombre":
          valueA = a.empleadoNombre
          valueB = b.empleadoNombre
          break
        case "fechaEntrega":
          valueA = new Date(a.fechaEntrega)
          valueB = new Date(b.fechaEntrega)
          break
        case "estado":
          valueA = a.estado
          valueB = b.estado
          break
        default:
          valueA = a[sortColumn as keyof EntregaDotacion]
          valueB = b[sortColumn as keyof EntregaDotacion]
      }

      if (valueA < valueB) return sortDirection === "asc" ? -1 : 1
      if (valueA > valueB) return sortDirection === "asc" ? 1 : -1
      return 0
    })

    setFilteredEntregas(result)
  }, [entregas, sortColumn, sortDirection, filtros])

  // Función para obtener el estado con formato
  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "pendiente":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
            Pendiente
          </Badge>
        )
      case "entregado":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800">
            Entregado
          </Badge>
        )
      case "cancelado":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800">
            Cancelado
          </Badge>
        )
      default:
        return <Badge variant="outline">{estado}</Badge>
    }
  }

  // Función para agrupar items por tipo de dotación
  const getItemsAgrupados = (items: ItemEntregaDotacion[]) => {
    const agrupados: Record<string, { tipoDotacion: string; talla: string; cantidad: number }> = {}

    items.forEach((item) => {
      const key = `${item.tipoDotacion}-${item.talla}`
      if (agrupados[key]) {
        agrupados[key].cantidad += item.cantidad
      } else {
        agrupados[key] = {
          tipoDotacion: item.tipoDotacion,
          talla: item.talla,
          cantidad: item.cantidad,
        }
      }
    })

    return Object.values(agrupados)
  }

  return (
    <div className="rounded-md border">
      <div className="overflow-x-auto">
        <table className="w-full">
          <EntregasTableHeader sortColumn={sortColumn} sortDirection={sortDirection} onSort={handleSort} />
          <tbody>
            {isLoading ? (
              <EntregasTableSkeleton />
            ) : filteredEntregas.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-4 text-center text-muted-foreground">
                  No se encontraron entregas con los filtros aplicados
                </td>
              </tr>
            ) : (
              filteredEntregas.map((entrega) => {
                const itemsAgrupados = getItemsAgrupados(entrega.items)

                return itemsAgrupados.map((item, itemIndex) => (
                  <tr key={`${entrega.id}-${itemIndex}`} className="border-b">
                    <td className="p-4">{itemIndex === 0 ? entrega.empleadoNombre : ""}</td>
                    <td className="p-4">{item.tipoDotacion}</td>
                    <td className="p-4">{item.talla}</td>
                    <td className="p-4">{item.cantidad}</td>
                    <td className="p-4">
                      {itemIndex === 0 ? format(parseISO(entrega.fechaEntrega), "dd/MM/yyyy", { locale: es }) : ""}
                    </td>
                    <td className="p-4">{itemIndex === 0 ? getEstadoBadge(entrega.estado) : ""}</td>
                    <td className="p-4 text-right">{itemIndex === 0 ? <EntregaActions entrega={entrega} /> : null}</td>
                  </tr>
                ))
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
