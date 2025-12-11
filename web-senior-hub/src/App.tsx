import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Header from './components/Header'

export default function App() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] flex flex-col transition-colors">
      {/* Header global */}
      <Header />

      {/* Conteúdo principal */}
      <main
        className="
          flex-1 
          pt-24 
          px-4 md:px-6 
          max-w-6xl 
          mx-auto 
          w-full 
          bg-[var(--color-bg)]
        "
      >
        <Toaster position="top-right" />
        <Outlet />
      </main>
    </div>
  )
}
