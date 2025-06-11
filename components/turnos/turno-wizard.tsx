"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import TurnoWizardStep1 from "./turno-wizard-step1"
import TurnoWizardStep2 from "./turno-wizard-step2"
import TurnoWizardStep3 from "./turno-wizard-step3"

export interface TurnoWizardData {
  // Paso 1: Información Básica
  categoria: string
  fechaInicio: string
  fechaFin: string
  area: string
  horario?: {
    inicio: string
    fin: string
    duracion: number
  }

  // Paso 2: Asignación de Personal
  tipoAsignacion: "equipo" | "individual"
  equipoId?: string
  supervisor?: string
  operarios: string[]

  // Paso 3: Confirmación
  estado: "borrador" | "confirmado"
  observaciones?: string
}

const steps = [
  {
    id: 1,
    title: "Información Básica",
    description: "Categoría, fechas y área del turno",
  },
  {
    id: 2,
    title: "Asignación de Personal",
    description: "Supervisor y operarios del turno",
  },
  {
    id: 3,
    title: "Confirmación",
    description: "Revisar y confirmar el turno",
  },
]

export default function TurnoWizard() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [wizardData, setWizardData] = useState<TurnoWizardData>({
    categoria: "",
    fechaInicio: "",
    fechaFin: "",
    area: "",
    tipoAsignacion: "equipo",
    operarios: [],
    estado: "borrador",
  })

  const updateWizardData = (data: Partial<TurnoWizardData>) => {
    setWizardData((prev) => ({ ...prev, ...data }))
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleFinish = () => {
    console.log("Turno creado:", wizardData)
    // Aquí iría la lógica para guardar el turno
    router.push("/turnos")
  }

  const progress = (currentStep / steps.length) * 100

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header del Wizard */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Crear Nuevo Turno</CardTitle>
              <p className="text-muted-foreground mt-1">
                Paso {currentStep} de {steps.length}: {steps[currentStep - 1].title}
              </p>
            </div>
            <Button variant="outline" onClick={() => router.push("/turnos")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Cancelar
            </Button>
          </div>

          {/* Barra de Progreso */}
          <div className="space-y-4 mt-6">
            <Progress value={progress} className="h-2" />

            {/* Steps Indicator */}
            <div className="flex justify-between">
              {steps.map((step) => (
                <div key={step.id} className="flex flex-col items-center space-y-2">
                  <div
                    className={cn(
                      "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors",
                      currentStep > step.id
                        ? "bg-primary border-primary text-primary-foreground"
                        : currentStep === step.id
                          ? "border-primary text-primary"
                          : "border-muted-foreground text-muted-foreground",
                    )}
                  >
                    {currentStep > step.id ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <span className="text-sm font-medium">{step.id}</span>
                    )}
                  </div>
                  <div className="text-center">
                    <p
                      className={cn(
                        "text-sm font-medium",
                        currentStep >= step.id ? "text-foreground" : "text-muted-foreground",
                      )}
                    >
                      {step.title}
                    </p>
                    <p className="text-xs text-muted-foreground hidden sm:block">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Contenido del Step Actual */}
      <Card>
        <CardContent className="p-6">
          {currentStep === 1 && <TurnoWizardStep1 data={wizardData} updateData={updateWizardData} onNext={nextStep} />}
          {currentStep === 2 && (
            <TurnoWizardStep2 data={wizardData} updateData={updateWizardData} onNext={nextStep} onPrev={prevStep} />
          )}
          {currentStep === 3 && (
            <TurnoWizardStep3
              data={wizardData}
              updateData={updateWizardData}
              onPrev={prevStep}
              onFinish={handleFinish}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
