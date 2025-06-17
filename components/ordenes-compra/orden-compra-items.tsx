import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface OrdenCompraItem {
  id: string
  materiaPrimaNombre: string
  cantidad: number
  unidad: string
  precioUnitario: number
  subtotal: number
}

interface OrdenCompraItemsProps {
  items: OrdenCompraItem[]
  moneda: string
}

export function OrdenCompraItems({ items, moneda }: OrdenCompraItemsProps) {
  const total = items.reduce((sum, item) => sum + item.subtotal, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Productos de la Orden</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Materia Prima</TableHead>
                <TableHead className="text-right">Cantidad</TableHead>
                <TableHead>Unidad</TableHead>
                <TableHead className="text-right">Precio Unitario</TableHead>
                <TableHead className="text-right">Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.materiaPrimaNombre}</TableCell>
                  <TableCell className="text-right">{item.cantidad.toLocaleString("es-ES")}</TableCell>
                  <TableCell>{item.unidad}</TableCell>
                  <TableCell className="text-right">
                    {moneda} {item.precioUnitario.toLocaleString("es-ES", { minimumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {moneda} {item.subtotal.toLocaleString("es-ES", { minimumFractionDigits: 2 })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-end mt-4 pt-4 border-t">
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Total de la orden</p>
            <p className="text-2xl font-bold">
              {moneda} {total.toLocaleString("es-ES", { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
