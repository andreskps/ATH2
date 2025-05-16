"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon, Plus, Trash2, Package, Factory, AlertCircle, FileText, Upload, X, Eye } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { getClientes } from "@/lib/data/clientes"
import { formasPago, productos, createOrden, getOrdenById, updateOrden } from "@/lib/data/ordenes"
import { getStockDisponible } from "@/lib/data/inventario"

interface OrdenFormProps {
  ordenId?: number
}

export function OrdenForm({ ordenId }: OrdenFormProps) {
  const router = useRouter()
  const clientes = getClientes()
  const [isLoading, setIsLoading] = useState(false)

  const [clienteId, setClienteId] = useState<number | undefined>(undefined)
  const [fechaCreacion, setFechaCreacion] = useState<Date>(new Date())
  const [fechaEntrega, setFechaEntrega] = useState<Date | undefined>(undefined)
  const [formaPago, setFormaPago] = useState<string>("contado")
  const [descuento, setDescuento] = useState<number>(0)
  const [impuestos, setImpuestos] = useState<number>(19) // 19% por defecto

  // Estado para el PDF de cotización
  const [cotizacionPdf, setCotizacionPdf] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [showPdfPreview, setShowPdfPreview] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [productosOrden, setProductosOrden] = useState<
    Array<{
      id?: number
      productoId: string
      nombre: string
      cantidad: number
      precio: number
      subtotal: number
      observaciones?: string
      stockDisponible?: number
      unidadEmpaque?: number
      unidadesParaCompletarCaja?: number
    }>
  >([])

  const [error, setError] = useState<string | null>(null)

  // Cargar datos si es edición
  useEffect(() => {
    if (ordenId) {
      const orden = getOrdenById(ordenId)
      if (orden) {
        setClienteId(orden.clienteId)
        setFechaCreacion(new Date(orden.fechaCreacion))
        if (orden.fechaEntrega) {
          setFechaEntrega(new Date(orden.fechaEntrega))
        }
        setFormaPago(orden.formaPago)
        setDescuento(orden.descuento)
        setImpuestos(Math.round((orden.impuestos / orden.subtotal) * 100))
        setProductosOrden(orden.productos)
      }
    } else {
      // Añadir una fila vacía para nueva orden
      setProductosOrden([
        {
          productoId: "",
          nombre: "",
          cantidad: 1,
          precio: 0,
          subtotal: 0,
          observaciones: "",
          unidadEmpaque: 0,
          unidadesParaCompletarCaja: 0,
        },
      ])
    }
  }, [ordenId])

  // Limpiar la URL de vista previa cuando el componente se desmonte
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === "application/pdf") {
      setCotizacionPdf(file)

      // Crear URL para vista previa
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    } else if (file) {
      setError("Solo se permiten archivos PDF")
      // Limpiar el input
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const handleRemoveFile = () => {
    setCotizacionPdf(null)
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
      setPreviewUrl(null)
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const addProductoRow = () => {
    setProductosOrden([
      ...productosOrden,
      {
        productoId: "",
        nombre: "",
        cantidad: 1,
        precio: 0,
        subtotal: 0,
        observaciones: "",
        unidadEmpaque: 0,
        unidadesParaCompletarCaja: 0,
      },
    ])
  }

  const removeProductoRow = (index: number) => {
    const newProductos = [...productosOrden]
    newProductos.splice(index, 1)
    setProductosOrden(newProductos)
  }

  const handleProductoChange = (index: number, field: string, value: any) => {
    const newProductos = [...productosOrden]

    if (field === "productoId") {
      const productoSeleccionado = productos.find((p) => p.id === value)
      if (productoSeleccionado) {
        // Obtener stock disponible
        const stockDisponible = getStockDisponible(value)

        // Obtener unidad de empaque (simulado, en una app real vendría de la base de datos)
        const unidadEmpaque = getUnidadEmpaque(value)

        // Calcular unidades para completar caja
        const cantidad = newProductos[index].cantidad || 1
        const resto = cantidad % unidadEmpaque
        const unidadesParaCompletarCaja = resto === 0 ? 0 : unidadEmpaque - resto

        newProductos[index] = {
          ...newProductos[index],
          productoId: value,
          nombre: productoSeleccionado.nombre,
          precio: productoSeleccionado.precio,
          subtotal: productoSeleccionado.precio * cantidad,
          stockDisponible,
          unidadEmpaque,
          unidadesParaCompletarCaja,
        }
      }
    } else if (field === "cantidad") {
      const cantidad = Number(value)
      newProductos[index] = {
        ...newProductos[index],
        cantidad,
        subtotal: cantidad * newProductos[index].precio,
      }

      // Recalcular unidades para completar caja si cambia la cantidad
      if (newProductos[index].unidadEmpaque) {
        const resto = cantidad % newProductos[index].unidadEmpaque
        newProductos[index].unidadesParaCompletarCaja = resto === 0 ? 0 : newProductos[index].unidadEmpaque - resto
      }
    } else {
      newProductos[index] = {
        ...newProductos[index],
        [field]: value,
      }

      // Recalcular subtotal si cambia precio
      if (field === "precio") {
        newProductos[index].subtotal = newProductos[index].cantidad * Number(value)
      }
    }

    setProductosOrden(newProductos)
  }

  const calcularSubtotal = () => {
    return productosOrden.reduce((total, producto) => total + producto.subtotal, 0)
  }

  const calcularTotal = () => {
    const subtotal = calcularSubtotal()
    const descuentoValor = descuento || 0
    const impuestosValor = subtotal > 0 ? (subtotal - descuentoValor) * (impuestos / 100) : 0
    return subtotal - descuentoValor + impuestosValor
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // Validaciones
      if (!clienteId) {
        throw new Error("Debe seleccionar un cliente")
      }

      if (productosOrden.length === 0) {
        throw new Error("Debe agregar al menos un producto")
      }

      if (productosOrden.some((p) => !p.productoId || p.cantidad <= 0)) {
        throw new Error("Todos los productos deben tener una referencia y cantidad válida")
      }

      const subtotal = calcularSubtotal()
      const total = calcularTotal()
      const impuestosValor = subtotal > 0 ? (subtotal - descuento) * (impuestos / 100) : 0

      const ordenData = {
        clienteId,
        fechaCreacion: format(fechaCreacion, "yyyy-MM-dd"),
        fechaEntrega: fechaEntrega ? format(fechaEntrega, "yyyy-MM-dd") : undefined,
        productos: productosOrden,
        subtotal,
        descuento: descuento || 0,
        impuestos: impuestosValor,
        total,
        estado: "ordenAbierta",
        formaPago,
        historialEstados: [
          {
            id: 1,
            fecha: new Date().toISOString(),
            estadoAnterior: "",
            estadoNuevo: "ordenAbierta",
            usuario: "Usuario Actual", // En una app real, esto vendría de la sesión
          },
        ],
        comentarios: [],
        creadorId: 3, // En una app real, esto vendría de la sesión
        creador: "Carlos Gómez", // En una app real, esto vendría de la sesión
        cotizacionPdf: cotizacionPdf ? cotizacionPdf.name : undefined, // Solo guardamos el nombre del archivo
      }

      if (ordenId) {
        // Actualizar orden existente
        await updateOrden(ordenId, ordenData)
      } else {
        // Crear nueva orden
        await createOrden(ordenData)
      }

      router.push("/ordenes")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  // Función auxiliar para obtener la unidad de empaque (simulada)
  const getUnidadEmpaque = (productoId: string): number => {
    // En una app real, estos datos vendrían de la base de datos
    const unidadesEmpaque: Record<string, number> = {
      "1": 24, // Botella PET 500ml: 24 unidades por caja
      "2": 100, // Tapa rosca estándar: 100 unidades por caja
      "3": 12, // Contenedor rectangular 1L: 12 unidades por caja
      "4": 12, // Botella HDPE 1L: 12 unidades por caja
      "5": 50, // Envase cosmético 100ml: 50 unidades por caja
    }
    return unidadesEmpaque[productoId] || 1
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-6">
        {error && <div className="bg-red-50 p-4 rounded-md border border-red-200 text-red-800">{error}</div>}

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Gestión automática de stock</AlertTitle>
          <AlertDescription>
            El sistema verificará automáticamente la disponibilidad de stock para cada producto al crear la orden. Los
            productos se tomarán del inventario cuando sea posible, y se marcarán para producción cuando sea necesario.
          </AlertDescription>
        </Alert>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cliente">Cliente *</Label>
                  <Select value={clienteId?.toString()} onValueChange={(value) => setClienteId(Number(value))}>
                    <SelectTrigger id="cliente">
                      <SelectValue placeholder="Seleccionar cliente" />
                    </SelectTrigger>
                    <SelectContent>
                      {clientes.map((cliente) => (
                        <SelectItem key={cliente.id} value={cliente.id.toString()}>
                          {cliente.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fechaCreacion">Fecha de creación</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !fechaCreacion && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {fechaCreacion ? (
                            format(fechaCreacion, "dd/MM/yyyy", { locale: es })
                          ) : (
                            <span>Seleccionar fecha</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={fechaCreacion}
                          onSelect={(date) => date && setFechaCreacion(date)}
                          initialFocus
                          locale={es}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fechaEntrega">Fecha de entrega</Label>
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
                          {fechaEntrega ? (
                            format(fechaEntrega, "dd/MM/yyyy", { locale: es })
                          ) : (
                            <span>Seleccionar fecha</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={fechaEntrega}
                          onSelect={setFechaEntrega}
                          initialFocus
                          locale={es}
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="formaPago">Forma de pago</Label>
                  <Select value={formaPago} onValueChange={setFormaPago}>
                    <SelectTrigger id="formaPago">
                      <SelectValue placeholder="Seleccionar forma de pago" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(formasPago).map(([key, label]) => (
                        <SelectItem key={key} value={key}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Sección para cargar PDF de cotización */}
                <div className="space-y-2 pt-2">
                  <Label htmlFor="cotizacionPdf">Cotización (PDF)</Label>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Input
                        id="cotizacionPdf"
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        {cotizacionPdf ? "Cambiar PDF" : "Cargar PDF de cotización"}
                      </Button>
                      {cotizacionPdf && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={handleRemoveFile}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Eliminar PDF</span>
                        </Button>
                      )}
                    </div>

                    {cotizacionPdf && (
                      <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-md">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <span className="text-sm text-blue-700 font-medium flex-1 truncate">{cotizacionPdf.name}</span>
                        <span className="text-xs text-blue-600">{(cotizacionPdf.size / 1024).toFixed(1)} KB</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowPdfPreview(true)}
                          className="text-blue-600 hover:text-blue-800 p-1 h-auto"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          <span className="text-xs">Ver</span>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="descuento">Descuento (COP)</Label>
                  <Input
                    id="descuento"
                    type="number"
                    min="0"
                    value={descuento}
                    onChange={(e) => setDescuento(Number(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="impuestos">Impuestos (%)</Label>
                  <Input
                    id="impuestos"
                    type="number"
                    min="0"
                    max="100"
                    value={impuestos}
                    onChange={(e) => setImpuestos(Number(e.target.value))}
                  />
                </div>

                <div className="pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span className="font-medium">{formatCurrency(calcularSubtotal())}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span>Descuento:</span>
                    <span className="font-medium">- {formatCurrency(descuento || 0)}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span>Impuestos ({impuestos}%):</span>
                    <span className="font-medium">
                      {formatCurrency(
                        calcularSubtotal() > 0 ? (calcularSubtotal() - (descuento || 0)) * (impuestos / 100) : 0,
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between font-bold text-lg pt-2 border-t">
                    <span>Total:</span>
                    <span>{formatCurrency(calcularTotal())}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Productos</h3>
                <Button type="button" onClick={addProductoRow} variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar producto
                </Button>
              </div>

              <div className="space-y-4">
                {productosOrden.map((producto, index) => (
                  <div key={index} className="grid grid-cols-12 gap-4 items-start border-b pb-4">
                    <div className="col-span-4">
                      <Label htmlFor={`producto-${index}`}>Producto *</Label>
                      <Select
                        value={producto.productoId}
                        onValueChange={(value) => handleProductoChange(index, "productoId", value)}
                      >
                        <SelectTrigger id={`producto-${index}`}>
                          <SelectValue placeholder="Seleccionar producto" />
                        </SelectTrigger>
                        <SelectContent>
                          {productos.map((p) => (
                            <SelectItem key={p.id} value={p.id}>
                              {p.nombre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="col-span-2">
                      <Label htmlFor={`cantidad-${index}`}>Cantidad *</Label>
                      <Input
                        id={`cantidad-${index}`}
                        type="number"
                        min="1"
                        value={producto.cantidad}
                        onChange={(e) => handleProductoChange(index, "cantidad", Number(e.target.value))}
                      />
                      {producto.stockDisponible !== undefined && (
                        <div className="mt-1 text-xs flex items-center">
                          <span className="text-muted-foreground mr-1">Stock disponible:</span>
                          <span
                            className={
                              producto.stockDisponible >= producto.cantidad ? "text-green-600" : "text-amber-600"
                            }
                          >
                            {producto.stockDisponible.toLocaleString()}
                          </span>
                          {producto.stockDisponible < producto.cantidad && (
                            <div className="ml-2 flex items-center text-amber-600">
                              <Factory className="h-3 w-3 mr-1" />
                              <span>Requiere producción</span>
                            </div>
                          )}
                          {producto.stockDisponible >= producto.cantidad && (
                            <div className="ml-2 flex items-center text-green-600">
                              <Package className="h-3 w-3 mr-1" />
                              <span>Disponible</span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Información de unidad de empaque */}
                      {producto.unidadEmpaque > 0 && (
                        <div className="mt-2 p-2 bg-blue-50 rounded-md text-xs">
                          <div className="font-medium text-blue-700">Unidad de empaque: {producto.unidadEmpaque}</div>
                          {producto.unidadesParaCompletarCaja > 0 && (
                            <div className="mt-1 text-blue-600">
                              Faltan <span className="font-bold">{producto.unidadesParaCompletarCaja}</span> unidades
                              para completar caja
                              <Button
                                type="button"
                                variant="link"
                                size="sm"
                                className="p-0 h-auto text-xs text-blue-700 underline ml-1"
                                onClick={() =>
                                  handleProductoChange(
                                    index,
                                    "cantidad",
                                    producto.cantidad + producto.unidadesParaCompletarCaja,
                                  )
                                }
                              >
                                Completar
                              </Button>
                            </div>
                          )}
                          {producto.unidadesParaCompletarCaja === 0 && (
                            <div className="mt-1 text-green-600">✓ Cantidad completa en cajas</div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="col-span-2">
                      <Label htmlFor={`precio-${index}`}>Precio unitario *</Label>
                      <Input
                        id={`precio-${index}`}
                        type="number"
                        min="0"
                        value={producto.precio}
                        onChange={(e) => handleProductoChange(index, "precio", Number(e.target.value))}
                      />
                    </div>

                    <div className="col-span-3">
                      <Label htmlFor={`subtotal-${index}`}>Subtotal</Label>
                      <Input
                        id={`subtotal-${index}`}
                        type="text"
                        value={formatCurrency(producto.subtotal)}
                        readOnly
                        disabled
                      />
                    </div>

                    <div className="col-span-1 flex justify-end">
                      {productosOrden.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeProductoRow(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Eliminar producto</span>
                        </Button>
                      )}
                    </div>

                    {/* Observaciones por producto */}
                    <div className="col-span-12 mt-2">
                      <Label htmlFor={`observaciones-${index}`}>Observaciones del producto</Label>
                      <Textarea
                        id={`observaciones-${index}`}
                        placeholder="Ingrese observaciones específicas para este producto"
                        value={producto.observaciones || ""}
                        onChange={(e) => handleProductoChange(index, "observaciones", e.target.value)}
                        className="min-h-[60px]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.push("/ordenes")} disabled={isLoading}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Guardando..." : ordenId ? "Actualizar orden" : "Crear orden"}
          </Button>
        </div>
      </div>

      {/* Diálogo para vista previa del PDF */}
      <Dialog open={showPdfPreview} onOpenChange={setShowPdfPreview}>
        <DialogContent className="max-w-4xl h-[80vh]">
          <DialogHeader>
            <DialogTitle>Vista previa de cotización</DialogTitle>
          </DialogHeader>
          {previewUrl && (
            <div className="w-full h-full min-h-[60vh]">
              <iframe src={previewUrl} className="w-full h-full border rounded-md" title="Vista previa de PDF" />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </form>
  )
}
