export interface AuthResponse {
    token: string
    refreshToken: string
    uid: string
  }
  
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
  
  