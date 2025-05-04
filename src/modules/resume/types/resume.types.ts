export interface Resume {
  id: string;
  title: string;
  description?: string;
  content: ResumeContent;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ResumeContent {
  profile: Profile;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
}

export interface Profile {
  fullName: string;
  email: string;
  phone?: string;
  location?: string;
  website?: string;
  objective?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number;
}

export interface Project {
  id: string;
  name: string;
  startDate: string;
  endDate?: string;
  description?: string;
} 