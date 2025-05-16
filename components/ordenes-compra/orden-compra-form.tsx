"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon, Loader2, Plus, Trash2 } from "lucide-react"
import BackButton from "@/components/ui/back-button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { OrdenCompra } from "@/lib/data/ordenes-compra"
import { Badge } from "@/components/ui/badge"

// Simulación de datos de proveedores
const proveedores = [
  { id: "1", nombre: "Plásticos Industriales S.A." },
  { id: "2", nombre: "Químicos del Norte" },
  { id: "3", nombre: "Polímeros Avanzados" },
  { id: "4", nombre: "Distribuidora de Resinas" },
  { id: "5", nombre: "Aditivos Especiales" },
]

// Simulación de datos de materias primas
const materiasPrimas = [
  { id: "1", nombre: "Polietileno de alta densidad", unidad: "kg" },
  { id: "2", nombre: "Polipropileno", unidad: "kg" },
  { id: "3", nombre: "PET", unidad: "kg" },
  { id: "4", nombre: "Pigmento azul", unidad: "g" },
  { id: "5", nombre: "Aditivo UV", unidad: "g" },
  { id: "6", nombre: "Masterbatch", unidad: "kg" },
  { id: "7", nombre: "PET reciclado", unidad: "kg" },
]

interface OrdenCompraFormProps {
  ordenCompra?: OrdenCompra
  initialData?: any
  isEditing?: boolean
}

export function OrdenCompraForm({ ordenCompra, initialData, isEditing = false }: OrdenCompraFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [proveedorId, setProveedorId] = useState(ordenCompra?.proveedorId || initialData?.proveedorId || "")
  const [fechaEntrega, setFechaEntrega] = useState<Date | undefined>(
    ordenCompra?.fechaEntregaEstimada ? new Date(ordenCompra.fechaEntregaEstimada) : undefined,
  )
  const [comentarios, setComentarios] = useState(ordenCompra?.comentarios || initialData?.comentarios || "")
  const [items, setItems] = useState<
    Array<{
      id: string
      materiaPrimaId: string
      cantidad: number
      precioUnitario: number
      comentario?: string
    }>
  >(
    ordenCompra?.items.map((item) => ({
      id: item.id,
      materiaPrimaId: item.materiaPrimaId,
      cantidad: item.cantidad,
      precioUnitario: item.precioUnitario,
      comentario: "",
    })) ||
      initialData?.items ||
      [],
  )

  // Efecto para actualizar el estado cuando cambian los datos iniciales
  useEffect(() => {
    if (initialData) {
      setProveedorId(initialData.proveedorId || "")
      setComentarios(initialData.comentarios || "")
      setItems(initialData.items || [])
    }
  }, [initialData])

  // Calcular el total
  const total = items.reduce((sum, item) => {
    return sum + item.cantidad * item.precioUnitario
  }, 0)

  // Agregar un nuevo ítem
  const agregarItem = () => {
    setItems([
      ...items,
      {
        id: Math.random().toString(36).substring(7),
        materiaPrimaId: "",
        cantidad: 0,
        precioUnitario: 0,
        comentario: "",
      },
    ])
  }

  // Eliminar un ítem
  const eliminarItem = (index: number) => {
    const nuevosItems = [...items]
    nuevosItems.splice(index, 1)
    setItems(nuevosItems)
  }

  // Actualizar un ítem
  const actualizarItem = (index: number, campo: string, valor: string | number) => {
    const nuevosItems = [...items]
    nuevosItems[index] = {
      ...nuevosItems[index],
      [campo]: valor,
    }
    setItems(nuevosItems)
  }

  // Obtener la unidad de medida de una materia prima
  const getUnidadMateriaPrima = (materiaPrimaId: string) => {
    const materiaPrima = materiasPrimas.find((mp) => mp.id === materiaPrimaId)
    return materiaPrima?.unidad || ""
  }

  // Obtener el nombre de una materia prima
  const getNombreMateriaPrima = (materiaPrimaId: string) => {
    const materiaPrima = materiasPrimas.find((mp) => mp.id === materiaPrimaId)
    return materiaPrima?.nombre || ""
  }

  // Manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!proveedorId || items.length === 0) {
      return
    }

    setIsSubmitting(true)

    try {
      // Aquí iría la lógica para guardar la orden de compra
      console.log({
        proveedorId,
        fechaEntrega,
        comentarios,
        items,
        total,
      })

      // Simular un retraso de red
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirigir a la lista de órdenes de compra
      router.push("/ordenes-compra")
      router.refresh()
    } catch (error) {
      console.error("Error al guardar la orden de compra:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <BackButton />
        <h1 className="text-xl font-semibold">{isEditing ? "Editar Orden de Compra" : "Nueva Orden de Compra"}</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Información General</CardTitle>
              <CardDescription>Datos básicos de la orden de compra</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="proveedor">Proveedor</Label>
                <Select value={proveedorId} onValueChange={setProveedorId}>
                  <SelectTrigger id="proveedor">
                    <SelectValue placeholder="Seleccionar proveedor" />
                  </SelectTrigger>
                  <SelectContent>
                    {proveedores.map((proveedor) => (
                      <SelectItem key={proveedor.id} value={proveedor.id}>
                        {proveedor.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fechaEntrega">Fecha estimada de entrega</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !fechaEntrega && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {fechaEntrega ? format(fechaEntrega, "PPP", { locale: es }) : <span>Seleccionar fecha</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={fechaEntrega}
                      onSelect={setFechaEntrega}
                      initialFocus
                      locale={es}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="comentarios">Comentarios adicionales</Label>
                <Textarea
                  id="comentarios"
                  value={comentarios}
                  onChange={(e) => setComentarios(e.target.value)}
                  placeholder="Ingrese comentarios adicionales sobre la orden"
                  className="min-h-[120px]"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resumen</CardTitle>
              <CardDescription>Resumen de la orden de compra</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Total de ítems:</span>
                <span>{items.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Subtotal:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Impuestos:</span>
                <span>${(total * 0.16).toFixed(2)}</span>
              </div>
              <div className="border-t pt-4 flex justify-between items-center">
                <span className="text-base font-bold">Total:</span>
                <span className="text-xl font-bold">${(total * 1.16).toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isSubmitting || !proveedorId || items.length === 0}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  "Guardar Orden de Compra"
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Materias Primas</CardTitle>
              <CardDescription>Agregue las materias primas a la orden</CardDescription>
            </div>
            <Button type="button" onClick={agregarItem} variant="outline" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Agregar Materia Prima
            </Button>
          </CardHeader>
          <CardContent>
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Badge variant="outline" className="mb-2">
                  Sin materias primas
                </Badge>
                <p className="text-sm text-muted-foreground">
                  No hay materias primas agregadas a esta orden de compra.
                </p>
                <Button type="button" onClick={agregarItem} variant="outline" size="sm" className="mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Agregar Materia Prima
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Materia Prima</TableHead>
                      <TableHead>Cantidad</TableHead>
                      <TableHead>Unidad</TableHead>
                      <TableHead>Precio Unitario</TableHead>
                      <TableHead>Subtotal</TableHead>
                      <TableHead>Comentarios</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((item, index) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Select
                            value={item.materiaPrimaId}
                            onValueChange={(value) => actualizarItem(index, "materiaPrimaId", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar materia prima" />
                            </SelectTrigger>
                            <SelectContent>
                              {materiasPrimas.map((mp) => (
                                <SelectItem key={mp.id} value={mp.id}>
                                  {mp.nombre}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            min="0"
                            value={item.cantidad}
                            onChange={(e) => actualizarItem(index, "cantidad", Number.parseFloat(e.target.value) || 0)}
                            className="w-24"
                          />
                        </TableCell>
                        <TableCell>{getUnidadMateriaPrima(item.materiaPrimaId)}</TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            value={item.precioUnitario}
                            onChange={(e) =>
                              actualizarItem(index, "precioUnitario", Number.parseFloat(e.target.value) || 0)
                            }
                            className="w-24"
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          ${(item.cantidad * item.precioUnitario).toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Input
                            value={item.comentario || ""}
                            onChange={(e) => actualizarItem(index, "comentario", e.target.value)}
                            placeholder="Comentario"
                          />
                        </TableCell>
                        <TableCell>
                          <Button type="button" variant="ghost" size="icon" onClick={() => eliminarItem(index)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
