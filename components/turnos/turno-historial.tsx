import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Turno } from "@/lib/data/turnos"

interface TurnoHistorialProps {
  turno: Turno
}

export default function TurnoHistorial({ turno }: TurnoHistorialProps) {
  // Simulamos un historial de cambios basado en las fechas de creación y actualización
  const historial = [
    {
      id: 1,
      fecha: turno.createdAt,
      accion: "Turno creado",
      usuario: "Admin",
      detalles: `Se creó el turno ${turno.categoria} para el área de ${turno.area}`,
    },
  ]

  // Si la fecha de actualización es diferente a la de creación, añadimos una entrada al historial
  if (turno.updatedAt !== turno.createdAt) {
    historial.push({
      id: 2,
      fecha: turno.updatedAt,
      accion: "Turno actualizado",
      usuario: "Admin",
      detalles: `Se actualizó el estado del turno a "${turno.estado}"`,
    })
  }

  // Función para formatear la fecha
  const formatFecha = (fechaStr: string) => {
    const fecha = new Date(fechaStr)
    return fecha.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Historial de Cambios</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-4 text-muted-foreground">Funcionalidad de historial de cambios desactivada.</div>
      </CardContent>
    </Card>
  )
}
