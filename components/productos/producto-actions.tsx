"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Pencil, Archive, RotateCcw, Trash2, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import type { Producto } from "@/lib/types"

interface ProductoActionsProps {
  producto: Producto
}

export default function ProductoActions({ producto }: ProductoActionsProps) {
  const router = useRouter()
  const [showToggleDialog, setShowToggleDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const handleToggleEstado = () => {
    setShowToggleDialog(false)

    // Aquí iría la lógica para cambiar el estado del producto en la base de datos
    console.log(
      `Cambiando estado de producto ${producto.id} a ${producto.estado === "Activo" ? "Descontinuado" : "Activo"}`,
    )

    // Simulamos una actualización y redirigimos
    setTimeout(() => {
      router.push("/productos")
      router.refresh()
    }, 500)
  }

  const handleDeleteProducto = () => {
    setShowDeleteDialog(false)

    // Aquí iría la lógica para eliminar el producto de la base de datos
    console.log(`Eliminando producto ${producto.id}`)

    // Simulamos una eliminación y redirigimos
    setTimeout(() => {
      router.push("/productos")
      router.refresh()
    }, 500)
  }

  return (
    <div className="flex items-center gap-2">
      <Button asChild variant="outline">
        <Link href={`/productos/editar/${producto.id}`} className="flex items-center gap-2">
          <Pencil className="h-4 w-4" />
          <span className="hidden sm:inline">Editar</span>
        </Link>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <MoreVertical className="h-4 w-4" />
            <span className="sr-only">Más acciones</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <AlertDialog open={showToggleDialog} onOpenChange={setShowToggleDialog}>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault()
                  setShowToggleDialog(true)
                }}
              >
                {producto.estado === "Activo" ? (
                  <div className="flex items-center gap-2">
                    <Archive className="h-4 w-4" />
                    <span>Descontinuar</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <RotateCcw className="h-4 w-4" />
                    <span>Activar</span>
                  </div>
                )}
              </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {producto.estado === "Activo" ? "¿Descontinuar producto?" : "¿Activar producto?"}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {producto.estado === "Activo"
                    ? "El producto no estará disponible para nuevas órdenes mientras esté descontinuado."
                    : "El producto estará disponible para órdenes nuevamente."}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleToggleEstado}
                  className={producto.estado === "Activo" ? "bg-red-500 hover:bg-red-600" : ""}
                >
                  {producto.estado === "Activo" ? "Descontinuar" : "Activar"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <DropdownMenuSeparator />

          <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem
                className="text-red-500 focus:text-red-500"
                onSelect={(e) => {
                  e.preventDefault()
                  setShowDeleteDialog(true)
                }}
              >
                <div className="flex items-center gap-2">
                  <Trash2 className="h-4 w-4" />
                  <span>Eliminar</span>
                </div>
              </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>¿Eliminar producto permanentemente?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta acción no se puede deshacer. Se eliminará permanentemente el producto del sistema.
                  <br />
                  <br />
                  <strong>Recomendación:</strong> En lugar de eliminar, considera descontinuar el producto para mantener
                  su historial.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteProducto} className="bg-red-500 hover:bg-red-600">
                  Eliminar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
