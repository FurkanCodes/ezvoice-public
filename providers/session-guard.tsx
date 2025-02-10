"use client"

import { useToken } from "@/hooks/useToken"
import React from "react"

const SessionGuard = ({ children }: { children: React.ReactNode }) => {
  const { token } = useToken()

  if (!token) {
    return null // or a loading indicator
  }

  return <>{children}</>
}

export default SessionGuard
