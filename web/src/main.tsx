import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { createBrowserRouter, RouterProvider } from "react-router"

import SignIn from "@/pages/auth/sign-in"
import SignUp from "@/pages/auth/sign-up"
import ForgotPassword from "@/pages/auth/forgot-password"
import Dashboard from "@/pages/app/index"
import Settings from "@/pages/app/settings"
import PersonsList from "@/pages/app/persons/index"
import PersonDetail from "@/pages/app/persons/[id]/index"
import NewPerson from "@/pages/app/persons/new"
import AdvancedSearch from "@/pages/app/search"

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
    path: "/forgot-password",
    element: <ForgotPassword />
  },
  {
    path: "/app",
    element: <Dashboard />
  },
  {
    path: "/app/persons",
    element: <PersonsList />
  },
  {
    path: "/app/persons/new",
    element: <NewPerson />
  },
  {
    path: "/app/persons/:id",
    element: <PersonDetail />
  },
  {
    path: "/app/search",
    element: <AdvancedSearch />
  },
  {
    path: "/settings",
    element: <Settings />
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
