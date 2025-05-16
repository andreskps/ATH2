"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import type { RecepcionMaterial } from "@/lib/data/ordenes-compra"
import { formatDate } from "@/lib/utils"
import { CalendarIcon, UserIcon } from "lucide-react"
import Link from "next/link"

interface RecepcionDetalleProps {
  recepcion: RecepcionMaterial
}

export function RecepcionDetalle({ recepcion }: RecepcionDetalleProps) {
  return (
    <div className="space-y-6">
      {/* Información general de la recepción */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex justify-between items-center">
            <span>Recepción de Material</span>
            {recepcion.esCompleta ? (
              <Badge className="bg-green-100 text-green-800">Recepción Completa</Badge>
            ) : (
              <Badge variant="secondary">Recepción Parcial</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Orden de Compra</h3>
                <p className="text-lg font-semibold">
                  <Link href={`/ordenes-compra/${recepcion.ordenCompraId}`} className="hover:underline">
                    {recepcion.ordenNumero}
                  </Link>
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Proveedor</h3>
                <p className="text-lg font-semibold">{recepcion.proveedorNombre}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Fecha de recepción</h3>
                <p className="text-lg font-semibold flex items-center">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formatDate(recepcion.fecha)}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Responsable</h3>
                <p className="text-lg font-semibold flex items-center">
                  <UserIcon className="mr-2 h-4 w-4" />
                  {recepcion.usuarioNombre}
                </p>
              </div>
            </div>
          </div>

          {/* Observaciones */}
          {recepcion.observaciones && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Observaciones</h3>
              <div className="bg-muted p-3 rounded-md text-sm">{recepcion.observaciones}</div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Materiales recibidos */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Materiales Recibidos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Material</TableHead>
                <TableHead className="text-right">Cantidad Recibida</TableHead>
                <TableHead>Unidad</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recepcion.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.materiaPrimaNombre}</TableCell>
                  <TableCell className="text-right">{item.cantidadRecibida}</TableCell>
                  <TableCell>{item.unidad}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
