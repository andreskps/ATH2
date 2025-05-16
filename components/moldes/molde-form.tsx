"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/hooks/use-toast"
import type { Molde } from "@/lib/types"
import { checkReferenciaExists, createMolde, updateMolde } from "@/lib/data/moldes"
import { getMaquinas } from "@/lib/data/maquinaria"

const formSchema = z.object({
  referencia: z.string().min(1, { message: "La referencia es requerida" }),
  nombre: z.string().min(1, { message: "El nombre es requerido" }),
  fabricante: z.string().min(1, { message: "El fabricante es requerido" }),
  material: z.string().min(1, { message: "El material es requerido" }),
  cavidades: z.coerce.number().min(1, { message: "Debe tener al menos 1 cavidad" }),
  tipoInyeccion: z.string().min(1, { message: "El tipo de inyección es requerido" }),
  fechaFabricacion: z.string().optional(),
  fechaAdquisicion: z.string().optional(),
  vidaUtil: z.coerce.number().optional(),
  ciclosActuales: z.coerce.number().optional(),
  estado: z.string().min(1, { message: "El estado es requerido" }),
  ubicacion: z.string().optional(),
  descripcion: z.string().optional(),
  notas: z.string().optional(),
  largo: z.coerce.number().optional(),
  ancho: z.coerce.number().optional(),
  alto: z.coerce.number().optional(),
  peso: z.coerce.number().optional(),
  requiereMantenimiento: z.boolean().default(false),
  area: z.string().min(1, { message: "El área es requerida" }),
  maquinasCompatibles: z.array(z.string()).min(1, { message: "Seleccione al menos una máquina compatible" }),
})

type FormValues = z.infer<typeof formSchema>

interface MoldeFormProps {
  molde?: Molde
}

export default function MoldeForm({ molde }: MoldeFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [maquinasDisponibles, setMaquinasDisponibles] = useState<Array<{ id: string; nombre: string }>>([])

  // Cargar las máquinas disponibles
  useEffect(() => {
    const cargarMaquinas = async () => {
      try {
        const maquinas = await getMaquinas()
        setMaquinasDisponibles(maquinas.map((m) => ({ id: m.id, nombre: m.nombre })))
      } catch (error) {
        console.error("Error al cargar las máquinas:", error)
        toast({
          title: "Error",
          description: "No se pudieron cargar las máquinas disponibles.",
          variant: "destructive",
        })
      }
    }

    cargarMaquinas()
  }, [])

  const defaultValues: Partial<FormValues> = molde
    ? {
        referencia: molde.referencia,
        nombre: molde.nombre,
        fabricante: molde.fabricante,
        material: molde.material,
        cavidades: molde.cavidades,
        tipoInyeccion: molde.tipoInyeccion,
        fechaFabricacion: molde.fechaFabricacion,
        fechaAdquisicion: molde.fechaAdquisicion,
        vidaUtil: molde.vidaUtil,
        ciclosActuales: molde.ciclosActuales,
        estado: molde.estado,
        ubicacion: molde.ubicacion,
        descripcion: molde.descripcion,
        notas: molde.notas,
        largo: molde.largo,
        ancho: molde.ancho,
        alto: molde.alto,
        peso: molde.peso,
        requiereMantenimiento: molde.requiereMantenimiento,
        area: molde.area || "",
        maquinasCompatibles: molde.maquinasCompatibles?.map((id) => id.toString()) || [],
      }
    : {
        estado: "Activo",
        requiereMantenimiento: false,
        maquinasCompatibles: [],
      }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true)

    try {
      // Verificar si la referencia ya existe (solo para nuevos moldes)
      if (!molde && (await checkReferenciaExists(data.referencia))) {
        form.setError("referencia", {
          type: "manual",
          message: "Esta referencia ya está en uso",
        })
        setIsSubmitting(false)
        return
      }

      if (molde) {
        // Actualizar molde existente
        await updateMolde(molde.id, data)
        toast({
          title: "Molde actualizado",
          description: `El molde ${data.nombre} ha sido actualizado correctamente.`,
        })
      } else {
        // Crear nuevo molde
        const newMolde = await createMolde(data)
        toast({
          title: "Molde creado",
          description: `El molde ${data.nombre} ha sido creado correctamente.`,
        })
      }

      // Redireccionar a la lista de moldes
      router.push("/moldes")
      router.refresh()
    } catch (error) {
      console.error("Error al guardar el molde:", error)
      toast({
        title: "Error",
        description: "Ha ocurrido un error al guardar el molde. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">Información General</TabsTrigger>
            <TabsTrigger value="especificaciones">Especificaciones</TabsTrigger>
            <TabsTrigger value="adicional">Información Adicional</TabsTrigger>
            <TabsTrigger value="maquinas">Máquinas Compatibles</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4 mt-4">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="referencia"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Referencia</FormLabel>
                        <FormControl>
                          <Input placeholder="REF-001" {...field} />
                        </FormControl>
                        <FormDescription>Código único de referencia del molde</FormDescription>
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
                          <Input placeholder="Molde para botellas 500ml" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="fabricante"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fabricante</FormLabel>
                        <FormControl>
                          <Input placeholder="Fabricante del molde" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="material"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Material</FormLabel>
                        <FormControl>
                          <Input placeholder="Acero P20" {...field} />
                        </FormControl>
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
                              <SelectValue placeholder="Selecciona un estado" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Activo">Activo</SelectItem>
                            <SelectItem value="En mantenimiento">En mantenimiento</SelectItem>
                            <SelectItem value="Inactivo">Inactivo</SelectItem>
                            <SelectItem value="Dañado">Dañado</SelectItem>
                          </SelectContent>
                        </Select>
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
                          <Input placeholder="Estantería A-12" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="area"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Área</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona un área" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Inyección PET">Inyección PET</SelectItem>
                            <SelectItem value="Inyección HDPE">Inyección HDPE</SelectItem>
                            <SelectItem value="Tapas y Cierres">Tapas y Cierres</SelectItem>
                            <SelectItem value="Contenedores">Contenedores</SelectItem>
                            <SelectItem value="Cosméticos">Cosméticos</SelectItem>
                            <SelectItem value="Otros">Otros</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="especificaciones" className="space-y-4 mt-4">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="cavidades"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número de Cavidades</FormLabel>
                        <FormControl>
                          <Input type="number" min="1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tipoInyeccion"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de Inyección</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona un tipo" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Convencional">Convencional</SelectItem>
                            <SelectItem value="Cámara caliente">Cámara caliente</SelectItem>
                            <SelectItem value="Colada fría">Colada fría</SelectItem>
                            <SelectItem value="Bi-inyección">Bi-inyección</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="fechaFabricacion"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fecha de Fabricación</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="fechaAdquisicion"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fecha de Adquisición</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="vidaUtil"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vida Útil (ciclos)</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="ciclosActuales"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ciclos Actuales</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="adicional" className="space-y-4 mt-4">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <FormField
                      control={form.control}
                      name="descripcion"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Descripción</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Descripción detallada del molde"
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="largo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Largo (mm)</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="ancho"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ancho (mm)</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="alto"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Alto (mm)</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="peso"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Peso (kg)</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" step="0.01" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <FormField
                      control={form.control}
                      name="notas"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Notas Adicionales</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Notas adicionales sobre el molde"
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="requiereMantenimiento"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Requiere Mantenimiento</FormLabel>
                          <FormDescription>Marcar si el molde necesita mantenimiento próximamente</FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="maquinas" className="space-y-4 mt-4">
            <Card>
              <CardContent className="pt-6">
                <FormField
                  control={form.control}
                  name="maquinasCompatibles"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Máquinas Compatibles</FormLabel>
                      <FormDescription>Selecciona las máquinas que son compatibles con este molde</FormDescription>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                        {maquinasDisponibles.map((maquina) => (
                          <FormItem
                            key={maquina.id}
                            className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(maquina.id)}
                                onCheckedChange={(checked) => {
                                  const updatedValue = checked
                                    ? [...field.value, maquina.id]
                                    : field.value?.filter((id) => id !== maquina.id)
                                  field.onChange(updatedValue)
                                }}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="text-sm font-medium">{maquina.nombre}</FormLabel>
                            </div>
                          </FormItem>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Guardando..." : molde ? "Actualizar Molde" : "Crear Molde"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
