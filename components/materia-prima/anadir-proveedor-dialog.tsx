"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import type { MateriaPrima } from "@/lib/data/materia-prima"
import { getProveedores } from "@/lib/data/proveedores"

interface AnadirProveedorDialogProps {
  materiaPrima: MateriaPrima
  onProveedorAdded?: () => void
  children?: React.ReactNode
}

export function AnadirProveedorDialog({ materiaPrima, onProveedorAdded, children }: AnadirProveedorDialogProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [openCombobox, setOpenCombobox] = useState(false)
  const [proveedorId, setProveedorId] = useState("")
  const [precio, setPrecio] = useState("")
  const [referencia, setReferencia] = useState("")
  const [loading, setLoading] = useState(false)
  const [proveedores, setProveedores] = useState<any[]>([])

  // Cargar proveedores cuando se abre el diálogo
  const handleOpenChange = async (isOpen: boolean) => {
    setOpen(isOpen)
    if (isOpen) {
      try {
        const proveedoresData = await getProveedores()
        setProveedores(proveedoresData)
      } catch (error) {
        console.error("Error al cargar proveedores:", error)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!proveedorId || !precio) {
      alert("Por favor, complete todos los campos obligatorios")
      return
    }

    setLoading(true)

    try {
      // Aquí iría la lógica para añadir el proveedor a la materia prima
      // En una aplicación real, esto sería una llamada a la API

      // Simular delay de API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Resetear formulario
      setProveedorId("")
      setPrecio("")
      setReferencia("")
      setOpen(false)

      // Notificar al componente padre
      if (onProveedorAdded) {
        onProveedorAdded()
      }

      // Refrescar la página para mostrar los cambios
      router.refresh()
    } catch (error) {
      console.error("Error al añadir proveedor:", error)
      alert("Error al añadir el proveedor. Por favor, inténtelo de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  const proveedorSeleccionado = proveedores.find((p) => p.id === proveedorId)

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {children || (
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Añadir Proveedor
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Añadir Proveedor</DialogTitle>
          <DialogDescription>Añadir un nuevo proveedor para {materiaPrima.nombre}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="proveedor">Proveedor *</Label>
              <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
                <PopoverTrigger asChild>
                  <Button variant="outline" role="combobox" aria-expanded={openCombobox} className="justify-between">
                    {proveedorSeleccionado ? proveedorSeleccionado.nombre : "Seleccionar proveedor..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Buscar proveedor..." />
                    <CommandList>
                      <CommandEmpty>No se encontraron proveedores.</CommandEmpty>
                      <CommandGroup>
                        {proveedores.map((proveedor) => (
                          <CommandItem
                            key={proveedor.id}
                            value={proveedor.nombre}
                            onSelect={() => {
                              setProveedorId(proveedor.id)
                              setOpenCombobox(false)
                            }}
                          >
                            <Check
                              className={cn("mr-2 h-4 w-4", proveedorId === proveedor.id ? "opacity-100" : "opacity-0")}
                            />
                            <div>
                              <div className="font-medium">{proveedor.nombre}</div>
                              <div className="text-sm text-muted-foreground">{proveedor.email}</div>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="precio">Precio por {materiaPrima.unidadMedida} *</Label>
              <Input
                id="precio"
                type="number"
                step="0.01"
                min="0"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                placeholder="0.00"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="referencia">Referencia del Proveedor</Label>
              <Input
                id="referencia"
                value={referencia}
                onChange={(e) => setReferencia(e.target.value)}
                placeholder="Código o referencia del proveedor"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Guardando..." : "Guardar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
