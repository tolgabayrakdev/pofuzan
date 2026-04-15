import { Link } from "react-router"
import { Eye, EyeOff, Shield, UserPlus, KeyRound, Lock } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription } from "@/components/ui/card"
import { toast } from "sonner"

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [accessCode, setAccessCode] = useState("")
  const [accessCodeError, setAccessCodeError] = useState(false)

  const INVITATION_CODE = "INVITE2024"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (accessCode !== INVITATION_CODE) {
      setAccessCodeError(true)
      toast.error("Geçersiz davet kodu")
      return
    }

    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    toast.success("Hesap başarıyla oluşturuldu")
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-primary/10">
              <Shield className="h-10 w-10 text-primary" />
            </div>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Yeni Operatör Kaydı</h1>
          <CardDescription>
            Sisteme erişim için davet kodu gereklidir
          </CardDescription>
        </div>

        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="inviteCode" className="text-sm font-medium flex items-center gap-1.5">
                  <KeyRound size={14} />
                  Davet Kodu *
                </label>
                <Input
                  id="inviteCode"
                  type="password"
                  placeholder="Davet kodunu girin"
                  className={`font-mono ${accessCodeError ? "border-destructive" : ""}`}
                  value={accessCode}
                  onChange={(e) => {
                    setAccessCode(e.target.value)
                    setAccessCodeError(false)
                  }}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Sistemi kullanmak için yönetici tarafından verilen davet kodunu girin
                </p>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    veya
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium flex items-center gap-1.5">
                  <UserPlus size={14} />
                  Ad Soyad
                </label>
                <Input id="name" type="text" placeholder="Ad Soyad" required />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  E-posta
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="operator@sistem.gov"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Şifre
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium">
                  Şifre Tekrar
                </label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    className="pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                <Lock size={16} className="mr-2" />
                {isLoading ? "Kayıt yapılıyor..." : "Kayıt Ol"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground">
          Zaten hesabınız var mı?{" "}
          <Link to="/sign-in" className="text-primary hover:underline">
            Giriş yapın
          </Link>
        </p>

        <div className="text-center text-xs text-muted-foreground">
          <p>Yetkisiz kayıt girişimleri engellenir.</p>
        </div>
      </div>
    </div>
  )
}
