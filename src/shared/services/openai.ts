import { Prompt } from "@shared/types/prompt";
import { openAIRepository } from "@shared/repositories/openai";

export const openAIService = {
  generateAnswer: async (prompt: Prompt[]) => {
    if (!prompt) throw new Error("Prompt is required");
    return await openAIRepository.generateAnswer(prompt);
  }
}
