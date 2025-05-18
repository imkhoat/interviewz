import { Plus, Trash2, ChevronDown } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";
import { useState } from "react";

import SectionWrapper from "@resume/components/form/section-wrapper";
import { Button } from "@shared/components/ui/button";
import { FormControl, FormField, FormItem, FormMessage } from "@shared/components/ui/form";
import { Input } from "@shared/components/ui/input";
import { ResumeFormValues } from "@resume/schemas/resume.schema";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@shared/components/ui/collapsible";
import { cn } from "@shared/lib/utils";

export default function SectionCustomFields() {
  const form = useFormContext<ResumeFormValues>();
  const t = useTranslations("resume");
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const sections = form.watch("customFields.sections") || [];
  const [openStates, setOpenStates] = useState<boolean[]>(() => sections.map(() => true));

  const addSection = () => {
    const currentSections = form.getValues("customFields.sections") || [];
    form.setValue("customFields.sections", [
      ...currentSections,
      {
        id: crypto.randomUUID(),
        title: "",
        categories: [],
      },
    ]);
    setOpenStates([...openStates, true]);
  };

  const removeSection = (index: number) => {
    const currentSections = form.getValues("customFields.sections") || [];
    form.setValue(
      "customFields.sections",
      currentSections.filter((_, i) => i !== index)
    );
    const newOpenStates = [...openStates];
    newOpenStates.splice(index, 1);
    setOpenStates(newOpenStates);
  };

  const addCategory = (sectionIndex: number) => {
    const currentCategories = form.getValues(`customFields.sections.${sectionIndex}.categories`) || [];
    form.setValue(`customFields.sections.${sectionIndex}.categories`, [
      ...currentCategories,
      {
        id: crypto.randomUUID(),
        title: "",
        items: [],
      },
    ]);
  };

  const removeCategory = (sectionIndex: number, categoryIndex: number) => {
    const currentCategories = form.getValues(`customFields.sections.${sectionIndex}.categories`) || [];
    form.setValue(
      `customFields.sections.${sectionIndex}.categories`,
      currentCategories.filter((_, i) => i !== categoryIndex)
    );
  };

  const addItem = (sectionIndex: number, categoryIndex: number) => {
    const currentItems = form.getValues(`customFields.sections.${sectionIndex}.categories.${categoryIndex}.items`) || [];
    form.setValue(`customFields.sections.${sectionIndex}.categories.${categoryIndex}.items`, [
      ...currentItems,
      {
        id: crypto.randomUUID(),
        name: "",
        value: "",
      },
    ]);
  };

  const removeItem = (sectionIndex: number, categoryIndex: number, itemIndex: number) => {
    const currentItems = form.getValues(`customFields.sections.${sectionIndex}.categories.${categoryIndex}.items`) || [];
    form.setValue(
      `customFields.sections.${sectionIndex}.categories.${categoryIndex}.items`,
      currentItems.filter((_, i) => i !== itemIndex)
    );
  };

  const toggleSection = (index: number) => {
    const newOpenStates = [...openStates];
    newOpenStates[index] = !newOpenStates[index];
    setOpenStates(newOpenStates);
  };

  return (
    <div className="space-y-4">
      {sections.map((section, sectionIndex) => (
        <SectionWrapper
          key={section.id}
          header={
            <div className="flex items-center justify-between w-full">
              {editingSection === section.id ? (
                <FormField
                  control={form.control}
                  name={`customFields.sections.${sectionIndex}.title`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder={t("custom-fields.title")}
                          onBlur={() => setEditingSection(null)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              setEditingSection(null);
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
                  onClick={() => setEditingSection(section.id)}
                >
                  <h3 className="text-lg font-semibold">
                    {form.watch(`customFields.sections.${sectionIndex}.title`) || t("custom-fields.title")}
                  </h3>
                </div>
              )}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeSection(sectionIndex)}
                className="h-8 w-8 p-0"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          }
          icon={<Plus />}
        >
          <div className="space-y-4">
            {(form.watch(`customFields.sections.${sectionIndex}.categories`) || []).map((category, categoryIndex) => (
              <Collapsible
                key={category.id}
                open={openStates[categoryIndex]}
                onOpenChange={() => toggleSection(categoryIndex)}
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
                          name={`customFields.sections.${sectionIndex}.categories.${categoryIndex}.title`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input 
                                  {...field} 
                                  placeholder={t("custom-fields.category-title")}
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
                            {form.watch(`customFields.sections.${sectionIndex}.categories.${categoryIndex}.title`) || t("custom-fields.category-title")}
                          </h4>
                        </div>
                      )}
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeCategory(sectionIndex, categoryIndex)}
                    className="h-8 w-8 p-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <CollapsibleContent className="px-4 pb-4">
                  <div className="space-y-1">
                    {(form.watch(`customFields.sections.${sectionIndex}.categories.${categoryIndex}.items`) || []).map((item, itemIndex) => (
                      <div key={item.id} className="pl-4">
                        <div className="flex items-center gap-4 p-2 rounded-md bg-muted/50 font-normal">
                          <div className="w-3 h-3 rounded-full border border-primary" />
                          {editingItem === item.id ? (
                            <FormField
                              control={form.control}
                              name={`customFields.sections.${sectionIndex}.categories.${categoryIndex}.items.${itemIndex}.name`}
                              render={({ field }) => (
                                <FormItem className="flex-1">
                                  <FormControl>
                                    <Input 
                                      {...field} 
                                      placeholder={t("custom-fields.name")}
                                      onBlur={() => setEditingItem(null)}
                                      onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                          setEditingItem(null);
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
                              onClick={() => setEditingItem(item.id)}
                            >
                              <h4 className="text-sm font-normal">
                                {form.watch(`customFields.sections.${sectionIndex}.categories.${categoryIndex}.items.${itemIndex}.name`) || t("custom-fields.name")}
                              </h4>
                            </div>
                          )}

                          {editingItem === `${item.id}-value` ? (
                            <FormField
                              control={form.control}
                              name={`customFields.sections.${sectionIndex}.categories.${categoryIndex}.items.${itemIndex}.value`}
                              render={({ field }) => (
                                <FormItem className="w-1/3">
                                  <FormControl>
                                    <Input 
                                      {...field} 
                                      placeholder={t("custom-fields.value")}
                                      onBlur={() => setEditingItem(null)}
                                      onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                          setEditingItem(null);
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
                              onClick={() => setEditingItem(`${item.id}-value`)}
                            >
                              <h4 className="text-sm font-normal">
                                {form.watch(`customFields.sections.${sectionIndex}.categories.${categoryIndex}.items.${itemIndex}.value`) || t("custom-fields.value")}
                              </h4>
                            </div>
                          )}

                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(sectionIndex, categoryIndex, itemIndex)}
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
                        onClick={() => addItem(sectionIndex, categoryIndex)}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        {t("custom-fields.add-item")}
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
                onClick={() => addCategory(sectionIndex)}
              >
                <Plus className="w-4 h-4 mr-2" />
                {t("custom-fields.add-category")}
              </Button>
            </div>
          </div>
        </SectionWrapper>
      ))}

      <div className="flex justify-end">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="h-7"
          onClick={addSection}
        >
          <Plus className="w-4 h-4 mr-2" />
          {t("custom-fields.add")}
        </Button>
      </div>
    </div>
  );
}
