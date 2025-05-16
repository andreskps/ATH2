import { Suspense } from "react"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getProveedorById, getComprasByProveedorId, getMateriasPrimasByProveedorId } from "@/lib/data/proveedores"
import ProveedorDetalle from "@/components/proveedores/proveedor-detalle"
import ProveedorCompras from "@/components/proveedores/proveedor-compras"
import ProveedorMateriasPrimas from "@/components/proveedores/proveedor-materias-primas"
import ProveedorActions from "@/components/proveedores/proveedor-actions"
import BackButton from "@/components/ui/back-button"

export const metadata: Metadata = {
  title: "Detalle de Proveedor | ATH Plásticos",
  description: "Información detallada del proveedor",
}

export default async function ProveedorPage({ params }: { params: { id: string } }) {
  const proveedor = await getProveedorById(params.id)

  if (!proveedor) {
    notFound()
  }

  const compras = await getComprasByProveedorId(params.id)
  const materiasPrimas = await getMateriasPrimasByProveedorId(params.id)

  return (
    <main className="flex flex-col p-4 md:p-8 gap-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-2">
          <BackButton href="/proveedores" />
          <h1 className="text-2xl font-bold">{proveedor.nombre}</h1>
        </div>
        <ProveedorActions proveedor={proveedor} />
      </div>

      <Tabs defaultValue="detalle" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-3 h-auto">
          <TabsTrigger value="detalle" className="data-[state=active]:bg-primary/10">
            Detalle
          </TabsTrigger>
          <TabsTrigger value="materias-primas" className="data-[state=active]:bg-primary/10">
            Materias Primas
          </TabsTrigger>
          <TabsTrigger value="compras" className="data-[state=active]:bg-primary/10">
            Historial de Compras
          </TabsTrigger>
        </TabsList>
        <TabsContent value="detalle" className="mt-4">
          <Suspense fallback={<div>Cargando información del proveedor...</div>}>
            <ProveedorDetalle proveedor={proveedor} />
          </Suspense>
        </TabsContent>
        <TabsContent value="materias-primas" className="mt-4">
          <Suspense fallback={<div>Cargando materias primas...</div>}>
            <ProveedorMateriasPrimas materiasPrimas={materiasPrimas} />
          </Suspense>
        </TabsContent>
        <TabsContent value="compras" className="mt-4">
          <Suspense fallback={<div>Cargando historial de compras...</div>}>
            <ProveedorCompras compras={compras} />
          </Suspense>
        </TabsContent>
      </Tabs>
    </main>
  )
}
