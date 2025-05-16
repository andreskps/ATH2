"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Eye, FileEdit, MoreHorizontal, Truck } from "lucide-react"
import Link from "next/link"

interface OrdenCompraActionsProps {
  id: string
  estado: string
}

export function OrdenCompraActions({ id, estado }: OrdenCompraActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Abrir menú</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <Link href={`/ordenes-compra/${id}`}>
          <DropdownMenuItem>
            <Eye className="mr-2 h-4 w-4" />
            Ver detalles
          </DropdownMenuItem>
        </Link>

        {["creado", "recibido-parcial"].includes(estado) && (
          <Link href={`/ordenes-compra/editar/${id}`}>
            <DropdownMenuItem>
              <FileEdit className="mr-2 h-4 w-4" />
              Editar
            </DropdownMenuItem>
          </Link>
        )}

        {["creado", "recibido-parcial"].includes(estado) && (
          <Link href={`/ordenes-compra/recepcion/${id}`}>
            <DropdownMenuItem>
              <Truck className="mr-2 h-4 w-4" />
              Registrar recepción
            </DropdownMenuItem>
          </Link>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
