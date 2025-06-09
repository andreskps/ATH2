"use client"

import React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon, Loader2, Eye, EyeOff } from "lucide-react"
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
import { Checkbox } from "@/components/ui/checkbox"
import { getRoles } from "@/lib/data/roles"
import { getUsuarioByEmail } from "@/lib/data/usuarios"

// Esquema de validación para el formulario
const empleadoFormSchema = z
  .object({
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
    // Nuevos campos para tallas
    tallaCamiseta: z.string().optional(),
    tallaPantalon: z.string().optional(),
    tallaCalzado: z.string().optional(),
    tallaChaqueta: z.string().optional(),
    crearAcceso: z.boolean().default(false),
    acceso: z
      .object({
        email: z
          .string()
          .email({
            message: "Ingrese un correo electrónico válido.",
          })
          .optional(),
        password: z
          .string()
          .min(6, {
            message: "La contraseña debe tener al menos 6 caracteres.",
          })
          .optional(),
        rolId: z.string().optional(),
      })
      .optional(),
  })
  .refine(
    (data) => {
      // Si crearAcceso es true, entonces email, password y rolId son requeridos
      if (data.crearAcceso) {
        return !!data.acceso?.email && !!data.acceso?.password && !!data.acceso?.rolId
      }
      return true
    },
    {
      message: "Los campos de email, contraseña y rol son requeridos para crear un acceso al sistema.",
      path: ["acceso"],
    },
  )

type EmpleadoFormValues = z.infer<typeof empleadoFormSchema>

interface EmpleadoFormProps {
  empleado?: Empleado
  isEditing?: boolean
  usuarioExistente?: {
    id: string
    email: string
    rolId: string
  } | null
}

export default function EmpleadoForm({ empleado, isEditing = false, usuarioExistente = null }: EmpleadoFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const roles = getRoles()

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
    // Valores por defecto para tallas
    tallaCamiseta: empleado?.tallaCamiseta || "",
    tallaPantalon: empleado?.tallaPantalon || "",
    tallaCalzado: empleado?.tallaCalzado || "",
    tallaChaqueta: empleado?.tallaChaqueta || "",
    crearAcceso: !!usuarioExistente,
    acceso: usuarioExistente
      ? {
          email: usuarioExistente.email,
          password: "",
          rolId: usuarioExistente.rolId,
        }
      : {
          email: empleado?.email || "",
          password: "",
          rolId: "",
        },
  }

  const form = useForm<EmpleadoFormValues>({
    resolver: zodResolver(empleadoFormSchema),
    defaultValues,
  })

  // Observar el valor del campo email para actualizar el campo de email de acceso
  const watchEmail = form.watch("email")
  const watchCrearAcceso = form.watch("crearAcceso")

  // Actualizar el email de acceso cuando cambia el email del empleado
  React.useEffect(() => {
    if (watchEmail && !usuarioExistente) {
      form.setValue("acceso.email", watchEmail)
    }
  }, [watchEmail, form, usuarioExistente])

  async function onSubmit(data: EmpleadoFormValues) {
    setIsSubmitting(true)

    try {
      // Verificar si el email ya está en uso por otro usuario
      if (data.crearAcceso && data.acceso?.email) {
        const usuarioExistente = getUsuarioByEmail(data.acceso.email)
        if (usuarioExistente && (!isEditing || usuarioExistente.id !== usuarioExistente?.id)) {
          form.setError("acceso.email", {
            type: "manual",
            message: "Este correo electrónico ya está en uso por otro usuario.",
          })
          setIsSubmitting(false)
          return
        }
      }

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
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="personal">Datos Personales</TabsTrigger>
        <TabsTrigger value="laboral">Información Laboral</TabsTrigger>
        <TabsTrigger value="tallas">Tallas</TabsTrigger>
        <TabsTrigger value="acceso">Acceso al Sistema</TabsTrigger>
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

          <TabsContent value="tallas" className="space-y-6 pt-4">
            <div className="rounded-lg border p-6">
              <h3 className="mb-4 text-lg font-medium">Tallas para Dotación</h3>
              <p className="mb-6 text-sm text-muted-foreground">
                Registre las tallas del empleado para la asignación de dotación de uniformes y calzado.
              </p>

              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="tallaCamiseta"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Talla de Camiseta</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione una talla" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Sin especificar">Sin especificar</SelectItem>
                          <SelectItem value="XS">XS</SelectItem>
                          <SelectItem value="S">S</SelectItem>
                          <SelectItem value="M">M</SelectItem>
                          <SelectItem value="L">L</SelectItem>
                          <SelectItem value="XL">XL</SelectItem>
                          <SelectItem value="XXL">XXL</SelectItem>
                          <SelectItem value="XXXL">XXXL</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>Talla para camisetas y camisas.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tallaPantalon"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Talla de Pantalón</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione una talla" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Sin especificar">Sin especificar</SelectItem>
                          <SelectItem value="28">28</SelectItem>
                          <SelectItem value="30">30</SelectItem>
                          <SelectItem value="32">32</SelectItem>
                          <SelectItem value="34">34</SelectItem>
                          <SelectItem value="36">36</SelectItem>
                          <SelectItem value="38">38</SelectItem>
                          <SelectItem value="40">40</SelectItem>
                          <SelectItem value="42">42</SelectItem>
                          <SelectItem value="44">44</SelectItem>
                          <SelectItem value="46">46</SelectItem>
                          <SelectItem value="XS">XS</SelectItem>
                          <SelectItem value="S">S</SelectItem>
                          <SelectItem value="M">M</SelectItem>
                          <SelectItem value="L">L</SelectItem>
                          <SelectItem value="XL">XL</SelectItem>
                          <SelectItem value="XXL">XXL</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>Talla para pantalones y overoles.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tallaCalzado"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Talla de Calzado</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione una talla" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Sin especificar">Sin especificar</SelectItem>
                          <SelectItem value="34">34</SelectItem>
                          <SelectItem value="35">35</SelectItem>
                          <SelectItem value="36">36</SelectItem>
                          <SelectItem value="37">37</SelectItem>
                          <SelectItem value="38">38</SelectItem>
                          <SelectItem value="39">39</SelectItem>
                          <SelectItem value="40">40</SelectItem>
                          <SelectItem value="41">41</SelectItem>
                          <SelectItem value="42">42</SelectItem>
                          <SelectItem value="43">43</SelectItem>
                          <SelectItem value="44">44</SelectItem>
                          <SelectItem value="45">45</SelectItem>
                          <SelectItem value="46">46</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>Talla para calzado de seguridad.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tallaChaqueta"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Talla de Chaqueta</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione una talla" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Sin especificar">Sin especificar</SelectItem>
                          <SelectItem value="XS">XS</SelectItem>
                          <SelectItem value="S">S</SelectItem>
                          <SelectItem value="M">M</SelectItem>
                          <SelectItem value="L">L</SelectItem>
                          <SelectItem value="XL">XL</SelectItem>
                          <SelectItem value="XXL">XXL</SelectItem>
                          <SelectItem value="XXXL">XXXL</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>Talla para chaquetas y abrigos.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="acceso" className="space-y-6 pt-4">
            <div className="rounded-lg border p-4">
              <FormField
                control={form.control}
                name="crearAcceso"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-2">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        {isEditing && usuarioExistente
                          ? "Editar acceso al sistema"
                          : "Crear acceso al sistema para este empleado"}
                      </FormLabel>
                      <FormDescription>
                        {isEditing && usuarioExistente
                          ? "Modifique los datos de acceso al sistema para este empleado."
                          : "Al marcar esta opción, se creará un usuario para que el empleado pueda acceder al sistema."}
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              {watchCrearAcceso && (
                <div className="mt-4 space-y-4">
                  <FormField
                    control={form.control}
                    name="acceso.email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Correo Electrónico *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="usuario@athplasticos.com" {...field} />
                        </FormControl>
                        <FormDescription>Este correo será utilizado para iniciar sesión en el sistema.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="acceso.password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{isEditing && usuarioExistente ? "Nueva Contraseña" : "Contraseña *"}</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder={
                                isEditing && usuarioExistente ? "Dejar en blanco para mantener la actual" : "Contraseña"
                              }
                              {...field}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-full px-3 py-2"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>
                        </FormControl>
                        {isEditing && usuarioExistente && (
                          <FormDescription>
                            Deje este campo en blanco si no desea cambiar la contraseña actual.
                          </FormDescription>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="acceso.rolId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rol *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccione un rol" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {roles.map((rol) => (
                              <SelectItem key={rol.id} value={rol.id}>
                                {rol.nombre}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          El rol determina qué permisos tendrá el usuario en el sistema.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
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
