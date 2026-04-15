import { useState } from "react"
import { Shield, User, Lock, Bell, Database, Monitor, Save, AlertTriangle } from "lucide-react"
import AppLayout from "@/components/layout/app-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"

export default function Settings() {
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [compactView, setCompactView] = useState(false)

  const handleSave = () => {
    toast.success("Ayarlar kaydedildi")
  }

  return (
    <AppLayout>
      <div className="space-y-6 max-w-3xl">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Shield size={14} />
            <span>Sistem Yapılandırma</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Ayarlar</h1>
          <p className="text-muted-foreground">
            Sistem ve hesap ayarlarınızı yönetin
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <User size={16} />
              Profil Bilgileri
            </CardTitle>
            <CardDescription>
              Operatör profil bilgileri
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="username">Kullanıcı Adı</Label>
                <Input id="username" defaultValue="operator" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-posta</Label>
                <Input id="email" type="email" defaultValue="operator@sistem.gov" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="fullname">Tam Ad</Label>
              <Input id="fullname" defaultValue="Operatör" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Lock size={16} />
              Güvenlik
            </CardTitle>
            <CardDescription>
              Hesap güvenlik ayarları
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Mevcut Şifre</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="new-password">Yeni Şifre</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Şifre Onay</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <AlertTriangle size={16} className="text-yellow-500" />
                <div>
                  <p className="text-sm font-medium">İki Faktörlü Doğrulama</p>
                  <p className="text-xs text-muted-foreground">Hesabınız için ekstra güvenlik</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Etkinleştir</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Bell size={16} />
              Bildirimler
            </CardTitle>
            <CardDescription>
              Sistem bildirim ayarları
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">E-posta Bildirimleri</p>
                <p className="text-xs text-muted-foreground">Önemli olaylarda e-posta al</p>
              </div>
              <Switch
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Sistem Güncellemeleri</p>
                <p className="text-xs text-muted-foreground">Sistem bakım ve güncelleme bildirimleri</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Monitor size={16} />
              Görünüm
            </CardTitle>
            <CardDescription>
              Arayüz tercihleri
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Koyu Tema</p>
                <p className="text-xs text-muted-foreground">Karanlık arayüz modu</p>
              </div>
              <Switch
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Sıkı Görünüm</p>
                <p className="text-xs text-muted-foreground">Daha kompakt arayüz düzeni</p>
              </div>
              <Switch
                checked={compactView}
                onCheckedChange={setCompactView}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Database size={16} />
              Veri Yönetimi
            </CardTitle>
            <CardDescription>
              Veri ve depolama ayarları
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div>
                <p className="text-sm font-medium">Veri Yedekleme</p>
                <p className="text-xs text-muted-foreground">Tüm kayıtları yedekle</p>
              </div>
              <Button variant="outline" size="sm">Yedekle</Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between p-3 rounded-lg border border-destructive/20 bg-destructive/5">
              <div>
                <p className="text-sm font-medium text-destructive">Verileri Temizle</p>
                <p className="text-xs text-muted-foreground">Tüm yerel verileri sil</p>
              </div>
              <Button variant="destructive" size="sm">Temizle</Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-end gap-4">
          <Button variant="outline">İptal</Button>
          <Button onClick={handleSave}>
            <Save size={16} className="mr-2" />
            Kaydet
          </Button>
        </div>
      </div>
    </AppLayout>
  )
}
