import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ProductoForm from "@/components/productos/producto-form"
import { getProductoById } from "@/lib/data/productos"
import BackButton from "@/components/ui/back-button"

interface EditarProductoPageProps {
  params: {
    id: string
  }
}

export default async function EditarProductoPage({ params }: EditarProductoPageProps) {
  const productoId = Number.parseInt(params.id)

  if (isNaN(productoId)) {
    notFound()
  }

  const producto = await getProductoById(productoId)

  if (!producto) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-4 max-w-full">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center gap-2">
          <BackButton href={`/productos/${producto.id}`} />
          <h1 className="text-3xl font-bold tracking-tight">Editar Producto</h1>
        </div>
        <p className="text-muted-foreground">Actualiza la información del producto seleccionado.</p>
      </div>

      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Formulario de Edición</CardTitle>
          <CardDescription>Todos los campos marcados con * son obligatorios.</CardDescription>
        </CardHeader>
        <CardContent>
          <ProductoForm producto={producto} isEditing />
        </CardContent>
      </Card>
    </div>
  )
}
