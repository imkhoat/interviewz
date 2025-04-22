import { Input } from "@shared/components/ui/input";
import { Textarea } from "@shared/components/ui/textarea";
import { Projector } from "lucide-react";
import OpenAIPrompt from "@shared/components/extends/openai-prompt";
import SectionWrapper from "@/app/(admin)/resume-builder/_components/section-wrapper";
import { Label } from "@shared/components/ui/label";

export default function SectionExperience() {
  return (
    <SectionWrapper header="Project" icon={<Projector />}>
      <div className="flex flex-col justify-start items-stretch gap-4">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="fullName">Company</Label>
          <Input></Input>
        </div>

        <div className="flex flex-row justify-between items-start gap-4">
          <div className="grid w-1/2 items-center gap-1.5">
            <Label htmlFor="fullName">Job title</Label>
            <Input></Input>
          </div>
          <div className="grid w-1/2 items-center gap-1.5">
            <Label htmlFor="fullName">Date</Label>
            <Input></Input>
          </div>
        </div>

        <OpenAIPrompt>
          <div className="relative grid w-full items-center gap-1.5">
            <Label htmlFor="fullName" className="absolute -top-5">
              Description
            </Label>
            <Textarea />
          </div>
        </OpenAIPrompt>
      </div>
    </SectionWrapper>
  );
}
