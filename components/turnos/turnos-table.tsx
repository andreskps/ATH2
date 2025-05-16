"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
import { Edit, Eye, MoreHorizontal, Trash } from "lucide-react"
import { getTurnos, getNombreEmpleado } from "@/lib/data/turnos"

export default function TurnosTable() {
  const router = useRouter()
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [turnoToDelete, setTurnoToDelete] = useState<string | null>(null)

  const turnos = getTurnos()

  const handleDelete = (id: string) => {
    setTurnoToDelete(id)
    setOpenDeleteDialog(true)
  }

  const confirmDelete = () => {
    // Aquí iría la lógica para eliminar el turno
    console.log(`Eliminando turno ${turnoToDelete}`)
    setOpenDeleteDialog(false)
    setTurnoToDelete(null)
    // Recargar datos o actualizar estado
  }

  // Función para formatear la fecha
  const formatFecha = (fechaStr: string) => {
    const fecha = new Date(fechaStr)
    return fecha.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  // Función para obtener el color del badge según el estado
  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "Confirmado":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "En Progreso":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "Completado":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100"
      case "Cancelado":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      default:
        return ""
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fecha</TableHead>
            <TableHead>Categoría</TableHead>
            <TableHead>Área</TableHead>
            <TableHead>Supervisor</TableHead>
            <TableHead>Operarios</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {turnos.map((turno) => (
            <TableRow key={turno.id}>
              <TableCell>{formatFecha(turno.fecha)}</TableCell>
              <TableCell>
                <Badge variant="outline">Turno {turno.categoria}</Badge>
              </TableCell>
              <TableCell>{turno.area}</TableCell>
              <TableCell>{getNombreEmpleado(turno.supervisor)}</TableCell>
              <TableCell>
                <Badge>{turno.operarios.length} operarios</Badge>
              </TableCell>
              <TableCell>
                <Badge className={getEstadoColor(turno.estado)}>{turno.estado}</Badge>
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
                      <Link href={`/turnos/${turno.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        Ver Detalle
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/turnos/editar/${turno.id}`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar Turno
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onClick={() => handleDelete(turno.id)}
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Eliminar Turno
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
            <AlertDialogDescription>Esta acción eliminará el turno y no se puede deshacer.</AlertDialogDescription>
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
