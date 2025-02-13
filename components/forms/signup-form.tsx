// SignupForm.tsx (unchanged from your original)
"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface SignupFormProps {
  error?: string
  isPending: boolean
}

const SignupForm = ({ error, isPending }: SignupFormProps) => {
  return (
    <div className="mt-8 space-y-6">
      {error && <div className="text-red-500 text-center text-sm">{error}</div>}
      <div className="space-y-4">
        <Input
          name="email"
          type="email"
          required
          className="w-full"
          placeholder="Email address"
        />
        <Input
          name="password"
          type="password"
          required
          className="w-full"
          placeholder="Password (min 8 characters)"
        />
        <Input
          name="confirmPassword"
          type="password"
          required
          className="w-full"
          placeholder="Confirm password"
        />
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Creating account..." : "Sign up"}
      </Button>
    </div>
  )
}

export default SignupForm
