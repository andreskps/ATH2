"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { WizardStep1 } from "./wizard-step1"
import { WizardStep2 } from "./wizard-step2"
import { WizardStep3 } from "./wizard-step3"

export interface WizardData {
  ordenProduccion?: any
  materiales: any[]
  notasGenerales: string
}

export function PeticionMaterialWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [wizardData, setWizardData] = useState<WizardData>({
    materiales: [],
    notasGenerales: "",
  })

  const steps = [
    { number: 1, title: "Seleccionar Orden", description: "Elige la orden de producción" },
    { number: 2, title: "Agregar Materiales", description: "Selecciona los materiales necesarios" },
    { number: 3, title: "Resumen", description: "Revisa y confirma la petición" },
  ]

  const progress = (currentStep / steps.length) * 100

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateWizardData = (data: Partial<WizardData>) => {
    setWizardData((prev) => ({ ...prev, ...data }))
  }

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            Paso {currentStep} de {steps.length}: {steps[currentStep - 1].title}
          </h2>
          <span className="text-sm text-muted-foreground">{Math.round(progress)}% completado</span>
        </div>
        <Progress value={progress} className="w-full" />

        {/* Steps indicator */}
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div
                className={`
                flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium
                ${currentStep >= step.number ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"}
              `}
              >
                {step.number}
              </div>
              <div className="ml-3 hidden sm:block">
                <p className="text-sm font-medium">{step.title}</p>
                <p className="text-xs text-muted-foreground">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`
                  w-12 h-0.5 mx-4
                  ${currentStep > step.number ? "bg-blue-600" : "bg-gray-200"}
                `}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <Card>
        <CardContent className="p-6">
          {currentStep === 1 && <WizardStep1 data={wizardData} onUpdate={updateWizardData} onNext={handleNext} />}
          {currentStep === 2 && (
            <WizardStep2
              data={wizardData}
              onUpdate={updateWizardData}
              onNext={handleNext}
              onPrevious={handlePrevious}
            />
          )}
          {currentStep === 3 && (
            <WizardStep3 data={wizardData} onUpdate={updateWizardData} onPrevious={handlePrevious} />
          )}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
          <ChevronLeft className="w-4 h-4 mr-2" />
          Anterior
        </Button>

        {currentStep < steps.length ? (
          <Button onClick={handleNext} disabled={currentStep === 1 && !wizardData.ordenProduccion}>
            Siguiente
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline">Guardar como Borrador</Button>
            <Button className="bg-blue-600 hover:bg-blue-700">Enviar Petición</Button>
          </div>
        )}
      </div>
    </div>
  )
}
