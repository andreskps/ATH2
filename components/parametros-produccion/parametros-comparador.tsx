"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowUp, ArrowDown, Minus } from "lucide-react"
import { getParametros, type ParametroProduccion } from "@/lib/data/parametros-produccion"

export function ParametrosComparador() {
  const [parametros, setParametros] = useState<ParametroProduccion[]>([])
  const [selectedParametros, setSelectedParametros] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadParametros = async () => {
      try {
        const data = await getParametros()
        setParametros(data)
      } catch (error) {
        console.error("Error loading parametros:", error)
      } finally {
        setLoading(false)
      }
    }

    loadParametros()
  }, [])

  const addParametro = (parametroId: string) => {
    if (!selectedParametros.includes(parametroId) && selectedParametros.length < 4) {
      setSelectedParametros([...selectedParametros, parametroId])
    }
  }

  const removeParametro = (parametroId: string) => {
    setSelectedParametros(selectedParametros.filter((id) => id !== parametroId))
  }

  const getParametroById = (id: string) => {
    return parametros.find((p) => p.id === id)
  }

  const compareValues = (values: number[]) => {
    if (values.length < 2) return []

    const max = Math.max(...values)
    const min = Math.min(...values)

    return values.map((value) => {
      if (value === max && value !== min) return "higher"
      if (value === min && value !== max) return "lower"
      return "equal"
    })
  }

  const getComparisonIcon = (comparison: string) => {
    switch (comparison) {
      case "higher":
        return <ArrowUp className="h-4 w-4 text-green-600" />
      case "lower":
        return <ArrowDown className="h-4 w-4 text-red-600" />
      default:
        return <Minus className="h-4 w-4 text-gray-400" />
    }
  }

  if (loading) {
    return <div>Cargando...</div>
  }

  const selectedParametrosData = selectedParametros
    .map((id) => getParametroById(id))
    .filter(Boolean) as ParametroProduccion[]

  return (
    <div className="space-y-6">
      {/* Selector de parámetros */}
      <Card>
        <CardHeader>
          <CardTitle>Seleccionar Parámetros para Comparar</CardTitle>
          <CardDescription>Puedes seleccionar hasta 4 parámetros para comparar</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Select onValueChange={addParametro}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Seleccionar parámetro" />
              </SelectTrigger>
              <SelectContent>
                {parametros
                  .filter((p) => !selectedParametros.includes(p.id))
                  .map((parametro) => (
                    <SelectItem key={parametro.id} value={parametro.id}>
                      {parametro.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          {/* Parámetros seleccionados */}
          <div className="flex flex-wrap gap-2">
            {selectedParametrosData.map((parametro) => (
              <Badge key={parametro.id} variant="secondary" className="gap-2">
                {parametro.name}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 text-muted-foreground hover:text-foreground"
                  onClick={() => removeParametro(parametro.id)}
                >
                  ×
                </Button>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tabla de comparación */}
      {selectedParametrosData.length >= 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Comparación Detallada</CardTitle>
            <CardDescription>Diferencias entre los parámetros seleccionados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Temperaturas */}
              <div>
                <h4 className="font-semibold mb-3">Temperaturas (°C)</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Zona</TableHead>
                      {selectedParametrosData.map((parametro) => (
                        <TableHead key={parametro.id}>{parametro.name}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {["zona1", "zona2", "zona3", "boquilla", "molde"].map((zona) => {
                      const values = selectedParametrosData.map(
                        (p) => p.temperatures[zona as keyof typeof p.temperatures],
                      )
                      const comparisons = compareValues(values)

                      return (
                        <TableRow key={zona}>
                          <TableCell className="font-medium capitalize">{zona}</TableCell>
                          {selectedParametrosData.map((parametro, index) => (
                            <TableCell key={parametro.id} className="text-center">
                              <div className="flex items-center justify-center gap-2">
                                {getComparisonIcon(comparisons[index])}
                                <span>{parametro.temperatures[zona as keyof typeof parametro.temperatures]}</span>
                              </div>
                            </TableCell>
                          ))}
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>

              {/* Presiones */}
              <div>
                <h4 className="font-semibold mb-3">Presiones (bar)</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tipo</TableHead>
                      {selectedParametrosData.map((parametro) => (
                        <TableHead key={parametro.id}>{parametro.name}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {["inyeccion", "mantenimiento", "contrapresion"].map((tipo) => {
                      const values = selectedParametrosData.map((p) => p.pressures[tipo as keyof typeof p.pressures])
                      const comparisons = compareValues(values)

                      return (
                        <TableRow key={tipo}>
                          <TableCell className="font-medium capitalize">{tipo}</TableCell>
                          {selectedParametrosData.map((parametro, index) => (
                            <TableCell key={parametro.id} className="text-center">
                              <div className="flex items-center justify-center gap-2">
                                {getComparisonIcon(comparisons[index])}
                                <span>{parametro.pressures[tipo as keyof typeof parametro.pressures]}</span>
                              </div>
                            </TableCell>
                          ))}
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>

              {/* Tiempos */}
              <div>
                <h4 className="font-semibold mb-3">Tiempos (s)</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fase</TableHead>
                      {selectedParametrosData.map((parametro) => (
                        <TableHead key={parametro.id}>{parametro.name}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {["inyeccion", "enfriamiento", "ciclo_total"].map((fase) => {
                      const values = selectedParametrosData.map((p) => p.times[fase as keyof typeof p.times])
                      const comparisons = compareValues(values)

                      return (
                        <TableRow key={fase}>
                          <TableCell className="font-medium capitalize">{fase.replace("_", " ")}</TableCell>
                          {selectedParametrosData.map((parametro, index) => (
                            <TableCell key={parametro.id} className="text-center">
                              <div className="flex items-center justify-center gap-2">
                                {getComparisonIcon(comparisons[index])}
                                <span>{parametro.times[fase as keyof typeof parametro.times]}</span>
                              </div>
                            </TableCell>
                          ))}
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Insights y recomendaciones */}
      {selectedParametrosData.length >= 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Insights y Recomendaciones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Análisis de Temperaturas:</strong> Los parámetros muestran variaciones significativas en las
                  zonas de calentamiento. Se recomienda evaluar el impacto en la calidad del producto.
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800">
                  <strong>Optimización Sugerida:</strong> Los tiempos de ciclo pueden optimizarse tomando como
                  referencia los valores más eficientes de cada parámetro.
                </p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Advertencia:</strong> Las diferencias en presiones de inyección pueden afectar la consistencia
                  del producto final. Considerar estandarización.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
