const API_BASE = "/api"

interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Bir hata oluştu" }))
    throw new Error(error.message || "Bir hata oluştu")
  }
  const data = await response.json()
  return { data, message: data.message }
}

export const authService = {
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    })
    return handleResponse(response)
  },

  register: async (username: string, email: string, password: string) => {
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
      credentials: "include",
    })
    return handleResponse(response)
  },

  getProfile: async () => {
    const response = await fetch(`${API_BASE}/auth/profile`, {
      credentials: "include",
    })
    return handleResponse(response)
  },

  logout: async () => {
    localStorage.removeItem("token")
  },
}

export interface Person {
  id: number
  first_name: string
  last_name: string
  created_by: number
  created_at: string
  updated_at: string
  basic_info?: PersonBasicInfo
  contact?: PersonContact
  education?: PersonEducation[]
  work?: PersonWork[]
  family?: PersonFamily[]
  marriage?: PersonMarriage
  children?: PersonChild[]
  health?: PersonHealth
  personality?: PersonPersonality
  notes?: PersonNote[]
  media?: PersonMedia[]
}

export interface PersonBasicInfo {
  id: number
  person_id: number
  birth_date: string | null
  birth_place: string | null
  gender: string | null
  nationality: string | null
  identity_number: string | null
  blood_type: string | null
}

export interface PersonContact {
  id: number
  person_id: number
  phone: string | null
  phone_secondary: string | null
  email: string | null
  address: string | null
  city: string | null
  country: string | null
  postal_code: string | null
}

export interface PersonEducation {
  id: number
  person_id: number
  school_name: string | null
  department: string | null
  degree: string | null
  start_date: string | null
  end_date: string | null
  is_ongoing: boolean
  grade: string | null
}

export interface PersonWork {
  id: number
  person_id: number
  company_name: string | null
  position: string | null
  sector: string | null
  start_date: string | null
  end_date: string | null
  is_current: boolean
  job_description: string | null
  salary_range: string | null
}

export interface PersonFamily {
  id: number
  person_id: number
  relation_type: string
  full_name: string | null
  birth_date: string | null
  profession: string | null
  phone: string | null
  notes: string | null
}

export interface PersonMarriage {
  id: number
  person_id: number
  marital_status: string | null
  spouse_name: string | null
  marriage_date: string | null
  marriage_place: string | null
  divorce_date: string | null
  divorce_reason: string | null
}

export interface PersonChild {
  id: number
  person_id: number
  child_name: string | null
  birth_date: string | null
  gender: string | null
  education_level: string | null
  profession: string | null
  is_living: boolean
  notes: string | null
}

export interface PersonHealth {
  id: number
  person_id: number
  chronic_diseases: string | null
  disabilities: string | null
  allergies: string | null
  regular_medications: string | null
  blood_pressure: string | null
  diabetes_status: string | null
  mental_health_notes: string | null
}

export interface PersonPersonality {
  id: number
  person_id: number
  personality_type: string | null
  hobbies: string | null
  interests: string | null
  languages: string | null
  sports: string | null
  food_preferences: string | null
}

export interface PersonNote {
  id: number
  person_id: number
  user_id: number
  note_type: string
  content: string
  is_pinned: boolean
  created_at: string
}

export interface PersonMedia {
  id: number
  person_id: number
  media_type: string
  file_name: string | null
  file_path: string | null
  description: string | null
  is_primary: boolean
}

export interface CreatePersonData {
  first_name: string
  last_name: string
  birth_date?: string
  gender?: string
  phone?: string
  email?: string
}

export interface SearchFilters {
  query?: string
  gender?: string
  city?: string
  education_level?: string
  work_sector?: string
  min_age?: number
  max_age?: number
}

export const personService = {
  getAll: async (params?: { page?: number; limit?: number }) => {
    const searchParams = new URLSearchParams()
    if (params?.page) searchParams.set("page", params.page.toString())
    if (params?.limit) searchParams.set("limit", params.limit.toString())

    const response = await fetch(`${API_BASE}/persons?${searchParams}`, {
      credentials: "include",
    })
    return handleResponse<{ persons: Person[]; total: number }>(response)
  },

  getById: async (id: number) => {
    const response = await fetch(`${API_BASE}/persons/${id}`, {
      credentials: "include",
    })
    return handleResponse<Person>(response)
  },

  create: async (data: CreatePersonData) => {
    const response = await fetch(`${API_BASE}/persons`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    })
    return handleResponse<Person>(response)
  },

  update: async (id: number, data: Partial<CreatePersonData>) => {
    const response = await fetch(`${API_BASE}/persons/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    })
    return handleResponse<Person>(response)
  },

  delete: async (id: number) => {
    const response = await fetch(`${API_BASE}/persons/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
    return handleResponse(response)
  },

  search: async (filters: SearchFilters) => {
    const response = await fetch(`${API_BASE}/persons/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(filters),
      credentials: "include",
    })
    return handleResponse<{ persons: Person[]; total: number }>(response)
  },

  getStats: async () => {
    const response = await fetch(`${API_BASE}/persons/stats`, {
      credentials: "include",
    })
    return handleResponse<{
      total: number
      by_gender: { male: number; female: number; other: number }
      by_age_groups: Record<string, number>
      recent_added: number
    }>(response)
  },
}
