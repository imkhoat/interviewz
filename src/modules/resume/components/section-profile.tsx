import { User } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { z } from "zod";

import SectionWrapper from "@resume/components/section-wrapper";
import OpenAIPrompt from "@shared/components/extends/openai-prompt";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@shared/components/ui/form";
import { Input } from "@shared/components/ui/input";
import { Textarea } from "@shared/components/ui/textarea";

export const profileFormSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  location: z.string().min(1, "Location is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  website: z.string().url("Invalid website URL").optional().or(z.literal("")),
  objective: z.string().min(1, "Objective is required"),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function SectionProfile({ open }: { open?: boolean }) {
  const form = useFormContext<ProfileFormValues>();

  return (
    <SectionWrapper open={open} header="Profiles" icon={<User />}>
      <div className="flex flex-col justify-start items-stretch gap-4">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fullname</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
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
            name="phone"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website</FormLabel>
              <FormControl>
                <Input {...field} type="url" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <OpenAIPrompt>
          <FormField
            control={form.control}
            name="objective"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="absolute -top-5">Objective</FormLabel>
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
