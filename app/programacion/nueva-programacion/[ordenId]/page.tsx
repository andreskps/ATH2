import { notFound } from "next/navigation"
import { getOrdenById } from "@/lib/data/ordenes"
import { getProductosParaProgramar } from "@/lib/data/programacion"
import BackButton from "@/components/ui/back-button"
import NuevaProgramacionForm from "@/components/programacion/nueva-programacion-form"

interface NuevaProgramacionPageProps {
  params: {
    ordenId: string
  }
}

export default function NuevaProgramacionPage({ params }: NuevaProgramacionPageProps) {
  const ordenId = Number.parseInt(params.ordenId)

  if (isNaN(ordenId)) {
    return notFound()
  }

  const orden = getOrdenById(ordenId)

  const productosParaProgramar = getProductosParaProgramar(ordenId)

  // Asegurarnos de que siempre haya productos para programar
  let productosDisponibles = productosParaProgramar

  // Si no hay productos pendientes según la función, pero la orden existe,
  // creamos productos de ejemplo basados en los productos de la orden
  if (productosDisponibles.length === 0 && orden && orden.productos) {
    productosDisponibles = orden.productos.map((producto) => ({
      id: producto.id,
      productoId: producto.productoId,
      nombre: producto.nombre,
      cantidadTotal: producto.cantidad,
      cantidadProgramada: 0,
      cantidadPendiente: producto.cantidad,
    }))
  }

  // Si aún así no hay productos, mostramos productos de ejemplo genéricos
  if (productosDisponibles.length === 0) {
    productosDisponibles = [
      {
        id: 1001,
        productoId: "1",
        nombre: "Botella PET 500ml (Demo)",
        cantidadTotal: 5000,
        cantidadProgramada: 0,
        cantidadPendiente: 5000,
      },
      {
        id: 1002,
        productoId: "2",
        nombre: "Tapa rosca estándar (Demo)",
        cantidadTotal: 5000,
        cantidadProgramada: 0,
        cantidadPendiente: 5000,
      },
    ]
  }

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8">
      <div className="flex items-center">
        <BackButton href="/programacion" />
        <h1 className="text-2xl font-bold tracking-tight ml-2">Programar Producción</h1>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Detalles de la Orden</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Código</p>
              <p className="font-medium">{orden?.codigo || `OV-DEMO-${ordenId}`}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Cliente</p>
              <p className="font-medium">{orden?.cliente?.nombre || "Cliente de demostración"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Fecha de Entrega</p>
              <p className="font-medium">
                {orden?.fechaEntrega || new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Prioridad</p>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  className="w-20 h-8 border rounded px-2 text-center font-medium"
                  defaultValue="5"
                  min="1"
                  max="10"
                  id="prioridad"
                  name="prioridad"
                />
                <span className="text-xs text-muted-foreground">(1: Urgente - 10: Baja)</span>
              </div>
            </div>
          </div>
        </div>

        <NuevaProgramacionForm
          orden={
            orden || {
              id: Number(ordenId),
              codigo: `OV-DEMO-${ordenId}`,
              clienteId: 1,
              cliente: { id: 1, nombre: "Cliente de demostración", nit: "900000000-0" },
              fechaCreacion: new Date().toISOString().split("T")[0],
              fechaEntrega: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
              productos: [],
              subtotal: 0,
              descuento: 0,
              impuestos: 0,
              total: 0,
              estado: "liberadaProduccion",
              formaPago: "anticipo",
              historialEstados: [],
              comentarios: [],
              creadorId: 1,
              creador: "Usuario Demo",
              requiereProduccion: true,
              resumenStock: {
                totalProductos: 0,
                productosInventario: 0,
                productosProduccion: 0,
                productosMixtos: 0,
              },
            }
          }
          productosParaProgramar={productosDisponibles}
          prioridad={document.getElementById("prioridad")?.value || "5"}
        />
      </div>
    </div>
  )
}
