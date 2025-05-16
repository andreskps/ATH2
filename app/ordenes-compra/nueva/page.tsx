import { BackButton } from "@/components/ui/back-button"
import { OrdenCompraForm } from "@/components/ordenes-compra/orden-compra-form"

export default function NuevaOrdenCompraPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <BackButton href="/ordenes-compra" />
          <h2 className="text-2xl font-semibold tracking-tight">Nueva Orden de Compra</h2>
          <p className="text-sm text-muted-foreground">
            Crea una nueva orden de compra para solicitar materias primas a proveedores.
          </p>
        </div>
      </div>
      <OrdenCompraForm />
    </div>
  )
}
