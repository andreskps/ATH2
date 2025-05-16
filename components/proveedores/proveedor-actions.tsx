"use client"

import Link from "next/link"
import type { Proveedor } from "@/lib/data/proveedores"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Edit, MoreHorizontal, Trash, FileText, ShoppingCart } from "lucide-react"

interface ProveedorActionsProps {
  proveedor: Proveedor
}

export default function ProveedorActions({ proveedor }: ProveedorActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <Link href={`/proveedores/editar/${proveedor.id}`}>
        <Button variant="outline" size="sm" className="h-8">
          <Edit className="h-4 w-4 mr-1" />
          Editar
        </Button>
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Abrir menú</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <ShoppingCart className="h-4 w-4 mr-2" />
            Registrar Compra
          </DropdownMenuItem>
          <DropdownMenuItem>
            <FileText className="h-4 w-4 mr-2" />
            Generar Reporte
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive">
            <Trash className="h-4 w-4 mr-2" />
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
