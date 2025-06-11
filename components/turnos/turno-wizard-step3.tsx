"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, CheckCircle, AlertTriangle, Calendar, Clock, MapPin, Users, FileText, Save } from "lucide-react"
import type { TurnoWizardData } from "./turno-wizard"
import { getEmpleados } from "@/lib/data/empleados"
import { equipos } from "@/lib/data/turnos"

interface TurnoWizardStep3Props {
  data: TurnoWizardData
  updateData: (data: Partial<TurnoWizardData>) => void
  onPrev: () => void
  onFinish: () => void
}

export default function TurnoWizardStep3({ data, updateData, onPrev, onFinish }: TurnoWizardStep3Props) {
  const [observaciones, setObservaciones] = useState(data.observaciones || "")
  const [estado, setEstado] = useState<"borrador" | "confirmado">(data.estado)

  const empleados = getEmpleados()

  // Obtener información del empleado
  const getEmpleadoInfo = (empleadoId: string) => {
    return empleados.find((emp) => emp.id.toString() === empleadoId)
  }

  // Obtener información del equipo si aplica
  const equipoInfo = data.equipoId ? equipos.find((e) => e.id === data.equipoId) : null

  // Calcular duración total
  const calcularDuracion = () => {
    if (data.fechaInicio && data.fechaFin) {
      const inicio = new Date(data.fechaInicio)
      const fin = new Date(data.fechaFin)
      const diffTime = Math.abs(fin.getTime() - inicio.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
      return diffDays
    }
    return 0
  }

  // Generar advertencias
  const generarAdvertencias = () => {
    const advertencias = []

    // Verificar sobreasignación (simulado)
    if (data.operarios.length > 5) {
      advertencias.push("Equipo muy grande: Más de 5 operarios asignados")
    }

    // Verificar conflictos de horarios (simulado)
    if (Math.random() > 0.7) {
      advertencias.push("Posible conflicto: Algunos operarios tienen otros turnos programados")
    }

    // Verificar disponibilidad de área
    if (data.area === "Mantenimiento") {
      advertencias.push("Área en mantenimiento: Verificar disponibilidad")
    }

    return advertencias
  }

  const advertencias = generarAdvertencias()
  const duracion = calcularDuracion()
  const supervisor = data.supervisor ? getEmpleadoInfo(data.supervisor) : null

  const handleFinish = () => {
    updateData({
      observaciones,
      estado,
    })
    onFinish()
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Confirmación del Turno</h2>
        <p className="text-muted-foreground">Revisa toda la información antes de crear el turno</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Resumen del turno */}
        <div className="lg:col-span-2 space-y-6">
          {/* Información básica */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Información Básica
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Categoría</p>
                  <Badge className="mt-1">Turno {data.categoria}</Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Área</p>
                  <div className="flex items-center mt-1">
                    <MapPin className="mr-1 h-4 w-4" />
                    <span>{data.area}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Fecha de Inicio</p>
                  <p className="mt-1">{new Date(data.fechaInicio).toLocaleDateString("es-ES")}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Fecha de Fin</p>
                  <p className="mt-1">{new Date(data.fechaFin).toLocaleDateString("es-ES")}</p>
                </div>
              </div>

              {data.horario && (
                <div className="bg-muted/50 p-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4" />
                      <span className="font-medium">
                        Horario: {data.horario.inicio} - {data.horario.fin}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {duracion} {duracion === 1 ? "día" : "días"} • {data.horario.duracion * duracion} horas totales
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Personal asignado */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Personal Asignado
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Mostrar equipo o asignación individual */}
              {equipoInfo ? (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">Equipo: {equipoInfo.nombre}</h3>
                    <Badge variant="outline">{data.tipoAsignacion}</Badge>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">Asignación Individual</h3>
                  <Badge variant="outline">{data.tipoAsignacion}</Badge>
                </div>
              )}

              {/* Supervisor */}
              {supervisor && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Supervisor</p>
                  <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                    <Avatar>
                      <AvatarFallback>
                        {supervisor.nombre[0]}
                        {supervisor.apellido?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">
                        {supervisor.nombre} {supervisor.apellido}
                      </p>
                      <p className="text-sm text-muted-foreground">{supervisor.cargo}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Operarios */}
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Operarios ({data.operarios.length})</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {data.operarios.map((operarioId) => {
                    const operario = getEmpleadoInfo(operarioId)
                    return operario ? (
                      <div key={operarioId} className="flex items-center space-x-2 p-2 bg-muted/50 rounded">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {operario.nombre[0]}
                            {operario.apellido?.[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">
                            {operario.nombre} {operario.apellido}
                          </p>
                          <p className="text-xs text-muted-foreground">{operario.cargo}</p>
                        </div>
                      </div>
                    ) : null
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Observaciones */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Observaciones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Agregar observaciones o notas especiales para este turno..."
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
                rows={3}
              />
            </CardContent>
          </Card>
        </div>

        {/* Panel lateral */}
        <div className="space-y-6">
          {/* Advertencias */}
          {advertencias.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-amber-600">
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  Advertencias
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {advertencias.map((advertencia, index) => (
                  <Alert key={index} variant="warning">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription className="text-sm">{advertencia}</AlertDescription>
                  </Alert>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Estado del turno */}
          <Card>
            <CardHeader>
              <CardTitle>Estado del Turno</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="estado"
                    value="borrador"
                    checked={estado === "borrador"}
                    onChange={(e) => setEstado(e.target.value as "borrador")}
                  />
                  <div>
                    <p className="font-medium">Guardar como Borrador</p>
                    <p className="text-xs text-muted-foreground">Podrás editarlo más tarde</p>
                  </div>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="estado"
                    value="confirmado"
                    checked={estado === "confirmado"}
                    onChange={(e) => setEstado(e.target.value as "confirmado")}
                  />
                  <div>
                    <p className="font-medium">Confirmar Turno</p>
                    <p className="text-xs text-muted-foreground">El turno será notificado al personal</p>
                  </div>
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Resumen rápido */}
          <Card>
            <CardHeader>
              <CardTitle>Resumen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Duración:</span>
                <span>
                  {duracion} {duracion === 1 ? "día" : "días"}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Personal:</span>
                <span>{data.operarios.length + (supervisor ? 1 : 0)} personas</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Horas totales:</span>
                <span>{data.horario ? data.horario.duracion * duracion : 0}h</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Botones de navegación */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Anterior
        </Button>
        <div className="space-x-2">
          {estado === "borrador" && (
            <Button variant="outline" onClick={handleFinish}>
              <Save className="mr-2 h-4 w-4" />
              Guardar Borrador
            </Button>
          )}
          <Button onClick={handleFinish}>
            <CheckCircle className="mr-2 h-4 w-4" />
            {estado === "confirmado" ? "Confirmar Turno" : "Crear Turno"}
          </Button>
        </div>
      </div>
    </div>
  )
}
