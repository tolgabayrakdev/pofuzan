import { Link, useParams } from "react-router"
import {
  ArrowLeft,
  Edit,
  Trash2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Building,
  GraduationCap,
  Users,
  Heart,
  Baby,
  Stethoscope,
  Clock,
  Sparkles,
  FileText,
  AlertTriangle,
  Shield,
} from "lucide-react"
import AppLayout from "@/components/layout/app-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

const mockPerson = {
  id: 1,
  first_name: "Ahmet",
  last_name: "Yılmaz",
  basic_info: {
    id: 1,
    person_id: 1,
    birth_date: "1985-03-15",
    birth_place: "İstanbul",
    gender: "male",
    nationality: "Türk",
    identity_number: "12345678901",
    blood_type: "A+",
  },
  contact: {
    id: 1,
    person_id: 1,
    phone: "0532 123 4567",
    phone_secondary: "0212 555 4444",
    email: "ahmet@example.com",
    address: "Caferağa Mah. Moda Cad. No:123 Kadıköy",
    city: "İstanbul",
    country: "Türkiye",
    postal_code: "34710",
  },
  education: [
    {
      id: 1,
      person_id: 1,
      school_name: "İstanbul Teknik Üniversitesi",
      department: "Bilgisayar Mühendisliği",
      degree: "Lisans",
      start_date: "2003-09-01",
      end_date: "2007-06-01",
      is_ongoing: false,
      grade: "3.45",
    },
  ],
  work: [
    {
      id: 1,
      person_id: 1,
      company_name: "TechCorp Yazılım",
      position: "Kıdemli Yazılım Mühendisi",
      sector: "Yazılım",
      start_date: "2012-01-01",
      end_date: null,
      is_current: true,
      job_description: "Backend sistemler geliştirme ve mimari tasarım",
      salary_range: "50.000 - 80.000 TL",
    },
  ],
  family: [
    {
      id: 1,
      person_id: 1,
      relation_type: "spouse",
      full_name: "Zeynep Yılmaz",
      birth_date: "1988-05-20",
      profession: "Avukat",
      phone: "0533 999 8877",
      notes: "Deniz Hukuk Bürosu",
    },
  ],
  marriage: {
    id: 1,
    person_id: 1,
    marital_status: "married",
    spouse_name: "Zeynep Yılmaz",
    marriage_date: "2015-06-20",
    marriage_place: "İstanbul",
    divorce_date: null,
    divorce_reason: null,
  },
  children: [
    {
      id: 1,
      person_id: 1,
      child_name: "Elif Yılmaz",
      birth_date: "2018-03-15",
      gender: "female",
      education_level: "İlkokul",
      profession: null,
      is_living: true,
      notes: null,
    },
  ],
  health: {
    id: 1,
    person_id: 1,
    chronic_diseases: "Astım (hafif)",
    disabilities: null,
    allergies: "Polen alerjisi",
    regular_medications: "Ventolin (gerektiğinde)",
    blood_pressure: "Normal",
    diabetes_status: "Yok",
    mental_health_notes: null,
  },
  personality: {
    id: 1,
    person_id: 1,
    personality_type: "ENFJ",
    hobbies: "Yüzme, Satranç, Kitap okuma",
    interests: "Teknoloji, Girişimcilik",
    languages: "Türkçe (Ana), İngilizce (İleri), Almanca (Başlangıç)",
    sports: "Yüzme, Koşu",
    food_preferences: "Akdeniz mutfağı, Sebze ağırlıklı",
  },
  notes: [
    {
      id: 1,
      person_id: 1,
      user_id: 1,
      note_type: "important",
      content: "Doğum günü 15 Mart - Hatırlatıcı kur",
      is_pinned: true,
      created_at: "2024-01-15T10:30:00Z",
    },
  ],
}

function getInitials(firstName: string, lastName: string) {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return "-"
  return new Date(dateStr).toLocaleDateString("tr-TR")
}

function formatDateTime(dateStr: string) {
  return new Date(dateStr).toLocaleString("tr-TR")
}

function getGenderLabel(gender: string | null) {
  switch (gender) {
    case "male":
      return "Erkek"
    case "female":
      return "Kadın"
    default:
      return "Diğer"
  }
}

function getMaritalStatusLabel(status: string | null) {
  switch (status) {
    case "single":
      return "Bekâr"
    case "married":
      return "Evli"
    case "divorced":
      return "Boşanmış"
    case "widowed":
      return "Dul"
    case "separated":
      return "Ayrı"
    default:
      return "-"
  }
}

function getRelationLabel(type: string) {
  switch (type) {
    case "spouse":
      return "Eş"
    case "child":
      return "Çocuk"
    case "parent":
      return "Anne/Baba"
    case "sibling":
      return "Kardeş"
    default:
      return "Diğer"
  }
}

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType
  label: string
  value: React.ReactNode
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon size={14} className="text-muted-foreground mt-0.5" />
      <div>
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="font-medium text-sm">{value}</div>
      </div>
    </div>
  )
}

export default function PersonDetail() {
  const { id } = useParams()
  const person = mockPerson

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/app/persons">
                <ArrowLeft size={20} />
              </Link>
            </Button>
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border-2 border-muted">
                <AvatarFallback className="text-xl bg-muted font-medium">
                  {getInitials(person.first_name, person.last_name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-muted-foreground font-mono">
                    DOSYA NO: {String(person.id).padStart(6, "0")}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {person.basic_info.blood_type}
                  </Badge>
                  <Badge variant="secondary" className="bg-green-500/10 text-green-600 border-green-500/20">
                    Aktif
                  </Badge>
                </div>
                <h1 className="text-2xl font-bold">
                  {person.first_name} {person.last_name}
                </h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{getGenderLabel(person.basic_info.gender)}</span>
                  <span>•</span>
                  <span>{person.basic_info.birth_place}</span>
                  <span>•</span>
                  <span>{person.contact?.city}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link to={`/app/persons/${id}/edit`}>
                <Edit size={16} className="mr-2" />
                Düzenle
              </Link>
            </Button>
            <Button variant="destructive">
              <Trash2 size={16} className="mr-2" />
              Sil
            </Button>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Shield size={14} />
                Kimlik Bilgileri
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <InfoItem
                icon={Calendar}
                label="Doğum Tarihi"
                value={formatDate(person.basic_info.birth_date)}
              />
              <InfoItem
                icon={MapPin}
                label="Doğum Yeri"
                value={person.basic_info.birth_place}
              />
              <InfoItem
                icon={Sparkles}
                label="Uyruk"
                value={person.basic_info.nationality}
              />
              <InfoItem
                icon={FileText}
                label="T.C. Kimlik"
                value={
                  <span className="font-mono text-xs">
                    {person.basic_info.identity_number}
                  </span>
                }
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Phone size={14} />
                İletişim Bilgileri
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <InfoItem
                icon={Phone}
                label="Telefon"
                value={person.contact.phone}
              />
              {person.contact.phone_secondary && (
                <InfoItem
                  icon={Phone}
                  label="Telefon (2)"
                  value={person.contact.phone_secondary}
                />
              )}
              <InfoItem icon={Mail} label="E-posta" value={person.contact.email} />
              <InfoItem
                icon={MapPin}
                label="Adres"
                value={
                  <div className="text-xs">
                    <div>{person.contact.address}</div>
                    <div className="text-muted-foreground">
                      {person.contact.postal_code} {person.contact.city}
                    </div>
                  </div>
                }
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Heart size={14} />
                Medeni Durum
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <InfoItem
                icon={Heart}
                label="Durum"
                value={getMaritalStatusLabel(person.marriage?.marital_status)}
              />
              {person.marriage?.spouse_name && (
                <InfoItem
                  icon={Users}
                  label="Eş"
                  value={person.marriage.spouse_name}
                />
              )}
              {person.marriage?.marriage_date && (
                <InfoItem
                  icon={Calendar}
                  label="Evlilik Tarihi"
                  value={formatDate(person.marriage.marriage_date)}
                />
              )}
              <InfoItem
                icon={Baby}
                label="Çocuk Sayısı"
                value={person.children?.length || 0}
              />
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="education" className="space-y-4">
          <TabsList>
            <TabsTrigger value="education" className="gap-1.5">
              <GraduationCap size={14} />
              Eğitim
            </TabsTrigger>
            <TabsTrigger value="work" className="gap-1.5">
              <Building size={14} />
              İş
            </TabsTrigger>
            <TabsTrigger value="family" className="gap-1.5">
              <Users size={14} />
              Aile
            </TabsTrigger>
            <TabsTrigger value="children" className="gap-1.5">
              <Baby size={14} />
              Çocuklar
            </TabsTrigger>
            <TabsTrigger value="health" className="gap-1.5">
              <Stethoscope size={14} />
              Sağlık
            </TabsTrigger>
            <TabsTrigger value="personality" className="gap-1.5">
              <Sparkles size={14} />
              Kişilik
            </TabsTrigger>
            <TabsTrigger value="notes" className="gap-1.5">
              <FileText size={14} />
              Notlar
            </TabsTrigger>
          </TabsList>

          <TabsContent value="education">
            <div className="grid gap-4">
              {person.education.map((edu) => (
                <Card key={edu.id}>
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{edu.school_name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {edu.department} - {edu.degree}
                        </p>
                      </div>
                      {edu.grade && (
                        <Badge variant="outline">Not: {edu.grade}</Badge>
                      )}
                    </div>
                    <Separator className="my-3" />
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {formatDate(edu.start_date)} -{" "}
                        {edu.is_ongoing ? "Devam" : formatDate(edu.end_date)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="work">
            <div className="grid gap-4">
              {person.work.map((job) => (
                <Card key={job.id}>
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{job.position}</h3>
                        <p className="text-sm text-muted-foreground">{job.company_name}</p>
                      </div>
                      {job.is_current && (
                        <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                          Çalışıyor
                        </Badge>
                      )}
                    </div>
                    {job.job_description && (
                      <p className="mt-2 text-sm text-muted-foreground">{job.job_description}</p>
                    )}
                    <Separator className="my-3" />
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {formatDate(job.start_date)} -{" "}
                        {job.is_current ? "Devam" : formatDate(job.end_date)}
                      </span>
                      {job.salary_range && (
                        <span className="text-green-600">{job.salary_range}</span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="family">
            <div className="grid gap-4">
              {person.family.map((member) => (
                <Card key={member.id}>
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{member.full_name}</h3>
                        <Badge variant="outline" className="mt-1">
                          {getRelationLabel(member.relation_type)}
                        </Badge>
                      </div>
                      {member.profession && (
                        <span className="text-sm text-muted-foreground">
                          {member.profession}
                        </span>
                      )}
                    </div>
                    <Separator className="my-3" />
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      {member.birth_date && (
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {formatDate(member.birth_date)}
                        </span>
                      )}
                      {member.phone && (
                        <span className="flex items-center gap-1">
                          <Phone size={12} />
                          {member.phone}
                        </span>
                      )}
                    </div>
                    {member.notes && (
                      <p className="mt-2 text-xs bg-muted p-2 rounded">
                        {member.notes}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="children">
            {person.children && person.children.length > 0 ? (
              <div className="grid gap-4">
                {person.children.map((child) => (
                  <Card key={child.id}>
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{child.child_name}</h3>
                          <p className="text-xs text-muted-foreground">
                            {child.gender === "male" ? "Erkek" : child.gender === "female" ? "Kız" : "Diğer"}
                          </p>
                        </div>
                        <Badge variant={child.is_living ? "secondary" : "outline"}>
                          {child.is_living ? "Hayatta" : "Vefat"}
                        </Badge>
                      </div>
                      <Separator className="my-3" />
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        {child.birth_date && (
                          <span className="flex items-center gap-1">
                            <Calendar size={12} />
                            {formatDate(child.birth_date)}
                          </span>
                        )}
                        {child.education_level && (
                          <span className="flex items-center gap-1">
                            <GraduationCap size={12} />
                            {child.education_level}
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground text-sm">
                  Kayıt bulunamadı
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="health">
            <Card>
              <CardContent className="pt-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <InfoItem
                    icon={AlertTriangle}
                    label="Kronik Hastalıklar"
                    value={person.health?.chronic_diseases || "-"}
                  />
                  <InfoItem
                    icon={AlertTriangle}
                    label="Alerjiler"
                    value={person.health?.allergies || "-"}
                  />
                  <InfoItem
                    icon={Stethoscope}
                    label="Düzenli İlaçlar"
                    value={person.health?.regular_medications || "-"}
                  />
                  <InfoItem
                    icon={Heart}
                    label="Tansiyon"
                    value={person.health?.blood_pressure || "-"}
                  />
                  <InfoItem
                    icon={Heart}
                    label="Diyabet"
                    value={person.health?.diabetes_status || "-"}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="personality">
            <Card>
              <CardContent className="pt-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <InfoItem
                    icon={Sparkles}
                    label="Kişilik Tipi"
                    value={person.personality?.personality_type || "-"}
                  />
                  <InfoItem
                    icon={Clock}
                    label="Hobiler"
                    value={person.personality?.hobbies || "-"}
                  />
                  <InfoItem
                    icon={FileText}
                    label="Diller"
                    value={person.personality?.languages || "-"}
                  />
                  <InfoItem
                    icon={Heart}
                    label="Spor"
                    value={person.personality?.sports || "-"}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notes">
            <div className="grid gap-4">
              {person.notes.map((note) => (
                <Card
                  key={note.id}
                  className={note.is_pinned ? "border-primary" : ""}
                >
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            note.note_type === "important"
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {note.note_type === "important" ? "Önemli" : "Genel"}
                        </Badge>
                        {note.is_pinned && (
                          <Badge variant="outline">Sabitlendi</Badge>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {formatDateTime(note.created_at)}
                      </span>
                    </div>
                    <p className="mt-2 text-sm">{note.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  )
}
