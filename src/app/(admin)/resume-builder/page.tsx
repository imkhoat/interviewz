"use client";

import { useResumes } from "@shared/queries/resume";
import AsyncWrapper from "@shared/components/extends/async-wrapper";
import ResumeBuilderCard from "@resume-builder/components/resume-builder";

export default function ResumeBuilderPage() {
  const { isLoading, error } = useResumes();

  return (
    <div>
      <AsyncWrapper loading={isLoading} error={error}>
        <ResumeBuilderCard />
      </AsyncWrapper>
    </div>
  );
}
