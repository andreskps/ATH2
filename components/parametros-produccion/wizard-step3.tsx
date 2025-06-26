"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Thermometer, Gauge, Clock, Zap } from "lucide-react"

interface WizardStep3Props {
  data: any
  onUpdate: (data: any) => void
}

export function WizardStep3({ data, onUpdate }: WizardStep3Props) {
  const updateTemperatures = (field: string, value: string) => {
    onUpdate({
      temperatures: {
        ...data.temperatures,
        [field]: Number.parseFloat(value) || 0,
      },
    })
  }

  const updatePressures = (field: string, value: string) => {
    onUpdate({
      pressures: {
        ...data.pressures,
        [field]: Number.parseFloat(value) || 0,
      },
    })
  }

  const updateTimes = (field: string, value: string) => {
    onUpdate({
      times: {
        ...data.times,
        [field]: Number.parseFloat(value) || 0,
      },
    })
  }

  const updateSpeeds = (field: string, value: string) => {
    onUpdate({
      speeds: {
        ...data.speeds,
        [field]: Number.parseFloat(value) || 0,
      },
    })
  }

  const getTemperatureStatus = (value: number, min: number, max: number) => {
    if (value >= min && value <= max) return "optimal"
    if (value >= min - 10 && value <= max + 10) return "acceptable"
    return "out-of-range"
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "optimal":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Óptimo</Badge>
      case "acceptable":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Aceptable</Badge>
      case "out-of-range":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Fuera de rango</Badge>
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Temperaturas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Thermometer className="h-5 w-5" />
            Temperaturas (°C)
          </CardTitle>
          <CardDescription>Configura las temperaturas para cada zona del proceso</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="zona1">Zona 1</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="zona1"
                  type="number"
                  value={data.temperatures.zona1}
                  onChange={(e) => updateTemperatures("zona1", e.target.value)}
                  placeholder="180"
                />
                {data.temperatures.zona1 > 0 && getStatusBadge(getTemperatureStatus(data.temperatures.zona1, 170, 190))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="zona2">Zona 2</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="zona2"
                  type="number"
                  value={data.temperatures.zona2}
                  onChange={(e) => updateTemperatures("zona2", e.target.value)}
                  placeholder="185"
                />
                {data.temperatures.zona2 > 0 && getStatusBadge(getTemperatureStatus(data.temperatures.zona2, 175, 195))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="zona3">Zona 3</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="zona3"
                  type="number"
                  value={data.temperatures.zona3}
                  onChange={(e) => updateTemperatures("zona3", e.target.value)}
                  placeholder="190"
                />
                {data.temperatures.zona3 > 0 && getStatusBadge(getTemperatureStatus(data.temperatures.zona3, 180, 200))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="boquilla">Boquilla</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="boquilla"
                  type="number"
                  value={data.temperatures.boquilla}
                  onChange={(e) => updateTemperatures("boquilla", e.target.value)}
                  placeholder="200"
                />
                {data.temperatures.boquilla > 0 &&
                  getStatusBadge(getTemperatureStatus(data.temperatures.boquilla, 190, 210))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="molde">Molde</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="molde"
                  type="number"
                  value={data.temperatures.molde}
                  onChange={(e) => updateTemperatures("molde", e.target.value)}
                  placeholder="45"
                />
                {data.temperatures.molde > 0 && getStatusBadge(getTemperatureStatus(data.temperatures.molde, 40, 50))}
              </div>
            </div>
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
          <CardDescription>Configura las presiones del proceso de inyección</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="inyeccion">Inyección</Label>
              <Input
                id="inyeccion"
                type="number"
                value={data.pressures.inyeccion}
                onChange={(e) => updatePressures("inyeccion", e.target.value)}
                placeholder="120"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mantenimiento">Mantenimiento</Label>
              <Input
                id="mantenimiento"
                type="number"
                value={data.pressures.mantenimiento}
                onChange={(e) => updatePressures("mantenimiento", e.target.value)}
                placeholder="80"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contrapresion">Contrapresión</Label>
              <Input
                id="contrapresion"
                type="number"
                value={data.pressures.contrapresion}
                onChange={(e) => updatePressures("contrapresion", e.target.value)}
                placeholder="15"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tiempos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Tiempos (segundos)
          </CardTitle>
          <CardDescription>Configura los tiempos del ciclo de producción</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="tiempo_inyeccion">Inyección</Label>
              <Input
                id="tiempo_inyeccion"
                type="number"
                step="0.1"
                value={data.times.inyeccion}
                onChange={(e) => updateTimes("inyeccion", e.target.value)}
                placeholder="2.5"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="enfriamiento">Enfriamiento</Label>
              <Input
                id="enfriamiento"
                type="number"
                step="0.1"
                value={data.times.enfriamiento}
                onChange={(e) => updateTimes("enfriamiento", e.target.value)}
                placeholder="18.0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ciclo_total">Ciclo Total</Label>
              <Input
                id="ciclo_total"
                type="number"
                step="0.1"
                value={data.times.ciclo_total}
                onChange={(e) => updateTimes("ciclo_total", e.target.value)}
                placeholder="25.0"
              />
            </div>
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
          <CardDescription>Configura las velocidades del proceso</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="vel_inyeccion">Inyección</Label>
              <Input
                id="vel_inyeccion"
                type="number"
                value={data.speeds.inyeccion}
                onChange={(e) => updateSpeeds("inyeccion", e.target.value)}
                placeholder="85"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dosificacion">Dosificación</Label>
              <Input
                id="dosificacion"
                type="number"
                value={data.speeds.dosificacion}
                onChange={(e) => updateSpeeds("dosificacion", e.target.value)}
                placeholder="120"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
