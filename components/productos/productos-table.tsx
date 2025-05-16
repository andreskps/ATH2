"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, Pencil, MoreHorizontal, Archive, RotateCcw, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { Badge } from "@/components/ui/badge"
import { getProductos } from "@/lib/data/productos"
import type { Producto } from "@/lib/types"
import ProductosTableHeader from "./productos-table-header"
import Image from "next/image"

export default function ProductosTable() {
  const router = useRouter()
  const [productos, setProductos] = useState<Producto[]>(getProductos())
  const [filteredProductos, setFilteredProductos] = useState<Producto[]>(productos)
  const [productoToToggle, setProductoToToggle] = useState<Producto | null>(null)
  const [productoToDelete, setProductoToDelete] = useState<Producto | null>(null)

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredProductos(productos)
      return
    }

    const lowercaseQuery = query.toLowerCase()
    const filtered = productos.filter(
      (producto) =>
        producto.nombre.toLowerCase().includes(lowercaseQuery) ||
        producto.codigo.toLowerCase().includes(lowercaseQuery),
    )

    setFilteredProductos(filtered)
  }

  const handleToggleEstado = (producto: Producto) => {
    setProductoToToggle(null)

    // Aquí iría la lógica para cambiar el estado del producto en la base de datos
    const nuevoEstado = producto.estado === "Activo" ? "Descontinuado" : "Activo"

    const updatedProductos = productos.map((p) => {
      if (p.id === producto.id) {
        return { ...p, estado: nuevoEstado, fechaActualizacion: new Date().toISOString().split("T")[0] }
      }
      return p
    })

    setProductos(updatedProductos)
    setFilteredProductos(updatedProductos)
    router.refresh()
  }

  const handleDeleteProducto = (producto: Producto) => {
    setProductoToDelete(null)

    // Aquí iría la lógica para eliminar el producto de la base de datos
    const updatedProductos = productos.filter((p) => p.id !== producto.id)
    setProductos(updatedProductos)
    setFilteredProductos(updatedProductos)
    router.refresh()
  }

  return (
    <div>
      <ProductosTableHeader onSearch={handleSearch} />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Imagen</TableHead>
              <TableHead>Código</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Color</TableHead>
              <TableHead>Peso (g)</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProductos.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No se encontraron productos
                </TableCell>
              </TableRow>
            ) : (
              filteredProductos.map((producto) => (
                <TableRow key={producto.id}>
                  <TableCell>
                    <div className="relative h-10 w-10 overflow-hidden rounded-md border">
                      {producto.imagen ? (
                        <Image
                          src={producto.imagen || "/placeholder.svg"}
                          alt={producto.nombre}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-muted">
                          <span className="text-xs text-muted-foreground">N/A</span>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{producto.codigo}</TableCell>
                  <TableCell>{producto.nombre}</TableCell>
                  <TableCell>{producto.tipo}</TableCell>
                  <TableCell>{producto.color}</TableCell>
                  <TableCell>{producto.peso}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        producto.estado === "Activo"
                          ? "default"
                          : producto.estado === "En Desarrollo"
                            ? "outline"
                            : "secondary"
                      }
                      className={
                        producto.estado === "Activo"
                          ? "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100"
                          : producto.estado === "En Desarrollo"
                            ? "bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-100"
                            : "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-100"
                      }
                    >
                      {producto.estado}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Abrir menú</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/productos/${producto.id}`} className="flex items-center gap-2">
                            <Eye className="h-4 w-4" />
                            <span>Ver detalles</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/productos/editar/${producto.id}`} className="flex items-center gap-2">
                            <Pencil className="h-4 w-4" />
                            <span>Editar</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <AlertDialog
                          open={productoToToggle?.id === producto.id}
                          onOpenChange={(open) => !open && setProductoToToggle(null)}
                        >
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem
                              className="flex items-center gap-2"
                              onSelect={(e) => {
                                e.preventDefault()
                                setProductoToToggle(producto)
                              }}
                            >
                              {producto.estado === "Activo" ? (
                                <>
                                  <Archive className="h-4 w-4" />
                                  <span>Descontinuar</span>
                                </>
                              ) : (
                                <>
                                  <RotateCcw className="h-4 w-4" />
                                  <span>Activar</span>
                                </>
                              )}
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                {producto.estado === "Activo" ? "¿Descontinuar producto?" : "¿Activar producto?"}
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                {producto.estado === "Activo"
                                  ? "El producto no estará disponible para nuevas órdenes mientras esté descontinuado."
                                  : "El producto estará disponible para órdenes nuevamente."}
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleToggleEstado(producto)}
                                className={producto.estado === "Activo" ? "bg-red-500 hover:bg-red-600" : ""}
                              >
                                {producto.estado === "Activo" ? "Descontinuar" : "Activar"}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>

                        <AlertDialog
                          open={productoToDelete?.id === producto.id}
                          onOpenChange={(open) => !open && setProductoToDelete(null)}
                        >
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem
                              className="flex items-center gap-2 text-red-500 focus:text-red-500"
                              onSelect={(e) => {
                                e.preventDefault()
                                setProductoToDelete(producto)
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span>Eliminar</span>
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>¿Eliminar producto permanentemente?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta acción no se puede deshacer. Se eliminará permanentemente el producto del sistema.
                                <br />
                                <br />
                                <strong>Recomendación:</strong> En lugar de eliminar, considera descontinuar el producto
                                para mantener su historial.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteProducto(producto)}
                                className="bg-red-500 hover:bg-red-600"
                              >
                                Eliminar
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
