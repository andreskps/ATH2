"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
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
} from "@/components/ui/alert-dialog"
import type { Maquina } from "@/lib/data/maquinaria"
import { Pencil, MoreHorizontal, Trash, PenToolIcon as Tool, CheckCircle, XCircle } from "lucide-react"

interface MaquinaActionsProps {
  maquina: Maquina
}

export default function MaquinaActions({ maquina }: MaquinaActionsProps) {
  const router = useRouter()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    // Aquí iría la lógica para eliminar la máquina
    try {
      // Simular una operación de eliminación
      await new Promise((resolve) => setTimeout(resolve, 1000))
      router.push("/maquinaria")
    } catch (error) {
      console.error("Error al eliminar la máquina:", error)
      setIsDeleting(false)
    }
  }

  const getEstadoOptions = () => {
    const options = []

    if (maquina.estado !== "Activa") {
      options.push(
        <DropdownMenuItem key="activar" onClick={() => console.log("Activar máquina")}>
          <CheckCircle className="mr-2 h-4 w-4" />
          <span>Marcar como Activa</span>
        </DropdownMenuItem>,
      )
    }

    if (maquina.estado !== "En Mantenimiento") {
      options.push(
        <DropdownMenuItem key="mantenimiento" onClick={() => console.log("Poner en mantenimiento")}>
          <Tool className="mr-2 h-4 w-4" />
          <span>Poner en Mantenimiento</span>
        </DropdownMenuItem>,
      )
    }

    if (maquina.estado !== "Inactiva") {
      options.push(
        <DropdownMenuItem key="inactiva" onClick={() => console.log("Marcar como inactiva")}>
          <XCircle className="mr-2 h-4 w-4" />
          <span>Marcar como Inactiva</span>
        </DropdownMenuItem>,
      )
    }

    return options
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={() => router.push(`/maquinaria/editar/${maquina.id}`)}>
          <Pencil className="mr-2 h-4 w-4" />
          Editar
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Más acciones</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {getEstadoOptions()}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onClick={() => setShowDeleteDialog(true)}
            >
              <Trash className="mr-2 h-4 w-4" />
              <span>Eliminar</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente la máquina
              <span className="font-medium"> {maquina.nombre} </span>y todos sus datos asociados.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Eliminando..." : "Eliminar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
