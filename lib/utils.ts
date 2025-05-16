import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Añadir la función formatDate al archivo utils.ts
// Esta función toma una fecha en formato string o Date y la devuelve formateada

export function formatDate(date: string | Date): string {
  if (!date) return "N/A"

  const d = typeof date === "string" ? new Date(date) : date

  // Verificar si la fecha es válida
  if (isNaN(d.getTime())) return "Fecha inválida"

  // Formatear la fecha como DD/MM/YYYY HH:MM
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d)
}

// Añadir la función formatCurrency al archivo utils.ts
// Esta función toma un valor numérico y un código de moneda y devuelve el valor formateado
export function formatCurrency(amount: number, currency = "MXN"): string {
  // Mapa de símbolos de moneda
  const currencySymbols: Record<string, string> = {
    MXN: "$",
    USD: "US$",
    EUR: "€",
    // Añadir más monedas según sea necesario
  }

  // Obtener el símbolo de la moneda o usar el código si no está en el mapa
  const symbol = currencySymbols[currency] || currency

  // Formatear el número con separadores de miles y dos decimales
  const formattedAmount = new Intl.NumberFormat("es-MX", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)

  // Devolver el valor formateado con el símbolo de la moneda
  return `${symbol}${formattedAmount}`
}
