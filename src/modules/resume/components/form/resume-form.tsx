import { useFormContext } from "react-hook-form";

import SectionProfile from "@resume/components/form/section-profile";
import SectionExperience from "@resume/components/form/section-experience";
import SectionEducation from "@resume/components/form/section-education";
import SectionProject from "@resume/components/form/section-project";
import SectionSkills from "@resume/components/form/section-skills";
import SectionCustomFields from "@resume/components/form/section-custom-fields";
import { ResumeFormValues } from "@resume/schemas/resume.schema";

interface ResumeFormProps {
  onSubmit?: (data: ResumeFormValues) => void;
}

export default function ResumeForm({ onSubmit }: ResumeFormProps) {
  const form = useFormContext<ResumeFormValues>();

  const handleFormSubmit = form.handleSubmit(
    (data) => {
      onSubmit?.(data);
    },
    (errors) => {
      console.error("Form validation errors:", errors);
    }
  );

  return (
    <form id="resume-form" onSubmit={handleFormSubmit} className="space-y-8">
      <SectionProfile />
      <SectionExperience />
      <SectionEducation />
      <SectionProject />
      <SectionSkills />
      <SectionCustomFields />
    </form>
  );
} 