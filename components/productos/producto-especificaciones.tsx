"use client"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import type { EspecificacionTecnica, Producto } from "@/lib/types"

interface ProductoEspecificacionesProps {
  producto: Producto
}

export default function ProductoEspecificaciones({ producto }: ProductoEspecificacionesProps) {
  const [especificaciones, setEspecificaciones] = useState<EspecificacionTecnica[]>(producto.especificaciones)
  const [nuevaEspecificacion, setNuevaEspecificacion] = useState<Omit<EspecificacionTecnica, "id">>({
    nombre: "",
    estandar: 0,
    desviacion: 0,
    minimo: 0,
    maximo: 0,
    unidad: "",
  })
  const [dialogOpen, setDialogOpen] = useState(false)
  const [especificacionToDelete, setEspecificacionToDelete] = useState<EspecificacionTecnica | null>(null)

  const handleAddEspecificacion = () => {
    if (!nuevaEspecificacion.nombre || nuevaEspecificacion.estandar <= 0) {
      return
    }

    const newId = especificaciones.length > 0 ? Math.max(...especificaciones.map((e) => e.id)) + 1 : 1
    const newEspecificacion = { ...nuevaEspecificacion, id: newId }

    setEspecificaciones([...especificaciones, newEspecificacion])
    setNuevaEspecificacion({
      nombre: "",
      estandar: 0,
      desviacion: 0,
      minimo: 0,
      maximo: 0,
      unidad: "",
    })
    setDialogOpen(false)
  }

  const handleDeleteEspecificacion = (especificacion: EspecificacionTecnica) => {
    setEspecificacionToDelete(null)
    setEspecificaciones(especificaciones.filter((e) => e.id !== especificacion.id))
  }

  const handleEstandarChange = (value: number) => {
    const desviacion = nuevaEspecificacion.desviacion || 0
    setNuevaEspecificacion({
      ...nuevaEspecificacion,
      estandar: value,
      minimo: value - desviacion,
      maximo: value + desviacion,
    })
  }

  const handleDesviacionChange = (value: number) => {
    const estandar = nuevaEspecificacion.estandar || 0
    setNuevaEspecificacion({
      ...nuevaEspecificacion,
      desviacion: value,
      minimo: estandar - value,
      maximo: estandar + value,
    })
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Especificaciones Técnicas</CardTitle>
          <CardDescription>Parámetros técnicos y tolerancias del producto.</CardDescription>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>Añadir Especificación</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Añadir Nueva Especificación</DialogTitle>
              <DialogDescription>Ingrese los detalles de la especificación técnica.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="nombre">Nombre</Label>
                  <Input
                    id="nombre"
                    value={nuevaEspecificacion.nombre}
                    onChange={(e) => setNuevaEspecificacion({ ...nuevaEspecificacion, nombre: e.target.value })}
                    placeholder="Ej: Peso"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="unidad">Unidad</Label>
                  <Input
                    id="unidad"
                    value={nuevaEspecificacion.unidad}
                    onChange={(e) => setNuevaEspecificacion({ ...nuevaEspecificacion, unidad: e.target.value })}
                    placeholder="Ej: g"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="estandar">Estándar</Label>
                  <Input
                    id="estandar"
                    type="number"
                    value={nuevaEspecificacion.estandar || ""}
                    onChange={(e) => handleEstandarChange(Number.parseFloat(e.target.value) || 0)}
                    placeholder="Ej: 15.5"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="desviacion">Desviación</Label>
                  <Input
                    id="desviacion"
                    type="number"
                    value={nuevaEspecificacion.desviacion || ""}
                    onChange={(e) => handleDesviacionChange(Number.parseFloat(e.target.value) || 0)}
                    placeholder="Ej: 0.2"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="minimo">Mínimo</Label>
                  <Input
                    id="minimo"
                    type="number"
                    value={nuevaEspecificacion.minimo || ""}
                    onChange={(e) =>
                      setNuevaEspecificacion({ ...nuevaEspecificacion, minimo: Number.parseFloat(e.target.value) || 0 })
                    }
                    placeholder="Ej: 15.3"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="maximo">Máximo</Label>
                  <Input
                    id="maximo"
                    type="number"
                    value={nuevaEspecificacion.maximo || ""}
                    onChange={(e) =>
                      setNuevaEspecificacion({ ...nuevaEspecificacion, maximo: Number.parseFloat(e.target.value) || 0 })
                    }
                    placeholder="Ej: 15.7"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddEspecificacion}>Añadir Especificación</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {especificaciones.length === 0 ? (
          <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
            <p className="text-sm text-muted-foreground">
              No hay especificaciones técnicas registradas para este producto.
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Estándar</TableHead>
                <TableHead>Desviación</TableHead>
                <TableHead>Mínimo</TableHead>
                <TableHead>Máximo</TableHead>
                <TableHead>Unidad</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {especificaciones.map((especificacion) => (
                <TableRow key={especificacion.id}>
                  <TableCell className="font-medium">{especificacion.nombre}</TableCell>
                  <TableCell>{especificacion.estandar}</TableCell>
                  <TableCell>{especificacion.desviacion}</TableCell>
                  <TableCell>{especificacion.minimo}</TableCell>
                  <TableCell>{especificacion.maximo}</TableCell>
                  <TableCell>{especificacion.unidad}</TableCell>
                  <TableCell className="text-right">
                    <AlertDialog
                      open={especificacionToDelete?.id === especificacion.id}
                      onOpenChange={(open) => !open && setEspecificacionToDelete(null)}
                    >
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-700 hover:bg-red-100"
                          onClick={() => setEspecificacionToDelete(especificacion)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Eliminar</span>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>¿Eliminar especificación?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta acción eliminará la especificación "{especificacion.nombre}" de este producto.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteEspecificacion(especificacion)}
                            className="bg-red-500 hover:bg-red-600"
                          >
                            Eliminar
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
