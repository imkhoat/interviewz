import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { resumeService } from '@resume/services/resume.service';

export const useResumes = () => {
  return useQuery({
    queryKey: ['resumes'],
    queryFn: resumeService.fetchResumes,
  });
};

export const useResumeDetail = (id: string) => {
  return useQuery({
    queryKey: ['resume', id],
    queryFn: () => resumeService.fetchResumeDetail(id),
  });
};

export const useCreateResume = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: resumeService.createResume,
    onSuccess: () => {
      queryClient.invalidateQueries('resumes');
    },
  });
};

export const useUpdateResume = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => resumeService.updateResume(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries(['resume', id]);
      queryClient.invalidateQueries('resumes');
    },
  });
};

export const useDeleteResume = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: resumeService.deleteResume,
    onSuccess: () => {
      queryClient.invalidateQueries('resumes');
    },
  });
}; 