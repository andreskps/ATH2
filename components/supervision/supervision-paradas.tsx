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
import { Plus, Clock } from "lucide-react"
import { getParadasPorSupervision, type TipoParada } from "@/lib/data/supervision"

interface SupervisionParadasProps {
  supervisionId: string
}

export default function SupervisionParadas({ supervisionId }: SupervisionParadasProps) {
  const [paradas, setParadas] = useState(getParadasPorSupervision(supervisionId))
  const [openDialog, setOpenDialog] = useState(false)

  const tiposParada: TipoParada[] = [
    "Cambio de molde",
    "Mantenimiento",
    "Falta de material",
    "Falla mecánica",
    "Falla eléctrica",
    "Ajuste de parámetros",
    "Cambio de turno",
    "Descanso",
    "Otro",
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para guardar la parada
    setOpenDialog(false)
  }

  const calcularDuracion = (inicio: Date, fin: Date | null) => {
    if (!fin) return "En curso"
    const duracionMs = fin.getTime() - inicio.getTime()
    const minutos = Math.floor(duracionMs / 60000)
    return `${minutos} min`
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Registro de paradas</h3>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1">
              <Plus className="h-4 w-4" />
              Registrar parada
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Registrar parada</DialogTitle>
              <DialogDescription>Ingresa los datos de la parada de producción</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="tipo">Tipo de parada</Label>
                  <Select>
                    <SelectTrigger id="tipo">
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {tiposParada.map((tipo) => (
                        <SelectItem key={tipo} value={tipo}>
                          {tipo}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="motivo">Motivo</Label>
                  <Textarea id="motivo" placeholder="Describe el motivo de la parada" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="responsable">Responsable</Label>
                  <Input id="responsable" placeholder="Nombre del responsable" required />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Iniciar parada</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {paradas.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">No hay paradas registradas</CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Inicio</TableHead>
                  <TableHead>Fin</TableHead>
                  <TableHead>Duración</TableHead>
                  <TableHead>Motivo</TableHead>
                  <TableHead>Responsable</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paradas.map((parada) => (
                  <TableRow key={parada.id}>
                    <TableCell>
                      <Badge variant="outline">{parada.tipo}</Badge>
                    </TableCell>
                    <TableCell>{parada.inicio.toLocaleTimeString()}</TableCell>
                    <TableCell>
                      {parada.fin ? (
                        parada.fin.toLocaleTimeString()
                      ) : (
                        <Badge variant="destructive" className="gap-1">
                          <Clock className="h-3 w-3" />
                          En curso
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>{calcularDuracion(parada.inicio, parada.fin)}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{parada.motivo}</TableCell>
                    <TableCell>{parada.responsable}</TableCell>
                    <TableCell className="text-right">
                      {!parada.fin && (
                        <Button size="sm" variant="outline">
                          Finalizar
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Análisis de paradas</CardTitle>
          <CardDescription>Distribución de tiempo de paradas por tipo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Total paradas</h4>
                <p className="text-2xl font-bold">{paradas.length}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Tiempo total</h4>
                <p className="text-2xl font-bold">{paradas.reduce((sum, p) => sum + (p.duracion || 0), 0)} min</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Paradas activas</h4>
                <p className="text-2xl font-bold">{paradas.filter((p) => !p.fin).length}</p>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="mb-2 text-sm font-medium">Distribución por tipo</h4>
              <div className="h-[150px] flex items-center justify-center">
                <p className="text-sm text-muted-foreground">Gráfico de distribución de paradas</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
