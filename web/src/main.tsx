/* eslint-disable react-refresh/only-export-components */
import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, Navigate } from 'react-router'
import { RouterProvider } from 'react-router'
import { Toaster } from 'sonner'
import { ThemeProvider } from '@/components/theme/theme-provider'

import SignIn from '@/pages/auth/sign-in'
import SignUp from '@/pages/auth/sign-up'
import Privacy from '@/pages/privacy'
import Dashboard from '@/pages/app/index'
import Records from '@/pages/app/records'
import NewPerson from '@/pages/app/person/new'
import Settings from '@/pages/app/settings'
import AppLayout from '@/components/layout/app-layout'
import { isAuthenticated, refresh } from '@/lib/auth'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    refresh().finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-4 h-4 border border-foreground/20 border-t-foreground rounded-full animate-spin" />
      </div>
    )
  }

  if (!isAuthenticated()) {
    return <Navigate to="/sign-in" replace />
  }

  return <AppLayout>{children}</AppLayout>
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    refresh().finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-4 h-4 border border-foreground/20 border-t-foreground rounded-full animate-spin" />
      </div>
    )
  }

  if (isAuthenticated()) {
    return <Navigate to="/app" replace />
  }

  return <>{children}</>
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/sign-in" replace />,
  },
  {
    path: "/sign-in",
    element: (
      <PublicRoute>
        <SignIn />
      </PublicRoute>
    ),
  },
  {
    path: "/sign-up",
    element: (
      <PublicRoute>
        <SignUp />
      </PublicRoute>
    ),
  },
  {
    path: "/privacy",
    element: <Privacy />,
  },
  {
    path: "/app",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/app/records",
    element: (
      <ProtectedRoute>
        <Records />
      </ProtectedRoute>
    ),
  },
  {
    path: "/app/person/new",
    element: (
      <ProtectedRoute>
        <NewPerson />
      </ProtectedRoute>
    ),
  },
  {
    path: "/app/person/:id",
    element: (
      <ProtectedRoute>
        <NewPerson />
      </ProtectedRoute>
    ),
  },
  {
    path: "/app/settings",
    element: (
      <ProtectedRoute>
        <Settings />
      </ProtectedRoute>
    ),
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <Toaster />
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
)