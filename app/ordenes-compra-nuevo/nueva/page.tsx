import { OrdenCompraForm } from "@/components/ordenes-compra-nuevo/orden-compra-form"
import { BackButton } from "@/components/ui/back-button"

export default function NuevaOrdenCompraPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <BackButton />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Nueva Orden de Compra</h1>
          <p className="text-muted-foreground">Crea una nueva orden de compra para materia prima</p>
        </div>
      </div>

      <OrdenCompraForm />
    </div>
  )
}
