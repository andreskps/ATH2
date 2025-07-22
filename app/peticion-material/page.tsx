"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, Filter, Eye, Check, X, Clock, Package, User, Calendar } from "lucide-react"
import Link from "next/link"
import { peticionesMaterial } from "@/lib/data/peticion-material"
import { PeticionMaterialTableSkeleton } from "@/components/peticion-material/peticion-material-table-skeleton"

export default function PeticionMaterialPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedEstado, setSelectedEstado] = useState("todos")
  const [isLoading, setIsLoading] = useState(false)

  const filteredPeticiones = peticionesMaterial.filter((peticion) => {
    const matchesSearch =
      peticion.ordenProduccion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      peticion.solicitante.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesEstado = selectedEstado === "todos" || peticion.estado === selectedEstado
    return matchesSearch && matchesEstado
  })

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "pendiente":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <Clock className="w-3 h-3 mr-1" />
            Pendiente
          </Badge>
        )
      case "aprobada":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Check className="w-3 h-3 mr-1" />
            Aprobada
          </Badge>
        )
      case "rechazada":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <X className="w-3 h-3 mr-1" />
            Rechazada
          </Badge>
        )
      default:
        return null
    }
  }

  const estadisticas = {
    total: peticionesMaterial.length,
    pendientes: peticionesMaterial.filter((p) => p.estado === "pendiente").length,
    aprobadas: peticionesMaterial.filter((p) => p.estado === "aprobada").length,
    rechazadas: peticionesMaterial.filter((p) => p.estado === "rechazada").length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Peticiones de Material</h1>
          <p className="text-muted-foreground">Gestiona las solicitudes de material para producción</p>
        </div>
        <Link href="/peticion-material/nueva">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Nueva Petición
          </Button>
        </Link>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{estadisticas.total}</p>
              </div>
              <Package className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pendientes</p>
                <p className="text-2xl font-bold text-yellow-600">{estadisticas.pendientes}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Aprobadas</p>
                <p className="text-2xl font-bold text-green-600">{estadisticas.aprobadas}</p>
              </div>
              <Check className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Rechazadas</p>
                <p className="text-2xl font-bold text-red-600">{estadisticas.rechazadas}</p>
              </div>
              <X className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Buscar por orden de producción o solicitante..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedEstado} onValueChange={setSelectedEstado}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los estados</SelectItem>
                <SelectItem value="pendiente">Pendiente</SelectItem>
                <SelectItem value="aprobada">Aprobada</SelectItem>
                <SelectItem value="rechazada">Rechazada</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabs por Estado */}
      <Tabs value={selectedEstado} onValueChange={setSelectedEstado}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="todos">Todas</TabsTrigger>
          <TabsTrigger value="pendiente">Pendientes</TabsTrigger>
          <TabsTrigger value="aprobada">Aprobadas</TabsTrigger>
          <TabsTrigger value="rechazada">Rechazadas</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedEstado} className="mt-6">
          {isLoading ? (
            <PeticionMaterialTableSkeleton />
          ) : (
            <div className="grid gap-4">
              {filteredPeticiones.map((peticion) => (
                <Card key={peticion.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">#{peticion.id}</h3>
                          {getEstadoBadge(peticion.estado)}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Package className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Orden:</span>
                            <span className="font-medium">{peticion.ordenProduccion}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Solicitante:</span>
                            <span className="font-medium">{peticion.solicitante}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Fecha:</span>
                            <span className="font-medium">
                              {new Date(peticion.fechaSolicitud).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        <div className="mt-3">
                          <span className="text-sm text-muted-foreground">
                            {peticion.items.length}{" "}
                            {peticion.items.length === 1 ? "ítem solicitado" : "ítems solicitados"}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2">
                        <Link href={`/peticion-material/${peticion.id}`}>
                          <Button variant="outline" size="sm" className="w-full sm:w-auto bg-transparent">
                            <Eye className="w-4 h-4 mr-2" />
                            Ver Detalle
                          </Button>
                        </Link>

                        {peticion.estado === "pendiente" && (
                          <>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700 w-full sm:w-auto">
                              <Check className="w-4 h-4 mr-2" />
                              Aprobar
                            </Button>
                            <Button variant="destructive" size="sm" className="w-full sm:w-auto">
                              <X className="w-4 h-4 mr-2" />
                              Rechazar
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredPeticiones.length === 0 && (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No se encontraron peticiones</h3>
                    <p className="text-muted-foreground mb-4">
                      No hay peticiones que coincidan con los filtros seleccionados.
                    </p>
                    <Link href="/peticion-material/nueva">
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Crear Nueva Petición
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
