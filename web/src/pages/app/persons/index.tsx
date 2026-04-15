import { useState } from "react"
import { Link } from "react-router"
import {
  Search,
  MoreHorizontal,
  UserPlus,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Eye,
  Edit,
  Trash2,
  FileSearch,
  Download,
} from "lucide-react"
import AppLayout from "@/components/layout/app-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
  {
    id: 4,
    first_name: "Fatma",
    last_name: "Özkan",
    basic_info: { id: 4, person_id: 4, birth_date: "1995-01-30", birth_place: "Bursa", gender: "female", nationality: "Türk", identity_number: "32165498701", blood_type: "AB+" },
    contact: { id: 4, person_id: 4, phone: "0535 111 2233", phone_secondary: null, email: "fatma@example.com", address: "Nilüfer", city: "Bursa", country: "Türkiye", postal_code: "16000" },
  },
  {
    id: 5,
    first_name: "Ali",
    last_name: "Çelik",
    basic_info: { id: 5, person_id: 5, birth_date: "1982-06-18", birth_place: "Antalya", gender: "male", nationality: "Türk", identity_number: "78945612301", blood_type: "A-" },
    contact: { id: 5, person_id: 5, phone: "0536 555 6677", phone_secondary: null, email: "ali@example.com", address: "Muratpaşa", city: "Antalya", country: "Türkiye", postal_code: "07000" },
  },
]

function getInitials(firstName: string, lastName: string) {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return "-"
  return new Date(dateStr).toLocaleDateString("tr-TR")
}

export default function PersonsList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [genderFilter, setGenderFilter] = useState<string>("all")
  const [cityFilter, setCityFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredPersons = mockPersons.filter((person) => {
    const matchesSearch =
      searchQuery === "" ||
      `${person.first_name} ${person.last_name}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      person.contact?.phone?.includes(searchQuery) ||
      person.contact?.email?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesGender =
      genderFilter === "all" || person.basic_info?.gender === genderFilter

    const matchesCity =
      cityFilter === "all" || person.contact?.city === cityFilter

    return matchesSearch && matchesGender && matchesCity
  })

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileSearch size={14} />
              <span>Kayıt Yönetimi</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Kayıtlar</h1>
            <p className="text-muted-foreground">
              Toplam {filteredPersons.length} kayıt bulundu
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download size={14} className="mr-2" />
              Dışa Aktar
            </Button>
            <Button asChild>
              <Link to="/app/persons/new">
                <UserPlus size={14} className="mr-2" />
                Yeni Kayıt
              </Link>
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="relative flex-1 min-w-[280px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="İsim, telefon veya e-posta ara..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Durum" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tümü</SelectItem>
                  <SelectItem value="active">Aktif</SelectItem>
                  <SelectItem value="inactive">Pasif</SelectItem>
                  <SelectItem value="priority">Öncelikli</SelectItem>
                </SelectContent>
              </Select>
              <Select value={genderFilter} onValueChange={setGenderFilter}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Cinsiyet" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tümü</SelectItem>
                  <SelectItem value="male">Erkek</SelectItem>
                  <SelectItem value="female">Kadın</SelectItem>
                  <SelectItem value="other">Diğer</SelectItem>
                </SelectContent>
              </Select>
              <Select value={cityFilter} onValueChange={setCityFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Şehir" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tümü</SelectItem>
                  <SelectItem value="İstanbul">İstanbul</SelectItem>
                  <SelectItem value="Ankara">Ankara</SelectItem>
                  <SelectItem value="İzmir">İzmir</SelectItem>
                  <SelectItem value="Bursa">Bursa</SelectItem>
                  <SelectItem value="Antalya">Antalya</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-[50px]">#</TableHead>
                  <TableHead>Kayıt Bilgileri</TableHead>
                  <TableHead>İletişim</TableHead>
                  <TableHead>Doğum</TableHead>
                  <TableHead>Konum</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPersons.map((person, index) => (
                  <TableRow key={person.id} className="group">
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {String(index + 1).padStart(3, "0")}
                    </TableCell>
                    <TableCell>
                      <Link
                        to={`/app/persons/${person.id}`}
                        className="flex items-center gap-3 hover:underline"
                      >
                        <Avatar className="h-10 w-10 border border-muted">
                          <AvatarFallback className="bg-muted text-muted-foreground font-medium text-sm">
                            {getInitials(person.first_name || "", person.last_name || "")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">
                            {person.first_name} {person.last_name}
                          </div>
                          <div className="text-xs text-muted-foreground flex items-center gap-2">
                            <span>{person.basic_info?.birth_place || "-"}</span>
                            <span>•</span>
                            <Badge variant="outline" className="text-[10px] h-4">
                              {person.basic_info?.blood_type || "?"}
                            </Badge>
                          </div>
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {person.contact?.phone && (
                          <div className="flex items-center gap-1 text-sm">
                            <Phone size={12} className="text-muted-foreground" />
                            {person.contact.phone}
                          </div>
                        )}
                        {person.contact?.email && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Mail size={10} />
                            {person.contact.email}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">
                      {person.basic_info?.birth_date ? (
                        <div className="flex items-center gap-1">
                          <Calendar size={12} className="text-muted-foreground" />
                          {formatDate(person.basic_info.birth_date)}
                        </div>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell>
                      {person.contact?.city ? (
                        <div className="flex items-center gap-1 text-sm">
                          <MapPin size={12} className="text-muted-foreground" />
                          {person.contact.city}
                        </div>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-green-500/10 text-green-600 border-green-500/20">
                        Aktif
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link to={`/app/persons/${person.id}`}>
                              <Eye size={14} className="mr-2" />
                              Görüntüle
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to={`/app/persons/${person.id}/edit`}>
                              <Edit size={14} className="mr-2" />
                              Düzenle
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 size={14} className="mr-2" />
                            Sil
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
