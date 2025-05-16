"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, Pencil, MoreHorizontal, UserX, UserCheck, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { Badge } from "@/components/ui/badge"
import { getEmpleados } from "@/lib/data/empleados"
import type { Empleado } from "@/lib/types"
import EmpleadosTableHeader from "./empleados-table-header"

export default function EmpleadosTable() {
  const router = useRouter()
  const [empleados, setEmpleados] = useState<Empleado[]>(getEmpleados())
  const [filteredEmpleados, setFilteredEmpleados] = useState<Empleado[]>(empleados)
  const [empleadoToToggle, setEmpleadoToToggle] = useState<Empleado | null>(null)
  const [empleadoToDelete, setEmpleadoToDelete] = useState<Empleado | null>(null)

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredEmpleados(empleados)
      return
    }

    const lowercaseQuery = query.toLowerCase()
    const filtered = empleados.filter(
      (empleado) =>
        empleado.nombre.toLowerCase().includes(lowercaseQuery) ||
        empleado.apellidos.toLowerCase().includes(lowercaseQuery) ||
        empleado.cedula.includes(query),
    )

    setFilteredEmpleados(filtered)
  }

  const handleToggleEstado = (empleado: Empleado) => {
    setEmpleadoToToggle(null)

    // Aquí iría la lógica para cambiar el estado del empleado en la base de datos
    const updatedEmpleados = empleados.map((e) => {
      if (e.id === empleado.id) {
        return { ...e, estado: e.estado === "Activo" ? "Inactivo" : "Activo" }
      }
      return e
    })

    setEmpleados(updatedEmpleados)
    setFilteredEmpleados(updatedEmpleados)
    router.refresh()
  }

  const handleDeleteEmpleado = (empleado: Empleado) => {
    setEmpleadoToDelete(null)

    // Aquí iría la lógica para eliminar el empleado de la base de datos
    const updatedEmpleados = empleados.filter((e) => e.id !== empleado.id)
    setEmpleados(updatedEmpleados)
    setFilteredEmpleados(updatedEmpleados)
    router.refresh()
  }

  return (
    <div>
      <EmpleadosTableHeader onSearch={handleSearch} />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Empleado</TableHead>
              <TableHead>Cédula</TableHead>
              <TableHead>Cargo</TableHead>
              <TableHead>Contacto</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmpleados.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No se encontraron empleados
                </TableCell>
              </TableRow>
            ) : (
              filteredEmpleados.map((empleado) => (
                <TableRow key={empleado.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src={empleado.foto || "/placeholder.svg"} alt={empleado.nombre} />
                        <AvatarFallback>
                          {empleado.nombre
                            .split(" ")
                            .map((name) => name[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div>
                          {empleado.nombre} {empleado.apellidos}
                        </div>
                        <div className="text-xs text-muted-foreground">{empleado.turno || "Sin turno asignado"}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{empleado.cedula}</TableCell>
                  <TableCell>{empleado.cargo}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{empleado.celular}</span>
                      {empleado.email && <span className="text-xs text-muted-foreground">{empleado.email}</span>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={empleado.estado === "Activo" ? "default" : "secondary"}
                      className={
                        empleado.estado === "Activo"
                          ? "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100"
                          : "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-100"
                      }
                    >
                      {empleado.estado}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Abrir menú</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/empleados/${empleado.id}`} className="flex items-center gap-2">
                            <Eye className="h-4 w-4" />
                            <span>Ver detalles</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/empleados/editar/${empleado.id}`} className="flex items-center gap-2">
                            <Pencil className="h-4 w-4" />
                            <span>Editar</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <AlertDialog
                          open={empleadoToToggle?.id === empleado.id}
                          onOpenChange={(open) => !open && setEmpleadoToToggle(null)}
                        >
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem
                              className="flex items-center gap-2"
                              onSelect={(e) => {
                                e.preventDefault()
                                setEmpleadoToToggle(empleado)
                              }}
                            >
                              {empleado.estado === "Activo" ? (
                                <>
                                  <UserX className="h-4 w-4" />
                                  <span>Desactivar</span>
                                </>
                              ) : (
                                <>
                                  <UserCheck className="h-4 w-4" />
                                  <span>Activar</span>
                                </>
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
                                onClick={() => handleToggleEstado(empleado)}
                                className={empleado.estado === "Activo" ? "bg-red-500 hover:bg-red-600" : ""}
                              >
                                {empleado.estado === "Activo" ? "Desactivar" : "Activar"}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>

                        <AlertDialog
                          open={empleadoToDelete?.id === empleado.id}
                          onOpenChange={(open) => !open && setEmpleadoToDelete(null)}
                        >
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem
                              className="flex items-center gap-2 text-red-500 focus:text-red-500"
                              onSelect={(e) => {
                                e.preventDefault()
                                setEmpleadoToDelete(empleado)
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span>Eliminar</span>
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>¿Eliminar empleado permanentemente?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta acción no se puede deshacer. Se eliminará permanentemente el empleado del sistema.
                                <br />
                                <br />
                                <strong>Recomendación:</strong> En lugar de eliminar, considera desactivar al empleado
                                para mantener su historial.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteEmpleado(empleado)}
                                className="bg-red-500 hover:bg-red-600"
                              >
                                Eliminar
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
