import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Settings, FileText, Users, Building, Plus } from "lucide-react"
import Link from "next/link"
import { obtenerContratos, obtenerCargos, obtenerAreas } from "@/lib/data/configuracion"

export default function ConfiguracionPage() {
  const contratos = obtenerContratos()
  const cargos = obtenerCargos()
  const areas = obtenerAreas()

  const contratosActivos = contratos.filter((c) => c.activo).length
  const cargosActivos = cargos.filter((c) => c.activo).length
  const areasActivas = areas.filter((a) => a.activo).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
          <p className="text-muted-foreground">Gestiona contratos, cargos y áreas de la empresa</p>
        </div>
        <Settings className="h-8 w-8 text-muted-foreground" />
      </div>

      {/* Módulos de Configuración */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Contratos */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <FileText className="h-8 w-8 text-blue-600" />
              <Badge variant="secondary">{contratosActivos} activos</Badge>
            </div>
            <CardTitle>Contratos</CardTitle>
            <CardDescription>Tipos de contratos laborales</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-muted-foreground">{contratos.length} contratos registrados</div>
            <div className="flex gap-2">
              <Button asChild className="flex-1">
                <Link href="/configuracion/contratos">Ver Contratos</Link>
              </Button>
              <Button asChild variant="outline" size="icon">
                <Link href="/configuracion/contratos/nuevo">
                  <Plus className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Cargos */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Users className="h-8 w-8 text-green-600" />
              <Badge variant="secondary">{cargosActivos} activos</Badge>
            </div>
            <CardTitle>Cargos</CardTitle>
            <CardDescription>Cargos y posiciones de trabajo</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-muted-foreground">{cargos.length} cargos registrados</div>
            <div className="flex gap-2">
              <Button asChild className="flex-1">
                <Link href="/configuracion/cargos">Ver Cargos</Link>
              </Button>
              <Button asChild variant="outline" size="icon">
                <Link href="/configuracion/cargos/nuevo">
                  <Plus className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Áreas */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Building className="h-8 w-8 text-purple-600" />
              <Badge variant="secondary">{areasActivas} activas</Badge>
            </div>
            <CardTitle>Áreas</CardTitle>
            <CardDescription>Áreas de trabajo de la empresa</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-muted-foreground">{areas.length} áreas registradas</div>
            <div className="flex gap-2">
              <Button asChild className="flex-1">
                <Link href="/configuracion/areas">Ver Áreas</Link>
              </Button>
              <Button asChild variant="outline" size="icon">
                <Link href="/configuracion/areas/nueva">
                  <Plus className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
