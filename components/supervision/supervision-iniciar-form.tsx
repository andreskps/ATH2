"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface SupervisionIniciarFormProps {
  programacionId: string
}

export default function SupervisionIniciarForm({ programacionId }: SupervisionIniciarFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Aquí se obtendría la información de la programación
  // Simulamos datos para el ejemplo
  const programacion = {
    id: programacionId,
    ordenId: "ORD-2023-006",
    productoId: "3",
    maquinaId: "2",
    cantidadProgramada: 5000,
    fechaProgramada: new Date(),
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulamos el envío del formulario
    setTimeout(() => {
      // Redirigir a la página de supervisión
      router.push("/supervision")
    }, 1500)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Información de la programación</CardTitle>
            <CardDescription>Detalles de la programación a supervisar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label className="text-muted-foreground">Orden</Label>
                <p className="font-medium">{programacion.ordenId}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Producto</Label>
                <p className="font-medium">Producto {programacion.productoId}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Máquina</Label>
                <p className="font-medium">Máquina {programacion.maquinaId}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Cantidad programada</Label>
                <p className="font-medium">{programacion.cantidadProgramada.toLocaleString()} unidades</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Fecha programada</Label>
                <p className="font-medium">{programacion.fechaProgramada.toLocaleDateString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Información de la supervisión</CardTitle>
            <CardDescription>Ingresa los datos para iniciar la supervisión</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="supervisor">Supervisor</Label>
                  <Select required>
                    <SelectTrigger id="supervisor">
                      <SelectValue placeholder="Seleccionar supervisor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Carlos Mendoza">Carlos Mendoza</SelectItem>
                      <SelectItem value="Ana Gómez">Ana Gómez</SelectItem>
                      <SelectItem value="Miguel Torres">Miguel Torres</SelectItem>
                      <SelectItem value="Sofía Ramírez">Sofía Ramírez</SelectItem>
                      <SelectItem value="Javier López">Javier López</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="operador">Operador</Label>
                  <Select required>
                    <SelectTrigger id="operador">
                      <SelectValue placeholder="Seleccionar operador" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Juan Pérez">Juan Pérez</SelectItem>
                      <SelectItem value="Roberto Sánchez">Roberto Sánchez</SelectItem>
                      <SelectItem value="Laura Díaz">Laura Díaz</SelectItem>
                      <SelectItem value="Pedro Martínez">Pedro Martínez</SelectItem>
                      <SelectItem value="María Rodríguez">María Rodríguez</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="observaciones">Observaciones iniciales</Label>
                <Textarea
                  id="observaciones"
                  placeholder="Ingresa cualquier observación relevante para el inicio de la producción"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.back()} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Iniciando..." : "Iniciar supervisión"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </form>
  )
}
