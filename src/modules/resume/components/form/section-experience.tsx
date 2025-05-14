import { Briefcase } from "lucide-react";
import { useFormContext } from "react-hook-form";

import SectionWrapper from "@resume/components/form/section-wrapper";
import OpenAIPrompt from "@shared/components/extends/openai-prompt";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@shared/components/ui/form";
import { Input } from "@shared/components/ui/input";
import { Textarea } from "@shared/components/ui/textarea";
import { ResumeFormValues } from "@resume/schemas/resume.schema";

export default function SectionExperience() {
  const form = useFormContext<ResumeFormValues>();

  return (
    <SectionWrapper header="Experience" icon={<Briefcase />}>
      <div className="flex flex-col justify-start items-stretch gap-4">
        <FormField
          control={form.control}
          name="experience.company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="experience.jobTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="experience.date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g. Jan 2020 - Present" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <OpenAIPrompt>
          <FormField
            control={form.control}
            name="experience.description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </OpenAIPrompt>
      </div>
    </SectionWrapper>
  );
}
