import { useFormContext } from "react-hook-form";
import { ResumeFormValues } from "@resume/schemas/resume.schema";
import { Input } from "@shared/components/ui/input";
import { Textarea } from "@shared/components/ui/textarea";
import { User } from "lucide-react";
import OpenAIPrompt from "@shared/components/extends/openai-prompt";
import SectionWrapper from "@resume/components/form/section-wrapper";
import { useTranslations } from "next-intl";

export default function SectionProfile() {
  const t = useTranslations("resume");
  const form = useFormContext<ResumeFormValues>();

  return (
    <SectionWrapper header={t("profile.title")} icon={<User />}>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">{t("profile.full-name.label")}</label>
            <Input
              {...form.register("profile.fullName")}
              placeholder={t("profile.full-name.placeholder")}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">{t("profile.email.label")}</label>
            <Input
              {...form.register("profile.email")}
              placeholder={t("profile.email.placeholder")}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">{t("profile.phone.label")}</label>
            <Input
              {...form.register("profile.phone")}
              placeholder={t("profile.phone.placeholder")}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">{t("profile.location.label")}</label>
            <Input
              {...form.register("profile.location")}
              placeholder={t("profile.location.placeholder")}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">{t("profile.website.label")}</label>
          <Input
            {...form.register("profile.website")}
            placeholder={t("profile.website.placeholder")}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">{t("profile.objective.label")}</label>
          <OpenAIPrompt>
            <Textarea
              {...form.register("profile.objective")}
              placeholder={t("profile.objective.placeholder")}
            />
          </OpenAIPrompt>
        </div>
      </div>
    </SectionWrapper>
  );
}
