import { Image } from "lucide-react";

import SectionEducation from "@resume-builder/components/section-education";
import SectionExperience from "@resume-builder/components/section-experience";
import SectionProfile from "@resume-builder/components/section-profile";
import SectionProject from "@resume-builder/components/section-project";

export default function ResumeBuilderCard() {
  return (
    <div className="h-full grid grid-cols-12 gap-8">
      <div className="h-full order-2 lg:order-1 col-span-12 lg:col-span-6 flex flex-col justify-start items-stretch gap-4 overflow-y-scroll pr-4 -mr-4 rounded-md">
        <SectionProfile open={true} />
        <SectionExperience />
        <SectionEducation />
        <SectionProject />
      </div>
      <div className="h-full order-1 lg:order-2 col-span-12 lg:col-span-6 border border-primary-foreground rounded-md p-4 bg-white flex justify-center items-center">
        <Image size="64" className="text-secondary" />
      </div>
    </div>
  );
}
