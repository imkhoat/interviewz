import { Plus, Trash2 } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";

import SectionWrapper from "@resume/components/form/section-wrapper";
import { Button } from "@shared/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@shared/components/ui/form";
import { Input } from "@shared/components/ui/input";
import { ResumeFormValues } from "@resume/schemas/resume.schema";

export default function SectionCustomFields() {
  const form = useFormContext<ResumeFormValues>();
  const t = useTranslations("resume");

  const addField = () => {
    const currentFields = form.getValues("customFields.fields");
    form.setValue("customFields.fields", [
      ...currentFields,
      { id: crypto.randomUUID(), label: "", value: "" }
    ]);
  };

  const removeField = (index: number) => {
    const currentFields = form.getValues("customFields.fields");
    form.setValue(
      "customFields.fields",
      currentFields.filter((_, i) => i !== index)
    );
  };

  const fields = form.watch("customFields.fields");

  return (
    <SectionWrapper header={t("custom-fields.title")} icon={<Plus />}>
      <div className="space-y-4">
        <div className="flex justify-end">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addField}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            {t("custom-fields.add")}
          </Button>
        </div>

        {fields.map((field, index) => (
          <div key={field.id} className="flex flex-row justify-between items-start gap-4">
            <FormField
              control={form.control}
              name={`customFields.fields.${index}.label`}
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel>{t("custom-fields.label")}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder={t("custom-fields.label-placeholder")} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`customFields.fields.${index}.value`}
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel>{t("custom-fields.value")}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder={t("custom-fields.value-placeholder")} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => removeField(index)}
              className="h-8 w-8 mt-9"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
