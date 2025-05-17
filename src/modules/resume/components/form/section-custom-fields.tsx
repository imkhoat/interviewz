import { useFormContext } from "react-hook-form";
import { ResumeFormValues } from "@resume/schemas/resume.schema";
import { Button } from "@shared/components/ui/button";
import { Input } from "@shared/components/ui/input";
import { Plus, Trash2, ListPlus } from "lucide-react";
import SectionWrapper from "@resume/components/form/section-wrapper";
import { useTranslations } from "next-intl";

export default function SectionCustomFields() {
  const t = useTranslations("resume");
  const form = useFormContext<ResumeFormValues>();
  const fields = form.watch("customFields.fields");

  const addField = () => {
    const currentFields = form.getValues("customFields.fields");
    form.setValue("customFields.fields", [
      ...currentFields,
      {
        id: Math.random().toString(36).substr(2, 9),
        label: "",
        value: "",
      },
    ]);
  };

  const removeField = (index: number) => {
    const currentFields = form.getValues("customFields.fields");
    form.setValue(
      "customFields.fields",
      currentFields.filter((_, i) => i !== index)
    );
  };

  return (
    <SectionWrapper header={t("form.custom-fields")} icon={<ListPlus />}>
      <div className="space-y-4">
        <div className="flex items-center justify-end">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addField}
          >
            <Plus className="w-4 h-4 mr-2" />
            {t("form.add-field")}
          </Button>
        </div>

        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-4">
            <div className="flex-1 space-y-2">
              <Input
                {...form.register(`customFields.fields.${index}.label`)}
                placeholder={t("form.field-label")}
              />
            </div>
            <div className="flex-1 space-y-2">
              <Input
                {...form.register(`customFields.fields.${index}.value`)}
                placeholder={t("form.field-value")}
              />
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => removeField(index)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
