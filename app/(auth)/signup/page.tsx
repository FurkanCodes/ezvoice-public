"use client"
// SignUpPage.tsx
import SignupForm from "@/components/forms/signup-form"
import VerificationForm from "@/components/forms/verification-form"
import { useVerificationStatus } from "@/hooks/useVerificationStatus"
import { AnimatePresence, motion } from "framer-motion"
import { User } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useActionState, useEffect, useState } from "react"
import { register, verifyEmail } from "../actions/auth"


export default function SignUpPage() {
  const router = useRouter()
  const [state, formAction, isPending] = useActionState(register, null)
  const [verifyState, verifyAction, isVerifyPending] = useActionState(verifyEmail, null);

  const { isPolling, error, startPolling, stopPolling, isVerified } = useVerificationStatus()





console.log(verifyState)
  useEffect(() => {
    if (state?.requiresVerification) {
      startPolling()
    }
  }, [state, startPolling])

  useEffect(() => {
    if (isVerified) {
      router.push("/dashboard")
    }
  }, [isVerified, router])

  useEffect(() => {
    return () => stopPolling()
  }, [stopPolling])

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
            {state?.requiresVerification ? (
              <motion.div
                key="verification"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
         <form className="mt-8 space-y-6" action={
  verifyAction
}>
  <VerificationForm
    error={verifyState?.error}
    isLoading={isVerifyPending}
    isPolling={isPolling}
    onSubmit={(code) => {
      const formData = new FormData();
      formData.append('verificationCode', code);
      verifyAction(formData);
    }}
  />
</form>
              </motion.div>
            ) : (
              <motion.div
                key="signup"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                  Create Your Account
                </h2>
                <form action={formAction}>
                  <SignupForm 
                    error={state?.message} 
                    isPending={isPending}
                  />
                </form>
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
