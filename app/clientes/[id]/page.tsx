import { notFound } from "next/navigation"
import { getClienteById, getVentasByClienteId } from "@/lib/data/clientes"
import ClienteDetalle from "@/components/clientes/cliente-detalle"
import ClienteActions from "@/components/clientes/cliente-actions"
import BackButton from "@/components/ui/back-button"
import ClienteVentas from "@/components/clientes/cliente-ventas"

interface ClientePageProps {
  params: {
    id: string
  }
}

export default async function ClientePage({ params }: ClientePageProps) {
  const clienteId = Number.parseInt(params.id)

  if (isNaN(clienteId)) {
    notFound()
  }

  const cliente = await getClienteById(clienteId)

  if (!cliente) {
    notFound()
  }

  const ventas = await getVentasByClienteId(clienteId)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center gap-2">
          <BackButton href="/clientes" />
          <h1 className="text-3xl font-bold tracking-tight">Detalles del Cliente</h1>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">Información detallada del cliente seleccionado.</p>
          <ClienteActions cliente={cliente} />
        </div>
      </div>

      <ClienteDetalle cliente={cliente} />

      <div className="mt-4">
        <h2 className="text-2xl font-bold tracking-tight mb-4">Historial de Ventas</h2>
        <ClienteVentas ventas={ventas} />
      </div>
    </div>
  )
}
