import { useFormContext } from "react-hook-form";
import { ResumeFormValues } from "@resume/schemas/resume.schema";
import { Button } from "@shared/components/ui/button";
import { Input } from "@shared/components/ui/input";
import { Calendar } from "@shared/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@shared/components/ui/popover";
import { Calendar as CalendarIcon, Code2, ChevronDown, Plus, Trash2 } from "lucide-react";
import OpenAIPrompt from "@shared/components/extends/openai-prompt";
import { format } from "date-fns";
import { cn } from "@shared/lib/utils";
import { Textarea } from "@shared/components/ui/textarea";
import SectionWrapper from "@resume/components/form/section-wrapper";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@shared/components/ui/collapsible";
import { useState } from "react";

export default function SectionProject() {
  const form = useFormContext<ResumeFormValues>();
  const [openStates, setOpenStates] = useState<boolean[]>([]);

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "";
    try {
      return format(new Date(dateString), "MMM yyyy");
    } catch {
      return "";
    }
  };

  const getProjectPeriod = (startDate: string | undefined, endDate: string | undefined) => {
    if (!startDate) return "";
    const start = formatDate(startDate);
    const end = endDate ? formatDate(endDate) : "Present";
    return `${start} - ${end}`;
  };

  const addProject = () => {
    const currentProjects = form.getValues("projects") || [];
    form.setValue("projects", [
      ...currentProjects,
      {
        name: "",
        role: "",
        startDate: "",
        endDate: "",
        description: "",
        technologies: "",
        url: "",
      },
    ]);
    setOpenStates([...openStates, true]);
  };

  const removeProject = (index: number) => {
    const currentProjects = form.getValues("projects");
    form.setValue(
      "projects",
      currentProjects.filter((_, i) => i !== index)
    );
    const newOpenStates = [...openStates];
    newOpenStates.splice(index, 1);
    setOpenStates(newOpenStates);
  };

  const toggleProject = (index: number) => {
    const newOpenStates = [...openStates];
    newOpenStates[index] = !newOpenStates[index];
    setOpenStates(newOpenStates);
  };

  return (
    <SectionWrapper header="Projects" icon={<Code2 />}>
      <div className="space-y-4">
        <div className="flex justify-end">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addProject}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Project
          </Button>
        </div>

        {form.watch("projects")?.map((project, index) => (
          <Collapsible
            key={index}
            open={openStates[index]}
            onOpenChange={() => toggleProject(index)}
            className="border rounded-lg"
          >
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-2">
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <ChevronDown className={cn(
                      "h-4 w-4 transition-transform",
                      openStates[index] ? "transform rotate-180" : ""
                    )} />
                  </Button>
                </CollapsibleTrigger>
                <div>
                  <h4 className="text-sm font-medium">
                    {project.name || `Project ${index + 1}`}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {getProjectPeriod(project.startDate, project.endDate)}
                  </p>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeProject(index)}
                className="h-8 w-8 p-0"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <CollapsibleContent className="px-4 pb-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Project Name</label>
                    <Input
                      {...form.register(`projects.${index}.name`)}
                      placeholder="Enter project name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Role</label>
                    <Input
                      {...form.register(`projects.${index}.role`)}
                      placeholder="Enter your role"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Start Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !form.watch(`projects.${index}.startDate`) && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {form.watch(`projects.${index}.startDate`) ? (
                            formatDate(form.watch(`projects.${index}.startDate`))
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={form.watch(`projects.${index}.startDate`) ? new Date(form.watch(`projects.${index}.startDate`) || "") : undefined}
                          onSelect={(date) => form.setValue(`projects.${index}.startDate`, date?.toISOString() || "")}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">End Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !form.watch(`projects.${index}.endDate`) && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {form.watch(`projects.${index}.endDate`) ? (
                            formatDate(form.watch(`projects.${index}.endDate`))
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={form.watch(`projects.${index}.endDate`) ? new Date(form.watch(`projects.${index}.endDate`) || "") : undefined}
                          onSelect={(date) => form.setValue(`projects.${index}.endDate`, date?.toISOString() || "")}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Technologies</label>
                    <Input
                      {...form.register(`projects.${index}.technologies`)}
                      placeholder="e.g. React, Node.js, MongoDB"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Project URL</label>
                    <Input
                      {...form.register(`projects.${index}.url`)}
                      type="url"
                      placeholder="https://"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <OpenAIPrompt>
                    <Textarea
                      {...form.register(`projects.${index}.description`)}
                      placeholder="Describe your project and achievements"
                    />
                  </OpenAIPrompt>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </SectionWrapper>
  );
} 