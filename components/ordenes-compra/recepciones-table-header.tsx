import { TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function RecepcionesTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Orden #</TableHead>
        <TableHead>Proveedor</TableHead>
        <TableHead>Fecha</TableHead>
        <TableHead>Responsable</TableHead>
        <TableHead>Materiales</TableHead>
        <TableHead>Tipo</TableHead>
        <TableHead className="text-right">Acciones</TableHead>
      </TableRow>
    </TableHeader>
  )
}
