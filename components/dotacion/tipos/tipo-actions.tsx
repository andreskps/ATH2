"use client"

import { useState } from "react"
import { Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
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
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { TipoForm } from "./tipo-form"
import type { TipoDotacion } from "@/lib/types"

interface TipoActionsProps {
  tipo: TipoDotacion
}

export function TipoActions({ tipo }: TipoActionsProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)

  const handleDelete = async () => {
    // Aquí iría la lógica para eliminar
    console.log("Eliminando tipo:", tipo.id)

    // Simulamos una llamada a API
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Cerrar el diálogo
    setShowDeleteDialog(false)

    // Recargar la página
    window.location.reload()
  }

  return (
    <div className="flex gap-2 justify-end">
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon">
            <Edit className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <TipoForm tipo={tipo} onClose={() => setShowEditDialog(false)} />
        </DialogContent>
      </Dialog>

      <Button
        variant="outline"
        size="icon"
        className="text-destructive hover:bg-destructive/10"
        onClick={() => setShowDeleteDialog(true)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará permanentemente el tipo de dotación &quot;{tipo.nombre}&quot; y no se puede
              deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive hover:bg-destructive/90" onClick={handleDelete}>
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
