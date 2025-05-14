import { Plus } from "lucide-react";
import { useFormContext } from "react-hook-form";

import SectionWrapper from "@resume/components/form/section-wrapper";
import { Button } from "@shared/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@shared/components/ui/form";
import { Input } from "@shared/components/ui/input";
import { ResumeFormValues } from "@resume/schemas/resume.schema";

export default function SectionCustomFields() {
  const form = useFormContext<ResumeFormValues>();

  const addField = () => {
    const fields = form.getValues("customFields.fields") || [];
    form.setValue("customFields.fields", [...fields, { id: crypto.randomUUID(), name: "", value: "" }]);
  };

  const removeField = (index: number) => {
    const fields = form.getValues("customFields.fields") || [];
    form.setValue("customFields.fields", fields.filter((_, i) => i !== index));
  };

  const fields = form.watch("customFields.fields") || [];

  return (
    <SectionWrapper header="Custom Fields" icon={<Plus />}>
      <div className="flex flex-col justify-start items-stretch gap-4">
        {fields.map((field, index) => (
          <div key={field.id} className="flex flex-row justify-between items-start gap-4">
            <FormField
              control={form.control}
              name={`customFields.fields.${index}.name`}
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel>Field name</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                  <FormLabel>Field value</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="mt-8"
              onClick={() => removeField(index)}
            >
              <Plus className="h-4 w-4 rotate-45" />
            </Button>
          </div>
        ))}
        <Button type="button" variant="outline" onClick={addField}>
          Add custom field
        </Button>
      </div>
    </SectionWrapper>
  );
}
