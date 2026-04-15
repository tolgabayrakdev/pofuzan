import { useState } from "react"
import { useNavigate, Link } from "react-router"
import { ArrowLeft, Save, Shield, UserPlus, Phone, Mail, MapPin, Calendar } from "lucide-react"
import AppLayout from "@/components/layout/app-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"

const initialFormData = {
  first_name: "",
  last_name: "",
  birth_date: "",
  birth_place: "",
  gender: "",
  nationality: "",
  identity_number: "",
  blood_type: "",
  phone: "",
  phone_secondary: "",
  email: "",
  address: "",
  city: "",
  country: "Türkiye",
  postal_code: "",
}

export default function NewPerson() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success("Kayıt başarıyla oluşturuldu")
      navigate("/app/persons")
    } catch {
      toast.error("Bir hata oluştu")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AppLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/app/persons">
              <ArrowLeft size={20} />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <Shield size={14} />
              <span>Yeni Kayıt Oluştur</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Yeni Kayıt</h1>
            <p className="text-muted-foreground">
              Yeni kayıt bilgilerini girin
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="basic" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="basic" className="gap-1.5">
                <UserPlus size={14} />
                Temel Bilgiler
              </TabsTrigger>
              <TabsTrigger value="contact" className="gap-1.5">
                <Phone size={14} />
                İletişim
              </TabsTrigger>
            </TabsList>

            <TabsContent value="basic">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Temel Bilgiler</CardTitle>
                  <CardDescription>
                    Kaydın temel kimlik bilgileri
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="first_name">Ad *</Label>
                      <Input
                        id="first_name"
                        value={formData.first_name}
                        onChange={(e) => handleChange("first_name", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last_name">Soyad *</Label>
                      <Input
                        id="last_name"
                        value={formData.last_name}
                        onChange={(e) => handleChange("last_name", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="birth_date">Doğum Tarihi</Label>
                      <div className="relative">
                        <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="birth_date"
                          type="date"
                          className="pl-9"
                          value={formData.birth_date}
                          onChange={(e) => handleChange("birth_date", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="birth_place">Doğum Yeri</Label>
                      <div className="relative">
                        <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="birth_place"
                          className="pl-9"
                          value={formData.birth_place}
                          onChange={(e) => handleChange("birth_place", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="gender">Cinsiyet</Label>
                      <Select
                        value={formData.gender}
                        onValueChange={(value) => handleChange("gender", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seçiniz" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Erkek</SelectItem>
                          <SelectItem value="female">Kadın</SelectItem>
                          <SelectItem value="other">Diğer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nationality">Uyruk</Label>
                      <Input
                        id="nationality"
                        value={formData.nationality}
                        onChange={(e) => handleChange("nationality", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="identity_number">T.C. Kimlik No</Label>
                      <Input
                        id="identity_number"
                        className="font-mono"
                        value={formData.identity_number}
                        onChange={(e) => handleChange("identity_number", e.target.value)}
                        maxLength={11}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="blood_type">Kan Grubu</Label>
                      <Select
                        value={formData.blood_type}
                        onValueChange={(value) => handleChange("blood_type", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seçiniz" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A+">A+</SelectItem>
                          <SelectItem value="A-">A-</SelectItem>
                          <SelectItem value="B+">B+</SelectItem>
                          <SelectItem value="B-">B-</SelectItem>
                          <SelectItem value="AB+">AB+</SelectItem>
                          <SelectItem value="AB-">AB-</SelectItem>
                          <SelectItem value="0+">0+</SelectItem>
                          <SelectItem value="0-">0-</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contact">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">İletişim Bilgileri</CardTitle>
                  <CardDescription>
                    Kaydın iletişim bilgileri
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefon</Label>
                      <div className="relative">
                        <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="05XX XXX XX XX"
                          className="pl-9"
                          value={formData.phone}
                          onChange={(e) => handleChange("phone", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone_secondary">Telefon (2)</Label>
                      <div className="relative">
                        <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="phone_secondary"
                          type="tel"
                          placeholder="05XX XXX XX XX"
                          className="pl-9"
                          value={formData.phone_secondary}
                          onChange={(e) => handleChange("phone_secondary", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">E-posta</Label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="ornek@email.com"
                        className="pl-9"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="address">Adres</Label>
                    <div className="relative">
                      <MapPin size={16} className="absolute left-3 top-3 text-muted-foreground" />
                      <Input
                        id="address"
                        className="pl-9"
                        value={formData.address}
                        onChange={(e) => handleChange("address", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="city">Şehir</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleChange("city", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Ülke</Label>
                      <Input
                        id="country"
                        value={formData.country}
                        onChange={(e) => handleChange("country", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postal_code">Posta Kodu</Label>
                      <Input
                        id="postal_code"
                        className="font-mono"
                        value={formData.postal_code}
                        onChange={(e) => handleChange("postal_code", e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex items-center justify-end gap-4 mt-6">
            <Button variant="outline" type="button" asChild>
              <Link to="/app/persons">İptal</Link>
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              <Save size={16} className="mr-2" />
              {isSubmitting ? "Kaydediliyor..." : "Kaydet"}
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  )
}
