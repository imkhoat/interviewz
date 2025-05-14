import { Code2 } from "lucide-react";
import { useFormContext } from "react-hook-form";

import SectionWrapper from "@resume/components/form/section-wrapper";
import OpenAIPrompt from "@shared/components/extends/openai-prompt";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@shared/components/ui/form";
import { Input } from "@shared/components/ui/input";
import { Textarea } from "@shared/components/ui/textarea";
import { ResumeFormValues } from "@resume/schemas/resume.schema";

export default function SectionProject() {
  const form = useFormContext<ResumeFormValues>();

  return (
    <SectionWrapper header="Projects" icon={<Code2 />}>
      <div className="flex flex-col justify-start items-stretch gap-4">
        <FormField
          control={form.control}
          name="project.name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="project.role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="project.date"
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

        <FormField
          control={form.control}
          name="project.technologies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Technologies</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g. React, Node.js, MongoDB" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="project.url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project URL</FormLabel>
              <FormControl>
                <Input {...field} type="url" placeholder="https://" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <OpenAIPrompt>
          <FormField
            control={form.control}
            name="project.description"
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
