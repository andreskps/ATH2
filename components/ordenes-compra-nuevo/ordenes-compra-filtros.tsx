"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Filter, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const estadosOrden = [
  { value: "creada", label: "Creada", color: "bg-gray-100 text-gray-800" },
  { value: "confirmada", label: "Confirmada", color: "bg-blue-100 text-blue-800" },
  { value: "recibida-parcial", label: "Recibida Parcial", color: "bg-yellow-100 text-yellow-800" },
  { value: "recibida", label: "Recibida", color: "bg-green-100 text-green-800" },
  { value: "cerrada", label: "Cerrada", color: "bg-purple-100 text-purple-800" },
]

export function OrdenesCompraFiltros() {
  const [filtros, setFiltros] = useState({
    busqueda: "",
    estado: "",
    proveedor: "",
    fechaDesde: "",
    fechaHasta: "",
    responsable: "",
  })

  const [mostrarFiltros, setMostrarFiltros] = useState(false)

  const handleFiltroChange = (key: string, value: string) => {
    setFiltros((prev) => ({ ...prev, [key]: value }))
  }

  const limpiarFiltros = () => {
    setFiltros({
      busqueda: "",
      estado: "",
      proveedor: "",
      fechaDesde: "",
      fechaHasta: "",
      responsable: "",
    })
  }

  const filtrosActivos = Object.values(filtros).filter(Boolean).length

  return (
    <div className="space-y-4">
      {/* Barra de búsqueda principal */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por número de orden, proveedor o responsable..."
            value={filtros.busqueda}
            onChange={(e) => handleFiltroChange("busqueda", e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" onClick={() => setMostrarFiltros(!mostrarFiltros)} className="shrink-0">
          <Filter className="mr-2 h-4 w-4" />
          Filtros
          {filtrosActivos > 0 && (
            <Badge variant="secondary" className="ml-2">
              {filtrosActivos}
            </Badge>
          )}
        </Button>
      </div>

      {/* Panel de filtros expandible */}
      {mostrarFiltros && (
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Filtros Avanzados</CardTitle>
              <Button variant="ghost" size="sm" onClick={limpiarFiltros} className="text-muted-foreground">
                <X className="mr-2 h-4 w-4" />
                Limpiar
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Estado */}
              <div className="space-y-2">
                <Label htmlFor="estado">Estado</Label>
                <Select value={filtros.estado} onValueChange={(value) => handleFiltroChange("estado", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos los estados" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los estados</SelectItem>
                    {estadosOrden.map((estado) => (
                      <SelectItem key={estado.value} value={estado.value}>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${estado.color.split(" ")[0]}`} />
                          {estado.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Proveedor */}
              <div className="space-y-2">
                <Label htmlFor="proveedor">Proveedor</Label>
                <Input
                  id="proveedor"
                  placeholder="Nombre del proveedor"
                  value={filtros.proveedor}
                  onChange={(e) => handleFiltroChange("proveedor", e.target.value)}
                />
              </div>

              {/* Responsable */}
              <div className="space-y-2">
                <Label htmlFor="responsable">Responsable</Label>
                <Input
                  id="responsable"
                  placeholder="Nombre del responsable"
                  value={filtros.responsable}
                  onChange={(e) => handleFiltroChange("responsable", e.target.value)}
                />
              </div>

              {/* Fecha desde */}
              <div className="space-y-2">
                <Label htmlFor="fechaDesde">Fecha desde</Label>
                <Input
                  id="fechaDesde"
                  type="date"
                  value={filtros.fechaDesde}
                  onChange={(e) => handleFiltroChange("fechaDesde", e.target.value)}
                />
              </div>

              {/* Fecha hasta */}
              <div className="space-y-2">
                <Label htmlFor="fechaHasta">Fecha hasta</Label>
                <Input
                  id="fechaHasta"
                  type="date"
                  value={filtros.fechaHasta}
                  onChange={(e) => handleFiltroChange("fechaHasta", e.target.value)}
                />
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setMostrarFiltros(false)}>
                Cerrar
              </Button>
              <Button
                onClick={() => {
                  // Aquí aplicarías los filtros
                  console.log("Aplicando filtros:", filtros)
                }}
              >
                Aplicar Filtros
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filtros activos */}
      {filtrosActivos > 0 && (
        <div className="flex flex-wrap gap-2">
          {filtros.estado && (
            <Badge variant="secondary" className="gap-1">
              Estado: {estadosOrden.find((e) => e.value === filtros.estado)?.label}
              <X className="h-3 w-3 cursor-pointer" onClick={() => handleFiltroChange("estado", "")} />
            </Badge>
          )}
          {filtros.proveedor && (
            <Badge variant="secondary" className="gap-1">
              Proveedor: {filtros.proveedor}
              <X className="h-3 w-3 cursor-pointer" onClick={() => handleFiltroChange("proveedor", "")} />
            </Badge>
          )}
          {filtros.responsable && (
            <Badge variant="secondary" className="gap-1">
              Responsable: {filtros.responsable}
              <X className="h-3 w-3 cursor-pointer" onClick={() => handleFiltroChange("responsable", "")} />
            </Badge>
          )}
          {filtros.fechaDesde && (
            <Badge variant="secondary" className="gap-1">
              Desde: {filtros.fechaDesde}
              <X className="h-3 w-3 cursor-pointer" onClick={() => handleFiltroChange("fechaDesde", "")} />
            </Badge>
          )}
          {filtros.fechaHasta && (
            <Badge variant="secondary" className="gap-1">
              Hasta: {filtros.fechaHasta}
              <X className="h-3 w-3 cursor-pointer" onClick={() => handleFiltroChange("fechaHasta", "")} />
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}
