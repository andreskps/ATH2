"use client"

import { useEffect, useState, useMemo } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { MoreHorizontal, Eye, Edit, FileText, AlertTriangle } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table"
import {
  type Orden,
  getOrdenes,
  estadosOrden,
  getRolUsuarioActual,
  getAccionesDisponibles,
  formasPago,
} from "@/lib/data/ordenes"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function OrdenesTable() {
  const searchParams = useSearchParams()
  const [ordenes, setOrdenes] = useState<Orden[]>([])

  // Usar useMemo para el rol de usuario para evitar recálculos innecesarios
  const rolUsuario = useMemo(() => getRolUsuarioActual(), [])

  // Función para formatear moneda
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  // Cargar órdenes solo una vez al inicio
  useEffect(() => {
    // Obtener todas las órdenes sin filtrar
    const todasLasOrdenes = getOrdenes()
    setOrdenes(todasLasOrdenes)
  }, [])

  // Filtrar órdenes en el cliente basado en searchParams
  const ordenesFiltradas = useMemo(() => {
    if (!searchParams || ordenes.length === 0) return ordenes

    const estado = searchParams.get("estado")
    const clienteId = searchParams.get("clienteId")
    const busqueda = searchParams.get("busqueda")

    return ordenes.filter((orden) => {
      // Filtrar por estado
      if (estado && estado !== "all" && orden.estado !== estado) {
        return false
      }

      // Filtrar por cliente
      if (clienteId && clienteId !== "all" && orden.clienteId.toString() !== clienteId) {
        return false
      }

      // Filtrar por búsqueda
      if (busqueda) {
        const busquedaLower = busqueda.toLowerCase()
        const codigoMatch = orden.codigo.toLowerCase().includes(busquedaLower)
        const clienteMatch = orden.cliente?.nombre.toLowerCase().includes(busquedaLower)

        if (!codigoMatch && !clienteMatch) {
          return false
        }
      }

      return true
    })
  }, [searchParams, ordenes])

  return (
    <Card className="w-full">
      <div className="relative w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Forma de Pago</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ordenesFiltradas.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No se encontraron órdenes
                </TableCell>
              </TableRow>
            ) : (
              ordenesFiltradas.map((orden) => {
                const estadoInfo = estadosOrden[orden.estado as keyof typeof estadosOrden]
                const accionesDisponibles = getAccionesDisponibles(orden.estado, rolUsuario)

                return (
                  <TableRow key={orden.id}>
                    <TableCell className="font-medium">{orden.codigo}</TableCell>
                    <TableCell>{orden.cliente?.nombre}</TableCell>
                    <TableCell>{format(new Date(orden.fechaCreacion), "dd MMM yyyy", { locale: es })}</TableCell>
                    <TableCell>{formatCurrency(orden.total)}</TableCell>
                    <TableCell>
                      <Badge className={estadoInfo.color}>{estadoInfo.label}</Badge>
                      {orden.estado === "ordenAbierta" && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                                Editable
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Esta orden puede ser editada</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </TableCell>
                    <TableCell>{formasPago[orden.formaPago as keyof typeof formasPago]}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Abrir menú</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link href={`/ordenes/${orden.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              Ver detalle
                            </Link>
                          </DropdownMenuItem>

                          {(orden.estado === "borrador" || orden.estado === "porConfirmarPago") && (
                            <DropdownMenuItem asChild>
                              <Link href={`/ordenes/editar/${orden.id}`}>
                                <Edit className="mr-2 h-4 w-4" />
                                Editar
                              </Link>
                            </DropdownMenuItem>
                          )}

                          <DropdownMenuItem asChild>
                            <Link href={`/ordenes/${orden.id}/imprimir`}>
                              <FileText className="mr-2 h-4 w-4" />
                              Imprimir
                            </Link>
                          </DropdownMenuItem>

                          {accionesDisponibles.includes("cancelarOrden") && (
                            <DropdownMenuItem className="text-red-600">
                              <AlertTriangle className="mr-2 h-4 w-4" />
                              Cancelar orden
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  )
}
