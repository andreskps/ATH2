"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface ProductosFiltrosProps {
  className?: string
}

export function ProductosFiltros({ className }: ProductosFiltrosProps) {
  const [estado, setEstado] = useState<string>("")
  const [tipo, setTipo] = useState<string>("")
  const [tipoEmpaque, setTipoEmpaque] = useState<string>("")

  const handleReset = () => {
    setEstado("")
    setTipo("")
    setTipoEmpaque("")
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="space-y-2">
        <Label htmlFor="estado">Estado</Label>
        <Select value={estado} onValueChange={setEstado}>
          <SelectTrigger id="estado">
            <SelectValue placeholder="Todos los estados" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos los estados</SelectItem>
            <SelectItem value="activo">Activo</SelectItem>
            <SelectItem value="descontinuado">Descontinuado</SelectItem>
            <SelectItem value="desarrollo">En Desarrollo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="tipo">Tipo de Producto</Label>
        <Select value={tipo} onValueChange={setTipo}>
          <SelectTrigger id="tipo">
            <SelectValue placeholder="Todos los tipos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos los tipos</SelectItem>
            <SelectItem value="botella">Botella</SelectItem>
            <SelectItem value="tapa">Tapa</SelectItem>
            <SelectItem value="envase">Envase</SelectItem>
            <SelectItem value="contenedor">Contenedor</SelectItem>
            <SelectItem value="tubo">Tubo</SelectItem>
            <SelectItem value="otro">Otro</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="tipoEmpaque">Tipo de Empaque</Label>
        <Select value={tipoEmpaque} onValueChange={setTipoEmpaque}>
          <SelectTrigger id="tipoEmpaque">
            <SelectValue placeholder="Todos los empaques" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos los empaques</SelectItem>
            <SelectItem value="caja">Caja</SelectItem>
            <SelectItem value="bolsa">Bolsa</SelectItem>
            <SelectItem value="granel">Granel</SelectItem>
            <SelectItem value="otro">Otro</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between pt-4">
        <Button variant="outline" onClick={handleReset}>
          Restablecer
        </Button>
        <Button>Aplicar Filtros</Button>
      </div>
    </div>
  )
}
