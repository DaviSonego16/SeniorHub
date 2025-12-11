import { createContext } from "react";

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  age: number;
  gender: "m" | "f" | "u";
}

export interface RegisterDTO {
  name: string;
  username: string;
  email: string;
  age: number;
  gender: "m" | "f" | "u";
  password: string;
  confirmPassword: string;
}

export interface BackendError {
  response?: {
    data?: {
      data?: {
        message?: string;
      };
    };
  };
}

export interface AuthContextProps {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterDTO) => Promise<boolean>;
  logout: () => void;
}

// Apenas o contexto, nada mais!
export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);
