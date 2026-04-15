import { Link } from "react-router"

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <h1 className="text-xl font-semibold">Uygulama</h1>
          <nav className="flex items-center gap-4">
            <Link to="/settings" className="text-sm hover:underline">
              Ayarlar
            </Link>
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-lg font-medium mb-2">Hoş Geldiniz!</h2>
          <p className="text-muted-foreground">
            Ana sayfa içeriği burada görünecek.
          </p>
        </div>
      </main>
    </div>
  )
}
