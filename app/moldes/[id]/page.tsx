import { notFound } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2, AlertTriangle } from "lucide-react"
import BackButton from "@/components/ui/back-button"
import MoldeDetalle from "@/components/moldes/molde-detalle"
import MoldeProductosAsociados from "@/components/moldes/molde-productos-asociados"
import MoldeHistorialMantenimiento from "@/components/moldes/molde-historial-mantenimiento"
import { getMolde } from "@/lib/data/moldes"

export default async function MoldeDetallePage({ params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id, 10)
  const molde = await getMolde(id)

  if (!molde) {
    notFound()
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BackButton />
          <h1 className="text-3xl font-bold tracking-tight">{molde.nombre}</h1>
          {molde.requiereMantenimiento && (
            <div className="flex items-center gap-1 text-amber-500">
              <AlertTriangle className="h-5 w-5" />
              <span className="text-sm font-medium">Requiere mantenimiento</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <a href={`/moldes/editar/${molde.id}`}>
              <Pencil className="mr-2 h-4 w-4" />
              Editar
            </a>
          </Button>
          <Button variant="destructive" size="sm">
            <Trash2 className="mr-2 h-4 w-4" />
            Eliminar
          </Button>
        </div>
      </div>

      <Tabs defaultValue="detalles" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="detalles">Detalles</TabsTrigger>
          <TabsTrigger value="productos">Productos Asociados</TabsTrigger>
          <TabsTrigger value="mantenimiento">Historial de Mantenimiento</TabsTrigger>
        </TabsList>

        <TabsContent value="detalles" className="mt-6">
          <MoldeDetalle molde={molde} />
        </TabsContent>

        <TabsContent value="productos" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Productos Asociados</CardTitle>
              <CardDescription>Productos que utilizan este molde en su fabricación</CardDescription>
            </CardHeader>
            <CardContent>
              <MoldeProductosAsociados molde={molde} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mantenimiento" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Mantenimiento</CardTitle>
              <CardDescription>Registro de mantenimientos realizados al molde</CardDescription>
            </CardHeader>
            <CardContent>
              <MoldeHistorialMantenimiento molde={molde} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
