import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import React, { useState } from "react";

interface VerificationFormProps {
  error?: string;
  isLoading: boolean;
  isPolling: boolean;
  onSubmit: (code: string) => void;
}

const VerificationForm: React.FC<VerificationFormProps> = ({ 
  error, 
  isLoading, 
  isPolling, 
  onSubmit 
}) => {
  const [code, setCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(code);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-center text-2xl font-bold text-gray-900 mb-4">
        Verify Your Email
      </h2>
      
      {error && <div className="text-red-500 text-center text-sm">{error}</div>}
      
      <div className="space-y-4">
        <Input
          name="verificationCode"
          type="text"
          required
          className="w-full"
          placeholder="Enter verification code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <Button 
          type="submit" 
          className="w-full" 
      
        >
          {isLoading ? "Verifying..." : "Verify Code"}
        </Button>
      </div>

      <div className="text-center text-sm text-gray-600">
        {isPolling ? (
          <>
            Waiting for email verification...
            <br />
            Please check your email and click the verification link.
          </>
        ) : (
          "Please enter the verification code sent to your email."
        )}
      </div>
    </motion.div>
  );
};

export default VerificationForm;
