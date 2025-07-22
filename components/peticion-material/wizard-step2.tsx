"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Trash2, Package, AlertTriangle, CheckCircle, XCircle } from "lucide-react"
import { materiasPrimasDisponibles } from "@/lib/data/peticion-material"
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

  const filteredMaterias = materiasPrimasDisponibles.filter(
    (materia) =>
      materia.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      materia.tipo.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
    }

    const nuevosMateriales = [...materiales, nuevoMaterial]
    setMateriales(nuevosMateriales)
    onUpdate({ materiales: nuevosMateriales })
    setSelectedMateria("")
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

      {/* Agregar nuevo material */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Agregar Material
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

      {/* Lista de materiales agregados */}
      {materiales.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Materiales Solicitados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {materiales.map((material, index) => (
                <div key={material.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      {material.materiaPrima}
                    </h4>
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
            <p className="text-muted-foreground">Agrega los materiales necesarios para la orden de producción.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
