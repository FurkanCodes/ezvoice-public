"use client"

import Link from "next/link"
import { useCallback, useState, useEffect } from "react"
import SignupForm from "@/components/forms/signup-form"
import VerificationForm from "@/components/forms/verification-form"
import { validateEmail, validatePassword } from "@/utils/validators"
import { AnimatePresence, motion } from "framer-motion"
import { User } from "lucide-react"
import { register, verifyEmail } from "../actions/auth"
import { useVerificationStatus } from "@/hooks/useVerificationStatus"
import type React from "react"

interface VerificationState {
  show: boolean
  code: string
}

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [verification, setVerification] = useState<VerificationState>({
    show: false,
    code: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const { isPolling, error, startPolling, stopPolling, isVerified } = useVerificationStatus()

  const handleValidation = useCallback(() => {
    if (!validateEmail(email)) return "Invalid email address"
    if (!validatePassword(password)) return "Password must be at least 8 characters"
    if (password !== confirmPassword) return "Passwords do not match"
    return null
  }, [email, password, confirmPassword])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validationError = handleValidation()
    if (validationError) return

    try {
      setIsLoading(true)
      await register({ email, password })
      setVerification((v) => ({ ...v, show: true }))
      startPolling()
    } catch (err: unknown) {
      console.error(err instanceof Error ? err.message : "Registration failed")
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setIsLoading(true)
      await verifyEmail(verification.code)
      startPolling()
    } catch (err: unknown) {
      console.error(err instanceof Error ? err.message : "Verification failed")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Stop polling when the component unmounts or when verified
    return () => {
      stopPolling()
    }
  }, [stopPolling])

  useEffect(() => {
    // Stop polling when verified
    if (isVerified) {
      stopPolling()
    }
  }, [isVerified, stopPolling])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      <div className="bg-white shadow-2xl rounded-3xl overflow-hidden relative">
        <div className="px-8 py-12 relative z-10">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex justify-center mb-8 text-center text-black"
          >
            <User size={"4rem"} />
          </motion.div>

          <AnimatePresence mode="wait">
            {verification.show ? (
              <motion.div
                key="verification"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <VerificationForm
                  code={verification.code}
                  error={error}
                  isLoading={isLoading}
                  onChange={setVerification}
                  onSubmit={handleVerification}
                  isPolling={isPolling}
                />
              </motion.div>
            ) : (
              <motion.div
                key="signup"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Create Your Account</h2>
                <SignupForm
                  email={email}
                  password={password}
                  confirmPassword={confirmPassword}
                  error={error}
                  isLoading={isLoading}
                  onEmailChange={setEmail}
                  onPasswordChange={setPassword}
                  onConfirmPasswordChange={setConfirmPassword}
                  onSubmit={handleSubmit}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div className="mt-8 text-center" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/signin" className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200">
              Already have an account? Sign in
            </Link>
          </motion.div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-8 text-center text-white text-sm"
      >
        © 2025 Envoice. All rights reserved.
      </motion.div>
    </motion.div>
  )
}

