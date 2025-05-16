import { useMutation } from "@tanstack/react-query";
import { openaiService } from "@shared/services/openai.service";

export const useGeneratePrompt = () => {
  return useMutation({
    mutationFn: openaiService.generatePrompt,
  });
}; 