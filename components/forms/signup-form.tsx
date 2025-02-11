import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SignupFormProps {
    email: string;
    password: string;
    confirmPassword: string;
    error: any;
    isLoading: boolean;
    onEmailChange: (email: string) => void;
    onPasswordChange: (password: string) => void;
    onConfirmPasswordChange: (confirmPassword: string) => void;
    onSubmit: (e: React.FormEvent) => Promise<void>;
  }
  
  const SignupForm = ({
    email,
    password,
    confirmPassword,
    error,
    isLoading,
    onEmailChange,
    onPasswordChange,
    onConfirmPasswordChange,
    onSubmit
  }: SignupFormProps) => {
    return (
      <form className="mt-8 space-y-6" onSubmit={onSubmit}>
        {error && <div className="text-red-500 text-center text-sm">{error}</div>}
        <div className="space-y-4">
          <Input
            name="email"
            type="email"
            required
            className="w-full"
            placeholder="Email address"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
          />
          <Input
            name="password"
            type="password"
            required
            className="w-full"
            placeholder="Password (min 8 characters)"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
          />
          <Input
            name="confirmPassword"
            type="password"
            required
            className="w-full"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => onConfirmPasswordChange(e.target.value)}
          />
        </div>
  
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Creating account..." : "Sign up"}
        </Button>
      </form>
    );
  };

  export default SignupForm;