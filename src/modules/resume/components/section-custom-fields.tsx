import { Plus } from "lucide-react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { z } from "zod";

import SectionWrapper from "@resume/components/section-wrapper";
import { Button } from "@shared/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@shared/components/ui/form";
import { Input } from "@shared/components/ui/input";
import { Textarea } from "@shared/components/ui/textarea";

export const customFieldsFormSchema = z.object({
  fields: z.array(
    z.object({
      title: z.string().min(1, "Title is required"),
      content: z.string().min(1, "Content is required"),
    })
  ),
});

export type CustomFieldsFormValues = z.infer<typeof customFieldsFormSchema>;

export default function SectionCustomFields() {
  const form = useFormContext<CustomFieldsFormValues>();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "fields",
  });

  return (
    <SectionWrapper header="Additional Information" icon={<Plus />}>
      <div className="flex flex-col justify-start items-stretch gap-4">
        {fields.map((field, index) => (
          <div key={field.id} className="flex flex-col gap-4 p-4 border rounded-lg">
            <FormField
              control={form.control}
              name={`fields.${index}.title`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g. Awards, Publications, Volunteer Work" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`fields.${index}.content`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="button"
              variant="destructive"
              onClick={() => remove(index)}
              className="self-end"
            >
              Remove
            </Button>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={() => append({ title: "", content: "" })}
          className="self-start"
        >
          Add Field
        </Button>
      </div>
    </SectionWrapper>
  );
}
