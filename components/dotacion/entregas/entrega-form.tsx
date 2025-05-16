"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { getTiposDotacion, getInventarioDotacion, getEntregaDotacionById } from "@/lib/data/dotacion"
import type { TipoDotacion, InventarioDotacion, EntregaDotacion, ItemEntregaDotacion } from "@/lib/types"

interface EntregaFormProps {
  entregaId?: string
}

export function EntregaForm({ entregaId }: EntregaFormProps) {
  const router = useRouter()
  const isEditing = !!entregaId

  // Estados para el formulario
  const [empleadoId, setEmpleadoId] = useState("")
  const [empleadoNombre, setEmpleadoNombre] = useState("")
  const [fechaEntrega, setFechaEntrega] = useState<Date>(new Date())
  const [observaciones, setObservaciones] = useState("")
  const [estado, setEstado] = useState<"pendiente" | "entregado" | "cancelado">("pendiente")
  const [items, setItems] = useState<ItemEntregaDotacion[]>([])

  // Estados para la selección de items
  const [tiposDotacion, setTiposDotacion] = useState<TipoDotacion[]>([])
  const [inventario, setInventario] = useState<InventarioDotacion[]>([])
  const [selectedTipo, setSelectedTipo] = useState("")
  const [selectedTalla, setSelectedTalla] = useState("")
  const [cantidad, setCantidad] = useState(1)

  // Estado para empleados (simulado)
  const [empleados, setEmpleados] = useState([
    { id: "emp-1", nombre: "Juan Pérez" },
    { id: "emp-2", nombre: "María Rodríguez" },
    { id: "emp-3", nombre: "Carlos Gómez" },
    { id: "emp-4", nombre: "Ana Martínez" },
    { id: "emp-5", nombre: "Luis Sánchez" },
  ])

  // Cargar datos iniciales
  useEffect(() => {
    const fetchData = async () => {
      const [tiposData, inventarioData] = await Promise.all([getTiposDotacion(), getInventarioDotacion()])

      setTiposDotacion(tiposData)
      setInventario(inventarioData)

      // Si estamos editando, cargar los datos de la entrega
      if (isEditing) {
        const entrega = await getEntregaDotacionById(entregaId)
        if (entrega) {
          setEmpleadoId(entrega.empleadoId)
          setEmpleadoNombre(entrega.empleadoNombre)
          setFechaEntrega(new Date(entrega.fechaEntrega))
          setObservaciones(entrega.observaciones || "")
          setEstado(entrega.estado)
          setItems(entrega.items)
        }
      }
    }

    fetchData()
  }, [entregaId, isEditing])

  // Obtener tallas disponibles para el tipo seleccionado
  const tallasDisponibles = inventario
    .filter((item) => item.tipoDotacionId === selectedTipo && item.cantidadDisponible > 0)
    .map((item) => item.talla)

  // Obtener stock disponible para el tipo y talla seleccionados
  const stockDisponible =
    inventario.find((item) => item.tipoDotacionId === selectedTipo && item.talla === selectedTalla)
      ?.cantidadDisponible || 0

  // Obtener nombre del tipo seleccionado
  const nombreTipoSeleccionado = tiposDotacion.find((tipo) => tipo.id === selectedTipo)?.nombre || ""

  // Manejar la selección de empleado
  const handleEmpleadoChange = (id: string) => {
    setEmpleadoId(id)
    const empleado = empleados.find((emp) => emp.id === id)
    if (empleado) {
      setEmpleadoNombre(empleado.nombre)
    }
  }

  // Agregar item a la entrega
  const handleAddItem = () => {
    if (!selectedTipo || !selectedTalla || cantidad <= 0 || cantidad > stockDisponible) {
      return
    }

    const inventarioItem = inventario.find(
      (item) => item.tipoDotacionId === selectedTipo && item.talla === selectedTalla,
    )

    if (!inventarioItem) return

    const newItem: ItemEntregaDotacion = {
      id: `item-${Date.now()}`,
      inventarioDotacionId: inventarioItem.id,
      tipoDotacion: nombreTipoSeleccionado,
      talla: selectedTalla,
      cantidad,
    }

    setItems([...items, newItem])

    // Resetear selección
    setSelectedTipo("")
    setSelectedTalla("")
    setCantidad(1)
  }

  // Eliminar item de la entrega
  const handleRemoveItem = (itemId: string) => {
    setItems(items.filter((item) => item.id !== itemId))
  }

  // Calcular total de items
  const totalItems = items.reduce((sum, item) => sum + item.cantidad, 0)

  // Manejar envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!empleadoId || items.length === 0) {
      return
    }

    const entregaData: EntregaDotacion = {
      id: entregaId || `entrega-${Date.now()}`,
      empleadoId,
      empleadoNombre,
      items,
      fechaEntrega: fechaEntrega.toISOString(),
      observaciones,
      estado,
    }

    console.log("Datos de entrega a guardar:", entregaData)

    // Aquí iría la lógica para guardar la entrega
    // y descontar del inventario

    // Redireccionar a la lista de entregas
    router.push("/dotacion/entregas")
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? "Editar Entrega de Dotación" : "Registrar Entrega de Dotación"}</CardTitle>
          <CardDescription>
            {isEditing
              ? "Modifica los datos de la entrega de dotación"
              : "Completa el formulario para registrar una nueva entrega de dotación"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Datos básicos */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="empleado">Empleado</Label>
              <Select value={empleadoId} onValueChange={handleEmpleadoChange}>
                <SelectTrigger id="empleado">
                  <SelectValue placeholder="Seleccionar empleado" />
                </SelectTrigger>
                <SelectContent>
                  {empleados.map((empleado) => (
                    <SelectItem key={empleado.id} value={empleado.id}>
                      {empleado.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fecha">Fecha de Entrega</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button id="fecha" variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(fechaEntrega, "dd/MM/yyyy", { locale: es })}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={fechaEntrega}
                    onSelect={(date) => date && setFechaEntrega(date)}
                    initialFocus
                    locale={es}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Estado (solo para edición) */}
          {isEditing && (
            <div className="space-y-2">
              <Label htmlFor="estado">Estado</Label>
              <Select value={estado} onValueChange={(value) => setEstado(value as any)}>
                <SelectTrigger id="estado">
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pendiente">Pendiente</SelectItem>
                  <SelectItem value="entregado">Entregado</SelectItem>
                  <SelectItem value="cancelado">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Agregar items */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Items de Dotación</h3>
              <Badge variant="outline">{totalItems} items</Badge>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
              <div>
                <Label htmlFor="tipo">Tipo de Dotación</Label>
                <Select value={selectedTipo} onValueChange={setSelectedTipo}>
                  <SelectTrigger id="tipo">
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {tiposDotacion.map((tipo) => (
                      <SelectItem key={tipo.id} value={tipo.id}>
                        {tipo.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="talla">Talla</Label>
                <Select
                  value={selectedTalla}
                  onValueChange={setSelectedTalla}
                  disabled={!selectedTipo || tallasDisponibles.length === 0}
                >
                  <SelectTrigger id="talla">
                    <SelectValue placeholder="Seleccionar talla" />
                  </SelectTrigger>
                  <SelectContent>
                    {tallasDisponibles.map((talla) => (
                      <SelectItem key={talla} value={talla}>
                        {talla}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="cantidad">Cantidad</Label>
                <div className="flex items-center">
                  <Input
                    id="cantidad"
                    type="number"
                    min={1}
                    max={stockDisponible}
                    value={cantidad}
                    onChange={(e) => setCantidad(Number.parseInt(e.target.value) || 1)}
                    disabled={!selectedTipo || !selectedTalla}
                  />
                  {selectedTipo && selectedTalla && (
                    <span className="ml-2 text-sm text-muted-foreground">Disp: {stockDisponible}</span>
                  )}
                </div>
              </div>

              <div className="flex items-end">
                <Button
                  type="button"
                  onClick={handleAddItem}
                  disabled={!selectedTipo || !selectedTalla || cantidad <= 0 || cantidad > stockDisponible}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Agregar
                </Button>
              </div>
            </div>

            {/* Lista de items */}
            {items.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tipo de Dotación</TableHead>
                    <TableHead>Talla</TableHead>
                    <TableHead>Cantidad</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.tipoDotacion}</TableCell>
                      <TableCell>{item.talla}</TableCell>
                      <TableCell>{item.cantidad}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(item.id)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="rounded-md border border-dashed p-6 text-center text-muted-foreground">
                No hay items agregados a la entrega
              </div>
            )}
          </div>

          {/* Observaciones */}
          <div className="space-y-2">
            <Label htmlFor="observaciones">Observaciones</Label>
            <Textarea
              id="observaciones"
              placeholder="Ingrese observaciones adicionales..."
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => router.push("/dotacion/entregas")}>
            Cancelar
          </Button>
          <Button type="submit" disabled={!empleadoId || items.length === 0}>
            {isEditing ? "Guardar Cambios" : "Registrar Entrega"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
