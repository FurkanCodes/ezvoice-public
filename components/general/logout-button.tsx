"use client"
import { Button } from "@/components/ui/button"
import { useToken } from "@/hooks/useToken"

const LogoutButton = () => {
const {removeToken} = useToken()

    return <><Button onClick={removeToken}>Logout</Button></>
}


export default LogoutButton;