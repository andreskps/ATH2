import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Factory, Package, TestTube, CheckCircle } from "lucide-react"
import Link from "next/link"
import { ParametrosTable } from "@/components/parametros-produccion/parametros-table"
import { ParametrosFiltros } from "@/components/parametros-produccion/parametros-filtros"
import { ParametrosTableSkeleton } from "@/components/parametros-produccion/parametros-table-skeleton"

export default function ParametrosProduccionPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Parámetros de Producción</h1>
            <p className="text-muted-foreground">Gestiona los parámetros técnicos para la producción industrial.</p>
          </div>
          <Button asChild>
            <Link href="/parametros-produccion/nuevo">
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Parámetro
            </Link>
          </Button>
        </div>
      </div>

      {/* Métricas Dashboard */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Parámetros</CardTitle>
            <Factory className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+3 desde el mes pasado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Validados</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">18</div>
            <p className="text-xs text-muted-foreground">75% del total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
            <Package className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">4</div>
            <p className="text-xs text-muted-foreground">Requieren validación</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Activos</CardTitle>
            <TestTube className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">16</div>
            <p className="text-xs text-muted-foreground">En uso actualmente</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <ParametrosFiltros />

      {/* Tabla de Parámetros */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Parámetros</CardTitle>
          <CardDescription>Gestiona todos los parámetros de producción registrados en el sistema.</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<ParametrosTableSkeleton />}>
            <ParametrosTable />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}
