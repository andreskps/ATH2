"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getClientes } from "@/lib/data/clientes"
import { productos } from "@/lib/data/ordenes"

export default function ProgramacionFiltros() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const clientes = getClientes()

  const [filtros, setFiltros] = useState({
    cliente: searchParams.get("cliente") || "",
    producto: searchParams.get("producto") || "",
    urgencia: searchParams.get("urgencia") || "",
    fechaDesde: searchParams.get("fechaDesde") || "",
    fechaHasta: searchParams.get("fechaHasta") || "",
  })

  const aplicarFiltros = () => {
    const params = new URLSearchParams()
    Object.entries(filtros).forEach(([key, value]) => {
      if (value) {
        params.set(key, value)
      }
    })
    router.push(`/programacion?${params.toString()}`)
  }

  const limpiarFiltros = () => {
    setFiltros({
      cliente: "",
      producto: "",
      urgencia: "",
      fechaDesde: "",
      fechaHasta: "",
    })
    router.push("/programacion")
  }

  return (
    <div className="bg-background border rounded-lg p-4">
      <h2 className="font-semibold mb-4">Filtros</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="space-y-2">
          <Label htmlFor="cliente">Cliente</Label>
          <Select value={filtros.cliente} onValueChange={(value) => setFiltros({ ...filtros, cliente: value })}>
            <SelectTrigger id="cliente">
              <SelectValue placeholder="Todos los clientes" />
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

        <div className="space-y-2">
          <Label htmlFor="producto">Producto</Label>
          <Select value={filtros.producto} onValueChange={(value) => setFiltros({ ...filtros, producto: value })}>
            <SelectTrigger id="producto">
              <SelectValue placeholder="Todos los productos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los productos</SelectItem>
              {productos.map((producto) => (
                <SelectItem key={producto.id} value={producto.id}>
                  {producto.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="urgencia">Urgencia</Label>
          <Select value={filtros.urgencia} onValueChange={(value) => setFiltros({ ...filtros, urgencia: value })}>
            <SelectTrigger id="urgencia">
              <SelectValue placeholder="Todas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="alta">Alta</SelectItem>
              <SelectItem value="media">Media</SelectItem>
              <SelectItem value="baja">Baja</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="fechaDesde">Fecha desde</Label>
          <Input
            id="fechaDesde"
            type="date"
            value={filtros.fechaDesde}
            onChange={(e) => setFiltros({ ...filtros, fechaDesde: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fechaHasta">Fecha hasta</Label>
          <Input
            id="fechaHasta"
            type="date"
            value={filtros.fechaHasta}
            onChange={(e) => setFiltros({ ...filtros, fechaHasta: e.target.value })}
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" onClick={limpiarFiltros}>
          Limpiar
        </Button>
        <Button onClick={aplicarFiltros}>Aplicar filtros</Button>
      </div>
    </div>
  )
}
