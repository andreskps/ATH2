"use client"

import { createPermiso, getModulos, getPermisoById, updatePermiso } from "@/lib/data/roles"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { toast } from "@/components/ui/use-toast"
import  BackButton  from "@/components/ui/back-button"

const formSchema = z.object({
  nombre: z.string().min(3, {
    message: "El nombre debe tener al menos 3 caracteres.",
  }),
  descripcion: z.string().min(5, {
    message: "La descripción debe tener al menos 5 caracteres.",
  }),
  modulo: z.string().min(1, {
    message: "Debes seleccionar un módulo.",
  }),
  accion: z.enum(["ver", "crear", "editar", "eliminar", "exportar"], {
    required_error: "Debes seleccionar una acción.",
  }),
})

interface PermisoFormProps {
  permisoId?: string
}

export default function PermisoForm({ permisoId }: PermisoFormProps) {
  const router = useRouter()
  const modulos = getModulos()
  const isEditing = !!permisoId

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      descripcion: "",
      modulo: "",
      accion: "ver",
    },
  })

  useEffect(() => {
    if (isEditing) {
      const permiso = getPermisoById(permisoId)
      if (permiso) {
        form.reset({
          nombre: permiso.nombre,
          descripcion: permiso.descripcion,
          modulo: permiso.modulo,
          accion: permiso.accion,
        })
      } else {
        toast({
          title: "Error",
          description: "No se encontró el permiso especificado.",
          variant: "destructive",
        })
        router.push("/admin/permisos")
      }
    }
  }, [permisoId, isEditing, form, router])

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (isEditing) {
        updatePermiso(permisoId, values)
        toast({
          title: "Permiso actualizado",
          description: "El permiso ha sido actualizado correctamente.",
        })
      } else {
        createPermiso(values)
        toast({
          title: "Permiso creado",
          description: "El nuevo permiso ha sido creado correctamente.",
        })
      }
      router.push("/admin/permisos")
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Ocurrió un error al guardar el permiso.",
        variant: "destructive",
      })
    }
  }

  // Actualizar automáticamente el nombre basado en módulo y acción
  const watchModulo = form.watch("modulo")
  const watchAccion = form.watch("accion")

  useEffect(() => {
    if (watchModulo && watchAccion && !isEditing) {
      const nombreSugerido = `${watchAccion.charAt(0).toUpperCase() + watchAccion.slice(1)} ${watchModulo}`
      form.setValue("nombre", nombreSugerido)

      const descripcionSugerida = `Permite ${watchAccion} ${watchModulo}`
      form.setValue("descripcion", descripcionSugerida)
    }
  }, [watchModulo, watchAccion, form, isEditing])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{isEditing ? "Editar Permiso" : "Nuevo Permiso"}</h1>
          <p className="text-muted-foreground">
            {isEditing ? "Actualiza la información del permiso existente" : "Crea un nuevo permiso en el sistema"}
          </p>
        </div>
        <BackButton href="/admin/permisos" />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="modulo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Módulo</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un módulo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {modulos.map((modulo) => (
                        <SelectItem key={modulo} value={modulo}>
                          {modulo.charAt(0).toUpperCase() + modulo.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>El módulo al que pertenece este permiso.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="accion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Acción</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una acción" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ver">Ver</SelectItem>
                      <SelectItem value="crear">Crear</SelectItem>
                      <SelectItem value="editar">Editar</SelectItem>
                      <SelectItem value="eliminar">Eliminar</SelectItem>
                      <SelectItem value="exportar">Exportar</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>La acción que permite realizar este permiso.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="nombre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre del permiso" {...field} />
                </FormControl>
                <FormDescription>Nombre descriptivo para el permiso.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="descripcion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Textarea placeholder="Descripción detallada del permiso" className="resize-none" {...field} />
                </FormControl>
                <FormDescription>Explica brevemente qué permite hacer este permiso.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.push("/admin/permisos")}>
              Cancelar
            </Button>
            <Button type="submit">{isEditing ? "Actualizar Permiso" : "Crear Permiso"}</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
