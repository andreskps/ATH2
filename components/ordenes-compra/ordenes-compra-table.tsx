import { getOrdenesCompra } from "@/lib/data/ordenes-compra"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { OrdenCompraActions } from "./orden-compra-actions"

export async function OrdenesCompraTable() {
  const ordenesCompra = await getOrdenesCompra()

  // Actualizar la función getEstadoColor para incluir "confirmada":
  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "creada":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100/80"
      case "confirmada":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100/80"
      case "recibida-parcial":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100/80"
      case "recibida":
        return "bg-green-100 text-green-800 hover:bg-green-100/80"
      case "cerrada":
        return "bg-gray-100 text-gray-800 hover:bg-gray-100/80"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100/80"
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Listado de Órdenes de Compra</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Número</TableHead>
                <TableHead>Proveedor</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Fecha Emisión</TableHead>
                <TableHead>Responsable</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ordenesCompra.map((orden) => (
                <TableRow key={orden.id}>
                  <TableCell className="font-medium">{orden.numero}</TableCell>
                  <TableCell>{orden.proveedorNombre}</TableCell>
                  <TableCell>
                    <Badge className={getEstadoColor(orden.estado)} variant="outline">
                      {orden.estado === "creada" && "Creada"}
                      {orden.estado === "confirmada" && "Confirmada"}
                      {orden.estado === "recibida-parcial" && "Recibida Parcial"}
                      {orden.estado === "recibida" && "Recibida"}
                      {orden.estado === "cerrada" && "Cerrada"}
                    </Badge>
                  </TableCell>
                  <TableCell>{format(new Date(orden.fechaEmision), "dd/MM/yyyy", { locale: es })}</TableCell>
                  <TableCell>{orden.usuarioResponsableNombre}</TableCell>
                  <TableCell>
                    <OrdenCompraActions id={orden.id} estado={orden.estado} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
