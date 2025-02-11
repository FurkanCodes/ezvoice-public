'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

const POLLING_INTERVAL = 5000 // 5 seconds
const MAX_POLLING_TIME = 300000 // 5 minutes

export function useVerificationStatus() {
  const [isVerified, setIsVerified] = useState(false)
  const [isPolling, setIsPolling] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const checkVerificationStatus = useCallback(async () => {
    try {
      const response = await fetch('/check-verification-status', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // This ensures cookies are sent with the request
      })

      if (!response.ok) {
        throw new Error('Verification check failed')
      }

      const data = await response.json()

      if (data.isVerified) {
        setIsVerified(true)
        setIsPolling(false)
        router.push("/dashboard")
      }
    } catch (error) {
      console.error('Polling error:', error)
      setError("Error checking verification status")
      setIsPolling(false)
    }
  }, [router])

  const startPolling = useCallback(() => {
    if (isVerified) return // Don't start polling if already verified

    setIsPolling(true)
    setError(null)
  }, [isVerified])

  const stopPolling = useCallback(() => {
    setIsPolling(false)
  }, [])

  useEffect(() => {
    let intervalId: NodeJS.Timeout
    let timeoutId: NodeJS.Timeout

    if (isPolling && !isVerified) {
      intervalId = setInterval(checkVerificationStatus, POLLING_INTERVAL)

      timeoutId = setTimeout(() => {
        stopPolling()
        setError("Verification timed out. Please try again.")
      }, MAX_POLLING_TIME)
    }

    return () => {
      clearInterval(intervalId)
      clearTimeout(timeoutId)
    }
  }, [isPolling, isVerified, checkVerificationStatus, stopPolling])

  return { isVerified, isPolling, error, startPolling, stopPolling }
}
