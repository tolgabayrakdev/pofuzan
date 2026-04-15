import { Link, useLocation } from "react-router"
import {
  LayoutDashboard,
  Search,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Shield,
  FileSearch,
} from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"

const navItems = [
  { href: "/app", label: "Operasyon Merkezi", icon: LayoutDashboard },
  { href: "/app/persons", label: "Kayıtlar", icon: FileSearch },
  { href: "/app/search", label: "İstihbarat Ara", icon: Search },
]

interface AppLayoutProps {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        <aside
          className={`hidden lg:flex flex-col border-r bg-card transition-all duration-300 ${
            collapsed ? "w-16" : "w-64"
          }`}
        >
          <div className="flex h-16 items-center border-b px-4">
            {!collapsed && (
              <Link to="/app" className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                <div>
                  <span className="text-lg font-bold tracking-tight">INTEL</span>
                  <span className="text-xs text-muted-foreground block">Sistem v1.0</span>
                </div>
              </Link>
            )}
            {collapsed && (
              <Shield className="h-6 w-6 text-primary mx-auto" />
            )}
          </div>

          <nav className="flex-1 p-2 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <item.icon size={18} />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              )
            })}
          </nav>

          <div className="border-t p-2">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start gap-3 text-xs"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
              {!collapsed && <span>Küçült</span>}
            </Button>
          </div>
        </aside>

        <div className="flex-1 flex flex-col">
          <header className="flex h-14 items-center gap-4 bg-card px-4">
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <LayoutDashboard size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <div className="flex h-14 items-center border-b">
                  <Link to="/app" className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <span className="text-lg font-bold">INTEL</span>
                  </Link>
                </div>
                <nav className="p-2 space-y-1">
                  {navItems.map((item) => {
                    const isActive = location.pathname === item.href
                    return (
                      <Link
                        key={item.href}
                        to={item.href}
                        className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium ${
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-muted"
                        }`}
                      >
                        <item.icon size={18} />
                        <span>{item.label}</span>
                      </Link>
                    )
                  })}
                </nav>
              </SheetContent>
            </Sheet>

            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Kayıt ara..."
                  className="w-full pl-9 bg-muted/50"
                />
              </div>
            </div>

            <div className="ml-auto flex items-center gap-2 border-r pr-4">
              <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span>Sistem Aktif</span>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        OP
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-0.5">
                      <span className="text-sm font-medium">Operatör</span>
                      <span className="text-xs text-muted-foreground">
                        Yetki: Yönetici
                      </span>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/settings">
                      <Settings size={14} className="mr-2" />
                      Ayarlar
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <LogOut size={14} className="mr-2" />
                    Oturumu Kapat
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          <main className="flex-1 overflow-auto p-6">{children}</main>
        </div>
      </div>
    </div>
  )
}
