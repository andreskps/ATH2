"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { equipos, getEquipoById, isEmpleadoDisponible, getNombreEmpleado, getTurnoById } from "@/lib/data/turnos"
import { getEmpleados } from "@/lib/data/empleados"

// Esquema de validación para el formulario
const turnoFormSchema = z.object({
  fecha: z.string().min(1, "La fecha es requerida"),
  categoria: z.string().min(1, "La categoría es requerida"),
  area: z.string().min(1, "El área es requerida"),
  equipoId: z.string().optional(),
  supervisor: z.string().min(1, "El supervisor es requerido"),
  operarios: z.array(z.string()).min(1, "Debe seleccionar al menos un operario"),
  estado: z.string().min(1, "El estado es requerido"),
})

type TurnoFormValues = z.infer<typeof turnoFormSchema>

interface TurnoFormProps {
  turnoId?: string
  fechaInicial?: string
}

export default function TurnoForm({ turnoId, fechaInicial }: TurnoFormProps) {
  const router = useRouter()
  const [seleccionManual, setSeleccionManual] = useState(true)
  const [advertencias, setAdvertencias] = useState<string[]>([])

  // Valores por defecto para el formulario
  const defaultValues: Partial<TurnoFormValues> = {
    fecha: fechaInicial || new Date().toISOString().split("T")[0],
    categoria: "",
    area: "",
    equipoId: "",
    supervisor: "",
    operarios: [],
    estado: "Pendiente",
  }

  // Inicializar el formulario
  const form = useForm<TurnoFormValues>({
    resolver: zodResolver(turnoFormSchema),
    defaultValues,
  })

  // Supervisores disponibles (empleados con rol de supervisor)
  const supervisoresDisponibles = getEmpleados().filter(
    (empleado) =>
      empleado.cargo?.toLowerCase().includes("supervisor") ||
      empleado.departamento?.toLowerCase().includes("supervisor"),
  )

  // Operarios disponibles (empleados con rol de operario)
  const operariosDisponibles = getEmpleados().filter(
    (empleado) =>
      empleado.cargo?.toLowerCase().includes("operador") || empleado.cargo?.toLowerCase().includes("operario"),
  )

  // Efecto para cargar los datos del turno si se proporciona un turnoId
  useEffect(() => {
    if (turnoId) {
      const turno = getTurnoById(turnoId)
      if (turno) {
        // Resetear el formulario con los datos del turno
        form.reset({
          fecha: turno.fecha,
          categoria: turno.categoria,
          area: turno.area,
          equipoId: turno.equipoId || "",
          supervisor: turno.supervisor,
          operarios: turno.operarios,
          estado: turno.estado,
        })

        // Si el turno tiene un equipo asignado, deshabilitar la selección manual
        if (turno.equipoId) {
          setSeleccionManual(false)
        }
      }
    }
  }, [turnoId, form])

  // Efecto para manejar la selección de equipo
  useEffect(() => {
    const equipoId = form.watch("equipoId")
    if (equipoId) {
      const equipo = getEquipoById(equipoId)
      if (equipo) {
        form.setValue("area", equipo.area)
        form.setValue("supervisor", equipo.supervisor)
        form.setValue("operarios", equipo.operarios)
        setSeleccionManual(false)
      }
    } else {
      setSeleccionManual(true)
    }
  }, [form.watch("equipoId")])

  // Efecto para verificar disponibilidad de empleados
  useEffect(() => {
    const fecha = form.watch("fecha")
    const supervisor = form.watch("supervisor")
    const operarios = form.watch("operarios")

    if (fecha && (supervisor || operarios.length > 0)) {
      const nuevasAdvertencias: string[] = []

      if (supervisor && !isEmpleadoDisponible(supervisor, fecha)) {
        nuevasAdvertencias.push(
          `El supervisor ${getNombreEmpleado(supervisor)} ya está asignado a otro turno en esta fecha.`,
        )
      }

      operarios.forEach((operarioId) => {
        if (!isEmpleadoDisponible(operarioId, fecha)) {
          nuevasAdvertencias.push(
            `El operario ${getNombreEmpleado(operarioId)} ya está asignado a otro turno en esta fecha.`,
          )
        }
      })

      setAdvertencias(nuevasAdvertencias)
    } else {
      setAdvertencias([])
    }
  }, [form.watch("fecha"), form.watch("supervisor"), form.watch("operarios")])

  // Función para manejar el envío del formulario
  function onSubmit(data: TurnoFormValues) {
    console.log("Datos del formulario:", data)
    // Aquí iría la lógica para guardar el turno
    // Después de guardar, redirigir a la página de turnos
    router.push("/turnos")
  }

  return (
    <Card>
      <CardContent className="p-6">
        <Form {...form}>
          {turnoId && (
            <div className="mb-6">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Modo edición</AlertTitle>
                <AlertDescription>
                  Estás editando un turno existente. Los campos se han llenado automáticamente.
                </AlertDescription>
              </Alert>
            </div>
          )}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="fecha"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha del turno</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="categoria"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoría del turno</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar categoría" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="A">Turno A</SelectItem>
                        <SelectItem value="B">Turno B</SelectItem>
                        <SelectItem value="C">Turno C</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="equipoId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Equipo (opcional)</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar equipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="none">Sin equipo</SelectItem>
                        {equipos.map((equipo) => (
                          <SelectItem key={equipo.id} value={equipo.id}>
                            {equipo.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Al seleccionar un equipo, se autocompletarán los campos de área, supervisor y operarios.
                    </FormDescription>
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
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!seleccionManual}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar área" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Inyección">Inyección</SelectItem>
                        <SelectItem value="PET">PET</SelectItem>
                        <SelectItem value="Soplado">Soplado</SelectItem>
                        <SelectItem value="Ensamblaje">Ensamblaje</SelectItem>
                        <SelectItem value="Empaque">Empaque</SelectItem>
                      </SelectContent>
                    </Select>
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
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!seleccionManual}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar supervisor" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {supervisoresDisponibles.map((supervisor) => (
                          <SelectItem key={supervisor.id} value={supervisor.id}>
                            {supervisor.nombre} {supervisor.apellido}
                          </SelectItem>
                        ))}
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
                    <FormLabel>Estado inicial</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar estado" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Pendiente">Pendiente</SelectItem>
                        <SelectItem value="Confirmado">Confirmado</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="operarios"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Operarios</FormLabel>
                    <FormDescription>Seleccione los operarios que participarán en este turno.</FormDescription>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {operariosDisponibles.map((operario) => (
                      <FormField
                        key={operario.id}
                        control={form.control}
                        name="operarios"
                        render={({ field }) => {
                          return (
                            <FormItem key={operario.id} className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(operario.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, operario.id])
                                      : field.onChange(field.value?.filter((value) => value !== operario.id))
                                  }}
                                  disabled={!seleccionManual}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {operario.nombre} {operario.apellido}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {advertencias.length > 0 && (
              <Alert variant="warning">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Advertencias</AlertTitle>
                <AlertDescription>
                  <ul className="list-disc pl-5 mt-2">
                    {advertencias.map((advertencia, index) => (
                      <li key={index}>{advertencia}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => router.push("/turnos")}>
                Cancelar
              </Button>
              <Button type="submit">Guardar Turno</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
