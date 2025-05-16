"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { Gauge, Timer, CheckCircle, TrendingUp } from "lucide-react"
import {
  oeeData,
  oeeHistorico,
  oeePorMaquina,
  getOEEColor,
  getOEEBackgroundColor,
  getOEEStatus,
  getAverageOEE,
  getAverageAvailability,
  getAveragePerformance,
  getAverageQuality,
} from "@/lib/data/oee"

// Importar el componente GaugeChart
import { GaugeChart } from "@/components/ui/gauge-chart"

// Colores para los gráficos
const COLORS = {
  oee: "#3b82f6",
  disponibilidad: "#10b981",
  rendimiento: "#f59e0b",
  calidad: "#8b5cf6",
  defectos: "#ef4444",
  tiempo: "#6366f1",
}

// Componente para mostrar una métrica con un ícono
function MetricCard({
  title,
  value,
  icon,
  description,
  trend,
  color = "text-blue-500",
  bgColor = "bg-blue-100",
}: {
  title: string
  value: string | number
  icon: React.ReactNode
  description?: string
  trend?: { value: number; label: string }
  color?: string
  bgColor?: string
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={`${bgColor} p-2 rounded-full`}>{icon}</div>
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${color}`}>{value}</div>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
        {trend && (
          <div className="flex items-center mt-2">
            <span className={trend.value >= 0 ? "text-green-500" : "text-red-500"}>
              {trend.value >= 0 ? "+" : ""}
              {trend.value}%
            </span>
            <span className="text-xs text-muted-foreground ml-2">{trend.label}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Componente para mostrar una tarjeta de OEE
function OEECard({
  title,
  oee,
  disponibilidad,
  rendimiento,
  calidad,
  showTrend = false,
  trend = [],
}: {
  title: string
  oee: number
  disponibilidad: number
  rendimiento: number
  calidad: number
  showTrend?: boolean
  trend?: number[]
}) {
  const color = getOEEColor(oee)
  const status = getOEEStatus(oee)

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getOEEBackgroundColor(oee)} ${color}`}>
            {status}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center">
          <GaugeChart value={oee} size="md" className="mb-2" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>Disponibilidad</span>
            </span>
            <span>{disponibilidad}%</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span>Rendimiento</span>
            </span>
            <span>{rendimiento}%</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <span>Calidad</span>
            </span>
            <span>{calidad}%</span>
          </div>
        </div>

        {showTrend && trend.length > 0 && (
          <div className="pt-2">
            <p className="text-xs text-muted-foreground mb-1">Tendencia (7 días)</p>
            <ResponsiveContainer width="100%" height={40}>
              <LineChart data={trend.map((value, index) => ({ day: index, value }))}>
                <Line type="monotone" dataKey="value" stroke={COLORS.oee} strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Componente principal del dashboard
export default function OEEDashboard() {
  const [timeframe, setTimeframe] = useState("hoy")
  const [selectedMachine, setSelectedMachine] = useState("todos")

  // Calcular promedios
  const avgOEE = getAverageOEE(oeeData)
  const avgAvailability = getAverageAvailability(oeeData)
  const avgPerformance = getAveragePerformance(oeeData)
  const avgQuality = getAverageQuality(oeeData)

  // Datos para el gráfico de radar
  const radarData = [
    { subject: "Disponibilidad", A: avgAvailability, fullMark: 100 },
    { subject: "Rendimiento", A: avgPerformance, fullMark: 100 },
    { subject: "Calidad", A: avgQuality, fullMark: 100 },
  ]

  // Datos para el gráfico de barras de OEE por máquina
  const barData = oeePorMaquina.map((machine) => ({
    name: machine.maquinaNombre.split(" ")[0] + " " + machine.maquinaNombre.split(" ")[1],
    oee: machine.oee,
    disponibilidad: machine.disponibilidad,
    rendimiento: machine.rendimiento,
    calidad: machine.calidad,
  }))

  // Datos para el gráfico de líneas histórico
  const lineData = oeeHistorico.map((item) => ({
    name: item.fecha.split("-")[2], // Día del mes
    oee: item.oee,
    disponibilidad: item.disponibilidad,
    rendimiento: item.rendimiento,
    calidad: item.calidad,
  }))

  // Datos para el gráfico de pastel de causas de pérdida
  const pieData = [
    { name: "Paradas", value: 100 - avgAvailability },
    { name: "Velocidad", value: avgAvailability - (avgAvailability * avgPerformance) / 100 },
    {
      name: "Calidad",
      value: (avgAvailability * avgPerformance) / 100 - (avgAvailability * avgPerformance * avgQuality) / 10000,
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Tabs defaultValue="general" className="w-full sm:w-auto">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="tacometros">Tacómetros</TabsTrigger>
            <TabsTrigger value="maquinas">Máquinas</TabsTrigger>
            <TabsTrigger value="tendencias">Tendencias</TabsTrigger>
            <TabsTrigger value="perdidas">Pérdidas</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2">
          <Select value={selectedMachine} onValueChange={setSelectedMachine}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Seleccionar máquina" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todas las máquinas</SelectItem>
              {oeePorMaquina.map((machine) => (
                <SelectItem key={machine.maquinaId} value={machine.maquinaId}>
                  {machine.maquinaNombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hoy">Hoy</SelectItem>
              <SelectItem value="semana">Semana</SelectItem>
              <SelectItem value="mes">Mes</SelectItem>
              <SelectItem value="trimestre">Trimestre</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Métricas principales */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">OEE General</CardTitle>
            <div className="bg-blue-100 p-2 rounded-full">
              <Gauge className="h-4 w-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-col items-center">
              <GaugeChart value={avgOEE} colorScheme="default" size="md" className="mb-2" />
              <p className={`text-xs ${getOEEColor(avgOEE)}`}>Estado: {getOEEStatus(avgOEE)}</p>
              <div className="flex items-center mt-2">
                <span className="text-green-500">+2.5%</span>
                <span className="text-xs text-muted-foreground ml-2">vs semana anterior</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Disponibilidad</CardTitle>
            <div className="bg-green-100 p-2 rounded-full">
              <Timer className="h-4 w-4 text-green-500" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-col items-center">
              <GaugeChart value={avgAvailability} colorScheme="green" size="md" className="mb-2" />
              <p className="text-xs text-muted-foreground">Tiempo productivo / Tiempo planificado</p>
              <div className="flex items-center mt-2">
                <span className="text-green-500">+1.2%</span>
                <span className="text-xs text-muted-foreground ml-2">vs semana anterior</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Rendimiento</CardTitle>
            <div className="bg-yellow-100 p-2 rounded-full">
              <TrendingUp className="h-4 w-4 text-yellow-500" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-col items-center">
              <GaugeChart value={avgPerformance} colorScheme="yellow" size="md" className="mb-2" />
              <p className="text-xs text-muted-foreground">Producción real / Capacidad teórica</p>
              <div className="flex items-center mt-2">
                <span className="text-red-500">-0.8%</span>
                <span className="text-xs text-muted-foreground ml-2">vs semana anterior</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Calidad</CardTitle>
            <div className="bg-purple-100 p-2 rounded-full">
              <CheckCircle className="h-4 w-4 text-purple-500" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-col items-center">
              <GaugeChart value={avgQuality} colorScheme="purple" size="md" className="mb-2" />
              <p className="text-xs text-muted-foreground">Piezas buenas / Total producido</p>
              <div className="flex items-center mt-2">
                <span className="text-green-500">+0.3%</span>
                <span className="text-xs text-muted-foreground ml-2">vs semana anterior</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contenido de pestañas */}
      <Tabs defaultValue="general" className="w-full">
        <TabsContent value="general" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Evolución del OEE</CardTitle>
                <CardDescription>Tendencia de los últimos 7 días</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip formatter={(value) => [`${value}%`]} labelFormatter={(label) => `Día ${label}`} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="oee"
                      name="OEE"
                      stroke={COLORS.oee}
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="disponibilidad"
                      name="Disponibilidad"
                      stroke={COLORS.disponibilidad}
                    />
                    <Line type="monotone" dataKey="rendimiento" name="Rendimiento" stroke={COLORS.rendimiento} />
                    <Line type="monotone" dataKey="calidad" name="Calidad" stroke={COLORS.calidad} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Componentes del OEE</CardTitle>
                <CardDescription>Análisis de factores</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar name="OEE" dataKey="A" stroke={COLORS.oee} fill={COLORS.oee} fillOpacity={0.6} />
                    <Tooltip formatter={(value) => [`${value}%`]} />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tacometros" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>OEE y sus Componentes</CardTitle>
                <CardDescription>Visualización detallada mediante tacómetros</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col items-center">
                    <GaugeChart value={avgOEE} size="lg" label="OEE General" />
                  </div>
                  <div className="flex flex-col items-center">
                    <GaugeChart value={avgAvailability} colorScheme="green" size="lg" label="Disponibilidad" />
                  </div>
                  <div className="flex flex-col items-center">
                    <GaugeChart value={avgPerformance} colorScheme="yellow" size="lg" label="Rendimiento" />
                  </div>
                  <div className="flex flex-col items-center">
                    <GaugeChart value={avgQuality} colorScheme="purple" size="lg" label="Calidad" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Análisis de Pérdidas</CardTitle>
                <CardDescription>Impacto en el OEE</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6 pt-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <span className="text-sm font-medium">Pérdidas por Disponibilidad</span>
                      </div>
                      <span className="font-medium">{(100 - avgAvailability).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-red-500 h-2.5 rounded-full"
                        style={{ width: `${100 - avgAvailability}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Incluye paradas planificadas y no planificadas, averías, cambios de formato, etc.
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <span className="text-sm font-medium">Pérdidas por Rendimiento</span>
                      </div>
                      <span className="font-medium">
                        {(avgAvailability - (avgAvailability * avgPerformance) / 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-yellow-500 h-2.5 rounded-full"
                        style={{ width: `${avgAvailability - (avgAvailability * avgPerformance) / 100}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Incluye microparadas, velocidad reducida, ajustes, etc.
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                        <span className="text-sm font-medium">Pérdidas por Calidad</span>
                      </div>
                      <span className="font-medium">
                        {(
                          (avgAvailability * avgPerformance) / 100 -
                          (avgAvailability * avgPerformance * avgQuality) / 10000
                        ).toFixed(1)}
                        %
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-purple-500 h-2.5 rounded-full"
                        style={{
                          width: `${(avgAvailability * avgPerformance) / 100 - (avgAvailability * avgPerformance * avgQuality) / 10000}%`,
                        }}
                      ></div>
                    </div>
                    <div className="text-xs text-muted-foreground">Incluye defectos, rechazos, reprocesos, etc.</div>
                  </div>

                  <div className="pt-2 border-t">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">OEE (Eficiencia Total)</span>
                      <span className={`font-bold ${getOEEColor(avgOEE)}`}>{avgOEE}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="maquinas" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>OEE por Máquina</CardTitle>
                <CardDescription>Comparativa de rendimiento entre máquinas</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip formatter={(value) => [`${value}%`]} />
                    <Legend />
                    <Bar dataKey="oee" name="OEE" fill={COLORS.oee} />
                    <Bar dataKey="disponibilidad" name="Disponibilidad" fill={COLORS.disponibilidad} />
                    <Bar dataKey="rendimiento" name="Rendimiento" fill={COLORS.rendimiento} />
                    <Bar dataKey="calidad" name="Calidad" fill={COLORS.calidad} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {oeePorMaquina.map((machine) => (
              <OEECard
                key={machine.maquinaId}
                title={machine.maquinaNombre}
                oee={machine.oee}
                disponibilidad={machine.disponibilidad}
                rendimiento={machine.rendimiento}
                calidad={machine.calidad}
                showTrend={true}
                trend={machine.tendencia}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tendencias" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Tendencia de OEE</CardTitle>
                <CardDescription>Evolución en el tiempo</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip formatter={(value) => [`${value}%`]} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="oee"
                      name="OEE"
                      stroke={COLORS.oee}
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tendencia de Componentes</CardTitle>
                <CardDescription>Disponibilidad, Rendimiento y Calidad</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip formatter={(value) => [`${value}%`]} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="disponibilidad"
                      name="Disponibilidad"
                      stroke={COLORS.disponibilidad}
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="rendimiento"
                      name="Rendimiento"
                      stroke={COLORS.rendimiento}
                      strokeWidth={2}
                    />
                    <Line type="monotone" dataKey="calidad" name="Calidad" stroke={COLORS.calidad} strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="perdidas" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Distribución de Pérdidas</CardTitle>
                <CardDescription>Análisis de causas de pérdida de eficiencia</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={index === 0 ? "#ef4444" : index === 1 ? "#f59e0b" : "#8b5cf6"}
                        />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value.toFixed(1)}%`]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Análisis de Pérdidas</CardTitle>
                <CardDescription>Desglose detallado</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6 pt-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <span className="text-sm font-medium">Pérdidas por Disponibilidad</span>
                      </div>
                      <span className="font-medium">{(100 - avgAvailability).toFixed(1)}%</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Incluye paradas planificadas y no planificadas, averías, cambios de formato, etc.
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <span className="text-sm font-medium">Pérdidas por Rendimiento</span>
                      </div>
                      <span className="font-medium">
                        {(avgAvailability - (avgAvailability * avgPerformance) / 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Incluye microparadas, velocidad reducida, ajustes, etc.
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                        <span className="text-sm font-medium">Pérdidas por Calidad</span>
                      </div>
                      <span className="font-medium">
                        {(
                          (avgAvailability * avgPerformance) / 100 -
                          (avgAvailability * avgPerformance * avgQuality) / 10000
                        ).toFixed(1)}
                        %
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">Incluye defectos, rechazos, reprocesos, etc.</div>
                  </div>

                  <div className="pt-2 border-t">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">OEE (Eficiencia Total)</span>
                      <span className={`font-bold ${getOEEColor(avgOEE)}`}>{avgOEE}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
