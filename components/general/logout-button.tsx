"use client"
import { logout } from "@/app/(auth)/actions/auth"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useTransition } from 'react'

const LogoutButton = () => {
    const [isPending, startTransition] = useTransition()
    const router = useRouter();
    const handleLogout = () => {
        startTransition(async () => {
            try {
                const res  = await logout()
                console.log("res",res)
                router.push("/")
            } catch (error) {
                console.error('Logout failed:', error)
          
            }
        })
    }

    return (
        <Button 
            onClick={handleLogout} 
            disabled={isPending}
        >
            {isPending ? 'Logging out...' : 'Logout'}
        </Button>
    )
}

export default LogoutButton
