import { Brain } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { z } from "zod";

import SectionWrapper from "@resume/components/section-wrapper";
import OpenAIPrompt from "@shared/components/extends/openai-prompt";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@shared/components/ui/form";
import { Input } from "@shared/components/ui/input";
import { Textarea } from "@shared/components/ui/textarea";

export const skillsFormSchema = z.object({
  technical: z.string().min(1, "Technical skills are required"),
  soft: z.string().min(1, "Soft skills are required"),
  languages: z.string().min(1, "Languages are required"),
  certifications: z.string().optional(),
});

export type SkillsFormValues = z.infer<typeof skillsFormSchema>;

export default function SectionSkills() {
  const form = useFormContext<SkillsFormValues>();

  return (
    <SectionWrapper header="Skills" icon={<Brain />}>
      <div className="flex flex-col justify-start items-stretch gap-4">
        <OpenAIPrompt>
          <FormField
            control={form.control}
            name="technical"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Technical Skills</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="e.g. JavaScript, React, Node.js, TypeScript" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </OpenAIPrompt>

        <OpenAIPrompt>
          <FormField
            control={form.control}
            name="soft"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Soft Skills</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="e.g. Communication, Leadership, Problem Solving" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </OpenAIPrompt>

        <FormField
          control={form.control}
          name="languages"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Languages</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g. English (Fluent), Spanish (Intermediate)" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="certifications"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Certifications</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="e.g. AWS Certified Developer, Google Cloud Professional" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </SectionWrapper>
  );
}
