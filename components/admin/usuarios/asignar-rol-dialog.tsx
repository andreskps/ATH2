"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getRoles, getRolesByUsuarioId, asignarRolAUsuario, desasignarRolDeUsuario } from "@/lib/data/roles"
import { getUsuarioById } from "@/lib/data/usuarios"

interface AsignarRolDialogProps {
  usuarioId: string | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function AsignarRolDialog({ usuarioId, open, onOpenChange }: AsignarRolDialogProps) {
  const [rolesSeleccionados, setRolesSeleccionados] = useState<string[]>([])
  const roles = getRoles()
  const usuario = usuarioId ? getUsuarioById(usuarioId) : null

  useEffect(() => {
    if (usuarioId) {
      const rolesUsuario = getRolesByUsuarioId(usuarioId)
      setRolesSeleccionados(rolesUsuario.map((rol) => rol.id))
    } else {
      setRolesSeleccionados([])
    }
  }, [usuarioId])

  const handleToggleRol = (rolId: string) => {
    if (!usuarioId) return

    if (rolesSeleccionados.includes(rolId)) {
      desasignarRolDeUsuario(usuarioId, rolId)
      setRolesSeleccionados((prev) => prev.filter((id) => id !== rolId))
    } else {
      asignarRolAUsuario(usuarioId, rolId)
      setRolesSeleccionados((prev) => [...prev, rolId])
    }
  }

  if (!usuario) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Asignar roles a usuario</DialogTitle>
          <DialogDescription>{`Selecciona los roles para ${usuario.nombre} ${usuario.apellido}`}</DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-72 pr-4">
          <div className="space-y-4">
            {roles.map((rol) => (
              <div key={rol.id} className="flex items-start space-x-3 space-y-0">
                <Checkbox
                  id={`rol-${rol.id}`}
                  checked={rolesSeleccionados.includes(rol.id)}
                  onCheckedChange={() => handleToggleRol(rol.id)}
                />
                <div className="space-y-1 leading-none">
                  <Label htmlFor={`rol-${rol.id}`} className="font-medium">
                    {rol.nombre}
                  </Label>
                  <p className="text-sm text-muted-foreground">{rol.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="flex justify-end">
          <Button onClick={() => onOpenChange(false)}>Cerrar</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
