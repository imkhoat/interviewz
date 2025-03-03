"use strict";

import { Image } from "lucide-react";
import SectionProfile from "@/app/(admin)/resume-builder/_components/section-profile";
import SectionExperience from "@/app/(admin)/resume-builder/_components/section-experience";
import SectionEducation from "@/app/(admin)/resume-builder/_components/section-education";
import SectionProject from "@/app/(admin)/resume-builder/_components/section-project";

export default function ResumeBuilderPage() {
  return (
    <div className="h-full grid grid-cols-12 gap-8">
      <div className="h-full col-span-6 flex flex-col justify-start items-stretch gap-4 overflow-y-scroll pr-4 -mr-4 rounded-md">
        <SectionProfile open={true} />
        <SectionExperience />
        <SectionEducation />
        <SectionProject />
      </div>
      <div className="h-full col-span-6 border border-primary-foreground rounded-md p-4 bg-white flex justify-center items-center">
        <Image size="64" className="text-secondary" />
      </div>
    </div>
  );
}
