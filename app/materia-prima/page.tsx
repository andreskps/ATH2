import type { Metadata } from "next"
import { Suspense } from "react"
import { MateriaPrimaTableHeader } from "@/components/materia-prima/materia-prima-table-header"
import { MateriaPrimaTable } from "@/components/materia-prima/materia-prima-table"
import { MateriaPrimaTableSkeleton } from "@/components/materia-prima/materia-prima-table-skeleton"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Materia Prima | ATH Plásticos",
  description: "Gestión de materia prima para la producción",
}

export default function MateriaPrimaPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Materia Prima</h1>
          <p className="text-muted-foreground">Gestiona el inventario de materia prima para la producción</p>
        </div>
        <Button asChild>
          <Link href="/materia-prima/nuevo">
            <Plus className="mr-2 h-4 w-4" />
            Nueva Materia Prima
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Materias Primas</CardTitle>
            <CardDescription>Inventario actual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Stock Crítico</CardTitle>
            <CardDescription>Materias primas con stock bajo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">1</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Valor de Inventario</CardTitle>
            <CardDescription>Valor total del inventario</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,450.00</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <MateriaPrimaTableHeader />
          </CardHeader>
          <CardContent>
            <Suspense fallback={<MateriaPrimaTableSkeleton />}>
              <MateriaPrimaTable />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
