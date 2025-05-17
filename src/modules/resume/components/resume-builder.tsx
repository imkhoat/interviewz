import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@shared/hooks/use-toast";
import { useTranslations } from "next-intl";

import ResumeForm from "@resume/components/form/resume-form";
import ResumeActions from "@resume/components/form/resume-actions";
import { createResumeFormSchema, ResumeFormValues } from "@resume/schemas/resume.schema";
import { useResume } from "@resume/hooks/use-resume";

export default function ResumeBuilder() {
  const { handleCreateResume, handleUpdateResume, handleDeleteResume, isCreating, isUpdating, isDeleting } = useResume();
  const t = useTranslations("resume");

  const form = useForm<ResumeFormValues>({
    resolver: zodResolver(createResumeFormSchema(t)),
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
      const result = await handleCreateResume({
        ...data,
        title: data.profile.fullName,
        status: "draft",
      });
      toast({
        title: t("builder.toast.success.save.title"),
        description: t("builder.toast.success.save.description"),
      });
      return result;
    } catch (error) {
      console.error("Error saving resume:", error);
      toast({
        title: t("builder.toast.error.save.title"),
        description: t("builder.toast.error.save.description"),
        variant: "destructive",
      });
      throw error;
    }
  };

  const handleSave = async () => {
    const isValid = await form.trigger();
    if (!isValid) {
      toast({
        title: t("builder.toast.error.validation.title"),
        description: t("builder.toast.error.validation.description"),
        variant: "destructive",
      });
      return;
    }

    try {
      const data = form.getValues();
      await handleFormSubmit(data);
    } catch (error) {
      console.error("Error saving resume:", error);
      toast({
        title: t("builder.toast.error.save.title"),
        description: t("builder.toast.error.save.description"),
        variant: "destructive",
      });
    }
  };

  const handlePublish = async () => {
    const isValid = await form.trigger();
    if (!isValid) {
      toast({
        title: t("builder.toast.error.validation.title"),
        description: t("builder.toast.error.validation.description"),
        variant: "destructive",
      });
      return;
    }

    try {
      const data = form.getValues();
      const resumeId = (data as any).id; // TODO: Add id to ResumeFormValues type
      if (!resumeId) {
        toast({
          title: t("builder.toast.error.not-found.title"),
          description: t("builder.toast.error.not-found.description"),
          variant: "destructive",
        });
        return;
      }
      await handleUpdateResume(resumeId, {
        ...data,
        status: "published",
      });
      toast({
        title: t("builder.toast.success.publish.title"),
        description: t("builder.toast.success.publish.description"),
      });
    } catch (error) {
      console.error("Error publishing resume:", error);
      toast({
        title: t("builder.toast.error.publish.title"),
        description: t("builder.toast.error.publish.description"),
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    try {
      const data = form.getValues();
      const resumeId = (data as any).id; // TODO: Add id to ResumeFormValues type
      if (!resumeId) {
        toast({
          title: t("builder.toast.error.not-found.title"),
          description: t("builder.toast.error.not-found.description"),
          variant: "destructive",
        });
        return;
      }
      await handleDeleteResume(resumeId);
      toast({
        title: t("builder.toast.success.delete.title"),
        description: t("builder.toast.success.delete.description"),
      });
    } catch (error) {
      console.error("Error deleting resume:", error);
      toast({
        title: t("builder.toast.error.delete.title"),
        description: t("builder.toast.error.delete.description"),
        variant: "destructive",
      });
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
                {t("builder.preview.title")}
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
              isSaving={isCreating || isUpdating}
              isPublishing={isUpdating}
              isDeleting={isDeleting}
            />
        </div>
      </div>
    </FormProvider>
  );
}
