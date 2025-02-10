"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AuthResponse {
  data: {
    token: string;
    refreshToken: string;
    uid: string;
  };
  isSuccess: boolean;
  message: string;
  statusCode: number;
}

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [isPolling, setIsPolling] = useState(false);

  const checkVerificationStatus = async (userId: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`https://invoice-app-n6oh.onrender.com/api/auth/verification-status`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });
  
      const data = await response.json();
      return data.data.isVerified;
    } catch (error) {
      console.error("Error checking verification status:", error);
      return false;
    }
  };
  const startPollingVerificationStatus = async (userId: string) => {
    setIsPolling(true);
    const pollInterval = setInterval(async () => {
      const isVerified = await checkVerificationStatus(userId);
      
      if (isVerified) {
        clearInterval(pollInterval);
        setIsPolling(false);
        router.push("/dashboard");
      }
    }, 5000);

    setTimeout(() => {
      clearInterval(pollInterval);
      setIsPolling(false);
    }, 300000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        setError("Please enter a valid email address");
        return;
      }

      if (formData.password.length < 8) {
        setError("Password must be at least 8 characters");
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      setIsLoading(true);

      const response = await fetch("https://invoice-app-n6oh.onrender.com/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data: AuthResponse = await response.json();

      if (!response.ok) {
        if (response.status === 400 && data.message.includes("email already exists")) {
          const loginResponse = await fetch("https://invoice-app-n6oh.onrender.com/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: formData.email,
              password: formData.password,
            }),
          });

          const loginData: AuthResponse = await loginResponse.json();

          if (loginResponse.ok) {
            const isVerified = await checkVerificationStatus(loginData.data.uid);
            
            if (isVerified) {
              localStorage.setItem("token", loginData.data.token);
              localStorage.setItem("refreshToken", loginData.data.refreshToken);
              router.push("/dashboard");
              return;
            } else {
              setShowVerification(true);
              startPollingVerificationStatus(loginData.data.uid);
              return;
            }
          }
        }
        throw new Error(data.message || "Registration failed");
      }

      localStorage.setItem("token", data.data.token);
      localStorage.setItem("refreshToken", data.data.refreshToken);

      setShowVerification(true);
      setError("");
      startPollingVerificationStatus(data.data.uid);
    } catch (err) {
      let message = "Unknown Error";
      if (err instanceof Error) message = err.message;
      setError(message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      setIsLoading(true);

      const response = await fetch(`https://invoice-app-n6oh.onrender.com/api/auth/verify-email-with-code?code=${code}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Verification failed");
      }

      router.push("/dashboard");
    } catch (err) {
      let message = "Unknown Error";
      if (err instanceof Error) message = err.message;
      setError(message || "Verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-primary/30">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {showVerification ? "Verify Your Email" : "Create Your Account"}
          </h2>
        </div>

        {!showVerification ? (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && <div className="text-red-500 text-center text-sm">{error}</div>}
            <div className="space-y-4">
              <Input
                name="email"
                type="email"
                required
                className="w-full"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
              <Input
                name="password"
                type="password"
                required
                className="w-full"
                placeholder="Password (min 8 characters)"
                value={formData.password}
                onChange={handleChange}
              />
              <Input
                name="confirmPassword"
                type="password"
                required
                className="w-full"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Sign up"}
            </Button>
          </form>
        ) : (
          <>
            <form className="mt-8 space-y-6" onSubmit={handleVerifyCode}>
              {error && <div className="text-red-500 text-center text-sm">{error}</div>}
              <div className="space-y-4">
                <Input
                  name="verificationCode"
                  type="text"
                  required
                  className="w-full"
                  placeholder="Verification code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Verifying..." : "Verify Code"}
              </Button>
            </form>

            <div className="text-center text-sm">
              {isPolling ? (
                <p className="text-gray-600">
                  Waiting for email verification...
                  <br />
                  Please check your email and click the verification link
                </p>
              ) : (
                <p className="text-gray-600">
                  Please enter the verification code sent to your email
                </p>
              )}
            </div>
          </>
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