"use client"
import LogoutButton from "@/components/general/logout-button";
import { useToken } from "@/hooks/useToken";
import React from "react";

 function Page() {
  const {token} = useToken()
console.log("token", token)
  return <div>DASHBOARD! <LogoutButton></LogoutButton></div>;
}

export default Page;
