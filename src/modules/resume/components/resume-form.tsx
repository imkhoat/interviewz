import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@shared/components/ui/button";
import { Form } from "@shared/components/ui/form";
import SectionCustomFields, { customFieldsFormSchema } from "@resume/components/section-custom-fields";
import SectionEducation, { educationFormSchema } from "@resume/components/section-education";
import SectionExperience, { experienceFormSchema } from "@resume/components/section-experience";
import SectionProfile, { profileFormSchema } from "@resume/components/section-profile";
import SectionProject, { projectFormSchema } from "@resume/components/section-project";
import SectionSkills, { skillsFormSchema } from "@resume/components/section-skills";

export const resumeFormSchema = z.object({
  profile: profileFormSchema,
  experience: experienceFormSchema,
  education: educationFormSchema,
  project: projectFormSchema,
  skills: skillsFormSchema,
  customFields: customFieldsFormSchema,
});

export type ResumeFormValues = z.infer<typeof resumeFormSchema>;

interface ResumeFormProps {
  onSubmit: (data: ResumeFormValues) => void;
  defaultValues?: Partial<ResumeFormValues>;
}

export default function ResumeForm({ onSubmit, defaultValues }: ResumeFormProps) {
  const form = useForm<ResumeFormValues>({
    resolver: zodResolver(resumeFormSchema),
    defaultValues: {
      profile: {
        fullName: "",
        location: "",
        phone: "",
        email: "",
        objective: "",
        website: "",
      },
      experience: {
        company: "",
        jobTitle: "",
        date: "",
        description: "",
      },
      education: {
        school: "",
        degree: "",
        date: "",
        description: "",
      },
      project: {
        name: "",
        role: "",
        date: "",
        description: "",
        technologies: "",
        url: "",
      },
      skills: {
        technical: "",
        soft: "",
        languages: "",
        certifications: "",
      },
      customFields: {
        fields: [],
      },
      ...defaultValues,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <SectionProfile />
        <SectionExperience />
        <SectionEducation />
        <SectionProject />
        <SectionSkills />
        <SectionCustomFields />

        <div className="flex justify-end">
          <Button type="submit">Save Resume</Button>
        </div>
      </form>
    </Form>
  );
} 