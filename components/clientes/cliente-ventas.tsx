import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import type { Venta } from "@/lib/types"

interface ClienteVentasProps {
  ventas: Venta[]
}

export default function ClienteVentas({ ventas }: ClienteVentasProps) {
  if (ventas.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">Este cliente no tiene ventas registradas.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Productos</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ventas.map((venta) => (
              <TableRow key={venta.id}>
                <TableCell className="font-medium">{venta.id}</TableCell>
                <TableCell>
                  {new Date(venta.fecha).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    {venta.productos.slice(0, 2).map((producto) => (
                      <div key={producto.id} className="text-sm">
                        {producto.nombre} x {producto.cantidad}
                      </div>
                    ))}
                    {venta.productos.length > 2 && (
                      <div className="text-xs text-muted-foreground">
                        Y {venta.productos.length - 2} producto(s) más...
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>${venta.total.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      venta.estado === "Completada" ? "default" : venta.estado === "Pendiente" ? "outline" : "secondary"
                    }
                    className={
                      venta.estado === "Completada"
                        ? "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100"
                        : venta.estado === "Pendiente"
                          ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-100"
                          : "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-100"
                    }
                  >
                    {venta.estado}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
