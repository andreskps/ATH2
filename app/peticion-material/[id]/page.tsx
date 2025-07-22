"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Check, X, Edit, Package } from "lucide-react"
import Link from "next/link"
import { peticionesMaterial } from "@/lib/data/peticion-material"
import { PeticionMaterialDetalle } from "@/components/peticion-material/peticion-material-detalle"

interface Props {
  params: {
    id: string
  }
}

export default function DetallePeticionPage({ params }: Props) {
  const peticion = peticionesMaterial.find((p) => p.id === params.id)

  if (!peticion) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/peticion-material">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Petición no encontrada</h1>
        </div>
        <Card>
          <CardContent className="p-12 text-center">
            <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Petición no encontrada</h3>
            <p className="text-muted-foreground">La petición solicitada no existe o ha sido eliminada.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/peticion-material">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Petición #{peticion.id}</h1>
            <p className="text-muted-foreground">Detalle de la solicitud de material</p>
          </div>
        </div>

        <div className="flex gap-2">
          {peticion.estado === "pendiente" && (
            <>
              <Button className="bg-green-600 hover:bg-green-700">
                <Check className="w-4 h-4 mr-2" />
                Aprobar
              </Button>
              <Button variant="destructive">
                <X className="w-4 h-4 mr-2" />
                Rechazar
              </Button>
              <Button variant="outline">
                <Edit className="w-4 h-4 mr-2" />
                Editar
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Detalle de la petición */}
      <PeticionMaterialDetalle peticion={peticion} />
    </div>
  )
}
