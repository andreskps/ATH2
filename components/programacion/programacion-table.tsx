"use client"

import { useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Calendar, Eye, AlertTriangle } from "lucide-react"
import { type Orden, estadosOrden } from "@/lib/data/ordenes"
import { getProductosParaProgramar } from "@/lib/data/programacion"
import { formatDate } from "@/lib/utils"

interface ProgramacionTableProps {
  ordenes: Orden[]
}

export default function ProgramacionTable({ ordenes }: ProgramacionTableProps) {
  const searchParams = useSearchParams()
  const [filteredOrdenes, setFilteredOrdenes] = useState(ordenes)

  // Aplicar filtros si existen
  useState(() => {
    const clienteId = searchParams.get("cliente")
    const productoId = searchParams.get("producto")
    const urgencia = searchParams.get("urgencia")
    const fechaDesde = searchParams.get("fechaDesde")
    const fechaHasta = searchParams.get("fechaHasta")

    let filtered = ordenes

    if (clienteId) {
      filtered = filtered.filter((orden) => orden.clienteId === Number.parseInt(clienteId))
    }

    if (productoId) {
      filtered = filtered.filter((orden) => orden.productos.some((producto) => producto.productoId === productoId))
    }

    // Filtro de urgencia (simulado basado en fecha de entrega)
    if (urgencia) {
      const today = new Date()
      const oneWeek = new Date(today)
      oneWeek.setDate(oneWeek.getDate() + 7)
      const twoWeeks = new Date(today)
      twoWeeks.setDate(twoWeeks.getDate() + 14)

      filtered = filtered.filter((orden) => {
        if (!orden.fechaEntrega) return false
        const fechaEntrega = new Date(orden.fechaEntrega)

        if (urgencia === "alta") {
          return fechaEntrega <= oneWeek
        } else if (urgencia === "media") {
          return fechaEntrega > oneWeek && fechaEntrega <= twoWeeks
        } else {
          return fechaEntrega > twoWeeks
        }
      })
    }

    if (fechaDesde) {
      const fechaDesdeObj = new Date(fechaDesde)
      filtered = filtered.filter((orden) => orden.fechaEntrega && new Date(orden.fechaEntrega) >= fechaDesdeObj)
    }

    if (fechaHasta) {
      const fechaHastaObj = new Date(fechaHasta)
      filtered = filtered.filter((orden) => orden.fechaEntrega && new Date(orden.fechaEntrega) <= fechaHastaObj)
    }

    setFilteredOrdenes(filtered)
  }, [ordenes, searchParams])

  if (filteredOrdenes.length === 0) {
    return (
      <div className="border rounded-lg p-8 text-center">
        <h3 className="text-lg font-medium mb-2">No hay órdenes liberadas para programación</h3>
        <p className="text-muted-foreground mb-4">
          No se encontraron órdenes en estado "Liberada para Producción" que coincidan con los filtros aplicados.
        </p>
      </div>
    )
  }

  return (
    <div className="border rounded-lg">
      <div className="relative w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Fecha Entrega</TableHead>
              <TableHead>Productos</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrdenes.map((orden) => {
              const productosParaProgramar = getProductosParaProgramar(orden.id)
              const tieneProductosPendientes = productosParaProgramar.length > 0

              return (
                <TableRow key={orden.id} className={tieneProductosPendientes ? "" : "opacity-60"}>
                  <TableCell className="font-medium">{orden.codigo}</TableCell>
                  <TableCell>{orden.cliente?.nombre}</TableCell>
                  <TableCell>
                    {orden.fechaEntrega ? (
                      <div className="flex items-center">
                        {formatDate(orden.fechaEntrega)}
                        {new Date(orden.fechaEntrega) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <AlertTriangle className="h-4 w-4 ml-2 text-amber-500" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Entrega urgente (menos de 7 días)</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                    ) : (
                      "No definida"
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      {productosParaProgramar.length > 0 ? (
                        productosParaProgramar.map((producto) => (
                          <div key={producto.id} className="text-sm">
                            {producto.nombre} ({producto.cantidadPendiente} unidades)
                          </div>
                        ))
                      ) : (
                        <span className="text-sm text-muted-foreground">Sin productos pendientes</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={estadosOrden[orden.estado as keyof typeof estadosOrden]?.color}>
                      {estadosOrden[orden.estado as keyof typeof estadosOrden]?.label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/ordenes/${orden.id}`}>
                          <Eye className="h-4 w-4 mr-1" />
                          Ver
                        </Link>
                      </Button>
                      {tieneProductosPendientes && (
                        <Button asChild size="sm">
                          <Link href={`/programacion/nueva/${orden.id}`}>
                            <Calendar className="h-4 w-4 mr-1" />
                            Programar
                          </Link>
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
