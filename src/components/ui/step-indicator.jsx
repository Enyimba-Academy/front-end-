"use client"

import { CheckCircle2 } from "lucide-react"

export default function StepIndicator({ steps, currentStep }) {
  return (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => {
        const isActive = currentStep === step.id
        const isCompleted = currentStep > step.id

        return (
          <div key={step.id} className="flex items-center">
            {/* Step with number */}
            <div className="flex flex-col items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  isActive
                    ? "border-primary bg-primary text-white"
                    : isCompleted
                      ? "border-green-500 bg-green-500 text-white"
                      : "border-gray-300 text-gray-500"
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-6 h-6" />
                ) : (
                  <span className="text-sm font-medium">{step.id}</span>
                )}
              </div>
              <span
                className={`mt-2 text-sm ${
                  isActive ? "text-primary font-medium" : isCompleted ? "text-green-500 font-medium" : "text-gray-500"
                }`}
              >
                {step.name}
              </span>
            </div>

            {/* Connector line */}
            {index < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-4 ${currentStep > index + 1 ? "bg-green-500" : "bg-gray-300"}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}
