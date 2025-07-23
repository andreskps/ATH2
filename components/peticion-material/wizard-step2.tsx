"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, Trash2, Package, AlertTriangle, CheckCircle, XCircle, Sparkles, Calculator } from "lucide-react"
import { materiasPrimasDisponibles } from "@/lib/data/peticion-material"
import { getProductoByCodigo } from "@/lib/data/productos"
import type { WizardData } from "./peticion-material-wizard"

interface Props {
  data: WizardData
  onUpdate: (data: Partial<WizardData>) => void
  onNext: () => void
  onPrevious: () => void
}

export function WizardStep2({ data, onUpdate, onNext, onPrevious }: Props) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMateria, setSelectedMateria] = useState("")
  const [materiales, setMateriales] = useState(data.materiales || [])
  const [materialesRecomendados, setMaterialesRecomendados] = useState<any[]>([])

  const filteredMaterias = materiasPrimasDisponibles.filter(
    (materia) =>
      materia.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      materia.tipo.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Calcular materiales recomendados basados en el producto seleccionado
  useEffect(() => {
    if (data.ordenProduccion?.codigoProducto) {
      const producto = getProductoByCodigo(data.ordenProduccion.codigoProducto)
      if (producto?.materiasPrimas && data.ordenProduccion.cantidad) {
        const recomendados = producto.materiasPrimas
          .map((mp) => {
            const materiaPrima = materiasPrimasDisponibles.find((m) => m.id === mp.id)
            if (!materiaPrima) return null

            const cantidadCalculada = mp.cantidadPorUnidad * data.ordenProduccion.cantidad

            return {
              id: `rec-${Date.now()}-${mp.id}`,
              materiaPrima: materiaPrima.nombre,
              materiaPrimaId: mp.id,
              cantidadSolicitada: Math.ceil(cantidadCalculada * 100) / 100, // Redondear a 2 decimales
              cantidadPorUnidad: mp.cantidadPorUnidad,
              unidad: materiaPrima.unidad,
              lotes: materiaPrima.lotes,
              lote: "",
              proveedor: "",
              stockDisponible: 0,
              fechaVencimiento: "",
              notas: "",
              esRecomendado: true,
            }
          })
          .filter(Boolean)

        setMaterialesRecomendados(recomendados)
      }
    }
  }, [data.ordenProduccion])

  const agregarMaterial = () => {
    if (!selectedMateria) return

    const materia = materiasPrimasDisponibles.find((m) => m.id === selectedMateria)
    if (!materia) return

    const nuevoMaterial = {
      id: `item-${Date.now()}`,
      materiaPrima: materia.nombre,
      lote: "",
      proveedor: "",
      cantidadSolicitada: 0,
      unidad: materia.unidad,
      stockDisponible: 0,
      fechaVencimiento: "",
      notas: "",
      lotes: materia.lotes,
      esRecomendado: false,
    }

    const nuevosMateriales = [...materiales, nuevoMaterial]
    setMateriales(nuevosMateriales)
    onUpdate({ materiales: nuevosMateriales })
    setSelectedMateria("")
  }

  const agregarMaterialRecomendado = (materialRecomendado: any) => {
    const nuevoMaterial = {
      ...materialRecomendado,
      id: `item-${Date.now()}`,
      esRecomendado: true,
    }

    const nuevosMateriales = [...materiales, nuevoMaterial]
    setMateriales(nuevosMateriales)
    onUpdate({ materiales: nuevosMateriales })
  }

  const eliminarMaterial = (index: number) => {
    const nuevosMateriales = materiales.filter((_, i) => i !== index)
    setMateriales(nuevosMateriales)
    onUpdate({ materiales: nuevosMateriales })
  }

  const actualizarMaterial = (index: number, campo: string, valor: any) => {
    const nuevosMateriales = [...materiales]
    nuevosMateriales[index] = { ...nuevosMateriales[index], [campo]: valor }

    // Si se cambia el lote, actualizar proveedor y stock
    if (campo === "lote") {
      const loteSeleccionado = nuevosMateriales[index].lotes?.find((l: any) => l.id === valor)
      if (loteSeleccionado) {
        nuevosMateriales[index].proveedor = loteSeleccionado.proveedor
        nuevosMateriales[index].stockDisponible = loteSeleccionado.stock
        nuevosMateriales[index].fechaVencimiento = loteSeleccionado.fechaVencimiento
      }
    }

    setMateriales(nuevosMateriales)
    onUpdate({ materiales: nuevosMateriales })
  }

  const getEstadoStock = (cantidadSolicitada: number, stockDisponible: number) => {
    if (cantidadSolicitada > stockDisponible) return "insuficiente"
    if (cantidadSolicitada > stockDisponible * 0.8) return "bajo"
    return "suficiente"
  }

  const getIconoEstado = (estado: string) => {
    switch (estado) {
      case "suficiente":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "bajo":
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />
      case "insuficiente":
        return <XCircle className="w-4 h-4 text-red-600" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Agregar Materiales</h3>
        <p className="text-muted-foreground">Selecciona los materiales necesarios para la orden de producción.</p>
      </div>

      <Tabs defaultValue="recomendados" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="recomendados" className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Recomendados
            {materialesRecomendados.length > 0 && (
              <Badge variant="secondary" className="ml-1">
                {materialesRecomendados.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="manual" className="flex items-center gap-2">
            <Search className="w-4 h-4" />
            Búsqueda Manual
          </TabsTrigger>
        </TabsList>

        <TabsContent value="recomendados" className="space-y-4">
          {materialesRecomendados.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  Materiales Recomendados
                  <Badge variant="outline" className="ml-2">
                    Basado en {data.ordenProduccion?.producto}
                  </Badge>
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Cantidades calculadas automáticamente para {data.ordenProduccion?.cantidad?.toLocaleString()} unidades
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {materialesRecomendados.map((material, index) => (
                    <div key={material.id} className="border rounded-lg p-4 bg-blue-50/50">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Package className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{material.materiaPrima}</h4>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calculator className="w-3 h-3" />
                              {material.cantidadPorUnidad} {material.unidad}/unidad ×{" "}
                              {data.ordenProduccion?.cantidad?.toLocaleString()} unidades
                            </div>
                          </div>
                        </div>
                        <Button
                          onClick={() => agregarMaterialRecomendado(material)}
                          className="bg-blue-600 hover:bg-blue-700"
                          disabled={materiales.some((m) => m.materiaPrima === material.materiaPrima)}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          {materiales.some((m) => m.materiaPrima === material.materiaPrima) ? "Agregado" : "Agregar"}
                        </Button>
                      </div>

                      <div className="bg-white rounded-md p-3 border">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Cantidad recomendada:</span>
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-blue-600">
                              {material.cantidadSolicitada} {material.unidad}
                            </span>
                            <Badge variant="secondary" className="text-xs">
                              Calculado
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Sparkles className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No hay recomendaciones disponibles</h3>
                <p className="text-muted-foreground">
                  {!data.ordenProduccion
                    ? "Selecciona una orden de producción para ver las recomendaciones"
                    : "Este producto no tiene materias primas configuradas"}
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="manual" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Agregar Material Manualmente
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="search-material">Buscar materia prima</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="search-material"
                      placeholder="Buscar por nombre o tipo..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="w-64">
                  <Label htmlFor="select-material">Seleccionar material</Label>
                  <Select value={selectedMateria} onValueChange={setSelectedMateria}>
                    <SelectTrigger>
                      <SelectValue placeholder="Elegir material" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredMaterias.map((materia) => (
                        <SelectItem key={materia.id} value={materia.id}>
                          {materia.nombre} ({materia.tipo})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button onClick={agregarMaterial} disabled={!selectedMateria}>
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Lista de materiales agregados */}
      {materiales.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Materiales Solicitados ({materiales.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {materiales.map((material, index) => (
                <div key={material.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          material.esRecomendado ? "bg-blue-100" : "bg-gray-100"
                        }`}
                      >
                        <Package className={`w-5 h-5 ${material.esRecomendado ? "text-blue-600" : "text-gray-600"}`} />
                      </div>
                      <div>
                        <h4 className="font-semibold flex items-center gap-2">
                          {material.materiaPrima}
                          {material.esRecomendado && (
                            <Badge variant="secondary" className="text-xs">
                              <Sparkles className="w-3 h-3 mr-1" />
                              Recomendado
                            </Badge>
                          )}
                        </h4>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => eliminarMaterial(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Lote disponible</Label>
                      <Select value={material.lote} onValueChange={(value) => actualizarMaterial(index, "lote", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar lote" />
                        </SelectTrigger>
                        <SelectContent>
                          {material.lotes?.map((lote: any) => (
                            <SelectItem key={lote.id} value={lote.id}>
                              {lote.id} - {lote.proveedor} (Stock: {lote.stock} {material.unidad})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Cantidad solicitada</Label>
                      <div className="flex gap-2">
                        <Input
                          type="number"
                          step="0.01"
                          value={material.cantidadSolicitada}
                          onChange={(e) => actualizarMaterial(index, "cantidadSolicitada", Number(e.target.value))}
                          placeholder="0"
                        />
                        <div className="flex items-center px-3 bg-gray-100 rounded-md">
                          <span className="text-sm text-muted-foreground">{material.unidad}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {material.lote && (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Proveedor:</span>
                          <p className="font-medium">{material.proveedor}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Stock disponible:</span>
                          <p className="font-medium">
                            {material.stockDisponible} {material.unidad}
                          </p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Vencimiento:</span>
                          <p className="font-medium">{new Date(material.fechaVencimiento).toLocaleDateString()}</p>
                        </div>
                      </div>

                      {material.cantidadSolicitada > 0 && (
                        <div className="mt-3 flex items-center gap-2">
                          {getIconoEstado(getEstadoStock(material.cantidadSolicitada, material.stockDisponible))}
                          <span className="text-sm">
                            {getEstadoStock(material.cantidadSolicitada, material.stockDisponible) === "suficiente" &&
                              "Stock suficiente"}
                            {getEstadoStock(material.cantidadSolicitada, material.stockDisponible) === "bajo" &&
                              "Stock bajo pero suficiente"}
                            {getEstadoStock(material.cantidadSolicitada, material.stockDisponible) === "insuficiente" &&
                              "Stock insuficiente"}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  <div>
                    <Label>Notas (opcional)</Label>
                    <Textarea
                      value={material.notas}
                      onChange={(e) => actualizarMaterial(index, "notas", e.target.value)}
                      placeholder="Notas adicionales sobre este material..."
                      rows={2}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {materiales.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No hay materiales agregados</h3>
            <p className="text-muted-foreground">
              {materialesRecomendados.length > 0
                ? "Usa las recomendaciones automáticas o busca materiales manualmente"
                : "Agrega los materiales necesarios para la orden de producción"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
