import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ClienteForm from "@/components/clientes/cliente-form"
import { getClienteById } from "@/lib/data/clientes"
import BackButton from "@/components/ui/back-button"

interface EditarClientePageProps {
  params: {
    id: string
  }
}

export default async function EditarClientePage({ params }: EditarClientePageProps) {
  const clienteId = Number.parseInt(params.id)

  if (isNaN(clienteId)) {
    notFound()
  }

  const cliente = await getClienteById(clienteId)

  if (!cliente) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-4 max-w-full">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center gap-2">
          <BackButton href={`/clientes/${cliente.id}`} />
          <h1 className="text-3xl font-bold tracking-tight">Editar Cliente</h1>
        </div>
        <p className="text-muted-foreground">Actualiza la información del cliente seleccionado.</p>
      </div>

      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Formulario de Edición</CardTitle>
          <CardDescription>Todos los campos marcados con * son obligatorios.</CardDescription>
        </CardHeader>
        <CardContent>
          <ClienteForm cliente={cliente} isEditing />
        </CardContent>
      </Card>
    </div>
  )
}
