"use client";

import AsyncWrapper from "@shared/components/extends/async-wrapper";
import { useResumes } from "@resume/queries/resume.queries";

export default function MyResumesPage() {
  const { isLoading, error } = useResumes();

  return (
    <AsyncWrapper loading={isLoading} error={error}>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Resume cards will be added here */}
        </div>
      </div>
    </AsyncWrapper>
  )
} 