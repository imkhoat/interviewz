import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import ResumeForm from "@resume/components/form/resume-form";
import ResumeActions from "@resume/components/form/resume-actions";
import { resumeFormSchema, ResumeFormValues } from "@resume/schemas/resume.schema";

export default function ResumeBuilder() {
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const form = useForm<ResumeFormValues>({
    resolver: zodResolver(resumeFormSchema),
    defaultValues: {
      profile: {
        fullName: "",
        email: "",
        phone: "",
        location: "",
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
    },
  });

  const handleFormSubmit = async (data: ResumeFormValues) => {
    try {
      setIsSaving(true);
      console.log("Saving resume:", data);
      toast.success("Resume saved successfully");
    } catch (error) {
      console.error("Error saving resume:", error);
      toast.error("Failed to save resume");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    try {
      setIsPublishing(true);
      const data = form.getValues();
      console.log("Publishing resume:", data);
      toast.success("Resume published successfully");
    } catch (error) {
      console.error("Error publishing resume:", error);
      toast.error("Failed to publish resume");
    } finally {
      setIsPublishing(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      console.log("Deleting resume");
      toast.success("Resume deleted successfully");
    } catch (error) {
      console.error("Error deleting resume:", error);
      toast.error("Failed to delete resume");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <FormProvider {...form}>
      <div className="flex flex-col min-h-screen">
        <div className="flex-1 grid grid-cols-12 gap-8">
          <div className="h-full order-2 lg:order-1 col-span-12 lg:col-span-6 flex flex-col justify-start items-stretch gap-4 overflow-y-scroll pr-4 -mr-4 rounded-md">
            <ResumeForm onSubmit={handleFormSubmit} />
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
        <ResumeActions
          onSave={handleFormSubmit}
          onPublish={handlePublish}
          onDelete={handleDelete}
          isSaving={isSaving}
          isPublishing={isPublishing}
          isDeleting={isDeleting}
        />
      </div>
    </FormProvider>
  );
}
