"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface ParametroChartProps {
  parametroId: string
}

export function ParametroChart({ parametroId }: ParametroChartProps) {
  // Datos de ejemplo para el gráfico
  const temperatureData = [
    { name: "Zona 1", actual: 180, minimo: 170, maximo: 190, optimo: 180 },
    { name: "Zona 2", actual: 185, minimo: 175, maximo: 195, optimo: 185 },
    { name: "Zona 3", actual: 190, minimo: 180, maximo: 200, optimo: 190 },
    { name: "Boquilla", actual: 200, minimo: 190, maximo: 210, optimo: 200 },
    { name: "Molde", actual: 45, minimo: 40, maximo: 50, optimo: 45 },
  ]

  const pressureData = [
    { name: "Inyección", actual: 120, minimo: 100, maximo: 140, optimo: 120 },
    { name: "Mantenimiento", actual: 80, minimo: 70, maximo: 90, optimo: 80 },
    { name: "Contrapresión", actual: 15, minimo: 10, maximo: 20, optimo: 15 },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Perfil de Temperaturas</CardTitle>
          <CardDescription>Comparación de valores actuales vs rangos recomendados</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={temperatureData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="minimo" fill="#ef4444" name="Mínimo" />
              <Bar dataKey="actual" fill="#3b82f6" name="Actual" />
              <Bar dataKey="maximo" fill="#22c55e" name="Máximo" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Perfil de Presiones</CardTitle>
          <CardDescription>Análisis de presiones del proceso</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={pressureData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="minimo" fill="#ef4444" name="Mínimo" />
              <Bar dataKey="actual" fill="#3b82f6" name="Actual" />
              <Bar dataKey="maximo" fill="#22c55e" name="Máximo" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
