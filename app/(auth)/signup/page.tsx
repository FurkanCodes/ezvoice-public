
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";


import SignupForm from "@/components/forms/signup-form";
import VerificationForm from "@/components/forms/verification-form";
import { useAuthService } from "@/services/useAuthService";
import { validateEmail, validatePassword } from "@/utils/validators";
import { AnimatePresence, motion } from "motion/react";
import { User } from "lucide-react";


interface VerificationState {
  show: boolean;
  code: string;
  isPolling: boolean;
}

export default function SignUpPage() {
  const router = useRouter();
  const { register,  verifyEmail, startPollingVerificationStatus, stopPollingVerificationStatus } = useAuthService();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verification, setVerification] = useState<VerificationState>({ 
    show: false, 
    code: "",
    isPolling: false 
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleValidation = useCallback(() => {
    if (!validateEmail(email)) return "Invalid email address";
    if (!validatePassword(password)) return "Password must be at least 8 characters";
    if (password !== confirmPassword) return "Passwords do not match";
    return null;
  }, [email, password, confirmPassword]);

  const startVerificationPolling = useCallback(() => {
    setVerification(v => ({ ...v, isPolling: true }));
    
    startPollingVerificationStatus({
      onVerified: () => {
        setVerification(v => ({ ...v, isPolling: false }));
        router.push("/dashboard");
      },
      onTimeout: () => {
        setVerification(v => ({ ...v, isPolling: false }));
        setError("Verification timeout. Please try again or request a new verification email.");
      }
    });
  }, [router, startPollingVerificationStatus]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    const validationError = handleValidation();
    if (validationError) return setError(validationError);

    try {
      setIsLoading(true);
      const { token, refreshToken } = await register({ email, password });
      
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      
      setVerification(v => ({ ...v, show: true }));
      startVerificationPolling();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      await verifyEmail({
        code: verification.code
      });
      router.push("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      stopPollingVerificationStatus();
    };
  }, [stopPollingVerificationStatus]);

  return (
    <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="w-full max-w-md"
  >
    <div className="bg-white shadow-2xl rounded-3xl overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-40 overflow-hidden">
        
      </div>
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
                isPolling={verification?.isPolling}
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Create Your Account
              </h2>
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
        
        <motion.div 
          className="mt-8 text-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
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
  );
}

