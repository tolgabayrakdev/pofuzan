import { useState } from 'react';
import { Link } from 'react-router';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface Person {
  id: number;
  name: string;
  type: 'Gozlem' | 'Kaynak' | 'Hedef' | 'Bilinmeyen';
  risk: 'Dusuk' | 'Orta' | 'Yuksek' | 'Kritik';
  status: 'Aktif' | 'Gizli' | 'Arsiv';
  lastUpdate: string;
  identity: string;
}

const mockPersons: Person[] = [
  {
    id: 1,
    name: 'Ahmet Yılmaz',
    type: 'Gozlem',
    risk: 'Yuksek',
    status: 'Aktif',
    lastUpdate: '2026-04-17',
    identity: 'TR-001-247',
  },
  {
    id: 2,
    name: 'Elif Kaya',
    type: 'Kaynak',
    risk: 'Orta',
    status: 'Aktif',
    lastUpdate: '2026-04-16',
    identity: 'TR-002-189',
  },
  {
    id: 3,
    name: 'Mehmet Demir',
    type: 'Hedef',
    risk: 'Kritik',
    status: 'Gizli',
    lastUpdate: '2026-04-15',
    identity: 'TR-003-156',
  },
  {
    id: 4,
    name: 'Ayşe Çelik',
    type: 'Kaynak',
    risk: 'Dusuk',
    status: 'Aktif',
    lastUpdate: '2026-04-14',
    identity: 'TR-004-123',
  },
  {
    id: 5,
    name: 'Mustafa Koç',
    type: 'Gozlem',
    risk: 'Orta',
    status: 'Arsiv',
    lastUpdate: '2026-04-13',
    identity: 'TR-005-098',
  },
  {
    id: 6,
    name: 'Fatma Şahin',
    type: 'Hedef',
    risk: 'Kritik',
    status: 'Gizli',
    lastUpdate: '2026-04-12',
    identity: 'TR-006-087',
  },
  {
    id: 7,
    name: 'Ali Öztürk',
    type: 'Kaynak',
    risk: 'Dusuk',
    status: 'Aktif',
    lastUpdate: '2026-04-11',
    identity: 'TR-007-076',
  },
  {
    id: 8,
    name: 'Zeynep Ak',
    type: 'Gozlem',
    risk: 'Yuksek',
    status: 'Aktif',
    lastUpdate: '2026-04-10',
    identity: 'TR-008-065',
  },
];

const typeLabels: Record<string, { label: string; color: string }> = {
  Gozlem: { label: 'Gözlem', color: 'text-blue-500' },
  Kaynak: { label: 'Kaynak', color: 'text-green-500' },
  Hedef: { label: 'Hedef', color: 'text-destructive' },
  Bilinmeyen: { label: 'Bilinmeyen', color: 'text-muted-foreground' },
};

const riskLabels: Record<string, { label: string; color: string; bg: string }> =
  {
    Dusuk: { label: 'Düşük', color: 'text-green-500', bg: 'bg-green-500/10' },
    Orta: { label: 'Orta', color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
    Yuksek: {
      label: 'Yüksek',
      color: 'text-orange-500',
      bg: 'bg-orange-500/10',
    },
    Kritik: {
      label: 'Kritik',
      color: 'text-destructive',
      bg: 'bg-destructive/10',
    },
  };

const filters = [
  { value: 'all', label: 'Tümü' },
  { value: 'Aktif', label: 'Aktif' },
  { value: 'Gizli', label: 'Gizli' },
  { value: 'Arsiv', label: 'Arşiv' },
];

export default function Records() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const filteredPersons = mockPersons.filter(person => {
    const matchesSearch =
      person.name.toLowerCase().includes(search.toLowerCase()) ||
      person.identity.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      activeFilter === 'all' || person.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-4 md:p-6 pb-20 md:pb-6 space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-heading tracking-tight">Kayıtlar</h1>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
            {filteredPersons.length} kayıt bulundu
          </p>
        </div>
        <Link
          to="/app/person/new"
          className="inline-flex items-center justify-center gap-2 h-9 px-4 bg-foreground text-background text-[11px] uppercase tracking-wider hover:bg-foreground/90 transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Yeni Kayıt
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-2">
        <div className="relative flex-1">
          <svg
            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <Input
            placeholder="İsim veya kimlik ara..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-1">
          {filters.map(filter => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={cn(
                'px-3 h-8 text-[10px] uppercase tracking-wider border transition-colors',
                activeFilter === filter.value
                  ? 'bg-foreground text-background border-foreground'
                  : 'bg-transparent text-muted-foreground border-border hover:bg-muted'
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <div className="flex gap-1 border border-border">
          <button
            onClick={() => setViewMode('list')}
            className={cn(
              'p-2 transition-colors',
              viewMode === 'list'
                ? 'bg-foreground text-background'
                : 'text-muted-foreground hover:bg-muted'
            )}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={cn(
              'p-2 transition-colors',
              viewMode === 'grid'
                ? 'bg-foreground text-background'
                : 'text-muted-foreground hover:bg-muted'
            )}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeWidth="1.5"
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
          </button>
        </div>
      </div>

      {viewMode === 'list' ? (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {filteredPersons.map(person => (
                <Link
                  key={person.id}
                  to={`/app/person/${person.id}`}
                  className="flex items-center gap-3 p-3 hover:bg-muted transition-colors"
                >
                  <div className="w-10 h-10 border border-border flex items-center justify-center text-xs font-medium shrink-0">
                    {person.name
                      .split(' ')
                      .map(n => n[0])
                      .join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-medium truncate">
                        {person.name}
                      </p>
                      {person.status === 'Gizli' && (
                        <svg
                          className="w-3 h-3 text-amber-500 shrink-0"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      )}
                    </div>
                    <p className="text-[10px] text-muted-foreground">
                      {person.identity}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-[10px] uppercase ${typeLabels[person.type].color}`}
                    >
                      {typeLabels[person.type].label}
                    </span>
                    <span
                      className={`text-[10px] uppercase ${riskLabels[person.risk].color}`}
                    >
                      {riskLabels[person.risk].label}
                    </span>
                    <svg
                      className="w-4 h-4 text-muted-foreground"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredPersons.map(person => (
            <Link key={person.id} to={`/app/person/${person.id}`}>
              <Card className="hover:bg-muted transition-colors">
                <CardContent className="pt-4">
                  <div className="w-full aspect-square border border-border flex items-center justify-center text-lg font-medium mb-3">
                    {person.name
                      .split(' ')
                      .map(n => n[0])
                      .join('')}
                  </div>
                  <p className="text-xs font-medium truncate text-center">
                    {person.name}
                  </p>
                  <p className="text-[10px] text-muted-foreground text-center truncate mt-0.5">
                    {person.identity}
                  </p>
                  <div className="flex justify-center gap-2 mt-2">
                    <span
                      className={`text-[9px] uppercase ${typeLabels[person.type].color}`}
                    >
                      {typeLabels[person.type].label}
                    </span>
                    <span
                      className={`text-[9px] uppercase ${riskLabels[person.risk].color}`}
                    >
                      {riskLabels[person.risk].label}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {filteredPersons.length === 0 && (
        <div className="text-center py-12 space-y-2">
          <svg
            className="w-12 h-12 mx-auto text-muted-foreground/30"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeWidth="1"
              d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"
            />
            <path strokeWidth="1" d="M17 21v-8H7v8M7 3v5h8" />
          </svg>
          <p className="text-sm text-muted-foreground">Kayıt bulunamadı</p>
          <p className="text-[10px] text-muted-foreground/50 uppercase tracking-wider">
            Arama kriterlerinize uygun kayıt yok
          </p>
        </div>
      )}
    </div>
  );
}
