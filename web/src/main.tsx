import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from 'react-router'
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />
  },
  {
    path: "/sign-in",
    element: <SignIn />
  },
  {
    path: "/sign-up",
    element: <SignUp />
  },
  {
    path: "/privacy",
    element: <Privacy />
  },
  {
    path: "/app",
    element: <Dashboard />
  },
  {
    path: "/app/records",
    element: <Records />
  },
  {
    path: "/app/person/new",
    element: <NewPerson />
  },
  {
    path: "/app/person/:id",
    element: <NewPerson />
  },
  {
    path: "/app/settings",
    element: <Settings />
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <Toaster />
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
)
