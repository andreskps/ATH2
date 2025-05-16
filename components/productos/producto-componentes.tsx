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
import type { ComponenteProducto, Producto } from "@/lib/types"

interface ProductoComponentesProps {
  producto: Producto
}

export default function ProductoComponentes({ producto }: ProductoComponentesProps) {
  const [componentes, setComponentes] = useState<ComponenteProducto[]>(producto.componentes)
  const [nuevoComponente, setNuevoComponente] = useState<Omit<ComponenteProducto, "id">>({
    nombre: "",
    cantidad: 0,
    unidad: "g",
  })
  const [dialogOpen, setDialogOpen] = useState(false)
  const [componenteToDelete, setComponenteToDelete] = useState<ComponenteProducto | null>(null)

  const handleAddComponente = () => {
    if (!nuevoComponente.nombre || nuevoComponente.cantidad <= 0) {
      return
    }

    const newId = componentes.length > 0 ? Math.max(...componentes.map((c) => c.id)) + 1 : 1
    const newComponente = { ...nuevoComponente, id: newId }

    setComponentes([...componentes, newComponente])
    setNuevoComponente({
      nombre: "",
      cantidad: 0,
      unidad: "g",
    })
    setDialogOpen(false)
  }

  const handleDeleteComponente = (componente: ComponenteProducto) => {
    setComponenteToDelete(null)
    setComponentes(componentes.filter((c) => c.id !== componente.id))
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Componentes del Producto</CardTitle>
          <CardDescription>Materiales utilizados en la fabricación del producto.</CardDescription>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>Añadir Componente</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Añadir Nuevo Componente</DialogTitle>
              <DialogDescription>Ingrese los detalles del componente a añadir.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="nombre">Nombre del Componente</Label>
                <Input
                  id="nombre"
                  value={nuevoComponente.nombre}
                  onChange={(e) => setNuevoComponente({ ...nuevoComponente, nombre: e.target.value })}
                  placeholder="Ej: PET Virgen"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="cantidad">Cantidad</Label>
                  <Input
                    id="cantidad"
                    type="number"
                    value={nuevoComponente.cantidad || ""}
                    onChange={(e) =>
                      setNuevoComponente({ ...nuevoComponente, cantidad: Number.parseFloat(e.target.value) || 0 })
                    }
                    placeholder="Ej: 12.5"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="unidad">Unidad</Label>
                  <Input
                    id="unidad"
                    value={nuevoComponente.unidad}
                    onChange={(e) => setNuevoComponente({ ...nuevoComponente, unidad: e.target.value })}
                    placeholder="Ej: g"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddComponente}>Añadir Componente</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {componentes.length === 0 ? (
          <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
            <p className="text-sm text-muted-foreground">No hay componentes registrados para este producto.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Cantidad</TableHead>
                <TableHead>Unidad</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {componentes.map((componente) => (
                <TableRow key={componente.id}>
                  <TableCell className="font-medium">{componente.nombre}</TableCell>
                  <TableCell>{componente.cantidad}</TableCell>
                  <TableCell>{componente.unidad}</TableCell>
                  <TableCell className="text-right">
                    <AlertDialog
                      open={componenteToDelete?.id === componente.id}
                      onOpenChange={(open) => !open && setComponenteToDelete(null)}
                    >
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-700 hover:bg-red-100"
                          onClick={() => setComponenteToDelete(componente)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Eliminar</span>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>¿Eliminar componente?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta acción eliminará el componente "{componente.nombre}" de este producto.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteComponente(componente)}
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
