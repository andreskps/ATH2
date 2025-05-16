"use client"

import { cn } from "@/lib/utils"

interface GaugeChartProps {
  value: number
  max?: number
  size?: "sm" | "md" | "lg"
  showValue?: boolean
  label?: string
  colorScheme?: "default" | "green" | "yellow" | "red" | "blue" | "purple"
  className?: string
}

export function GaugeChart({
  value,
  max = 100,
  size = "md",
  showValue = true,
  label,
  colorScheme = "default",
  className,
}: GaugeChartProps) {
  // Normalizar el valor entre 0 y 1
  const normalizedValue = Math.min(Math.max(value, 0), max) / max

  // Calcular el ángulo para el arco (180 grados es medio círculo)
  const angle = normalizedValue * 180

  // Determinar el tamaño del gauge
  const sizeClasses = {
    sm: "w-24 h-12",
    md: "w-32 h-16",
    lg: "w-40 h-20",
  }

  // Determinar el esquema de color
  const getColorScheme = () => {
    switch (colorScheme) {
      case "green":
        return "from-green-500 to-green-600"
      case "yellow":
        return "from-yellow-500 to-yellow-600"
      case "red":
        return "from-red-500 to-red-600"
      case "blue":
        return "from-blue-500 to-blue-600"
      case "purple":
        return "from-purple-500 to-purple-600"
      default:
        // Color basado en el valor
        if (normalizedValue >= 0.85) return "from-green-500 to-green-600"
        if (normalizedValue >= 0.7) return "from-yellow-500 to-yellow-600"
        if (normalizedValue >= 0.5) return "from-orange-500 to-orange-600"
        return "from-red-500 to-red-600"
    }
  }

  // Calcular las coordenadas del punto final del arco
  const radius = 50 // Radio del círculo SVG
  const centerX = 50 // Centro X del círculo SVG
  const centerY = 50 // Centro Y del círculo SVG
  const startAngle = -180 // Ángulo inicial (abajo a la izquierda)
  const endAngle = startAngle + angle // Ángulo final

  // Convertir ángulos a radianes
  const startRad = (startAngle * Math.PI) / 180
  const endRad = (endAngle * Math.PI) / 180

  // Calcular puntos de inicio y fin
  const startX = centerX + radius * Math.cos(startRad)
  const startY = centerY + radius * Math.sin(startRad)
  const endX = centerX + radius * Math.cos(endRad)
  const endY = centerY + radius * Math.sin(endRad)

  // Determinar si el arco es mayor a 180 grados
  const largeArcFlag = angle > 180 ? 1 : 0

  // Crear el path del arco
  const arcPath = `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className={cn("relative", sizeClasses[size])}>
        <svg viewBox="0 0 100 50" className="w-full h-full">
          {/* Fondo del gauge (gris claro) */}
          <path d="M 0 50 A 50 50 0 1 1 100 50" fill="none" stroke="#e5e7eb" strokeWidth="10" strokeLinecap="round" />

          {/* Arco coloreado que representa el valor */}
          <path
            d={arcPath}
            fill="none"
            className={`stroke-[10] stroke-linecap-round bg-gradient-to-r ${getColorScheme()}`}
            style={{
              stroke: `url(#gradient-${colorScheme})`,
            }}
            strokeLinecap="round"
          />

          {/* Definición del gradiente */}
          <defs>
            <linearGradient id={`gradient-${colorScheme}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" className={`stop-color-start-${getColorScheme().split(" ")[0].substring(5)}`} />
              <stop offset="100%" className={`stop-color-end-${getColorScheme().split(" ")[1].substring(3)}`} />
            </linearGradient>
          </defs>
        </svg>

        {/* Valor numérico en el centro */}
        {showValue && (
          <div className="absolute inset-0 flex items-center justify-center -mt-2">
            <span className={cn("font-bold", size === "sm" ? "text-sm" : size === "md" ? "text-lg" : "text-xl")}>
              {value}%
            </span>
          </div>
        )}
      </div>
      {label && <span className="text-xs text-muted-foreground mt-1">{label}</span>}
    </div>
  )
}
