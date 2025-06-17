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
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Abrir menú</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem asChild>
          <Link href={`/ordenes-compra/${id}`} className="flex items-center">
            <Eye className="mr-2 h-4 w-4" />
            Ver detalles
          </Link>
        </DropdownMenuItem>

        {/* Solo mostrar editar si está en estado "creada" */}
        {estado === "creada" && (
          <DropdownMenuItem asChild>
            <Link href={`/ordenes-compra/editar/${id}`} className="flex items-center">
              <FileEdit className="mr-2 h-4 w-4" />
              Editar
            </Link>
          </DropdownMenuItem>
        )}

        {/* Solo mostrar registrar recepción si está confirmada o recibida parcial */}
        {["confirmada", "recibida-parcial"].includes(estado) && (
          <DropdownMenuItem asChild>
            <Link href={`/ordenes-compra/recepcion/${id}`} className="flex items-center">
              <Truck className="mr-2 h-4 w-4" />
              Registrar recepción
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
