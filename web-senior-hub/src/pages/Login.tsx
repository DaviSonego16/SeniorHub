import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await login(email, password);
  }

  return (
    <div className="card bg-base-100 shadow-md w-full max-w-md mx-auto">
      <form className="card-body space-y-4" onSubmit={handleSubmit}>

        <h1 className="text-3xl font-bold text-center text-primary">
          Login
        </h1>

        {/* INPUT EMAIL - apenas texto alterado */}
        <input
          className="input input-bordered w-full text-primary"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* INPUT SENHA + mostrar/ocultar */}
        <div className="relative">
          <input
            className="input input-bordered w-full text-primary"
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Botão mostrar/ocultar */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        {/* Botão */}
        <button className="btn w-full bg-primary text-white hover:bg-primary-focus">
          Entrar
        </button>

      </form>
    </div>
  );
}
