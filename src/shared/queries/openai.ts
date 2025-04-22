import { openAIService } from '@shared/services/openai';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useOpenAI = () => {
  const queryClient = useQueryClient();

  return useMutation({
      mutationFn: openAIService.generateAnswer,
      onSuccess: () => {
        queryClient.invalidateQueries('openai');
      }
    });
};