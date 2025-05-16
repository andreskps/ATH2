import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BackButton } from "@/components/ui/back-button"
import { Play } from "lucide-react"

export const metadata: Metadata = {
  title: "Programaciones Pendientes | ATH Plásticos",
  description: "Listado de programaciones pendientes de iniciar",
}

// Datos de ejemplo para programaciones pendientes
const programacionesPendientes = [
  {
    id: "1",
    ordenId: "ORD-2023-006",
    productoId: "3",
    maquinaId: "2",
    cantidadProgramada: 5000,
    fechaProgramada: new Date(2023, 5, 16, 8, 0, 0),
    prioridad: "alta",
  },
  {
    id: "2",
    ordenId: "ORD-2023-007",
    productoId: "1",
    maquinaId: "1",
    cantidadProgramada: 3000,
    fechaProgramada: new Date(2023, 5, 16, 14, 0, 0),
    prioridad: "media",
  },
  {
    id: "3",
    ordenId: "ORD-2023-008",
    productoId: "5",
    maquinaId: "3",
    cantidadProgramada: 8000,
    fechaProgramada: new Date(2023, 5, 17, 7, 0, 0),
    prioridad: "baja",
  },
]

export default function ProgramacionesPendientesPage() {
  return (
    <main className="flex flex-col gap-8 p-4 sm:p-8">
      <div className="flex items-center gap-4">
        <BackButton href="/supervision" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Programaciones pendientes</h1>
          <p className="text-muted-foreground">Selecciona una programación para iniciar la supervisión</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {programacionesPendientes.map((programacion) => (
          <Card key={programacion.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>{programacion.ordenId}</CardTitle>
                <Badge
                  variant={
                    programacion.prioridad === "alta"
                      ? "destructive"
                      : programacion.prioridad === "media"
                        ? "default"
                        : "outline"
                  }
                >
                  {programacion.prioridad === "alta"
                    ? "Alta prioridad"
                    : programacion.prioridad === "media"
                      ? "Media prioridad"
                      : "Baja prioridad"}
                </Badge>
              </div>
              <CardDescription>Programada para: {programacion.fechaProgramada.toLocaleString()}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Producto</p>
                    <p className="font-medium">Producto {programacion.productoId}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Máquina</p>
                    <p className="font-medium">Máquina {programacion.maquinaId}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-muted-foreground">Cantidad programada</p>
                    <p className="font-medium">{programacion.cantidadProgramada.toLocaleString()} unidades</p>
                  </div>
                </div>

                <Link href={`/supervision/iniciar/${programacion.id}`}>
                  <Button className="w-full gap-2">
                    <Play className="h-4 w-4" />
                    Iniciar supervisión
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  )
}
