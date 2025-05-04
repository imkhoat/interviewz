import { User } from "lucide-react";

import SectionWrapper from "@resume/components/section-wrapper";
import OpenAIPrompt from "@shared/components/extends/openai-prompt";
import { Input } from "@shared/components/ui/input";
import { Label } from "@shared/components/ui/label";
import { Textarea } from "@shared/components/ui/textarea";

export default function ProfilesSection({ open }: { open?: boolean }) {
  return (
    <SectionWrapper open={open} header="Profiles" icon={<User />}>
      <div className="flex flex-col justify-start items-stretch gap-4">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="fullName">Fullname</Label>
          <Input></Input>
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="fullName">Location</Label>
          <Input></Input>
        </div>

        <div className="flex flex-row justify-between items-start gap-4">
          <div className="grid w-1/2 items-center gap-1.5">
            <Label htmlFor="fullName">Phone</Label>
            <Input></Input>
          </div>
          <div className="grid w-1/2 items-center gap-1.5">
            <Label htmlFor="fullName">Email</Label>
            <Input></Input>
          </div>
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="fullName">Website</Label>
          <Input></Input>
        </div>

        <OpenAIPrompt>
          <div className="relative grid w-full items-center gap-1.5">
            <Label htmlFor="fullName" className="absolute -top-5">
              Objective
            </Label>
            <Textarea />
          </div>
        </OpenAIPrompt>
      </div>
    </SectionWrapper>
  );
}
