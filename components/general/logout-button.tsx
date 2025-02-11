"use client"
import { logout } from "@/app/(auth)/actions/auth"
import { Button } from "@/components/ui/button"

const LogoutButton = () => {

    return <><Button onClick={logout}>Logout</Button></>
}


export default LogoutButton;