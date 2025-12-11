import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Home() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center text-center gap-8 mt-16 text-[var(--color-text)]">

      <h1 className="text-5xl font-extrabold tracking-wide text-[var(--color-primary)] drop-shadow-md">
        Bem-vindo ao Senior Hub
      </h1>

      {!user ? (
        <div className="flex gap-6 mt-6">
          <Link to="/login" className="btn-anime px-8 py-3 text-lg font-semibold">
            Já tenho conta
          </Link>

          <Link
            to="/register"
            className="btn-anime-secondary px-8 py-3 text-lg font-semibold"
          >
            Quero me cadastrar
          </Link>
        </div>
      ) : (
        <div className="
          w-full max-w-lg p-4 rounded-lg
          bg-[var(--color-bg-secondary)]
          border border-[var(--color-success)]
          text-[var(--color-success)]
          shadow-lg
        ">
          <span>
            Você está logado como <b>{user.name}</b>
          </span>
        </div>
      )}
    </div>
  );
}
