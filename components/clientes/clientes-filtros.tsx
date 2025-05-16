"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface ClientesFiltrosProps {
  className?: string
}

export function ClientesFiltros({ className }: ClientesFiltrosProps) {
  const [estado, setEstado] = useState<string>("")
  const [ciudad, setCiudad] = useState<string>("")
  const [modoPago, setModoPago] = useState<string>("")

  const handleReset = () => {
    setEstado("")
    setCiudad("")
    setModoPago("")
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
            <SelectItem value="inactivo">Inactivo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="ciudad">Ciudad</Label>
        <Select value={ciudad} onValueChange={setCiudad}>
          <SelectTrigger id="ciudad">
            <SelectValue placeholder="Todas las ciudades" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todas">Todas las ciudades</SelectItem>
            <SelectItem value="bogota">Bogotá</SelectItem>
            <SelectItem value="medellin">Medellín</SelectItem>
            <SelectItem value="cali">Cali</SelectItem>
            <SelectItem value="barranquilla">Barranquilla</SelectItem>
            <SelectItem value="bucaramanga">Bucaramanga</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="modoPago">Modo de Pago</Label>
        <Select value={modoPago} onValueChange={setModoPago}>
          <SelectTrigger id="modoPago">
            <SelectValue placeholder="Todos los modos de pago" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos los modos de pago</SelectItem>
            <SelectItem value="contado">Contado</SelectItem>
            <SelectItem value="credito">Crédito</SelectItem>
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
