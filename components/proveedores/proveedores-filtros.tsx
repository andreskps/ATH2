"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Filter } from "lucide-react"

export default function ProveedoresFiltros() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const [open, setOpen] = useState(false)
  const [activeFilters, setActiveFilters] = useState(0)

  // Estados para los filtros
  const [tipo, setTipo] = useState(searchParams.get("tipo") || "")
  const [estado, setEstado] = useState(searchParams.get("estado") || "")
  const [ciudad, setCiudad] = useState(searchParams.get("ciudad") || "")
  const [pais, setPais] = useState(searchParams.get("pais") || "")

  // Opciones para los filtros
  const tiposProveedor = ["Materia Prima", "Maquinaria", "Repuestos", "Servicios"]
  const estadosProveedor = ["Activo", "Inactivo"]
  const ciudades = ["Bogotá", "Medellín", "Cali", "Barranquilla", "Bucaramanga"]
  const paises = ["Colombia", "México", "Estados Unidos", "Brasil", "Argentina"]

  // Contar filtros activos
  useEffect(() => {
    let count = 0
    if (tipo) count++
    if (estado) count++
    if (ciudad) count++
    if (pais) count++
    setActiveFilters(count)
  }, [tipo, estado, ciudad, pais])

  // Aplicar filtros
  const applyFilters = () => {
    const params = new URLSearchParams(searchParams)

    if (tipo) {
      params.set("tipo", tipo)
    } else {
      params.delete("tipo")
    }

    if (estado) {
      params.set("estado", estado)
    } else {
      params.delete("estado")
    }

    if (ciudad) {
      params.set("ciudad", ciudad)
    } else {
      params.delete("ciudad")
    }

    if (pais) {
      params.set("pais", pais)
    } else {
      params.delete("pais")
    }

    replace(`${pathname}?${params.toString()}`)
    setOpen(false)
  }

  // Limpiar filtros
  const clearFilters = () => {
    setTipo("")
    setEstado("")
    setCiudad("")
    setPais("")

    const params = new URLSearchParams(searchParams)
    params.delete("tipo")
    params.delete("estado")
    params.delete("ciudad")
    params.delete("pais")

    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="h-9 gap-1">
          <Filter className="h-4 w-4" />
          Filtros
          {activeFilters > 0 && (
            <Badge variant="secondary" className="ml-1 rounded-full px-1 text-xs">
              {activeFilters}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filtros</SheetTitle>
        </SheetHeader>
        <div className="py-4 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Tipo de Proveedor</label>
            <Select value={tipo} onValueChange={(value) => setTipo(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Todos los tipos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los tipos</SelectItem>
                {tiposProveedor.map((tipo) => (
                  <SelectItem key={tipo} value={tipo}>
                    {tipo}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Estado</label>
            <Select value={estado} onValueChange={(value) => setEstado(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Todos los estados" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                {estadosProveedor.map((estado) => (
                  <SelectItem key={estado} value={estado}>
                    {estado}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Ciudad</label>
            <Select value={ciudad} onValueChange={(value) => setCiudad(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Todas las ciudades" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las ciudades</SelectItem>
                {ciudades.map((ciudad) => (
                  <SelectItem key={ciudad} value={ciudad}>
                    {ciudad}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">País</label>
            <Select value={pais} onValueChange={(value) => setPais(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Todos los países" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los países</SelectItem>
                {paises.map((pais) => (
                  <SelectItem key={pais} value={pais}>
                    {pais}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={clearFilters}>
              Limpiar
            </Button>
            <Button onClick={applyFilters}>Aplicar Filtros</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
