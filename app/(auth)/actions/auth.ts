"use server"

import { cookies } from "next/headers"
import { apiClient } from "@/utils/api-client"

interface AuthResponse {
  token: string
  refreshToken: string
  uid: string
}

interface RegisterRequest {
  email: string
  password: string
}

interface VerifyEmailRequest {
  code: string
}

interface VerificationStatusResponse {
  isVerified: boolean
}

const handleAuthError = async (error: unknown, fallbackMessage: string): Promise<string> => {
  if (error instanceof Response) {
    try {
      const errorData = await error.json()
      return errorData.message || fallbackMessage
    } catch {
      return fallbackMessage
    }
  }

  if (error instanceof Error) {
    return error.message
  }

  return fallbackMessage
}

export async function register(credentials: RegisterRequest): Promise<AuthResponse> {
  try {
    const response = await apiClient.post("/auth/register", credentials)
    const authResponse: AuthResponse = response.data

    // Set cookies
    ;(await
          // Set cookies
          cookies()).set("token", authResponse.token, { httpOnly: true, secure: process.env.NODE_ENV === "production" })
    ;(await cookies()).set("refreshToken", authResponse.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })
    ;(await cookies()).set("uid", authResponse.uid, { httpOnly: true, secure: process.env.NODE_ENV === "production" })

    return authResponse
  } catch (error) {
    const errorMessage = await handleAuthError(error, "Registration failed")
    throw new Error(errorMessage)
  }
}

export async function login(credentials: RegisterRequest): Promise<AuthResponse> {
  try {
    const response = await apiClient.post("/auth/login", credentials)
    const authResponse: AuthResponse = response.data

    // Set cookies
    ;(await
          // Set cookies
          cookies()).set("token", authResponse.token, { httpOnly: true, secure: process.env.NODE_ENV === "production" })
    ;(await cookies()).set("refreshToken", authResponse.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })
    ;(await cookies()).set("uid", authResponse.uid, { httpOnly: true, secure: process.env.NODE_ENV === "production" })

    return authResponse
  } catch (error) {
    const errorMessage = await handleAuthError(error, "Login failed")
    throw new Error(errorMessage)
  }
}

export async function verifyEmail(code: string): Promise<void> {
  try {
    await apiClient.post(
      "/auth/verify-email-with-code",
      { code },
      {
        params: { code },
      },
    )
  } catch (error) {
    const errorMessage = await handleAuthError(error, "Email verification failed")
    throw new Error(errorMessage)
  }
}

export async function checkVerificationStatus(): Promise<VerificationStatusResponse> {
  try {
    const response = await apiClient.get("/auth/verification-status")
    return response.data
  } catch (error) {
    const errorMessage = await handleAuthError(error, "Failed to check verification status")
    throw new Error(errorMessage)
  }
}

export async function logout(): Promise<void> {
  (await cookies()).delete("token")
  ;(await cookies()).delete("refreshToken")
  ;(await cookies()).delete("uid")
}

