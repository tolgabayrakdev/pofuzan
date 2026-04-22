import { Link } from "react-router"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const stats = [
  { label: "Toplam Kayıt", value: "247", change: "+12" },
  { label: "Aktif Dosyalar", value: "89", change: "+5" },
  { label: "Gizli Sınıf", value: "23", change: "+2" },
  { label: "Arşivlenmiş", value: "135", change: "-3" },
]

const recentRecords = [
  {
    id: 1,
    name: "Ahmet Yılmaz",
    type: "Gözlem",
    risk: "Yüksek",
    date: "2026-04-17",
  },
  {
    id: 2,
    name: "Elif Kaya",
    type: "Kaynak",
    risk: "Orta",
    date: "2026-04-16",
  },
  {
    id: 3,
    name: "Mehmet Demir",
    type: "Hedef",
    risk: "Kritik",
    date: "2026-04-15",
  },
  {
    id: 4,
    name: "Ayşe Çelik",
    type: "Kaynak",
    risk: "Düşük",
    date: "2026-04-14",
  },
  {
    id: 5,
    name: "Mustafa Koç",
    type: "Gözlem",
    risk: "Orta",
    date: "2026-04-13",
  },
]

const riskColors: Record<string, string> = {
  Düşük: "text-green-500",
  Orta: "text-yellow-500",
  Yüksek: "text-orange-500",
  Kritik: "text-destructive",
}

export default function Dashboard() {
  return (
    <div className="p-4 md:p-6 pb-20 md:pb-6 space-y-6">
      <div className="space-y-1">
        <h1 className="text-lg font-heading tracking-tight">Hoş Geldiniz</h1>
        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
          Sistem durumu: Normal
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((stat) => (
          <Card key={stat.label} size="sm">
            <CardContent className="pt-4">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">
                {stat.label}
              </p>
              <p className="text-2xl font-heading">{stat.value}</p>
              <p className="text-[9px] text-muted-foreground mt-1">{stat.change} bu ay</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider">Son Kayıtlar</span>
              <Link
                to="/app/records"
                className="text-[10px] text-muted-foreground hover:text-foreground uppercase tracking-wider"
              >
                Tümünü Gör
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {recentRecords.map((record) => (
                <Link
                  key={record.id}
                  to={`/app/person/${record.id}`}
                  className="flex items-center justify-between p-2 hover:bg-muted transition-colors -mx-2"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 border border-border flex items-center justify-center text-[10px] font-medium">
                      {record.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="text-xs font-medium">{record.name}</p>
                      <p className="text-[10px] text-muted-foreground">{record.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-[10px] font-medium uppercase ${riskColors[record.risk]}`}>
                      {record.risk}
                    </p>
                    <p className="text-[9px] text-muted-foreground">{record.date}</p>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xs uppercase tracking-wider">Hızlı İşlemler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              <Link
                to="/app/person/new"
                className="flex flex-col items-center gap-2 p-4 border border-border hover:bg-muted transition-colors"
              >
                <div className="w-10 h-10 border border-border flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeWidth="1.5" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <span className="text-[10px] uppercase tracking-wider">Yeni Kayıt</span>
              </Link>

              <Link
                to="/app/records"
                className="flex flex-col items-center gap-2 p-4 border border-border hover:bg-muted transition-colors"
              >
                <div className="w-10 h-10 border border-border flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <span className="text-[10px] uppercase tracking-wider">Ara</span>
              </Link>

              <Link
                to="/app/records?filter=gizli"
                className="flex flex-col items-center gap-2 p-4 border border-border hover:bg-muted transition-colors"
              >
                <div className="w-10 h-10 border border-border flex items-center justify-center text-destructive">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <span className="text-[10px] uppercase tracking-wider">Gizli Dosyalar</span>
              </Link>

              <Link
                to="/app/records?filter=arşiv"
                className="flex flex-col items-center gap-2 p-4 border border-border hover:bg-muted transition-colors"
              >
                <div className="w-10 h-10 border border-border flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeWidth="1.5" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                </div>
                <span className="text-[10px] uppercase tracking-wider">Arşiv</span>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xs uppercase tracking-wider">Sistem Logları</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1.5 font-mono text-[10px]">
            <p className="text-muted-foreground">
              <span className="text-green-500">[12:34:56]</span>{" "}
              <span className="text-foreground">admin</span> giriş yaptı
            </p>
            <p className="text-muted-foreground">
              <span className="text-green-500">[12:35:12]</span> Yeni kayıt eklendi:{" "}
              <span className="text-foreground">#247 Ahmet Yılmaz</span>
            </p>
            <p className="text-muted-foreground">
              <span className="text-yellow-500">[12:36:01]</span> Dosya güncellendi:{" "}
              <span className="text-foreground">#189 Mehmet Demir</span>
            </p>
            <p className="text-muted-foreground">
              <span className="text-destructive">[12:37:23]</span> Yetki kontrolü:{" "}
              <span className="text-foreground">LEVEL-1 ACCESS</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
