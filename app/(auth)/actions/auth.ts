"use server"

import { cookies } from "next/headers"
import { apiClient } from "@/utils/api-client"
import handleAuthError from "@/utils/handle-auth-error"
import { AuthResponse, RegisterRequest, VerificationStatusResponse } from "@/types/auth"



export async function register(
  prevState: any,
  formData: FormData
): Promise<any> {
  const cookieStore = await cookies();
  const credentials = {
    email: formData.get('email') as string,
    password: formData.get('password')
  }

  try {
    const response = await apiClient.post("/auth/register", credentials)
    
    if (!response?.isSuccess) {
      return { 
        message: response?.message || "Registration failed",
        requiresVerification: false 
      }
    }
    cookieStore.set('email', credentials.email)
    return {
      message: "Verification required - check your email",
      requiresVerification: true
    }

  } catch (error) {
    const errorMessage = await handleAuthError(error, "Registration failed")
    return { 
      message: errorMessage,
      requiresVerification: false 
    }
  }
}

export async function login(
  prevState: AuthResponse | null, 
  formData: FormData
): Promise<AuthResponse> {
  const cookieStore = await cookies()
  const credentials = {
    email: formData.get('email'),
    password: formData.get('password')
  }

  try {
    const response = await apiClient.post("/auth/login", credentials)
    
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

    return response
  } catch (error) {
    const errorMessage = await handleAuthError(error, "Login failed")
   throw new Error(errorMessage)
  }
}

export async function verifyEmail(
  prevState: any,
  formData: FormData
): Promise<any> {
  const cookieStore = await cookies()
  const code = formData.get('verificationCode')

  try {
    const response = await apiClient.post("/auth/verify-email-with-code", { code })
    console.log("responseresponseresponse",response)
    if (response?.isSuccess) {
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
    }

    return { success: response?.isSuccess }

  } catch (error) {
    const errorMessage = await handleAuthError(error, "Verification failed")
    return { message: errorMessage, success: false }
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



