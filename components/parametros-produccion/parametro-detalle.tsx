"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Thermometer, Gauge, Clock, Zap, TestTube } from "lucide-react"
import {
  getParametroById,
  getRawMaterials,
  type ParametroProduccion,
  type RawMaterial,
} from "@/lib/data/parametros-produccion"

interface ParametroDetalleProps {
  parametroId: string
}

export function ParametroDetalle({ parametroId }: ParametroDetalleProps) {
  const [parametro, setParametro] = useState<ParametroProduccion | null>(null)
  const [rawMaterials, setRawMaterials] = useState<RawMaterial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [parametroData, materialsData] = await Promise.all([getParametroById(parametroId), getRawMaterials()])
        setParametro(parametroData)
        setRawMaterials(materialsData)
      } catch (error) {
        console.error("Error loading data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [parametroId])

  const getMaterialName = (id: string) => {
    const material = rawMaterials.find((m) => m.id === id)
    return material ? material.name : id
  }

  if (loading) {
    return <div>Cargando...</div>
  }

  if (!parametro) {
    return <div>Parámetro no encontrado</div>
  }

  return (
    <div className="space-y-6">
      {/* Materias Primas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TestTube className="h-5 w-5" />
            Materias Primas Asociadas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {parametro.rawMaterials.map((materialId) => (
              <Badge key={materialId} variant="outline" className="gap-1">
                <TestTube className="h-3 w-3" />
                {getMaterialName(materialId)}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Parámetros Técnicos */}
      <Card>
        <CardHeader>
          <CardTitle>Parámetros Técnicos Detallados</CardTitle>
          <CardDescription>Valores configurados para este conjunto de parámetros</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Temperaturas */}
            <div>
              <h4 className="flex items-center gap-2 font-semibold mb-3">
                <Thermometer className="h-4 w-4" />
                Temperaturas
              </h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Zona</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Unidad</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Zona 1</TableCell>
                    <TableCell className="font-medium">{parametro.temperatures.zona1}</TableCell>
                    <TableCell>°C</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Óptimo</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Zona 2</TableCell>
                    <TableCell className="font-medium">{parametro.temperatures.zona2}</TableCell>
                    <TableCell>°C</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Óptimo</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Zona 3</TableCell>
                    <TableCell className="font-medium">{parametro.temperatures.zona3}</TableCell>
                    <TableCell>°C</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Óptimo</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Boquilla</TableCell>
                    <TableCell className="font-medium">{parametro.temperatures.boquilla}</TableCell>
                    <TableCell>°C</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Óptimo</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Molde</TableCell>
                    <TableCell className="font-medium">{parametro.temperatures.molde}</TableCell>
                    <TableCell>°C</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Óptimo</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            {/* Presiones */}
            <div>
              <h4 className="flex items-center gap-2 font-semibold mb-3">
                <Gauge className="h-4 w-4" />
                Presiones
              </h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Unidad</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Inyección</TableCell>
                    <TableCell className="font-medium">{parametro.pressures.inyeccion}</TableCell>
                    <TableCell>bar</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Óptimo</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Mantenimiento</TableCell>
                    <TableCell className="font-medium">{parametro.pressures.mantenimiento}</TableCell>
                    <TableCell>bar</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Óptimo</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Contrapresión</TableCell>
                    <TableCell className="font-medium">{parametro.pressures.contrapresion}</TableCell>
                    <TableCell>bar</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Óptimo</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            {/* Tiempos */}
            <div>
              <h4 className="flex items-center gap-2 font-semibold mb-3">
                <Clock className="h-4 w-4" />
                Tiempos
              </h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fase</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Unidad</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Inyección</TableCell>
                    <TableCell className="font-medium">{parametro.times.inyeccion}</TableCell>
                    <TableCell>s</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Óptimo</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Enfriamiento</TableCell>
                    <TableCell className="font-medium">{parametro.times.enfriamiento}</TableCell>
                    <TableCell>s</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Óptimo</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Ciclo Total</TableCell>
                    <TableCell className="font-medium">{parametro.times.ciclo_total}</TableCell>
                    <TableCell>s</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Óptimo</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            {/* Velocidades */}
            <div>
              <h4 className="flex items-center gap-2 font-semibold mb-3">
                <Zap className="h-4 w-4" />
                Velocidades
              </h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Unidad</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Inyección</TableCell>
                    <TableCell className="font-medium">{parametro.speeds.inyeccion}</TableCell>
                    <TableCell>%</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Óptimo</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Dosificación</TableCell>
                    <TableCell className="font-medium">{parametro.speeds.dosificacion}</TableCell>
                    <TableCell>%</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Óptimo</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
