"use client"

import { useState } from "react"
import { Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function SupervisionFiltros() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 items-center gap-2">
        <div className="relative flex-1 sm:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Buscar supervisión..." className="pl-8" />
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="h-9 gap-1">
              <Filter className="h-3.5 w-3.5" />
              <span className="hidden sm:inline-block">Filtros</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filtros</SheetTitle>
              <SheetDescription>Filtra las supervisiones por diferentes criterios</SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="estado">Estado</Label>
                <Select>
                  <SelectTrigger id="estado">
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="pendiente">Pendiente</SelectItem>
                    <SelectItem value="en_produccion">En producción</SelectItem>
                    <SelectItem value="pausada">Pausada</SelectItem>
                    <SelectItem value="finalizada">Finalizada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="maquina">Máquina</Label>
                <Select>
                  <SelectTrigger id="maquina">
                    <SelectValue placeholder="Seleccionar máquina" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas</SelectItem>
                    <SelectItem value="1">Máquina 1</SelectItem>
                    <SelectItem value="2">Máquina 2</SelectItem>
                    <SelectItem value="3">Máquina 3</SelectItem>
                    <SelectItem value="4">Máquina 4</SelectItem>
                    <SelectItem value="5">Máquina 5</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="supervisor">Supervisor</Label>
                <Select>
                  <SelectTrigger id="supervisor">
                    <SelectValue placeholder="Seleccionar supervisor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="Carlos Mendoza">Carlos Mendoza</SelectItem>
                    <SelectItem value="Ana Gómez">Ana Gómez</SelectItem>
                    <SelectItem value="Miguel Torres">Miguel Torres</SelectItem>
                    <SelectItem value="Sofía Ramírez">Sofía Ramírez</SelectItem>
                    <SelectItem value="Javier López">Javier López</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="eficiencia">Eficiencia mínima</Label>
                <Select>
                  <SelectTrigger id="eficiencia">
                    <SelectValue placeholder="Seleccionar eficiencia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Cualquiera</SelectItem>
                    <SelectItem value="80">Mayor a 80%</SelectItem>
                    <SelectItem value="85">Mayor a 85%</SelectItem>
                    <SelectItem value="90">Mayor a 90%</SelectItem>
                    <SelectItem value="95">Mayor a 95%</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setOpen(false)}>Aplicar filtros</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex gap-2">
        <Link href="/supervision/pendientes">
          <Button variant="outline" size="sm" className="h-9">
            Ver pendientes
          </Button>
        </Link>
      </div>
    </div>
  )
}
