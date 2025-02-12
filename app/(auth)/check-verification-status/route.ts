import {  NextResponse } from "next/server"
import { apiClient } from "@/utils/api-client"
import { cookies } from "next/headers"

export async function GET() {
  const cookieStore = cookies()
  const token = (await cookieStore).get("token")?.value
        console.log("token",token)
  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
  }

  try {
    const response = await apiClient.get("/auth/verification-status", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return NextResponse.json({ isVerified: response.data.isVerified })
  } catch (error) {
    console.error("Error checking verification status:", error)
    return NextResponse.json({ error: "Failed to check verification status" }, { status: 500 })
  }
}

