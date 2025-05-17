"use client";

import AsyncWrapper from "@shared/components/extends/async-wrapper";
import { useResumes } from "@resume/queries/resume.queries";
import ResumeActionBar, { ViewMode } from "@resume/components/resume-action-bar";
import ResumeTable from "@resume/components/resume-table";
import ResumeCardGrid from "@resume/components/resume-card-grid";
import { useResume } from "@resume/hooks/use-resume";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Mock data
const mockResumes = [
  {
    id: "1",
    title: "Software Engineer Resume",
    status: "published" as const,
    createdAt: "2024-03-20T10:00:00Z",
    updatedAt: "2024-03-20T10:00:00Z",
  },
  {
    id: "2",
    title: "Product Manager CV",
    status: "draft" as const,
    createdAt: "2024-03-19T15:30:00Z",
    updatedAt: "2024-03-19T15:30:00Z",
  },
  {
    id: "3",
    title: "UX Designer Portfolio",
    status: "archived" as const,
    createdAt: "2024-03-18T09:15:00Z",
    updatedAt: "2024-03-18T09:15:00Z",
  },
  {
    id: "4",
    title: "Full Stack Developer Resume",
    status: "published" as const,
    createdAt: "2024-03-17T14:45:00Z",
    updatedAt: "2024-03-17T14:45:00Z",
  },
  {
    id: "5",
    title: "Data Scientist CV",
    status: "draft" as const,
    createdAt: "2024-03-16T11:20:00Z",
    updatedAt: "2024-03-16T11:20:00Z",
  },
  {
    id: "6",
    title: "DevOps Engineer Resume",
    status: "published" as const,
    createdAt: "2024-03-15T16:00:00Z",
    updatedAt: "2024-03-15T16:00:00Z",
  },
];

export default function MyResumesPage() {
  const { isLoading, error } = useResumes();
  const [viewMode, setViewMode] = useState<ViewMode>("card");
  const { handleDeleteResume, isDeleting } = useResume();
  const router = useRouter();

  const handleView = (id: string) => {
    router.push(`/resume/${id}`);
  };

  const handleEdit = (id: string) => {
    router.push(`/resume/${id}/edit`);
  };

  const handleCreate = () => {
    router.push("/resume/create");
  };

  return (
    <AsyncWrapper loading={isLoading} error={error}>
      <div className="container mx-auto">
        <ResumeActionBar 
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onSearch={() => {}}
          onCreate={handleCreate}
        />
        {viewMode === "card" ? (
          <ResumeCardGrid 
            resumes={mockResumes}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDeleteResume}
          />
        ) : (
          <ResumeTable 
            resumes={mockResumes}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDeleteResume}
          />
        )}
      </div>
    </AsyncWrapper>
  )
} 