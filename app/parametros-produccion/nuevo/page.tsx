import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ParametroWizard } from "@/components/parametros-produccion/parametro-wizard"
import { BackButton } from "@/components/ui/back-button"

export default function NuevoParametroPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <BackButton href="/parametros-produccion" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Nuevo Parámetro de Producción</h1>
          <p className="text-muted-foreground">Crea un nuevo conjunto de parámetros técnicos para la producción.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Configuración de Parámetros</CardTitle>
          <CardDescription>Completa los siguientes pasos para crear el nuevo parámetro.</CardDescription>
        </CardHeader>
        <CardContent>
          <ParametroWizard />
        </CardContent>
      </Card>
    </div>
  )
}
