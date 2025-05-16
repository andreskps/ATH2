"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import type { Orden } from "@/lib/data/ordenes"
import { maquinaria } from "@/lib/data/maquinaria"
import {
  getDetallesProductoParaProgramar,
  verificarDisponibilidadMaquina,
  verificarCompatibilidadMoldeMaquina,
  getMoldesDisponibles,
  getTurnos,
} from "@/lib/data/programacion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2, Factory, Calendar, Loader2 } from "lucide-react"

interface NuevaProgramacionFormProps {
  orden: Orden
  productosParaProgramar: any[]
  prioridad?: string
}

export default function NuevaProgramacionForm({
  orden,
  productosParaProgramar,
  prioridad = "5",
}: NuevaProgramacionFormProps) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    productoId: "",
    maquinaId: "",
    fechaInicio: "",
    fechaFin: "",
    turno: "mañana",
    observaciones: "",
    cantidadProgramada: 0,
    prioridad: prioridad,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const [detallesProducto, setDetallesProducto] = useState<any>(null)
  const [disponibilidadMaquina, setDisponibilidadMaquina] = useState<any>(null)
  const [operariosDisponibles, setOperariosDisponibles] = useState<any[]>([])
  const [moldesDisponibles, setMoldesDisponibles] = useState<any[]>(getMoldesDisponibles())
  const [turnos, setTurnos] = useState<any[]>(getTurnos())

  // Paso 1: Seleccionar producto
  const handleProductoChange = (productoId: string) => {
    // Obtener detalles del producto seleccionado
    let detalles = getDetallesProductoParaProgramar(orden.id, productoId)

    // Si no hay detalles (posiblemente porque es una orden de ejemplo), crear datos simulados
    if (!detalles) {
      const productoSeleccionado = productosParaProgramar.find((p) => p.productoId === productoId)
      if (productoSeleccionado) {
        detalles = {
          producto: {
            id: productoId,
            nombre: productoSeleccionado.nombre,
            moldeId: 1, // Asignar un molde por defecto
          },
          productoOrden: productoSeleccionado,
          molde: moldesDisponibles[0],
          cantidadInventario: 0,
          cantidadProduccion: 0,
          cantidadPendiente: productoSeleccionado.cantidadPendiente,
        }
      }
    }

    setDetallesProducto(detalles)
    setFormData({
      ...formData,
      productoId,
      cantidadProgramada: detalles?.cantidadPendiente || 0,
    })
  }

  // Paso 2: Seleccionar máquina y fechas
  const handleMaquinaChange = (maquinaId: string) => {
    setFormData({ ...formData, maquinaId })

    if (formData.fechaInicio && formData.fechaFin && formData.turno) {
      // Para máquinas de demostración, siempre mostrar como disponibles
      if (maquinaId.startsWith("demo-")) {
        setDisponibilidadMaquina({ disponible: true, mensaje: "Máquina de demostración disponible" })
      } else {
        const disponibilidad = verificarDisponibilidadMaquina(
          maquinaId,
          formData.fechaInicio,
          formData.fechaFin,
          formData.turno,
        )
        setDisponibilidadMaquina(disponibilidad)
      }
    }
  }

  const handleFechasChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })

    if (field === "fechaInicio" && formData.fechaFin && value > formData.fechaFin) {
      setFormData({ ...formData, [field]: value, fechaFin: value })
    }

    if (
      (formData.maquinaId && field === "fechaInicio" && formData.fechaFin && formData.turno) ||
      (field === "fechaFin" && formData.fechaInicio && formData.maquinaId && formData.turno)
    ) {
      const disponibilidad = verificarDisponibilidadMaquina(
        formData.maquinaId,
        field === "fechaInicio" ? value : formData.fechaInicio,
        field === "fechaFin" ? value : formData.fechaFin,
        formData.turno,
      )
      setDisponibilidadMaquina(disponibilidad)
    }
  }

  const handleTurnoChange = (turno: string) => {
    setFormData({ ...formData, turno })

    if (formData.fechaInicio && formData.maquinaId) {
      const disponibilidad = verificarDisponibilidadMaquina(
        formData.maquinaId,
        formData.fechaInicio,
        formData.fechaFin,
        turno,
      )
      setDisponibilidadMaquina(disponibilidad)

      const operarios = [] //getOperariosDisponiblesPorTurno(turno, formData.fechaInicio)
      setOperariosDisponibles(operarios)
    }
  }

  // Avanzar al siguiente paso
  const nextStep = () => {
    if (currentStep === 1 && !detallesProducto) return
    if (currentStep === 2 && (!formData.maquinaId || !formData.fechaInicio || !formData.fechaFin)) return

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  // Retroceder al paso anterior
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Función para confirmar la programación
  const confirmarProgramacion = async () => {
    // Evitar múltiples envíos
    if (isSubmitting) return

    setIsSubmitting(true)

    try {
      // Simulamos un proceso de guardado
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Marcamos como exitoso
      setIsSuccess(true)
    } catch (error) {
      console.error("Error al guardar la programación:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Enviar formulario - solo previene el comportamiento por defecto
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // No hacemos nada más aquí para evitar que se procese automáticamente
  }

  // Función para redirigir después de completar
  const handleComplete = () => {
    router.push("/programacion")
  }

  // Verificar compatibilidad entre molde y máquina
  const esCompatible =
    detallesProducto?.molde && formData.maquinaId
      ? formData.maquinaId.startsWith("demo-") ||
        verificarCompatibilidadMoldeMaquina(detallesProducto.molde.id, formData.maquinaId)
      : false

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Programar Producción</CardTitle>
          <CardDescription>Complete los siguientes pasos para programar la producción</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={`paso-${currentStep}`} className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger
                value="paso-1"
                className={currentStep === 1 ? "bg-primary text-primary-foreground" : ""}
                onClick={() => currentStep >= 1 && setCurrentStep(1)}
              >
                1. Producto
              </TabsTrigger>
              <TabsTrigger
                value="paso-2"
                className={currentStep === 2 ? "bg-primary text-primary-foreground" : ""}
                onClick={() => currentStep >= 2 && setCurrentStep(2)}
              >
                2. Máquina y Fechas
              </TabsTrigger>
              <TabsTrigger
                value="paso-3"
                className={currentStep === 3 ? "bg-primary text-primary-foreground" : ""}
                onClick={() => currentStep >= 3 && setCurrentStep(3)}
              >
                3. Confirmar
              </TabsTrigger>
            </TabsList>

            {/* Paso 1: Seleccionar producto */}
            <TabsContent value="paso-1" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="producto">Seleccione el producto a programar</Label>
                  <Select value={formData.productoId} onValueChange={handleProductoChange}>
                    <SelectTrigger id="producto">
                      <SelectValue placeholder="Seleccionar producto" />
                    </SelectTrigger>
                    <SelectContent>
                      {productosParaProgramar.map((producto) => (
                        <SelectItem key={producto.id} value={producto.productoId}>
                          {producto.nombre} ({producto.cantidadPendiente} unidades)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {detallesProducto && (
                  <div className="border rounded-lg p-4 space-y-4">
                    <h3 className="font-semibold">Detalles del producto</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Producto</p>
                        <p className="font-medium">{detallesProducto.producto.nombre}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Molde requerido</p>
                        <p className="font-medium">{detallesProducto.molde?.nombre || "No requiere molde"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Cantidad total</p>
                        <p className="font-medium">
                          {detallesProducto.productoOrden.cantidad || detallesProducto.productoOrden.cantidadTotal}{" "}
                          unidades
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Cantidad a producir</p>
                        <p className="font-medium">{detallesProducto.cantidadPendiente} unidades</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Stock disponible</p>
                        <p className="font-medium">{detallesProducto.cantidadInventario} unidades</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Estado</p>
                        <div className="flex items-center gap-2">
                          {detallesProducto.cantidadInventario > 0 && (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              {detallesProducto.cantidadInventario} de inventario
                            </Badge>
                          )}
                          {detallesProducto.cantidadProduccion > 0 && (
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              {detallesProducto.cantidadProduccion} a producir
                            </Badge>
                          )}
                          {detallesProducto.cantidadInventario === 0 && detallesProducto.cantidadProduccion === 0 && (
                            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                              Pendiente de programar
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="cantidadProgramada">Cantidad a programar</Label>
                      <Input
                        id="cantidadProgramada"
                        type="number"
                        min={1}
                        max={detallesProducto.cantidadPendiente}
                        value={formData.cantidadProgramada}
                        onChange={(e) =>
                          setFormData({ ...formData, cantidadProgramada: Number.parseInt(e.target.value) })
                        }
                        className="mt-1"
                      />
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Paso 2: Seleccionar máquina y fechas */}
            <TabsContent value="paso-2" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="maquina">Seleccione la máquina</Label>
                  <Select value={formData.maquinaId} onValueChange={handleMaquinaChange}>
                    <SelectTrigger id="maquina">
                      <SelectValue placeholder="Seleccionar máquina" />
                    </SelectTrigger>
                    <SelectContent>
                      {maquinaria.map((maquina) => (
                        <SelectItem key={maquina.id} value={maquina.id.toString()}>
                          {maquina.nombre} ({maquina.tipo})
                        </SelectItem>
                      ))}
                      {/* Máquinas de demostración adicionales */}
                      <SelectItem value="demo-1">Inyectora Rápida 2000 (Demostración)</SelectItem>
                      <SelectItem value="demo-2">Extrusora Industrial XL (Demostración)</SelectItem>
                      <SelectItem value="demo-3">Sopladora Automática Pro (Demostración)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {detallesProducto?.molde && formData.maquinaId && (
                  <Alert variant={esCompatible ? "default" : "destructive"}>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Compatibilidad de molde</AlertTitle>
                    <AlertDescription>
                      {esCompatible
                        ? `El molde ${detallesProducto.molde.nombre} es compatible con la máquina seleccionada.`
                        : `El molde ${detallesProducto.molde.nombre} NO es compatible con la máquina seleccionada.`}
                    </AlertDescription>
                  </Alert>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="fechaInicio">Fecha de inicio</Label>
                    <Input
                      id="fechaInicio"
                      type="date"
                      value={formData.fechaInicio}
                      onChange={(e) => handleFechasChange("fechaInicio", e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="fechaFin">Fecha de fin</Label>
                    <Input
                      id="fechaFin"
                      type="date"
                      value={formData.fechaFin}
                      onChange={(e) => handleFechasChange("fechaFin", e.target.value)}
                      min={formData.fechaInicio || new Date().toISOString().split("T")[0]}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="turno">Turno</Label>
                    <Select value={formData.turno} onValueChange={handleTurnoChange}>
                      <SelectTrigger id="turno">
                        <SelectValue placeholder="Seleccionar turno" />
                      </SelectTrigger>
                      <SelectContent>
                        {turnos.map((turno) => (
                          <SelectItem key={turno.id} value={turno.id}>
                            {turno.nombre} ({turno.horaInicio} - {turno.horaFin})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {formData.maquinaId && formData.fechaInicio && formData.fechaFin && disponibilidadMaquina && (
                  <Alert variant={disponibilidadMaquina.disponible ? "default" : "warning"}>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Disponibilidad de máquina</AlertTitle>
                    <AlertDescription className="flex flex-col gap-2">
                      {disponibilidadMaquina.disponible ? (
                        "La máquina está disponible en el rango de fechas seleccionado."
                      ) : (
                        <>
                          <p>
                            La máquina podría no estar disponible en el rango de fechas seleccionado. Hay posibles
                            conflictos con otras programaciones.
                          </p>
                          <p className="font-medium text-amber-600">
                            Para fines de demostración, puede continuar de todos modos.
                          </p>
                        </>
                      )}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </TabsContent>

            {/* Paso 4: Confirmar */}
            <TabsContent value="paso-3" className="space-y-4">
              {isSuccess ? (
                <div className="border rounded-lg p-8 text-center space-y-4">
                  <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-green-700">¡Programación creada con éxito!</h3>
                  <p className="text-muted-foreground">
                    La orden ha sido programada correctamente y ha pasado al estado "En Producción".
                  </p>
                  <div className="pt-4">
                    <Button onClick={handleComplete} className="w-full md:w-auto">
                      Volver a Programación
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="border rounded-lg p-6 space-y-6">
                  <h3 className="text-lg font-semibold">Resumen de la programación</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Factory className="h-5 w-5 text-primary" />
                        <h4 className="font-medium">Producto y Máquina</h4>
                      </div>

                      <div className="pl-7 space-y-2">
                        <div>
                          <p className="text-sm text-muted-foreground">Producto</p>
                          <p className="font-medium">
                            {detallesProducto?.producto.nombre} ({formData.cantidadProgramada} unidades)
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Máquina</p>
                          <p className="font-medium">
                            {formData.maquinaId.startsWith("demo-")
                              ? formData.maquinaId === "demo-1"
                                ? "Inyectora Rápida 2000 (Demostración)"
                                : formData.maquinaId === "demo-2"
                                  ? "Extrusora Industrial XL (Demostración)"
                                  : "Sopladora Automática Pro (Demostración)"
                              : maquinaria.find((m) => m.id.toString() === formData.maquinaId)?.nombre}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Molde</p>
                          <p className="font-medium">{detallesProducto?.molde?.nombre || "No requiere molde"}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Prioridad</p>
                        <p className="font-medium">
                          {formData.prioridad}{" "}
                          {Number(formData.prioridad) <= 3
                            ? "(Alta)"
                            : Number(formData.prioridad) >= 8
                              ? "(Baja)"
                              : "(Media)"}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        <h4 className="font-medium">Fechas y Turno</h4>
                      </div>

                      <div className="pl-7 space-y-2">
                        <div>
                          <p className="text-sm text-muted-foreground">Fecha de inicio</p>
                          <p className="font-medium">{formData.fechaInicio}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Fecha de fin</p>
                          <p className="font-medium">{formData.fechaFin}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Turno</p>
                          <p className="font-medium">
                            {turnos.find((t) => t.id === formData.turno)?.nombre || formData.turno}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-primary" />
                        <h4 className="font-medium">Observaciones</h4>
                      </div>

                      <div className="pl-7">
                        <p>{formData.observaciones || "Sin observaciones"}</p>
                      </div>
                    </div>
                  </div>

                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Importante</AlertTitle>
                    <AlertDescription>
                      Al confirmar esta programación, la orden pasará a estado "En Producción" y se registrará la
                      asignación de recursos.
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 1 || isSuccess}>
            Anterior
          </Button>

          {currentStep < 3 ? (
            <Button
              type="button"
              onClick={nextStep}
              disabled={
                (currentStep === 1 && !detallesProducto) ||
                (currentStep === 2 && (!formData.maquinaId || !formData.fechaInicio || !formData.fechaFin))
              }
            >
              Siguiente
            </Button>
          ) : isSuccess ? (
            <Button type="button" onClick={handleComplete}>
              Volver a Programación
            </Button>
          ) : (
            <Button type="button" onClick={confirmarProgramacion} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Procesando...
                </>
              ) : (
                "Confirmar y Enviar a Producción"
              )}
            </Button>
          )}
        </CardFooter>
      </Card>
    </form>
  )
}
