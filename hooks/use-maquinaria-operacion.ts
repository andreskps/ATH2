"use client"

import { useState, useEffect, useCallback } from "react"
import { getMaquinas } from "@/lib/data/maquinaria"
import { getEmpleadoById } from "@/lib/data/empleados"

// Tipo para la información de operación de una máquina
export interface MaquinaOperacion {
  id: string
  codigo: string
  nombre: string
  modelo: string
  marca: string
  tipo: string
  ubicacion: string
  imagen?: string
  estadoOperacion: "Produciendo" | "Detenida" | "Configurando" | "Mantenimiento" | "Inactiva"
  operador?: {
    id: string
    nombre: string
    avatar?: string
    fotoOperando?: string // Añadir este campo
  }
  horaInicio?: string
  tiempoOperacion?: string
  productoActual?: string
  ordenActual?: string
  moldeActual?: string
  ciclosPorMinuto?: number
  unidadesProducidas?: number
  metaProduccion?: number
  eficiencia?: number
  alertas?: string[]
}

export function useMaquinariaOperacion() {
  const [maquinasEnOperacion, setMaquinasEnOperacion] = useState<MaquinaOperacion[]>([])
  const [areas, setAreas] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchMaquinasOperacion = useCallback(async () => {
    try {
      setIsLoading(true)

      // Obtener las máquinas
      const maquinas = await getMaquinas()

      // Simular datos de operación en tiempo real
      // En una aplicación real, estos datos vendrían de una API o WebSockets
      const maquinasConOperacion: MaquinaOperacion[] = await Promise.all(
        maquinas.map(async (maquina) => {
          // Generar datos aleatorios para simular operación en tiempo real
          const estadosOperacion: MaquinaOperacion["estadoOperacion"][] = [
            "Produciendo",
            "Detenida",
            "Configurando",
            "Mantenimiento",
            "Inactiva",
          ]

          const estadoOperacion = estadosOperacion[Math.floor(Math.random() * 5)]

          // Solo asignar operador si la máquina está en uso
          let operador = undefined
          if (["Produciendo", "Configurando"].includes(estadoOperacion)) {
            // Asignar un operador aleatorio (IDs del 1 al 5)
            const operadorId = String(Math.floor(Math.random() * 5) + 1)
            const empleadoData = await getEmpleadoById(operadorId)

            if (empleadoData) {
              operador = {
                id: empleadoData.id,
                nombre: `${empleadoData.nombre} ${empleadoData.apellido}`,
                avatar: empleadoData.foto,
                fotoOperando: "/industrial-injection-molding.png",
              }
            }
          }

          // Generar hora de inicio aleatoria (entre 1 y 8 horas atrás)
          const horasAtras = Math.floor(Math.random() * 8) + 1
          const fechaInicio = new Date()
          fechaInicio.setHours(fechaInicio.getHours() - horasAtras)

          // Generar alertas aleatorias
          const tieneAlertas = Math.random() > 0.7 // 30% de probabilidad de tener alertas
          const alertas = tieneAlertas
            ? ["Temperatura fuera de rango", "Presión de cierre baja", "Ciclo más lento de lo esperado"].slice(
                0,
                Math.floor(Math.random() * 3) + 1,
              )
            : undefined

          // Generar eficiencia aleatoria
          const eficiencia = Math.floor(Math.random() * 40) + 60 // Entre 60% y 100%

          return {
            id: maquina.id,
            codigo: maquina.codigo,
            nombre: maquina.nombre,
            modelo: maquina.modelo,
            marca: maquina.marca,
            tipo: maquina.tipo,
            ubicacion: maquina.ubicacion,
            imagen: maquina.imagen,
            estadoOperacion,
            operador,
            horaInicio: estadoOperacion !== "Inactiva" ? fechaInicio.toLocaleTimeString() : undefined,
            tiempoOperacion:
              estadoOperacion !== "Inactiva" ? `${horasAtras}h ${Math.floor(Math.random() * 60)}m` : undefined,
            productoActual:
              estadoOperacion === "Produciendo"
                ? ["Botella 500ml", "Tapa Rosca", "Contenedor 1L", "Envase Cosmético"][Math.floor(Math.random() * 4)]
                : undefined,
            ordenActual:
              estadoOperacion === "Produciendo" ? `OP-${Math.floor(Math.random() * 1000) + 1000}` : undefined,
            moldeActual: estadoOperacion === "Produciendo" ? `M-${Math.floor(Math.random() * 100) + 100}` : undefined,
            ciclosPorMinuto: estadoOperacion === "Produciendo" ? Math.floor(Math.random() * 10) + 1 : undefined,
            unidadesProducidas: estadoOperacion === "Produciendo" ? Math.floor(Math.random() * 5000) + 1000 : undefined,
            metaProduccion: estadoOperacion === "Produciendo" ? Math.floor(Math.random() * 5000) + 5000 : undefined,
            eficiencia: ["Produciendo", "Configurando"].includes(estadoOperacion) ? eficiencia : undefined,
            alertas,
          }
        }),
      )

      // Extraer áreas únicas
      const areasUnicas = Array.from(new Set(maquinasConOperacion.map((m) => m.ubicacion)))

      setMaquinasEnOperacion(maquinasConOperacion)
      setAreas(areasUnicas)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Error desconocido"))
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Cargar datos iniciales
  useEffect(() => {
    fetchMaquinasOperacion()
  }, [fetchMaquinasOperacion])

  return {
    maquinasEnOperacion,
    areas,
    isLoading,
    error,
    refetch: fetchMaquinasOperacion,
  }
}
