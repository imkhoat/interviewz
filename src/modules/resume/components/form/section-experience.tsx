import { useFormContext } from "react-hook-form";
import { ResumeFormValues } from "@resume/schemas/resume.schema";
import { Button } from "@shared/components/ui/button";
import { Input } from "@shared/components/ui/input";
import { Calendar } from "@shared/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@shared/components/ui/popover";
import { Plus, Trash2, Calendar as CalendarIcon, Briefcase, ChevronDown } from "lucide-react";
import OpenAIPrompt from "@shared/components/extends/openai-prompt";
import { format } from "date-fns";
import { cn } from "@shared/lib/utils";
import { Textarea } from "@shared/components/ui/textarea";
import SectionWrapper from "@resume/components/form/section-wrapper";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@shared/components/ui/collapsible";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function SectionExperience() {
  const form = useFormContext<ResumeFormValues>();
  const experiences = form.watch("experiences");
  const [openStates, setOpenStates] = useState<boolean[]>(experiences.map(() => true));
  const t = useTranslations("resume");

  const addExperience = () => {
    const currentExperiences = form.getValues("experiences");
    form.setValue("experiences", [
      ...currentExperiences,
      {
        company: "",
        jobTitle: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
    setOpenStates([...openStates, true]);
  };

  const removeExperience = (index: number) => {
    const currentExperiences = form.getValues("experiences");
    form.setValue(
      "experiences",
      currentExperiences.filter((_, i) => i !== index)
    );
    setOpenStates(openStates.filter((_, i) => i !== index));
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "";
    try {
      return format(new Date(dateString), "MMM yyyy");
    } catch {
      return "";
    }
  };

  const getWorkPeriod = (startDate: string | undefined, endDate: string | undefined) => {
    const start = startDate ? formatDate(startDate) : "";
    const end = endDate ? formatDate(endDate) : t("experience.present");
    if (!start) return "";
    return `${start} - ${end}`;
  };

  const toggleExperience = (index: number) => {
    const newOpenStates = [...openStates];
    newOpenStates[index] = !newOpenStates[index];
    setOpenStates(newOpenStates);
  };

  return (
    <SectionWrapper header={t("experience.title")} icon={<Briefcase />}>
      <div className="space-y-4">
        <div className="flex items-center justify-end">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="h-7"
            onClick={addExperience}
          >
            <Plus className="w-4 h-4 mr-2" />
            {t("experience.add")}
          </Button>
        </div>

        {experiences.map((_, index) => (
          <Collapsible
            key={index}
            open={openStates[index]}
            onOpenChange={() => toggleExperience(index)}
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
                <div className="flex flex-col">
                  <h4 className="text-sm font-medium">
                    {form.watch(`experiences.${index}.company`) || `${t("experience.title")} ${index + 1}`}
                  </h4>
                  <span className="text-xs text-muted-foreground">
                    {getWorkPeriod(
                      form.watch(`experiences.${index}.startDate`),
                      form.watch(`experiences.${index}.endDate`)
                    )}
                  </span>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeExperience(index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            <CollapsibleContent className="px-4 pb-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t("experience.company")}</label>
                    <Input
                      {...form.register(`experiences.${index}.company`)}
                      placeholder={t("experience.company-placeholder")}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t("experience.position")}</label>
                    <Input
                      {...form.register(`experiences.${index}.jobTitle`)}
                      placeholder={t("experience.position-placeholder")}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t("experience.start-date")}</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !form.watch(`experiences.${index}.startDate`) && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {form.watch(`experiences.${index}.startDate`) ? (
                            formatDate(form.watch(`experiences.${index}.startDate`))
                          ) : (
                            <span>{t("experience.pick-date")}</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={form.watch(`experiences.${index}.startDate`) ? new Date(form.watch(`experiences.${index}.startDate`) || "") : undefined}
                          onSelect={(date) => form.setValue(`experiences.${index}.startDate`, date?.toISOString() || "")}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t("experience.end-date")}</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !form.watch(`experiences.${index}.endDate`) && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {form.watch(`experiences.${index}.endDate`) ? (
                            formatDate(form.watch(`experiences.${index}.endDate`))
                          ) : (
                            <span>{t("experience.pick-date")}</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={form.watch(`experiences.${index}.endDate`) ? new Date(form.watch(`experiences.${index}.endDate`) || "") : undefined}
                          onSelect={(date) => form.setValue(`experiences.${index}.endDate`, date?.toISOString() || "")}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("experience.description")}</label>
                  <OpenAIPrompt>
                    <Textarea
                      {...form.register(`experiences.${index}.description`)}
                      placeholder={t("experience.description-placeholder")}
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
