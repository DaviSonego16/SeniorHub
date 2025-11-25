import { Outlet } from "react-router-dom";
import Header from "./components/Header";

export default function App() {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      {/* Header global */}
      <Header />

      {/* Conteúdo */}
      <main className="flex-1 pt-24 px-4 md:px-6 max-w-5xl mx-auto w-full">
        <Outlet />
      </main>
    </div>
  );
}
