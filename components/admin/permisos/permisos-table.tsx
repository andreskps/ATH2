"use client"

import type { Permiso } from "@/lib/data/roles"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import PermisoActions from "./permiso-actions"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface PermisosTableProps {
  permisos: Permiso[]
}

export default function PermisosTable({ permisos }: PermisosTableProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPermisos = permisos.filter(
    (permiso) =>
      permiso.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      permiso.modulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      permiso.descripcion.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar permisos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Módulo</TableHead>
              <TableHead>Acción</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead className="w-[100px]">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPermisos.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No se encontraron permisos.
                </TableCell>
              </TableRow>
            ) : (
              filteredPermisos.map((permiso) => (
                <TableRow key={permiso.id}>
                  <TableCell className="font-medium">{permiso.nombre}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {permiso.modulo}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getAccionVariant(permiso.accion)} className="capitalize">
                      {permiso.accion}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{permiso.descripcion}</TableCell>
                  <TableCell>
                    <PermisoActions permiso={permiso} />
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

function getAccionVariant(accion: string): "default" | "secondary" | "destructive" | "outline" {
  switch (accion) {
    case "ver":
      return "outline"
    case "crear":
      return "default"
    case "editar":
      return "secondary"
    case "eliminar":
      return "destructive"
    case "exportar":
      return "outline"
    default:
      return "outline"
  }
}
