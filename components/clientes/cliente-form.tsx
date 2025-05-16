"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import type { Cliente } from "@/lib/types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Esquema de validación para direcciones
const direccionSchema = z.object({
  id: z.number().optional(),
  direccion: z.string().min(5, {
    message: "La dirección debe tener al menos 5 caracteres.",
  }),
  ciudad: z.string().min(2, {
    message: "La ciudad debe tener al menos 2 caracteres.",
  }),
  telefono: z.string().min(7, {
    message: "El teléfono debe tener al menos 7 caracteres.",
  }),
  esPrincipal: z.boolean().default(false),
})

// Esquema de validación para el formulario de cliente
const clienteFormSchema = z.object({
  nit: z.string().min(5, {
    message: "El NIT debe tener al menos 5 caracteres.",
  }),
  nombre: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  ciudad: z.string().min(2, {
    message: "La ciudad debe tener al menos 2 caracteres.",
  }),
  telefono: z.string().min(7, {
    message: "El teléfono debe tener al menos 7 caracteres.",
  }),
  modoPago: z.enum(["Contado", "Crédito", "Otro"], {
    required_error: "El modo de pago es requerido.",
  }),
  comercialId: z.string({
    required_error: "El comercial es requerido.",
  }),
  email: z
    .string()
    .email({
      message: "Ingrese un correo electrónico válido.",
    })
    .optional()
    .or(z.literal("")),
  contactoPrincipal: z
    .object({
      nombre: z.string().min(2, {
        message: "El nombre debe tener al menos 2 caracteres.",
      }),
      telefono: z.string().min(7, {
        message: "El teléfono debe tener al menos 7 caracteres.",
      }),
    })
    .optional()
    .nullable(),
  observaciones: z.string().optional(),
  direcciones: z.array(direccionSchema).min(1, {
    message: "Debe agregar al menos una dirección.",
  }),
})

type ClienteFormValues = z.infer<typeof clienteFormSchema>

interface ClienteFormProps {
  cliente?: Cliente
  isEditing?: boolean
}

export default function ClienteForm({ cliente, isEditing = false }: ClienteFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Valores por defecto para el formulario
  const defaultValues: Partial<ClienteFormValues> = {
    nit: cliente?.nit || "",
    nombre: cliente?.nombre || "",
    ciudad: cliente?.ciudad || "",
    telefono: cliente?.telefono || "",
    modoPago: cliente?.modoPago || "Contado",
    comercialId: cliente?.comercialId || "",
    email: cliente?.email || "",
    contactoPrincipal: cliente?.contactoPrincipal || null,
    observaciones: cliente?.observaciones || "",
    direcciones: cliente?.direcciones || [
      {
        id: 1,
        direccion: "",
        ciudad: "",
        telefono: "",
        esPrincipal: true,
      },
    ],
  }

  const form = useForm<ClienteFormValues>({
    resolver: zodResolver(clienteFormSchema),
    defaultValues,
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "direcciones",
  })

  const handleAddDireccion = () => {
    append({
      id: Date.now(),
      direccion: "",
      ciudad: "",
      telefono: "",
      esPrincipal: false,
    })
  }

  const handleSetPrincipal = (index: number) => {
    const direcciones = form.getValues("direcciones")
    const updatedDirecciones = direcciones.map((dir, i) => ({
      ...dir,
      esPrincipal: i === index,
    }))
    form.setValue("direcciones", updatedDirecciones)
  }

  async function onSubmit(data: ClienteFormValues) {
    setIsSubmitting(true)

    try {
      // Aquí iría la lógica para guardar los datos en la base de datos
      console.log(data)

      // Simulamos una petición a la API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Redirigimos a la lista de clientes
      router.push("/clientes")
      router.refresh()
    } catch (error) {
      console.error("Error al guardar el cliente:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="w-full grid grid-cols-2 mb-6">
            <TabsTrigger value="general">Información General</TabsTrigger>
            <TabsTrigger value="direcciones">Direcciones</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6 mt-0">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="nit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NIT o Cédula Jurídica *</FormLabel>
                    <FormControl>
                      <Input placeholder="900.123.456-7" {...field} disabled={isEditing} />
                    </FormControl>
                    {isEditing && <FormDescription>El NIT no se puede modificar.</FormDescription>}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre o Razón Social *</FormLabel>
                    <FormControl>
                      <Input placeholder="Industrias Plásticas S.A." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="ciudad"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ciudad *</FormLabel>
                    <FormControl>
                      <Input placeholder="Bogotá" {...field} />
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
                    <FormLabel>Teléfono o Celular *</FormLabel>
                    <FormControl>
                      <Input placeholder="601-123-4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="modoPago"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Modo de Pago *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione un modo de pago" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Contado">Contado</SelectItem>
                      <SelectItem value="Crédito">Crédito</SelectItem>
                      <SelectItem value="Otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="comercialId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comercial Asignado *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione un comercial" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Juan Pérez</SelectItem>
                      <SelectItem value="2">María Rodríguez</SelectItem>
                      <SelectItem value="3">Carlos Gómez</SelectItem>
                      <SelectItem value="4">Laura Martínez</SelectItem>
                      <SelectItem value="5">Roberto Sánchez</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

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

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Contacto Principal</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="contactoPrincipal.nombre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre del Contacto</FormLabel>
                      <FormControl>
                        <Input placeholder="Fernando Ruiz" {...field} value={field.value || ""} />
                      </FormControl>
                      <FormDescription>Campo opcional.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contactoPrincipal.telefono"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teléfono del Contacto</FormLabel>
                      <FormControl>
                        <Input placeholder="315-123-4567" {...field} value={field.value || ""} />
                      </FormControl>
                      <FormDescription>Campo opcional.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="observaciones"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observaciones</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Información adicional sobre el cliente..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Campo opcional.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>

          <TabsContent value="direcciones" className="space-y-6 mt-0">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Direcciones</h3>
              <Button type="button" variant="outline" size="sm" onClick={handleAddDireccion}>
                <Plus className="mr-2 h-4 w-4" />
                Añadir Dirección
              </Button>
            </div>

            <FormField
              control={form.control}
              name="direcciones"
              render={() => (
                <FormItem>
                  <div className="space-y-4">
                    {fields.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No hay direcciones añadidas.</p>
                    ) : (
                      fields.map((field, index) => (
                        <Card key={field.id} className={cn("relative overflow-hidden")}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="font-medium">Dirección {index + 1}</h4>
                              <div className="flex items-center gap-2">
                                {form.getValues(`direcciones.${index}.esPrincipal`) ? (
                                  <Badge className="bg-primary">Principal</Badge>
                                ) : (
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleSetPrincipal(index)}
                                  >
                                    Establecer como Principal
                                  </Button>
                                )}
                                {fields.length > 1 && (
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-500 hover:text-red-700 hover:bg-red-100"
                                    onClick={() => remove(index)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                              <FormField
                                control={form.control}
                                name={`direcciones.${index}.direccion`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Dirección Completa *</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Calle 80 # 45-23, Zona Industrial" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name={`direcciones.${index}.ciudad`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Ciudad *</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Bogotá" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name={`direcciones.${index}.telefono`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Teléfono de Contacto *</FormLabel>
                                    <FormControl>
                                      <Input placeholder="601-123-4567" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-4 pt-6 mt-6 border-t">
          <Button type="button" variant="outline" onClick={() => router.back()} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEditing ? "Actualizar Cliente" : "Crear Cliente"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
