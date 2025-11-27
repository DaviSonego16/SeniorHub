import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff } from "lucide-react";

export function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await login(email, password);
  }

  // 🎨 Estilo único igual ao Register
  const inputStyle =
    "w-full px-4 py-2 rounded-md " +
    "bg-[#2e3b4a] " + // fundo igual
    "shadow-[0_2px_6px_rgba(0,0,0,0.15)] " +
    "focus:border-primary focus:shadow-[0_0_8px_rgba(0,0,0,0.25)] " +
    "outline-none text-white placeholder:opacity-60";

  return (
    <div className="card bg-base-100 shadow-lg w-full max-w-lg mx-auto p-2">
      <form className="card-body space-y-4" onSubmit={handleSubmit}>

        <h1 className="text-3xl font-bold text-center text-primary">
          Login
        </h1>

        {/* Email */}
        <input
          className={inputStyle}
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Senha */}
        <div className="relative w-full">
          <input
            className={inputStyle}
            placeholder="Senha"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Botão mostrar/ocultar */}
          <button
            type="button"
            className="absolute right-3 top-2.5 text-primary"
            onClick={() => setShowPassword((p) => !p)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
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
