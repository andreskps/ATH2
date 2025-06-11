"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, ArrowRight, Users, User, Search, Star, AlertTriangle, Plus, Settings } from "lucide-react"
import type { TurnoWizardData } from "./turno-wizard"
import { getEmpleados } from "@/lib/data/empleados"
import { equipos } from "@/lib/data/turnos"

interface TurnoWizardStep2Props {
  data: TurnoWizardData
  updateData: (data: Partial<TurnoWizardData>) => void
  onNext: () => void
  onPrev: () => void
}

export default function TurnoWizardStep2({ data, updateData, onNext, onPrev }: TurnoWizardStep2Props) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedOperarios, setSelectedOperarios] = useState<string[]>(data.operarios)
  const [selectedEquipo, setSelectedEquipo] = useState<string>(data.equipoId || "")
  const [selectedSupervisor, setSelectedSupervisor] = useState<string>(data.supervisor || "")
  const [modoAsignacion, setModoAsignacion] = useState<"equipo" | "manual">(data.equipoId ? "equipo" : "manual")
  const [operariosAdicionales, setOperariosAdicionales] = useState<string[]>([])

  const empleados = getEmpleados()

  // Filtrar supervisores y operarios
  const supervisores = empleados.filter(
    (emp) => emp.cargo?.toLowerCase().includes("supervisor") || emp.departamento?.toLowerCase().includes("supervisor"),
  )

  const operarios = empleados.filter(
    (emp) => emp.cargo?.toLowerCase().includes("operador") || emp.cargo?.toLowerCase().includes("operario"),
  )

  // Filtrar operarios por búsqueda
  const operariosFiltrados = operarios.filter(
    (operario) =>
      operario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      operario.apellido?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      operario.cargo?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Obtener operarios que no están en el equipo seleccionado
  const operariosDisponiblesParaAñadir = operarios.filter((operario) => {
    const equipoSeleccionado = equipos.find((e) => e.id === selectedEquipo)
    const operariosDelEquipo = equipoSeleccionado?.operarios || []
    return (
      !operariosDelEquipo.includes(operario.id.toString()) && !operariosAdicionales.includes(operario.id.toString())
    )
  })

  // Manejar cambio de modo
  const handleModoChange = (modo: "equipo" | "manual") => {
    setModoAsignacion(modo)
    if (modo === "equipo") {
      // Limpiar selección manual
      setSelectedOperarios([])
      setSelectedSupervisor("")
    } else {
      // Limpiar selección de equipo
      setSelectedEquipo("")
      setOperariosAdicionales([])
    }
  }

  // Manejar selección de equipo
  const handleEquipoSelect = (equipoId: string) => {
    const equipo = equipos.find((e) => e.id === equipoId)
    if (equipo) {
      setSelectedEquipo(equipoId)
      setSelectedOperarios(equipo.operarios)
      setSelectedSupervisor(equipo.supervisor)
      setOperariosAdicionales([])
      updateData({
        tipoAsignacion: "equipo",
        equipoId: equipoId,
        supervisor: equipo.supervisor,
        operarios: equipo.operarios,
      })
    }
  }

  // Manejar selección individual de operarios
  const handleOperarioToggle = (operarioId: string) => {
    const newSelection = selectedOperarios.includes(operarioId)
      ? selectedOperarios.filter((id) => id !== operarioId)
      : [...selectedOperarios, operarioId]

    setSelectedOperarios(newSelection)
    updateData({
      tipoAsignacion: "individual",
      operarios: newSelection,
      supervisor: selectedSupervisor,
      equipoId: undefined,
    })
  }

  // Manejar operarios adicionales
  const handleOperarioAdicionalToggle = (operarioId: string) => {
    const newAdicionales = operariosAdicionales.includes(operarioId)
      ? operariosAdicionales.filter((id) => id !== operarioId)
      : [...operariosAdicionales, operarioId]

    setOperariosAdicionales(newAdicionales)

    const equipoSeleccionado = equipos.find((e) => e.id === selectedEquipo)
    const operariosDelEquipo = equipoSeleccionado?.operarios || []
    const operariosTotales = [...operariosDelEquipo, ...newAdicionales]

    updateData({
      operarios: operariosTotales,
    })
  }

  // Manejar selección de supervisor
  const handleSupervisorChange = (supervisorId: string) => {
    setSelectedSupervisor(supervisorId)
    updateData({
      supervisor: supervisorId,
    })
  }

  // Obtener información del empleado
  const getEmpleadoInfo = (empleadoId: string) => {
    return empleados.find((emp) => emp.id.toString() === empleadoId)
  }

  // Calcular carga de trabajo (simulado)
  const getCargaTrabajo = (empleadoId: string) => {
    const cargas = ["Baja", "Media", "Alta"]
    return cargas[Math.floor(Math.random() * cargas.length)]
  }

  const getColorCarga = (carga: string) => {
    switch (carga) {
      case "Baja":
        return "bg-green-100 text-green-800"
      case "Media":
        return "bg-yellow-100 text-yellow-800"
      case "Alta":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const canProceed =
    modoAsignacion === "equipo"
      ? selectedEquipo && selectedSupervisor
      : selectedOperarios.length > 0 && selectedSupervisor

  const handleNext = () => {
    if (canProceed) {
      onNext()
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Asignación de Personal</h2>
        <p className="text-muted-foreground">Elige cómo quieres asignar el personal para este turno</p>
      </div>

      {/* Selector de Modo */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Método de Asignación
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={modoAsignacion} onValueChange={handleModoChange} className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2 p-4 border rounded-lg">
              <RadioGroupItem value="equipo" id="equipo" />
              <Label htmlFor="equipo" className="flex items-center gap-2 cursor-pointer">
                <Users className="h-4 w-4" />
                <div>
                  <div className="font-medium">Usar Equipo Existente</div>
                  <div className="text-sm text-muted-foreground">Selecciona un equipo predefinido</div>
                </div>
              </Label>
            </div>
            <div className="flex items-center space-x-2 p-4 border rounded-lg">
              <RadioGroupItem value="manual" id="manual" />
              <Label htmlFor="manual" className="flex items-center gap-2 cursor-pointer">
                <User className="h-4 w-4" />
                <div>
                  <div className="font-medium">Asignación Manual</div>
                  <div className="text-sm text-muted-foreground">Selecciona supervisor y operarios</div>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Contenido según el modo seleccionado */}
      {modoAsignacion === "equipo" ? (
        <div className="space-y-6">
          {/* Selección de Equipo */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">1. Seleccionar Equipo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={selectedEquipo} onValueChange={handleEquipoSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un equipo..." />
                </SelectTrigger>
                <SelectContent>
                  {equipos.map((equipo) => {
                    const supervisor = getEmpleadoInfo(equipo.supervisor)
                    return (
                      <SelectItem key={equipo.id} value={equipo.id}>
                        <div className="flex items-center justify-between w-full">
                          <div>
                            <div className="font-medium">{equipo.nombre}</div>
                            <div className="text-sm text-muted-foreground">
                              {supervisor?.nombre} {supervisor?.apellido} • {equipo.operarios.length} operarios
                            </div>
                          </div>
                          <Badge variant="outline">{equipo.area}</Badge>
                        </div>
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>

              {/* Vista previa del equipo seleccionado */}
              {selectedEquipo && (
                <Card className="bg-muted/50">
                  <CardContent className="p-4">
                    {(() => {
                      const equipo = equipos.find((e) => e.id === selectedEquipo)
                      const supervisor = equipo ? getEmpleadoInfo(equipo.supervisor) : null

                      return equipo ? (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold">{equipo.nombre}</h4>
                            <Badge>{equipo.area}</Badge>
                          </div>

                          {supervisor && (
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>
                                  {supervisor.nombre[0]}
                                  {supervisor.apellido?.[0]}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium">
                                  {supervisor.nombre} {supervisor.apellido}
                                </p>
                                <p className="text-xs text-muted-foreground">Supervisor • {supervisor.cargo}</p>
                              </div>
                            </div>
                          )}

                          <div>
                            <p className="text-sm font-medium mb-2">Operarios ({equipo.operarios.length}):</p>
                            <div className="flex flex-wrap gap-2">
                              {equipo.operarios.map((operarioId) => {
                                const operario = getEmpleadoInfo(operarioId)
                                return operario ? (
                                  <Badge key={operarioId} variant="secondary">
                                    {operario.nombre} {operario.apellido}
                                  </Badge>
                                ) : null
                              })}
                            </div>
                          </div>
                        </div>
                      ) : null
                    })()}
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>

          {/* Operarios Adicionales */}
          {selectedEquipo && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  2. Operarios Adicionales (Opcional)
                  <Badge variant="outline">
                    <Plus className="h-3 w-3 mr-1" />
                    {operariosAdicionales.length} adicionales
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar operarios para añadir..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto">
                  {operariosDisponiblesParaAñadir
                    .filter(
                      (operario) =>
                        operario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        operario.apellido?.toLowerCase().includes(searchTerm.toLowerCase()),
                    )
                    .map((operario) => {
                      const carga = getCargaTrabajo(operario.id.toString())
                      const isSelected = operariosAdicionales.includes(operario.id.toString())

                      return (
                        <div
                          key={operario.id}
                          className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50 ${
                            isSelected ? "bg-primary/5 border-primary" : ""
                          }`}
                          onClick={() => handleOperarioAdicionalToggle(operario.id.toString())}
                        >
                          <Checkbox checked={isSelected} onChange={() => {}} />
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {operario.nombre[0]}
                              {operario.apellido?.[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="text-sm font-medium">
                              {operario.nombre} {operario.apellido}
                            </p>
                            <div className="flex items-center gap-2">
                              <p className="text-xs text-muted-foreground">{operario.cargo}</p>
                              <Badge className={getColorCarga(carga)} variant="outline" size="sm">
                                {carga}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                </div>

                {operariosAdicionales.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2">Operarios adicionales seleccionados:</p>
                    <div className="flex flex-wrap gap-2">
                      {operariosAdicionales.map((operarioId) => {
                        const operario = getEmpleadoInfo(operarioId)
                        return operario ? (
                          <Badge key={operarioId} variant="secondary">
                            <Plus className="h-3 w-3 mr-1" />
                            {operario.nombre} {operario.apellido}
                          </Badge>
                        ) : null
                      })}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {/* Selección Manual */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">1. Seleccionar Supervisor</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={selectedSupervisor} onValueChange={handleSupervisorChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un supervisor..." />
                </SelectTrigger>
                <SelectContent>
                  {supervisores.map((supervisor) => (
                    <SelectItem key={supervisor.id} value={supervisor.id.toString()}>
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">
                            {supervisor.nombre[0]}
                            {supervisor.apellido?.[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <span className="font-medium">
                            {supervisor.nombre} {supervisor.apellido}
                          </span>
                          <span className="text-sm text-muted-foreground ml-2">• {supervisor.cargo}</span>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {selectedSupervisor && (
                <Card className="bg-muted/50">
                  <CardContent className="p-4">
                    {(() => {
                      const supervisor = getEmpleadoInfo(selectedSupervisor)
                      return supervisor ? (
                        <div className="flex items-center space-x-3">
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
                          <Badge variant="outline">Supervisor</Badge>
                        </div>
                      ) : null
                    })()}
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                2. Seleccionar Operarios
                <Badge variant="outline">{selectedOperarios.length} seleccionados</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar operarios..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-80 overflow-y-auto">
                {operariosFiltrados.map((operario) => {
                  const carga = getCargaTrabajo(operario.id.toString())
                  const isSelected = selectedOperarios.includes(operario.id.toString())

                  return (
                    <div
                      key={operario.id}
                      className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50 ${
                        isSelected ? "bg-primary/5 border-primary" : ""
                      }`}
                      onClick={() => handleOperarioToggle(operario.id.toString())}
                    >
                      <Checkbox checked={isSelected} onChange={() => {}} />
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {operario.nombre[0]}
                          {operario.apellido?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">
                            {operario.nombre} {operario.apellido}
                          </p>
                          <div className="flex items-center space-x-1">
                            <Badge className={getColorCarga(carga)} variant="outline" size="sm">
                              {carga}
                            </Badge>
                            {carga === "Alta" && <AlertTriangle className="h-3 w-3 text-amber-500" />}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-muted-foreground">{operario.cargo}</p>
                          <div className="flex items-center">
                            <Star className="h-3 w-3 text-yellow-400 mr-1" />
                            <span className="text-xs text-muted-foreground">{Math.floor(Math.random() * 3) + 3}/5</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {selectedOperarios.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">Operarios seleccionados:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedOperarios.map((operarioId) => {
                      const operario = getEmpleadoInfo(operarioId)
                      return operario ? (
                        <Badge key={operarioId} variant="secondary">
                          {operario.nombre} {operario.apellido}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="ml-1 h-4 w-4 p-0"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleOperarioToggle(operarioId)
                            }}
                          >
                            ×
                          </Button>
                        </Badge>
                      ) : null
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Botones de navegación */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Anterior
        </Button>
        <Button onClick={handleNext} disabled={!canProceed}>
          Siguiente
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
