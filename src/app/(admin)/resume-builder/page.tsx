
'use strict';

import { Image } from 'lucide-react'
import SectionProfile from '@/app/(admin)/resume-builder/_components/section-profile'

export default function ResumeBuilderPage() {
  return (
    <div className="py-8 flex flex-row justify-start items-start gap-8">
      <div className="min-h-screen w-1/2 border border-primary-foreground rounded-md p-4 bg-white">
        <SectionProfile />
      </div>
      <div className="min-h-screen w-1/2 border border-primary-foreground rounded-md p-4 bg-white flex justify-center items-center">
        <Image size="64" className="text-secondary"/>
      </div>
    </div>
  );
}
