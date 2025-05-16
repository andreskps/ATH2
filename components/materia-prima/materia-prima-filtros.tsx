"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { FilterIcon } from "lucide-react"

export function MateriaPrimaFiltros() {
  const [open, setOpen] = useState(false)
  const [tipo, setTipo] = useState("")
  const [proveedor, setProveedor] = useState("")
  const [color, setColor] = useState("")
  const [stockMinimo, setStockMinimo] = useState([0])

  // Contar filtros activos
  const activeFilters = [tipo !== "", proveedor !== "", color !== "", stockMinimo[0] > 0].filter(Boolean).length

  const handleFilterChange = (filter: string, value: string | number[]) => {
    switch (filter) {
      case "tipo":
        setTipo(value as string)
        break
      case "proveedor":
        setProveedor(value as string)
        break
      case "color":
        setColor(value as string)
        break
      case "stockMinimo":
        setStockMinimo(value as number[])
        break
    }
  }

  const resetFilters = () => {
    setTipo("")
    setProveedor("")
    setColor("")
    setStockMinimo([0])
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="h-9">
          <FilterIcon className="mr-2 h-4 w-4" />
          Filtros
          {activeFilters > 0 && (
            <Badge variant="secondary" className="ml-2">
              {activeFilters}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Filtros</SheetTitle>
        </SheetHeader>
        <div className="mt-4 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Tipo de Materia Prima</label>
            <Select value={tipo} onValueChange={(value) => handleFilterChange("tipo", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Todos los tipos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="resina">Resina</SelectItem>
                <SelectItem value="pigmento">Pigmento</SelectItem>
                <SelectItem value="aditivo">Aditivo</SelectItem>
                <SelectItem value="reciclado">Reciclado</SelectItem>
                <SelectItem value="masterbatch">Masterbatch</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Proveedor</label>
            <Select value={proveedor} onValueChange={(value) => handleFilterChange("proveedor", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Todos los proveedores" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="quimiplast">Quimiplast</SelectItem>
                <SelectItem value="polimeros-sa">Polímeros S.A.</SelectItem>
                <SelectItem value="colorantes-industriales">Colorantes Industriales</SelectItem>
                <SelectItem value="aditivos-especiales">Aditivos Especiales</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Color</label>
            <Select value={color} onValueChange={(value) => handleFilterChange("color", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Todos los colores" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="natural">Natural</SelectItem>
                <SelectItem value="blanco">Blanco</SelectItem>
                <SelectItem value="negro">Negro</SelectItem>
                <SelectItem value="azul">Azul</SelectItem>
                <SelectItem value="rojo">Rojo</SelectItem>
                <SelectItem value="verde">Verde</SelectItem>
                <SelectItem value="amarillo">Amarillo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Stock Mínimo (kg)</label>
              <span className="text-sm text-muted-foreground">{stockMinimo[0]} kg</span>
            </div>
            <Slider
              defaultValue={[0]}
              max={1000}
              step={50}
              value={stockMinimo}
              onValueChange={(value) => handleFilterChange("stockMinimo", value)}
            />
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={resetFilters}>
              Limpiar filtros
            </Button>
            <Button onClick={() => setOpen(false)}>Aplicar filtros</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
