export interface Experience {
  order: number;
  company: string;
  jobTitle: string;
  startDate: string;
  endDate: string;
  description: string;
  isCurrent: boolean;
}

export interface Education {
  order: number;
  school: string;
  degree: string;
  gpa: number;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Project {
  order: number;
  projectName: string;
  startDate: string;
  endDate: string;
  description: string;
  references: string[];
}

export interface Profile {
  name: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  objective: string;
  linkedin: string;
  github: string;
}

export interface FeaturedSkill {
  order: number;
  name: string;
  level: number;
}

export interface Resume {
  profile: Profile;
  experiences: Experience[];
  educations: Education[];
  projects: Project[];
  featuredSkills: FeaturedSkill[];
  skill: string[];
}