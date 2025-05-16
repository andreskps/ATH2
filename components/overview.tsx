"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  {
    name: "Ene",
    total: 157000,
  },
  {
    name: "Feb",
    total: 165000,
  },
  {
    name: "Mar",
    total: 180000,
  },
  {
    name: "Abr",
    total: 190000,
  },
  {
    name: "May",
    total: 210000,
  },
  {
    name: "Jun",
    total: 220000,
  },
  {
    name: "Jul",
    total: 215000,
  },
  {
    name: "Ago",
    total: 230000,
  },
  {
    name: "Sep",
    total: 240000,
  },
  {
    name: "Oct",
    total: 248500,
  },
  {
    name: "Nov",
    total: 0,
  },
  {
    name: "Dic",
    total: 0,
  },
]

export function Overview() {
  return (
    <ChartContainer
      config={{
        total: {
          label: "Ventas",
          color: "hsl(var(--primary))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value / 1000}k`}
          />
          <ChartTooltip content={<ChartTooltipContent formatValue={(value) => `$${value.toLocaleString()}`} />} />
          <Bar dataKey="total" radius={[4, 4, 0, 0]} className="fill-primary" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
