"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
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
import { MoreHorizontal, Play, CheckSquare, XCircle, Edit } from "lucide-react"

interface ProgramacionActionsProps {
  programacion: any
}

export default function ProgramacionActions({ programacion }: ProgramacionActionsProps) {
  const router = useRouter()
  const [openDialog, setOpenDialog] = useState<string | null>(null)

  const handleAction = (action: string) => {
    // Aquí iría la lógica para realizar la acción
    // Por ejemplo, actualizar el estado de la programación

    setOpenDialog(null)
    router.refresh()
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Acciones</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {programacion.estado === "programada" && (
            <DropdownMenuItem onClick={() => setOpenDialog("iniciar")}>
              <Play className="mr-2 h-4 w-4" />
              Iniciar Producción
            </DropdownMenuItem>
          )}

          {programacion.estado === "enProduccion" && (
            <DropdownMenuItem onClick={() => setOpenDialog("completar")}>
              <CheckSquare className="mr-2 h-4 w-4" />
              Completar Producción
            </DropdownMenuItem>
          )}

          {(programacion.estado === "programada" || programacion.estado === "enProduccion") && (
            <DropdownMenuItem onClick={() => setOpenDialog("cancelar")}>
              <XCircle className="mr-2 h-4 w-4" />
              Cancelar Programación
            </DropdownMenuItem>
          )}

          {programacion.estado === "programada" && (
            <DropdownMenuItem onClick={() => router.push(`/programacion/editar/${programacion.id}`)}>
              <Edit className="mr-2 h-4 w-4" />
              Editar Programación
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Diálogo para iniciar producción */}
      <AlertDialog open={openDialog === "iniciar"} onOpenChange={(open) => !open && setOpenDialog(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Iniciar Producción</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Está seguro de que desea iniciar la producción? Esto cambiará el estado de la programación a "En
              Producción".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleAction("iniciar")}>Iniciar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Diálogo para completar producción */}
      <AlertDialog open={openDialog === "completar"} onOpenChange={(open) => !open && setOpenDialog(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Completar Producción</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Está seguro de que desea marcar esta programación como completada? Esto cambiará el estado a
              "Completada".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleAction("completar")}>Completar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Diálogo para cancelar programación */}
      <AlertDialog open={openDialog === "cancelar"} onOpenChange={(open) => !open && setOpenDialog(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancelar Programación</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Está seguro de que desea cancelar esta programación? Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleAction("cancelar")}>Confirmar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
