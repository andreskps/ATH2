"use client"

import { useState, useEffect } from "react"
import { format, parseISO } from "date-fns"
import { es } from "date-fns/locale"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getEntregasDotacion } from "@/lib/data/dotacion"

interface HistorialDotacionProps {
  empleadoId: string
  empleadoNombre: string
}

interface ItemHistorial {
  id: string
  tipoDotacion: string
  talla: string
  cantidad: number
  fechaEntrega: string
  estado: string
}

export function HistorialDotacion({ empleadoId, empleadoNombre }: HistorialDotacionProps) {
  const [historial, setHistorial] = useState<ItemHistorial[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        const entregas = await getEntregasDotacion()
        const entregasEmpleado = entregas.filter((e) => e.empleadoId === empleadoId)

        // Transformar las entregas en items de historial
        const items: ItemHistorial[] = []

        entregasEmpleado.forEach((entrega) => {
          entrega.items.forEach((item) => {
            items.push({
              id: `${entrega.id}-${item.id}`,
              tipoDotacion: item.tipoDotacion,
              talla: item.talla,
              cantidad: item.cantidad,
              fechaEntrega: entrega.fechaEntrega,
              estado: entrega.estado,
            })
          })
        })

        // Ordenar por fecha (más reciente primero)
        items.sort((a, b) => new Date(b.fechaEntrega).getTime() - new Date(a.fechaEntrega).getTime())

        setHistorial(items)
      } catch (error) {
        console.error("Error al cargar el historial:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchHistorial()
  }, [empleadoId])

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "pendiente":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
            Pendiente
          </Badge>
        )
      case "entregado":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800">
            Entregado
          </Badge>
        )
      case "cancelado":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800">
            Cancelado
          </Badge>
        )
      default:
        return <Badge variant="outline">{estado}</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Historial de Dotación - {empleadoNombre}</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex flex-col space-y-2">
            <div className="h-4 w-full animate-pulse rounded bg-muted"></div>
            <div className="h-4 w-full animate-pulse rounded bg-muted"></div>
            <div className="h-4 w-full animate-pulse rounded bg-muted"></div>
          </div>
        ) : historial.length === 0 ? (
          <div className="rounded-md border border-dashed p-6 text-center text-muted-foreground">
            No hay registros de dotación para este empleado
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipo de Dotación</TableHead>
                <TableHead>Talla</TableHead>
                <TableHead>Cantidad</TableHead>
                <TableHead>Fecha de Entrega</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {historial.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.tipoDotacion}</TableCell>
                  <TableCell>{item.talla}</TableCell>
                  <TableCell>{item.cantidad}</TableCell>
                  <TableCell>{format(parseISO(item.fechaEntrega), "dd/MM/yyyy", { locale: es })}</TableCell>
                  <TableCell>{getEstadoBadge(item.estado)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
