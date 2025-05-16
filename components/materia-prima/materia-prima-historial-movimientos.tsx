"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatDate } from "@/lib/utils"
import { getMovimientosMateriaPrima } from "@/lib/data/materia-prima"
import type { MovimientoMateriaPrima } from "@/lib/data/materia-prima"

interface MateriaPrimaHistorialMovimientosProps {
  materiaPrimaId: string
}

export function MateriaPrimaHistorialMovimientos({ materiaPrimaId }: MateriaPrimaHistorialMovimientosProps) {
  const [movimientos, setMovimientos] = useState<MovimientoMateriaPrima[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMovimientos = async () => {
      setLoading(true)
      try {
        const data = await getMovimientosMateriaPrima(materiaPrimaId)
        setMovimientos(data)
      } catch (error) {
        console.error("Error al cargar movimientos:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMovimientos()
  }, [materiaPrimaId])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Historial de Movimientos</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-4">Cargando movimientos...</div>
        ) : movimientos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <p className="text-muted-foreground">No hay movimientos registrados para esta materia prima.</p>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Cantidad</TableHead>
                  <TableHead>Proveedor</TableHead>
                  <TableHead>Lote</TableHead>
                  <TableHead>Motivo</TableHead>
                  <TableHead>Usuario</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {movimientos.map((movimiento) => (
                  <TableRow key={movimiento.id}>
                    <TableCell>{formatDate(movimiento.fecha)}</TableCell>
                    <TableCell>
                      <Badge variant={movimiento.tipo === "entrada" ? "success" : "destructive"}>
                        {movimiento.tipo === "entrada" ? "Entrada" : "Salida"}
                      </Badge>
                    </TableCell>
                    <TableCell>{movimiento.cantidad}</TableCell>
                    <TableCell>{movimiento.proveedorNombre}</TableCell>
                    <TableCell>{movimiento.lote}</TableCell>
                    <TableCell>{movimiento.motivo}</TableCell>
                    <TableCell>{movimiento.usuario}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
