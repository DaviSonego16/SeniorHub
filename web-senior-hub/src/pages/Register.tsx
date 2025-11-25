import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export function Register() {
  const { register, loading } = useAuth();

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    age: "",
    gender: "u",
    password: "",
    confirmPassword: "",
  });

  const update = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await register({ ...form, age: Number(form.age) });
  }

  return (
    <div className="card bg-base-100 shadow-md w-full max-w-lg mx-auto">
      <form className="card-body space-y-3" onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold text-center">Cadastro</h1>

        <input
          className="input input-bordered"
          placeholder="Nome"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
        />

        <input
          className="input input-bordered"
          placeholder="Usuário"
          value={form.username}
          onChange={(e) => update("username", e.target.value)}
        />

        <input
          className="input input-bordered"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
        />

        <input
          className="input input-bordered"
          placeholder="Idade"
          type="number"
          value={form.age}
          onChange={(e) => update("age", e.target.value)}
        />

        <select
          className="select select-bordered"
          value={form.gender}
          onChange={(e) => update("gender", e.target.value)}
        >
          <option value="m">Masculino</option>
          <option value="f">Feminino</option>
          <option value="u">Outro</option>
        </select>

        <input
          className="input input-bordered"
          placeholder="Senha"
          type="password"
          value={form.password}
          onChange={(e) => update("password", e.target.value)}
        />

        <input
          className="input input-bordered"
          placeholder="Confirmar senha"
          type="password"
          value={form.confirmPassword}
          onChange={(e) => update("confirmPassword", e.target.value)}
        />

        <button className="btn btn-secondary w-full">
          {loading ? "Carregando..." : "Cadastrar"}
        </button>
      </form>
    </div>
  );
}
