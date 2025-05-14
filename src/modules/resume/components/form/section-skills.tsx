import { Wrench } from "lucide-react";
import { useFormContext } from "react-hook-form";

import SectionWrapper from "@resume/components/form/section-wrapper";
import OpenAIPrompt from "@shared/components/extends/openai-prompt";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@shared/components/ui/form";
import { Textarea } from "@shared/components/ui/textarea";
import { ResumeFormValues } from "@resume/schemas/resume.schema";

export default function SectionSkills() {
  const form = useFormContext<ResumeFormValues>();

  return (
    <SectionWrapper header="Skills" icon={<Wrench />}>
      <div className="flex flex-col justify-start items-stretch gap-4">
        <OpenAIPrompt>
          <FormField
            control={form.control}
            name="skills.technical"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Technical Skills</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="e.g. JavaScript, React, Node.js, MongoDB" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </OpenAIPrompt>

        <OpenAIPrompt>
          <FormField
            control={form.control}
            name="skills.soft"
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
          name="skills.languages"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Languages</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="e.g. English (Native), Spanish (Fluent)" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="skills.certifications"
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
