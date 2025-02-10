
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";


import SignupForm from "@/components/forms/signup-form";
import VerificationForm from "@/components/forms/verification-form";
import { useAuthService } from "@/services/useAuthService";
import { validateEmail, validatePassword } from "@/utils/validators";


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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-primary/30">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          {verification.show ? "Verify Your Email" : "Create Your Account"}
        </h2>

        {verification.show ? (
          <VerificationForm 
            code={verification.code}
            error={error}
            isLoading={isLoading}
            onChange={setVerification}
            onSubmit={handleVerification} isPolling={verification?.isPolling}          />
        ) : (
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
        )}

        <div className="text-center">
          <Link href="/login" className="text-sm text-blue-600 hover:text-blue-500">
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

