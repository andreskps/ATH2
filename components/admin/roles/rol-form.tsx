"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { type Rol, getModulos, getPermisosPorModulo, createRol, updateRol } from "@/lib/data/roles"

const formSchema = z.object({
  nombre: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  descripcion: z.string().min(5, {
    message: "La descripción debe tener al menos 5 caracteres.",
  }),
  permisos: z.array(z.string()),
})

interface RolFormProps {
  rol?: Rol
}

export default function RolForm({ rol }: RolFormProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("general")
  const permisosPorModulo = getPermisosPorModulo()
  const modulos = getModulos()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: rol?.nombre || "",
      descripcion: rol?.descripcion || "",
      permisos: rol?.permisos || [],
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (rol) {
      updateRol(rol.id, values)
    } else {
      createRol(values)
    }
    router.push("/admin/roles")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="general">Información General</TabsTrigger>
            <TabsTrigger value="permisos">Permisos</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4 pt-4">
            <Card>
              <CardContent className="pt-6">
                <div className="grid gap-6">
                  <FormField
                    control={form.control}
                    name="nombre"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre del rol</FormLabel>
                        <FormControl>
                          <Input placeholder="Ej: Supervisor de producción" {...field} />
                        </FormControl>
                        <FormDescription>Nombre descriptivo para identificar el rol.</FormDescription>
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
                          <Textarea placeholder="Describe las responsabilidades y alcance de este rol" {...field} />
                        </FormControl>
                        <FormDescription>
                          Breve descripción de las funciones y responsabilidades del rol.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="permisos" className="space-y-4 pt-4">
            {modulos.map((modulo) => (
              <Card key={modulo}>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium capitalize mb-4">{modulo.replace("-", " ")}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {permisosPorModulo[modulo].map((permiso) => (
                      <FormField
                        key={permiso.id}
                        control={form.control}
                        name="permisos"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(permiso.id)}
                                onCheckedChange={(checked) => {
                                  const updatedValue = checked
                                    ? [...field.value, permiso.id]
                                    : field.value?.filter((value) => value !== permiso.id)
                                  field.onChange(updatedValue)
                                }}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="font-normal">{permiso.nombre}</FormLabel>
                              <FormDescription>{permiso.descripcion}</FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.push("/admin/roles")}>
            Cancelar
          </Button>
          <Button type="submit">{rol ? "Guardar cambios" : "Crear rol"}</Button>
        </div>
      </form>
    </Form>
  )
}
