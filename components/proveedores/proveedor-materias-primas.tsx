import type { MateriaPrimaProveedor } from "@/lib/data/proveedores"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface ProveedorMateriasPrimasProps {
  materiasPrimas: MateriaPrimaProveedor[]
}

export default function ProveedorMateriasPrimas({ materiasPrimas }: ProveedorMateriasPrimasProps) {
  // Función para formatear el precio
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Materias Primas Suministradas</CardTitle>
        <Button size="sm" className="h-8">
          <Plus className="h-4 w-4 mr-1" />
          Asociar Materia Prima
        </Button>
      </CardHeader>
      <CardContent>
        {materiasPrimas.length === 0 ? (
          <div className="p-8 flex flex-col items-center justify-center text-center">
            <h3 className="text-lg font-semibold mb-2">No hay materias primas asociadas</h3>
            <p className="text-muted-foreground mb-4">
              Este proveedor no tiene materias primas asociadas en el sistema.
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-1" />
              Asociar Materia Prima
            </Button>
          </div>
        ) : (
          <div className="rounded-md border">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Código</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Nombre</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Precio</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                      Tiempo Entrega
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                      Observaciones
                    </th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {materiasPrimas.map((mp) => (
                    <tr
                      key={mp.id}
                      className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                    >
                      <td className="p-4 align-middle font-medium">{mp.codigo}</td>
                      <td className="p-4 align-middle">{mp.nombre}</td>
                      <td className="p-4 align-middle">{formatPrice(mp.precio)}</td>
                      <td className="p-4 align-middle">{mp.tiempoEntrega}</td>
                      <td className="p-4 align-middle text-sm text-muted-foreground">{mp.observaciones}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
