"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { InventarioTable } from "@/components/dotacion/inventario/inventario-table"
import { InventarioFiltros } from "@/components/dotacion/inventario/inventario-filtros"
import { InventarioForm } from "@/components/dotacion/inventario/inventario-form"
import { getInventarioDotacion } from "@/lib/data/dotacion"

export default function InventarioDotacionPage() {
  const [inventario, setInventario] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [filtros, setFiltros] = useState({
    busqueda: "",
    categoria: "",
    talla: "",
    estado: "",
  })

  // Cargar datos al montar el componente
  useState(() => {
    const fetchData = async () => {
      try {
        const data = await getInventarioDotacion()
        setInventario(data)
      } catch (error) {
        console.error("Error al cargar inventario:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleFilterChange = (newFiltros) => {
    setFiltros(newFiltros)
  }

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Inventario de Dotación</h1>
          <p className="text-muted-foreground">Gestiona el inventario de dotación disponible para los empleados</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Agregar Entrada
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <InventarioForm onClose={() => {}} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col gap-4">
        <InventarioFiltros onFilterChange={handleFilterChange} />
        <InventarioTable inventario={inventario} isLoading={isLoading} filtros={filtros} />
      </div>
    </div>
  )
}
