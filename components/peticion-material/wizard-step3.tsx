"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle, AlertTriangle, XCircle, Package, FileText, Send, Save } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import type { WizardData } from "./peticion-material-wizard"

interface Props {
  data: WizardData
  onUpdate: (data: Partial<WizardData>) => void
  onPrevious: () => void
}

export function WizardStep3({ data, onUpdate, onPrevious }: Props) {
  const [notasGenerales, setNotasGenerales] = useState(data.notasGenerales || "")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const getEstadoStock = (cantidadSolicitada: number, stockDisponible: number) => {
    if (cantidadSolicitada > stockDisponible) return "insuficiente"
    if (cantidadSolicitada > stockDisponible * 0.8) return "bajo"
    return "suficiente"
  }

  const getIconoEstado = (estado: string) => {
    switch (estado) {
      case "suficiente":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "bajo":
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />
      case "insuficiente":
        return <XCircle className="w-4 h-4 text-red-600" />
      default:
        return null
    }
  }

  const getBadgeEstado = (estado: string) => {
    switch (estado) {
      case "suficiente":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Suficiente</Badge>
      case "bajo":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Stock Bajo</Badge>
      case "insuficiente":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Insuficiente</Badge>
      default:
        return null
    }
  }

  const validaciones = [
    {
      titulo: "Orden de producción seleccionada",
      valida: !!data.ordenProduccion,
      mensaje: data.ordenProduccion
        ? `${data.ordenProduccion.id} - ${data.ordenProduccion.producto}`
        : "No seleccionada",
    },
    {
      titulo: "Materiales agregados",
      valida: data.materiales.length > 0,
      mensaje: `${data.materiales.length} ${data.materiales.length === 1 ? "material agregado" : "materiales agregados"}`,
    },
    {
      titulo: "Lotes seleccionados",
      valida: data.materiales.every((m) => m.lote),
      mensaje: data.materiales.every((m) => m.lote)
        ? "Todos los materiales tienen lote asignado"
        : "Algunos materiales no tienen lote",
    },
    {
      titulo: "Cantidades especificadas",
      valida: data.materiales.every((m) => m.cantidadSolicitada > 0),
      mensaje: data.materiales.every((m) => m.cantidadSolicitada > 0)
        ? "Todas las cantidades están especificadas"
        : "Algunas cantidades están vacías",
    },
  ]

  const todasValidacionesCorrectas = validaciones.every((v) => v.valida)

  const handleGuardarBorrador = async () => {
    setIsSubmitting(true)
    try {
      // Simular guardado
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Borrador guardado",
        description: "La petición se ha guardado como borrador correctamente.",
      })

      router.push("/peticion-material")
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo guardar el borrador. Inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEnviarPeticion = async () => {
    if (!todasValidacionesCorrectas) {
      toast({
        title: "Validación incompleta",
        description: "Por favor completa todos los campos requeridos antes de enviar.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      // Simular envío
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Petición enviada",
        description: "La petición de material se ha enviado correctamente para aprobación.",
      })

      router.push("/peticion-material")
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo enviar la petición. Inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Resumen de la Petición</h3>
        <p className="text-muted-foreground">Revisa todos los detalles antes de enviar la petición de material.</p>
      </div>

      {/* Información de la orden */}
      {data.ordenProduccion && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Información de la Orden
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-muted-foreground">Número de orden:</span>
                <p className="font-semibold">{data.ordenProduccion.id}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Producto:</span>
                <p className="font-semibold">{data.ordenProduccion.producto}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Cantidad a producir:</span>
                <p className="font-semibold">{data.ordenProduccion.cantidad.toLocaleString()} unidades</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Fecha programada:</span>
                <p className="font-semibold">{new Date(data.ordenProduccion.fechaProgramada).toLocaleDateString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Validaciones */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Validaciones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {validaciones.map((validacion, index) => (
              <div key={index} className="flex items-center gap-3">
                {validacion.valida ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
                <div className="flex-1">
                  <p className="font-medium">{validacion.titulo}</p>
                  <p className="text-sm text-muted-foreground">{validacion.mensaje}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tabla de materiales */}
      <Card>
        <CardHeader>
          <CardTitle>Materiales Solicitados</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Materia Prima</TableHead>
                <TableHead>Lote</TableHead>
                <TableHead>Proveedor</TableHead>
                <TableHead>Cantidad</TableHead>
                <TableHead>Stock Disponible</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.materiales.map((material, index) => {
                const estado = getEstadoStock(material.cantidadSolicitada, material.stockDisponible)
                return (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{material.materiaPrima}</TableCell>
                    <TableCell>{material.lote || "-"}</TableCell>
                    <TableCell>{material.proveedor || "-"}</TableCell>
                    <TableCell>
                      {material.cantidadSolicitada} {material.unidad}
                    </TableCell>
                    <TableCell>
                      {material.stockDisponible} {material.unidad}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getIconoEstado(estado)}
                        {getBadgeEstado(estado)}
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Notas generales */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Notas Generales
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="notas">Notas adicionales para la petición</Label>
            <Textarea
              id="notas"
              value={notasGenerales}
              onChange={(e) => {
                setNotasGenerales(e.target.value)
                onUpdate({ notasGenerales: e.target.value })
              }}
              placeholder="Agrega cualquier información adicional relevante para esta petición..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Botones de acción */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <Button variant="outline" onClick={onPrevious}>
          Anterior
        </Button>

        <div className="flex gap-2">
          <Button variant="outline" onClick={handleGuardarBorrador} disabled={isSubmitting}>
            <Save className="w-4 h-4 mr-2" />
            {isSubmitting ? "Guardando..." : "Guardar como Borrador"}
          </Button>
          <Button
            onClick={handleEnviarPeticion}
            disabled={!todasValidacionesCorrectas || isSubmitting}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Send className="w-4 h-4 mr-2" />
            {isSubmitting ? "Enviando..." : "Enviar Petición"}
          </Button>
        </div>
      </div>

      {!todasValidacionesCorrectas && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            <p className="text-yellow-800 font-medium">Validación incompleta</p>
          </div>
          <p className="text-yellow-700 text-sm mt-1">
            Por favor completa todos los campos requeridos antes de enviar la petición.
          </p>
        </div>
      )}
    </div>
  )
}
