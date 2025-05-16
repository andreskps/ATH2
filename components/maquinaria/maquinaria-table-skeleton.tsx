import { Skeleton } from "@/components/ui/skeleton"
import MaquinariaTableHeader from "./maquinaria-table-header"

export default function MaquinariaTableSkeleton() {
  return (
    <div className="rounded-md border">
      <div className="relative w-full overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <MaquinariaTableHeader />
          <tbody className="divide-y">
            {Array.from({ length: 5 }).map((_, index) => (
              <tr key={index}>
                <td className="p-2 pl-4">
                  <Skeleton className="h-12 w-12 rounded-md" />
                </td>
                <td className="p-4">
                  <Skeleton className="h-4 w-16" />
                </td>
                <td className="p-4">
                  <Skeleton className="h-4 w-40" />
                </td>
                <td className="p-4">
                  <Skeleton className="h-4 w-24" />
                </td>
                <td className="p-4">
                  <Skeleton className="h-4 w-20" />
                </td>
                <td className="p-4">
                  <Skeleton className="h-4 w-24" />
                </td>
                <td className="p-4">
                  <Skeleton className="h-4 w-20" />
                </td>
                <td className="p-4 text-right">
                  <Skeleton className="h-8 w-8 rounded-full ml-auto" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
