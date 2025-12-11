import { useState } from 'react'
import { useAuth } from '../context/useAuth'
import { Eye, EyeOff } from 'lucide-react'
import type { RegisterDTO } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export function Register() {
  const { register } = useAuth()
  const navigate = useNavigate();

  const [form, setForm] = useState<RegisterDTO>({
    name: '',
    username: '',
    email: '',
    age: 0,
    gender: 'u',
    password: '',
    confirmPassword: '',
  })

  const update = (key: keyof RegisterDTO, value: string | number) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const [showPass, setShowPass] = useState(false)
  const [showConfirmPass, setShowConfirmPass] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const ok = await register({
      ...form,
      age: Number(form.age),
    })

    if (ok) {
      navigate('/')
    }
  }

  const inputStyle =
    'w-full px-4 py-2 rounded-lg ' +
    'bg-[var(--color-bg-secondary)] border border-transparent ' +
    'focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-light)] ' +
    'text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] ' +
    'transition-all duration-200 shadow-md'

  return (
    <div className="card-anime w-full max-w-lg mx-auto p-2 mt-10">
      <form className="space-y-6 p-6" onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold text-center text-[var(--color-primary)]">
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
          onChange={(e) => update('age', Number(e.target.value))}
        />

        {/* Gênero */}
        <select
          className={`${inputStyle} cursor-pointer`}
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
            className="absolute right-3 top-3 text-[var(--color-primary)] hover:opacity-80 transition"
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
            className="absolute right-3 top-3 text-[var(--color-primary)] hover:opacity-80 transition"
            onClick={() => setShowConfirmPass((p) => !p)}
          >
            {showConfirmPass ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <button className="btn-anime w-full py-2 text-center font-semibold">
          Cadastrar
        </button>
      </form>
    </div>
  )
}
