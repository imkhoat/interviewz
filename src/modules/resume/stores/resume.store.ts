import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface Resume {
  id: string;
  title: string;
  status: "draft" | "published" | "archived";
  updatedAt: string;
}

interface ResumeState {
  resumes: Resume[];
  selectedResume: Resume | null;
  setResumes: (resumes: Resume[]) => void;
  setSelectedResume: (resume: Resume | null) => void;
  addResume: (resume: Resume) => void;
  updateResume: (id: string, resume: Partial<Resume>) => void;
  deleteResume: (id: string) => void;
}

export const useResumeStore = create<ResumeState>()(
  devtools(
    (set) => ({
      resumes: [],
      selectedResume: null,
      setResumes: (resumes) => set({ resumes }),
      setSelectedResume: (resume) => set({ selectedResume: resume }),
      addResume: (resume) =>
        set((state) => ({ resumes: [...state.resumes, resume] })),
      updateResume: (id, resume) =>
        set((state) => ({
          resumes: state.resumes.map((r) =>
            r.id === id ? { ...r, ...resume } : r
          ),
        })),
      deleteResume: (id) =>
        set((state) => ({
          resumes: state.resumes.filter((r) => r.id !== id),
        })),
    }),
    {
      name: "resume-store",
    }
  )
); 