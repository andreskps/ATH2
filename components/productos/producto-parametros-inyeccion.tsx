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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { ParametroInyeccion, Producto } from "@/lib/types"

interface ProductoParametrosInyeccionProps {
  producto: Producto
}

export default function ProductoParametrosInyeccion({ producto }: ProductoParametrosInyeccionProps) {
  const [parametros, setParametros] = useState<ParametroInyeccion[]>(producto.parametrosInyeccion)
  const [nuevoParametro, setNuevoParametro] = useState<Omit<ParametroInyeccion, "id">>({
    seccion: "Temperatura",
    maquina: "INY31",
    nombre: "",
    valor: 0,
    unidad: "",
  })
  const [dialogOpen, setDialogOpen] = useState(false)
  const [parametroToDelete, setParametroToDelete] = useState<ParametroInyeccion | null>(null)
  const [maquinaActiva, setMaquinaActiva] = useState<"INY31" | "INY32" | "INY33">("INY31")

  const secciones = ["Carga", "Expulsión", "Cierre y Apertura", "Inyección", "Temperatura"]

  const handleAddParametro = () => {
    if (!nuevoParametro.nombre || nuevoParametro.valor <= 0) {
      return
    }

    const newId = parametros.length > 0 ? Math.max(...parametros.map((p) => p.id)) + 1 : 1
    const newParametro = { ...nuevoParametro, id: newId }

    setParametros([...parametros, newParametro])
    setNuevoParametro({
      seccion: "Temperatura",
      maquina: "INY31",
      nombre: "",
      valor: 0,
      unidad: "",
    })
    setDialogOpen(false)
  }

  const handleDeleteParametro = (parametro: ParametroInyeccion) => {
    setParametroToDelete(null)
    setParametros(parametros.filter((p) => p.id !== parametro.id))
  }

  const filteredParametros = parametros.filter((p) => p.maquina === maquinaActiva)

  // Agrupar parámetros por sección
  const parametrosPorSeccion = secciones.map((seccion) => {
    return {
      seccion,
      parametros: filteredParametros.filter((p) => p.seccion === seccion),
    }
  })

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Parámetros de Inyección</CardTitle>
          <CardDescription>Configuraciones para las máquinas de inyección.</CardDescription>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>Añadir Parámetro</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Añadir Nuevo Parámetro</DialogTitle>
              <DialogDescription>Ingrese los detalles del parámetro de inyección.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="maquina">Máquina</Label>
                  <Select
                    value={nuevoParametro.maquina}
                    onValueChange={(value) =>
                      setNuevoParametro({ ...nuevoParametro, maquina: value as "INY31" | "INY32" | "INY33" })
                    }
                  >
                    <SelectTrigger id="maquina">
                      <SelectValue placeholder="Seleccione una máquina" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="INY31">INY31</SelectItem>
                      <SelectItem value="INY32">INY32</SelectItem>
                      <SelectItem value="INY33">INY33</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="seccion">Sección</Label>
                  <Select
                    value={nuevoParametro.seccion}
                    onValueChange={(value) =>
                      setNuevoParametro({
                        ...nuevoParametro,
                        seccion: value as "Carga" | "Expulsión" | "Cierre y Apertura" | "Inyección" | "Temperatura",
                      })
                    }
                  >
                    <SelectTrigger id="seccion">
                      <SelectValue placeholder="Seleccione una sección" />
                    </SelectTrigger>
                    <SelectContent>
                      {secciones.map((seccion) => (
                        <SelectItem key={seccion} value={seccion}>
                          {seccion}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="nombre">Nombre del Parámetro</Label>
                <Input
                  id="nombre"
                  value={nuevoParametro.nombre}
                  onChange={(e) => setNuevoParametro({ ...nuevoParametro, nombre: e.target.value })}
                  placeholder="Ej: Zona 1"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="valor">Valor</Label>
                  <Input
                    id="valor"
                    type="number"
                    value={nuevoParametro.valor || ""}
                    onChange={(e) =>
                      setNuevoParametro({ ...nuevoParametro, valor: Number.parseFloat(e.target.value) || 0 })
                    }
                    placeholder="Ej: 280"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="unidad">Unidad</Label>
                  <Input
                    id="unidad"
                    value={nuevoParametro.unidad}
                    onChange={(e) => setNuevoParametro({ ...nuevoParametro, unidad: e.target.value })}
                    placeholder="Ej: °C"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddParametro}>Añadir Parámetro</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="INY31" className="w-full" onValueChange={(value) => setMaquinaActiva(value as any)}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="INY31">INY31</TabsTrigger>
            <TabsTrigger value="INY32">INY32</TabsTrigger>
            <TabsTrigger value="INY33">INY33</TabsTrigger>
          </TabsList>

          <TabsContent value={maquinaActiva}>
            {parametrosPorSeccion.every((grupo) => grupo.parametros.length === 0) ? (
              <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
                <p className="text-sm text-muted-foreground">
                  No hay parámetros registrados para la máquina {maquinaActiva}.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {parametrosPorSeccion.map(
                  (grupo) =>
                    grupo.parametros.length > 0 && (
                      <div key={grupo.seccion}>
                        <h3 className="text-lg font-medium mb-4">{grupo.seccion}</h3>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Nombre</TableHead>
                              <TableHead>Valor</TableHead>
                              <TableHead>Unidad</TableHead>
                              <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {grupo.parametros.map((parametro) => (
                              <TableRow key={parametro.id}>
                                <TableCell className="font-medium">{parametro.nombre}</TableCell>
                                <TableCell>{parametro.valor}</TableCell>
                                <TableCell>{parametro.unidad}</TableCell>
                                <TableCell className="text-right">
                                  <AlertDialog
                                    open={parametroToDelete?.id === parametro.id}
                                    onOpenChange={(open) => !open && setParametroToDelete(null)}
                                  >
                                    <AlertDialogTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-red-500 hover:text-red-700 hover:bg-red-100"
                                        onClick={() => setParametroToDelete(parametro)}
                                      >
                                        <Trash2 className="h-4 w-4" />
                                        <span className="sr-only">Eliminar</span>
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>¿Eliminar parámetro?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          Esta acción eliminará el parámetro "{parametro.nombre}" de este producto.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                        <AlertDialogAction
                                          onClick={() => handleDeleteParametro(parametro)}
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
                      </div>
                    ),
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
