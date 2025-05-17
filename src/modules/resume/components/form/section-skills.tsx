import { useFormContext } from "react-hook-form";
import { ResumeFormValues } from "@resume/schemas/resume.schema";
import { Textarea } from "@shared/components/ui/textarea";
import { Wrench } from "lucide-react";
import OpenAIPrompt from "@shared/components/extends/openai-prompt";
import SectionWrapper from "@resume/components/form/section-wrapper";
import { useTranslations } from "next-intl";

export default function SectionSkills() {
  const t = useTranslations("resume");
  const form = useFormContext<ResumeFormValues>();

  return (
    <SectionWrapper header={t("skills.title")} icon={<Wrench />}>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">{t("skills.technical.label")}</label>
          <OpenAIPrompt>
            <Textarea
              {...form.register("skills.technical")}
              placeholder={t("skills.technical.placeholder")}
            />
          </OpenAIPrompt>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">{t("skills.soft.label")}</label>
          <OpenAIPrompt>
            <Textarea
              {...form.register("skills.soft")}
              placeholder={t("skills.soft.placeholder")}
            />
          </OpenAIPrompt>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">{t("skills.languages.label")}</label>
          <OpenAIPrompt>
            <Textarea
              {...form.register("skills.languages")}
              placeholder={t("skills.languages.placeholder")}
            />
          </OpenAIPrompt>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">{t("skills.certifications.label")}</label>
          <OpenAIPrompt>
            <Textarea
              {...form.register("skills.certifications")}
              placeholder={t("skills.certifications.placeholder")}
            />
          </OpenAIPrompt>
        </div>
      </div>
    </SectionWrapper>
  );
}
