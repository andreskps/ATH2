import { Skeleton } from "@/components/ui/skeleton"

export default function ProveedoresTableSkeleton() {
  return (
    <div className="rounded-md border">
      <div className="relative w-full overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <thead className="[&_tr]:border-b">
            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Logo</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Nombre</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">NIT</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Tipo</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Ciudad</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Estado</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Acciones</th>
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {Array.from({ length: 5 }).map((_, index) => (
              <tr key={index} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td className="p-4 align-middle">
                  <Skeleton className="h-10 w-10 rounded-md" />
                </td>
                <td className="p-4 align-middle">
                  <Skeleton className="h-5 w-40" />
                </td>
                <td className="p-4 align-middle">
                  <Skeleton className="h-5 w-28" />
                </td>
                <td className="p-4 align-middle">
                  <Skeleton className="h-5 w-24" />
                </td>
                <td className="p-4 align-middle">
                  <Skeleton className="h-5 w-20" />
                </td>
                <td className="p-4 align-middle">
                  <Skeleton className="h-5 w-16" />
                </td>
                <td className="p-4 align-middle">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-8 rounded-md" />
                    <Skeleton className="h-8 w-8 rounded-md" />
                    <Skeleton className="h-8 w-8 rounded-md" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
