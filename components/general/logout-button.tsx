"use client"
import { logout } from "@/app/(auth)/actions/auth"
import { Button } from "@/components/ui/button"
import { useToken } from "@/hooks/useToken"

const LogoutButton = () => {

    return <><Button onClick={logout}>Logout</Button></>
}


export default LogoutButton;