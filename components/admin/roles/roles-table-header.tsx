"use client"

import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function RolesTableHeader() {
  const router = useRouter()

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Roles y Permisos</h1>
        <p className="text-muted-foreground">Gestiona los roles y permisos del sistema</p>
      </div>
      <Button onClick={() => router.push("/admin/roles/nuevo")} className="gap-2">
        <PlusCircle className="h-4 w-4" />
        Nuevo Rol
      </Button>
    </div>
  )
}
