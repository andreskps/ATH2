"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, Play, Pause, CheckCircle, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  supervisiones,
  getEstadoSupervisionLabel,
  getEstadoSupervisionColor,
  calcularProgreso,
} from "@/lib/data/supervision"
import { cn } from "@/lib/utils"

export default function SupervisionTable() {
  const [data, setData] = useState(supervisiones)

  return (
    <div className="divide-y">
      {data.length === 0 ? (
        <div className="p-4 text-center text-sm text-muted-foreground">No se encontraron supervisiones</div>
      ) : (
        data.map((supervision) => {
          const progreso = calcularProgreso(supervision.cantidadProducida, supervision.cantidadProgramada)

          return (
            <div key={supervision.id} className="grid grid-cols-8 gap-3 p-4">
              <div className="truncate font-medium">{supervision.ordenId}</div>
              <div className="truncate">Producto {supervision.productoId}</div>
              <div className="truncate">Máquina {supervision.maquinaId}</div>
              <div className="truncate">{supervision.supervisor}</div>
              <div>
                <Badge variant="outline" className={cn("capitalize", getEstadoSupervisionColor(supervision.estado))}>
                  {getEstadoSupervisionLabel(supervision.estado)}
                </Badge>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Progress value={progreso} className="h-2" />
                  <span className="text-xs text-muted-foreground">{progreso}%</span>
                </div>
              </div>
              <div>
                <Badge
                  variant={
                    supervision.eficienciaGeneral > 95
                      ? "success"
                      : supervision.eficienciaGeneral > 85
                        ? "default"
                        : "destructive"
                  }
                >
                  {supervision.eficienciaGeneral}%
                </Badge>
              </div>
              <div className="flex justify-end gap-2">
                <Link href={`/supervision/${supervision.id}`}>
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">Ver detalles</span>
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Más acciones</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {supervision.estado === "pendiente" && (
                      <DropdownMenuItem>
                        <Play className="mr-2 h-4 w-4" />
                        <span>Iniciar producción</span>
                      </DropdownMenuItem>
                    )}
                    {supervision.estado === "en_produccion" && (
                      <DropdownMenuItem>
                        <Pause className="mr-2 h-4 w-4" />
                        <span>Pausar producción</span>
                      </DropdownMenuItem>
                    )}
                    {supervision.estado === "pausada" && (
                      <DropdownMenuItem>
                        <Play className="mr-2 h-4 w-4" />
                        <span>Reanudar producción</span>
                      </DropdownMenuItem>
                    )}
                    {(supervision.estado === "en_produccion" || supervision.estado === "pausada") && (
                      <DropdownMenuItem>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        <span>Finalizar producción</span>
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          )
        })
      )}
    </div>
  )
}
