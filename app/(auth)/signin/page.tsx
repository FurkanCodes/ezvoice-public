"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuthService } from "@/services/useAuthService";
import { validateEmail, validatePassword } from "@/utils/validators";

export default function SignInPage() {
  const router = useRouter();
  const { login } = useAuthService();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!validateEmail(email)) return setError("Invalid email address");
    if (!validatePassword(password)) return setError("Invalid password");

    try {
      setIsLoading(true);
      const { token, refreshToken } = await login({ email, password });
      
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      
      router.push("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      <div className="bg-white shadow-2xl rounded-3xl overflow-hidden relative">
        <div className="px-8 py-12 relative z-10">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex justify-center mb-8 text-center text-black"
          >
            <User size={"4rem"} />
          </motion.div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key="signin"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Sign In to Your Account
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </motion.div>
          </AnimatePresence>
          
          <motion.div 
            className="mt-8 text-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/signup" className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200">
              Dont have an account? Sign up
            </Link>
          </motion.div>
        </div>
      </div>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-8 text-center text-white text-sm"
      >
        © 2025 Envoice. All rights reserved.
      </motion.div>
    </motion.div>
  );
}
