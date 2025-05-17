import { useFormContext } from "react-hook-form";
import { ResumeFormValues } from "@resume/schemas/resume.schema";
import { Button } from "@shared/components/ui/button";
import { Input } from "@shared/components/ui/input";
import { Calendar } from "@shared/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@shared/components/ui/popover";
import { Calendar as CalendarIcon, Code2 } from "lucide-react";
import OpenAIPrompt from "@shared/components/extends/openai-prompt";
import { format } from "date-fns";
import { cn } from "@shared/lib/utils";
import { Textarea } from "@shared/components/ui/textarea";
import SectionWrapper from "@resume/components/form/section-wrapper";
import { useTranslations } from "next-intl";

export default function SectionProject() {
  const form = useFormContext<ResumeFormValues>();
  const t = useTranslations("resume");

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "";
    try {
      return format(new Date(dateString), "MMM yyyy");
    } catch {
      return "";
    }
  };

  return (
    <SectionWrapper header={t("projects.title")} icon={<Code2 />}>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">{t("projects.name")}</label>
            <Input
              {...form.register("projects.0.name")}
              placeholder={t("projects.name-placeholder")}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">{t("projects.role")}</label>
            <Input
              {...form.register("projects.0.role")}
              placeholder={t("projects.role-placeholder")}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">{t("projects.start-date")}</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !form.watch("projects.0.startDate") && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {form.watch("projects.0.startDate") ? (
                    formatDate(form.watch("projects.0.startDate"))
                  ) : (
                    <span>{t("projects.pick-date")}</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={form.watch("projects.0.startDate") ? new Date(form.watch("projects.0.startDate") || "") : undefined}
                  onSelect={(date) => form.setValue("projects.0.startDate", date?.toISOString() || "")}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">{t("projects.end-date")}</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !form.watch("projects.0.endDate") && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {form.watch("projects.0.endDate") ? (
                    formatDate(form.watch("projects.0.endDate"))
                  ) : (
                    <span>{t("projects.pick-date")}</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={form.watch("projects.0.endDate") ? new Date(form.watch("projects.0.endDate") || "") : undefined}
                  onSelect={(date) => form.setValue("projects.0.endDate", date?.toISOString() || "")}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">{t("projects.technologies")}</label>
            <Input
              {...form.register("projects.0.technologies")}
              placeholder={t("projects.technologies-placeholder")}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">{t("projects.url")}</label>
            <Input
              {...form.register("projects.0.url")}
              type="url"
              placeholder={t("projects.url-placeholder")}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">{t("projects.description")}</label>
          <OpenAIPrompt>
            <Textarea
              {...form.register("projects.0.description")}
              placeholder={t("projects.description-placeholder")}
            />
          </OpenAIPrompt>
        </div>
      </div>
    </SectionWrapper>
  );
}
