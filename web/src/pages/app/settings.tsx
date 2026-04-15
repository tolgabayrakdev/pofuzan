import { Link } from "react-router"

export default function Settings() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <h1 className="text-xl font-semibold">Ayarlar</h1>
          <nav className="flex items-center gap-4">
            <Link to="/" className="text-sm hover:underline">
              Ana Sayfa
            </Link>
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md space-y-6">
          <div>
            <h2 className="text-lg font-medium mb-4">Hesap Ayarları</h2>
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <label className="text-sm font-medium">E-posta</label>
                <p className="text-muted-foreground mt-1">ornek@email.com</p>
              </div>
              <div className="rounded-lg border p-4">
                <label className="text-sm font-medium">Şifre</label>
                <p className="text-muted-foreground mt-1">********</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
