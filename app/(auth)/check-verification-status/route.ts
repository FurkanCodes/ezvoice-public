import {  NextResponse } from "next/server"
import { apiClient } from "@/utils/api-client"
import { cookies } from "next/headers"

export async function GET() {
  const cookieStore = cookies()
  const email = (await cookieStore).get("email")?.value
        console.log("email",email)
  if (!email) {
    return NextResponse.json({ error: "User email not found" }, { status: 401 })
  }

  try {
    const response = await apiClient.get(`/auth/verification-status?email=${email}`)
    console.log("responseresponse",response)
    return NextResponse.json({ isVerified: response.data.isVerified })
  } catch (error) {
    console.error("Error checking verification status:", error)
    return NextResponse.json({ error: "Failed to check verification status" }, { status: 500 })
  }
}

