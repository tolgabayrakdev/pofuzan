import { useState } from "react"
import { Link } from "react-router"
import { Search, Filter, Phone, Mail, MapPin, Calendar, Shield, Target } from "lucide-react"
import AppLayout from "@/components/layout/app-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import type { Person } from "@/lib/api"

const mockPersons: Partial<Person>[] = [
  {
    id: 1,
    first_name: "Ahmet",
    last_name: "Yılmaz",
    basic_info: { id: 1, person_id: 1, birth_date: "1985-03-15", birth_place: "İstanbul", gender: "male", nationality: "Türk", identity_number: "12345678901", blood_type: "A+" },
    contact: { id: 1, person_id: 1, phone: "0532 123 4567", phone_secondary: null, email: "ahmet@example.com", address: "Kadıköy", city: "İstanbul", country: "Türkiye", postal_code: "34000" },
  },
  {
    id: 2,
    first_name: "Ayşe",
    last_name: "Kaya",
    basic_info: { id: 2, person_id: 2, birth_date: "1990-07-22", birth_place: "Ankara", gender: "female", nationality: "Türk", identity_number: "98765432109", blood_type: "0+" },
    contact: { id: 2, person_id: 2, phone: "0533 987 6543", phone_secondary: null, email: "ayse@example.com", address: "Çankaya", city: "Ankara", country: "Türkiye", postal_code: "06000" },
  },
  {
    id: 3,
    first_name: "Mehmet",
    last_name: "Demir",
    basic_info: { id: 3, person_id: 3, birth_date: "1978-11-08", birth_place: "İzmir", gender: "male", nationality: "Türk", identity_number: "45678912301", blood_type: "B+" },
    contact: { id: 3, person_id: 3, phone: "0534 456 7890", phone_secondary: null, email: "mehmet@example.com", address: "Alsancak", city: "İzmir", country: "Türkiye", postal_code: "35000" },
  },
]

function getInitials(firstName: string, lastName: string) {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`
}

function getAge(birthDate: string | null) {
  if (!birthDate) return null
  const today = new Date()
  const birth = new Date(birthDate)
  let age = today.getFullYear() - birth.getFullYear()
  const m = today.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  return age
}

export default function AdvancedSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [gender, setGender] = useState<string>("")
  const [city, setCity] = useState<string>("")
  const [bloodType, setBloodType] = useState<string>("")
  const [education, setEducation] = useState<string>("")
  const [sector, setSector] = useState<string>("")
  const [searched, setSearched] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearched(true)
  }

  const clearFilters = () => {
    setSearchQuery("")
    setGender("")
    setCity("")
    setBloodType("")
    setEducation("")
    setSector("")
    setSearched(false)
  }

  const filteredPersons = searched ? mockPersons : []

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Shield size={14} />
            <span>İstihbarat Araştırma</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">İstihbarat Ara</h1>
          <p className="text-muted-foreground">
            Detaylı parametrelerle kayıt ara
          </p>
        </div>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-base">
              <Filter size={16} />
              Arama Parametreleri
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Anahtar Kelime</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="İsim, telefon, e-posta..."
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Cinsiyet</label>
                  <Select value={gender} onValueChange={setGender}>
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
                  <label className="text-sm font-medium">Şehir</label>
                  <Select value={city} onValueChange={setCity}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seçiniz" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="İstanbul">İstanbul</SelectItem>
                      <SelectItem value="Ankara">Ankara</SelectItem>
                      <SelectItem value="İzmir">İzmir</SelectItem>
                      <SelectItem value="Bursa">Bursa</SelectItem>
                      <SelectItem value="Antalya">Antalya</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Kan Grubu</label>
                  <Select value={bloodType} onValueChange={setBloodType}>
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

                <div className="space-y-2">
                  <label className="text-sm font-medium">Eğitim Durumu</label>
                  <Select value={education} onValueChange={setEducation}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seçiniz" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="primary">İlkokul</SelectItem>
                      <SelectItem value="secondary">Ortaokul</SelectItem>
                      <SelectItem value="high">Lise</SelectItem>
                      <SelectItem value="bachelor">Lisans</SelectItem>
                      <SelectItem value="master">Yüksek Lisans</SelectItem>
                      <SelectItem value="phd">Doktora</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Çalışma Sektörü</label>
                  <Select value={sector} onValueChange={setSector}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seçiniz" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tech">Teknoloji</SelectItem>
                      <SelectItem value="finance">Finans</SelectItem>
                      <SelectItem value="health">Sağlık</SelectItem>
                      <SelectItem value="education">Eğitim</SelectItem>
                      <SelectItem value="retail">Perakende</SelectItem>
                      <SelectItem value="manufacturing">Üretim</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="flex items-center gap-4">
                <Button type="submit">
                  <Search size={16} className="mr-2" />
                  Ara
                </Button>
                <Button type="button" variant="outline" onClick={clearFilters}>
                  Temizle
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {searched && (
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-base">
                <Target size={16} />
                Sonuçlar
                <Badge variant="secondary">{filteredPersons.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredPersons.length === 0 ? (
                <p className="text-center py-8 text-muted-foreground text-sm">
                  Arama kriterlerine uygun kayıt bulunamadı.
                </p>
              ) : (
                <div className="space-y-3">
                  {filteredPersons.map((person) => (
                    <Link
                      key={person.id}
                      to={`/app/persons/${person.id}`}
                      className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                    >
                      <Avatar className="h-14 w-14 border border-muted">
                        <AvatarFallback className="text-lg bg-muted font-medium">
                          {getInitials(person.first_name || "", person.last_name || "")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-base">
                            {person.first_name} {person.last_name}
                          </span>
                          {person.basic_info?.blood_type && (
                            <Badge variant="outline" className="text-xs">
                              {person.basic_info.blood_type}
                            </Badge>
                          )}
                          <Badge variant="secondary" className="bg-green-500/10 text-green-600 border-green-500/20">
                            Aktif
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                          {person.contact?.phone && (
                            <span className="flex items-center gap-1">
                              <Phone size={10} />
                              {person.contact.phone}
                            </span>
                          )}
                          {person.contact?.email && (
                            <span className="flex items-center gap-1">
                              <Mail size={10} />
                              {person.contact.email}
                            </span>
                          )}
                          {person.contact?.city && (
                            <span className="flex items-center gap-1">
                              <MapPin size={10} />
                              {person.contact.city}
                            </span>
                          )}
                          {person.basic_info?.birth_date && (
                            <span className="flex items-center gap-1">
                              <Calendar size={10} />
                              {getAge(person.basic_info.birth_date)} y.
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground font-mono">
                        #{String(person.id).padStart(6, "0")}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  )
}
