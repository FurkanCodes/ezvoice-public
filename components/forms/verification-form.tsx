// VerificationForm.tsx
"use client"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface VerificationFormProps {
  error?: string
  isLoading: boolean
  isPolling: boolean

}

const VerificationForm = ({
  error,
  isLoading,
  isPolling,

}: VerificationFormProps) => {

  return (
    <div className="space-y-4">
      {error && <div className="text-red-500 text-center text-sm">{error}</div>}
  
      {isPolling && (
        <div className="text-center text-sm text-gray-500">
          <span className="animate-pulse">Checking verification status...</span>
        </div>
      )}
    </div>
  )
}

export default VerificationForm
