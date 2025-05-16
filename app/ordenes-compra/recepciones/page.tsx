import { Suspense } from "react"
import { getRecepciones } from "@/lib/data/ordenes-compra"
import { RecepcionesTable } from "@/components/ordenes-compra/recepciones-table"
import { RecepcionesFiltros } from "@/components/ordenes-compra/recepciones-filtros"
import { RecepcionesTableSkeleton } from "@/components/ordenes-compra/recepciones-table-skeleton"

interface PageProps {
  searchParams: {
    busqueda?: string
    fechaDesde?: string
    fechaHasta?: string
  }
}

export default async function RecepcionesPage({ searchParams }: PageProps) {
  // Obtener todas las recepciones
  const recepciones = await getRecepciones()

  // Filtrar recepciones según los parámetros de búsqueda
  let recepcionesFiltradas = [...recepciones]

  // Filtrar por búsqueda (orden, proveedor o responsable)
  if (searchParams.busqueda) {
    const busqueda = searchParams.busqueda.toLowerCase()
    recepcionesFiltradas = recepcionesFiltradas.filter(
      (recepcion) =>
        recepcion.ordenNumero?.toLowerCase().includes(busqueda) ||
        recepcion.proveedorNombre?.toLowerCase().includes(busqueda) ||
        recepcion.usuarioNombre.toLowerCase().includes(busqueda),
    )
  }

  // Filtrar por fecha desde
  if (searchParams.fechaDesde) {
    const fechaDesde = new Date(searchParams.fechaDesde)
    recepcionesFiltradas = recepcionesFiltradas.filter((recepcion) => new Date(recepcion.fecha) >= fechaDesde)
  }

  // Filtrar por fecha hasta
  if (searchParams.fechaHasta) {
    const fechaHasta = new Date(searchParams.fechaHasta)
    recepcionesFiltradas = recepcionesFiltradas.filter((recepcion) => new Date(recepcion.fecha) <= fechaHasta)
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Historial de Recepciones</h1>
        <p className="text-muted-foreground">
          Consulta el historial de recepciones de material para todas las órdenes de compra
        </p>
      </div>

      <RecepcionesFiltros />

      <Suspense fallback={<RecepcionesTableSkeleton />}>
        <RecepcionesTable recepciones={recepcionesFiltradas} />
      </Suspense>
    </div>
  )
}
