import { OrdenForm } from "@/components/ordenes/orden-form"
import BackButton from "@/components/ui/back-button"

export const metadata = {
  title: "Nueva Orden - ATH Plásticos",
  description: "Crear una nueva orden de venta",
}

export default function NuevaOrdenPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center">
        <BackButton href="/ordenes" />
        <h1 className="text-2xl font-bold tracking-tight ml-2">Nueva Orden de Venta</h1>
      </div>
      <OrdenForm />
    </div>
  )
}
