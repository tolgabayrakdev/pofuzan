const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api"

interface AuthTokens {
  accessToken: string
  refreshToken: string
  user: {
    id: number
    email: string
    role: string
    access_lvl: number
  }
}

function getTokens(): AuthTokens | null {
  const access = localStorage.getItem("accessToken")
  const refresh = localStorage.getItem("refreshToken")
  const user = localStorage.getItem("user")
  if (!access || !refresh || !user) return null
  return { accessToken: access, refreshToken: refresh, user: JSON.parse(user) }
}

function setTokens(tokens: AuthTokens) {
  localStorage.setItem("accessToken", tokens.accessToken)
  localStorage.setItem("refreshToken", tokens.refreshToken)
  localStorage.setItem("user", JSON.stringify(tokens.user))
}

function clearTokens() {
  localStorage.removeItem("accessToken")
  localStorage.removeItem("refreshToken")
  localStorage.removeItem("user")
}

function getAccessToken(): string | null {
  return localStorage.getItem("accessToken")
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getAccessToken()
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  }
  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  })

  if (response.status === 401) {
    const refreshed = await refresh()
    if (refreshed) {
      return request(endpoint, options)
    }
    clearTokens()
    window.location.href = "/sign-in"
    throw new Error("Unauthorized")
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Request failed" }))
    throw new Error(error.message || "Request failed")
  }

  if (response.status === 204) {
    return {} as T
  }

  return response.json()
}

export async function login(email: string, password: string): Promise<AuthTokens> {
  const response = await request<AuthTokens>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  })
  setTokens(response)
  return response
}

export async function register(
  email: string,
  password: string,
  registration_code: string
): Promise<AuthTokens> {
  const response = await request<AuthTokens>("/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password, registration_code }),
  })
  setTokens(response)
  return response
}

export async function logout(): Promise<void> {
  try {
    await request("/auth/logout", { method: "POST" })
  } finally {
    clearTokens()
  }
}

export async function refresh(): Promise<boolean> {
  const tokens = getTokens()
  if (!tokens?.refreshToken) return false

  try {
    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: tokens.refreshToken }),
    })
    if (!response.ok) return false
    const newTokens = await response.json()
    setTokens(newTokens)
    return true
  } catch {
    return false
  }
}

export async function getProfile() {
  const user = localStorage.getItem("user")
  return user ? JSON.parse(user) : null
}

export function isAuthenticated(): boolean {
  return !!getAccessToken()
}

export function getUser(): AuthTokens["user"] | null {
  const user = localStorage.getItem("user")
  return user ? JSON.parse(user) : null
}

export async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  return request(endpoint, options)
}