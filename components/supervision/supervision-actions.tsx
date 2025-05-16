"use client"

import { useState } from "react"
import { Play, Pause, CheckCircle, AlertTriangle, Clock, FileBarChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { Supervision } from "@/lib/data/supervision"

interface SupervisionActionsProps {
  supervision: Supervision
}

export default function SupervisionActions({ supervision }: SupervisionActionsProps) {
  const [openDialog, setOpenDialog] = useState(false)
  const [dialogAction, setDialogAction] = useState<"iniciar" | "pausar" | "reanudar" | "finalizar">("iniciar")

  const handleAction = (action: "iniciar" | "pausar" | "reanudar" | "finalizar") => {
    setDialogAction(action)
    setOpenDialog(true)
  }

  const confirmAction = () => {
    // Aquí iría la lógica para ejecutar la acción
    console.log(`Acción confirmada: ${dialogAction}`)
    setOpenDialog(false)
  }

  const dialogContent = {
    iniciar: {
      title: "Iniciar producción",
      description: "¿Estás seguro de que deseas iniciar esta producción? Se registrará la fecha y hora de inicio.",
      confirmText: "Iniciar",
    },
    pausar: {
      title: "Pausar producción",
      description: "¿Estás seguro de que deseas pausar esta producción? Se registrará una parada en el sistema.",
      confirmText: "Pausar",
    },
    reanudar: {
      title: "Reanudar producción",
      description: "¿Estás seguro de que deseas reanudar esta producción? Se finalizará la parada actual.",
      confirmText: "Reanudar",
    },
    finalizar: {
      title: "Finalizar producción",
      description:
        "¿Estás seguro de que deseas finalizar esta producción? Ya no se podrán registrar más unidades producidas.",
      confirmText: "Finalizar",
    },
  }

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {supervision.estado === "pendiente" && (
          <Button onClick={() => handleAction("iniciar")} className="gap-2">
            <Play className="h-4 w-4" />
            Iniciar producción
          </Button>
        )}

        {supervision.estado === "en_produccion" && (
          <>
            <Button onClick={() => handleAction("pausar")} variant="outline" className="gap-2">
              <Pause className="h-4 w-4" />
              Pausar producción
            </Button>
            <Button onClick={() => handleAction("finalizar")} variant="outline" className="gap-2">
              <CheckCircle className="h-4 w-4" />
              Finalizar producción
            </Button>
          </>
        )}

        {supervision.estado === "pausada" && (
          <>
            <Button onClick={() => handleAction("reanudar")} className="gap-2">
              <Play className="h-4 w-4" />
              Reanudar producción
            </Button>
            <Button onClick={() => handleAction("finalizar")} variant="outline" className="gap-2">
              <CheckCircle className="h-4 w-4" />
              Finalizar producción
            </Button>
          </>
        )}

        <Button variant="outline" className="gap-2">
          <AlertTriangle className="h-4 w-4" />
          Registrar defectos
        </Button>

        <Button variant="outline" className="gap-2">
          <Clock className="h-4 w-4" />
          Registrar parada
        </Button>

        <Button variant="outline" className="gap-2">
          <FileBarChart className="h-4 w-4" />
          Registrar producción
        </Button>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialogContent[dialogAction].title}</DialogTitle>
            <DialogDescription>{dialogContent[dialogAction].description}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={confirmAction}>{dialogContent[dialogAction].confirmText}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
