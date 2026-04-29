export interface User {
  name: string;
  role: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface AuthError {
  detail: string;
}
