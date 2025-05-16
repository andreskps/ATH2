"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import type { Empleado } from "@/lib/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Esquema de validación para el formulario
const empleadoFormSchema = z.object({
  nombre: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  apellidos: z.string().min(2, {
    message: "Los apellidos deben tener al menos 2 caracteres.",
  }),
  cedula: z.string().min(5, {
    message: "La cédula debe tener al menos 5 caracteres.",
  }),
  fechaNacimiento: z.date({
    required_error: "La fecha de nacimiento es requerida.",
  }),
  cargo: z.string({
    required_error: "El cargo es requerido.",
  }),
  estado: z.string({
    required_error: "El estado es requerido.",
  }),
  celular: z.string().min(7, {
    message: "El número de celular debe tener al menos 7 caracteres.",
  }),
  direccion: z.string().min(5, {
    message: "La dirección debe tener al menos 5 caracteres.",
  }),
  email: z
    .string()
    .email({
      message: "Ingrese un correo electrónico válido.",
    })
    .optional()
    .or(z.literal("")),
  telefono: z.string().optional(),
  foto: z.string().optional(),
  turno: z.string().optional(),
  tipoContrato: z.string().optional(),
})

type EmpleadoFormValues = z.infer<typeof empleadoFormSchema>

interface EmpleadoFormProps {
  empleado?: Empleado
  isEditing?: boolean
}

export default function EmpleadoForm({ empleado, isEditing = false }: EmpleadoFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Valores por defecto para el formulario
  const defaultValues: Partial<EmpleadoFormValues> = {
    nombre: empleado?.nombre || "",
    apellidos: empleado?.apellidos || "",
    cedula: empleado?.cedula || "",
    fechaNacimiento: empleado?.fechaNacimiento ? new Date(empleado.fechaNacimiento) : undefined,
    cargo: empleado?.cargo || "",
    estado: empleado?.estado || "Activo",
    celular: empleado?.celular || "",
    direccion: empleado?.direccion || "",
    email: empleado?.email || "",
    telefono: empleado?.telefono || "",
    foto: empleado?.foto || "",
    turno: empleado?.turno || "",
    tipoContrato: empleado?.tipoContrato || "",
  }

  const form = useForm<EmpleadoFormValues>({
    resolver: zodResolver(empleadoFormSchema),
    defaultValues,
  })

  async function onSubmit(data: EmpleadoFormValues) {
    setIsSubmitting(true)

    try {
      // Aquí iría la lógica para guardar los datos en la base de datos
      console.log(data)

      // Simulamos una petición a la API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Redirigimos a la lista de empleados
      router.push("/empleados")
      router.refresh()
    } catch (error) {
      console.error("Error al guardar el empleado:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Tabs defaultValue="personal" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="personal">Datos Personales</TabsTrigger>
        <TabsTrigger value="laboral">Información Laboral</TabsTrigger>
      </TabsList>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <TabsContent value="personal" className="space-y-6 pt-4">
            <div className="flex flex-col items-center justify-center space-y-4 sm:items-start sm:justify-start">
              <Avatar className="h-24 w-24">
                <AvatarImage src={form.watch("foto") || "/placeholder.svg"} alt="Foto de perfil" />
                <AvatarFallback>
                  {form.watch("nombre") && form.watch("apellidos")
                    ? `${form.watch("nombre").charAt(0)}${form.watch("apellidos").charAt(0)}`
                    : "FP"}
                </AvatarFallback>
              </Avatar>
              <FormField
                control={form.control}
                name="foto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Foto de Perfil (URL)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://ejemplo.com/foto.jpg" {...field} />
                    </FormControl>
                    <FormDescription>Ingrese la URL de la foto de perfil (opcional).</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre(s) *</FormLabel>
                    <FormControl>
                      <Input placeholder="Juan Carlos" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="apellidos"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellidos *</FormLabel>
                    <FormControl>
                      <Input placeholder="Pérez Gómez" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="cedula"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cédula *</FormLabel>
                    <FormControl>
                      <Input placeholder="12345678" {...field} disabled={isEditing} />
                    </FormControl>
                    {isEditing && <FormDescription>La cédula no se puede modificar.</FormDescription>}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fechaNacimiento"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Fecha de Nacimiento *</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                          >
                            {field.value ? (
                              format(field.value, "dd/MM/yyyy", { locale: es })
                            ) : (
                              <span>Seleccione una fecha</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date() || date < new Date("1940-01-01")}
                          initialFocus
                          locale={es}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="celular"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Celular *</FormLabel>
                    <FormControl>
                      <Input placeholder="3001234567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="telefono"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl>
                      <Input placeholder="6011234567" {...field} />
                    </FormControl>
                    <FormDescription>Campo opcional.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo Electrónico</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="ejemplo@correo.com" {...field} />
                  </FormControl>
                  <FormDescription>Campo opcional. Si se proporciona, debe ser un correo válido.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="direccion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dirección *</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Calle 123 # 45-67, Barrio, Ciudad" className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>

          <TabsContent value="laboral" className="space-y-6 pt-4">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="cargo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cargo *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione un cargo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Operador de Máquina">Operador de Máquina</SelectItem>
                        <SelectItem value="Supervisor de Calidad">Supervisor de Calidad</SelectItem>
                        <SelectItem value="Técnico de Mantenimiento">Técnico de Mantenimiento</SelectItem>
                        <SelectItem value="Gerente de Ventas">Gerente de Ventas</SelectItem>
                        <SelectItem value="Administrativo">Administrativo</SelectItem>
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
                    <FormLabel>Estado *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione un estado" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Activo">Activo</SelectItem>
                        <SelectItem value="Inactivo">Inactivo</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="turno"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Turno Asignado</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione un turno (opcional)" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ninguno">Sin turno asignado</SelectItem>
                        <SelectItem value="Mañana">Mañana</SelectItem>
                        <SelectItem value="Tarde">Tarde</SelectItem>
                        <SelectItem value="Noche">Noche</SelectItem>
                        <SelectItem value="Rotativo">Rotativo</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Campo opcional.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tipoContrato"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Contrato</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione un tipo de contrato (opcional)" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ninguno">Sin especificar</SelectItem>
                        <SelectItem value="Indefinido">Indefinido</SelectItem>
                        <SelectItem value="Temporal">Temporal</SelectItem>
                        <SelectItem value="Prácticas">Prácticas</SelectItem>
                        <SelectItem value="Servicios">Servicios</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Campo opcional.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>

          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={() => router.back()} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEditing ? "Actualizar Empleado" : "Crear Empleado"}
            </Button>
          </div>
        </form>
      </Form>
    </Tabs>
  )
}
