import { Skeleton } from "@/components/ui/skeleton"

export function InventarioTableSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <tr key={i} className="hover:bg-muted/50">
          <td className="p-4">
            <Skeleton className="h-5 w-[150px]" />
          </td>
          <td className="p-4">
            <Skeleton className="h-5 w-[120px]" />
          </td>
          <td className="p-4">
            <Skeleton className="h-5 w-[60px]" />
          </td>
          <td className="p-4 text-center">
            <Skeleton className="h-5 w-[40px] mx-auto" />
          </td>
          <td className="p-4 text-center">
            <Skeleton className="h-5 w-[40px] mx-auto" />
          </td>
          <td className="p-4 text-center">
            <Skeleton className="h-6 w-[80px] mx-auto rounded-full" />
          </td>
          <td className="p-4 text-right">
            <div className="flex justify-end gap-2">
              <Skeleton className="h-9 w-9 rounded-md" />
              <Skeleton className="h-9 w-9 rounded-md" />
            </div>
          </td>
        </tr>
      ))}
    </>
  )
}
