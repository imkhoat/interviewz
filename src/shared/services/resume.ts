import { Resume } from "@shared/types/resume";
import { resumeRepository } from "@shared/repositories/resume";

export const resumeService = {
  fetchResumes:  async () => {
    const resumes = resumeRepository.getAll();
    return resumes;
  },
  fetchResumeDetail: async (id: string) => {
    const resume = resumeRepository.getById(id);
    return resume;
  },
  createResume: async (data: Resume) => {
    const resume = resumeRepository.create(data);
    return resume;
  },
  updateResume: async (id: string, data: Resume) => {
    const resume = resumeRepository.update(id, data);
    return resume;
  },
  deleteResume: async (id: string) => {
    const resume = resumeRepository.delete(id);
    return resume;
  }
};