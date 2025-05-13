import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useResumeStore, Resume } from "@resume/stores/resume.store";
import { useCreateResume, useUpdateResume, useDeleteResume } from "@resume/queries/resume.queries";

export const useResume = () => {
  const router = useRouter();
  const { selectedResume, setSelectedResume } = useResumeStore();
  const createResume = useCreateResume();
  const updateResume = useUpdateResume();
  const deleteResume = useDeleteResume();

  const handleCreateResume = useCallback(
    async (data: Omit<Resume, "id" | "updatedAt">) => {
      try {
        const result = await createResume.mutateAsync(data);
        router.push(`/resume/${result.id}/edit`);
        return result;
      } catch (error) {
        console.error("Failed to create resume:", error);
        throw error;
      }
    },
    [createResume, router]
  );

  const handleUpdateResume = useCallback(
    async (id: string, data: Partial<Resume>) => {
      try {
        const result = await updateResume.mutateAsync({ id, data });
        return result;
      } catch (error) {
        console.error("Failed to update resume:", error);
        throw error;
      }
    },
    [updateResume]
  );

  const handleDeleteResume = useCallback(
    async (id: string) => {
      try {
        await deleteResume.mutateAsync(id);
        if (selectedResume?.id === id) {
          setSelectedResume(null);
        }
      } catch (error) {
        console.error("Failed to delete resume:", error);
        throw error;
      }
    },
    [deleteResume, selectedResume, setSelectedResume]
  );

  const handleSelectResume = useCallback(
    (resume: Resume | null) => {
      setSelectedResume(resume);
    },
    [setSelectedResume]
  );

  return {
    selectedResume,
    handleCreateResume,
    handleUpdateResume,
    handleDeleteResume,
    handleSelectResume,
    isCreating: createResume.isPending,
    isUpdating: updateResume.isPending,
    isDeleting: deleteResume.isPending,
  };
}; 