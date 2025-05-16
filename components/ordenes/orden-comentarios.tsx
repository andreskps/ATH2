"use client"

import type React from "react"

import { useState } from "react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Send } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { type Comentario, addComentarioToOrden } from "@/lib/data/ordenes"

interface OrdenComentariosProps {
  comentarios: Comentario[]
  ordenId: number
}

export function OrdenComentarios({ comentarios = [], ordenId }: OrdenComentariosProps) {
  const [nuevoComentario, setNuevoComentario] = useState("")
  const [comentariosLocales, setComentariosLocales] = useState<Comentario[]>(comentarios)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!nuevoComentario.trim()) return

    setIsLoading(true)

    try {
      // En una app real, el usuario vendría de la sesión
      const comentario = addComentarioToOrden(ordenId, "Usuario Actual", nuevoComentario)

      if (comentario) {
        setComentariosLocales([...comentariosLocales, comentario])
        setNuevoComentario("")
      }
    } catch (error) {
      console.error("Error al añadir comentario:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Comentarios Internos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-[300px] overflow-y-auto">
          {comentariosLocales.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">No hay comentarios para esta orden</p>
          ) : (
            comentariosLocales.map((comentario) => (
              <div key={comentario.id} className="p-3 bg-muted rounded-lg">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-medium text-sm">{comentario.usuario}</span>
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(comentario.fecha), "dd MMM yyyy, HH:mm", { locale: es })}
                  </span>
                </div>
                <p className="text-sm whitespace-pre-line">{comentario.texto}</p>
              </div>
            ))
          )}
        </div>
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSubmit} className="w-full space-y-2">
          <Textarea
            placeholder="Escribe un comentario interno..."
            value={nuevoComentario}
            onChange={(e) => setNuevoComentario(e.target.value)}
            className="min-h-[80px]"
          />
          <div className="flex justify-end">
            <Button type="submit" size="sm" disabled={isLoading || !nuevoComentario.trim()}>
              <Send className="h-4 w-4 mr-2" />
              Enviar
            </Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  )
}
