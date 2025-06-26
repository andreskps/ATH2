import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ParametroForm } from "@/components/parametros-produccion/parametro-form"
import { BackButton } from "@/components/ui/back-button"

interface EditarParametroPageProps {
  params: {
    id: string
  }
}

export default function EditarParametroPage({ params }: EditarParametroPageProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <BackButton href={`/parametros-produccion/${params.id}`} />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Editar Parámetro</h1>
          <p className="text-muted-foreground">Modifica los parámetros técnicos de producción.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Configuración de Parámetros</CardTitle>
          <CardDescription>Actualiza los valores según sea necesario.</CardDescription>
        </CardHeader>
        <CardContent>
          <ParametroForm parametroId={params.id} />
        </CardContent>
      </Card>
    </div>
  )
}
