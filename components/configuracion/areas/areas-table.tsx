"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { obtenerAreas } from "@/lib/data/configuracion"
import { AreaActions } from "./area-actions"
import type { Area } from "@/lib/types"

export function AreasTable() {
  const [areas] = useState<Area[]>(obtenerAreas())

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Lista de Áreas</CardTitle>
          <Badge variant="secondary">{areas.length} áreas</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {areas.map((area) => (
            <div
              key={area.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold">{area.nombre}</h3>
                  <Badge variant={area.activo ? "default" : "secondary"}>{area.activo ? "Activo" : "Inactivo"}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{area.descripcion}</p>
                <p className="text-xs text-muted-foreground">
                  Creado: {new Date(area.fechaCreacion).toLocaleDateString()}
                </p>
              </div>
              <AreaActions area={area} />
            </div>
          ))}
          {areas.length === 0 && <div className="text-center py-8 text-muted-foreground">No se encontraron áreas</div>}
        </div>
      </CardContent>
    </Card>
  )
}
