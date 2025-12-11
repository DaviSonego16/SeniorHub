import { useState } from "react";
import { api } from "../api/api";
import toast from "react-hot-toast";
import {
  AuthContext,
  type BackendError,
  type RegisterDTO,
  type User,
} from "./AuthContext";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  function extractErrorMessage(error: BackendError): string {
    return (
      error?.response?.data?.data?.message ||
      "Ocorreu um erro inesperado. Tente novamente."
    );
  }

  async function login(email: string, password: string): Promise<boolean> {
    try {
      setLoading(true);
      const response = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", response.data.token);
      setUser(response.data.user);

      toast.success("Login realizado com sucesso!");
      return true;
    } catch (error) {
      const msg = extractErrorMessage(error as BackendError);
      toast.error(msg);
      console.error("Erro login:", error);
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function register(data: RegisterDTO): Promise<boolean> {
    try {
      setLoading(true);
      await api.post("/user", data);

      toast.success("Conta criada com sucesso!");
      return true
    } catch (error) {
      const msg = extractErrorMessage(error as BackendError);
      toast.error(msg);
      return false
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
    toast.success("Você saiu da conta.");
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
