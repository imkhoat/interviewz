import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@shared/hooks/use-toast";

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
      experiences: [{
        company: "",
        jobTitle: "",
        startDate: "",
        endDate: "",
        description: "",
      }],
      educations: [{
        school: "",
        degree: "",
        startDate: "",
        endDate: "",
        description: "",
      }],
      projects: [{
        name: "",
        role: "",
        startDate: "",
        endDate: "",
        description: "",
        technologies: "",
        url: "",
      }],
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
      toast({
        title: "Success",
        description: "Resume saved successfully",
      });
    } catch (error) {
      console.error("Error saving resume:", error);
      toast({
        title: "Error",
        description: "Failed to save resume",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSave = async () => {
    const isValid = await form.trigger();
    if (!isValid) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSaving(true);
      const data = form.getValues();
      await handleFormSubmit(data);
    } catch (error) {
      console.error("Error saving resume:", error);
      toast({
        title: "Error",
        description: "Failed to save resume",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    const isValid = await form.trigger();
    if (!isValid) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsPublishing(true);
      const data = form.getValues();
      console.log("Publishing resume:", data);
      toast({
        title: "Success",
        description: "Resume published successfully",
      });
    } catch (error) {
      console.error("Error publishing resume:", error);
      toast({
        title: "Error",
        description: "Failed to publish resume",
        variant: "destructive",
      });
    } finally {
      setIsPublishing(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      console.log("Deleting resume");
      toast({
        title: "Success",
        description: "Resume deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting resume:", error);
      toast({
        title: "Error",
        description: "Failed to delete resume",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <FormProvider {...form}>
      <div className="flex flex-col min-h-screen">
        {/* Main content */}
        <div className="flex-1 grid grid-cols-12 gap-8 p-8 bg-white rounded-lg mb-12">
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

        {/* Sticky actions */}
        <div className="fixed bottom-4 border left-1/2 -translate-x-1/2 z-50 shadow-lg rounded-2xl p-3 w-fit min-w-64 bg-background">
            <ResumeActions
              onSave={handleSave}
              onPublish={handlePublish}
              onDelete={handleDelete}
              isSaving={isSaving}
              isPublishing={isPublishing}
              isDeleting={isDeleting}
            />
        </div>
      </div>
    </FormProvider>
  );
}
