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
  company: z.string().min(1, "Company name is required"),
  jobTitle: z.string().min(1, "Job title is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  description: z.string().min(1, "Description is required"),
});

const educationSchema = z.object({
  school: z.string().min(1, "School name is required"),
  degree: z.string().min(1, "Degree is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  description: z.string().min(1, "Description is required"),
});

const projectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  role: z.string().min(1, "Role is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  description: z.string().min(1, "Description is required"),
  technologies: z.string().optional(),
  url: z.string().optional(),
});

const skillsSchema = z.object({
  technical: z.string().min(1, "Technical skills are required"),
  soft: z.string().min(1, "Soft skills are required"),
  languages: z.string().optional(),
  certifications: z.string().optional(),
});

const customFieldSchema = z.object({
  id: z.string(),
  label: z.string().min(1, "Label is required"),
  value: z.string().min(1, "Value is required"),
});

const customFieldsSchema = z.object({
  fields: z.array(customFieldSchema).optional().default([]),
});

export const resumeFormSchema = z.object({
  profile: profileSchema,
  experiences: z.array(experienceSchema),
  educations: z.array(educationSchema),
  projects: z.array(projectSchema),
  skills: skillsSchema,
  customFields: customFieldsSchema.optional().default({ fields: [] }),
});

export type ResumeFormValues = z.infer<typeof resumeFormSchema>; 