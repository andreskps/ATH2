"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Package, User, Calendar, Clock, FileText, CheckCircle, AlertTriangle, XCircle } from "lucide-react"
import type { PeticionMaterial } from "@/lib/data/peticion-material"

interface Props {
  peticion: PeticionMaterial
}

export function PeticionMaterialDetalle({ peticion }: Props) {
  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "pendiente":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <Clock className="w-3 h-3 mr-1" />
            Pendiente
          </Badge>
        )
      case "aprobada":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Aprobada
          </Badge>
        )
      case "rechazada":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <XCircle className="w-3 h-3 mr-1" />
            Rechazada
          </Badge>
        )
      default:
        return null
    }
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

  const getBadgeEstadoItem = (estado: string) => {
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

  return (
    <div className="space-y-6">
      {/* Estado y información general */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Estado de la Petición
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Estado actual:</span>
              {getEstadoBadge(peticion.estado)}
            </div>

            {peticion.estado === "rechazada" && peticion.motivoRechazo && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-800 font-medium">Motivo de rechazo:</p>
                <p className="text-red-700 text-sm">{peticion.motivoRechazo}</p>
              </div>
            )}

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Solicitante:</span>
                <span className="font-medium">{peticion.solicitante}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Fecha de solicitud:</span>
                <span className="font-medium">{new Date(peticion.fechaSolicitud).toLocaleDateString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Información de la Orden
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="text-sm text-muted-foreground">Número de orden:</span>
              <p className="font-semibold">{peticion.ordenProduccion}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Producto:</span>
              <p className="font-semibold">{peticion.producto}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Cantidad a producir:</span>
              <p className="font-semibold">{peticion.cantidadProducir.toLocaleString()} unidades</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Fecha programada:</span>
              <p className="font-semibold">{new Date(peticion.fechaProgramada).toLocaleDateString()}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Timeline visual */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Timeline de la Petición
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {peticion.historial.map((evento, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{evento.accion}</span>
                    <span className="text-sm text-muted-foreground">por {evento.usuario}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{new Date(evento.fecha).toLocaleString()}</p>
                  {evento.detalles && <p className="text-sm text-muted-foreground mt-1">{evento.detalles}</p>}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Materiales solicitados */}
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
                <TableHead>Vencimiento</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {peticion.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.materiaPrima}</TableCell>
                  <TableCell>{item.lote}</TableCell>
                  <TableCell>{item.proveedor}</TableCell>
                  <TableCell>
                    {item.cantidadSolicitada} {item.unidad}
                  </TableCell>
                  <TableCell>
                    {item.stockDisponible} {item.unidad}
                  </TableCell>
                  <TableCell>{new Date(item.fechaVencimiento).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getIconoEstado(item.estado)}
                      {getBadgeEstadoItem(item.estado)}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Notas generales */}
      {peticion.notasGenerales && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Notas Generales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{peticion.notasGenerales}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
