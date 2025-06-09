"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { obtenerContratos } from "@/lib/data/configuracion"
import { ContratoActions } from "./contrato-actions"
import type { Contrato } from "@/lib/types"

export function ContratosTable() {
  const [contratos] = useState<Contrato[]>(obtenerContratos())

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Lista de Contratos</CardTitle>
          <Badge variant="secondary">{contratos.length} contratos</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {contratos.map((contrato) => (
            <div
              key={contrato.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold">{contrato.nombre}</h3>
                  <Badge variant={contrato.activo ? "default" : "secondary"}>
                    {contrato.activo ? "Activo" : "Inactivo"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{contrato.descripcion}</p>
                <p className="text-xs text-muted-foreground">
                  Creado: {new Date(contrato.fechaCreacion).toLocaleDateString()}
                </p>
              </div>
              <ContratoActions contrato={contrato} />
            </div>
          ))}
          {contratos.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">No se encontraron contratos</div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
