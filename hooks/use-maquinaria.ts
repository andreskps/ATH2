"use client"

import { useState, useEffect } from "react"
import { getMaquinas, type Maquina } from "@/lib/data/maquinaria"

export function useMaquinaria() {
  const [maquinas, setMaquinas] = useState<Maquina[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchMaquinas = async () => {
      try {
        setIsLoading(true)
        const data = await getMaquinas()
        setMaquinas(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Error desconocido"))
        console.error("Error al cargar maquinaria:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMaquinas()
  }, [])

  return {
    maquinas,
    isLoading,
    error,
  }
}
