import { useFormContext } from "react-hook-form";
import { ResumeFormValues } from "@resume/schemas/resume.schema";
import { Button } from "@shared/components/ui/button";
import { Input } from "@shared/components/ui/input";
import { Calendar } from "@shared/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@shared/components/ui/popover";
import { Calendar as CalendarIcon, Code2 } from "lucide-react";
import OpenAIPrompt from "@shared/components/extends/openai-prompt";
import { format } from "date-fns";
import { cn } from "@shared/lib/utils";
import { Textarea } from "@shared/components/ui/textarea";
import SectionWrapper from "@resume/components/form/section-wrapper";

export default function SectionProject() {
  const form = useFormContext<ResumeFormValues>();

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "";
    try {
      return format(new Date(dateString), "MMM yyyy");
    } catch {
      return "";
    }
  };

  return (
    <SectionWrapper header="Project" icon={<Code2 />}>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Project Name</label>
            <Input
              {...form.register("project.name")}
              placeholder="Enter project name"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Role</label>
            <Input
              {...form.register("project.role")}
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
                    !form.watch("project.startDate") && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {form.watch("project.startDate") ? (
                    formatDate(form.watch("project.startDate"))
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={form.watch("project.startDate") ? new Date(form.watch("project.startDate") || "") : undefined}
                  onSelect={(date) => form.setValue("project.startDate", date?.toISOString() || "")}
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
                    !form.watch("project.endDate") && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {form.watch("project.endDate") ? (
                    formatDate(form.watch("project.endDate"))
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={form.watch("project.endDate") ? new Date(form.watch("project.endDate") || "") : undefined}
                  onSelect={(date) => form.setValue("project.endDate", date?.toISOString() || "")}
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
              {...form.register("project.technologies")}
              placeholder="e.g. React, Node.js, MongoDB"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Project URL</label>
            <Input
              {...form.register("project.url")}
              type="url"
              placeholder="https://"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <OpenAIPrompt>
            <Textarea
              {...form.register("project.description")}
              placeholder="Describe your project and achievements"
            />
          </OpenAIPrompt>
        </div>
      </div>
    </SectionWrapper>
  );
}
