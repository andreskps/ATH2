"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { Badge } from "@/components/ui/badge"
import { Calendar, Edit, Eye, MoreHorizontal, Trash } from "lucide-react"
import { equipos, getNombreEmpleado } from "@/lib/data/turnos"

export default function EquiposTable() {
  const router = useRouter()
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [equipoToDelete, setEquipoToDelete] = useState<string | null>(null)

  const handleDelete = (id: string) => {
    setEquipoToDelete(id)
    setOpenDeleteDialog(true)
  }

  const confirmDelete = () => {
    // Aquí iría la lógica para eliminar el equipo
    console.log(`Eliminando equipo ${equipoToDelete}`)
    setOpenDeleteDialog(false)
    setEquipoToDelete(null)
    // Recargar datos o actualizar estado
  }

  const handleAsignarTurno = (equipoId: string) => {
    router.push(`/turnos/crear?equipoId=${equipoId}`)
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre del Equipo</TableHead>
            <TableHead>Supervisor</TableHead>
            <TableHead>Área</TableHead>
            <TableHead>Operarios</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {equipos.map((equipo) => (
            <TableRow key={equipo.id}>
              <TableCell className="font-medium">{equipo.nombre}</TableCell>
              <TableCell>{getNombreEmpleado(equipo.supervisor)}</TableCell>
              <TableCell>
                <Badge variant="outline">{equipo.area}</Badge>
              </TableCell>
              <TableCell>
                <Badge>{equipo.operarios.length} operarios</Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Abrir menú</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/turnos/equipos/${equipo.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        Ver Detalles
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleAsignarTurno(equipo.id)}>
                      <Calendar className="mr-2 h-4 w-4" />
                      Asignar a Turno
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/turnos/equipos/editar/${equipo.id}`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar Equipo
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onClick={() => handleDelete(equipo.id)}
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Eliminar Equipo
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará el equipo de trabajo y no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
