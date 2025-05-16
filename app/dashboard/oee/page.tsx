import type { Metadata } from "next"
import OEEDashboard from "@/components/dashboard/oee-dashboard"

export const metadata: Metadata = {
  title: "Dashboard OEE | ATH",
  description: "Dashboard de OEE (Overall Equipment Effectiveness) y estadísticas de producción",
}

export default function OEEPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="grid gap-4">
        <div className="grid gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard OEE</h1>
          <p className="text-muted-foreground">
            Monitoreo de OEE (Overall Equipment Effectiveness), disponibilidad, rendimiento y calidad de producción.
          </p>
        </div>
        <OEEDashboard />
      </div>
    </div>
  )
}
