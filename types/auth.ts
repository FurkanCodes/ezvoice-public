
  
  export interface RegisterRequest {
    email: string
    password: string
  }
  
  export interface VerifyEmailRequest {
    code: string
  }
  
  export interface VerificationStatusResponse {
    isVerified: boolean
  }
  
  export interface AuthError {
    message: string
    statusCode?: number
  }
  
  
export interface AuthResponse {
  isSuccess: boolean;
  message?: string;
  requiresVerification?: boolean;
  token?: string;
  refreshToken?: string;
  error?: string
}

export interface AuthRegisterResponse {
  message: string
  requiresVerification: boolean 
}
  
export interface VerifyEmailResponse      { success: boolean, message: string}
  
 
  export interface AuthSuccessResponse {
    data: {
      token: string;
      refreshToken: string;
      // ... any other data properties
    };
    errors: never[];
    isSuccess: true;
    message: string;
    statusCode: 200;
  }
  
  // You could also create a union type for all possible responses:
  export type AuthResponseType = AuthSuccessResponse | AuthResponse;
  