import Link from "next/link"
import Image from "next/image"
import { getMateriaPrima, getProveedoresMateriaPrima, getStockTotalMateriaPrima } from "@/lib/data/materia-prima"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Eye, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { CrearOrdenCompraDialog } from "./crear-orden-compra-dialog"

export async function MateriaPrimaTable() {
  const materiasPrimas = await getMateriaPrima()

  // Obtener datos adicionales para cada materia prima
  const materiasConDatos = await Promise.all(
    materiasPrimas.map(async (mp) => {
      const proveedores = await getProveedoresMateriaPrima(mp.id)
      const stockTotal = await getStockTotalMateriaPrima(mp.id)

      // Obtener el proveedor preferido si existe
      const proveedorPreferido = proveedores.find((p) => p.esPreferido)

      return {
        ...mp,
        stockTotal,
        proveedores,
        proveedorPreferido,
      }
    }),
  )

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Código</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Precio Referencia</TableHead>
            <TableHead>Proveedores</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {materiasConDatos.map((mp) => (
            <TableRow key={mp.id}>
              <TableCell className="font-medium">{mp.codigo}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {mp.imagen && (
                    <div className="h-8 w-8 overflow-hidden rounded-md">
                      <Image
                        src={mp.imagen || "/placeholder.svg"}
                        alt={mp.nombre}
                        width={32}
                        height={32}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <span>{mp.nombre}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{mp.tipo}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span>
                    {mp.stockTotal} {mp.unidadMedida}
                  </span>
                  {mp.stockTotal <= mp.stockMinimo && (
                    <CrearOrdenCompraDialog materiaPrima={mp} proveedores={mp.proveedores}>
                      <Badge variant="destructive" className="ml-1 cursor-pointer hover:bg-destructive/90">
                        Bajo
                      </Badge>
                    </CrearOrdenCompraDialog>
                  )}
                </div>
              </TableCell>
              <TableCell>
                {mp.proveedorPreferido
                  ? `$${mp.proveedorPreferido.precio.toFixed(2)}`
                  : mp.proveedores.length > 0
                    ? "Varios precios"
                    : "No disponible"}
              </TableCell>
              <TableCell>{mp.proveedores.length}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Abrir menú</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/materia-prima/${mp.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        Ver detalle
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/materia-prima/editar/${mp.id}`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
