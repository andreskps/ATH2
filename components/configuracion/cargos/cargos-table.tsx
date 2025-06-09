"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { obtenerCargos } from "@/lib/data/configuracion"
import { CargoActions } from "./cargo-actions"
import type { Cargo } from "@/lib/types"

export function CargosTable() {
  const [cargos] = useState<Cargo[]>(obtenerCargos())

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Lista de Cargos</CardTitle>
          <Badge variant="secondary">{cargos.length} cargos</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {cargos.map((cargo) => (
            <div
              key={cargo.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold">{cargo.nombre}</h3>
                  <Badge variant={cargo.activo ? "default" : "secondary"}>{cargo.activo ? "Activo" : "Inactivo"}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{cargo.descripcion}</p>
                <p className="text-xs text-muted-foreground">
                  Creado: {new Date(cargo.fechaCreacion).toLocaleDateString()}
                </p>
              </div>
              <CargoActions cargo={cargo} />
            </div>
          ))}
          {cargos.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">No se encontraron cargos</div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
