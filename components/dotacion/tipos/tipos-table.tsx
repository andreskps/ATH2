"use client"

import { useState, useEffect } from "react"
import type { TipoDotacion } from "@/lib/types"
import { TiposTableHeader } from "./tipos-table-header"
import { TiposTableSkeleton } from "./tipos-table-skeleton"
import { TipoActions } from "./tipo-actions"

interface TiposTableProps {
  tipos: TipoDotacion[]
  isLoading?: boolean
}

export function TiposTable({ tipos, isLoading = false }: TiposTableProps) {
  const [sortColumn, setSortColumn] = useState<string>("nombre")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [sortedTipos, setSortedTipos] = useState<TipoDotacion[]>([])

  useEffect(() => {
    if (!isLoading && tipos) {
      const sorted = [...tipos].sort((a, b) => {
        const aValue = a[sortColumn as keyof TipoDotacion]
        const bValue = b[sortColumn as keyof TipoDotacion]

        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
        }

        return 0
      })

      setSortedTipos(sorted)
    }
  }, [tipos, sortColumn, sortDirection, isLoading])

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  return (
    <div className="rounded-md border">
      <div className="relative w-full overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <TiposTableHeader sortColumn={sortColumn} sortDirection={sortDirection} onSort={handleSort} />
          <tbody>
            {isLoading ? (
              <TiposTableSkeleton />
            ) : (
              sortedTipos.map((tipo) => (
                <tr key={tipo.id} className="border-b transition-colors hover:bg-muted/50">
                  <td className="p-4 font-medium">{tipo.nombre}</td>
                  <td className="p-4">{tipo.categoria}</td>
                  <td className="p-4">{tipo.descripcion}</td>
                  <td className="p-4 text-right">
                    <TipoActions tipo={tipo} />
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
