"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { Proveedor } from "@/lib/data/proveedores"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

interface ProveedorFormProps {
  proveedor?: Proveedor
}

export default function ProveedorForm({ proveedor }: ProveedorFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Estados para los campos del formulario
  const [nombre, setNombre] = useState(proveedor?.nombre || "")
  const [nit, setNit] = useState(proveedor?.nit || "")
  const [tipo, setTipo] = useState(proveedor?.tipo || "")
  const [direccion, setDireccion] = useState(proveedor?.direccion || "")
  const [ciudad, setCiudad] = useState(proveedor?.ciudad || "")
  const [departamento, setDepartamento] = useState(proveedor?.departamento || "")
  const [pais, setPais] = useState(proveedor?.pais || "Colombia")
  const [celular, setCelular] = useState(proveedor?.celular || "")
  const [email, setEmail] = useState(proveedor?.email || "")
  const [estado, setEstado] = useState(proveedor?.estado || "Activo")
  const [observaciones, setObservaciones] = useState(proveedor?.observaciones || "")
  const [condicionesPago, setCondicionesPago] = useState(proveedor?.condicionesPago || "")
  const [formaPago, setFormaPago] = useState(proveedor?.formaPago || "")

  // Opciones para los selects
  const tiposProveedor = ["Materia Prima", "Maquinaria", "Repuestos", "Servicios"]
  const estadosProveedor = ["Activo", "Inactivo"]
  const formasPago = ["Transferencia", "Cheque", "Efectivo"]

  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Aquí iría la lógica para guardar el proveedor
      // Por ahora, simulamos un tiempo de espera
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: proveedor ? "Proveedor actualizado" : "Proveedor creado",
        description: proveedor
          ? "Los datos del proveedor han sido actualizados correctamente."
          : "El nuevo proveedor ha sido creado correctamente.",
      })

      // Redirigir a la lista de proveedores
      router.push("/proveedores")
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Ha ocurrido un error al guardar el proveedor.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardContent className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre / Razón Social *</Label>
              <Input id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nit">NIT / Identificación Tributaria *</Label>
              <Input id="nit" value={nit} onChange={(e) => setNit(e.target.value)} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo de Proveedor *</Label>
              <Select value={tipo} onValueChange={setTipo} required>
                <SelectTrigger id="tipo">
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  {tiposProveedor.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="estado">Estado *</Label>
              <Select value={estado} onValueChange={setEstado} required>
                <SelectTrigger id="estado">
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  {estadosProveedor.map((e) => (
                    <SelectItem key={e} value={e}>
                      {e}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="direccion">Dirección *</Label>
              <Input id="direccion" value={direccion} onChange={(e) => setDireccion(e.target.value)} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ciudad">Ciudad *</Label>
              <Input id="ciudad" value={ciudad} onChange={(e) => setCiudad(e.target.value)} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="departamento">Departamento *</Label>
              <Input
                id="departamento"
                value={departamento}
                onChange={(e) => setDepartamento(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pais">País *</Label>
              <Input id="pais" value={pais} onChange={(e) => setPais(e.target.value)} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="celular">Celular *</Label>
              <Input id="celular" value={celular} onChange={(e) => setCelular(e.target.value)} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="condicionesPago">Condiciones de Pago *</Label>
              <Input
                id="condicionesPago"
                value={condicionesPago}
                onChange={(e) => setCondicionesPago(e.target.value)}
                placeholder="Ej: 30 días"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="formaPago">Forma de Pago Preferida *</Label>
              <Select value={formaPago} onValueChange={setFormaPago} required>
                <SelectTrigger id="formaPago">
                  <SelectValue placeholder="Seleccionar forma de pago" />
                </SelectTrigger>
                <SelectContent>
                  {formasPago.map((fp) => (
                    <SelectItem key={fp} value={fp}>
                      {fp}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="observaciones">Observaciones</Label>
              <Textarea
                id="observaciones"
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
                rows={4}
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => router.back()} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Guardando..." : proveedor ? "Actualizar" : "Crear"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
