import { Link } from "react-router"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ForgotPassword() {
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    alert("Şifre sıfırlama bağlantısı e-posta adresinize gönderildi!")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Şifremi Unuttum</h1>
          <p className="text-sm text-muted-foreground">
            Şifrenizi sıfırlamak için e-posta adresinizi girin
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              E-posta
            </label>
            <Input
              id="email"
              type="email"
              placeholder="ornek@email.com"
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Bağlantı Gönder
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Giriş sayfasına dönmek için{" "}
          <Link to="/sign-in" className="text-primary hover:underline">
            tıklayın
          </Link>
        </p>
      </div>
    </div>
  )
}
