"use client"

import { Suspense } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { TiposTable } from "@/components/dotacion/tipos/tipos-table"
import { TipoForm } from "@/components/dotacion/tipos/tipo-form"
import { getTiposDotacion } from "@/lib/data/dotacion"

export default async function TiposDotacionPage() {
  const tipos = await getTiposDotacion()

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tipos de Dotación</h1>
          <p className="text-muted-foreground">
            Gestiona los diferentes tipos de dotación disponibles para los empleados
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Agregar Tipo
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <TipoForm onClose={() => {}} />
          </DialogContent>
        </Dialog>
      </div>

      <Suspense fallback={<TiposTable tipos={[]} isLoading={true} />}>
        <TiposTable tipos={tipos} />
      </Suspense>
    </div>
  )
}
