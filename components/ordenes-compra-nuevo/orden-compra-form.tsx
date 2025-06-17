"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Save } from "lucide-react"
import { toast } from "sonner"
import { crearOrdenCompra, actualizarOrdenCompra, type OrdenCompra } from "@/lib/data/ordenes-compra-nuevo"
import { getProveedores } from "@/lib/data/proveedores"
import { getMateriasPrimas } from "@/lib/data/materia-prima"

interface OrdenCompraFormProps {
  orden?: OrdenCompra
}

interface ItemFormulario {
  materiaPrimaId: string
  materiaPrimaNombre: string
  cantidad: number
  unidad: string
  precioUnitario: number
  subtotal: number
}

export function OrdenCompraForm({ orden }: OrdenCompraFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [proveedores, setProveedores] = useState<any[]>([])
  const [materiasPrimas, setMateriasPrimas] = useState<any[]>([])

  const [formData, setFormData] = useState({
    proveedorId: orden?.proveedorId || "",
    proveedorNombre: orden?.proveedorNombre || "",
    fechaEntregaEstimada: orden?.fechaEntregaEstimada
      ? new Date(orden.fechaEntregaEstimada).toISOString().split("T")[0]
      : "",
    comentarios: orden?.comentarios || "",
  })

  const [items, setItems] = useState<ItemFormulario[]>(
    orden?.items.map((item) => ({
      materiaPrimaId: item.materiaPrimaId,
      materiaPrimaNombre: item.materiaPrimaNombre,
      cantidad: item.cantidad,
      unidad: item.unidad,
      precioUnitario: item.precioUnitario,
      subtotal: item.subtotal,
    })) || [],
  )

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [proveedoresData, materiasPrimasData] = await Promise.all([getProveedores(), getMateriasPrimas()])
        setProveedores(proveedoresData)
        setMateriasPrimas(materiasPrimasData)
      } catch (error) {
        console.error("Error al cargar datos:", error)
        toast.error("Error al cargar los datos necesarios")
      }
    }

    cargarDatos()
  }, [])

  const agregarItem = () => {
    setItems([
      ...items,
      {
        materiaPrimaId: "",
        materiaPrimaNombre: "",
        cantidad: 0,
        unidad: "",
        precioUnitario: 0,
        subtotal: 0,
      },
    ])
  }

  const eliminarItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const actualizarItem = (index: number, campo: keyof ItemFormulario, valor: any) => {
    const nuevosItems = [...items]
    nuevosItems[index] = { ...nuevosItems[index], [campo]: valor }

    // Si se cambia la materia prima, actualizar nombre y unidad
    if (campo === "materiaPrimaId") {
      const materiaPrima = materiasPrimas.find((mp) => mp.id === valor)
      if (materiaPrima) {
        nuevosItems[index].materiaPrimaNombre = materiaPrima.nombre
        nuevosItems[index].unidad = materiaPrima.unidad
      }
    }

    // Recalcular subtotal si cambia cantidad o precio
    if (campo === "cantidad" || campo === "precioUnitario") {
      nuevosItems[index].subtotal = nuevosItems[index].cantidad * nuevosItems[index].precioUnitario
    }

    setItems(nuevosItems)
  }

  const calcularTotal = () => {
    return items.reduce((total, item) => total + item.subtotal, 0)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.proveedorId) {
      toast.error("Selecciona un proveedor")
      return
    }

    if (!formData.fechaEntregaEstimada) {
      toast.error("Ingresa la fecha de entrega estimada")
      return
    }

    if (items.length === 0) {
      toast.error("Agrega al menos un producto")
      return
    }

    const itemsIncompletos = items.some(
      (item) => !item.materiaPrimaId || item.cantidad <= 0 || item.precioUnitario <= 0,
    )

    if (itemsIncompletos) {
      toast.error("Completa todos los campos de los productos")
      return
    }

    setLoading(true)

    try {
      const datosOrden = {
        ...formData,
        items: items.map((item) => ({
          materiaPrimaId: item.materiaPrimaId,
          materiaPrimaNombre: item.materiaPrimaNombre,
          cantidad: item.cantidad,
          unidad: item.unidad,
          precioUnitario: item.precioUnitario,
          subtotal: item.subtotal,
        })),
      }

      let resultado
      if (orden) {
        resultado = await actualizarOrdenCompra(orden.id, datosOrden)
      } else {
        resultado = await crearOrdenCompra(datosOrden)
      }

      if (resultado.success) {
        toast.success(resultado.message)
        router.push(`/ordenes-compra-nuevo/${resultado.orden?.id}`)
      } else {
        toast.error(resultado.message)
      }
    } catch (error) {
      console.error("Error al guardar orden:", error)
      toast.error("Error al guardar la orden de compra")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Información general */}
      <Card>
        <CardHeader>
          <CardTitle>Información General</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="proveedor">Proveedor *</Label>
              <Select
                value={formData.proveedorId}
                onValueChange={(value) => {
                  const proveedor = proveedores.find((p) => p.id === value)
                  setFormData((prev) => ({
                    ...prev,
                    proveedorId: value,
                    proveedorNombre: proveedor?.nombre || "",
                  }))
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un proveedor" />
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
              <Label htmlFor="fechaEntrega">Fecha de Entrega Estimada *</Label>
              <Input
                id="fechaEntrega"
                type="date"
                value={formData.fechaEntregaEstimada}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    fechaEntregaEstimada: e.target.value,
                  }))
                }
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="comentarios">Comentarios</Label>
            <Textarea
              id="comentarios"
              placeholder="Comentarios adicionales sobre la orden..."
              value={formData.comentarios}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  comentarios: e.target.value,
                }))
              }
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Productos */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Productos</CardTitle>
            <Button type="button" onClick={agregarItem} size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Agregar Producto
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {items.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No hay productos agregados. Haz clic en "Agregar Producto" para comenzar.
            </div>
          ) : (
            <div className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Materia Prima</TableHead>
                    <TableHead>Cantidad</TableHead>
                    <TableHead>Unidad</TableHead>
                    <TableHead>Precio Unitario</TableHead>
                    <TableHead>Subtotal</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Select
                          value={item.materiaPrimaId}
                          onValueChange={(value) => actualizarItem(index, "materiaPrimaId", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar..." />
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
                          step="0.01"
                          value={item.cantidad || ""}
                          onChange={(e) => actualizarItem(index, "cantidad", Number.parseFloat(e.target.value) || 0)}
                          className="w-24"
                        />
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.unidad || "-"}</Badge>
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.precioUnitario || ""}
                          onChange={(e) =>
                            actualizarItem(index, "precioUnitario", Number.parseFloat(e.target.value) || 0)
                          }
                          className="w-28"
                        />
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          ${item.subtotal.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => eliminarItem(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Total */}
              <div className="flex justify-end">
                <div className="text-right space-y-2">
                  <div className="text-lg font-semibold">
                    Total: ${calcularTotal().toLocaleString("es-MX", { minimumFractionDigits: 2 })} MXN
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Botones de acción */}
      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancelar
        </Button>
        <Button type="submit" disabled={loading}>
          <Save className="mr-2 h-4 w-4" />
          {loading ? "Guardando..." : orden ? "Actualizar Orden" : "Crear Orden"}
        </Button>
      </div>
    </form>
  )
}
