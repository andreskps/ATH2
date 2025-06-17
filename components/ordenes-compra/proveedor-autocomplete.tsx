"use client"

import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Simulación de datos de proveedores
const proveedores = [
  { id: "prov-001", nombre: "Polímeros Industriales S.A." },
  { id: "prov-002", nombre: "Químicos del Norte" },
  { id: "prov-003", nombre: "Plásticos Reciclados S.A." },
  { id: "prov-004", nombre: "Colorantes Industriales" },
  { id: "prov-005", nombre: "Distribuidora de Resinas" },
  { id: "prov-006", nombre: "Aditivos Especiales" },
  { id: "prov-007", nombre: "Materiales Avanzados" },
]

interface ProveedorAutocompleteProps {
  value?: string
  onValueChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
}

export function ProveedorAutocomplete({
  value,
  onValueChange,
  placeholder = "Seleccionar proveedor...",
  disabled = false,
}: ProveedorAutocompleteProps) {
  const [open, setOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")

  const selectedProveedor = proveedores.find((proveedor) => proveedor.id === value)

  const filteredProveedores = proveedores.filter((proveedor) =>
    proveedor.nombre.toLowerCase().includes(searchValue.toLowerCase()),
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          disabled={disabled}
        >
          {selectedProveedor ? selectedProveedor.nombre : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Buscar proveedor..." value={searchValue} onValueChange={setSearchValue} />
          <CommandList>
            <CommandEmpty>No se encontraron proveedores.</CommandEmpty>
            <CommandGroup>
              {filteredProveedores.map((proveedor) => (
                <CommandItem
                  key={proveedor.id}
                  value={proveedor.id}
                  onSelect={(currentValue) => {
                    onValueChange(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", value === proveedor.id ? "opacity-100" : "opacity-0")} />
                  {proveedor.nombre}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
