import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type TabId =
  | 'temel'
  | 'iletisim'
  | 'egitim'
  | 'is'
  | 'aile'
  | 'saglik'
  | 'ozellik'
  | 'gizli';

interface Tab {
  id: TabId;
  label: string;
  icon: React.ReactNode;
}

const tabs: Tab[] = [
  {
    id: 'temel',
    label: 'Temel',
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeWidth="1.5"
          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
        />
      </svg>
    ),
  },
  {
    id: 'iletisim',
    label: 'İletişim',
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeWidth="1.5"
          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
        />
      </svg>
    ),
  },
  {
    id: 'egitim',
    label: 'Eğitim',
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeWidth="1.5"
          d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
        />
      </svg>
    ),
  },
  {
    id: 'is',
    label: 'İş',
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeWidth="1.5"
          d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0"
        />
      </svg>
    ),
  },
  {
    id: 'aile',
    label: 'Aile',
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeWidth="1.5"
          d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
        />
      </svg>
    ),
  },
  {
    id: 'saglik',
    label: 'Sağlık',
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeWidth="1.5"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
    ),
  },
  {
    id: 'ozellik',
    label: 'Özellik',
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeWidth="1.5"
          d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
        />
      </svg>
    ),
  },
  {
    id: 'gizli',
    label: 'Gizli',
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeWidth="1.5"
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
    ),
  },
];

const typeOptions = [
  { value: 'gozlem', label: 'Gözlem' },
  { value: 'kaynak', label: 'Kaynak' },
  { value: 'hedef', label: 'Hedef' },
  { value: 'bilinmeyen', label: 'Bilinmeyen' },
];

const riskOptions = [
  { value: 'dusuk', label: 'Düşük' },
  { value: 'orta', label: 'Orta' },
  { value: 'yuksek', label: 'Yüksek' },
  { value: 'kritik', label: 'Kritik' },
];

const statusOptions = [
  { value: 'aktif', label: 'Aktif' },
  { value: 'gizli', label: 'Gizli' },
  { value: 'arsiv', label: 'Arşiv' },
];

export default function NewPerson() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabId>('temel');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    type: '',
    risk: '',
    status: '',
    birthDate: '',
    birthPlace: '',
    gender: '',
    nationality: '',
    identityNumber: '',
    bloodType: '',
    phone: '',
    phoneSecondary: '',
    email: '',
    address: '',
    city: '',
    country: '',
    schoolName: '',
    department: '',
    degree: '',
    companyName: '',
    position: '',
    sector: '',
    relationType: '',
    familyName: '',
    familyPhone: '',
    chronicDiseases: '',
    allergies: '',
    personalityType: '',
    hobbies: '',
    languages: '',
    secretCode: '',
    accessLevel: '',
    notes: '',
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/app/records');
    }, 1000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 md:p-6 pb-24 md:pb-6 space-y-4"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-heading tracking-tight">Yeni Kayıt</h1>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
            Yeni kişi bilgisi ekle
          </p>
        </div>
        <Button type="submit" size="lg" disabled={isLoading}>
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 border border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Kaydediliyor...
            </span>
          ) : (
            'Kaydet'
          )}
        </Button>
      </div>

      <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
        <div className="flex gap-1 min-w-max pb-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-1.5 px-3 py-2 text-[10px] uppercase tracking-wider border transition-colors whitespace-nowrap',
                activeTab === tab.id
                  ? 'bg-foreground text-background border-foreground'
                  : 'bg-transparent text-muted-foreground border-border hover:bg-muted'
              )}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          {activeTab === 'temel' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="firstName" className="uppercase text-[10px]">
                    Ad *
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="lastName" className="uppercase text-[10px]">
                    Soyad *
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="type" className="uppercase text-[10px]">
                    Tür *
                  </Label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="h-8 w-full border border-input bg-transparent px-2.5 text-xs"
                    required
                  >
                    <option value="">Seç...</option>
                    {typeOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="risk" className="uppercase text-[10px]">
                    Risk *
                  </Label>
                  <select
                    id="risk"
                    name="risk"
                    value={formData.risk}
                    onChange={handleChange}
                    className="h-8 w-full border border-input bg-transparent px-2.5 text-xs"
                    required
                  >
                    <option value="">Seç...</option>
                    {riskOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="status" className="uppercase text-[10px]">
                    Durum *
                  </Label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="h-8 w-full border border-input bg-transparent px-2.5 text-xs"
                    required
                  >
                    <option value="">Seç...</option>
                    {statusOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="birthDate" className="uppercase text-[10px]">
                    Doğum Tarihi
                  </Label>
                  <Input
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="birthPlace" className="uppercase text-[10px]">
                    Doğum Yeri
                  </Label>
                  <Input
                    id="birthPlace"
                    name="birthPlace"
                    value={formData.birthPlace}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="gender" className="uppercase text-[10px]">
                    Cinsiyet
                  </Label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="h-8 w-full border border-input bg-transparent px-2.5 text-xs"
                  >
                    <option value="">Seç...</option>
                    <option value="male">Erkek</option>
                    <option value="female">Kadın</option>
                    <option value="other">Diğer</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="nationality"
                    className="uppercase text-[10px]"
                  >
                    Uyruk
                  </Label>
                  <Input
                    id="nationality"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="identityNumber"
                    className="uppercase text-[10px]"
                  >
                    Kimlik Numarası
                  </Label>
                  <Input
                    id="identityNumber"
                    name="identityNumber"
                    value={formData.identityNumber}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="bloodType" className="uppercase text-[10px]">
                    Kan Grubu
                  </Label>
                  <select
                    id="bloodType"
                    name="bloodType"
                    value={formData.bloodType}
                    onChange={handleChange}
                    className="h-8 w-full border border-input bg-transparent px-2.5 text-xs"
                  >
                    <option value="">Seç...</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="0+">0+</option>
                    <option value="0-">0-</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'iletisim' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="uppercase text-[10px]">
                    Telefon
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="phoneSecondary"
                    className="uppercase text-[10px]"
                  >
                    Telefon 2
                  </Label>
                  <Input
                    id="phoneSecondary"
                    name="phoneSecondary"
                    type="tel"
                    value={formData.phoneSecondary}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email" className="uppercase text-[10px]">
                  E-posta
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="address" className="uppercase text-[10px]">
                  Adres
                </Label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={3}
                  className="w-full min-w-0 rounded-none border border-input bg-transparent px-2.5 py-1 text-xs transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="city" className="uppercase text-[10px]">
                    Şehir
                  </Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="country" className="uppercase text-[10px]">
                    Ülke
                  </Label>
                  <Input
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'egitim' && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="schoolName" className="uppercase text-[10px]">
                  Okul Adı
                </Label>
                <Input
                  id="schoolName"
                  name="schoolName"
                  value={formData.schoolName}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="department" className="uppercase text-[10px]">
                    Bölüm
                  </Label>
                  <Input
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="degree" className="uppercase text-[10px]">
                    Derece
                  </Label>
                  <Input
                    id="degree"
                    name="degree"
                    value={formData.degree}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'is' && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="companyName" className="uppercase text-[10px]">
                  Şirket Adı
                </Label>
                <Input
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="position" className="uppercase text-[10px]">
                    Pozisyon
                  </Label>
                  <Input
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="sector" className="uppercase text-[10px]">
                    Sektör
                  </Label>
                  <Input
                    id="sector"
                    name="sector"
                    value={formData.sector}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'aile' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="relationType"
                    className="uppercase text-[10px]"
                  >
                    Akrabalık
                  </Label>
                  <select
                    id="relationType"
                    name="relationType"
                    value={formData.relationType}
                    onChange={handleChange}
                    className="h-8 w-full border border-input bg-transparent px-2.5 text-xs"
                  >
                    <option value="">Seç...</option>
                    <option value="spouse">Eş</option>
                    <option value="child">Çocuk</option>
                    <option value="parent">Anne/Baba</option>
                    <option value="sibling">Kardeş</option>
                    <option value="other">Diğer</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="familyName" className="uppercase text-[10px]">
                    Ad Soyad
                  </Label>
                  <Input
                    id="familyName"
                    name="familyName"
                    value={formData.familyName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="familyPhone" className="uppercase text-[10px]">
                  Telefon
                </Label>
                <Input
                  id="familyPhone"
                  name="familyPhone"
                  type="tel"
                  value={formData.familyPhone}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}

          {activeTab === 'saglik' && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="chronicDiseases"
                  className="uppercase text-[10px]"
                >
                  Kronik Hastalıklar
                </Label>
                <textarea
                  id="chronicDiseases"
                  name="chronicDiseases"
                  value={formData.chronicDiseases}
                  onChange={handleChange}
                  rows={3}
                  className="w-full min-w-0 rounded-none border border-input bg-transparent px-2.5 py-1 text-xs transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50"
                  placeholder="Bulunmuyor"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="allergies" className="uppercase text-[10px]">
                  Alerjiler
                </Label>
                <textarea
                  id="allergies"
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  rows={2}
                  className="w-full min-w-0 rounded-none border border-input bg-transparent px-2.5 py-1 text-xs transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50"
                  placeholder="Bulunmuyor"
                />
              </div>
            </div>
          )}

          {activeTab === 'ozellik' && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="personalityType"
                  className="uppercase text-[10px]"
                >
                  Kişilik Tipi
                </Label>
                <Input
                  id="personalityType"
                  name="personalityType"
                  value={formData.personalityType}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="hobbies" className="uppercase text-[10px]">
                  Hobiler
                </Label>
                <textarea
                  id="hobbies"
                  name="hobbies"
                  value={formData.hobbies}
                  onChange={handleChange}
                  rows={2}
                  className="w-full min-w-0 rounded-none border border-input bg-transparent px-2.5 py-1 text-xs transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="languages" className="uppercase text-[10px]">
                  Diller
                </Label>
                <Input
                  id="languages"
                  name="languages"
                  value={formData.languages}
                  onChange={handleChange}
                  placeholder="Türkçe, İngilizce..."
                />
              </div>
            </div>
          )}

          {activeTab === 'gizli' && (
            <div className="space-y-4">
              <div className="p-3 border border-amber-500/30 bg-amber-500/5">
                <p className="text-[10px] text-amber-500 uppercase tracking-wider">
                  Bu alanlara yalnızca yetkili personel erişebilir
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="secretCode" className="uppercase text-[10px]">
                    Gizli Kod
                  </Label>
                  <Input
                    id="secretCode"
                    name="secretCode"
                    value={formData.secretCode}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="accessLevel"
                    className="uppercase text-[10px]"
                  >
                    Erişim Seviyesi
                  </Label>
                  <select
                    id="accessLevel"
                    name="accessLevel"
                    value={formData.accessLevel}
                    onChange={handleChange}
                    className="h-8 w-full border border-input bg-transparent px-2.5 text-xs"
                  >
                    <option value="">Seç...</option>
                    <option value="1">Seviye 1 - Temel</option>
                    <option value="2">Seviye 2 - Orta</option>
                    <option value="3">Seviye 3 - Yüksek</option>
                    <option value="4">Seviye 4 - Kritik</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="notes" className="uppercase text-[10px]">
                  Gizli Notlar
                </Label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={6}
                  className="w-full min-w-0 rounded-none border border-input bg-transparent px-2.5 py-1 text-xs transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50 font-mono"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </form>
  );
}
