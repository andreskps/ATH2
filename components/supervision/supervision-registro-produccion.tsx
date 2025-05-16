"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
import { Plus } from "lucide-react"
import { getRegistrosPorSupervision } from "@/lib/data/supervision"

interface SupervisionRegistroProduccionProps {
  supervisionId: string
}

export default function SupervisionRegistroProduccion({ supervisionId }: SupervisionRegistroProduccionProps) {
  const [registros, setRegistros] = useState(getRegistrosPorSupervision(supervisionId))
  const [openDialog, setOpenDialog] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para guardar el registro
    setOpenDialog(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Registros de producción</h3>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1">
              <Plus className="h-4 w-4" />
              Nuevo registro
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Registrar producción</DialogTitle>
              <DialogDescription>Ingresa los datos de producción para el período actual</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cantidadProducida">Cantidad producida</Label>
                    <Input id="cantidadProducida" type="number" min="0" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cantidadDefectuosa">Cantidad defectuosa</Label>
                    <Input id="cantidadDefectuosa" type="number" min="0" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eficiencia">Eficiencia (%)</Label>
                  <Input id="eficiencia" type="number" min="0" max="100" step="0.1" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="observaciones">Observaciones</Label>
                  <Textarea id="observaciones" placeholder="Ingresa cualquier observación relevante" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Guardar registro</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {registros.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            No hay registros de producción disponibles
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha y hora</TableHead>
                  <TableHead className="text-right">Producidas</TableHead>
                  <TableHead className="text-right">Defectuosas</TableHead>
                  <TableHead className="text-right">Eficiencia</TableHead>
                  <TableHead>Observaciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {registros.map((registro) => (
                  <TableRow key={registro.id}>
                    <TableCell>{registro.fecha.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{registro.cantidadProducida.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{registro.cantidadDefectuosa.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{registro.eficiencia}%</TableCell>
                    <TableCell className="max-w-[200px] truncate">{registro.observaciones}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Resumen de producción</CardTitle>
          <CardDescription>Análisis de la producción acumulada</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Total producido</h4>
              <p className="text-2xl font-bold">
                {registros.reduce((sum, r) => sum + r.cantidadProducida, 0).toLocaleString()}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Total defectuoso</h4>
              <p className="text-2xl font-bold">
                {registros.reduce((sum, r) => sum + r.cantidadDefectuosa, 0).toLocaleString()}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Eficiencia promedio</h4>
              <p className="text-2xl font-bold">
                {registros.length > 0
                  ? (registros.reduce((sum, r) => sum + r.eficiencia, 0) / registros.length).toFixed(1)
                  : 0}
                %
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
