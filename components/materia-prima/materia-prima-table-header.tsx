"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MateriaPrimaFiltros } from "./materia-prima-filtros"

export function MateriaPrimaTableHeader() {
  const [search, setSearch] = useState("")

  return (
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <h3 className="text-lg font-semibold">Listado de Materias Primas</h3>
      <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar materia prima..."
            className="w-full pl-8 sm:w-[300px]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <Button variant="ghost" size="sm" className="absolute right-0 top-0 h-9 w-9" onClick={() => setSearch("")}>
              <X className="h-4 w-4" />
              <span className="sr-only">Limpiar búsqueda</span>
            </Button>
          )}
        </div>
        <MateriaPrimaFiltros />
      </div>
    </div>
  )
}
