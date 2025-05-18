import { useFormContext } from "react-hook-form";
import { ResumeFormValues } from "@resume/schemas/resume.schema";
import { Button } from "@shared/components/ui/button";
import { Input } from "@shared/components/ui/input";
import { Calendar } from "@shared/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@shared/components/ui/popover";
import { Calendar as CalendarIcon, GraduationCap, ChevronDown, Plus, Trash2 } from "lucide-react";
import OpenAIPrompt from "@shared/components/extends/openai-prompt";
import { format } from "date-fns";
import { cn } from "@shared/lib/utils";
import { Textarea } from "@shared/components/ui/textarea";
import SectionWrapper from "@resume/components/form/section-wrapper";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@shared/components/ui/collapsible";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function SectionEducation() {
  const form = useFormContext<ResumeFormValues>();
  const [openStates, setOpenStates] = useState<boolean[]>([]);
  const t = useTranslations("resume");

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "";
    try {
      return format(new Date(dateString), "MMM yyyy");
    } catch {
      return "";
    }
  };

  const getEducationPeriod = (startDate: string | undefined, endDate: string | undefined) => {
    if (!startDate) return "";
    const start = formatDate(startDate);
    const end = endDate ? formatDate(endDate) : t("education.present");
    return `${start} - ${end}`;
  };

  const addEducation = () => {
    const currentEducations = form.getValues("educations") || [];
    form.setValue("educations", [
      ...currentEducations,
      {
        school: "",
        degree: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
    setOpenStates([...openStates, true]);
  };

  const removeEducation = (index: number) => {
    const currentEducations = form.getValues("educations");
    form.setValue(
      "educations",
      currentEducations.filter((_, i) => i !== index)
    );
    const newOpenStates = [...openStates];
    newOpenStates.splice(index, 1);
    setOpenStates(newOpenStates);
  };

  const toggleEducation = (index: number) => {
    const newOpenStates = [...openStates];
    newOpenStates[index] = !newOpenStates[index];
    setOpenStates(newOpenStates);
  };

  return (
    <SectionWrapper header={t("education.title")} icon={<GraduationCap />}>
      <div className="space-y-4">
        <div className="flex justify-end">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="h-7"
            onClick={addEducation}
          >
            <Plus className="w-4 h-4 mr-2" />
            {t("education.add")}
          </Button>
        </div>

        {form.watch("educations")?.map((education, index) => (
          <Collapsible
            key={index}
            open={openStates[index]}
            onOpenChange={() => toggleEducation(index)}
            className="border rounded-lg"
          >
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-2">
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <ChevronDown className={cn(
                      "h-4 w-4 transition-transform",
                      openStates[index] ? "transform rotate-180" : ""
                    )} />
                  </Button>
                </CollapsibleTrigger>
                <div>
                  <h4 className="text-sm font-medium">
                    {education.school || `${t("education.title")} ${index + 1}`}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {getEducationPeriod(education.startDate, education.endDate)}
                  </p>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeEducation(index)}
                className="h-8 w-8 p-0"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <CollapsibleContent className="px-4 pb-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t("education.school")}</label>
                    <Input
                      {...form.register(`educations.${index}.school`)}
                      placeholder={t("education.school-placeholder")}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t("education.degree")}</label>
                    <Input
                      {...form.register(`educations.${index}.degree`)}
                      placeholder={t("education.degree-placeholder")}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t("education.start-date")}</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !form.watch(`educations.${index}.startDate`) && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {form.watch(`educations.${index}.startDate`) ? (
                            formatDate(form.watch(`educations.${index}.startDate`))
                          ) : (
                            <span>{t("education.pick-date")}</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={form.watch(`educations.${index}.startDate`) ? new Date(form.watch(`educations.${index}.startDate`) || "") : undefined}
                          onSelect={(date) => form.setValue(`educations.${index}.startDate`, date?.toISOString() || "")}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t("education.end-date")}</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !form.watch(`educations.${index}.endDate`) && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {form.watch(`educations.${index}.endDate`) ? (
                            formatDate(form.watch(`educations.${index}.endDate`))
                          ) : (
                            <span>{t("education.pick-date")}</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={form.watch(`educations.${index}.endDate`) ? new Date(form.watch(`educations.${index}.endDate`) || "") : undefined}
                          onSelect={(date) => form.setValue(`educations.${index}.endDate`, date?.toISOString() || "")}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("education.description")}</label>
                  <OpenAIPrompt>
                    <Textarea
                      {...form.register(`educations.${index}.description`)}
                      placeholder={t("education.description-placeholder")}
                    />
                  </OpenAIPrompt>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </SectionWrapper>
  );
} 