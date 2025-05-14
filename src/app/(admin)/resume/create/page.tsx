"use client";

import AsyncWrapper from "@shared/components/extends/async-wrapper";
import ResumeBuilderCard from "@resume/components/resume-builder";

export default function CreateResumePage() {
  return (
    <AsyncWrapper>
      <div className="container mx-auto">
        <div className="max-w-7xl mx-auto">
          <div>
            <ResumeBuilderCard />
          </div>
        </div>
      </div>
    </AsyncWrapper>
  )
} 