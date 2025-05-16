"use client"

import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function PermisosTableHeader() {
  const router = useRouter()

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Permisos</h1>
        <p className="text-muted-foreground">
          Gestiona los permisos del sistema para controlar el acceso a las funcionalidades.
        </p>
      </div>
      <Button onClick={() => router.push("/admin/permisos/nuevo")}>
        <PlusCircle className="mr-2 h-4 w-4" />
        Nuevo Permiso
      </Button>
    </div>
  )
}
