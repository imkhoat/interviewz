import { httpClient } from "@shared/lib/http-client"
import { Resume } from "@shared/types/resume"

export const resumeRepository = {
  getAll: () => {
    return httpClient('/resume')
  },
  getById: (id: string) => {
    return httpClient(`/resume/${id}`)
  },
  create: (data: Resume) => {
    return httpClient('/resume', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },
  update: (id: string, data: Resume) => {
    return httpClient(`/resume/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },
  delete: (id: string) => {
    return httpClient(`/resume/${id}`, {
      method: 'DELETE',
    })
  }
}