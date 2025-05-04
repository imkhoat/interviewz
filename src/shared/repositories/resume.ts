import { httpClient } from "@shared/lib/http-client"
import { Resume } from "@shared/types/resume"

export const resumeRepository = {
  getAll: () => {
    return httpClient('/resumes')
  },
  getById: (id: string) => {
    return httpClient(`/resumes/${id}`)
  },
  create: (data: Resume) => {
    return httpClient('/resumes', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },
  update: (id: string, data: Resume) => {
    return httpClient(`/resumes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },
  delete: (id: string) => {
    return httpClient(`/resumes/${id}`, {
      method: 'DELETE',
    })
  }
}