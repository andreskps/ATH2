"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"

export function MateriaPrimaForm({ materiaPrima = null }: { materiaPrima?: any }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    nombre: materiaPrima?.nombre || "",
    codigo: materiaPrima?.codigo || "",
    tipo: materiaPrima?.tipo || "",
    unidadMedida: materiaPrima?.unidadMedida || "Kg",
    precio: materiaPrima?.precio || "",
    proveedor: materiaPrima?.proveedor || "",
    color: materiaPrima?.color || "",
    stockActual: materiaPrima?.stockActual || "",
    stockMinimo: materiaPrima?.stockMinimo || "",
    observaciones: materiaPrima?.observaciones || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulamos una petición
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setLoading(false)
    router.push("/materia-prima")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="nombre">Nombre de la Materia Prima</Label>
          <Input id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="codigo">Código Interno</Label>
          <Input id="codigo" name="codigo" value={formData.codigo} onChange={handleChange} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tipo">Tipo</Label>
          <Select value={formData.tipo} onValueChange={(value) => handleSelectChange("tipo", value)}>
            <SelectTrigger id="tipo">
              <SelectValue placeholder="Selecciona un tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Resina">Resina</SelectItem>
              <SelectItem value="Pigmento">Pigmento</SelectItem>
              <SelectItem value="Aditivo">Aditivo</SelectItem>
              <SelectItem value="Reciclado">Reciclado</SelectItem>
              <SelectItem value="Masterbatch">Masterbatch</SelectItem>
              <SelectItem value="Otro">Otro</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="unidadMedida">Unidad de Medida</Label>
          <Select value={formData.unidadMedida} onValueChange={(value) => handleSelectChange("unidadMedida", value)}>
            <SelectTrigger id="unidadMedida">
              <SelectValue placeholder="Selecciona una unidad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Kg">Kilogramos (Kg)</SelectItem>
              <SelectItem value="g">Gramos (g)</SelectItem>
              <SelectItem value="L">Litros (L)</SelectItem>
              <SelectItem value="ml">Mililitros (ml)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="precio">Precio (por unidad)</Label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
            <Input
              id="precio"
              name="precio"
              type="number"
              step="0.01"
              min="0"
              value={formData.precio}
              onChange={handleChange}
              className="pl-7"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="proveedor">Proveedor Habitual</Label>
          <Input id="proveedor" name="proveedor" value={formData.proveedor} onChange={handleChange} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="color">Color (si aplica)</Label>
          <Input id="color" name="color" value={formData.color} onChange={handleChange} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="stockActual">Stock Actual</Label>
          <Input
            id="stockActual"
            name="stockActual"
            type="number"
            min="0"
            value={formData.stockActual}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="stockMinimo">Stock Mínimo</Label>
          <Input
            id="stockMinimo"
            name="stockMinimo"
            type="number"
            min="0"
            value={formData.stockMinimo}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="observaciones">Observaciones</Label>
        <Textarea
          id="observaciones"
          name="observaciones"
          value={formData.observaciones}
          onChange={handleChange}
          rows={3}
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={() => router.push("/materia-prima")}>
          Cancelar
        </Button>
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {materiaPrima ? "Actualizar" : "Crear"} Materia Prima
        </Button>
      </div>
    </form>
  )
}
