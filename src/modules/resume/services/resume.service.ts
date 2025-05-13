import { resumeRepository } from "@resume/repositories/resume.repository";
import { Resume } from "@resume/types/resume.types";

export const resumeService = {
  fetchResumes: async () => {
    const resumes = resumeRepository.getAll();
    return resumes;
  },

  fetchResumeDetail: async (id: string) => {
    const resume = resumeRepository.getById(id);
    return resume;
  },

  createResume: async (data: Omit<Resume, "id" | "userId" | "createdAt" | "updatedAt">) => {
    const resume: Resume = {
      ...data,
      id: crypto.randomUUID(),
      userId: "current-user", // TODO: Get from auth context
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return resumeRepository.create(resume);
  },

  updateResume: async (id: string, data: Omit<Resume, "id" | "userId" | "createdAt" | "updatedAt">) => {
    const resume: Resume = {
      ...data,
      id,
      userId: "current-user", // TODO: Get from auth context
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return resumeRepository.update(id, resume);
  },

  deleteResume: async (id: string) => {
    const resume = resumeRepository.delete(id);
    return resume;
  },
}; 