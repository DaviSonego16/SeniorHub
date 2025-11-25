import Header from '../components/Header'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="p-6 max-w-3xl mx-auto">{children}</main>
    </div>
  )
}
