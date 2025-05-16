"use client"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface MaquinariaFiltrosProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  filtros: {
    estado: string
    tipo: string
    marca: string
  }
  setFiltros: (filtros: {
    estado: string
    tipo: string
    marca: string
  }) => void
}

export default function MaquinariaFiltros({ open, onOpenChange, filtros, setFiltros }: MaquinariaFiltrosProps) {
  // Opciones para los filtros
  const estadosOptions = [
    { value: "Activa", label: "Activa" },
    { value: "En Mantenimiento", label: "En Mantenimiento" },
    { value: "Inactiva", label: "Inactiva" },
    { value: "Fuera de Servicio", label: "Fuera de Servicio" },
  ]

  const tiposOptions = [
    { value: "Inyección", label: "Inyección" },
    { value: "Extrusión", label: "Extrusión" },
    { value: "Soplado", label: "Soplado" },
    { value: "Termoformado", label: "Termoformado" },
    { value: "Otro", label: "Otro" },
  ]

  const marcasOptions = [
    { value: "Haitian", label: "Haitian" },
    { value: "Engel", label: "Engel" },
    { value: "Jwell", label: "Jwell" },
    { value: "Bekum", label: "Bekum" },
    { value: "Otra", label: "Otra" },
  ]

  // Función para limpiar filtros
  const limpiarFiltros = () => {
    setFiltros({
      estado: "",
      tipo: "",
      marca: "",
    })
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filtros</SheetTitle>
          <SheetDescription>Filtra la lista de maquinaria según los siguientes criterios</SheetDescription>
        </SheetHeader>
        <div className="grid gap-6 py-6">
          <div className="grid gap-2">
            <Label htmlFor="estado">Estado</Label>
            <Select value={filtros.estado} onValueChange={(value) => setFiltros({ ...filtros, estado: value })}>
              <SelectTrigger id="estado">
                <SelectValue placeholder="Seleccionar estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {estadosOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="tipo">Tipo de Máquina</Label>
            <Select value={filtros.tipo} onValueChange={(value) => setFiltros({ ...filtros, tipo: value })}>
              <SelectTrigger id="tipo">
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {tiposOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="marca">Marca</Label>
            <Select value={filtros.marca} onValueChange={(value) => setFiltros({ ...filtros, marca: value })}>
              <SelectTrigger id="marca">
                <SelectValue placeholder="Seleccionar marca" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                {marcasOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <SheetFooter>
          <Button variant="outline" onClick={limpiarFiltros}>
            Limpiar filtros
          </Button>
          <SheetClose asChild>
            <Button>Aplicar filtros</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
