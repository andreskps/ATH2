"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EntregasFiltros } from "@/components/dotacion/entregas/entregas-filtros"
import { EntregasTable } from "@/components/dotacion/entregas/entregas-table"
import { getEntregasDotacion } from "@/lib/data/dotacion"
import type { EntregaDotacion } from "@/lib/types"

export default function EntregasDotacionPage() {
  const [entregas, setEntregas] = useState<EntregaDotacion[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filtros, setFiltros] = useState({
    busqueda: "",
    tipoDotacion: "all",
    estado: "all",
    fechaDesde: undefined as Date | undefined,
    fechaHasta: undefined as Date | undefined,
  })

  useEffect(() => {
    const fetchEntregas = async () => {
      try {
        const data = await getEntregasDotacion()
        setEntregas(data)
      } catch (error) {
        console.error("Error al cargar las entregas:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchEntregas()
  }, [])

  const handleFilterChange = (newFiltros: typeof filtros) => {
    // Comparar si realmente hay cambios antes de actualizar el estado
    if (
      newFiltros.busqueda !== filtros.busqueda ||
      newFiltros.tipoDotacion !== filtros.tipoDotacion ||
      newFiltros.estado !== filtros.estado ||
      newFiltros.fechaDesde !== filtros.fechaDesde ||
      newFiltros.fechaHasta !== filtros.fechaHasta
    ) {
      setFiltros(newFiltros)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Entregas de Dotación</h1>
          <p className="text-muted-foreground">Gestiona las entregas de dotación a los empleados</p>
        </div>
        <Button asChild>
          <Link href="/dotacion/entregas/nueva">
            <Plus className="mr-2 h-4 w-4" />
            Registrar Entrega
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="todas" className="w-full">
        <TabsList>
          <TabsTrigger value="todas">Todas</TabsTrigger>
          <TabsTrigger value="pendientes">Pendientes</TabsTrigger>
          <TabsTrigger value="entregadas">Entregadas</TabsTrigger>
        </TabsList>
        <TabsContent value="todas" className="space-y-4">
          <EntregasFiltros onFilterChange={handleFilterChange} />
          <EntregasTable entregas={entregas} isLoading={isLoading} filtros={filtros} />
        </TabsContent>
        <TabsContent value="pendientes" className="space-y-4">
          <EntregasFiltros onFilterChange={handleFilterChange} />
          <EntregasTable
            entregas={entregas.filter((e) => e.estado === "pendiente")}
            isLoading={isLoading}
            filtros={filtros}
          />
        </TabsContent>
        <TabsContent value="entregadas" className="space-y-4">
          <EntregasFiltros onFilterChange={handleFilterChange} />
          <EntregasTable
            entregas={entregas.filter((e) => e.estado === "entregado")}
            isLoading={isLoading}
            filtros={filtros}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
