"use client"

import { ArrowDownIcon, ArrowUpIcon, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TiposTableHeaderProps {
  sortColumn: string
  sortDirection: "asc" | "desc"
  onSort: (column: string) => void
}

export function TiposTableHeader({ sortColumn, sortDirection, onSort }: TiposTableHeaderProps) {
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
          <Button variant="ghost" className="p-0 font-medium" onClick={() => onSort("nombre")}>
            Nombre
            {getSortIcon("nombre")}
          </Button>
        </th>
        <th className="h-12 px-4 text-left align-middle font-medium">
          <Button variant="ghost" className="p-0 font-medium" onClick={() => onSort("categoria")}>
            Categoría
            {getSortIcon("categoria")}
          </Button>
        </th>
        <th className="h-12 px-4 text-left align-middle font-medium">
          <Button variant="ghost" className="p-0 font-medium" onClick={() => onSort("descripcion")}>
            Descripción
            {getSortIcon("descripcion")}
          </Button>
        </th>
        <th className="h-12 px-4 text-right align-middle font-medium">Acciones</th>
      </tr>
    </thead>
  )
}
