import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Package, Factory, Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { OrdenProducto } from "@/lib/data/ordenes"

interface OrdenProductosProps {
  productos: OrdenProducto[]
}

export function OrdenProductos({ productos }: OrdenProductosProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Productos</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Producto</TableHead>
              <TableHead className="text-right">Cantidad</TableHead>
              <TableHead className="text-right">Precio unitario</TableHead>
              <TableHead className="text-right">Subtotal</TableHead>
              <TableHead>Origen</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productos.map((producto) => (
              <TableRow key={producto.id}>
                <TableCell className="font-medium">{producto.nombre}</TableCell>
                <TableCell className="text-right">{producto.cantidad.toLocaleString()}</TableCell>
                <TableCell className="text-right">{formatCurrency(producto.precio)}</TableCell>
                <TableCell className="text-right">{formatCurrency(producto.subtotal)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {producto.estadoStock === "inventario" && (
                      <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                        <Package className="h-3 w-3" />
                        <span>Inventario</span>
                      </Badge>
                    )}
                    {producto.estadoStock === "produccion" && (
                      <Badge className="bg-blue-100 text-blue-800 flex items-center gap-1">
                        <Factory className="h-3 w-3" />
                        <span>Producción</span>
                      </Badge>
                    )}
                    {producto.estadoStock === "mixto" && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Badge className="bg-purple-100 text-purple-800 flex items-center gap-1 cursor-help">
                              <Package className="h-3 w-3" />
                              <Factory className="h-3 w-3" />
                              <span>Mixto</span>
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Inventario: {producto.cantidadInventario.toLocaleString()} unidades</p>
                            <p>Producción: {producto.cantidadProduccion.toLocaleString()} unidades</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button className="text-muted-foreground hover:text-foreground">
                            <Info className="h-4 w-4" />
                            <span className="sr-only">Ver historial de stock</span>
                          </button>
                        </TooltipTrigger>
                        <TooltipContent className="w-80">
                          <div className="space-y-2">
                            <h4 className="font-semibold">Historial de stock</h4>
                            {producto.historialStock.map((item) => (
                              <div key={item.id} className="text-xs space-y-1">
                                <div className="flex justify-between">
                                  <span className="font-medium">{item.accion}</span>
                                  <span>{format(new Date(item.fecha), "dd/MM/yyyy HH:mm", { locale: es })}</span>
                                </div>
                                <div>
                                  <span>Inventario: {item.cantidadInventario.toLocaleString()}</span>
                                  {" | "}
                                  <span>Producción: {item.cantidadProduccion.toLocaleString()}</span>
                                </div>
                                {item.comentario && <p className="text-muted-foreground">{item.comentario}</p>}
                              </div>
                            ))}
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
