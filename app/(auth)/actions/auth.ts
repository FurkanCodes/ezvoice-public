"use server"

import { cookies } from "next/headers"
import { apiClient } from "@/utils/api-client"
import handleAuthError from "@/utils/handle-auth-error"
import { AuthResponse, RegisterRequest, VerificationStatusResponse } from "@/types/auth"




export async function register(credentials: RegisterRequest): Promise<AuthResponse> {
  const cookieStore = await cookies()
  try {
    const response = await apiClient.post("/auth/register", credentials)
    const authResponse: AuthResponse = response.data
    cookieStore.set({
      name: 'token',
      value: response.data?.token,
      httpOnly: true,
  
    })
    cookieStore.set({
      name: 'refreshToken',
      value: response.data?.refreshToken,
      httpOnly: true,
  
    })

    return authResponse
  } catch (error) {
    const errorMessage = await handleAuthError(error, "Registration failed")
    throw new Error(errorMessage)
  }
}

export async function login(credentials: RegisterRequest): Promise<AuthResponse> {
  const cookieStore = await cookies()
  try {
    const response = await apiClient.post("/auth/login", credentials)
    console.log("response",response)


    cookieStore.set({
      name: 'token',
      value:  response.data?.token,
      httpOnly: true,
    })
    
    cookieStore.set({
      name: 'refreshToken',
      value:  response.data?.refreshToken,
      httpOnly: true,
    })

    return response
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
  try {



    // Use the same cookieStore instance
    (await cookies()).delete("token");
    (await cookies()).delete("refreshToken");
    (await cookies()).delete("uid");
  } catch (error) {
    console.error('Logout error:', error);
    throw new Error('Failed to logout');
  }
}



