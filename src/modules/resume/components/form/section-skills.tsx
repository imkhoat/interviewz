import { useFieldArray, useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Plus, Trash2, Wrench, ChevronDown } from "lucide-react";
import { useState } from "react";

import { Button } from "@shared/components/ui/button";
import { Input } from "@shared/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@shared/components/ui/collapsible";
import { cn } from "@shared/lib/utils";
import { FormField, FormItem, FormControl, FormMessage } from "@shared/components/ui/form";

import { ResumeFormValues } from "@resume/schemas/resume.schema";
import SectionWrapper from "@resume/components/form/section-wrapper";

export default function SectionSkills() {
  const t = useTranslations("resume");
  const form = useFormContext<ResumeFormValues>();
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editingSkill, setEditingSkill] = useState<string | null>(null);
  const [openStates, setOpenStates] = useState<boolean[]>(form.watch("skills.categories").map(() => true));

  const { fields: categories, append: appendCategory, remove: removeCategory } = useFieldArray({
    control: form.control,
    name: "skills.categories",
  });

  const addCategory = () => {
    appendCategory({
      id: crypto.randomUUID(),
      title: "",
      items: [],
    });
    setOpenStates([...openStates, true]);
  };

  const addSkill = (categoryIndex: number) => {
    const currentItems = form.getValues(`skills.categories.${categoryIndex}.items`);
    form.setValue(`skills.categories.${categoryIndex}.items`, [
      ...currentItems,
      {
        id: crypto.randomUUID(),
        name: "",
        level: "",
      },
    ]);
  };

  const removeSkill = (categoryIndex: number, skillIndex: number) => {
    const currentItems = form.getValues(`skills.categories.${categoryIndex}.items`);
    form.setValue(
      `skills.categories.${categoryIndex}.items`,
      currentItems.filter((_, index) => index !== skillIndex)
    );
  };

  const toggleCategory = (index: number) => {
    const newOpenStates = [...openStates];
    newOpenStates[index] = !newOpenStates[index];
    setOpenStates(newOpenStates);
  };

  return (
    <SectionWrapper header={t("skills.title")} icon={<Wrench />}>
      <div className="space-y-4">
        {categories.map((category, categoryIndex) => (
          <Collapsible
            key={category.id}
            open={openStates[categoryIndex]}
            onOpenChange={() => toggleCategory(categoryIndex)}
            className="border rounded-lg"
          >
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-2">
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <ChevronDown className={cn(
                      "h-4 w-4 transition-transform",
                      openStates[categoryIndex] ? "transform rotate-180" : ""
                    )} />
                  </Button>
                </CollapsibleTrigger>
                <div>
                  {editingCategory === category.id ? (
                    <FormField
                      control={form.control}
                      name={`skills.categories.${categoryIndex}.title`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input 
                              {...field} 
                              placeholder={t("skills.categories.title")}
                              onBlur={() => setEditingCategory(null)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  setEditingCategory(null);
                                }
                              }}
                              autoFocus
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ) : (
                    <div 
                      className="cursor-pointer hover:text-primary"
                      onClick={() => setEditingCategory(category.id)}
                    >
                      <h4 className="text-sm font-medium">
                        {form.watch(`skills.categories.${categoryIndex}.title`) || t("skills.categories.title")}
                      </h4>
                    </div>
                  )}
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeCategory(categoryIndex)}
                className="h-8 w-8 p-0"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <CollapsibleContent className="px-4 pb-4">
              <div className="space-y-4">
                {form.watch(`skills.categories.${categoryIndex}.items`).map((skill, skillIndex) => (
                  <div key={skill.id} className="pl-4 border-l-2 border-muted">
                    <div className="flex items-center gap-4">
                      {editingSkill === skill.id ? (
                        <FormField
                          control={form.control}
                          name={`skills.categories.${categoryIndex}.items.${skillIndex}.name`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input 
                                  {...field} 
                                  placeholder={t("skills.name")}
                                  onBlur={() => setEditingSkill(null)}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      setEditingSkill(null);
                                    }
                                  }}
                                  autoFocus
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ) : (
                        <div 
                          className="flex-1 cursor-pointer hover:text-primary"
                          onClick={() => setEditingSkill(skill.id)}
                        >
                          <h4 className="text-sm font-medium">
                            {form.watch(`skills.categories.${categoryIndex}.items.${skillIndex}.name`) || t("skills.name")}
                          </h4>
                        </div>
                      )}

                      {editingSkill === `${skill.id}-level` ? (
                        <FormField
                          control={form.control}
                          name={`skills.categories.${categoryIndex}.items.${skillIndex}.level`}
                          render={({ field }) => (
                            <FormItem className="w-1/3">
                              <FormControl>
                                <Input 
                                  {...field} 
                                  placeholder={t("skills.level")}
                                  onBlur={() => setEditingSkill(null)}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      setEditingSkill(null);
                                    }
                                  }}
                                  autoFocus
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ) : (
                        <div 
                          className="w-1/3 cursor-pointer hover:text-primary"
                          onClick={() => setEditingSkill(`${skill.id}-level`)}
                        >
                          <h4 className="text-sm font-medium">
                            {form.watch(`skills.categories.${categoryIndex}.items.${skillIndex}.level`) || t("skills.level")}
                          </h4>
                        </div>
                      )}

                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSkill(categoryIndex, skillIndex)}
                        className="h-8 w-8 p-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="h-7"
                    onClick={() => addSkill(categoryIndex)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    {t("skills.categories.add-skill")}
                  </Button>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}

        <div className="flex justify-end">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="h-7"
            onClick={addCategory}
          >
            <Plus className="w-4 h-4 mr-2" />
            {t("skills.categories.add")}
          </Button>
        </div>
      </div>
    </SectionWrapper>
  );
}
