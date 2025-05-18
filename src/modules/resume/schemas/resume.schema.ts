import { z } from "zod";

const getValidationMessages = (t: (key: string) => string) => ({
  profile: {
    fullName: t("profile.full-name"),
    email: t("profile.email"),
    phone: t("profile.phone"),
    location: t("profile.location"),
    objective: t("profile.objective"),
    validation: {
      required: (field: string) => t("profile.validation.required", { field }),
      invalidEmail: t("profile.validation.invalid-email"),
    },
  },
  experience: {
    company: t("experience.company"),
    jobTitle: t("experience.position"),
    startDate: t("experience.start-date"),
    endDate: t("experience.end-date"),
    description: t("experience.description"),
  },
  education: {
    school: t("education.school"),
    degree: t("education.degree"),
    startDate: t("education.start-date"),
    endDate: t("education.end-date"),
    description: t("education.description"),
  },
  project: {
    name: t("projects.name"),
    role: t("projects.role"),
    startDate: t("projects.start-date"),
    endDate: t("projects.end-date"),
    description: t("projects.description"),
    technologies: t("projects.technologies"),
    url: t("projects.url"),
  },
  skills: {
    technical: t("skills.categories.technical.title"),
    soft: t("skills.categories.soft.title"),
    languages: t("skills.categories.languages.title"),
    certifications: t("skills.categories.certifications.title"),
    validation: {
      required: (field: string) => t("skills.validation.required", { field }),
    },
  },
  customFields: {
    label: t("custom-fields.label"),
    value: t("custom-fields.value"),
  },
});

export const createResumeFormSchema = (t: (key: string) => string) => {
  const messages = getValidationMessages(t);

  const profileSchema = z.object({
    fullName: z.string().min(1, messages.profile.validation.required(messages.profile.fullName)),
    email: z.string().email(messages.profile.validation.invalidEmail),
    phone: z.string().min(1, messages.profile.validation.required(messages.profile.phone)),
    location: z.string().min(1, messages.profile.validation.required(messages.profile.location)),
    objective: z.string().min(1, messages.profile.validation.required(messages.profile.objective)),
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

  const skillItemSchema = z.object({
    id: z.string(),
    name: z.string().min(1, messages.skills.validation.required(t("skills.name"))),
    level: z.string().min(1, messages.skills.validation.required(t("skills.level"))),
    experience: z.string().optional(),
  });

  const skillCategorySchema = z.object({
    id: z.string(),
    title: z.string().min(1, messages.skills.validation.required(t("skills.categories.title"))),
    items: z.array(skillItemSchema).default([]),
  });

  const skillsSchema = z.object({
    categories: z.array(skillCategorySchema).default([]),
  });

  const customFieldSchema = z.object({
    id: z.string(),
    label: z.string().optional(),
    value: z.string().optional(),
  });

  const customFieldsSchema = z.object({
    fields: z.array(customFieldSchema).optional().default([]),
  });

  return z.object({
    profile: profileSchema,
    experiences: z.array(experienceSchema).optional().default([]),
    educations: z.array(educationSchema).optional().default([]),
    projects: z.array(projectSchema).optional().default([]),
    skills: skillsSchema.optional().default({ categories: [] }),
    customFields: customFieldsSchema.optional().default({ fields: [] }),
  });
};

export type ResumeFormValues = z.infer<ReturnType<typeof createResumeFormSchema>>; 