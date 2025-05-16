import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PlusCircle, Link2 } from "lucide-react"
import Image from "next/image"
import type { Molde } from "@/lib/types"

interface MoldeProductosAsociadosProps {
  molde: Molde
}

export default function MoldeProductosAsociados({ molde }: MoldeProductosAsociadosProps) {
  // Datos de ejemplo para los productos asociados
  const productosAsociados = [
    {
      id: 1,
      codigo: "P001",
      nombre: "Botella 500ml",
      categoria: "Envases",
      material: "HDPE",
      estado: "Activo",
      imagen: "/productos/botella-500ml.png",
    },
    {
      id: 2,
      codigo: "P003",
      nombre: "Contenedor 1L",
      categoria: "Envases",
      material: "PP",
      estado: "Activo",
      imagen: "/productos/contenedor-1l.png",
    },
    {
      id: 3,
      codigo: "P005",
      nombre: "Envase Cosmético",
      categoria: "Cosméticos",
      material: "PET",
      estado: "Inactivo",
      imagen: "/productos/envase-cosmetico.png",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button size="sm">
          <Link2 className="mr-2 h-4 w-4" />
          Vincular Producto
        </Button>
      </div>

      {productosAsociados.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Imagen</TableHead>
              <TableHead>Código</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Material</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productosAsociados.map((producto) => (
              <TableRow key={producto.id}>
                <TableCell>
                  <div className="relative h-10 w-10 overflow-hidden rounded-md">
                    <Image
                      src={producto.imagen || "/placeholder.svg"}
                      alt={producto.nombre}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                </TableCell>
                <TableCell>{producto.codigo}</TableCell>
                <TableCell>{producto.nombre}</TableCell>
                <TableCell>{producto.categoria}</TableCell>
                <TableCell>{producto.material}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      producto.estado === "Activo"
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : "bg-red-100 text-red-800 hover:bg-red-100"
                    }
                  >
                    {producto.estado}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" asChild>
                    <a href={`/productos/${producto.id}`}>Ver producto</a>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-muted-foreground">No hay productos asociados a este molde.</p>
          <Button variant="outline" size="sm" className="mt-4">
            <PlusCircle className="mr-2 h-4 w-4" />
            Vincular Primer Producto
          </Button>
        </div>
      )}
    </div>
  )
}
