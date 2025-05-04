"use client";

import ResumeBuilderCard from "@resume/components/resume-builder";
import AsyncWrapper from "@shared/components/extends/async-wrapper";
import { useResumes } from "@resume/queries/resume.queries";

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
