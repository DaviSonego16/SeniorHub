import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export function Login() {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await login(email, password);
  }

  return (
    <div className="card bg-base-100 shadow-md w-full max-w-md mx-auto">
      <form className="card-body space-y-4" onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold text-center">Login</h1>

        <input
          className="input input-bordered w-full"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="input input-bordered w-full"
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-primary w-full">
          {loading ? "Carregando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
