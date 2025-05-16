export default function MaquinariaTableHeader() {
  return (
    <thead className="bg-muted/50">
      <tr className="border-b">
        <th className="h-12 px-4 text-left align-middle font-medium">Imagen</th>
        <th className="h-12 px-4 text-left align-middle font-medium">Código</th>
        <th className="h-12 px-4 text-left align-middle font-medium">Nombre</th>
        <th className="h-12 px-4 text-left align-middle font-medium">Tipo</th>
        <th className="h-12 px-4 text-left align-middle font-medium">Marca</th>
        <th className="h-12 px-4 text-left align-middle font-medium">Capacidad</th>
        <th className="h-12 px-4 text-left align-middle font-medium">Estado</th>
        <th className="h-12 px-4 text-right align-middle font-medium">Acciones</th>
      </tr>
    </thead>
  )
}
