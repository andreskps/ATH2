"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, X, TestTube } from "lucide-react"
import { getRawMaterials, type RawMaterial } from "@/lib/data/parametros-produccion"

interface WizardStep2Props {
  data: any
  onUpdate: (data: any) => void
}

export function WizardStep2({ data, onUpdate }: WizardStep2Props) {
  const [rawMaterials, setRawMaterials] = useState<RawMaterial[]>([])
  const [selectedMaterial, setSelectedMaterial] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadRawMaterials = async () => {
      try {
        const materials = await getRawMaterials()
        setRawMaterials(materials)
      } catch (error) {
        console.error("Error loading raw materials:", error)
      } finally {
        setLoading(false)
      }
    }

    loadRawMaterials()
  }, [])

  const addMaterial = () => {
    if (selectedMaterial && !data.rawMaterials.includes(selectedMaterial)) {
      onUpdate({
        rawMaterials: [...data.rawMaterials, selectedMaterial],
      })
      setSelectedMaterial("")
    }
  }

  const removeMaterial = (materialId: string) => {
    onUpdate({
      rawMaterials: data.rawMaterials.filter((id: string) => id !== materialId),
    })
  }

  const getMaterialName = (id: string) => {
    const material = rawMaterials.find((m) => m.id === id)
    return material ? material.name : id
  }

  const getMaterialType = (id: string) => {
    const material = rawMaterials.find((m) => m.id === id)
    return material ? material.type : ""
  }

  const recommendedMaterials = [
    { id: "uuid-1", name: "PP Transparente", reason: "Común para vasos" },
    { id: "uuid-3", name: "Aditivo UV", reason: "Protección UV recomendada" },
  ]

  if (loading) {
    return <div>Cargando...</div>
  }

  return (
    <div className="space-y-6">
      {/* Materias primas seleccionadas */}
      <div className="space-y-3">
        <Label>Materias Primas Seleccionadas</Label>
        {data.rawMaterials.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {data.rawMaterials.map((materialId: string) => (
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
        ) : (
          <p className="text-sm text-muted-foreground">No hay materias primas seleccionadas</p>
        )}
      </div>

      {/* Agregar nueva materia prima */}
      <div className="space-y-3">
        <Label>Agregar Materia Prima</Label>
        <div className="flex gap-2">
          <Select value={selectedMaterial} onValueChange={setSelectedMaterial}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Seleccionar materia prima" />
            </SelectTrigger>
            <SelectContent>
              {rawMaterials
                .filter((material) => !data.rawMaterials.includes(material.id))
                .map((material) => (
                  <SelectItem key={material.id} value={material.id}>
                    <div className="flex items-center gap-2">
                      <TestTube className="h-4 w-4" />
                      <div>
                        <p className="font-medium">{material.name}</p>
                        <p className="text-xs text-muted-foreground">{material.type}</p>
                      </div>
                    </div>
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          <Button onClick={addMaterial} disabled={!selectedMaterial}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Recomendaciones */}
      {data.product && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Materias Primas Recomendadas</CardTitle>
            <CardDescription>
              Basado en el producto seleccionado, estas materias primas son comúnmente utilizadas.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recommendedMaterials
                .filter((material) => !data.rawMaterials.includes(material.id))
                .map((material) => (
                  <div key={material.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <TestTube className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{material.name}</p>
                        <p className="text-sm text-muted-foreground">{material.reason}</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        onUpdate({
                          rawMaterials: [...data.rawMaterials, material.id],
                        })
                      }}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Agregar
                    </Button>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lista detallada de materias primas seleccionadas */}
      {data.rawMaterials.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Detalle de Materias Primas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.rawMaterials.map((materialId: string) => (
                <div key={materialId} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <TestTube className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{getMaterialName(materialId)}</p>
                      <p className="text-sm text-muted-foreground">{getMaterialType(materialId)}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => removeMaterial(materialId)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
