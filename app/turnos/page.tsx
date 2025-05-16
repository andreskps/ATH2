import Link from "next/link"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, Plus, Users } from "lucide-react"
import TurnosTable from "@/components/turnos/turnos-table"
import TurnosFiltros from "@/components/turnos/turnos-filtros"
import TurnosCalendario from "@/components/turnos/turnos-calendario"

export const metadata: Metadata = {
  title: "Turnos | ATH Plásticos",
  description: "Gestión de turnos de producción",
}

export default function TurnosPage() {
  return (
    <div className="flex flex-col space-y-6 p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Turnos</h1>
          <p className="text-muted-foreground">Gestiona los turnos de producción y equipos de trabajo</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button asChild>
            <Link href="/turnos/crear">
              <Plus className="mr-2 h-4 w-4" />
              Crear Turno
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/turnos/equipos">
              <Users className="mr-2 h-4 w-4" />
              Ver Equipos
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="tabla" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-2">
          <TabsTrigger value="tabla">
            <Users className="mr-2 h-4 w-4" />
            Tabla
          </TabsTrigger>
          <TabsTrigger value="calendario">
            <CalendarDays className="mr-2 h-4 w-4" />
            Calendario
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tabla" className="space-y-4">
          <TurnosFiltros />
          <TurnosTable />
        </TabsContent>
        <TabsContent value="calendario">
          <TurnosCalendario />
        </TabsContent>
      </Tabs>
    </div>
  )
}
