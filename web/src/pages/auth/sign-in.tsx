import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { login } from "@/lib/auth"
import { toast } from "sonner"

export default function SignIn() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ email: "", password: "" })

  async function onSubmit(e: React.SubmitEvent) {
    e.preventDefault()
    setIsLoading(true)
    try {
      await login(formData.email, formData.password)
      toast.success("Giriş başarılı")
      navigate("/app")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Giriş başarısız")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_40%,transparent_100%)]" />

      <div className="relative w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-border rounded-none text-[10px] uppercase tracking-widest text-muted-foreground">
            <span className="w-1.5 h-1.5 bg-green-500 animate-pulse" />
            Secure Access
          </div>
          <h1 className="text-xl font-heading tracking-tight">Giriş Yap</h1>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
            Kimlik doğrulama gereklidir
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="uppercase text-[10px] tracking-wider">
                  E-posta
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="agent@domain.com"
                  autoComplete="email"
                  required
                  disabled={isLoading}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password" className="uppercase text-[10px] tracking-wider">
                  Şifre
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    required
                    disabled={isLoading}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground hover:text-foreground uppercase tracking-wider"
                  >
                    {showPassword ? "Gizle" : "Göster"}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px]">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-3 h-3 border border-input bg-transparent"
                  />
                  <span className="text-muted-foreground uppercase tracking-wider">Oturum Açık Kalsın</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-muted-foreground hover:text-foreground uppercase tracking-wider"
                >
                  Unuttum
                </Link>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 border border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Doğrulanıyor...
                  </span>
                ) : (
                  "Giriş Yap"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center">
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
            Hesabın yok mu?{" "}
          </span>
          <Link
            to="/sign-up"
            className="text-[10px] uppercase tracking-wider hover:text-foreground transition-colors"
          >
            Kayıt Ol
          </Link>
        </div>

        <div className="text-center text-[9px] text-muted-foreground/50 uppercase tracking-widest">
          [ LOG-001 | v2.4.1 ]
        </div>
      </div>
    </div>
  )
}