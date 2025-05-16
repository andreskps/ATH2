import type { CompraProveedor } from "@/lib/data/proveedores"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"

interface ProveedorComprasProps {
  compras: CompraProveedor[]
}

export default function ProveedorCompras({ compras }: ProveedorComprasProps) {
  // Función para formatear el precio
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price)
  }

  // Función para determinar el color del badge según el estado de pago
  const getEstadoPagoVariant = (estado: string) => {
    switch (estado) {
      case "Pagado":
        return "success"
      case "Pendiente":
        return "destructive"
      case "Parcial":
        return "warning"
      default:
        return "outline"
    }
  }

  if (compras.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 flex flex-col items-center justify-center text-center">
          <h3 className="text-lg font-semibold mb-2">No hay compras registradas</h3>
          <p className="text-muted-foreground">
            Este proveedor no tiene historial de compras registrado en el sistema.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Historial de Compras</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Fecha</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Materia Prima</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Cantidad</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Precio Unitario
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Total</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Estado Pago</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {compras.map((compra) => (
                  <tr
                    key={compra.id}
                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                  >
                    <td className="p-4 align-middle">{formatDate(compra.fecha)}</td>
                    <td className="p-4 align-middle font-medium">{compra.materiaPrima}</td>
                    <td className="p-4 align-middle">
                      {compra.cantidad} {compra.unidad}
                    </td>
                    <td className="p-4 align-middle">{formatPrice(compra.precioUnitario)}</td>
                    <td className="p-4 align-middle font-medium">{formatPrice(compra.total)}</td>
                    <td className="p-4 align-middle">
                      <Badge variant={getEstadoPagoVariant(compra.estadoPago)}>{compra.estadoPago}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
