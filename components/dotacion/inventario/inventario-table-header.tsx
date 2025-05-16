"use client"

import { ArrowDownIcon, ArrowUpIcon, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"

interface InventarioTableHeaderProps {
  sortColumn: string
  sortDirection: "asc" | "desc"
  onSort: (column: string) => void
}

export function InventarioTableHeader({ sortColumn, sortDirection, onSort }: InventarioTableHeaderProps) {
  const getSortIcon = (column: string) => {
    if (sortColumn !== column) return <ArrowUpDown className="ml-2 h-4 w-4" />
    return sortDirection === "asc" ? (
      <ArrowUpIcon className="ml-2 h-4 w-4" />
    ) : (
      <ArrowDownIcon className="ml-2 h-4 w-4" />
    )
  }

  return (
    <thead className="border-b">
      <tr className="hover:bg-transparent">
        <th className="h-12 px-4 text-left align-middle font-medium">
          <Button variant="ghost" className="p-0 font-medium" onClick={() => onSort("tipoDotacion")}>
            Tipo de dotación
            {getSortIcon("tipoDotacion")}
          </Button>
        </th>
        <th className="h-12 px-4 text-left align-middle font-medium">
          <Button variant="ghost" className="p-0 font-medium" onClick={() => onSort("categoria")}>
            Categoría
            {getSortIcon("categoria")}
          </Button>
        </th>
        <th className="h-12 px-4 text-left align-middle font-medium">
          <Button variant="ghost" className="p-0 font-medium" onClick={() => onSort("talla")}>
            Talla
            {getSortIcon("talla")}
          </Button>
        </th>
        <th className="h-12 px-4 text-center align-middle font-medium">
          <Button variant="ghost" className="p-0 font-medium" onClick={() => onSort("cantidadDisponible")}>
            Cantidad
            {getSortIcon("cantidadDisponible")}
          </Button>
        </th>
        <th className="h-12 px-4 text-center align-middle font-medium">
          <Button variant="ghost" className="p-0 font-medium" onClick={() => onSort("stockMinimo")}>
            Stock mínimo
            {getSortIcon("stockMinimo")}
          </Button>
        </th>
        <th className="h-12 px-4 text-center align-middle font-medium">
          <Button variant="ghost" className="p-0 font-medium" onClick={() => onSort("estado")}>
            Estado
            {getSortIcon("estado")}
          </Button>
        </th>
        <th className="h-12 px-4 text-right align-middle font-medium">Acciones</th>
      </tr>
    </thead>
  )
}
