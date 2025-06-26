import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BackButton } from "@/components/ui/back-button"
import { ParametrosComparador } from "@/components/parametros-produccion/parametros-comparador"
import { Download, Save, Merge } from "lucide-react"

export default function CompararParametrosPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <BackButton href="/parametros-produccion" />
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">Comparar Parámetros</h1>
          <p className="text-muted-foreground">Analiza y compara diferentes conjuntos de parámetros de producción.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Merge className="mr-2 h-4 w-4" />
            Crear Híbrido
          </Button>
          <Button variant="outline" size="sm">
            <Save className="mr-2 h-4 w-4" />
            Guardar Análisis
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Comparación de Parámetros</CardTitle>
          <CardDescription>Selecciona los parámetros que deseas comparar y analiza las diferencias.</CardDescription>
        </CardHeader>
        <CardContent>
          <ParametrosComparador />
        </CardContent>
      </Card>
    </div>
  )
}
