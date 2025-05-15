import { z } from "zod";

const profileSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  location: z.string().min(1, "Location is required"),
  objective: z.string().min(1, "Objective is required"),
  website: z.string().optional(),
});

const experienceSchema = z.object({
  company: z.string().optional(),
  jobTitle: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  description: z.string().optional(),
});

const educationSchema = z.object({
  school: z.string().optional(),
  degree: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  description: z.string().optional(),
});

const projectSchema = z.object({
  name: z.string().optional(),
  role: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  description: z.string().optional(),
  technologies: z.string().optional(),
  url: z.string().optional(),
});

const skillsSchema = z.object({
  technical: z.string().optional(),
  soft: z.string().optional(),
  languages: z.string().optional(),
  certifications: z.string().optional(),
});

const customFieldSchema = z.object({
  id: z.string(),
  label: z.string().optional(),
  value: z.string().optional(),
});

const customFieldsSchema = z.object({
  fields: z.array(customFieldSchema).optional().default([]),
});

export const resumeFormSchema = z.object({
  profile: profileSchema,
  experiences: z.array(experienceSchema).optional().default([]),
  educations: z.array(educationSchema).optional().default([]),
  projects: z.array(projectSchema).optional().default([]),
  skills: skillsSchema.optional().default({
    technical: "",
    soft: "",
    languages: "",
    certifications: "",
  }),
  customFields: customFieldsSchema.optional().default({ fields: [] }),
});

export type ResumeFormValues = z.infer<typeof resumeFormSchema>; 