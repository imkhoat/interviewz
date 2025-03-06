"use client";

import { useResumes } from "@/queries/resume";
import AsyncWrapper from "@/components/extends/async-wrapper";
import ResumeBuilderCard from "@/app/(admin)/resume-builder/_components/resume-builder";

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
