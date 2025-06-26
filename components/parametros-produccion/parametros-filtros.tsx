"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, X } from "lucide-react"

export function ParametrosFiltros() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMachine, setSelectedMachine] = useState("")
  const [selectedProduct, setSelectedProduct] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const handleFilterChange = (type: string, value: string) => {
    if (value && !activeFilters.includes(`${type}:${value}`)) {
      setActiveFilters([...activeFilters, `${type}:${value}`])
    }
  }

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter))
    const [type] = filter.split(":")
    if (type === "machine") setSelectedMachine("")
    if (type === "product") setSelectedProduct("")
  }

  const clearAllFilters = () => {
    setActiveFilters([])
    setSelectedMachine("")
    setSelectedProduct("")
    setSelectedStatus("all")
    setSearchTerm("")
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* Búsqueda y filtros principales */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar parámetros..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2">
              <Select
                value={selectedMachine}
                onValueChange={(value) => {
                  setSelectedMachine(value)
                  handleFilterChange("machine", value)
                }}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Seleccionar máquina" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="INY-001">Inyectora Industrial 1</SelectItem>
                  <SelectItem value="INY-002">Inyectora Industrial 2</SelectItem>
                  <SelectItem value="TERMO-01">Termoformadora 1</SelectItem>
                  <SelectItem value="SOPLO-01">Sopladora 1</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={selectedProduct}
                onValueChange={(value) => {
                  setSelectedProduct(value)
                  handleFilterChange("product", value)
                }}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Seleccionar producto" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Vaso 200ml</SelectItem>
                  <SelectItem value="2">Botella 500ml</SelectItem>
                  <SelectItem value="3">Bandeja Rectangular</SelectItem>
                  <SelectItem value="4">Tapa Rosca 28mm</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Tabs de estado */}
          <Tabs value={selectedStatus} onValueChange={setSelectedStatus}>
            <TabsList>
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="validated">Validados</TabsTrigger>
              <TabsTrigger value="pending">Pendientes</TabsTrigger>
              <TabsTrigger value="rejected">Rechazados</TabsTrigger>
              <TabsTrigger value="draft">Borradores</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Filtros activos */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm text-muted-foreground">Filtros activos:</span>
              {activeFilters.map((filter) => {
                const [type, value] = filter.split(":")
                const label = type === "machine" ? `Máquina: ${value}` : `Producto: ${value}`
                return (
                  <Badge key={filter} variant="secondary" className="gap-1">
                    {label}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 text-muted-foreground hover:text-foreground"
                      onClick={() => removeFilter(filter)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )
              })}
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                Limpiar todo
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
