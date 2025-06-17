"use client"

import { useState, useEffect } from "react"
import { getOrdenesCompra, type OrdenCompra, type EstadoOrdenCompra } from "@/lib/data/ordenes-compra-nuevo"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, Edit, Package } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { es } from "date-fns/locale"

const estadoConfig: Record<EstadoOrdenCompra, { label: string; className: string }> = {
  creada: { label: "Creada", className: "bg-gray-100 text-gray-800 hover:bg-gray-200" },
  confirmada: { label: "Confirmada", className: "bg-blue-100 text-blue-800 hover:bg-blue-200" },
  "recibida-parcial": { label: "Recibida Parcial", className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200" },
  recibida: { label: "Recibida", className: "bg-green-100 text-green-800 hover:bg-green-200" },
  cerrada: { label: "Cerrada", className: "bg-purple-100 text-purple-800 hover:bg-purple-200" },
}

export function OrdenesCompraTable() {
  const [ordenes, setOrdenes] = useState<OrdenCompra[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const cargarOrdenes = async () => {
      try {
        const data = await getOrdenesCompra()
        setOrdenes(data)
      } catch (error) {
        console.error("Error al cargar órdenes:", error)
      } finally {
        setLoading(false)
      }
    }

    cargarOrdenes()
  }, [])

  if (loading) {
    return <div>Cargando órdenes...</div>
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>N° Orden</TableHead>
            <TableHead>Proveedor</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Fecha Emisión</TableHead>
            <TableHead>Usuario Responsable</TableHead>
            <TableHead>Total</TableHead>
            <TableHead className="w-[70px]">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ordenes.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                No hay órdenes de compra registradas
              </TableCell>
            </TableRow>
          ) : (
            ordenes.map((orden) => (
              <TableRow key={orden.id}>
                <TableCell className="font-medium">
                  <Link href={`/ordenes-compra-nuevo/${orden.id}`} className="hover:underline">
                    {orden.numero}
                  </Link>
                </TableCell>
                <TableCell>{orden.proveedorNombre}</TableCell>
                <TableCell>
                  <Badge className={estadoConfig[orden.estado].className}>{estadoConfig[orden.estado].label}</Badge>
                </TableCell>
                <TableCell>{format(new Date(orden.fechaEmision), "dd/MM/yyyy", { locale: es })}</TableCell>
                <TableCell>{orden.usuarioResponsableNombre}</TableCell>
                <TableCell>
                  ${orden.total.toLocaleString("es-MX", { minimumFractionDigits: 2 })} {orden.moneda}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Abrir menú</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/ordenes-compra-nuevo/${orden.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          Ver detalles
                        </Link>
                      </DropdownMenuItem>
                      {orden.estado === "creada" && (
                        <DropdownMenuItem asChild>
                          <Link href={`/ordenes-compra-nuevo/editar/${orden.id}`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </Link>
                        </DropdownMenuItem>
                      )}
                      {(orden.estado === "confirmada" || orden.estado === "recibida-parcial") && (
                        <DropdownMenuItem asChild>
                          <Link href={`/ordenes-compra-nuevo/recepcion/${orden.id}`}>
                            <Package className="mr-2 h-4 w-4" />
                            Registrar recepción
                          </Link>
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
