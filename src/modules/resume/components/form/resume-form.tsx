import { useFormContext } from "react-hook-form";
import { ResumeFormValues } from "@resume/schemas/resume.schema";
import SectionProfile from "@resume/components/form/section-profile";
import SectionExperience from "@resume/components/form/section-experience";
import SectionEducation from "@resume/components/form/section-education-new";
import SectionProject from "@resume/components/form/section-project-new";
import SectionSkills from "@resume/components/form/section-skills";
import SectionCustomFields from "@resume/components/form/section-custom-fields";

interface ResumeFormProps {
  onSubmit: (data: ResumeFormValues) => void;
}

export default function ResumeForm({ onSubmit }: ResumeFormProps) {
  const form = useFormContext<ResumeFormValues>();

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <SectionProfile />
      <SectionExperience />
      <SectionEducation />
      <SectionProject />
      <SectionSkills />
      <SectionCustomFields />
    </form>
  );
} 