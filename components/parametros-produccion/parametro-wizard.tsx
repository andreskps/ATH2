"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Circle } from "lucide-react"
import { cn } from "@/lib/utils"
import { WizardStep1 } from "./wizard-step1"
import { WizardStep2 } from "./wizard-step2"
import { WizardStep3 } from "./wizard-step3"
import { WizardStep4 } from "./wizard-step4"

const steps = [
  { id: 1, title: "Configuración Básica", description: "Producto, máquina y nombre" },
  { id: 2, title: "Materias Primas", description: "Selección de materiales" },
  { id: 3, title: "Parámetros Técnicos", description: "Temperaturas, presiones y tiempos" },
  { id: 4, title: "Revisión", description: "Validación y confirmación" },
]

export function ParametroWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [formData, setFormData] = useState({
    product: "",
    machine: "",
    name: "",
    rawMaterials: [] as string[],
    temperatures: {
      zona1: 0,
      zona2: 0,
      zona3: 0,
      boquilla: 0,
      molde: 0,
    },
    pressures: {
      inyeccion: 0,
      mantenimiento: 0,
      contrapresion: 0,
    },
    times: {
      inyeccion: 0,
      enfriamiento: 0,
      ciclo_total: 0,
    },
    speeds: {
      inyeccion: 0,
      dosificacion: 0,
    },
    notes: "",
  })

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCompletedSteps([...completedSteps, currentStep])
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleStepClick = (stepId: number) => {
    if (stepId <= currentStep || completedSteps.includes(stepId)) {
      setCurrentStep(stepId)
    }
  }

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData({ ...formData, ...data })
  }

  const progress = ((currentStep - 1) / (steps.length - 1)) * 100

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>
            Paso {currentStep} de {steps.length}
          </span>
          <span>{Math.round(progress)}% completado</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Steps Navigation */}
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center space-y-2">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "h-10 w-10 rounded-full p-0",
                currentStep === step.id && "bg-primary text-primary-foreground",
                completedSteps.includes(step.id) && "bg-green-100 text-green-800",
              )}
              onClick={() => handleStepClick(step.id)}
            >
              {completedSteps.includes(step.id) ? <CheckCircle className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
            </Button>
            <div className="text-center">
              <p className="text-sm font-medium">{step.title}</p>
              <p className="text-xs text-muted-foreground">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Step Content */}
      <Card>
        <CardHeader>
          <CardTitle>{steps[currentStep - 1].title}</CardTitle>
          <CardDescription>{steps[currentStep - 1].description}</CardDescription>
        </CardHeader>
        <CardContent>
          {currentStep === 1 && <WizardStep1 data={formData} onUpdate={updateFormData} />}
          {currentStep === 2 && <WizardStep2 data={formData} onUpdate={updateFormData} />}
          {currentStep === 3 && <WizardStep3 data={formData} onUpdate={updateFormData} />}
          {currentStep === 4 && <WizardStep4 data={formData} onUpdate={updateFormData} />}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
          Anterior
        </Button>
        <div className="flex gap-2">
          {currentStep === steps.length ? (
            <>
              <Button variant="outline">Crear Parámetros</Button>
              <Button>Crear y Validar</Button>
            </>
          ) : (
            <Button onClick={handleNext}>Siguiente</Button>
          )}
        </div>
      </div>
    </div>
  )
}
