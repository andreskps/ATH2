"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { getEventosMantenimientoByMaquinaId, type EventoMantenimiento } from "@/lib/data/maquinaria"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

interface MaquinaHistorialMantenimientoProps {
  maquinaId: string
}

export default function MaquinaHistorialMantenimiento({ maquinaId }: MaquinaHistorialMantenimientoProps) {
  const [eventos, setEventos] = useState<EventoMantenimiento[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const data = await getEventosMantenimientoByMaquinaId(maquinaId)
        setEventos(data)
      } catch (error) {
        console.error("Error al cargar eventos de mantenimiento:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchEventos()
  }, [maquinaId])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Historial de Mantenimiento</CardTitle>
          <CardDescription>Registro de mantenimientos preventivos y correctivos</CardDescription>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Mantenimiento
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Registrar Nuevo Mantenimiento</DialogTitle>
              <DialogDescription>
                Ingrese los detalles del mantenimiento realizado o programado para esta máquina.
              </DialogDescription>
            </DialogHeader>
            <MantenimientoForm
              maquinaId={maquinaId}
              onSuccess={() => {
                // Recargar los eventos después de guardar
                getEventosMantenimientoByMaquinaId(maquinaId).then(setEventos)
              }}
            />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex flex-col gap-2 p-4 border rounded-md">
                <Skeleton className="h-5 w-1/3" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        ) : eventos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <p className="text-muted-foreground mb-4">No hay registros de mantenimiento para esta máquina.</p>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Registrar Primer Mantenimiento
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Registrar Primer Mantenimiento</DialogTitle>
                  <DialogDescription>
                    Ingrese los detalles del primer mantenimiento para esta máquina.
                  </DialogDescription>
                </DialogHeader>
                <MantenimientoForm
                  maquinaId={maquinaId}
                  onSuccess={() => {
                    // Recargar los eventos después de guardar
                    getEventosMantenimientoByMaquinaId(maquinaId).then(setEventos)
                  }}
                />
              </DialogContent>
            </Dialog>
          </div>
        ) : (
          <div className="space-y-4">
            {eventos.map((evento) => (
              <div key={evento.id} className="border rounded-md p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        evento.tipo === "Preventivo" ? "bg-blue-100 text-blue-800" : "bg-orange-100 text-orange-800"
                      }`}
                    >
                      {evento.tipo}
                    </div>
                    <div
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        evento.estado === "Completado"
                          ? "bg-green-100 text-green-800"
                          : evento.estado === "En Proceso"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {evento.estado}
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">{new Date(evento.fecha).toLocaleDateString()}</span>
                </div>
                <h4 className="font-medium">{evento.descripcion}</h4>
                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Responsable: </span>
                    {evento.responsable}
                  </div>
                  {evento.tiempoFuera && (
                    <div>
                      <span className="text-muted-foreground">Tiempo fuera: </span>
                      {evento.tiempoFuera} horas
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Esquema de validación para el formulario de mantenimiento
const formSchema = z.object({
  fecha: z.date({
    required_error: "La fecha es requerida",
  }),
  tipo: z.string({
    required_error: "El tipo de mantenimiento es requerido",
  }),
  descripcion: z.string().min(5, "La descripción debe tener al menos 5 caracteres"),
  tiempoFuera: z.string().optional(),
  responsable: z.string().min(3, "El responsable es requerido"),
  estado: z.string({
    required_error: "El estado es requerido",
  }),
})

type FormValues = z.infer<typeof formSchema>

interface MantenimientoFormProps {
  maquinaId: string
  onSuccess?: () => void
}

function MantenimientoForm({ maquinaId, onSuccess }: MantenimientoFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fecha: new Date(),
      tipo: "Preventivo",
      descripcion: "",
      tiempoFuera: "",
      responsable: "",
      estado: "Programado",
    },
  })

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)
    try {
      // Simular guardado en base de datos
      console.log("Guardando mantenimiento:", { ...data, maquinaId })

      // Esperar un momento para simular la operación
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Notificar éxito
      alert("Mantenimiento registrado correctamente")

      // Resetear formulario
      form.reset()

      // Llamar callback de éxito si existe
      if (onSuccess) onSuccess()
    } catch (error) {
      console.error("Error al guardar:", error)
      alert("Error al guardar el mantenimiento")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="fecha"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Fecha</FormLabel>
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
                  <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="tipo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Preventivo">Preventivo</SelectItem>
                    <SelectItem value="Correctivo">Correctivo</SelectItem>
                  </SelectContent>
                </Select>
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
                    <SelectItem value="Programado">Programado</SelectItem>
                    <SelectItem value="En Proceso">En Proceso</SelectItem>
                    <SelectItem value="Completado">Completado</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="descripcion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describa las tareas realizadas o a realizar"
                  className="min-h-[80px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="responsable"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Responsable</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre del técnico" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tiempoFuera"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tiempo Fuera (horas)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Ej. 8" {...field} />
                </FormControl>
                <FormDescription>Tiempo estimado fuera de servicio</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <DialogFooter>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Guardando..." : "Guardar"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
