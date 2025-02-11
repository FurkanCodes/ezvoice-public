import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

interface VerificationFormProps {
  code: string;
  error: any;
  isLoading: boolean;
  isPolling: boolean; // Add this new prop
  onChange: (verification: { show: boolean; code: string; isPolling: boolean }) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
}

const VerificationForm = ({ 
  code, 
  error, 
  isLoading, 
  isPolling, 
  onChange, 
  onSubmit 
}: VerificationFormProps) => {
  return (
    <motion.div 
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}

  >
    <form className="mt-8 space-y-6" onSubmit={onSubmit}>
      {error && <div className="text-red-500 text-center text-sm">{error}</div>}
      <h2 className="text-center text-3xl font-extrabold text-gray-900">
          {"Verify Your Email"}
        </h2>
      <div className="space-y-4">
        <Input
          name="verificationCode"
          type="text"
          required
          className="w-full"
          placeholder="Verification code"
          value={code}
          onChange={(e) => onChange({ show: true, code: e.target.value, isPolling })}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading || isPolling}>
        {isLoading ? "Verifying..." : "Verify Code"}
      </Button>

      <div className="text-center text-sm">
        <p className="text-gray-600">
          {isPolling ? (
            <>
              Waiting for email verification...
              <br />
              Please check your email and click the verification link
            </>
          ) : (
            "Please enter the verification code sent to your email"
          )}
        </p>
      </div>
    </form>
    </motion.div>
  );
};

export default VerificationForm;