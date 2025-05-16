"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, SlidersHorizontal, Download } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import MaquinariaTableHeader from "./maquinaria-table-header"
import MaquinariaTableSkeleton from "./maquinaria-table-skeleton"
import MaquinariaFiltros from "./maquinaria-filtros"
import { useMaquinaria } from "@/hooks/use-maquinaria"

export default function MaquinariaTable() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [filtros, setFiltros] = useState({
    estado: "",
    tipo: "",
    marca: "",
  })

  const { maquinas, isLoading } = useMaquinaria()

  // Filtrar máquinas según búsqueda y filtros
  const maquinasFiltradas = maquinas.filter((maquina) => {
    const matchSearch =
      maquina.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      maquina.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      maquina.modelo.toLowerCase().includes(searchTerm.toLowerCase())

    const matchEstado = filtros.estado ? maquina.estado === filtros.estado : true
    const matchTipo = filtros.tipo ? maquina.tipo === filtros.tipo : true
    const matchMarca = filtros.marca ? maquina.marca === filtros.marca : true

    return matchSearch && matchEstado && matchTipo && matchMarca
  })

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle>Catálogo de Maquinaria</CardTitle>
            <CardDescription>Gestiona la maquinaria de producción</CardDescription>
          </div>
          <Button onClick={() => router.push("/maquinaria/nuevo")} className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Nueva Máquina
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar por nombre, código o modelo..."
              className="w-full pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={() => setShowFilters(true)}>
              <SlidersHorizontal className="h-4 w-4" />
              <span className="sr-only">Filtrar</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                  <span className="sr-only">Exportar</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Exportar a Excel</DropdownMenuItem>
                <DropdownMenuItem>Exportar a PDF</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {isLoading ? (
          <MaquinariaTableSkeleton />
        ) : (
          <>
            {maquinasFiltradas.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10">
                <p className="text-muted-foreground text-center">
                  No se encontraron máquinas con los criterios de búsqueda.
                </p>
              </div>
            ) : (
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <MaquinariaTableHeader />
                    <tbody className="divide-y">
                      {maquinasFiltradas.map((maquina) => (
                        <tr
                          key={maquina.id}
                          className="hover:bg-muted/50 cursor-pointer"
                          onClick={() => router.push(`/maquinaria/${maquina.id}`)}
                        >
                          <td className="p-2 pl-4">
                            <div className="w-12 h-12 relative rounded-md overflow-hidden border">
                              {maquina.imagen ? (
                                <img
                                  src={maquina.imagen || "/placeholder.svg"}
                                  alt={maquina.nombre}
                                  className="object-cover w-full h-full"
                                />
                              ) : (
                                <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
                                  N/A
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="p-4 font-medium">{maquina.codigo}</td>
                          <td className="p-4">{maquina.nombre}</td>
                          <td className="p-4">{maquina.tipo}</td>
                          <td className="p-4">{maquina.marca}</td>
                          <td className="p-4">{maquina.capacidad}</td>
                          <td className="p-4">
                            <div
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                maquina.estado === "Activa"
                                  ? "bg-green-100 text-green-800"
                                  : maquina.estado === "En Mantenimiento"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : maquina.estado === "Inactiva"
                                      ? "bg-gray-100 text-gray-800"
                                      : "bg-red-100 text-red-800"
                              }`}
                            >
                              {maquina.estado}
                            </div>
                          </td>
                          <td className="p-4 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <span className="sr-only">Abrir menú</span>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-4 w-4"
                                  >
                                    <circle cx="12" cy="12" r="1" />
                                    <circle cx="19" cy="12" r="1" />
                                    <circle cx="5" cy="12" r="1" />
                                  </svg>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    router.push(`/maquinaria/${maquina.id}`)
                                  }}
                                >
                                  Ver detalles
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    router.push(`/maquinaria/editar/${maquina.id}`)
                                  }}
                                >
                                  Editar
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    // Aquí iría la lógica para cambiar el estado
                                    alert(`Cambiar estado de ${maquina.nombre}`)
                                  }}
                                >
                                  Cambiar estado
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-red-600"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    // Aquí iría la lógica para eliminar
                                    alert(`Eliminar ${maquina.nombre}`)
                                  }}
                                >
                                  Eliminar
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}

        <MaquinariaFiltros open={showFilters} onOpenChange={setShowFilters} filtros={filtros} setFiltros={setFiltros} />
      </CardContent>
    </Card>
  )
}
