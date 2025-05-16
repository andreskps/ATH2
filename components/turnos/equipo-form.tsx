"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Check, ChevronsUpDown, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { getEmpleados } from "@/lib/data/empleados"
import type { Equipo } from "@/lib/data/turnos"

const formSchema = z.object({
  nombre: z.string().min(3, {
    message: "El nombre debe tener al menos 3 caracteres.",
  }),
  supervisor: z.string({
    required_error: "Por favor selecciona un supervisor.",
  }),
  area: z.string({
    required_error: "Por favor selecciona un área.",
  }),
  operarios: z.array(z.string()).min(1, {
    message: "Debes seleccionar al menos un operario.",
  }),
})

const areas = ["Inyección", "PET", "Soplado", "Ensamblaje", "Empaque"]

interface EquipoFormProps {
  equipo?: Equipo
}

export default function EquipoForm({ equipo }: EquipoFormProps) {
  const router = useRouter()
  const [empleados, setEmpleados] = useState<any[]>([])
  const [supervisores, setSupervisores] = useState<any[]>([])
  const [operariosDisponibles, setOperariosDisponibles] = useState<any[]>([])
  const [selectedOperarios, setSelectedOperarios] = useState<string[]>(equipo?.operarios || [])
  const [openOperariosPopover, setOpenOperariosPopover] = useState(false)

  useEffect(() => {
    const allEmpleados = getEmpleados()
    setEmpleados(allEmpleados)

    // Filtrar supervisores (empleados con cargo que incluye "supervisor" o "jefe")
    const supervisoresList = allEmpleados.filter(
      (emp) => emp.cargo?.toLowerCase().includes("supervisor") || emp.cargo?.toLowerCase().includes("jefe"),
    )
    setSupervisores(supervisoresList)

    // Filtrar operarios (empleados con cargo que incluye "operario" o "técnico")
    const operariosList = allEmpleados.filter(
      (emp) =>
        emp.cargo?.toLowerCase().includes("operario") ||
        emp.cargo?.toLowerCase().includes("técnico") ||
        emp.departamento?.toLowerCase().includes("producción"),
    )
    setOperariosDisponibles(operariosList)
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: equipo?.nombre || "",
      supervisor: equipo?.supervisor || "",
      area: equipo?.area || "",
      operarios: equipo?.operarios || [],
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)

    // Aquí iría la lógica para guardar el equipo
    // Si es edición, actualizar el equipo existente
    // Si es creación, crear un nuevo equipo

    // Redirigir a la lista de equipos
    router.push("/turnos/equipos")
  }

  const handleSelectOperario = (operarioId: string) => {
    if (selectedOperarios.includes(operarioId)) {
      setSelectedOperarios(selectedOperarios.filter((id) => id !== operarioId))
      form.setValue(
        "operarios",
        selectedOperarios.filter((id) => id !== operarioId),
      )
    } else {
      setSelectedOperarios([...selectedOperarios, operarioId])
      form.setValue("operarios", [...selectedOperarios, operarioId])
    }
  }

  const removeOperario = (operarioId: string) => {
    setSelectedOperarios(selectedOperarios.filter((id) => id !== operarioId))
    form.setValue(
      "operarios",
      selectedOperarios.filter((id) => id !== operarioId),
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="nombre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre del Equipo</FormLabel>
                <FormControl>
                  <Input placeholder="Equipo de Inyección A" {...field} />
                </FormControl>
                <FormDescription>Nombre descriptivo para identificar al equipo.</FormDescription>
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
                    {areas.map((area) => (
                      <SelectItem key={area} value={area}>
                        {area}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>Área de producción donde trabaja el equipo.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="supervisor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Supervisor</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un supervisor" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {supervisores.map((supervisor) => (
                      <SelectItem key={supervisor.id} value={supervisor.id.toString()}>
                        {supervisor.nombre} {supervisor.apellidos} - {supervisor.cargo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>Supervisor responsable del equipo.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="operarios"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Operarios</FormLabel>
                <Popover open={openOperariosPopover} onOpenChange={setOpenOperariosPopover}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn("w-full justify-between", !field.value.length && "text-muted-foreground")}
                      >
                        {field.value.length ? `${field.value.length} operarios seleccionados` : "Selecciona operarios"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Buscar operario..." />
                      <CommandEmpty>No se encontraron operarios.</CommandEmpty>
                      <CommandList>
                        <CommandGroup>
                          {operariosDisponibles.map((operario) => (
                            <CommandItem
                              key={operario.id}
                              value={operario.id.toString()}
                              onSelect={() => handleSelectOperario(operario.id.toString())}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  selectedOperarios.includes(operario.id.toString()) ? "opacity-100" : "opacity-0",
                                )}
                              />
                              {operario.nombre} {operario.apellidos} - {operario.cargo || "Operario"}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>Selecciona los operarios que forman parte del equipo.</FormDescription>
                <FormMessage />
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedOperarios.map((operarioId) => {
                    const operario = empleados.find((emp) => emp.id.toString() === operarioId)
                    return operario ? (
                      <Badge key={operarioId} variant="secondary" className="flex items-center gap-1">
                        {operario.nombre} {operario.apellidos}
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 p-0 ml-1"
                          onClick={() => removeOperario(operarioId)}
                        >
                          <X className="h-3 w-3" />
                          <span className="sr-only">Eliminar</span>
                        </Button>
                      </Badge>
                    ) : null
                  })}
                </div>
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => router.push("/turnos/equipos")}>
            Cancelar
          </Button>
          <Button type="submit">{equipo ? "Actualizar Equipo" : "Crear Equipo"}</Button>
        </div>
      </form>
    </Form>
  )
}
