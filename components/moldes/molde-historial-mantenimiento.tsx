import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import type { Molde } from "@/lib/types"

interface MoldeHistorialMantenimientoProps {
  molde: Molde
}

export default function MoldeHistorialMantenimiento({ molde }: MoldeHistorialMantenimientoProps) {
  // Datos de ejemplo para el historial de mantenimiento
  const historialMantenimiento = [
    {
      id: 1,
      fecha: "2023-05-15",
      tipo: "Preventivo",
      descripcion: "Limpieza general y lubricación",
      responsable: "Juan Pérez",
      estado: "Completado",
    },
    {
      id: 2,
      fecha: "2023-08-22",
      tipo: "Correctivo",
      descripcion: "Reparación de sistema de expulsión",
      responsable: "María López",
      estado: "Completado",
    },
    {
      id: 3,
      fecha: "2023-11-10",
      tipo: "Preventivo",
      descripcion: "Revisión de desgaste y ajustes",
      responsable: "Carlos Rodríguez",
      estado: "Pendiente",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button size="sm">
          <PlusCircle className="mr-2 h-4 w-4" />
          Registrar Mantenimiento
        </Button>
      </div>

      {historialMantenimiento.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fecha</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Responsable</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {historialMantenimiento.map((mantenimiento) => (
              <TableRow key={mantenimiento.id}>
                <TableCell>{mantenimiento.fecha}</TableCell>
                <TableCell>{mantenimiento.tipo}</TableCell>
                <TableCell>{mantenimiento.descripcion}</TableCell>
                <TableCell>{mantenimiento.responsable}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      mantenimiento.estado === "Completado"
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : "bg-amber-100 text-amber-800 hover:bg-amber-100"
                    }
                  >
                    {mantenimiento.estado}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    Ver detalles
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-muted-foreground">No hay registros de mantenimiento para este molde.</p>
          <Button variant="outline" size="sm" className="mt-4">
            <PlusCircle className="mr-2 h-4 w-4" />
            Registrar Primer Mantenimiento
          </Button>
        </div>
      )}
    </div>
  )
}
