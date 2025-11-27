import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Eye, EyeOff } from 'lucide-react'

export function Register() {
  const { register } = useAuth()

  const [form, setForm] = useState({
    name: '',
    username: '',
    email: '',
    age: '',
    gender: 'u',
    password: '',
    confirmPassword: '',
  })

  const update = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const [showPass, setShowPass] = useState(false)
  const [showConfirmPass, setShowConfirmPass] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await register({ ...form, age: Number(form.age) })
  }

  // 🎨 Estilo único de input com borda suave + sombra elegante
  const inputStyle =
    'w-full px-4 py-2 rounded-md ' +
    'bg-[#2e3b4a] ' + // 🔵 fundo atualizado
    'shadow-[0_2px_6px_rgba(0,0,0,0.15)] ' +
    'focus:border-primary focus:shadow-[0_0_8px_rgba(0,0,0,0.25)] ' +
    'outline-none text-white placeholder:opacity-60'

  return (
    <div className="card bg-base-100 shadow-lg w-full max-w-lg mx-auto p-2">
      <form className="card-body space-y-4" onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold text-center text-primary">
          Cadastro
        </h1>

        {/* Nome */}
        <input
          className={inputStyle}
          placeholder="Nome"
          value={form.name}
          onChange={(e) => update('name', e.target.value)}
        />

        {/* Usuário */}
        <input
          className={inputStyle}
          placeholder="Usuário"
          value={form.username}
          onChange={(e) => update('username', e.target.value)}
        />

        {/* Email */}
        <input
          className={inputStyle}
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => update('email', e.target.value)}
        />

        {/* Idade */}
        <input
          className={inputStyle}
          placeholder="Idade"
          type="number"
          value={form.age}
          onChange={(e) => update('age', e.target.value)}
        />

        {/* Gênero */}
        <select
          className={inputStyle + 'cursor-pointer'}
          value={form.gender}
          onChange={(e) => update('gender', e.target.value)}
        >
          <option value="m">Masculino</option>
          <option value="f">Feminino</option>
          <option value="u">Outro</option>
        </select>

        {/* Senha */}
        <div className="relative w-full">
          <input
            className={inputStyle}
            placeholder="Senha (8+ caracteres, A-z, número e símbolo)"
            type={showPass ? 'text' : 'password'}
            value={form.password}
            onChange={(e) => update('password', e.target.value)}
          />

          <button
            type="button"
            className="absolute right-3 top-2.5 text-primary"
            onClick={() => setShowPass((p) => !p)}
          >
            {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Confirmar Senha */}
        <div className="relative w-full">
          <input
            className={inputStyle}
            placeholder="Confirmar senha"
            type={showConfirmPass ? 'text' : 'password'}
            value={form.confirmPassword}
            onChange={(e) => update('confirmPassword', e.target.value)}
          />

          <button
            type="button"
            className="absolute right-3 top-2.5 text-primary"
            onClick={() => setShowConfirmPass((p) => !p)}
          >
            {showConfirmPass ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Botão */}
        <button className="btn w-full bg-primary text-white hover:bg-primary-focus">
          Cadastrar
        </button>
      </form>
    </div>
  )
}
