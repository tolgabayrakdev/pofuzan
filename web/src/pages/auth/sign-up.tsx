import { useState } from "react"
import { Link } from "react-router"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  async function onSubmit(e: React.SubmitEvent) {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      return
    }
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 1000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const getPasswordStrength = () => {
    const { password } = formData
    if (!password) return { level: 0, label: "" }
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    
    const labels = ["", "Zayıf", "Düşük", "Orta", "Güçlü"]
    const colors = ["", "bg-destructive", "bg-orange-500", "bg-yellow-500", "bg-green-500"]
    return { level: strength, label: labels[strength], color: colors[strength] }
  }

  const strength = getPasswordStrength()

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_40%,transparent_100%)]" />
      
      <div className="relative w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-border rounded-none text-[10px] uppercase tracking-widest text-muted-foreground">
            <span className="w-1.5 h-1.5 bg-amber-500 animate-pulse" />
            Yeni Acenta
          </div>
          <h1 className="text-xl font-heading tracking-tight">Kayıt Ol</h1>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
            Kaynak erişimi için kayıt
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="username" className="uppercase text-[10px] tracking-wider">
                  Kullanıcı Adı
                </Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="agent_name"
                  value={formData.username}
                  onChange={handleChange}
                  autoComplete="username"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email" className="uppercase text-[10px] tracking-wider">
                  E-posta
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="agent@domain.com"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password" className="uppercase text-[10px] tracking-wider">
                  Şifre
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground hover:text-foreground uppercase tracking-wider"
                  >
                    {showPassword ? "Gizle" : "Göster"}
                  </button>
                </div>
                {formData.password && (
                  <div className="space-y-1">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className={`h-0.5 flex-1 ${
                            i <= strength.level ? strength.color : "bg-input"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-[9px] text-muted-foreground uppercase tracking-wider">
                      Güvenlik: {strength.label}
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="confirmPassword" className="uppercase text-[10px] tracking-wider">
                  Şifre Tekrar
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                  disabled={isLoading}
                  className={
                    formData.confirmPassword && formData.password !== formData.confirmPassword
                      ? "border-destructive focus-visible:border-destructive"
                      : ""
                  }
                />
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="text-[9px] text-destructive uppercase tracking-wider">
                    Şifreler eşleşmiyor
                  </p>
                )}
              </div>

              <div className="flex items-start gap-2 text-[10px]">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-0.5 w-3 h-3 border border-input bg-transparent"
                  required
                />
                <label htmlFor="terms" className="text-muted-foreground leading-relaxed">
                  <span className="uppercase tracking-wider">Gizlilik sözleşmesini</span>{" "}
                  <Link to="/privacy" className="hover:text-foreground underline">
                    okudum ve kabul ediyorum
                  </Link>
                </label>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 border border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Kaydediliyor...
                  </span>
                ) : (
                  "Kayıt Ol"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center">
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
            Zaten hesabın var mı?{" "}
          </span>
          <Link
            to="/sign-in"
            className="text-[10px] uppercase tracking-wider hover:text-foreground transition-colors"
          >
            Giriş Yap
          </Link>
        </div>

        <div className="text-center text-[9px] text-muted-foreground/50 uppercase tracking-widest">
          [ REG-001 | v2.4.1 ]
        </div>
      </div>
    </div>
  )
}
