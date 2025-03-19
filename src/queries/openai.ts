import { openAIService } from '@/services/openai';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const useOpenAI = () => {
  const queryClient = useQueryClient();

  return useMutation({
      mutationFn: openAIService.generateAnswer,
      onSuccess: () => {
        queryClient.invalidateQueries('openai');
      }
    });
};