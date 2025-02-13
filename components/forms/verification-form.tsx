// VerificationForm.tsx
"use client"

interface VerificationFormProps {
  error?: string
  isLoading: boolean
  isPolling: boolean

}

const VerificationForm = ({
  error,

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
