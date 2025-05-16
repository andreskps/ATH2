import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getProveedorById } from "@/lib/data/proveedores"
import ProveedorForm from "@/components/proveedores/proveedor-form"
import BackButton from "@/components/ui/back-button"

export const metadata: Metadata = {
  title: "Editar Proveedor | ATH Plásticos",
  description: "Editar información de proveedor",
}

export default async function EditarProveedorPage({ params }: { params: { id: string } }) {
  const proveedor = await getProveedorById(params.id)

  if (!proveedor) {
    notFound()
  }

  return (
    <main className="flex flex-col p-4 md:p-8 gap-4">
      <div className="flex items-center gap-2 mb-4">
        <BackButton href={`/proveedores/${params.id}`} />
        <h1 className="text-2xl font-bold">Editar Proveedor</h1>
      </div>

      <ProveedorForm proveedor={proveedor} />
    </main>
  )
}
