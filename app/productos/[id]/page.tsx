import { notFound } from "next/navigation"
import { getProductoById } from "@/lib/data/productos"
import ProductoDetalle from "@/components/productos/producto-detalle"
import ProductoActions from "@/components/productos/producto-actions"
import BackButton from "@/components/ui/back-button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProductoComponentes from "@/components/productos/producto-componentes"
import ProductoEspecificaciones from "@/components/productos/producto-especificaciones"
import ProductoParametrosInyeccion from "@/components/productos/producto-parametros-inyeccion"
import ProductoArchivos from "@/components/productos/producto-archivos"

interface ProductoPageProps {
  params: {
    id: string
  }
}

export default async function ProductoPage({ params }: ProductoPageProps) {
  const productoId = Number.parseInt(params.id)

  if (isNaN(productoId)) {
    notFound()
  }

  const producto = await getProductoById(productoId)

  if (!producto) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center gap-2">
          <BackButton href="/productos" />
          <h1 className="text-3xl font-bold tracking-tight">Detalles del Producto</h1>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">Información detallada del producto seleccionado.</p>
          <ProductoActions producto={producto} />
        </div>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">Información General</TabsTrigger>
          <TabsTrigger value="componentes">Componentes</TabsTrigger>
          <TabsTrigger value="especificaciones">Especificaciones</TabsTrigger>
          <TabsTrigger value="parametros">Parámetros INY</TabsTrigger>
          <TabsTrigger value="archivos">Archivos</TabsTrigger>
        </TabsList>
        <TabsContent value="general" className="mt-6">
          <ProductoDetalle producto={producto} />
        </TabsContent>
        <TabsContent value="componentes" className="mt-6">
          <ProductoComponentes producto={producto} />
        </TabsContent>
        <TabsContent value="especificaciones" className="mt-6">
          <ProductoEspecificaciones producto={producto} />
        </TabsContent>
        <TabsContent value="parametros" className="mt-6">
          <ProductoParametrosInyeccion producto={producto} />
        </TabsContent>
        <TabsContent value="archivos" className="mt-6">
          <ProductoArchivos producto={producto} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
