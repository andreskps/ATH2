"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { estadosOrden } from "@/lib/data/ordenes"
import { getClientes } from "@/lib/data/clientes"

export function OrdenesFiltros() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Inicializar estados con valores de searchParams
  const [busqueda, setBusqueda] = useState(searchParams.get("busqueda") || "")
  const [estado, setEstado] = useState(searchParams.get("estado") || "all")
  const [clienteId, setClienteId] = useState(searchParams.get("clienteId") || "all")

  // Obtener clientes una sola vez
  const clientes = getClientes()

  // Función para crear una nueva URL con parámetros actualizados
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())

      if (value && value !== "all") {
        params.set(name, value)
      } else {
        params.delete(name)
      }

      return params.toString()
    },
    [searchParams],
  )

  // Manejadores de eventos
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const queryString = createQueryString("busqueda", busqueda)
    router.push(`${pathname}?${queryString}`)
  }

  const handleEstadoChange = (value: string) => {
    setEstado(value)
    const queryString = createQueryString("estado", value)
    router.push(`${pathname}?${queryString}`)
  }

  const handleClienteChange = (value: string) => {
    setClienteId(value)
    const queryString = createQueryString("clienteId", value)
    router.push(`${pathname}?${queryString}`)
  }

  const handleClearSearch = () => {
    setBusqueda("")
    const params = new URLSearchParams(searchParams.toString())
    params.delete("busqueda")
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1">
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar por código o cliente..."
            className="pl-8"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          {busqueda && (
            <Button
              variant="ghost"
              type="button"
              className="absolute right-0 top-0 h-9 w-9 p-0"
              onClick={handleClearSearch}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Limpiar búsqueda</span>
            </Button>
          )}
        </form>
      </div>
      <div className="grid grid-cols-2 gap-4 md:w-2/5">
        <Select value={estado} onValueChange={handleEstadoChange}>
          <SelectTrigger>
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los estados</SelectItem>
            {Object.entries(estadosOrden).map(([key, { label }]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={clienteId} onValueChange={handleClienteChange}>
          <SelectTrigger>
            <SelectValue placeholder="Cliente" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los clientes</SelectItem>
            {clientes.map((cliente) => (
              <SelectItem key={cliente.id} value={cliente.id.toString()}>
                {cliente.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
