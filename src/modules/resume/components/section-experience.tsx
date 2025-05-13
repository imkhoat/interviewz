import { TowerControl } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { z } from "zod";

import SectionWrapper from "@resume/components/section-wrapper";
import OpenAIPrompt from "@shared/components/extends/openai-prompt";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@shared/components/ui/form";
import { Input } from "@shared/components/ui/input";
import { Textarea } from "@shared/components/ui/textarea";

export const experienceFormSchema = z.object({
  company: z.string().min(1, "Company name is required"),
  jobTitle: z.string().min(1, "Job title is required"),
  date: z.string().min(1, "Date is required"),
  description: z.string().min(1, "Description is required"),
});

export type ExperienceFormValues = z.infer<typeof experienceFormSchema>;

export default function SectionExperience() {
  const form = useFormContext<ExperienceFormValues>();

  return (
    <SectionWrapper header="Work experience" icon={<TowerControl />}>
      <div className="flex flex-col justify-start items-stretch gap-4">
        <FormField
          control={form.control}
          name="company"
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

        <div className="flex flex-row justify-between items-start gap-4">
          <FormField
            control={form.control}
            name="jobTitle"
            render={({ field }) => (
              <FormItem className="w-1/2">
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
            name="date"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input {...field} type="date" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <OpenAIPrompt>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="absolute -top-5">Description</FormLabel>
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
