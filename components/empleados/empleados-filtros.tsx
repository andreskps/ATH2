"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface EmpleadosFiltrosProps {
  className?: string
}

export function EmpleadosFiltros({ className }: EmpleadosFiltrosProps) {
  const [estado, setEstado] = useState<string>("")
  const [cargo, setCargo] = useState<string>("")
  const [turno, setTurno] = useState<string>("")
  const [contrato, setContrato] = useState<string>("")

  const handleReset = () => {
    setEstado("")
    setCargo("")
    setTurno("")
    setContrato("")
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
        <Label htmlFor="cargo">Cargo</Label>
        <Select value={cargo} onValueChange={setCargo}>
          <SelectTrigger id="cargo">
            <SelectValue placeholder="Todos los cargos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos los cargos</SelectItem>
            <SelectItem value="operador">Operador de Máquina</SelectItem>
            <SelectItem value="supervisor">Supervisor</SelectItem>
            <SelectItem value="tecnico">Técnico</SelectItem>
            <SelectItem value="gerente">Gerente</SelectItem>
            <SelectItem value="administrativo">Administrativo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="turno">Turno</Label>
        <Select value={turno} onValueChange={setTurno}>
          <SelectTrigger id="turno">
            <SelectValue placeholder="Todos los turnos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos los turnos</SelectItem>
            <SelectItem value="mañana">Mañana</SelectItem>
            <SelectItem value="tarde">Tarde</SelectItem>
            <SelectItem value="noche">Noche</SelectItem>
            <SelectItem value="rotativo">Rotativo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contrato">Tipo de Contrato</Label>
        <Select value={contrato} onValueChange={setContrato}>
          <SelectTrigger id="contrato">
            <SelectValue placeholder="Todos los contratos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos los contratos</SelectItem>
            <SelectItem value="indefinido">Indefinido</SelectItem>
            <SelectItem value="temporal">Temporal</SelectItem>
            <SelectItem value="practicas">Prácticas</SelectItem>
            <SelectItem value="servicios">Servicios</SelectItem>
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
