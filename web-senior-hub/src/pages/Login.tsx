import { useState } from "react";
import { useAuth } from "../context/useAuth";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Login() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const ok = await login(email, password);

    if (ok) {
      navigate("/"); // redireciona após sucesso
    }
  }

  const inputStyle =
    "w-full px-4 py-2 rounded-lg " +
    "bg-[var(--color-bg-secondary)] border border-transparent " +
    "focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-light)] " +
    "text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] " +
    "transition-all duration-200 shadow-md";

  return (
    <div className="card-anime w-full max-w-lg mx-auto p-2 mt-10">
      <form className="space-y-6 p-6" onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold text-center text-[var(--color-primary)]">
          Login
        </h1>

        {/* Email */}
        <input
          className={inputStyle}
          placeholder="Email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Senha */}
        <div className="relative w-full">
          <input
            className={inputStyle}
            placeholder="Senha"
            type={showPassword ? "text" : "password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            className="absolute right-3 top-3 text-[var(--color-primary)] hover:opacity-80 transition"
            onClick={() => setShowPassword((p) => !p)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Botão entrar */}
        <button
          disabled={loading}
          className="btn-anime w-full py-2 text-center font-semibold disabled:opacity-60"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
