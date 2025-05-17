import { useFormContext } from "react-hook-form";
import { ResumeFormValues } from "@resume/schemas/resume.schema";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Wrench, ChevronDown } from "lucide-react";
import { cn } from "@shared/lib/utils";
import SectionWrapper from "@resume/components/form/section-wrapper";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/shared/components/ui/collapsible";
import { useState } from "react";
import { FormControl, FormField, FormItem } from "@shared/components/ui/form";
import { useTranslations } from "next-intl";

export default function SectionSkills() {
  const form = useFormContext<ResumeFormValues>();
  const [openStates, setOpenStates] = useState<boolean[]>([true, true, true, true]);
  const t = useTranslations("resume");

  const toggleSkill = (index: number) => {
    const newOpenStates = [...openStates];
    newOpenStates[index] = !newOpenStates[index];
    setOpenStates(newOpenStates);
  };

  const skillCategories = [
    {
      title: "Technical Skills",
      name: "skills.technical" as const,
      placeholder: "e.g. JavaScript, React, Node.js, Python",
    },
    {
      title: "Soft Skills",
      name: "skills.soft" as const,
      placeholder: "e.g. Communication, Leadership, Problem Solving",
    },
    {
      title: "Languages",
      name: "skills.languages" as const,
      placeholder: "e.g. English (Fluent), Spanish (Intermediate)",
    },
    {
      title: "Certifications",
      name: "skills.certifications" as const,
      placeholder: "e.g. AWS Certified Developer, Google Cloud Professional",
    },
  ];

  return (
    <SectionWrapper header="Skills" icon={<Wrench />}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">{t("skills.title")}</h3>
        </div>

        <div className="space-y-4">
          {skillCategories.map((category, index) => (
            <Collapsible
              key={index}
              open={openStates[index]}
              onOpenChange={() => toggleSkill(index)}
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
                  <h4 className="text-sm font-medium">{category.title}</h4>
                </div>
              </div>
              <CollapsibleContent className="px-4 pb-4">
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name={category.name}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder={category.placeholder}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
