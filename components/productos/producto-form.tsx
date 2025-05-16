"use client"

import { Label } from "@/components/ui/label"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2, Plus, Trash2, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Producto, ComponenteProducto, EspecificacionTecnica, ParametroInyeccion } from "@/lib/types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { getMoldes } from "@/lib/data/moldes"
// Añadir importación del componente Checkbox
import { Checkbox } from "@/components/ui/checkbox"
// Importar getMaquinas
import { getMaquinas } from "@/lib/data/maquinaria"

// Esquema de validación para componentes
const componenteSchema = z.object({
  id: z.number().optional(),
  nombre: z.string().min(1, "El nombre es requerido"),
  cantidad: z.coerce.number().positive("La cantidad debe ser positiva"),
  unidad: z.string().min(1, "La unidad es requerida"),
})

// Esquema de validación para especificaciones técnicas
const especificacionSchema = z
  .object({
    id: z.number().optional(),
    nombre: z.string().min(1, "El nombre es requerido"),
    estandar: z.coerce.number().positive("El valor estándar debe ser positivo"),
    desviacion: z.coerce.number().nonnegative("La desviación debe ser positiva o cero"),
    minimo: z.coerce.number().nonnegative("La desviación debe ser positiva o cero"),
    maximo: z.coerce.number().positive("El valor máximo debe ser positivo"),
    unidad: z.string().min(1, "La unidad es requerida"),
  })
  .refine((data) => data.minimo <= data.estandar, {
    message: "El valor mínimo debe ser menor o igual al estándar",
    path: ["minimo"],
  })
  .refine((data) => data.maximo >= data.estandar, {
    message: "El valor máximo debe ser mayor o igual al estándar",
    path: ["maximo"],
  })

// Esquema de validación para parámetros de inyección
const parametroInyeccionSchema = z.object({
  id: z.number().optional(),
  seccion: z.enum(["Carga", "Expulsión", "Cierre y Apertura", "Inyección", "Temperatura"]),
  maquina: z.enum(["INY31", "INY32", "INY33"]),
  nombre: z.string().min(1, "El nombre es requerido"),
  valor: z.coerce.number().positive("El valor debe ser positivo"),
  unidad: z.string().min(1, "La unidad es requerida"),
})

// Esquema de validación para archivos
const archivoSchema = z.object({
  tipo: z.enum(["imagen", "fichaTecnica", "planoTecnico", "instructivoEmpaque"]),
  url: z.string().url("Debe ser una URL válida"),
  nombre: z.string().min(1, "El nombre es requerido"),
})

// Añadir al esquema de validación después de instructivoEmpaque
const productoFormSchema = z.object({
  codigo: z.string().min(3, {
    message: "El código debe tener al menos 3 caracteres.",
  }),
  nombre: z.string().min(3, {
    message: "El nombre debe tener al menos 3 caracteres.",
  }),
  color: z.string().min(2, {
    message: "El color debe tener al menos 2 caracteres.",
  }),
  tipo: z.enum(["Botella", "Tapa", "Envase", "Contenedor", "Tubo", "Otro"], {
    required_error: "El tipo de producto es requerido.",
  }),
  cicloTeorico: z.coerce.number().positive({
    message: "El ciclo teórico debe ser un número positivo.",
  }),
  peso: z.coerce.number().positive({
    message: "El peso debe ser un número positivo.",
  }),
  dosificacion: z.coerce.number().positive({
    message: "La dosificación debe ser un número positivo.",
  }),
  tipoEmpaque: z.enum(["Caja", "Bolsa", "Granel", "Otro"], {
    required_error: "El tipo de empaque es requerido.",
  }),
  unidadEmpaque: z.coerce.number().int().positive({
    message: "La unidad de empaque debe ser un número entero positivo.",
  }),
  imagen: z.string().optional(),
  estado: z.enum(["Activo", "Descontinuado", "En Desarrollo"], {
    required_error: "El estado del producto es requerido.",
  }),
  componentes: z.array(componenteSchema).optional(),
  especificaciones: z.array(especificacionSchema).optional(),
  parametrosInyeccion: z.array(parametroInyeccionSchema).optional(),
  fichaTecnica: z.string().optional(),
  planoTecnico: z.string().optional(),
  instructivoEmpaque: z.string().optional(),
  areaMolde: z.string().optional(),
  moldeId: z.string().optional(),
  maquinasCompatibles: z.array(z.number()).optional(),
})

type ProductoFormValues = z.infer<typeof productoFormSchema>

interface ProductoFormProps {
  producto?: Producto
  isEditing?: boolean
}

export default function ProductoForm({ producto, isEditing = false }: ProductoFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Estados para diálogos
  const [componenteDialogOpen, setComponenteDialogOpen] = useState(false)
  const [especificacionDialogOpen, setEspecificacionDialogOpen] = useState(false)
  const [parametroDialogOpen, setParametroDialogOpen] = useState(false)
  const [archivoDialogOpen, setArchivoDialogOpen] = useState(false)

  // Estados para elementos a eliminar
  const [componenteToDelete, setComponenteToDelete] = useState<number | null>(null)
  const [especificacionToDelete, setEspecificacionToDelete] = useState<number | null>(null)
  const [parametroToDelete, setParametroToDelete] = useState<number | null>(null)
  const [archivoToDelete, setArchivoToDelete] = useState<string | null>(null)

  // Estados para nuevos elementos
  const [nuevoComponente, setNuevoComponente] = useState<Omit<ComponenteProducto, "id">>({
    nombre: "",
    cantidad: 0,
    unidad: "g",
  })

  const [nuevaEspecificacion, setNuevaEspecificacion] = useState<Omit<EspecificacionTecnica, "id">>({
    nombre: "",
    estandar: 0,
    desviacion: 0,
    minimo: 0,
    maximo: 0,
    unidad: "",
  })

  const [nuevoParametro, setNuevoParametro] = useState<Omit<ParametroInyeccion, "id">>({
    seccion: "Temperatura",
    maquina: "INY31",
    nombre: "",
    valor: 0,
    unidad: "",
  })

  const [nuevoArchivo, setNuevoArchivo] = useState({
    tipo: "imagen",
    url: "",
    nombre: "",
  })

  // Estados para la selección de moldes
  const [areas, setAreas] = useState<string[]>([])
  const [moldesDisponibles, setMoldesDisponibles] = useState<any[]>([])
  const [filteredMoldes, setFilteredMoldes] = useState<any[]>([])
  // Añadir estado para máquinas disponibles después del estado de moldes
  const [maquinasDisponibles, setMaquinasDisponibles] = useState<any[]>([])

  // Mover esta sección antes de los useEffect que usan form
  // Añadir al defaultValues después de moldeId
  const defaultValues: Partial<ProductoFormValues> = {
    codigo: producto?.codigo || "",
    nombre: producto?.nombre || "",
    color: producto?.color || "",
    tipo: producto?.tipo || "Botella",
    cicloTeorico: producto?.cicloTeorico || 0,
    peso: producto?.peso || 0,
    dosificacion: producto?.dosificacion || 0,
    tipoEmpaque: producto?.tipoEmpaque || "Caja",
    unidadEmpaque: producto?.unidadEmpaque || 0,
    imagen: producto?.imagen || "",
    estado: producto?.estado || "Activo",
    componentes: producto?.componentes || [],
    especificaciones: producto?.especificaciones || [],
    parametrosInyeccion: producto?.parametrosInyeccion || [],
    fichaTecnica: producto?.fichaTecnica || "",
    planoTecnico: producto?.planoTecnico || "",
    instructivoEmpaque: producto?.instructivoEmpaque || "",
    areaMolde: "",
    moldeId: "",
    maquinasCompatibles: producto?.maquinasCompatibles || [],
  }

  const form = useForm<ProductoFormValues>({
    resolver: zodResolver(productoFormSchema),
    defaultValues,
  })

  // Cargar las áreas y moldes al iniciar
  // Añadir a useEffect para cargar máquinas junto con los moldes
  useEffect(() => {
    const fetchData = async () => {
      const moldes = await getMoldes()
      setMoldesDisponibles(moldes)

      // Extraer áreas únicas de los moldes
      const uniqueAreas = Array.from(new Set(moldes.map((molde: any) => molde.area || "General")))
      setAreas(uniqueAreas)

      // Cargar máquinas disponibles
      const maquinas = await getMaquinas()
      setMaquinasDisponibles(maquinas)
    }

    fetchData()
  }, [])

  // Reemplazar el useEffect que filtra moldes
  useEffect(() => {
    const selectedArea = form.getValues("areaMolde")
    if (selectedArea) {
      const moldesFiltrados = moldesDisponibles.filter((molde) => (molde.area || "General") === selectedArea)
      setFilteredMoldes(moldesFiltrados)
    } else {
      setFilteredMoldes([])
    }
    // Resetear el molde seleccionado cuando cambia el área
    form.setValue("moldeId", "")
  }, [form.watch("areaMolde"), moldesDisponibles, form])

  // Field arrays para manejar colecciones
  const {
    fields: componentesFields,
    append: appendComponente,
    remove: removeComponente,
  } = useFieldArray({
    control: form.control,
    name: "componentes",
  })

  const {
    fields: especificacionesFields,
    append: appendEspecificacion,
    remove: removeEspecificacion,
  } = useFieldArray({
    control: form.control,
    name: "especificaciones",
  })

  const {
    fields: parametrosFields,
    append: appendParametro,
    remove: removeParametro,
  } = useFieldArray({
    control: form.control,
    name: "parametrosInyeccion",
  })

  // Manejadores para agregar elementos
  const handleAddComponente = () => {
    try {
      // Validar el componente
      componenteSchema.parse(nuevoComponente)

      // Generar un ID único
      const newId = componentesFields.length > 0 ? Math.max(...componentesFields.map((c) => c.id as number)) + 1 : 1

      // Agregar el componente
      appendComponente({
        ...nuevoComponente,
        id: newId,
      })

      // Limpiar el formulario
      setNuevoComponente({
        nombre: "",
        cantidad: 0,
        unidad: "g",
      })

      // Cerrar el diálogo
      setComponenteDialogOpen(false)
    } catch (error) {
      console.error("Error al agregar componente:", error)
    }
  }

  const handleAddEspecificacion = () => {
    try {
      // Validar la especificación
      especificacionSchema.parse(nuevaEspecificacion)

      // Generar un ID único
      const newId =
        especificacionesFields.length > 0 ? Math.max(...especificacionesFields.map((e) => e.id as number)) + 1 : 1

      // Agregar la especificación
      appendEspecificacion({
        ...nuevaEspecificacion,
        id: newId,
      })

      // Limpiar el formulario
      setNuevaEspecificacion({
        nombre: "",
        estandar: 0,
        desviacion: 0,
        minimo: 0,
        maximo: 0,
        unidad: "",
      })

      // Cerrar el diálogo
      setEspecificacionDialogOpen(false)
    } catch (error) {
      console.error("Error al agregar especificación:", error)
    }
  }

  const handleAddParametro = () => {
    try {
      // Validar el parámetro
      parametroInyeccionSchema.parse(nuevoParametro)

      // Generar un ID único
      const newId = parametrosFields.length > 0 ? Math.max(...parametrosFields.map((p) => p.id as number)) + 1 : 1

      // Agregar el parámetro
      appendParametro({
        ...nuevoParametro,
        id: newId,
      })

      // Limpiar el formulario
      setNuevoParametro({
        seccion: "Temperatura",
        maquina: "INY31",
        nombre: "",
        valor: 0,
        unidad: "",
      })

      // Cerrar el diálogo
      setParametroDialogOpen(false)
    } catch (error) {
      console.error("Error al agregar parámetro:", error)
    }
  }

  const handleAddArchivo = () => {
    try {
      // Validar el archivo
      archivoSchema.parse(nuevoArchivo)

      // Actualizar el campo correspondiente
      switch (nuevoArchivo.tipo) {
        case "imagen":
          form.setValue("imagen", nuevoArchivo.url)
          break
        case "fichaTecnica":
          form.setValue("fichaTecnica", nuevoArchivo.url)
          break
        case "planoTecnico":
          form.setValue("planoTecnico", nuevoArchivo.url)
          break
        case "instructivoEmpaque":
          form.setValue("instructivoEmpaque", nuevoArchivo.url)
          break
      }

      // Limpiar el formulario
      setNuevoArchivo({
        tipo: "imagen",
        url: "",
        nombre: "",
      })

      // Cerrar el diálogo
      setArchivoDialogOpen(false)
    } catch (error) {
      console.error("Error al agregar archivo:", error)
    }
  }

  // Manejadores para eliminar elementos
  const handleDeleteComponente = (index: number) => {
    removeComponente(index)
    setComponenteToDelete(null)
  }

  const handleDeleteEspecificacion = (index: number) => {
    removeEspecificacion(index)
    setEspecificacionToDelete(null)
  }

  const handleDeleteParametro = (index: number) => {
    removeParametro(index)
    setParametroToDelete(null)
  }

  const handleDeleteArchivo = (tipo: string) => {
    switch (tipo) {
      case "imagen":
        form.setValue("imagen", "")
        break
      case "fichaTecnica":
        form.setValue("fichaTecnica", "")
        break
      case "planoTecnico":
        form.setValue("planoTecnico", "")
        break
      case "instructivoEmpaque":
        form.setValue("instructivoEmpaque", "")
        break
    }
    setArchivoToDelete(null)
  }

  // Manejador para actualizar valores de especificación
  const handleEstandarChange = (value: number) => {
    const desviacion = nuevaEspecificacion.desviacion || 0
    setNuevaEspecificacion({
      ...nuevaEspecificacion,
      estandar: value,
      minimo: value - desviacion,
      maximo: value + desviacion,
    })
  }

  const handleDesviacionChange = (value: number) => {
    const estandar = nuevaEspecificacion.estandar || 0
    setNuevaEspecificacion({
      ...nuevaEspecificacion,
      desviacion: value,
      minimo: estandar - value,
      maximo: estandar + value,
    })
  }

  async function onSubmit(data: ProductoFormValues) {
    setIsSubmitting(true)

    try {
      // Aquí iría la lógica para guardar los datos en la base de datos
      console.log(data)

      // Simulamos una petición a la API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Redirigimos a la lista de productos
      router.push("/productos")
      router.refresh()
    } catch (error) {
      console.error("Error al guardar el producto:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Agrupar parámetros por sección y máquina para mostrarlos organizados
  const parametrosPorSeccionYMaquina = () => {
    const maquinas = ["INY31", "INY32", "INY33"]
    const secciones = ["Carga", "Expulsión", "Cierre y Apertura", "Inyección", "Temperatura"]

    return maquinas
      .map((maquina) => {
        const parametrosMaquina = parametrosFields.filter((p) => p.maquina === maquina)

        return {
          maquina,
          secciones: secciones
            .map((seccion) => {
              return {
                seccion,
                parametros: parametrosMaquina.filter((p) => p.seccion === seccion),
              }
            })
            .filter((s) => s.parametros.length > 0),
        }
      })
      .filter((m) => m.secciones.length > 0)
  }

  // Obtener nombre de archivo de una URL
  const getNombreArchivo = (url: string) => {
    if (!url) return ""
    return url.split("/").pop() || ""
  }

  // Obtener detalles del molde seleccionado
  const getSelectedMoldeDetails = () => {
    const moldeId = form.watch("moldeId")
    if (!moldeId) return null
    return moldesDisponibles.find((m) => m.id.toString() === moldeId)
  }

  const selectedMolde = getSelectedMoldeDetails()

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="w-full grid grid-cols-5 mb-6">
            <TabsTrigger value="general">Información General</TabsTrigger>
            <TabsTrigger value="componentes">Componentes</TabsTrigger>
            <TabsTrigger value="especificaciones">Especificaciones</TabsTrigger>
            <TabsTrigger value="parametros">Parámetros INY</TabsTrigger>
            <TabsTrigger value="archivos">Archivos</TabsTrigger>
          </TabsList>

          {/* Pestaña de Información General */}
          <TabsContent value="general" className="space-y-6 mt-0">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="codigo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Código *</FormLabel>
                    <FormControl>
                      <Input placeholder="PL-001" {...field} disabled={isEditing} />
                    </FormControl>
                    {isEditing && <FormDescription>El código no se puede modificar.</FormDescription>}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre *</FormLabel>
                    <FormControl>
                      <Input placeholder="Botella PET 500ml" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="tipo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Producto *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione un tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Botella">Botella</SelectItem>
                        <SelectItem value="Tapa">Tapa</SelectItem>
                        <SelectItem value="Envase">Envase</SelectItem>
                        <SelectItem value="Contenedor">Contenedor</SelectItem>
                        <SelectItem value="Tubo">Tubo</SelectItem>
                        <SelectItem value="Otro">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color *</FormLabel>
                    <FormControl>
                      <Input placeholder="Transparente" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="peso"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Peso (g) *</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" placeholder="15.5" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cicloTeorico"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ciclo Teórico (s) *</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" placeholder="12" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
                      <SelectItem value="Descontinuado">Descontinuado</SelectItem>
                      <SelectItem value="En Desarrollo">En Desarrollo</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="tipoEmpaque"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Empaque *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione un tipo de empaque" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Caja">Caja</SelectItem>
                        <SelectItem value="Bolsa">Bolsa</SelectItem>
                        <SelectItem value="Granel">Granel</SelectItem>
                        <SelectItem value="Otro">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="unidadEmpaque"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unidad de Empaque *</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="100" {...field} />
                    </FormControl>
                    <FormDescription>Cantidad de unidades por empaque.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="dosificacion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dosificación (g/Kg) *</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" placeholder="0.8" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4 border-t pt-4 mt-4">
              <h3 className="font-medium text-lg">Asociación con Molde</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="areaMolde"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Área del Molde</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione un área" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {areas.map((area) => (
                            <SelectItem key={area} value={area}>
                              {area}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>Primero seleccione el área del molde</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="moldeId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Molde</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={!form.watch("areaMolde") || filteredMoldes.length === 0}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={
                                !form.watch("areaMolde")
                                  ? "Primero seleccione un área"
                                  : filteredMoldes.length === 0
                                    ? "No hay moldes disponibles en esta área"
                                    : "Seleccione un molde"
                              }
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {filteredMoldes.map((molde) => (
                            <SelectItem key={molde.id} value={molde.id.toString()}>
                              {molde.nombre} ({molde.referencia})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {selectedMolde && (
                        <FormDescription>
                          Molde seleccionado: {selectedMolde.nombre} - {selectedMolde.cavidades} cavidades
                        </FormDescription>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            {/* Añadir después de la sección de asociación con Molde en la pestaña "general" */}
            {/* Dentro del TabsContent value="general" */}
            <div className="space-y-4 border-t pt-4 mt-4">
              <h3 className="font-medium text-lg">Máquinas Compatibles</h3>
              <FormField
                control={form.control}
                name="maquinasCompatibles"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Seleccione las máquinas donde se puede fabricar este producto</FormLabel>
                    <FormDescription>
                      Puede seleccionar múltiples máquinas donde este producto puede ser fabricado.
                    </FormDescription>
                    <div className="border rounded-md p-4">
                      {maquinasDisponibles.length === 0 ? (
                        <p className="text-sm text-muted-foreground">Cargando máquinas disponibles...</p>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                          {maquinasDisponibles.map((maquina) => (
                            <div key={maquina.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={`maquina-${maquina.id}`}
                                checked={field.value?.includes(maquina.id)}
                                onCheckedChange={(checked) => {
                                  const currentValues = field.value || []
                                  if (checked) {
                                    field.onChange([...currentValues, maquina.id])
                                  } else {
                                    field.onChange(currentValues.filter((id) => id !== maquina.id))
                                  }
                                }}
                              />
                              <label
                                htmlFor={`maquina-${maquina.id}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {maquina.nombre} ({maquina.modelo})
                              </label>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>

          {/* Pestaña de Componentes */}
          <TabsContent value="componentes" className="space-y-6 mt-0">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Componentes del Producto</CardTitle>
                <Button onClick={() => setComponenteDialogOpen(true)} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  <span>Añadir Componente</span>
                </Button>
              </CardHeader>
              <CardContent>
                {componentesFields.length === 0 ? (
                  <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
                    <p className="text-sm text-muted-foreground">No hay componentes registrados para este producto.</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Cantidad</TableHead>
                        <TableHead>Unidad</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {componentesFields.map((componente, index) => (
                        <TableRow key={componente.id}>
                          <TableCell className="font-medium">{componente.nombre}</TableCell>
                          <TableCell>{componente.cantidad}</TableCell>
                          <TableCell>{componente.unidad}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-500 hover:text-red-700 hover:bg-red-100"
                              onClick={() => setComponenteToDelete(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Eliminar</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pestaña de Especificaciones Técnicas */}
          <TabsContent value="especificaciones" className="space-y-6 mt-0">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Especificaciones Técnicas</CardTitle>
                <Button onClick={() => setEspecificacionDialogOpen(true)} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  <span>Añadir Especificación</span>
                </Button>
              </CardHeader>
              <CardContent>
                {especificacionesFields.length === 0 ? (
                  <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
                    <p className="text-sm text-muted-foreground">
                      No hay especificaciones técnicas registradas para este producto.
                    </p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Estándar</TableHead>
                        <TableHead>Desviación</TableHead>
                        <TableHead>Mínimo</TableHead>
                        <TableHead>Máximo</TableHead>
                        <TableHead>Unidad</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {especificacionesFields.map((especificacion, index) => (
                        <TableRow key={especificacion.id}>
                          <TableCell className="font-medium">{especificacion.nombre}</TableCell>
                          <TableCell>{especificacion.estandar}</TableCell>
                          <TableCell>{especificacion.desviacion}</TableCell>
                          <TableCell>{especificacion.minimo}</TableCell>
                          <TableCell>{especificacion.maximo}</TableCell>
                          <TableCell>{especificacion.unidad}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-500 hover:text-red-700 hover:bg-red-100"
                              onClick={() => setEspecificacionToDelete(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Eliminar</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pestaña de Parámetros de Inyección */}
          <TabsContent value="parametros" className="space-y-6 mt-0">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Parámetros de Inyección</CardTitle>
                <Button onClick={() => setParametroDialogOpen(true)} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  <span>Añadir Parámetro</span>
                </Button>
              </CardHeader>
              <CardContent>
                {parametrosFields.length === 0 ? (
                  <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
                    <p className="text-sm text-muted-foreground">
                      No hay parámetros de inyección registrados para este producto.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {parametrosPorSeccionYMaquina().map((maquina) => (
                      <div key={maquina.maquina} className="space-y-4">
                        <h3 className="text-lg font-medium">Máquina: {maquina.maquina}</h3>
                        {maquina.secciones.map((seccion) => (
                          <div key={seccion.seccion} className="space-y-2">
                            <h4 className="text-md font-medium">{seccion.seccion}</h4>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Nombre</TableHead>
                                  <TableHead>Valor</TableHead>
                                  <TableHead>Unidad</TableHead>
                                  <TableHead className="text-right">Acciones</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {seccion.parametros.map((parametro, index) => {
                                  // Encontrar el índice real en el array de parámetros
                                  const realIndex = parametrosFields.findIndex((p) => p.id === parametro.id)
                                  return (
                                    <TableRow key={parametro.id}>
                                      <TableCell className="font-medium">{parametro.nombre}</TableCell>
                                      <TableCell>{parametro.valor}</TableCell>
                                      <TableCell>{parametro.unidad}</TableCell>
                                      <TableCell className="text-right">
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="text-red-500 hover:text-red-700 hover:bg-red-100"
                                          onClick={() => setParametroToDelete(realIndex)}
                                        >
                                          <Trash2 className="h-4 w-4" />
                                          <span className="sr-only">Eliminar</span>
                                        </Button>
                                      </TableCell>
                                    </TableRow>
                                  )
                                })}
                              </TableBody>
                            </Table>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pestaña de Archivos */}
          <TabsContent value="archivos" className="space-y-6 mt-0">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Archivos del Producto</CardTitle>
                <Button onClick={() => setArchivoDialogOpen(true)} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  <span>Añadir Archivo</span>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Imagen del Producto */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Imagen del Producto</h3>
                    {form.watch("imagen") ? (
                      <div className="relative">
                        <div className="relative h-64 w-full overflow-hidden rounded-md border">
                          <img
                            src={form.watch("imagen") || "/placeholder.svg"}
                            alt="Imagen del producto"
                            className="h-full w-full object-contain"
                          />
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => setArchivoToDelete("imagen")}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex h-64 items-center justify-center rounded-md border border-dashed">
                        <div className="flex flex-col items-center gap-2">
                          <Upload className="h-8 w-8 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">No hay imagen del producto</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Ficha Técnica */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Ficha Técnica</h3>
                    {form.watch("fichaTecnica") ? (
                      <div className="relative">
                        <div className="flex items-center gap-2 rounded-md border p-4">
                          <div className="flex-1">
                            <p className="font-medium">{getNombreArchivo(form.watch("fichaTecnica"))}</p>
                            <p className="text-sm text-muted-foreground">Ficha técnica del producto</p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <a href={form.watch("fichaTecnica")} target="_blank" rel="noopener noreferrer">
                                Ver
                              </a>
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => setArchivoToDelete("fichaTecnica")}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex h-24 items-center justify-center rounded-md border border-dashed">
                        <div className="flex flex-col items-center gap-2">
                          <Upload className="h-6 w-6 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">No hay ficha técnica</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Plano Técnico */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Plano Técnico</h3>
                    {form.watch("planoTecnico") ? (
                      <div className="relative">
                        <div className="flex items-center gap-2 rounded-md border p-4">
                          <div className="flex-1">
                            <p className="font-medium">{getNombreArchivo(form.watch("planoTecnico"))}</p>
                            <p className="text-sm text-muted-foreground">Plano técnico del producto</p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <a href={form.watch("planoTecnico")} target="_blank" rel="noopener noreferrer">
                                Ver
                              </a>
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => setArchivoToDelete("planoTecnico")}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex h-24 items-center justify-center rounded-md border border-dashed">
                        <div className="flex flex-col items-center gap-2">
                          <Upload className="h-6 w-6 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">No hay plano técnico</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Instructivo de Empaque */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Instructivo de Empaque</h3>
                    {form.watch("instructivoEmpaque") ? (
                      <div className="relative">
                        <div className="flex items-center gap-2 rounded-md border p-4">
                          <div className="flex-1">
                            <p className="font-medium">{getNombreArchivo(form.watch("instructivoEmpaque"))}</p>
                            <p className="text-sm text-muted-foreground">Instructivo de empaque del producto</p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <a href={form.watch("instructivoEmpaque")} target="_blank" rel="noopener noreferrer">
                                Ver
                              </a>
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => setArchivoToDelete("instructivoEmpaque")}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex h-24 items-center justify-center rounded-md border border-dashed">
                        <div className="flex flex-col items-center gap-2">
                          <Upload className="h-6 w-6 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">No hay instructivo de empaque</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-4 pt-6 mt-6 border-t">
          <Button type="button" variant="outline" onClick={() => router.back()} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEditing ? "Actualizar Producto" : "Crear Producto"}
          </Button>
        </div>
      </form>

      {/* Diálogo para añadir componente */}
      <Dialog open={componenteDialogOpen} onOpenChange={setComponenteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Añadir Nuevo Componente</DialogTitle>
            <DialogDescription>Ingrese los detalles del componente a añadir.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="nombre-componente">Nombre del Componente</Label>
              <Input
                id="nombre-componente"
                value={nuevoComponente.nombre}
                onChange={(e) => setNuevoComponente({ ...nuevoComponente, nombre: e.target.value })}
                placeholder="Ej: PET Virgen"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="cantidad-componente">Cantidad</Label>
                <Input
                  id="cantidad-componente"
                  type="number"
                  value={nuevoComponente.cantidad || ""}
                  onChange={(e) =>
                    setNuevoComponente({ ...nuevoComponente, cantidad: Number.parseFloat(e.target.value) || 0 })
                  }
                  placeholder="Ej: 12.5"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="unidad-componente">Unidad</Label>
                <Input
                  id="unidad-componente"
                  value={nuevoComponente.unidad}
                  onChange={(e) => setNuevoComponente({ ...nuevoComponente, unidad: e.target.value })}
                  placeholder="Ej: g"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setComponenteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddComponente}>Añadir Componente</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para añadir especificación */}
      <Dialog open={especificacionDialogOpen} onOpenChange={setEspecificacionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Añadir Nueva Especificación</DialogTitle>
            <DialogDescription>Ingrese los detalles de la especificación técnica.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="nombre-especificacion">Nombre</Label>
                <Input
                  id="nombre-especificacion"
                  value={nuevaEspecificacion.nombre}
                  onChange={(e) => setNuevaEspecificacion({ ...nuevaEspecificacion, nombre: e.target.value })}
                  placeholder="Ej: Peso"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="unidad-especificacion">Unidad</Label>
                <Input
                  id="unidad-especificacion"
                  value={nuevaEspecificacion.unidad}
                  onChange={(e) => setNuevaEspecificacion({ ...nuevaEspecificacion, unidad: e.target.value })}
                  placeholder="Ej: g"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="estandar-especificacion">Estándar</Label>
                <Input
                  id="estandar-especificacion"
                  type="number"
                  value={nuevaEspecificacion.estandar || ""}
                  onChange={(e) => handleEstandarChange(Number.parseFloat(e.target.value) || 0)}
                  placeholder="Ej: 15.5"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="desviacion-especificacion">Desviación</Label>
                <Input
                  id="desviacion-especificacion"
                  type="number"
                  value={nuevaEspecificacion.desviacion || ""}
                  onChange={(e) => handleDesviacionChange(Number.parseFloat(e.target.value) || 0)}
                  placeholder="Ej: 0.2"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="minimo-especificacion">Mínimo</Label>
                <Input
                  id="minimo-especificacion"
                  type="number"
                  value={nuevaEspecificacion.minimo || ""}
                  onChange={(e) =>
                    setNuevaEspecificacion({ ...nuevaEspecificacion, minimo: Number.parseFloat(e.target.value) || 0 })
                  }
                  placeholder="Ej: 15.3"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="maximo-especificacion">Máximo</Label>
                <Input
                  id="maximo-especificacion"
                  type="number"
                  value={nuevaEspecificacion.maximo || ""}
                  onChange={(e) =>
                    setNuevaEspecificacion({ ...nuevaEspecificacion, maximo: Number.parseFloat(e.target.value) || 0 })
                  }
                  placeholder="Ej: 15.7"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEspecificacionDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddEspecificacion}>Añadir Especificación</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para añadir parámetro */}
      <Dialog open={parametroDialogOpen} onOpenChange={setParametroDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Añadir Nuevo Parámetro</DialogTitle>
            <DialogDescription>Ingrese los detalles del parámetro de inyección.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="maquina-parametro">Máquina</Label>
                <Select
                  value={nuevoParametro.maquina}
                  onValueChange={(value) =>
                    setNuevoParametro({ ...nuevoParametro, maquina: value as "INY31" | "INY32" | "INY33" })
                  }
                >
                  <SelectTrigger id="maquina-parametro">
                    <SelectValue placeholder="Seleccione una máquina" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="INY31">INY31</SelectItem>
                    <SelectItem value="INY32">INY32</SelectItem>
                    <SelectItem value="INY33">INY33</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="seccion-parametro">Sección</Label>
                <Select
                  value={nuevoParametro.seccion}
                  onValueChange={(value) =>
                    setNuevoParametro({
                      ...nuevoParametro,
                      seccion: value as "Carga" | "Expulsión" | "Cierre y Apertura" | "Inyección" | "Temperatura",
                    })
                  }
                >
                  <SelectTrigger id="seccion-parametro">
                    <SelectValue placeholder="Seleccione una sección" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Carga">Carga</SelectItem>
                    <SelectItem value="Expulsión">Expulsión</SelectItem>
                    <SelectItem value="Cierre y Apertura">Cierre y Apertura</SelectItem>
                    <SelectItem value="Inyección">Inyección</SelectItem>
                    <SelectItem value="Temperatura">Temperatura</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="nombre-parametro">Nombre del Parámetro</Label>
              <Input
                id="nombre-parametro"
                value={nuevoParametro.nombre}
                onChange={(e) => setNuevoParametro({ ...nuevoParametro, nombre: e.target.value })}
                placeholder="Ej: Zona 1"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="valor-parametro">Valor</Label>
                <Input
                  id="valor-parametro"
                  type="number"
                  value={nuevoParametro.valor || ""}
                  onChange={(e) =>
                    setNuevoParametro({ ...nuevoParametro, valor: Number.parseFloat(e.target.value) || 0 })
                  }
                  placeholder="Ej: 280"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="unidad-parametro">Unidad</Label>
                <Input
                  id="unidad-parametro"
                  value={nuevoParametro.unidad}
                  onChange={(e) => setNuevoParametro({ ...nuevoParametro, unidad: e.target.value })}
                  placeholder="Ej: °C"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setParametroDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddParametro}>Añadir Parámetro</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para añadir archivo */}
      <Dialog open={archivoDialogOpen} onOpenChange={setArchivoDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Añadir Nuevo Archivo</DialogTitle>
            <DialogDescription>Ingrese los detalles del archivo a añadir.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="tipo-archivo">Tipo de Archivo</Label>
              <Select
                value={nuevoArchivo.tipo}
                onValueChange={(value) =>
                  setNuevoArchivo({
                    ...nuevoArchivo,
                    tipo: value as "imagen" | "fichaTecnica" | "planoTecnico" | "instructivoEmpaque",
                  })
                }
              >
                <SelectTrigger id="tipo-archivo">
                  <SelectValue placeholder="Seleccione un tipo de archivo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="imagen">Imagen del Producto</SelectItem>
                  <SelectItem value="fichaTecnica">Ficha Técnica</SelectItem>
                  <SelectItem value="planoTecnico">Plano Técnico</SelectItem>
                  <SelectItem value="instructivoEmpaque">Instructivo de Empaque</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="nombre-archivo">Nombre del Archivo</Label>
              <Input
                id="nombre-archivo"
                value={nuevoArchivo.nombre}
                onChange={(e) => setNuevoArchivo({ ...nuevoArchivo, nombre: e.target.value })}
                placeholder="Ej: Ficha técnica botella 500ml"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="url-archivo">URL del Archivo</Label>
              <Input
                id="url-archivo"
                value={nuevoArchivo.url}
                onChange={(e) => setNuevoArchivo({ ...nuevoArchivo, url: e.target.value })}
                placeholder="https://ejemplo.com/archivo.pdf"
              />
              <FormDescription>
                Ingrese la URL completa del archivo. Para imágenes, asegúrese de que la URL termine con una extensión de
                imagen (.jpg, .png, etc.).
              </FormDescription>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setArchivoDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddArchivo}>Añadir Archivo</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo de confirmación para eliminar componente */}
      <AlertDialog open={componenteToDelete !== null} onOpenChange={(open) => !open && setComponenteToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar componente?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará el componente seleccionado. ¿Está seguro?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => componenteToDelete !== null && handleDeleteComponente(componenteToDelete)}
              className="bg-red-500 hover:bg-red-600"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Diálogo de confirmación para eliminar especificación */}
      <AlertDialog
        open={especificacionToDelete !== null}
        onOpenChange={(open) => !open && setEspecificacionToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar especificación?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará la especificación técnica seleccionada. ¿Está seguro?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => especificacionToDelete !== null && handleDeleteEspecificacion(especificacionToDelete)}
              className="bg-red-500 hover:bg-red-600"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Diálogo de confirmación para eliminar parámetro */}
      <AlertDialog open={parametroToDelete !== null} onOpenChange={(open) => !open && setParametroToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar parámetro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará el parámetro de inyección seleccionado. ¿Está seguro?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => parametroToDelete !== null && handleDeleteParametro(parametroToDelete)}
              className="bg-red-500 hover:bg-red-600"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Diálogo de confirmación para eliminar archivo */}
      <AlertDialog open={archivoToDelete !== null} onOpenChange={(open) => !open && setArchivoToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar archivo?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará el archivo seleccionado. ¿Está seguro?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => archivoToDelete !== null && handleDeleteArchivo(archivoToDelete)}
              className="bg-red-500 hover:bg-red-600"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Form>
  )
}
