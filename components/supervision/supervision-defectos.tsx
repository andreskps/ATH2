"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Plus } from "lucide-react"
import { getDefectosPorSupervision, type TipoDefecto } from "@/lib/data/supervision"

interface SupervisionDefectosProps {
  supervisionId: string
}

export default function SupervisionDefectos({ supervisionId }: SupervisionDefectosProps) {
  const [defectos, setDefectos] = useState(getDefectosPorSupervision(supervisionId))
  const [openDialog, setOpenDialog] = useState(false)

  const tiposDefecto: TipoDefecto[] = [
    "Rebabas",
    "Rechupes",
    "Líneas de flujo",
    "Burbujas",
    "Deformación",
    "Manchas",
    "Piezas incompletas",
    "Otro",
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para guardar el defecto
    setOpenDialog(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Registro de defectos</h3>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1">
              <Plus className="h-4 w-4" />
              Registrar defectos
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Registrar defectos</DialogTitle>
              <DialogDescription>Ingresa los datos de los defectos detectados</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="tipo">Tipo de defecto</Label>
                  <Select>
                    <SelectTrigger id="tipo">
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {tiposDefecto.map((tipo) => (
                        <SelectItem key={tipo} value={tipo}>
                          {tipo}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cantidad">Cantidad</Label>
                  <Input id="cantidad" type="number" min="1" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="descripcion">Descripción</Label>
                  <Textarea id="descripcion" placeholder="Describe el defecto detectado" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accionCorrectiva">Acción correctiva</Label>
                  <Textarea
                    id="accionCorrectiva"
                    placeholder="Describe la acción tomada para corregir el defecto"
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Guardar registro</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {defectos.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">No hay defectos registrados</CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tipo</TableHead>
                  <TableHead className="text-right">Cantidad</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead>Acción correctiva</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {defectos.map((defecto) => (
                  <TableRow key={defecto.id}>
                    <TableCell>
                      <Badge variant="outline">{defecto.tipo}</Badge>
                    </TableCell>
                    <TableCell className="text-right">{defecto.cantidad}</TableCell>
                    <TableCell>{defecto.fecha.toLocaleTimeString()}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{defecto.descripcion}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{defecto.accionCorrectiva}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Análisis de defectos</CardTitle>
          <CardDescription>Distribución de defectos por tipo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Total defectos</h4>
                <p className="text-2xl font-bold">{defectos.reduce((sum, d) => sum + d.cantidad, 0)}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Tipos diferentes</h4>
                <p className="text-2xl font-bold">{new Set(defectos.map((d) => d.tipo)).size}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Defecto principal</h4>
                <p className="text-2xl font-bold">
                  {defectos.length > 0
                    ? defectos.reduce((prev, current) => (prev.cantidad > current.cantidad ? prev : current)).tipo
                    : "N/A"}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="mb-2 text-sm font-medium">Distribución por tipo</h4>
              <div className="h-[150px] flex items-center justify-center">
                <p className="text-sm text-muted-foreground">Gráfico de distribución de defectos</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
