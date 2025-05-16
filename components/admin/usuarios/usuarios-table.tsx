"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreHorizontal, UserCog } from "lucide-react"
import { getUsuarios } from "@/lib/data/usuarios"
import { getRolesByUsuarioId } from "@/lib/data/roles"
import AsignarRolDialog from "./asignar-rol-dialog"

export default function UsuariosTable() {
  const [usuarios] = useState(getUsuarios())
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<string | null>(null)

  const getInitials = (nombre: string, apellido: string) => {
    return `${nombre.charAt(0)}${apellido.charAt(0)}`.toUpperCase()
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Usuario</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Roles</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Último acceso</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usuarios.map((usuario) => {
              const roles = getRolesByUsuarioId(usuario.id)

              return (
                <TableRow key={usuario.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={usuario.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{getInitials(usuario.nombre, usuario.apellido)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{`${usuario.nombre} ${usuario.apellido}`}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{usuario.email}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {roles.length > 0 ? (
                        roles.map((rol) => (
                          <Badge key={rol.id} variant="outline">
                            {rol.nombre}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-muted-foreground text-sm">Sin roles</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {usuario.activo ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Activo
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                        Inactivo
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {usuario.ultimoAcceso ? (
                      new Date(usuario.ultimoAcceso).toLocaleDateString()
                    ) : (
                      <span className="text-muted-foreground text-sm">Nunca</span>
                    )}
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
                        <DropdownMenuItem onClick={() => setUsuarioSeleccionado(usuario.id)}>
                          <UserCog className="mr-2 h-4 w-4" />
                          Asignar roles
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      <AsignarRolDialog
        usuarioId={usuarioSeleccionado}
        open={!!usuarioSeleccionado}
        onOpenChange={() => setUsuarioSeleccionado(null)}
      />
    </>
  )
}
