import type { Metadata } from "next"
import { MateriaPrimaForm } from "@/components/materia-prima/materia-prima-form"
import BackButton from "@/components/ui/back-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Nueva Materia Prima | ATH Plásticos",
  description: "Crear un nuevo registro de materia prima",
}

export default function NuevaMateriaPrimaPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center gap-2">
        <BackButton href="/materia-prima" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Nueva Materia Prima</h1>
          <p className="text-muted-foreground">Crear un nuevo registro de materia prima en el sistema</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Información de la Materia Prima</CardTitle>
          <CardDescription>Ingresa los datos básicos de la materia prima a registrar</CardDescription>
        </CardHeader>
        <CardContent>
          <MateriaPrimaForm />
        </CardContent>
      </Card>
    </div>
  )
}
