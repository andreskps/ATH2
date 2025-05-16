"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Pencil, UserX, UserCheck, Trash2, MoreVertical } from "lucide-react"
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
import type { Empleado } from "@/lib/types"

interface EmpleadoActionsProps {
  empleado: Empleado
}

export default function EmpleadoActions({ empleado }: EmpleadoActionsProps) {
  const router = useRouter()
  const [showToggleDialog, setShowToggleDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const handleToggleEstado = () => {
    setShowToggleDialog(false)

    // Aquí iría la lógica para cambiar el estado del empleado en la base de datos
    console.log(`Cambiando estado de empleado ${empleado.id} a ${empleado.estado === "Activo" ? "Inactivo" : "Activo"}`)

    // Simulamos una actualización y redirigimos
    setTimeout(() => {
      router.push("/empleados")
      router.refresh()
    }, 500)
  }

  const handleDeleteEmpleado = () => {
    setShowDeleteDialog(false)

    // Aquí iría la lógica para eliminar el empleado de la base de datos
    console.log(`Eliminando empleado ${empleado.id}`)

    // Simulamos una eliminación y redirigimos
    setTimeout(() => {
      router.push("/empleados")
      router.refresh()
    }, 500)
  }

  return (
    <div className="flex items-center gap-2">
      <Button asChild variant="outline">
        <Link href={`/empleados/editar/${empleado.id}`} className="flex items-center gap-2">
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
                {empleado.estado === "Activo" ? (
                  <div className="flex items-center gap-2">
                    <UserX className="h-4 w-4" />
                    <span>Desactivar</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <UserCheck className="h-4 w-4" />
                    <span>Activar</span>
                  </div>
                )}
              </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {empleado.estado === "Activo" ? "¿Desactivar empleado?" : "¿Activar empleado?"}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {empleado.estado === "Activo"
                    ? "El empleado no podrá ser asignado a producción o turnos mientras esté inactivo."
                    : "El empleado podrá ser asignado a producción o turnos nuevamente."}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleToggleEstado}
                  className={empleado.estado === "Activo" ? "bg-red-500 hover:bg-red-600" : ""}
                >
                  {empleado.estado === "Activo" ? "Desactivar" : "Activar"}
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
                <AlertDialogTitle>¿Eliminar empleado permanentemente?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta acción no se puede deshacer. Se eliminará permanentemente el empleado del sistema.
                  <br />
                  <br />
                  <strong>Recomendación:</strong> En lugar de eliminar, considera desactivar al empleado para mantener
                  su historial.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteEmpleado} className="bg-red-500 hover:bg-red-600">
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
