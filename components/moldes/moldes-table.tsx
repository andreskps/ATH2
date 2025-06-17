"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import {
  Eye,
  Pencil,
  MoreHorizontal,
  PenToolIcon as Tool,
  RotateCcw,
  Trash2,
  Plus,
  SlidersHorizontal,
  Download,
  FileSpreadsheet,
  FileIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { getMoldes } from "@/lib/data/moldes"
import type { Molde } from "@/lib/types"
import MoldesFiltros from "./moldes-filtros"

export default function MoldesTable() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [moldes, setMoldes] = useState<Molde[]>([])
  const [filteredMoldes, setFilteredMoldes] = useState<Molde[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [moldeToToggle, setMoldeToToggle] = useState<Molde | null>(null)
  const [moldeToDelete, setMoldeToDelete] = useState<Molde | null>(null)
  const [deleteError, setDeleteError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Obtener parámetros de búsqueda
  const busqueda = searchParams.get("busqueda") || ""
  const estado = searchParams.get("estado") || ""
  const tipoInyeccion = searchParams.get("tipoInyeccion") || ""
  const cavidades = searchParams.get("cavidades") || ""
  const maquinaCompatible = searchParams.get("maquinaCompatible") || ""

  useEffect(() => {
    const fetchMoldes = async () => {
      try {
        const data = await getMoldes()
        setMoldes(data)
        setFilteredMoldes(data)
        applyFilters(data, searchQuery, estado, tipoInyeccion, cavidades, maquinaCompatible)
      } catch (error) {
        console.error("Error al cargar los moldes:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMoldes()
  }, [estado, tipoInyeccion, cavidades, maquinaCompatible])

  const applyFilters = (
    data: Molde[],
    search: string,
    estado: string,
    tipoInyeccion: string,
    cavidades: string,
    maquinaCompatible: string,
  ) => {
    let filtered = [...data]

    // Filtrar por búsqueda
    if (search) {
      const searchLower = search.toLowerCase()
      filtered = filtered.filter(
        (molde) =>
          molde.nombre.toLowerCase().includes(searchLower) || molde.referencia.toLowerCase().includes(searchLower),
      )
    }

    // Filtrar por estado
    if (estado && estado !== "todos") {
      filtered = filtered.filter((molde) => molde.estado === estado)
    }

    // Filtrar por tipo de inyección
    if (tipoInyeccion && tipoInyeccion !== "todos") {
      filtered = filtered.filter((molde) => molde.tipoInyeccion === tipoInyeccion)
    }

    // Filtrar por cavidades
    if (cavidades && cavidades !== "todos") {
      filtered = filtered.filter((molde) => molde.numeroCavidades === Number.parseInt(cavidades))
    }

    // Filtrar por máquina compatible
    if (maquinaCompatible && maquinaCompatible !== "todas") {
      filtered = filtered.filter(
        (molde) => molde.maquinasCompatibles && molde.maquinasCompatibles.includes(maquinaCompatible),
      )
    }

    setFilteredMoldes(filtered)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    applyFilters(moldes, query, estado, tipoInyeccion, cavidades, maquinaCompatible)
  }

  const handleToggleEstado = (molde: Molde) => {
    setMoldeToToggle(null)

    // Determinar el nuevo estado
    let nuevoEstado: string

    if (molde.estado === "Activo") {
      nuevoEstado = "En Mantenimiento"
    } else if (
      molde.estado === "En Mantenimiento" ||
      molde.estado === "En Reparación" ||
      molde.estado === "Fuera de Servicio"
    ) {
      nuevoEstado = "Activo"
    } else {
      nuevoEstado = "Activo" // Por defecto, si es Obsoleto
    }

    // Actualizar el estado del molde
    const updatedMoldes = moldes.map((m) => {
      if (m.id === molde.id) {
        return { ...m, estado: nuevoEstado }
      }
      return m
    })

    setMoldes(updatedMoldes)
    applyFilters(updatedMoldes, searchQuery, estado, tipoInyeccion, cavidades, maquinaCompatible)
    router.refresh()
  }

  const handleDeleteMolde = (molde: Molde) => {
    // Verificar si el molde tiene productos asociados
    if (molde.productosAsociados && molde.productosAsociados.length > 0) {
      setDeleteError("No se puede eliminar el molde porque tiene productos asociados. Desasocie los productos primero.")
      return
    }

    // Eliminar el molde
    const updatedMoldes = moldes.filter((m) => m.id !== molde.id)
    setMoldes(updatedMoldes)
    applyFilters(updatedMoldes, searchQuery, estado, tipoInyeccion, cavidades, maquinaCompatible)
    setMoldeToDelete(null)
    router.refresh()
  }

  // Función para obtener el color de la badge según el estado
  const getEstadoBadgeVariant = (estado: string) => {
    switch (estado) {
      case "Activo":
        return "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100"
      case "En Mantenimiento":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-100"
      case "Fuera de Servicio":
        return "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-100"
      case "En Reparación":
        return "bg-orange-100 text-orange-800 hover:bg-orange-100 dark:bg-orange-900 dark:text-orange-100"
      case "Obsoleto":
        return "bg-gray-100 text-gray-800 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-100"
      default:
        return ""
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div>
      {/* Encabezado con título, botón de nuevo, búsqueda y filtros */}
      <div className="flex flex-col space-y-4 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-semibold">Catálogo de Moldes</h2>
          <Button asChild className="mt-2 sm:mt-0">
            <Link href="/moldes/nuevo" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>Nuevo Molde</span>
            </Link>
          </Button>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Input
              type="search"
              placeholder="Buscar por nombre o referencia..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={handleSearch}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <div className="flex items-center gap-2">
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span className="sr-only">Filtros</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filtros</SheetTitle>
                  <SheetDescription>Filtra la lista de moldes según los siguientes criterios.</SheetDescription>
                </SheetHeader>
                <MoldesFiltros className="py-6" />
              </SheetContent>
            </Sheet>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <Download className="h-4 w-4" />
                  <span className="sr-only">Exportar</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="flex items-center gap-2">
                  <FileSpreadsheet className="h-4 w-4" />
                  <span>Exportar a Excel</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2">
                  <FileIcon className="h-4 w-4" />
                  <span>Exportar a PDF</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Tabla de moldes */}
      {filteredMoldes.length === 0 ? (
        <div className="flex items-center justify-center p-8 text-center">
          <div>
            <p className="text-lg font-medium">No se encontraron moldes</p>
            <p className="text-sm text-muted-foreground">Intenta cambiar los filtros o crea un nuevo molde</p>
          </div>
        </div>
      ) : (
        <div className="rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Imagen</TableHead>
                <TableHead>Referencia</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Cavidades</TableHead>
                <TableHead>Tipo Inyección</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMoldes.map((molde) => (
                <TableRow key={molde.id}>
                  <TableCell>
                    <div className="relative h-10 w-10 overflow-hidden rounded-md border">
                      {molde.imagen ? (
                        <Image
                          src={molde.imagen || "/placeholder.svg"}
                          alt={molde.nombre}
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-muted">
                          <span className="text-xs text-muted-foreground">N/A</span>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{molde.referencia}</TableCell>
                  <TableCell>{molde.nombre}</TableCell>
                  <TableCell>{molde.numeroCavidades}</TableCell>
                  <TableCell>{molde.tipoInyeccion}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getEstadoBadgeVariant(molde.estado)}>
                      {molde.estado}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Abrir menú</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/moldes/${molde.id}`} className="flex items-center gap-2">
                            <Eye className="h-4 w-4" />
                            <span>Ver detalles</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/moldes/editar/${molde.id}`} className="flex items-center gap-2">
                            <Pencil className="h-4 w-4" />
                            <span>Editar</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <AlertDialog
                          open={moldeToToggle?.id === molde.id}
                          onOpenChange={(open) => !open && setMoldeToToggle(null)}
                        >
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem
                              className="flex items-center gap-2"
                              onSelect={(e) => {
                                e.preventDefault()
                                setMoldeToToggle(molde)
                              }}
                            >
                              {molde.estado === "Activo" ? (
                                <>
                                  <Tool className="h-4 w-4" />
                                  <span>Enviar a mantenimiento</span>
                                </>
                              ) : (
                                <>
                                  <RotateCcw className="h-4 w-4" />
                                  <span>Activar</span>
                                </>
                              )}
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                {molde.estado === "Activo" ? "¿Enviar molde a mantenimiento?" : "¿Activar molde?"}
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                {molde.estado === "Activo"
                                  ? "El molde no estará disponible para nuevas órdenes mientras esté en mantenimiento."
                                  : "El molde estará disponible para órdenes nuevamente."}
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleToggleEstado(molde)}
                                className={molde.estado === "Activo" ? "bg-yellow-500 hover:bg-yellow-600" : ""}
                              >
                                {molde.estado === "Activo" ? "Enviar a mantenimiento" : "Activar"}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>

                        <AlertDialog
                          open={moldeToDelete?.id === molde.id}
                          onOpenChange={(open) => {
                            if (!open) {
                              setMoldeToDelete(null)
                              setDeleteError(null)
                            }
                          }}
                        >
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem
                              className="flex items-center gap-2 text-red-500 focus:text-red-500"
                              onSelect={(e) => {
                                e.preventDefault()
                                setMoldeToDelete(molde)
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span>Eliminar</span>
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>¿Eliminar molde permanentemente?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta acci��n no se puede deshacer. Se eliminará permanentemente el molde del sistema.
                                {deleteError && (
                                  <div className="mt-2 rounded-md bg-red-50 p-2 text-red-600">{deleteError}</div>
                                )}
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteMolde(molde)}
                                className="bg-red-500 hover:bg-red-600"
                              >
                                Eliminar
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
