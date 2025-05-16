import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ClipboardList,
  Package,
  Users,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  ShoppingBag,
  ListFilter,
  UserCheck,
} from "lucide-react"

export default function DotacionPage() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Gestión de Dotación</h1>
        <p className="text-muted-foreground">Administra los tipos de dotación, inventario y entregas a empleados</p>
      </div>

      <Tabs defaultValue="resumen" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:w-[400px]">
          <TabsTrigger value="resumen">Resumen</TabsTrigger>
          <TabsTrigger value="accesos">Accesos Rápidos</TabsTrigger>
          <TabsTrigger value="estadisticas">Estadísticas</TabsTrigger>
        </TabsList>

        <TabsContent value="resumen" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Tipos de Dotación</CardTitle>
                <ClipboardList className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">+2 desde el mes pasado</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Inventario Total</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,245</div>
                <p className="text-xs text-muted-foreground">+18% desde el último trimestre</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Entregas Pendientes</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">-3 desde la semana pasada</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-1 md:col-span-2">
              <CardHeader>
                <CardTitle>Estado del Inventario</CardTitle>
                <CardDescription>Resumen del estado actual del inventario de dotación</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="flex items-center space-x-2 rounded-md border p-4">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">Stock Adecuado</p>
                    <p className="text-sm text-muted-foreground">18 tipos de dotación con stock adecuado</p>
                  </div>
                </div>
                <div className="mt-2 flex items-center space-x-2 rounded-md border p-4">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">Bajo Stock</p>
                    <p className="text-sm text-muted-foreground">5 tipos de dotación con bajo stock</p>
                  </div>
                </div>
                <div className="mt-2 flex items-center space-x-2 rounded-md border p-4">
                  <ShoppingBag className="h-5 w-5 text-red-500" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">Agotado</p>
                    <p className="text-sm text-muted-foreground">1 tipo de dotación agotado</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Entregas Recientes</CardTitle>
                <CardDescription>Últimas entregas de dotación realizadas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">Juan Pérez</p>
                      <p className="text-sm text-muted-foreground">Uniforme completo</p>
                    </div>
                    <div className="ml-auto font-medium">Hoy</div>
                  </div>
                  <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">María García</p>
                      <p className="text-sm text-muted-foreground">Calzado de seguridad</p>
                    </div>
                    <div className="ml-auto font-medium">Ayer</div>
                  </div>
                  <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">Carlos López</p>
                      <p className="text-sm text-muted-foreground">Equipo de protección</p>
                    </div>
                    <div className="ml-auto font-medium">12/05</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Ver todas las entregas
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="accesos" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>Tipos de Dotación</CardTitle>
                <CardDescription>Gestiona los diferentes tipos de dotación disponibles</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">
                  Configura los tipos de dotación que se entregan a los empleados, como uniformes, equipos de
                  protección, etc.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/dotacion/tipos">
                    <ListFilter className="mr-2 h-4 w-4" />
                    Gestionar Tipos
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>Inventario de Dotación</CardTitle>
                <CardDescription>Controla el stock de dotación disponible</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">
                  Administra el inventario de dotación por tipo y talla, controla el stock mínimo y realiza entradas de
                  inventario.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/dotacion/inventario">
                    <Package className="mr-2 h-4 w-4" />
                    Ver Inventario
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>Entregas a Empleados</CardTitle>
                <CardDescription>Gestiona las entregas de dotación</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">
                  Registra las entregas de dotación a los empleados, consulta el historial y gestiona las entregas
                  pendientes.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/dotacion/entregas">
                    <UserCheck className="mr-2 h-4 w-4" />
                    Gestionar Entregas
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="estadisticas" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Estadísticas de Dotación</CardTitle>
              <CardDescription>Análisis y tendencias de dotación en los últimos meses</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Gráficos y estadísticas detalladas estarán disponibles próximamente
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
