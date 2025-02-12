"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "framer-motion";
import { User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

import { login } from "@/app/(auth)/actions/auth";

export default function SignInPage() {
  const [state, formAction, isLoading] = useActionState(login, null);
  const router = useRouter();
 

  useEffect(() => {
    if (state?.isSuccess) {
      router.push("/dashboard");
    }
  }, [state, router]);


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
              <form action={formAction} className="space-y-4">
      {state?.message && (
        <div className="text-red-500 text-sm text-center">
          {state.message}
        </div>
      )}
      <Input
        type="email"
        name="email"  // Add name attribute
        placeholder="Email"
        required
      />
      <Input
        type="password"
        name="password"  // Add name attribute
        placeholder="Password"
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
