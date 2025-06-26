import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Copy, BarChart3, Download, Play } from "lucide-react"
import Link from "next/link"
import { BackButton } from "@/components/ui/back-button"
import { ParametroDetalle } from "@/components/parametros-produccion/parametro-detalle"
import { ParametroChart } from "@/components/parametros-produccion/parametro-chart"

interface ParametroPageProps {
  params: {
    id: string
  }
}

export default function ParametroPage({ params }: ParametroPageProps) {
  // En una aplicación real, aquí cargarías los datos del parámetro
  const parametro = {
    id: params.id,
    name: "Vaso 200ml - PP Transparente",
    product: "Vaso 200ml",
    machine: "INY-001",
    status: "validated",
    createdAt: "2025-06-26T10:30:00Z",
    createdBy: "Juan Martínez",
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "validated":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Validado</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendiente</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rechazado</Badge>
      default:
        return <Badge variant="secondary">Desconocido</Badge>
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <BackButton href="/parametros-produccion" />
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">{parametro.name}</h1>
            {getStatusBadge(parametro.status)}
          </div>
          <p className="text-muted-foreground">
            ID: {parametro.id} • Creado por {parametro.createdBy}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Copy className="mr-2 h-4 w-4" />
            Clonar
          </Button>
          <Button variant="outline" size="sm">
            <BarChart3 className="mr-2 h-4 w-4" />
            Comparar
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button size="sm">
            <Play className="mr-2 h-4 w-4" />
            Usar en Orden
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href={`/parametros-produccion/editar/${params.id}`}>
              <Edit className="mr-2 h-4 w-4" />
              Editar
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <ParametroDetalle parametroId={params.id} />
          <Card>
            <CardHeader>
              <CardTitle>Análisis de Parámetros</CardTitle>
              <CardDescription>Visualización de los valores vs rangos recomendados</CardDescription>
            </CardHeader>
            <CardContent>
              <ParametroChart parametroId={params.id} />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Información General</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Producto</label>
                <p className="text-sm">{parametro.product}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Máquina</label>
                <p className="text-sm">{parametro.machine}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Estado</label>
                <div className="mt-1">{getStatusBadge(parametro.status)}</div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Fecha de Creación</label>
                <p className="text-sm">{new Date(parametro.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Creado por</label>
                <p className="text-sm">{parametro.createdBy}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Materias Primas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Badge variant="outline" className="mr-2">
                  PP Transparente
                </Badge>
                <Badge variant="outline" className="mr-2">
                  Aditivo UV
                </Badge>
                <Badge variant="outline" className="mr-2">
                  Colorante Azul
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notas y Observaciones</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Parámetros optimizados para producción de vasos transparentes. Temperatura de molde ajustada para mejor
                acabado superficial.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
