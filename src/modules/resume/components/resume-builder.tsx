import { useRouter } from "next/navigation";
import { toast } from "sonner";

import ResumeForm, { ResumeFormValues } from "@resume/components/resume-form";
import { resumeService } from "@resume/services/resume.service";
import { useResumeStore } from "@resume/stores/resume.store";
import { Resume } from "@resume/types/resume.types";

export default function ResumeBuilder() {
  const router = useRouter();
  const { addResume } = useResumeStore();

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
    <div className="h-full grid grid-cols-12 gap-8">
      <div className="h-full order-2 lg:order-1 col-span-12 lg:col-span-6 flex flex-col justify-start items-stretch gap-4 overflow-y-scroll pr-4 -mr-4 rounded-md">
        <h1 className="text-2xl font-bold mb-8">Create New Resume</h1>
        <ResumeForm onSubmit={handleSubmit} />
      </div>
      <div className="h-full order-1 lg:order-2 col-span-12 lg:col-span-6 border border-primary-foreground rounded-md p-4 bg-white flex justify-center items-center">
        <div className="w-full h-full">
          {/* TODO: Add ResumePreview component */}
          <div className="text-center text-muted-foreground">
            Preview will be available here
          </div>
        </div>
      </div>
    </div>
  );
}
