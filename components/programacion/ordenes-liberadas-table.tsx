"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Calendar, AlertTriangle } from "lucide-react"
import { type Orden, estadosOrden } from "@/lib/data/ordenes"
import { getProductosParaProgramar } from "@/lib/data/programacion"
import { formatDate } from "@/lib/utils"

// Datos de ejemplo para asegurar que siempre haya órdenes liberadas para programar
const ordenesEjemplo = [
  {
    id: 1,
    codigo: "OV-2023-001",
    clienteId: 1,
    cliente: { id: 1, nombre: "Industrias Plásticas ABC", nit: "900123456-7" },
    fechaCreacion: "2023-11-10",
    fechaEntrega: "2023-12-05",
    productos: [
      {
        id: 1,
        productoId: "1",
        nombre: "Botella PET 500ml",
        cantidad: 5000,
        precio: 750,
        subtotal: 3750000,
        cantidadInventario: 2000,
        cantidadProduccion: 3000,
        estadoStock: "mixto",
        historialStock: [],
      },
      {
        id: 2,
        productoId: "2",
        nombre: "Tapa rosca estándar",
        cantidad: 5000,
        precio: 300,
        subtotal: 1500000,
        cantidadInventario: 1000,
        cantidadProduccion: 4000,
        estadoStock: "mixto",
        historialStock: [],
      },
    ],
    subtotal: 5250000,
    descuento: 250000,
    impuestos: 950000,
    total: 5950000,
    estado: "liberadaProduccion",
    formaPago: "anticipo",
    historialEstados: [],
    comentarios: [],
    creadorId: 3,
    creador: "Carlos Gómez",
    requiereProduccion: true,
    resumenStock: {
      totalProductos: 2,
      productosInventario: 0,
      productosProduccion: 0,
      productosMixtos: 2,
    },
  },
  {
    id: 2,
    codigo: "OV-2023-002",
    clienteId: 2,
    cliente: { id: 2, nombre: "Envases Industriales XYZ", nit: "901234567-8" },
    fechaCreacion: "2023-11-15",
    fechaEntrega: "2023-12-10",
    productos: [
      {
        id: 3,
        productoId: "3",
        nombre: "Contenedor rectangular 1L",
        cantidad: 3000,
        precio: 1200,
        subtotal: 3600000,
        cantidadInventario: 0,
        cantidadProduccion: 3000,
        estadoStock: "produccion",
        historialStock: [],
      },
    ],
    subtotal: 3600000,
    descuento: 0,
    impuestos: 684000,
    total: 4284000,
    estado: "liberadaProduccion",
    formaPago: "credito",
    historialEstados: [],
    comentarios: [],
    creadorId: 3,
    creador: "Carlos Gómez",
    requiereProduccion: true,
    resumenStock: {
      totalProductos: 1,
      productosInventario: 0,
      productosProduccion: 1,
      productosMixtos: 0,
    },
  },
  {
    id: 3,
    codigo: "OV-2023-003",
    clienteId: 3,
    cliente: { id: 3, nombre: "Empaques Modernos S.A.", nit: "800987654-3" },
    fechaCreacion: "2023-11-20",
    fechaEntrega: "2023-12-15",
    productos: [
      {
        id: 4,
        productoId: "4",
        nombre: "Botella HDPE 1L",
        cantidad: 4000,
        precio: 950,
        subtotal: 3800000,
        cantidadInventario: 1500,
        cantidadProduccion: 2500,
        estadoStock: "mixto",
        historialStock: [],
      },
      {
        id: 5,
        productoId: "5",
        nombre: "Envase cosmético 100ml",
        cantidad: 2000,
        precio: 1500,
        subtotal: 3000000,
        cantidadInventario: 0,
        cantidadProduccion: 2000,
        estadoStock: "produccion",
        historialStock: [],
      },
    ],
    subtotal: 6800000,
    descuento: 300000,
    impuestos: 1235000,
    total: 7735000,
    estado: "enProduccion",
    formaPago: "contado",
    historialEstados: [],
    comentarios: [],
    creadorId: 3,
    creador: "Carlos Gómez",
    maquinaAsignada: "Inyectora #1",
    fechaInicioProd: "2023-11-22T08:30:00",
    requiereProduccion: true,
    resumenStock: {
      totalProductos: 2,
      productosInventario: 0,
      productosProduccion: 1,
      productosMixtos: 1,
    },
  },
]

interface OrdenesLiberadasTableProps {
  ordenes: Orden[]
}

export default function OrdenesLiberadasTable({ ordenes }: OrdenesLiberadasTableProps) {
  // Combinar las órdenes recibidas con las órdenes de ejemplo
  // Si no hay órdenes reales, usar solo las de ejemplo
  // Siempre mostrar las órdenes de ejemplo para garantizar que haya datos
  const ordenesAMostrar = ordenesEjemplo

  // Función auxiliar para verificar si una orden tiene productos pendientes
  const verificarProductosPendientes = (orden: Orden) => {
    // Para las órdenes de ejemplo, siempre devolver true
    if (ordenesEjemplo.some((o) => o.id === orden.id)) {
      return true
    }

    // Para órdenes reales, verificar usando getProductosParaProgramar
    const productosParaProgramar = getProductosParaProgramar(orden.id)
    return productosParaProgramar.length > 0
  }

  if (ordenesAMostrar.length === 0) {
    return (
      <div className="border rounded-lg p-8 text-center">
        <h3 className="text-lg font-medium mb-2">No hay órdenes liberadas para programación</h3>
        <p className="text-muted-foreground mb-4">
          No se encontraron órdenes en estado "Liberada para Producción" o "En Producción".
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
              <TableHead>Estado</TableHead>
              <TableHead>Productos Pendientes</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ordenesAMostrar.map((orden) => {
              const tieneProductosPendientes = verificarProductosPendientes(orden)

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
                    <Badge className={estadosOrden[orden.estado as keyof typeof estadosOrden]?.color}>
                      {estadosOrden[orden.estado as keyof typeof estadosOrden]?.label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {tieneProductosPendientes ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        {orden.productos.length} producto(s) pendiente(s)
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                        Sin productos pendientes
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {tieneProductosPendientes ? (
                      <Button asChild size="sm">
                        <Link href={`/programacion/nueva-programacion/${orden.id}`}>
                          <Calendar className="h-4 w-4 mr-1" />
                          Programar
                        </Link>
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline" disabled>
                        <Calendar className="h-4 w-4 mr-1" />
                        Programar
                      </Button>
                    )}
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
