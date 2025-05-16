"use client"

import { useRouter } from "next/navigation"
import type { MateriaPrima } from "@/lib/data/materia-prima"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AlertCircle, Edit, MoreHorizontal, Trash } from "lucide-react"

interface MateriaPrimaActionsProps {
  materiaPrima: MateriaPrima
}

export function MateriaPrimaActions({ materiaPrima }: MateriaPrimaActionsProps) {
  const router = useRouter()

  const handleEdit = () => {
    router.push(`/materia-prima/editar/${materiaPrima.id}`)
  }

  const handleDelete = () => {
    if (confirm("¿Estás seguro de que deseas eliminar esta materia prima?")) {
      alert("Implementación pendiente: Eliminar materia prima")
      // Aquí iría la lógica para eliminar
      router.push("/materia-prima")
    }
  }

  const handleRegisterMovement = () => {
    alert("Implementación pendiente: Registrar movimiento")
    // Aquí iría la lógica para abrir el modal de registro de movimiento
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Acciones</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleEdit}>
          <Edit className="mr-2 h-4 w-4" />
          Editar
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleRegisterMovement}>
          <AlertCircle className="mr-2 h-4 w-4" />
          Registrar Movimiento
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDelete} className="text-red-500">
          <Trash className="mr-2 h-4 w-4" />
          Eliminar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
