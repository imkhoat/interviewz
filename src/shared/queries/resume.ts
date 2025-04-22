import { resumeService } from '@shared/services/resume';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const useResumes = () => {
  return useQuery(
    {
      queryKey: ['resumes'],
      queryFn: resumeService.fetchResumes,
      staleTime: 1000 * 60 * 5, // 5 minutes cache
    }
  );
};

export const useResumeDetail = (id: string) => {
  return useQuery(
    {
      queryKey: ['resume', id],
      queryFn: () => resumeService.fetchResumeDetail(id),
      staleTime: 1000 * 60 * 5, // 5 minutes cache
    }
  );
};

export const useCreateResume = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: resumeService.createResume,
    onSuccess: () => {
      queryClient.invalidateQueries('resumes');
    }
  });
}