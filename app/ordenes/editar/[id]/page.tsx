import { redirect } from "next/navigation"
import BackButton from "@/components/ui/back-button"
import { OrdenForm } from "@/components/ordenes/orden-form"
import { getOrdenById } from "@/lib/data/ordenes"

export const metadata = {
  title: "Editar Orden - ATH Plásticos",
  description: "Editar una orden existente",
}

export default function EditarOrdenPage({ params }: { params: { id: string } }) {
  const ordenId = Number.parseInt(params.id)
  const orden = getOrdenById(ordenId)

  // Redirect if order doesn't exist
  if (!orden) {
    redirect("/ordenes")
  }

  // Redirect if order is not in 'ordenAbierta' state
  if (orden.estado !== "ordenAbierta") {
    redirect(`/ordenes/${ordenId}`)
  }

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8">
      <div className="flex items-center">
        <BackButton href={`/ordenes/${ordenId}`} />
        <h1 className="text-2xl font-bold tracking-tight ml-2">Editar Orden: {orden.codigo}</h1>
      </div>

      <OrdenForm orden={orden} />
    </div>
  )
}
