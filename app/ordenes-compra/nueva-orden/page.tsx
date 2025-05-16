"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { OrdenCompraForm } from "@/components/ordenes-compra/orden-compra-form"

export default function NuevaOrdenCompraPage() {
  const searchParams = useSearchParams()
  const [initialData, setInitialData] = useState<any>(null)

  useEffect(() => {
    // Verificar si hay parámetros en la URL
    if (searchParams.has("materiaPrimaId")) {
      // Crear un objeto con los datos iniciales
      const data = {
        items: [
          {
            id: Math.random().toString(36).substring(7),
            materiaPrimaId: searchParams.get("materiaPrimaId") || "",
            materiaPrimaNombre: searchParams.get("materiaPrimaNombre") || "",
            cantidad: Number(searchParams.get("cantidad")) || 0,
            unidad: searchParams.get("unidad") || "",
            precioUnitario: Number(searchParams.get("precio")) || 0,
            comentario: "Reabastecimiento por stock bajo",
          },
        ],
        proveedorId: searchParams.get("proveedorId") || "",
        proveedorNombre: searchParams.get("proveedorNombre") || "",
        comentarios: "Orden generada automáticamente para reabastecer materia prima con stock bajo.",
      }

      setInitialData(data)
    }
  }, [searchParams])

  return (
    <div className="container py-6">
      <OrdenCompraForm initialData={initialData} />
    </div>
  )
}
