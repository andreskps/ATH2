"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, AlertTriangle, TrendingUp, Percent } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { supervisiones } from "@/lib/data/supervision"

export default function SupervisionDashboard() {
  const [timeframe, setTimeframe] = useState("hoy")

  // Calcular estadísticas
  const enProduccion = supervisiones.filter((s) => s.estado === "en_produccion").length
  const pausadas = supervisiones.filter((s) => s.estado === "pausada").length
  const pendientes = supervisiones.filter((s) => s.estado === "pendiente").length
  const finalizadas = supervisiones.filter((s) => s.estado === "finalizada").length

  const totalProducido = supervisiones.reduce((sum, s) => sum + s.cantidadProducida, 0)
  const totalProgramado = supervisiones.reduce((sum, s) => sum + s.cantidadProgramada, 0)
  const porcentajeCompletado = totalProgramado > 0 ? Math.round((totalProducido / totalProgramado) * 100) : 0

  const eficienciaPromedio =
    supervisiones.length > 0
      ? Math.round(supervisiones.reduce((sum, s) => sum + s.eficienciaGeneral, 0) / supervisiones.length)
      : 0

  const totalDefectos = supervisiones.reduce((sum, s) => sum + s.cantidadDefectuosa, 0)
  const tasaDefectos = totalProducido > 0 ? Math.round((totalDefectos / totalProducido) * 100 * 10) / 10 : 0

  const tiempoParadas = supervisiones.reduce((sum, s) => sum + s.tiempoParadas, 0)

  return (
    <div className="space-y-4">
      <Tabs defaultValue="general" className="w-full">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="produccion">Producción</TabsTrigger>
            <TabsTrigger value="calidad">Calidad</TabsTrigger>
            <TabsTrigger value="eficiencia">Eficiencia</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <TabsList>
              <TabsTrigger
                value="hoy"
                onClick={() => setTimeframe("hoy")}
                data-state={timeframe === "hoy" ? "active" : "inactive"}
              >
                Hoy
              </TabsTrigger>
              <TabsTrigger
                value="semana"
                onClick={() => setTimeframe("semana")}
                data-state={timeframe === "semana" ? "active" : "inactive"}
              >
                Semana
              </TabsTrigger>
              <TabsTrigger
                value="mes"
                onClick={() => setTimeframe("mes")}
                data-state={timeframe === "mes" ? "active" : "inactive"}
              >
                Mes
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <TabsContent value="general" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">En producción</CardTitle>
                <Activity className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{enProduccion}</div>
                <p className="text-xs text-muted-foreground">
                  {pausadas} pausadas, {pendientes} pendientes
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Producción total</CardTitle>
                <TrendingUp className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalProducido.toLocaleString()}</div>
                <div className="mt-2 flex items-center gap-2">
                  <Progress value={porcentajeCompletado} className="h-2" />
                  <span className="text-xs text-muted-foreground">{porcentajeCompletado}% completado</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Eficiencia promedio</CardTitle>
                <Percent className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{eficienciaPromedio}%</div>
                <p className="text-xs text-muted-foreground">{finalizadas} órdenes finalizadas</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tasa de defectos</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{tasaDefectos}%</div>
                <p className="text-xs text-muted-foreground">{totalDefectos.toLocaleString()} unidades defectuosas</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Producción por máquina</CardTitle>
                <CardDescription>Distribución de la producción actual por máquina</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[200px] flex items-center justify-center">
                  <p className="text-sm text-muted-foreground">Gráfico de producción por máquina</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Tiempo de paradas</CardTitle>
                <CardDescription>Total: {tiempoParadas} minutos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center">
                  <p className="text-sm text-muted-foreground">Gráfico de distribución de paradas</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="produccion" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Producción por hora</CardTitle>
              <CardDescription>Análisis de la producción por hora del día</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[300px] flex items-center justify-center">
                <p className="text-sm text-muted-foreground">Gráfico de producción por hora</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calidad" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Análisis de defectos</CardTitle>
              <CardDescription>Distribución de defectos por tipo</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[300px] flex items-center justify-center">
                <p className="text-sm text-muted-foreground">Gráfico de distribución de defectos</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="eficiencia" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Eficiencia por máquina</CardTitle>
              <CardDescription>Comparativa de eficiencia entre máquinas</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[300px] flex items-center justify-center">
                <p className="text-sm text-muted-foreground">Gráfico de eficiencia por máquina</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
