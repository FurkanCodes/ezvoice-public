import { apiClient } from "@/utils/api-client";

interface AuthResponse {
  token: string;
  refreshToken: string;
  uid: string;
}

interface RegisterRequest {
  email: string;
  password: string;
}

interface VerifyEmailRequest {
  code: string;
}

interface VerificationStatusResponse {
  isVerified: boolean;
}

interface AuthError {
  message: string;
  statusCode?: number;
}

interface PollingOptions {
  onVerified?: () => void;
  onTimeout?: () => void;
  interval?: number;
  timeout?: number;
}

export const useAuthService = () => {
  let pollingInterval: NodeJS.Timeout | null = null;

  const handleAuthError = async (error: unknown, fallbackMessage: string): Promise<string> => {
    if (error instanceof Response) {
      try {
        const errorData = await error.json();
        return errorData.message || fallbackMessage;
      } catch {
        return fallbackMessage;
      }
    }

    if (error instanceof Error) {
      return error.message;
    }

    return fallbackMessage;
  };

  const register = async (credentials: RegisterRequest): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post('/auth/register', credentials);
      return response.data;
    } catch (error) {
      const errorMessage = await handleAuthError(error, 'Registration failed');
      throw new Error(errorMessage);
    }
  };

  const login = async (credentials: RegisterRequest): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      const errorMessage = await handleAuthError(error, 'Login failed');
      throw new Error(errorMessage);
    }
  };

  const verifyEmail = async (request: VerifyEmailRequest): Promise<void> => {
    try {
      await apiClient.post('/auth/verify-email-with-code', request, {
        params: { code: request.code }
      });
    } catch (error) {
      const errorMessage = await handleAuthError(error, 'Email verification failed');
      throw new Error(errorMessage);
    }
  };

  const checkVerificationStatus = async (): Promise<VerificationStatusResponse> => {
    try {
      const response = await apiClient.get('/auth/verification-status');
      return response.data;
    } catch (error) {
      const errorMessage = await handleAuthError(error, 'Failed to check verification status');
      throw new Error(errorMessage);
    }
  };

  const startPollingVerificationStatus = ({
    onVerified,
    onTimeout,
    interval = 5000,
    timeout = 300000
  }: PollingOptions = {}) => {
    // Clear any existing polling interval
    stopPollingVerificationStatus();

    // Start polling
    pollingInterval = setInterval(async () => {
      try {
        const { isVerified } = await checkVerificationStatus();
        if (isVerified) {
          stopPollingVerificationStatus();
          onVerified?.();
        }
      } catch (error) {
        console.error('Error checking verification status:', error);
      }
    }, interval);

    // Set timeout to stop polling
    setTimeout(() => {
      if (pollingInterval) {
        stopPollingVerificationStatus();
        onTimeout?.();
      }
    }, timeout);

    return () => stopPollingVerificationStatus();
  };

  const stopPollingVerificationStatus = () => {
    if (pollingInterval) {
      clearInterval(pollingInterval);
      pollingInterval = null;
    }
  };

  return {
    register,
    login,
    verifyEmail,
    checkVerificationStatus,
    startPollingVerificationStatus,
    stopPollingVerificationStatus
  };
};

export type {
  AuthResponse,
  RegisterRequest,
  VerifyEmailRequest,
  VerificationStatusResponse,
  AuthError,
  PollingOptions
};