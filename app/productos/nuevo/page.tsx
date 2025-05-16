import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ProductoForm from "@/components/productos/producto-form"
import BackButton from "@/components/ui/back-button"

export default function NuevoProductoPage() {
  return (
    <div className="flex flex-col gap-4 max-w-full">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center gap-2">
          <BackButton href="/productos" />
          <h1 className="text-3xl font-bold tracking-tight">Nuevo Producto</h1>
        </div>
        <p className="text-muted-foreground">Completa el formulario para registrar un nuevo producto en el sistema.</p>
      </div>

      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Formulario de Registro</CardTitle>
          <CardDescription>Todos los campos marcados con * son obligatorios.</CardDescription>
        </CardHeader>
        <CardContent>
          <ProductoForm />
        </CardContent>
      </Card>
    </div>
  )
}
