"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { categoriasDotacion } from "@/lib/data/dotacion"

interface InventarioFiltrosProps {
  onFilterChange: (filters: {
    busqueda: string
    categoria: string
    talla: string
    estado: string
  }) => void
}

export function InventarioFiltros({ onFilterChange }: InventarioFiltrosProps) {
  const [busqueda, setBusqueda] = useState("")
  const [categoria, setCategoria] = useState("")
  const [talla, setTalla] = useState("")
  const [estado, setEstado] = useState("")

  const handleBusquedaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setBusqueda(value)
    onFilterChange({ busqueda: value, categoria, talla, estado })
  }

  const handleCategoriaChange = (value: string) => {
    setCategoria(value)
    onFilterChange({ busqueda, categoria: value, talla, estado })
  }

  const handleTallaChange = (value: string) => {
    setTalla(value)
    onFilterChange({ busqueda, categoria, talla: value, estado })
  }

  const handleEstadoChange = (value: string) => {
    setEstado(value)
    onFilterChange({ busqueda, categoria, talla, estado: value })
  }

  const handleReset = () => {
    setBusqueda("")
    setCategoria("")
    setTalla("")
    setEstado("")
    onFilterChange({ busqueda: "", categoria: "", talla: "", estado: "" })
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar por tipo de dotación..."
          className="pl-8"
          value={busqueda}
          onChange={handleBusquedaChange}
        />
      </div>
      <Select value={categoria} onValueChange={handleCategoriaChange}>
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Categoría" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas las categorías</SelectItem>
          {categoriasDotacion.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={talla} onValueChange={handleTallaChange}>
        <SelectTrigger className="w-full md:w-[120px]">
          <SelectValue placeholder="Talla" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas las tallas</SelectItem>
          <SelectItem value="S">S</SelectItem>
          <SelectItem value="M">M</SelectItem>
          <SelectItem value="L">L</SelectItem>
          <SelectItem value="XL">XL</SelectItem>
          <SelectItem value="30">30</SelectItem>
          <SelectItem value="32">32</SelectItem>
          <SelectItem value="34">34</SelectItem>
          <SelectItem value="36">36</SelectItem>
          <SelectItem value="38">38</SelectItem>
          <SelectItem value="40">40</SelectItem>
          <SelectItem value="42">42</SelectItem>
          <SelectItem value="Único">Único</SelectItem>
        </SelectContent>
      </Select>
      <Select value={estado} onValueChange={handleEstadoChange}>
        <SelectTrigger className="w-full md:w-[150px]">
          <SelectValue placeholder="Estado" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos los estados</SelectItem>
          <SelectItem value="ok">OK</SelectItem>
          <SelectItem value="bajo_stock">Bajo stock</SelectItem>
          <SelectItem value="agotado">Agotado</SelectItem>
        </SelectContent>
      </Select>
      <Button variant="outline" onClick={handleReset}>
        Limpiar
      </Button>
    </div>
  )
}
