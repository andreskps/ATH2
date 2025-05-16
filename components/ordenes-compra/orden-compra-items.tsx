"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { OrdenCompraItem } from "@/lib/data/ordenes-compra"
import { formatCurrency } from "@/lib/utils"
import { ArchiveIcon, CheckIcon, XIcon } from "lucide-react"

interface OrdenCompraItemsProps {
  items: OrdenCompraItem[]
  moneda: string
}

export function OrdenCompraItems({ items, moneda }: OrdenCompraItemsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Materias Primas</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Materia Prima</TableHead>
              <TableHead className="text-right">Cantidad</TableHead>
              <TableHead className="text-right">Recibido</TableHead>
              <TableHead className="text-right">Pendiente</TableHead>
              <TableHead className="text-right">Precio Unit.</TableHead>
              <TableHead className="text-right">Subtotal</TableHead>
              <TableHead className="text-center">Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => {
              const pendiente = item.cantidad - item.cantidadRecibida
              const isCompleto = pendiente === 0
              const isParcial = item.cantidadRecibida > 0 && pendiente > 0

              return (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.materiaPrimaNombre}</TableCell>
                  <TableCell className="text-right">
                    {item.cantidad} {item.unidad}
                  </TableCell>
                  <TableCell className="text-right">
                    {item.cantidadRecibida} {item.unidad}
                  </TableCell>
                  <TableCell className="text-right">
                    {pendiente} {item.unidad}
                  </TableCell>
                  <TableCell className="text-right">{formatCurrency(item.precioUnitario, moneda)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(item.subtotal, moneda)}</TableCell>
                  <TableCell className="text-center">
                    {isCompleto ? (
                      <div className="flex justify-center">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                          <CheckIcon className="mr-1 h-3 w-3" /> Completado
                        </span>
                      </div>
                    ) : isParcial ? (
                      <div className="flex justify-center">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                          <ArchiveIcon className="mr-1 h-3 w-3" /> Parcial
                        </span>
                      </div>
                    ) : (
                      <div className="flex justify-center">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                          <XIcon className="mr-1 h-3 w-3" /> Pendiente
                        </span>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              )
            })}

            {/* Total row */}
            <TableRow>
              <TableCell colSpan={5} className="text-right font-bold">
                Total:
              </TableCell>
              <TableCell className="text-right font-bold">
                {formatCurrency(
                  items.reduce((sum, item) => sum + item.subtotal, 0),
                  moneda,
                )}
              </TableCell>
              <TableCell />
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
