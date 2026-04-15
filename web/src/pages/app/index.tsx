import { Link } from "react-router"
import {
  Users,
  UserPlus,
  TrendingUp,
  Calendar,
  ArrowRight,
  Phone,
  MapPin,
  Target,
  Eye,
  FileSearch,
  Activity,
  Clock,
  AlertCircle,
} from "lucide-react"
import AppLayout from "@/components/layout/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import type { Person } from "@/lib/api"

const mockStats = {
  total: 156,
  active: 142,
  inactive: 14,
  high_priority: 8,
}

const mockRecentPersons: Partial<Person>[] = [
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

export default function Dashboard() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <Clock size={14} />
              <span>Son güncelleme: {new Date().toLocaleString("tr-TR")}</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Operasyon Merkezi</h1>
            <p className="text-muted-foreground">
              Kayıt yönetimi ve istihbarat analizi
            </p>
          </div>
          <Button asChild>
            <Link to="/app/persons/new">
              <UserPlus size={16} className="mr-2" />
              Yeni Kayıt
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Toplam Kayıt</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.total}</div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <Activity size={12} className="mr-1" />
                <span>Sistemde kayıtlı</span>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Aktif Kayıt</CardTitle>
              <Target className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{mockStats.active}</div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <span>Takipler devam ediyor</span>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pasif Kayıt</CardTitle>
              <Eye className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{mockStats.inactive}</div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <span>İzleme bekliyor</span>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Öncelikli</CardTitle>
              <AlertCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{mockStats.high_priority}</div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <span>Acil müdahale gerekli</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <FileSearch size={18} />
                    Son İşlemler
                  </CardTitle>
                  <CardDescription>En son eklenen kayıtlar</CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/app/persons">
                    Tümünü gör
                    <ArrowRight size={14} className="ml-1" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRecentPersons.map((person) => (
                  <Link
                    key={person.id}
                    to={`/app/persons/${person.id}`}
                    className="flex items-center gap-4 p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                  >
                    <Avatar className="h-12 w-12 border-2 border-muted">
                      <AvatarFallback className="bg-muted text-muted-foreground font-medium">
                        {getInitials(person.first_name || "", person.last_name || "")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {person.first_name} {person.last_name}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {person.basic_info?.blood_type || "?"}
                        </Badge>
                        <Badge variant="secondary" className="text-xs bg-green-500/10 text-green-600 border-green-500/20">
                          Aktif
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Phone size={10} />
                          {person.contact?.phone || "-"}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={10} />
                          {person.contact?.city || "-"}
                        </span>
                        {person.basic_info?.birth_date && (
                          <span className="flex items-center gap-1">
                            <Calendar size={10} />
                            {getAge(person.basic_info.birth_date)} y.
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date().toLocaleDateString("tr-TR")}
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target size={18} />
                Hızlı İşlemler
              </CardTitle>
              <CardDescription>Sık kullanılan operasyonlar</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              <Button variant="outline" className="justify-start h-auto py-3" asChild>
                <Link to="/app/persons/new">
                  <UserPlus size={18} className="mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Yeni Kayıt</div>
                    <div className="text-xs text-muted-foreground">
                      Yeni kayıt oluştur
                    </div>
                  </div>
                </Link>
              </Button>
              <Button variant="outline" className="justify-start h-auto py-3" asChild>
                <Link to="/app/search">
                  <FileSearch size={18} className="mr-3" />
                  <div className="text-left">
                    <div className="font-medium">İstihbarat Ara</div>
                    <div className="text-xs text-muted-foreground">
                      Detaylı arama yap
                    </div>
                  </div>
                </Link>
              </Button>
              <Separator className="my-2" />
              <Button variant="outline" className="justify-start h-auto py-3">
                <TrendingUp size={18} className="mr-3" />
                <div className="text-left">
                  <div className="font-medium">Rapor Oluştur</div>
                  <div className="text-xs text-muted-foreground">
                    Analiz raporu al
                  </div>
                </div>
              </Button>
              <Button variant="outline" className="justify-start h-auto py-3">
                <Users size={18} className="mr-3" />
                <div className="text-left">
                  <div className="font-medium">Toplu İşlem</div>
                  <div className="text-xs text-muted-foreground">
                    Çoklu seçim yap
                  </div>
                </div>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}
