"use client"
import { Plus } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { getRolUsuarioActual, puedeRealizarAccion } from "@/lib/data/ordenes"

export function OrdenesTableHeader() {
  const rolUsuario = getRolUsuarioActual()
  const puedeCrearOrden = puedeRealizarAccion("crearOrden", rolUsuario)

  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold tracking-tight">Órdenes de Venta</h1>
      <div className="flex items-center gap-2">
        {puedeCrearOrden && (
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            <Link href="/ordenes/nueva-orden">Nueva Orden</Link>
          </Button>
        )}
      </div>
    </div>
  )
}
