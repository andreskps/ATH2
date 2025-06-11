"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, MapPin, ArrowRight } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import type { TurnoWizardData } from "./turno-wizard"

const step1Schema = z.object({
  categoria: z.string().min(1, "Selecciona una categoría"),
  fechaInicio: z.string().min(1, "Selecciona la fecha de inicio"),
  fechaFin: z.string().min(1, "Selecciona la fecha de fin"),
  area: z.string().min(1, "Selecciona un área"),
})

type Step1FormValues = z.infer<typeof step1Schema>

interface TurnoWizardStep1Props {
  data: TurnoWizardData
  updateData: (data: Partial<TurnoWizardData>) => void
  onNext: () => void
}

const categorias = [
  {
    id: "A",
    nombre: "Turno A - Mañana",
    horario: "06:00 - 14:00",
    duracion: 8,
    color: "bg-blue-100 text-blue-800",
  },
  {
    id: "B",
    nombre: "Turno B - Tarde",
    horario: "14:00 - 22:00",
    duracion: 8,
    color: "bg-green-100 text-green-800",
  },
  {
    id: "C",
    nombre: "Turno C - Noche",
    horario: "22:00 - 06:00",
    duracion: 8,
    color: "bg-purple-100 text-purple-800",
  },
]

const areas = ["Inyección", "PET", "Soplado", "Ensamblaje", "Empaque", "Calidad", "Mantenimiento"]

export default function TurnoWizardStep1({ data, updateData, onNext }: TurnoWizardStep1Props) {
  const [selectedCategoria, setSelectedCategoria] = useState<(typeof categorias)[0] | null>(null)
  const [duracionCalculada, setDuracionCalculada] = useState<number>(0)

  const form = useForm<Step1FormValues>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      categoria: data.categoria,
      fechaInicio: data.fechaInicio,
      fechaFin: data.fechaFin,
      area: data.area,
    },
  })

  // Calcular duración cuando cambien las fechas
  useEffect(() => {
    const fechaInicio = form.watch("fechaInicio")
    const fechaFin = form.watch("fechaFin")

    if (fechaInicio && fechaFin) {
      const inicio = new Date(fechaInicio)
      const fin = new Date(fechaFin)
      const diffTime = Math.abs(fin.getTime() - inicio.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
      setDuracionCalculada(diffDays)
    }
  }, [form.watch("fechaInicio"), form.watch("fechaFin")])

  // Actualizar categoría seleccionada
  useEffect(() => {
    const categoria = form.watch("categoria")
    const cat = categorias.find((c) => c.id === categoria)
    setSelectedCategoria(cat || null)
  }, [form.watch("categoria")])

  const onSubmit = (values: Step1FormValues) => {
    const horario = selectedCategoria
      ? {
          inicio: selectedCategoria.horario.split(" - ")[0],
          fin: selectedCategoria.horario.split(" - ")[1],
          duracion: selectedCategoria.duracion,
        }
      : undefined

    updateData({
      ...values,
      horario,
    })
    onNext()
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Información Básica del Turno</h2>
        <p className="text-muted-foreground">Define la categoría, fechas y área donde se realizará el turno</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Categoría de Turno */}
            <FormField
              control={form.control}
              name="categoria"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">Categoría de Turno</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar categoría" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categorias.map((categoria) => (
                        <SelectItem key={categoria.id} value={categoria.id}>
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center space-x-2">
                              <Badge className={categoria.color}>{categoria.id}</Badge>
                              <span>{categoria.nombre}</span>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground ml-4">
                              <Clock className="mr-1 h-3 w-3" />
                              {categoria.horario}
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Área */}
            <FormField
              control={form.control}
              name="area"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">Área de Trabajo</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar área" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {areas.map((area) => (
                        <SelectItem key={area} value={area}>
                          <div className="flex items-center">
                            <MapPin className="mr-2 h-4 w-4" />
                            {area}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Fecha de Inicio */}
            <FormField
              control={form.control}
              name="fechaInicio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">Fecha de Inicio</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Fecha de Fin */}
            <FormField
              control={form.control}
              name="fechaFin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">Fecha de Fin</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Vista Previa */}
          {(selectedCategoria || duracionCalculada > 0) && (
            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Vista Previa del Turno
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {selectedCategoria && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Horario de Trabajo:</span>
                    <Badge className={selectedCategoria.color}>{selectedCategoria.horario}</Badge>
                  </div>
                )}
                {duracionCalculada > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Duración Total:</span>
                    <span className="text-sm">
                      {duracionCalculada} {duracionCalculada === 1 ? "día" : "días"}
                    </span>
                  </div>
                )}
                {selectedCategoria && duracionCalculada > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Horas Totales:</span>
                    <span className="text-sm font-semibold">
                      {selectedCategoria.duracion * duracionCalculada} horas
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Botón Siguiente */}
          <div className="flex justify-end">
            <Button type="submit" size="lg">
              Siguiente
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
