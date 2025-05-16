"use client"

import { useState } from "react"
import { FileText, FileUp, Download, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import type { Producto } from "@/lib/types"

interface ProductoArchivosProps {
  producto: Producto
}

export default function ProductoArchivos({ producto }: ProductoArchivosProps) {
  const [archivos, setArchivos] = useState({
    fichaTecnica: producto.fichaTecnica || "",
    planoTecnico: producto.planoTecnico || "",
    instructivoEmpaque: producto.instructivoEmpaque || "",
  })
  const [archivoToDelete, setArchivoToDelete] = useState<"fichaTecnica" | "planoTecnico" | "instructivoEmpaque" | null>(
    null,
  )

  const handleDeleteArchivo = (tipo: "fichaTecnica" | "planoTecnico" | "instructivoEmpaque") => {
    setArchivoToDelete(null)
    setArchivos({ ...archivos, [tipo]: "" })
  }

  const getNombreArchivo = (ruta: string) => {
    if (!ruta) return ""
    return ruta.split("/").pop() || ""
  }

  const getTipoArchivo = (tipo: "fichaTecnica" | "planoTecnico" | "instructivoEmpaque") => {
    switch (tipo) {
      case "fichaTecnica":
        return "Ficha Técnica"
      case "planoTecnico":
        return "Plano Técnico"
      case "instructivoEmpaque":
        return "Instructivo de Empaque"
      default:
        return ""
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Ficha Técnica</CardTitle>
          <CardDescription>Documento con especificaciones técnicas del producto.</CardDescription>
        </CardHeader>
        <CardContent>
          {archivos.fichaTecnica ? (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 rounded-md border p-3">
                <FileText className="h-8 w-8 text-primary" />
                <div className="flex-1 truncate">
                  <p className="text-sm font-medium">{getNombreArchivo(archivos.fichaTecnica)}</p>
                  <p className="text-xs text-muted-foreground">PDF</p>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" asChild>
                    <a href={archivos.fichaTecnica} target="_blank" rel="noopener noreferrer">
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Descargar</span>
                    </a>
                  </Button>
                  <AlertDialog
                    open={archivoToDelete === "fichaTecnica"}
                    onOpenChange={(open) => !open && setArchivoToDelete(null)}
                  >
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700 hover:bg-red-100"
                        onClick={() => setArchivoToDelete("fichaTecnica")}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Eliminar</span>
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>¿Eliminar ficha técnica?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta acción eliminará la ficha técnica de este producto.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteArchivo("fichaTecnica")}
                          className="bg-red-500 hover:bg-red-600"
                        >
                          Eliminar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 rounded-md border border-dashed p-6">
              <FileUp className="h-8 w-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">No hay ficha técnica</p>
              <Button variant="outline" size="sm" className="mt-2">
                Subir Ficha Técnica
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Plano Técnico</CardTitle>
          <CardDescription>Plano con dimensiones y detalles técnicos.</CardDescription>
        </CardHeader>
        <CardContent>
          {archivos.planoTecnico ? (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 rounded-md border p-3">
                <FileText className="h-8 w-8 text-primary" />
                <div className="flex-1 truncate">
                  <p className="text-sm font-medium">{getNombreArchivo(archivos.planoTecnico)}</p>
                  <p className="text-xs text-muted-foreground">PDF</p>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" asChild>
                    <a href={archivos.planoTecnico} target="_blank" rel="noopener noreferrer">
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Descargar</span>
                    </a>
                  </Button>
                  <AlertDialog
                    open={archivoToDelete === "planoTecnico"}
                    onOpenChange={(open) => !open && setArchivoToDelete(null)}
                  >
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700 hover:bg-red-100"
                        onClick={() => setArchivoToDelete("planoTecnico")}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Eliminar</span>
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>¿Eliminar plano técnico?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta acción eliminará el plano técnico de este producto.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteArchivo("planoTecnico")}
                          className="bg-red-500 hover:bg-red-600"
                        >
                          Eliminar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 rounded-md border border-dashed p-6">
              <FileUp className="h-8 w-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">No hay plano técnico</p>
              <Button variant="outline" size="sm" className="mt-2">
                Subir Plano Técnico
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Instructivo de Empaque</CardTitle>
          <CardDescription>Documento con instrucciones de empaque.</CardDescription>
        </CardHeader>
        <CardContent>
          {archivos.instructivoEmpaque ? (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 rounded-md border p-3">
                <FileText className="h-8 w-8 text-primary" />
                <div className="flex-1 truncate">
                  <p className="text-sm font-medium">{getNombreArchivo(archivos.instructivoEmpaque)}</p>
                  <p className="text-xs text-muted-foreground">PDF</p>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" asChild>
                    <a href={archivos.instructivoEmpaque} target="_blank" rel="noopener noreferrer">
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Descargar</span>
                    </a>
                  </Button>
                  <AlertDialog
                    open={archivoToDelete === "instructivoEmpaque"}
                    onOpenChange={(open) => !open && setArchivoToDelete(null)}
                  >
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700 hover:bg-red-100"
                        onClick={() => setArchivoToDelete("instructivoEmpaque")}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Eliminar</span>
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>¿Eliminar instructivo de empaque?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta acción eliminará el instructivo de empaque de este producto.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteArchivo("instructivoEmpaque")}
                          className="bg-red-500 hover:bg-red-600"
                        >
                          Eliminar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 rounded-md border border-dashed p-6">
              <FileUp className="h-8 w-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">No hay instructivo de empaque</p>
              <Button variant="outline" size="sm" className="mt-2">
                Subir Instructivo
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
