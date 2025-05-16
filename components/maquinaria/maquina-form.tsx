"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Maquina } from "@/lib/data/maquinaria"

// Esquema de validación
const formSchema = z.object({
  codigo: z.string().min(1, "El código es requerido"),
  nombre: z.string().min(1, "El nombre es requerido"),
  modelo: z.string().min(1, "El modelo es requerido"),
  marca: z.string().min(1, "La marca es requerida"),
  tipo: z.string().min(1, "El tipo es requerido"),
  fechaAdquisicion: z.date({
    required_error: "La fecha de adquisición es requerida",
  }),
  ubicacion: z.string().min(1, "La ubicación es requerida"),
  estado: z.string().min(1, "El estado es requerido"),
  capacidad: z.string().min(1, "La capacidad es requerida"),
  tonelaje: z.string().optional(),
  ciclosPorMinuto: z.string().optional(),
  observaciones: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

interface MaquinaFormProps {
  maquina?: Maquina
}

export default function MaquinaForm({ maquina }: MaquinaFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Valores por defecto del formulario
  const defaultValues: Partial<FormValues> = {
    codigo: maquina?.codigo || "",
    nombre: maquina?.nombre || "",
    modelo: maquina?.modelo || "",
    marca: maquina?.marca || "",
    tipo: maquina?.tipo || "",
    fechaAdquisicion: maquina?.fechaAdquisicion ? new Date(maquina.fechaAdquisicion) : undefined,
    ubicacion: maquina?.ubicacion || "",
    estado: maquina?.estado || "",
    capacidad: maquina?.capacidad || "",
    tonelaje: maquina?.tonelaje?.toString() || "",
    ciclosPorMinuto: maquina?.ciclosPorMinuto?.toString() || "",
    observaciones: maquina?.observaciones || "",
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)
    try {
      // Aquí iría la lógica para guardar la máquina
      console.log("Datos del formulario:", data)

      // Simular una operación de guardado
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirigir a la página de maquinaria
      router.push("/maquinaria")
    } catch (error) {
      console.error("Error al guardar la máquina:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="codigo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Código</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej. INY-001" {...field} />
                    </FormControl>
                    <FormDescription>Código único de identificación de la máquina</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej. Inyectora Hidráulica Principal" {...field} />
                    </FormControl>
                    <FormDescription>Nombre descriptivo de la máquina</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="modelo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Modelo</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej. HT-450" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="marca"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Marca</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej. Haitian" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tipo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Máquina</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Inyección">Inyección</SelectItem>
                        <SelectItem value="Extrusión">Extrusión</SelectItem>
                        <SelectItem value="Soplado">Soplado</SelectItem>
                        <SelectItem value="Termoformado">Termoformado</SelectItem>
                        <SelectItem value="Otro">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fechaAdquisicion"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Fecha de Adquisición</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                          >
                            {field.value ? format(field.value, "PPP", { locale: es }) : <span>Seleccionar fecha</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ubicacion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ubicación</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej. Área A - Inyección" {...field} />
                    </FormControl>
                    <FormDescription>Área o zona donde se encuentra la máquina</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="estado"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar estado" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Activa">Activa</SelectItem>
                        <SelectItem value="En Mantenimiento">En Mantenimiento</SelectItem>
                        <SelectItem value="Inactiva">Inactiva</SelectItem>
                        <SelectItem value="Fuera de Servicio">Fuera de Servicio</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="capacidad"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Capacidad</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej. 450 toneladas" {...field} />
                    </FormControl>
                    <FormDescription>Capacidad operativa de la máquina</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tonelaje"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tonelaje (opcional)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Ej. 450" {...field} />
                    </FormControl>
                    <FormDescription>Tonelaje de la máquina (si aplica)</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ciclosPorMinuto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ciclos por Minuto (opcional)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Ej. 4" {...field} />
                    </FormControl>
                    <FormDescription>Velocidad de ciclos por minuto (si aplica)</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="observaciones"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observaciones (opcional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ingrese observaciones técnicas o notas importantes sobre la máquina"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => router.back()} disabled={isSubmitting}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Guardando..." : maquina ? "Actualizar" : "Guardar"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
