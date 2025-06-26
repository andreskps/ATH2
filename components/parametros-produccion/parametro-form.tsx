"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Thermometer, Gauge, Clock, Zap, TestTube, X } from "lucide-react"
import {
  getParametroById,
  getRawMaterials,
  getProducts,
  getMachines,
  type ParametroProduccion,
  type RawMaterial,
  type Product,
  type Machine,
} from "@/lib/data/parametros-produccion"

interface ParametroFormProps {
  parametroId?: string
}

export function ParametroForm({ parametroId }: ParametroFormProps) {
  const [parametro, setParametro] = useState<ParametroProduccion | null>(null)
  const [rawMaterials, setRawMaterials] = useState<RawMaterial[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [machines, setMachines] = useState<Machine[]>([])
  const [selectedMaterial, setSelectedMaterial] = useState("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [materialsData, productsData, machinesData] = await Promise.all([
          getRawMaterials(),
          getProducts(),
          getMachines(),
        ])

        setRawMaterials(materialsData)
        setProducts(productsData)
        setMachines(machinesData)

        if (parametroId) {
          const parametroData = await getParametroById(parametroId)
          setParametro(parametroData)
        }
      } catch (error) {
        console.error("Error loading data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [parametroId])

  const handleSave = async () => {
    setSaving(true)
    try {
      // Aquí implementarías la lógica para guardar
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Parámetro guardado")
    } catch (error) {
      console.error("Error saving:", error)
    } finally {
      setSaving(false)
    }
  }

  const addMaterial = () => {
    if (selectedMaterial && parametro && !parametro.rawMaterials.includes(selectedMaterial)) {
      setParametro({
        ...parametro,
        rawMaterials: [...parametro.rawMaterials, selectedMaterial],
      })
      setSelectedMaterial("")
    }
  }

  const removeMaterial = (materialId: string) => {
    if (parametro) {
      setParametro({
        ...parametro,
        rawMaterials: parametro.rawMaterials.filter((id) => id !== materialId),
      })
    }
  }

  const getMaterialName = (id: string) => {
    const material = rawMaterials.find((m) => m.id === id)
    return material ? material.name : id
  }

  if (loading) {
    return <div>Cargando...</div>
  }

  if (parametroId && !parametro) {
    return <div>Parámetro no encontrado</div>
  }

  return (
    <div className="space-y-6">
      {/* Información básica */}
      <Card>
        <CardHeader>
          <CardTitle>Información Básica</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Producto</Label>
              <Select value={parametro?.productId || ""}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar producto" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Máquina</Label>
              <Select value={parametro?.machineId || ""}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar máquina" />
                </SelectTrigger>
                <SelectContent>
                  {machines.map((machine) => (
                    <SelectItem key={machine.id} value={machine.id}>
                      {machine.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Nombre del Set</Label>
            <Input value={parametro?.name || ""} placeholder="Nombre del parámetro" />
          </div>
        </CardContent>
      </Card>

      {/* Materias Primas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TestTube className="h-5 w-5" />
            Materias Primas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {parametro?.rawMaterials.map((materialId) => (
              <Badge key={materialId} variant="secondary" className="gap-2">
                <TestTube className="h-3 w-3" />
                {getMaterialName(materialId)}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 text-muted-foreground hover:text-foreground"
                  onClick={() => removeMaterial(materialId)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Select value={selectedMaterial} onValueChange={setSelectedMaterial}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Agregar materia prima" />
              </SelectTrigger>
              <SelectContent>
                {rawMaterials
                  .filter((material) => !parametro?.rawMaterials.includes(material.id))
                  .map((material) => (
                    <SelectItem key={material.id} value={material.id}>
                      {material.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <Button onClick={addMaterial} disabled={!selectedMaterial}>
              Agregar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Parámetros Técnicos */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Temperaturas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Thermometer className="h-5 w-5" />
              Temperaturas (°C)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Zona 1</Label>
              <Input type="number" value={parametro?.temperatures.zona1 || ""} />
            </div>
            <div className="space-y-2">
              <Label>Zona 2</Label>
              <Input type="number" value={parametro?.temperatures.zona2 || ""} />
            </div>
            <div className="space-y-2">
              <Label>Zona 3</Label>
              <Input type="number" value={parametro?.temperatures.zona3 || ""} />
            </div>
            <div className="space-y-2">
              <Label>Boquilla</Label>
              <Input type="number" value={parametro?.temperatures.boquilla || ""} />
            </div>
            <div className="space-y-2">
              <Label>Molde</Label>
              <Input type="number" value={parametro?.temperatures.molde || ""} />
            </div>
          </CardContent>
        </Card>

        {/* Presiones */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gauge className="h-5 w-5" />
              Presiones (bar)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Inyección</Label>
              <Input type="number" value={parametro?.pressures.inyeccion || ""} />
            </div>
            <div className="space-y-2">
              <Label>Mantenimiento</Label>
              <Input type="number" value={parametro?.pressures.mantenimiento || ""} />
            </div>
            <div className="space-y-2">
              <Label>Contrapresión</Label>
              <Input type="number" value={parametro?.pressures.contrapresion || ""} />
            </div>
          </CardContent>
        </Card>

        {/* Tiempos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Tiempos (s)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Inyección</Label>
              <Input type="number" step="0.1" value={parametro?.times.inyeccion || ""} />
            </div>
            <div className="space-y-2">
              <Label>Enfriamiento</Label>
              <Input type="number" step="0.1" value={parametro?.times.enfriamiento || ""} />
            </div>
            <div className="space-y-2">
              <Label>Ciclo Total</Label>
              <Input type="number" step="0.1" value={parametro?.times.ciclo_total || ""} />
            </div>
          </CardContent>
        </Card>

        {/* Velocidades */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Velocidades (%)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Inyección</Label>
              <Input type="number" value={parametro?.speeds.inyeccion || ""} />
            </div>
            <div className="space-y-2">
              <Label>Dosificación</Label>
              <Input type="number" value={parametro?.speeds.dosificacion || ""} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notas */}
      <Card>
        <CardHeader>
          <CardTitle>Notas y Observaciones</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={parametro?.notes || ""}
            placeholder="Información adicional sobre estos parámetros..."
            rows={4}
          />
        </CardContent>
      </Card>

      {/* Botones de acción */}
      <div className="flex justify-end gap-2">
        <Button variant="outline">Cancelar</Button>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Guardando..." : "Guardar Cambios"}
        </Button>
      </div>
    </div>
  )
}
