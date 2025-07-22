"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Search, Package, Calendar, Hash } from "lucide-react"
import { ordenesProduccion } from "@/lib/data/peticion-material"
import type { WizardData } from "./peticion-material-wizard"

interface Props {
  data: WizardData
  onUpdate: (data: Partial<WizardData>) => void
  onNext: () => void
}

export function WizardStep1({ data, onUpdate, onNext }: Props) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedOrden, setSelectedOrden] = useState(data.ordenProduccion)

  const filteredOrdenes = ordenesProduccion.filter(
    (orden) =>
      orden.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      orden.producto.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSelectOrden = (orden: any) => {
    setSelectedOrden(orden)
    onUpdate({ ordenProduccion: orden })
  }

  const handleNext = () => {
    if (selectedOrden) {
      onNext()
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Seleccionar Orden de Producción</h3>
        <p className="text-muted-foreground">
          Elige la orden de producción para la cual necesitas solicitar materiales.
        </p>
      </div>

      {/* Buscador */}
      <div className="space-y-2">
        <Label htmlFor="search">Buscar orden de producción</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            id="search"
            placeholder="Buscar por número de orden o producto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Lista de órdenes */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredOrdenes.map((orden) => (
          <Card
            key={orden.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedOrden?.id === orden.id ? "ring-2 ring-blue-500 bg-blue-50" : ""
            }`}
            onClick={() => handleSelectOrden(orden)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Hash className="w-4 h-4 text-muted-foreground" />
                    <span className="font-semibold">{orden.id}</span>
                    <Badge variant="outline">Programada</Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Package className="w-4 h-4" />
                    <span>{orden.producto}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <span>Cantidad:</span>
                      <span className="font-medium">{orden.cantidad.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(orden.fechaProgramada).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                {selectedOrden?.id === orden.id && (
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredOrdenes.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No se encontraron órdenes</h3>
            <p className="text-muted-foreground">No hay órdenes que coincidan con tu búsqueda.</p>
          </CardContent>
        </Card>
      )}

      {/* Vista previa de la orden seleccionada */}
      {selectedOrden && (
        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <Package className="w-5 h-5" />
              Orden Seleccionada
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Número de orden:</span>
                <p className="font-semibold">{selectedOrden.id}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Producto:</span>
                <p className="font-semibold">{selectedOrden.producto}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Cantidad a producir:</span>
                <p className="font-semibold">{selectedOrden.cantidad.toLocaleString()} unidades</p>
              </div>
              <div>
                <span className="text-muted-foreground">Fecha programada:</span>
                <p className="font-semibold">{new Date(selectedOrden.fechaProgramada).toLocaleDateString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
