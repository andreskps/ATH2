"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { format, parseISO } from "date-fns"
import { es } from "date-fns/locale"
import { ArrowLeft, FileEdit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getEntregaDotacionById } from "@/lib/data/dotacion"
import type { EntregaDotacion } from "@/lib/types"

interface EntregaDetalleProps {
  entregaId: string
}

export function EntregaDetalle({ entregaId }: EntregaDetalleProps) {
  const router = useRouter()
  const [entrega, setEntrega] = useState<EntregaDotacion | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchEntrega = async () => {
      try {
        const data = await getEntregaDotacionById(entregaId)
        setEntrega(data || null)
      } catch (error) {
        console.error("Error al cargar la entrega:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchEntrega()
  }, [entregaId])

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

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Cargando...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-2">
            <div className="h-4 w-1/3 animate-pulse rounded bg-muted"></div>
            <div className="h-4 w-1/2 animate-pulse rounded bg-muted"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!entrega) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Entrega no encontrada</CardTitle>
          <CardDescription>No se encontró la entrega con el ID especificado</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button onClick={() => router.push("/dotacion/entregas")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Entregas
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => router.push("/dotacion/entregas")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a Entregas
        </Button>

        {entrega.estado !== "entregado" && (
          <Button onClick={() => router.push(`/dotacion/entregas/editar/${entregaId}`)}>
            <FileEdit className="mr-2 h-4 w-4" />
            Editar Entrega
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Detalle de Entrega</CardTitle>
              <CardDescription>Información de la entrega de dotación</CardDescription>
            </div>
            {getEstadoBadge(entrega.estado)}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="mb-2 text-sm font-medium text-muted-foreground">Empleado</h3>
              <p className="text-lg font-medium">{entrega.empleadoNombre}</p>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-medium text-muted-foreground">Fecha de Entrega</h3>
              <p className="text-lg font-medium">
                {format(parseISO(entrega.fechaEntrega), "dd 'de' MMMM 'de' yyyy", { locale: es })}
              </p>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-medium">Items Entregados</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tipo de Dotación</TableHead>
                  <TableHead>Talla</TableHead>
                  <TableHead>Cantidad</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {entrega.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.tipoDotacion}</TableCell>
                    <TableCell>{item.talla}</TableCell>
                    <TableCell>{item.cantidad}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {entrega.observaciones && (
            <div>
              <h3 className="mb-2 text-sm font-medium text-muted-foreground">Observaciones</h3>
              <p className="rounded-md bg-muted p-3">{entrega.observaciones}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
