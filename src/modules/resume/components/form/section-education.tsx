import { useFormContext } from "react-hook-form";
import { ResumeFormValues } from "@resume/schemas/resume.schema";
import { Button } from "@shared/components/ui/button";
import { Input } from "@shared/components/ui/input";
import { Calendar } from "@shared/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@shared/components/ui/popover";
import { Calendar as CalendarIcon, GraduationCap } from "lucide-react";
import OpenAIPrompt from "@shared/components/extends/openai-prompt";
import { format } from "date-fns";
import { cn } from "@shared/lib/utils";
import { Textarea } from "@shared/components/ui/textarea";
import SectionWrapper from "@resume/components/form/section-wrapper";

export default function SectionEducation() {
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
    <SectionWrapper header="Education" icon={<GraduationCap />}>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">School</label>
            <Input
              {...form.register("education.school")}
              placeholder="Enter school name"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Degree</label>
            <Input
              {...form.register("education.degree")}
              placeholder="Enter degree"
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
                    !form.watch("education.startDate") && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {form.watch("education.startDate") ? (
                    formatDate(form.watch("education.startDate"))
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={form.watch("education.startDate") ? new Date(form.watch("education.startDate") || "") : undefined}
                  onSelect={(date) => form.setValue("education.startDate", date?.toISOString() || "")}
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
                    !form.watch("education.endDate") && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {form.watch("education.endDate") ? (
                    formatDate(form.watch("education.endDate"))
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={form.watch("education.endDate") ? new Date(form.watch("education.endDate") || "") : undefined}
                  onSelect={(date) => form.setValue("education.endDate", date?.toISOString() || "")}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <OpenAIPrompt>
            <Textarea
              {...form.register("education.description")}
              placeholder="Describe your education and achievements"
            />
          </OpenAIPrompt>
        </div>
      </div>
    </SectionWrapper>
  );
}
