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
import { getClientes } from "@/lib/data/clientes"
import type { Cliente } from "@/lib/types"
import ClientesTableHeader from "./clientes-table-header"

export default function ClientesTable() {
  const router = useRouter()
  const [clientes, setClientes] = useState<Cliente[]>(getClientes())
  const [filteredClientes, setFilteredClientes] = useState<Cliente[]>(clientes)
  const [clienteToToggle, setClienteToToggle] = useState<Cliente | null>(null)
  const [clienteToDelete, setClienteToDelete] = useState<Cliente | null>(null)

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredClientes(clientes)
      return
    }

    const lowercaseQuery = query.toLowerCase()
    const filtered = clientes.filter(
      (cliente) => cliente.nombre.toLowerCase().includes(lowercaseQuery) || cliente.nit.includes(query),
    )

    setFilteredClientes(filtered)
  }

  const handleToggleEstado = (cliente: Cliente) => {
    setClienteToToggle(null)

    // Aquí iría la lógica para cambiar el estado del cliente en la base de datos
    const updatedClientes = clientes.map((c) => {
      if (c.id === cliente.id) {
        return { ...c, estado: c.estado === "Activo" ? "Inactivo" : "Activo" }
      }
      return c
    })

    setClientes(updatedClientes)
    setFilteredClientes(updatedClientes)
    router.refresh()
  }

  const handleDeleteCliente = (cliente: Cliente) => {
    setClienteToDelete(null)

    // Aquí iría la lógica para eliminar el cliente de la base de datos
    const updatedClientes = clientes.filter((c) => c.id !== cliente.id)
    setClientes(updatedClientes)
    setFilteredClientes(updatedClientes)
    router.refresh()
  }

  return (
    <div>
      <ClientesTableHeader onSearch={handleSearch} />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>NIT</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Ciudad</TableHead>
              <TableHead>Teléfono</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Modo de Pago</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClientes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No se encontraron clientes
                </TableCell>
              </TableRow>
            ) : (
              filteredClientes.map((cliente) => (
                <TableRow key={cliente.id}>
                  <TableCell className="font-medium">{cliente.nit}</TableCell>
                  <TableCell>{cliente.nombre}</TableCell>
                  <TableCell>{cliente.ciudad}</TableCell>
                  <TableCell>{cliente.telefono}</TableCell>
                  <TableCell>{cliente.email || "-"}</TableCell>
                  <TableCell>{cliente.modoPago}</TableCell>
                  <TableCell>
                    <Badge
                      variant={cliente.estado === "Activo" ? "default" : "secondary"}
                      className={
                        cliente.estado === "Activo"
                          ? "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100"
                          : "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-100"
                      }
                    >
                      {cliente.estado}
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
                          <Link href={`/clientes/${cliente.id}`} className="flex items-center gap-2">
                            <Eye className="h-4 w-4" />
                            <span>Ver detalles</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/clientes/editar/${cliente.id}`} className="flex items-center gap-2">
                            <Pencil className="h-4 w-4" />
                            <span>Editar</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <AlertDialog
                          open={clienteToToggle?.id === cliente.id}
                          onOpenChange={(open) => !open && setClienteToToggle(null)}
                        >
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem
                              className="flex items-center gap-2"
                              onSelect={(e) => {
                                e.preventDefault()
                                setClienteToToggle(cliente)
                              }}
                            >
                              {cliente.estado === "Activo" ? (
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
                                {cliente.estado === "Activo" ? "¿Desactivar cliente?" : "¿Activar cliente?"}
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                {cliente.estado === "Activo"
                                  ? "El cliente no podrá realizar nuevos pedidos mientras esté inactivo."
                                  : "El cliente podrá realizar pedidos nuevamente."}
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleToggleEstado(cliente)}
                                className={cliente.estado === "Activo" ? "bg-red-500 hover:bg-red-600" : ""}
                              >
                                {cliente.estado === "Activo" ? "Desactivar" : "Activar"}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>

                        <AlertDialog
                          open={clienteToDelete?.id === cliente.id}
                          onOpenChange={(open) => !open && setClienteToDelete(null)}
                        >
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem
                              className="flex items-center gap-2 text-red-500 focus:text-red-500"
                              onSelect={(e) => {
                                e.preventDefault()
                                setClienteToDelete(cliente)
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span>Eliminar</span>
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>¿Eliminar cliente permanentemente?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta acción no se puede deshacer. Se eliminará permanentemente el cliente del sistema.
                                <br />
                                <br />
                                <strong>Recomendación:</strong> En lugar de eliminar, considera desactivar al cliente
                                para mantener su historial.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteCliente(cliente)}
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
