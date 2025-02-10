"use client"
import { useEffect, useState } from "react";


export const useToken = () => {
  const [token, setToken] = useState<string | null>("");
  
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      
      setToken(storedToken);
    }
  }, []);

  const removeToken = () => {
  console.log("remove token")
    localStorage.removeItem("token")
    localStorage.removeItem("refreshToken")
  }

  return {
    token,
   removeToken
  };
};
