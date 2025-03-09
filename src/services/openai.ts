import { openAIRepository } from "@/repositories/openai";

export const openAIService = {
  getGeneratedText: async (prompt: string) => {
    if (!prompt) throw new Error("Prompt is required");
    return await openAIRepository.generateResponse(prompt);
  }
}
