import { httpClient } from "@/lib/http-client"
import { Resume } from "@/types/resume"

export const resumeRepository = {
  getAll: () => {
    return httpClient('/api/resume')
  },
  getById: (id: string) => {
    return httpClient(`/api/resume/${id}`)
  },
  create: (data: Resume) => {
    return httpClient('/api/resume', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },
  update: (id: string, data: Resume) => {
    return httpClient(`/api/resume/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },
  delete: (id: string) => {
    return httpClient(`/api/resume/${id}`, {
      method: 'DELETE',
    })
  }
}