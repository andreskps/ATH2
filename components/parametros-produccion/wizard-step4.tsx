"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertTriangle, XCircle, Thermometer, Gauge, Clock, Zap, TestTube } from "lucide-react"

interface WizardStep4Props {
  data: any
  onUpdate: (data: any) => void
}

export function WizardStep4({ data, onUpdate }: WizardStep4Props) {
  const validations = [
    {
      id: "basic_info",
      title: "Información Básica",
      status: data.product && data.machine && data.name ? "success" : "error",
      message:
        data.product && data.machine && data.name ? "Configuración básica completa" : "Faltan campos obligatorios",
    },
    {
      id: "raw_materials",
      title: "Materias Primas",
      status: data.rawMaterials.length > 0 ? "success" : "warning",
      message:
        data.rawMaterials.length > 0
          ? `${data.rawMaterials.length} materias primas seleccionadas`
          : "Se recomienda seleccionar al menos una materia prima",
    },
    {
      id: "temperatures",
      title: "Temperaturas",
      status: Object.values(data.temperatures).some((temp: any) => temp > 0) ? "success" : "error",
      message: Object.values(data.temperatures).some((temp: any) => temp > 0)
        ? "Temperaturas configuradas"
        : "Configurar temperaturas es obligatorio",
    },
    {
      id: "pressures",
      title: "Presiones",
      status: Object.values(data.pressures).some((pressure: any) => pressure > 0) ? "success" : "warning",
      message: Object.values(data.pressures).some((pressure: any) => pressure > 0)
        ? "Presiones configuradas"
        : "Se recomienda configurar las presiones",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case "error":
        return <XCircle className="h-5 w-5 text-red-600" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Válido</Badge>
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Advertencia</Badge>
      case "error":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Error</Badge>
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Resumen de configuración */}
      <Card>
        <CardHeader>
          <CardTitle>Resumen de Configuración</CardTitle>
          <CardDescription>Revisa todos los parámetros antes de crear</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Producto</Label>
              <p className="text-sm">{data.product || "No seleccionado"}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Máquina</Label>
              <p className="text-sm">{data.machine || "No seleccionada"}</p>
            </div>
            <div className="md:col-span-2">
              <Label className="text-sm font-medium text-muted-foreground">Nombre del Set</Label>
              <p className="text-sm">{data.name || "Sin nombre"}</p>
            </div>
          </div>

          {/* Materias Primas */}
          <div>
            <Label className="text-sm font-medium text-muted-foreground">Materias Primas</Label>
            <div className="flex flex-wrap gap-2 mt-1">
              {data.rawMaterials.length > 0 ? (
                data.rawMaterials.map((materialId: string, index: number) => (
                  <Badge key={materialId} variant="outline" className="gap-1">
                    <TestTube className="h-3 w-3" />
                    Material {index + 1}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">Ninguna seleccionada</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Parámetros Técnicos */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Thermometer className="h-5 w-5" />
              Temperaturas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Zona 1:</span>
              <span className="text-sm font-medium">{data.temperatures.zona1}°C</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Zona 2:</span>
              <span className="text-sm font-medium">{data.temperatures.zona2}°C</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Zona 3:</span>
              <span className="text-sm font-medium">{data.temperatures.zona3}°C</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Boquilla:</span>
              <span className="text-sm font-medium">{data.temperatures.boquilla}°C</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Molde:</span>
              <span className="text-sm font-medium">{data.temperatures.molde}°C</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Gauge className="h-5 w-5" />
              Presiones
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Inyección:</span>
              <span className="text-sm font-medium">{data.pressures.inyeccion} bar</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Mantenimiento:</span>
              <span className="text-sm font-medium">{data.pressures.mantenimiento} bar</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Contrapresión:</span>
              <span className="text-sm font-medium">{data.pressures.contrapresion} bar</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="h-5 w-5" />
              Tiempos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Inyección:</span>
              <span className="text-sm font-medium">{data.times.inyeccion}s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Enfriamiento:</span>
              <span className="text-sm font-medium">{data.times.enfriamiento}s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Ciclo Total:</span>
              <span className="text-sm font-medium">{data.times.ciclo_total}s</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Zap className="h-5 w-5" />
              Velocidades
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Inyección:</span>
              <span className="text-sm font-medium">{data.speeds.inyeccion}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Dosificación:</span>
              <span className="text-sm font-medium">{data.speeds.dosificacion}%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Validaciones */}
      <Card>
        <CardHeader>
          <CardTitle>Validaciones Automáticas</CardTitle>
          <CardDescription>Estado de la configuración actual</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {validations.map((validation) => (
              <div key={validation.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(validation.status)}
                  <div>
                    <p className="font-medium">{validation.title}</p>
                    <p className="text-sm text-muted-foreground">{validation.message}</p>
                  </div>
                </div>
                {getStatusBadge(validation.status)}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notas adicionales */}
      <Card>
        <CardHeader>
          <CardTitle>Notas y Observaciones</CardTitle>
          <CardDescription>Información adicional sobre estos parámetros</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="notes">Notas</Label>
            <Textarea
              id="notes"
              value={data.notes}
              onChange={(e) => onUpdate({ notes: e.target.value })}
              placeholder="Agrega cualquier información relevante sobre estos parámetros..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Alertas finales */}
      {validations.some((v) => v.status === "error") && (
        <Alert>
          <XCircle className="h-4 w-4" />
          <AlertDescription>
            Hay errores que deben corregirse antes de crear los parámetros. Revisa las validaciones anteriores.
          </AlertDescription>
        </Alert>
      )}

      {validations.some((v) => v.status === "warning") && !validations.some((v) => v.status === "error") && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Hay algunas advertencias. Puedes crear los parámetros, pero se recomienda revisar las configuraciones
            marcadas.
          </AlertDescription>
        </Alert>
      )}

      {validations.every((v) => v.status === "success") && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            ¡Excelente! Todos los parámetros están correctamente configurados y listos para ser creados.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
