"use client"

import { useEffect, useState } from "react"
import type { MateriaPrima, ProveedorMateriaPrima, StockMateriaPrima } from "@/lib/data/materia-prima"
import { getProveedoresMateriaPrima, getStockMateriaPrima, getStockTotalMateriaPrima } from "@/lib/data/materia-prima"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { formatDate } from "@/lib/utils"
import { CrearOrdenCompraDialog } from "./crear-orden-compra-dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Star } from "lucide-react"

interface MateriaPrimaDetalleProps {
  materiaPrima: MateriaPrima
}

export function MateriaPrimaDetalle({ materiaPrima }: MateriaPrimaDetalleProps) {
  const [proveedores, setProveedores] = useState<ProveedorMateriaPrima[]>([])
  const [stocks, setStocks] = useState<StockMateriaPrima[]>([])
  const [stockTotal, setStockTotal] = useState<number>(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const [proveedoresData, stocksData, stockTotalData] = await Promise.all([
          getProveedoresMateriaPrima(materiaPrima.id),
          getStockMateriaPrima(materiaPrima.id),
          getStockTotalMateriaPrima(materiaPrima.id),
        ])
        setProveedores(proveedoresData)
        setStocks(stocksData)
        setStockTotal(stockTotalData)
      } catch (error) {
        console.error("Error al cargar datos:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [materiaPrima.id])

  const isLowStock = stockTotal <= materiaPrima.stockMinimo

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Información General</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 gap-4 text-sm">
              <div>
                <dt className="font-medium text-muted-foreground">Nombre</dt>
                <dd>{materiaPrima.nombre}</dd>
              </div>
              <div>
                <dt className="font-medium text-muted-foreground">Código</dt>
                <dd>{materiaPrima.codigo}</dd>
              </div>
              <div>
                <dt className="font-medium text-muted-foreground">Tipo</dt>
                <dd>
                  <Badge variant="outline">{materiaPrima.tipo}</Badge>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-muted-foreground">Descripción</dt>
                <dd>{materiaPrima.descripcion || "No disponible"}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Inventario</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 gap-4 text-sm">
              <div>
                <dt className="font-medium text-muted-foreground">Stock Total</dt>
                <dd className={isLowStock ? "text-red-500" : ""}>
                  {stockTotal} {materiaPrima.unidadMedida}
                  {isLowStock && (
                    <Badge variant="destructive" className="ml-2">
                      Bajo
                    </Badge>
                  )}
                </dd>
              </div>
              <div>
                <dt className="font-medium text-muted-foreground">Stock Mínimo</dt>
                <dd>
                  {materiaPrima.stockMinimo} {materiaPrima.unidadMedida}
                </dd>
              </div>
              <div>
                <dt className="font-medium text-muted-foreground">Proveedores</dt>
                <dd>{proveedores.length}</dd>
              </div>
              <div>
                <dt className="font-medium text-muted-foreground">Lotes en Stock</dt>
                <dd>{stocks.length}</dd>
              </div>
              {isLowStock && (
                <div className="pt-2">
                  <CrearOrdenCompraDialog materiaPrima={materiaPrima} proveedores={proveedores}>
                    <Button variant="destructive" className="w-full">
                      Crear Orden de Compra
                    </Button>
                  </CrearOrdenCompraDialog>
                </div>
              )}
            </dl>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Proveedores</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-4">Cargando proveedores...</div>
          ) : proveedores.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <p className="text-muted-foreground">No hay proveedores registrados para esta materia prima.</p>
              <Button variant="outline" className="mt-4">
                Agregar Proveedor
              </Button>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Proveedor</TableHead>
                    <TableHead>Precio ({materiaPrima.unidadMedida})</TableHead>
                    <TableHead>Tiempo de Entrega</TableHead>
                    <TableHead>Calidad</TableHead>
                    <TableHead>Última Compra</TableHead>
                    <TableHead>Preferido</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {proveedores.map((proveedor) => (
                    <TableRow key={proveedor.id}>
                      <TableCell className="font-medium">{proveedor.proveedorNombre}</TableCell>
                      <TableCell>${proveedor.precio.toFixed(2)}</TableCell>
                      <TableCell>{proveedor.tiempoEntrega}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            proveedor.calidad === "Alta"
                              ? "success"
                              : proveedor.calidad === "Media"
                                ? "warning"
                                : "destructive"
                          }
                        >
                          {proveedor.calidad}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {proveedor.ultimaCompra ? formatDate(proveedor.ultimaCompra) : "No disponible"}
                      </TableCell>
                      <TableCell>
                        {proveedor.esPreferido ? (
                          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ) : (
                          <Star className="h-5 w-5 text-muted-foreground" />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Stock por Proveedor</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-4">Cargando stock...</div>
          ) : stocks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <p className="text-muted-foreground">No hay stock registrado para esta materia prima.</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Proveedor</TableHead>
                    <TableHead>Lote</TableHead>
                    <TableHead>Cantidad ({materiaPrima.unidadMedida})</TableHead>
                    <TableHead>Fecha Recepción</TableHead>
                    <TableHead>Ubicación</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stocks.map((stock) => (
                    <TableRow key={stock.id}>
                      <TableCell className="font-medium">{stock.proveedorNombre}</TableCell>
                      <TableCell>{stock.lote}</TableCell>
                      <TableCell>{stock.cantidad}</TableCell>
                      <TableCell>{formatDate(stock.fechaRecepcion)}</TableCell>
                      <TableCell>{stock.ubicacion || "No especificada"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Separator />

      <div>
        <h3 className="mb-4 text-lg font-semibold">Información Adicional</h3>
        <dl className="grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
          <div>
            <dt className="font-medium text-muted-foreground">Fecha de Creación</dt>
            <dd>{formatDate(materiaPrima.fechaCreacion)}</dd>
          </div>
          <div>
            <dt className="font-medium text-muted-foreground">Última Actualización</dt>
            <dd>{formatDate(materiaPrima.ultimaActualizacion)}</dd>
          </div>
          <div>
            <dt className="font-medium text-muted-foreground">Unidad de Medida</dt>
            <dd>{materiaPrima.unidadMedida}</dd>
          </div>
        </dl>
      </div>
    </div>
  )
}

// Componente Button para usar en el detalle
function Button({ children, variant = "default", className = "", ...props }) {
  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
  }

  return (
    <button
      className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
