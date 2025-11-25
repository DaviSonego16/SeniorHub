import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Home() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center text-center gap-6">
      <h1 className="text-4xl font-bold text-primary">
        Bem-vindo ao Senior Hub
      </h1>

      {!user ? (
        <div className="flex gap-6 mt-4">
          <Link to="/login" className="btn btn-primary btn-lg">
            Já tenho conta
          </Link>

          <Link to="/register" className="btn btn-secondary btn-lg">
            Quero me cadastrar
          </Link>
        </div>
      ) : (
        <div className="alert alert-success w-full max-w-lg">
          <span>Você está logado como <b>{user.name}</b></span>
        </div>
      )}
    </div>
  );
}
