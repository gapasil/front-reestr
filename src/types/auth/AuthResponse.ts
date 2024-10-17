export interface AuthResponse {
  token: string;
  role?: string;
  id?: number;
  error?: string;
}
