import Header from "../components/Header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] flex flex-col">
      {/* Header global */}
      <Header />

      {/* Conteúdo */}
      <main className="p-6 max-w-4xl mx-auto w-full bg-[var(--color-bg)]">
        {children}
      </main>
    </div>
  );
}
