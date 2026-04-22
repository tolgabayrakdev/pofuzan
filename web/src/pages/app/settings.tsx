import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useTheme } from "@/components/theme/theme-provider"

export default function Settings() {
  const [isLoading, setIsLoading] = useState(false)
  const { theme, setTheme } = useTheme()

  const handleSave = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 1000)
  }

  return (
    <div className="p-4 md:p-6 pb-20 md:pb-6 space-y-6 max-w-2xl">
        <div>
          <h1 className="text-lg font-heading tracking-tight">Ayarlar</h1>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
            Sistem yapılandırması
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xs uppercase tracking-wider">Hesap</CardTitle>
            <CardDescription className="text-[10px]">
              Profil ve güvenlik ayarları
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="username" className="uppercase text-[10px]">
                  Kullanıcı Adı
                </Label>
                <Input id="username" defaultValue="admin" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email" className="uppercase text-[10px]">
                  E-posta
                </Label>
                <Input id="email" type="email" defaultValue="admin@pofuzan.com" />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="role" className="uppercase text-[10px]">
                Yetki Seviyesi
              </Label>
              <Input id="role" defaultValue="Admin - Level 1" disabled />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xs uppercase tracking-wider">Görünüm</CardTitle>
            <CardDescription className="text-[10px]">
              Tema ve arayüz ayarları
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label className="uppercase text-[10px]">Tema</Label>
              <div className="flex gap-2">
                {(["light", "dark", "system"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTheme(t)}
                    className={cn(
                      "flex-1 px-3 py-2 text-[10px] uppercase tracking-wider border transition-colors",
                      theme === t
                        ? "bg-foreground text-background border-foreground"
                        : "bg-transparent text-muted-foreground border-border hover:bg-muted"
                    )}
                  >
                    {t === "light" && "Açık"}
                    {t === "dark" && "Koyu"}
                    {t === "system" && "Sistem"}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs">Monospace Font</p>
                <p className="text-[10px] text-muted-foreground">JetBrains Mono</p>
              </div>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-[10px]">Aktif</span>
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xs uppercase tracking-wider">Güvenlik</CardTitle>
            <CardDescription className="text-[10px]">
              Şifre ve oturum ayarları
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="currentPassword" className="uppercase text-[10px]">
                Mevcut Şifre
              </Label>
              <Input id="currentPassword" type="password" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="newPassword" className="uppercase text-[10px]">
                  Yeni Şifre
                </Label>
                <Input id="newPassword" type="password" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="confirmPassword" className="uppercase text-[10px]">
                  Şifre Tekrar
                </Label>
                <Input id="confirmPassword" type="password" />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-border">
              <div>
                <p className="text-xs">İki Faktörlü Doğrulama</p>
                <p className="text-[10px] text-muted-foreground">2FA aktif değil</p>
              </div>
              <Button variant="outline" size="sm" className="text-[10px] uppercase tracking-wider">
                Etkinleştir
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xs uppercase tracking-wider">Gizlilik</CardTitle>
            <CardDescription className="text-[10px]">
              Veri işleme ve gizlilik politikası
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-muted/50 rounded-md text-[10px] space-y-2">
              <p className="font-medium uppercase">Kişisel Verilerin İşlenmesi</p>
              <p className="text-muted-foreground leading-relaxed">
                Bu sistemde kayıt altına alınan tüm kişi ve işlem verileri, yalnızca sistem
                güvenliği ve denetim amaçlı işlenir. Kişisel bilgiler (ad, TC kimlik no, adres,
                iletişim bilgileri) veritabanında şifrelenmiş olarak saklanır ve üçüncü taraflarla
                paylaşılmaz.
              </p>
            </div>

            <div className="p-3 bg-muted/50 rounded-md text-[10px] space-y-2">
              <p className="font-medium uppercase">İşlem Geçmişi</p>
              <p className="text-muted-foreground leading-relaxed">
                Tüm kullanıcı işlemleri (kayıt ekleme, güncelleme, silme, görüntüleme) tarih,
                saat ve kullanıcı bilgisiyle birlikte loglanır. Bu kayıtlar denetim amaçlı
                tutulur ve silinemez.
              </p>
            </div>

            <div className="p-3 bg-muted/50 rounded-md text-[10px] space-y-2">
              <p className="font-medium uppercase">Veri Güvenliği</p>
              <p className="text-muted-foreground leading-relaxed">
                Veriler, endüstri standardı şifreleme protokolleri ile korunmaktadır. Yetkisiz
                erişim attemptleri sistem tarafından loglanır ve engellenir.
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-border">
              <div>
                <p className="text-xs">KVKK Uyumu</p>
                <p className="text-[10px] text-muted-foreground">6698 sayılı KVKK kapsamında</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-[10px]">Aktif</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xs uppercase tracking-wider">Sistem</CardTitle>
            <CardDescription className="text-[10px]">
              Sistem bilgileri ve logları
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 font-mono text-[10px]">
              <div className="flex justify-between py-1 border-b border-border">
                <span className="text-muted-foreground">Versiyon</span>
                <span>2.4.1</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border">
                <span className="text-muted-foreground">Veritabanı</span>
                <span className="text-green-500">Bağlı</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border">
                <span className="text-muted-foreground">Son Giriş</span>
                <span>2026-04-17 12:34:56</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border">
                <span className="text-muted-foreground">IP Adresi</span>
                <span>192.168.1.xxx</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-muted-foreground">Oturum Süresi</span>
                <span>02:34:12</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 border border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Kaydediliyor...
              </span>
            ) : (
              "Değişiklikleri Kaydet"
            )}
          </Button>
        </div>
      </div>
  )
}
