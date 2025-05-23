import { User } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";

import SectionWrapper from "@resume/components/form/section-wrapper";
import OpenAIPrompt from "@shared/components/extends/openai-prompt";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@shared/components/ui/form";
import { Input } from "@shared/components/ui/input";
import { Textarea } from "@shared/components/ui/textarea";
import { ResumeFormValues } from "@resume/schemas/resume.schema";

export default function SectionProfile() {
  const form = useFormContext<ResumeFormValues>();
  const t = useTranslations("resume");

  return (
    <SectionWrapper header={t("profile.title")} icon={<User />}>
      <div className="flex flex-col justify-start items-stretch gap-4">
        <FormField
          control={form.control}
          name="profile.fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("profile.full-name")} *</FormLabel>
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
            name="profile.email"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>{t("profile.email")} *</FormLabel>
                <FormControl>
                  <Input {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="profile.phone"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>{t("profile.phone")} *</FormLabel>
                <FormControl>
                  <Input {...field} type="tel" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="profile.location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("profile.location")} *</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="profile.website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("profile.website")}</FormLabel>
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
            name="profile.objective"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("profile.objective")} *</FormLabel>
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
