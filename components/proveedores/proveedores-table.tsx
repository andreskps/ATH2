"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import type { Proveedor } from "@/lib/data/proveedores"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Eye, Edit, Trash, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ProveedoresTableProps {
  proveedores: Proveedor[]
  query: string
  tipo: string
  estado: string
  ciudad: string
  pais: string
}

export default function ProveedoresTable({ proveedores, query, tipo, estado, ciudad, pais }: ProveedoresTableProps) {
  const [filteredProveedores, setFilteredProveedores] = useState<Proveedor[]>(proveedores)

  useEffect(() => {
    let result = proveedores

    // Filtrar por búsqueda
    if (query) {
      const lowerQuery = query.toLowerCase()
      result = result.filter(
        (proveedor) =>
          proveedor.nombre.toLowerCase().includes(lowerQuery) || proveedor.nit.toLowerCase().includes(lowerQuery),
      )
    }

    // Filtrar por tipo
    if (tipo) {
      result = result.filter((proveedor) => proveedor.tipo === tipo)
    }

    // Filtrar por estado
    if (estado) {
      result = result.filter((proveedor) => proveedor.estado === estado)
    }

    // Filtrar por ciudad
    if (ciudad) {
      result = result.filter((proveedor) => proveedor.ciudad === ciudad)
    }

    // Filtrar por país
    if (pais) {
      result = result.filter((proveedor) => proveedor.pais === pais)
    }

    setFilteredProveedores(result)
  }, [proveedores, query, tipo, estado, ciudad, pais])

  if (filteredProveedores.length === 0) {
    return (
      <Card className="p-8 flex flex-col items-center justify-center text-center">
        <h3 className="text-lg font-semibold mb-2">No se encontraron proveedores</h3>
        <p className="text-muted-foreground mb-4">No hay proveedores que coincidan con los criterios de búsqueda.</p>
        <Link
          href="/proveedores/nuevo"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          Crear Nuevo Proveedor
        </Link>
      </Card>
    )
  }

  return (
    <div className="rounded-md border">
      <div className="relative w-full overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <thead className="[&_tr]:border-b">
            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Logo</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Nombre</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">NIT</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Tipo</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Ciudad</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Estado</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Acciones</th>
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {filteredProveedores.map((proveedor) => (
              <tr
                key={proveedor.id}
                className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
              >
                <td className="p-4 align-middle">
                  {proveedor.logo ? (
                    <div className="relative h-10 w-10 overflow-hidden rounded-md">
                      <Image
                        src={proveedor.logo || "/placeholder.svg"}
                        alt={proveedor.nombre}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                      <span className="text-xs font-medium">{proveedor.nombre.substring(0, 2).toUpperCase()}</span>
                    </div>
                  )}
                </td>
                <td className="p-4 align-middle font-medium">{proveedor.nombre}</td>
                <td className="p-4 align-middle">{proveedor.nit}</td>
                <td className="p-4 align-middle">{proveedor.tipo}</td>
                <td className="p-4 align-middle">{proveedor.ciudad}</td>
                <td className="p-4 align-middle">
                  <Badge variant={proveedor.estado === "Activo" ? "success" : "destructive"} className="font-normal">
                    {proveedor.estado}
                  </Badge>
                </td>
                <td className="p-4 align-middle">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" title="Acciones">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Abrir menú</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/proveedores/${proveedor.id}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          Ver detalles
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/proveedores/editar/${proveedor.id}`}>
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash className="h-4 w-4 mr-2" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
