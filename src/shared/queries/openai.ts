import { useMutation, useQueryClient } from '@tanstack/react-query';

import { openAIService } from '@shared/services/openai';

export const useOpenAI = () => {
  const queryClient = useQueryClient();

  return useMutation({
      mutationFn: openAIService.generateAnswer,
      onSuccess: () => {
        queryClient.invalidateQueries('openai');
      }
    });
};