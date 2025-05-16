import { Skeleton } from "@/components/ui/skeleton"

export function EntregasTableSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <tr key={i} className="border-b">
          <td className="p-4">
            <Skeleton className="h-6 w-[180px]" />
          </td>
          <td className="p-4">
            <Skeleton className="h-6 w-[150px]" />
          </td>
          <td className="p-4">
            <Skeleton className="h-6 w-[60px]" />
          </td>
          <td className="p-4">
            <Skeleton className="h-6 w-[60px]" />
          </td>
          <td className="p-4">
            <Skeleton className="h-6 w-[120px]" />
          </td>
          <td className="p-4">
            <Skeleton className="h-6 w-[100px]" />
          </td>
          <td className="p-4 text-right">
            <Skeleton className="ml-auto h-9 w-[100px]" />
          </td>
        </tr>
      ))}
    </>
  )
}
