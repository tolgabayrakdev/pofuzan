import { Link } from "react-router"
import { Eye, EyeOff, Shield, Lock, KeyRound } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription } from "@/components/ui/card"
import { toast } from "sonner"

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    
    const accessCode = formData.get("accessCode") as string
    const expectedCode = "INTEL2024"
    
    if (accessCode !== expectedCode) {
      toast.error("Geçersiz erişim kodu")
      setIsLoading(false)
      return
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000))
    toast.success("Giriş başarılı")
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
          <h1 className="text-2xl font-bold tracking-tight">INTEL Sistemi</h1>
          <CardDescription>
            Güvenli erişim için kimlik bilgilerinizi girin
          </CardDescription>
        </div>

        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="accessCode" className="text-sm font-medium">
                  Erişim Kodu
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="accessCode"
                    name="accessCode"
                    type="password"
                    placeholder="Erişim kodu girin"
                    className="pl-9 font-mono"
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Sisteme erişim için gizli kodu girin
                </p>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  E-posta / Kullanıcı Adı
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="operator@sistem.gov"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium">
                    Şifre
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-xs text-muted-foreground hover:text-primary"
                  >
                    Şifremi unuttum
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
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

              <Button type="submit" className="w-full" disabled={isLoading}>
                <Lock size={16} className="mr-2" />
                {isLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center text-xs text-muted-foreground">
          <p>Yetkisiz erişim yasaktır.</p>
          <p>Tüm faaliyetler kayıt altına alınır.</p>
        </div>
      </div>
    </div>
  )
}
