"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import type { RecepcionMaterial } from "@/lib/data/ordenes-compra"
import { formatDate } from "@/lib/utils"
import { Eye } from "lucide-react"
import Link from "next/link"
import { RecepcionesTableHeader } from "./recepciones-table-header"

interface RecepcionesTableProps {
  recepciones: RecepcionMaterial[]
}

export function RecepcionesTable({ recepciones }: RecepcionesTableProps) {
  if (recepciones.length === 0) {
    return (
      <div className="text-center py-10 border rounded-lg">
        <p className="text-muted-foreground">No se encontraron recepciones de material.</p>
      </div>
    )
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <RecepcionesTableHeader />
        <TableBody>
          {recepciones.map((recepcion) => (
            <TableRow key={recepcion.id}>
              <TableCell className="font-medium">
                <Link href={`/ordenes-compra/${recepcion.ordenCompraId}`} className="hover:underline">
                  {recepcion.ordenNumero}
                </Link>
              </TableCell>
              <TableCell>{recepcion.proveedorNombre}</TableCell>
              <TableCell>{formatDate(recepcion.fecha)}</TableCell>
              <TableCell>{recepcion.usuarioNombre}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {recepcion.items.slice(0, 2).map((item) => (
                    <Badge key={item.id} variant="outline" className="mr-1">
                      {item.cantidadRecibida} {item.unidad} {item.materiaPrimaNombre}
                    </Badge>
                  ))}
                  {recepcion.items.length > 2 && <Badge variant="outline">+{recepcion.items.length - 2} más</Badge>}
                </div>
              </TableCell>
              <TableCell>
                {recepcion.esCompleta ? (
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Completa</Badge>
                ) : (
                  <Badge variant="secondary">Parcial</Badge>
                )}
              </TableCell>
              <TableCell className="text-right">
                <Link href={`/ordenes-compra/recepciones/${recepcion.id}`}>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Ver detalles
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
