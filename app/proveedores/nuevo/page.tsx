import type { Metadata } from "next"
import ProveedorForm from "@/components/proveedores/proveedor-form"
import BackButton from "@/components/ui/back-button"

export const metadata: Metadata = {
  title: "Nuevo Proveedor | ATH Plásticos",
  description: "Crear un nuevo proveedor en el sistema",
}

export default function NuevoProveedorPage() {
  return (
    <main className="flex flex-col p-4 md:p-8 gap-4">
      <div className="flex items-center gap-2 mb-4">
        <BackButton href="/proveedores" />
        <h1 className="text-2xl font-bold">Nuevo Proveedor</h1>
      </div>

      <ProveedorForm />
    </main>
  )
}
