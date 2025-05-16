import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import BackButton from "@/components/ui/back-button"
import MoldeForm from "@/components/moldes/molde-form"

export default function NuevoMoldePage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center gap-2">
        <BackButton />
        <h1 className="text-3xl font-bold tracking-tight">Crear Nuevo Molde</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Información del Molde</CardTitle>
          <CardDescription>Completa la información para registrar un nuevo molde en el sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <MoldeForm />
        </CardContent>
      </Card>
    </div>
  )
}
