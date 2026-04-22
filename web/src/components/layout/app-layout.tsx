import { Link, useLocation, useNavigate } from "react-router"
import { cn } from "@/lib/utils"
import { logout, getUser } from "@/lib/auth"

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
}

interface AppLayoutProps {
  children: React.ReactNode
  user?: {
    id: number
    email: string
    role: string
    access_lvl: number
  }
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/app",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="3" y="3" width="7" height="7" strokeWidth="1.5" />
        <rect x="14" y="3" width="7" height="7" strokeWidth="1.5" />
        <rect x="3" y="14" width="7" height="7" strokeWidth="1.5" />
        <rect x="14" y="14" width="7" height="7" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    label: "Kayıtlar",
    href: "/app/records",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeWidth="1.5" d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
        <path strokeWidth="1.5" d="M17 21v-8H7v8M7 3v5h8" />
      </svg>
    ),
  },
  {
    label: "Yeni Kayıt",
    href: "/app/person/new",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeWidth="1.5" d="M12 4v16m8-8H4" />
      </svg>
    ),
  },
  {
    label: "Ayarlar",
    href: "/app/settings",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
]

export default function AppLayout({ children, user }: AppLayoutProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const currentUser = user || getUser()

  const handleLogout = async () => {
    await logout()
    navigate("/sign-in")
  }

  const getLevelLabel = (level: number) => {
    const labels = { 1: "LEVEL-1", 2: "LEVEL-2", 3: "LEVEL-3" }
    return labels[level as keyof typeof labels] || "LEVEL-1"
  }

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="hidden md:flex w-48 flex-col border-r border-border bg-card">
        <div className="p-4 border-b border-border">
          <Link to="/app" className="flex items-center gap-2">
            <div className="w-6 h-6 border border-foreground/20 flex items-center justify-center">
              <span className="text-[10px] font-bold">PF</span>
            </div>
            <span className="text-xs font-heading tracking-tight">POFUZAN</span>
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-0.5">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 text-[11px] uppercase tracking-wider transition-colors",
                  isActive
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="p-3 border-t border-border">
          <div className="px-3 py-2 text-[10px]">
            <p className="text-muted-foreground uppercase tracking-wider">Acenta</p>
            <p className="font-medium mt-0.5">{currentUser?.email || "Unknown"}</p>
            <p className="text-muted-foreground text-[9px] mt-0.5">{getLevelLabel(currentUser?.access_lvl || 1)} ACCESS</p>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden flex items-center justify-between px-4 py-3 border-b border-border bg-card">
          <Link to="/app" className="flex items-center gap-2">
            <div className="w-6 h-6 border border-foreground/20 flex items-center justify-center">
              <span className="text-[10px] font-bold">PF</span>
            </div>
            <span className="text-xs font-heading tracking-tight">POFUZAN</span>
          </Link>
          <button
            onClick={handleLogout}
            className="text-[10px] uppercase tracking-wider text-muted-foreground hover:text-foreground"
          >
            Çıkış
          </button>
        </header>

        <header className="hidden md:flex items-center justify-between px-6 py-3 border-b border-border bg-card">
          <div className="flex items-center gap-4">
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
              {location.pathname === "/app" && "Dashboard"}
              {location.pathname === "/app/records" && "Kayıtlar"}
              {location.pathname === "/app/person/new" && "Yeni Kayıt"}
              {location.pathname.startsWith("/app/person/") && "Kayıt Detay"}
              {location.pathname === "/app/settings" && "Ayarlar"}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <span className="w-1.5 h-1.5 bg-green-500 animate-pulse" />
              <span className="uppercase tracking-wider">Aktif</span>
            </div>
<button
              onClick={handleLogout}
              className="text-[10px] uppercase tracking-wider text-muted-foreground hover:text-foreground"
            >
              Çıkış
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-auto">{children}</div>
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t border-border bg-card">
        <div className="flex justify-around py-2">
          {navItems.slice(0, 4).map((item) => {
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex flex-col items-center gap-0.5 px-3 py-1 text-[9px] uppercase tracking-wider transition-colors",
                  isActive ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
