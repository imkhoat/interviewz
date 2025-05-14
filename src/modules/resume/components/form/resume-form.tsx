import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@shared/components/ui/button";
import { Form } from "@shared/components/ui/form";
import SectionCustomFields, { customFieldsFormSchema } from "@resume/components/form/section-custom-fields";
import SectionEducation, { educationFormSchema } from "@resume/components/form/section-education";
import SectionExperience, { experienceFormSchema } from "@resume/components/form/section-experience";
import SectionProfile, { profileFormSchema } from "@resume/components/form/section-profile";
import SectionProject, { projectFormSchema } from "@resume/components/form/section-project";
import SectionSkills, { skillsFormSchema } from "@resume/components/form/section-skills";
import { resumeService } from "@resume/services/resume.service";
import { useResumeStore } from "@resume/stores/resume.store";
import { Resume } from "@resume/types/resume.types";

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
  defaultValues?: Partial<ResumeFormValues>;
}

export default function ResumeForm({ defaultValues }: ResumeFormProps) {
  const router = useRouter();
  const { addResume } = useResumeStore();
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

  const handleSubmit = async (data: ResumeFormValues) => {
    try {
      const resume: Omit<Resume, "id" | "userId" | "createdAt" | "updatedAt"> = {
        title: data.profile.fullName,
        content: {
          profile: {
            fullName: data.profile.fullName,
            email: data.profile.email,
            phone: data.profile.phone,
            location: data.profile.location,
            website: data.profile.website,
            objective: data.profile.objective,
          },
          experience: [{
            id: crypto.randomUUID(),
            company: data.experience.company,
            position: data.experience.jobTitle,
            startDate: data.experience.date,
            description: data.experience.description,
          }],
          education: [{
            id: crypto.randomUUID(),
            school: data.education.school,
            degree: data.education.degree,
            startDate: data.education.date,
            description: data.education.description,
          }],
          skills: [{
            id: crypto.randomUUID(),
            name: data.skills.technical,
            level: 5,
          }],
          projects: [{
            id: crypto.randomUUID(),
            name: data.project.name,
            startDate: data.project.date,
            description: data.project.description,
          }],
        },
      };

      const response = await resumeService.createResume(resume);
      addResume(response);
      toast.success("Resume created successfully");
      router.push("/resume/my-resumes");
    } catch (error) {
      toast.error("Failed to create resume");
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
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