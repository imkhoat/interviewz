import { z } from "zod";

export const profileFormSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email").min(1, "Email is required"),
  phone: z.string().min(1, "Phone is required"),
  location: z.string().min(1, "Location is required"),
  objective: z.string().min(1, "Objective is required"),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
});

export const experienceFormSchema = z.object({
  company: z.string().min(1, "Company is required"),
  jobTitle: z.string().min(1, "Job title is required"),
  date: z.string().min(1, "Date is required"),
  description: z.string().min(1, "Description is required"),
});

export const educationFormSchema = z.object({
  school: z.string().min(1, "School is required"),
  degree: z.string().min(1, "Degree is required"),
  date: z.string().min(1, "Date is required"),
  description: z.string().min(1, "Description is required"),
});

export const projectFormSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  role: z.string().min(1, "Role is required"),
  date: z.string().min(1, "Date is required"),
  description: z.string().min(1, "Description is required"),
  technologies: z.string().min(1, "Technologies is required"),
  url: z.string().url("Invalid URL").optional().or(z.literal("")),
});

export const skillsFormSchema = z.object({
  technical: z.string().min(1, "Technical skills are required"),
  soft: z.string().min(1, "Soft skills are required"),
  languages: z.string().min(1, "Languages are required"),
  certifications: z.string().optional(),
});

export const customFieldsFormSchema = z.object({
  fields: z.array(z.object({
    id: z.string(),
    name: z.string().min(1, "Field name is required"),
    value: z.string().min(1, "Field value is required"),
  })).default([]),
});

export const resumeFormSchema = z.object({
  profile: profileFormSchema,
  experience: experienceFormSchema,
  education: educationFormSchema,
  project: projectFormSchema,
  skills: skillsFormSchema,
  customFields: customFieldsFormSchema,
});

export type ResumeFormValues = z.infer<typeof resumeFormSchema>; 