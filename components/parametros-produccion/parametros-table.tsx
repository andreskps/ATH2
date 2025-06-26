"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Eye, Edit, Copy, BarChart3, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import { type ParametroProduccion, getParametros } from "@/lib/data/parametros-produccion"

export function ParametrosTable() {
  const [parametros, setParametros] = useState<ParametroProduccion[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadParametros = async () => {
      try {
        const data = await getParametros()
        setParametros(data)
      } catch (error) {
        console.error("Error loading parametros:", error)
      } finally {
        setLoading(false)
      }
    }

    loadParametros()
  }, [])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "validated":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Validado</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendiente</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rechazado</Badge>
      case "draft":
        return <Badge variant="secondary">Borrador</Badge>
      default:
        return <Badge variant="secondary">Desconocido</Badge>
    }
  }

  if (loading) {
    return <div>Cargando...</div>
  }

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Producto</TableHead>
            <TableHead>Máquina</TableHead>
            <TableHead>Materias Primas</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead className="w-[100px]">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {parametros.map((parametro) => (
            <TableRow key={parametro.id}>
              <TableCell className="font-medium">
                <Link href={`/parametros-produccion/${parametro.id}`} className="hover:underline">
                  {parametro.name}
                </Link>
              </TableCell>
              <TableCell>{parametro.product}</TableCell>
              <TableCell>{parametro.machine}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {parametro.rawMaterials.slice(0, 2).map((material, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      Material {index + 1}
                    </Badge>
                  ))}
                  {parametro.rawMaterials.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{parametro.rawMaterials.length - 2}
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell>{getStatusBadge(parametro.status)}</TableCell>
              <TableCell>{new Date(parametro.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/parametros-produccion/${parametro.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        Ver
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/parametros-produccion/editar/${parametro.id}`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="mr-2 h-4 w-4" />
                      Clonar
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Comparar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
