"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { PeticionMaterialWizard } from "@/components/peticion-material/peticion-material-wizard"

export default function NuevaPeticionPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/peticion-material">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Nueva Petición de Material</h1>
          <p className="text-muted-foreground">Solicita materiales para una orden de producción</p>
        </div>
      </div>

      {/* Wizard */}
      <Card>
        <CardContent className="p-6">
          <PeticionMaterialWizard />
        </CardContent>
      </Card>
    </div>
  )
}
