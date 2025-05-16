import { notFound } from "next/navigation"
import BackButton from "@/components/ui/back-button"
import { getMolde } from "@/lib/data/moldes"
import MoldeForm from "@/components/moldes/molde-form"

export default async function EditarMoldePage({ params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id, 10)
  const molde = await getMolde(id)

  if (!molde) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex items-center gap-2">
        <BackButton href={`/moldes/${molde.id}`} />
        <h1 className="text-3xl font-bold tracking-tight">Editar Molde</h1>
      </div>

      <MoldeForm molde={molde} />
    </div>
  )
}
