import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface VerificationFormProps {
  code: string;
  error: string;
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
    <form className="mt-8 space-y-6" onSubmit={onSubmit}>
      {error && <div className="text-red-500 text-center text-sm">{error}</div>}
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
  );
};

export default VerificationForm;