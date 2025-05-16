import { Suspense } from "react"
import type { Metadata } from "next"
import { getProveedores } from "@/lib/data/proveedores"
import ProveedoresTable from "@/components/proveedores/proveedores-table"
import ProveedoresTableHeader from "@/components/proveedores/proveedores-table-header"
import ProveedoresTableSkeleton from "@/components/proveedores/proveedores-table-skeleton"
import ProveedoresFiltros from "@/components/proveedores/proveedores-filtros"

export const metadata: Metadata = {
  title: "Proveedores | ATH Plásticos",
  description: "Gestión de proveedores de ATH Plásticos",
}

export default async function ProveedoresPage({
  searchParams,
}: {
  searchParams?: {
    query?: string
    tipo?: string
    estado?: string
    ciudad?: string
    pais?: string
  }
}) {
  const query = searchParams?.query || ""
  const tipo = searchParams?.tipo || ""
  const estado = searchParams?.estado || ""
  const ciudad = searchParams?.ciudad || ""
  const pais = searchParams?.pais || ""

  const proveedores = await getProveedores()

  return (
    <main className="flex flex-col p-4 md:p-8 gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Proveedores</h1>
        <a
          href="/proveedores/nuevo"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          Nuevo Proveedor
        </a>
      </div>

      <div className="grid gap-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <ProveedoresTableHeader />
            <ProveedoresFiltros />
          </div>
          <Suspense fallback={<ProveedoresTableSkeleton />}>
            <ProveedoresTable
              proveedores={proveedores}
              query={query}
              tipo={tipo}
              estado={estado}
              ciudad={ciudad}
              pais={pais}
            />
          </Suspense>
        </div>
      </div>
    </main>
  )
}
