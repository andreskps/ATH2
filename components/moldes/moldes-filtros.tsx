"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { getMaquinas } from "@/lib/data/maquinaria"
import type { Maquina } from "@/lib/types"

interface MoldesFiltrosProps {
  className?: string
}

export function MoldesFiltros({ className }: MoldesFiltrosProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [estado, setEstado] = useState(searchParams.get("estado") || "")
  const [tipoInyeccion, setTipoInyeccion] = useState(searchParams.get("tipoInyeccion") || "")
  const [cavidades, setCavidades] = useState(searchParams.get("cavidades") || "")
  const [maquinaCompatible, setMaquinaCompatible] = useState(searchParams.get("maquinaCompatible") || "")
  const [maquinas, setMaquinas] = useState<Maquina[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchMaquinas = async () => {
      try {
        const data = await getMaquinas()
        setMaquinas(data)
      } catch (error) {
        console.error("Error al cargar las máquinas:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMaquinas()
  }, [])

  const handleReset = () => {
    setEstado("")
    setTipoInyeccion("")
    setCavidades("")
    setMaquinaCompatible("")
    router.push(pathname)
  }

  const handleApplyFilters = () => {
    const params = new URLSearchParams()

    // Mantener el parámetro de búsqueda si existe
    const busqueda = searchParams.get("busqueda")
    if (busqueda) params.set("busqueda", busqueda)

    // Añadir los filtros seleccionados
    if (estado) params.set("estado", estado)
    if (tipoInyeccion) params.set("tipoInyeccion", tipoInyeccion)
    if (cavidades) params.set("cavidades", cavidades)
    if (maquinaCompatible) params.set("maquinaCompatible", maquinaCompatible)

    router.push(`${pathname}?${params.toString()}`)
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
            <SelectItem value="Activo">Activo</SelectItem>
            <SelectItem value="En Mantenimiento">En Mantenimiento</SelectItem>
            <SelectItem value="Fuera de Servicio">Fuera de Servicio</SelectItem>
            <SelectItem value="En Reparación">En Reparación</SelectItem>
            <SelectItem value="Obsoleto">Obsoleto</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="tipoInyeccion">Tipo de Inyección</Label>
        <Select value={tipoInyeccion} onValueChange={setTipoInyeccion}>
          <SelectTrigger id="tipoInyeccion">
            <SelectValue placeholder="Todos los tipos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos los tipos</SelectItem>
            <SelectItem value="Hidráulica">Hidráulica</SelectItem>
            <SelectItem value="Eléctrica">Eléctrica</SelectItem>
            <SelectItem value="Híbrida">Híbrida</SelectItem>
            <SelectItem value="Otra">Otra</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="cavidades">Número de Cavidades</Label>
        <Select value={cavidades} onValueChange={setCavidades}>
          <SelectTrigger id="cavidades">
            <SelectValue placeholder="Todas las cavidades" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todas">Todas las cavidades</SelectItem>
            <SelectItem value="1">1 cavidad</SelectItem>
            <SelectItem value="2">2 cavidades</SelectItem>
            <SelectItem value="4">4 cavidades</SelectItem>
            <SelectItem value="8">8 cavidades</SelectItem>
            <SelectItem value="16">16 cavidades</SelectItem>
            <SelectItem value="32">32 cavidades</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="maquinaCompatible">Máquina Compatible</Label>
        <Select value={maquinaCompatible} onValueChange={setMaquinaCompatible} disabled={isLoading}>
          <SelectTrigger id="maquinaCompatible">
            <SelectValue placeholder={isLoading ? "Cargando máquinas..." : "Todas las máquinas"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todas">Todas las máquinas</SelectItem>
            {maquinas.map((maquina) => (
              <SelectItem key={maquina.id} value={maquina.id.toString()}>
                {maquina.nombre} ({maquina.modelo})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between pt-4">
        <Button variant="outline" onClick={handleReset}>
          Restablecer
        </Button>
        <Button onClick={handleApplyFilters}>Aplicar Filtros</Button>
      </div>
    </div>
  )
}
