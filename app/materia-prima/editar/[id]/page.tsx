import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { MateriaPrimaForm } from "@/components/materia-prima/materia-prima-form"
import BackButton from "@/components/ui/back-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getMateriaPrimaById } from "@/lib/data/materia-prima"

export const metadata: Metadata = {
  title: "Editar Materia Prima | ATH Plásticos",
  description: "Modificar información de materia prima",
}

interface EditarMateriaPrimaPageProps {
  params: {
    id: string
  }
}

export default async function EditarMateriaPrimaPage({ params }: EditarMateriaPrimaPageProps) {
  const materiaPrima = await getMateriaPrimaById(params.id)

  if (!materiaPrima) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center gap-2">
        <BackButton href={`/materia-prima/${params.id}`} />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Editar Materia Prima</h1>
          <p className="text-muted-foreground">
            Modificar información de {materiaPrima.nombre} ({materiaPrima.codigo})
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Información de la Materia Prima</CardTitle>
          <CardDescription>Actualiza los datos de la materia prima</CardDescription>
        </CardHeader>
        <CardContent>
          <MateriaPrimaForm materiaPrima={materiaPrima} />
        </CardContent>
      </Card>
    </div>
  )
}
