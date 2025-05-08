export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  tokens?: {
    accessToken: string;
    refreshToken: string;
  };
  user?: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    fullName: string;
    avatar?: string;
  };
  message?: string;
}

export interface AuthError {
  message: string;
  status: number;
} 