import { Skeleton } from "@/components/ui/skeleton"
import { BackButton } from "@/components/ui/back-button"

export default function Loading() {
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
      <div className="space-y-4">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-40 w-full" />
        <div className="flex justify-end space-x-2">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-20" />
        </div>
      </div>
    </div>
  )
}
