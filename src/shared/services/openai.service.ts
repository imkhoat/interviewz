import { openaiRepository, OpenAIPromptResponse } from "@shared/repositories/openai.repository";

export const openaiService = {
  generatePrompt: async (keywords: string): Promise<OpenAIPromptResponse> => {
    try {
      return await openaiRepository.generatePrompt(keywords);
    } catch (error) {
      console.error("Error generating prompt:", error);
      throw error;
    }
  },

  async chatCompletion(messages: any[]) {
    try {
      return await openaiRepository.chatCompletion(messages);
    } catch (error) {
      console.error("Error in OpenAI chat completion:", error);
      throw error;
    }
  },

  async generateResumeFeedback(resume: string) {
    try {
      return await openaiRepository.generateResumeFeedback(resume);
    } catch (error) {
      console.error("Error generating resume feedback:", error);
      throw error;
    }
  },

  async generateInterviewQuestions(jobDescription: string, candidateProfile: string) {
    try {
      return await openaiRepository.generateInterviewQuestions(jobDescription, candidateProfile);
    } catch (error) {
      console.error("Error generating interview questions:", error);
      throw error;
    }
  },

  async evaluateInterviewAnswer(question: string, answer: string) {
    try {
      return await openaiRepository.evaluateInterviewAnswer(question, answer);
    } catch (error) {
      console.error("Error evaluating interview answer:", error);
      throw error;
    }
  },
}; 