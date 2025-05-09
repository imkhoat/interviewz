import { openAIService } from "@shared/services/openai.service";

export const openAIRepository = {
  async chatCompletion(messages: any[]) {
    try {
      const response = await openAIService.chatCompletion(messages);
      return response;
    } catch (error) {
      console.error("Error in repository chat completion:", error);
      throw error;
    }
  },

  async generateResumeFeedback(resume: string) {
    try {
      const response = await openAIService.generateResumeFeedback(resume);
      return response;
    } catch (error) {
      console.error("Error in repository generate resume feedback:", error);
      throw error;
    }
  },

  async generateInterviewQuestions(jobDescription: string, candidateProfile: string) {
    try {
      const response = await openAIService.generateInterviewQuestions(jobDescription, candidateProfile);
      return response;
    } catch (error) {
      console.error("Error in repository generate interview questions:", error);
      throw error;
    }
  },

  async evaluateInterviewAnswer(question: string, answer: string) {
    try {
      const response = await openAIService.evaluateInterviewAnswer(question, answer);
      return response;
    } catch (error) {
      console.error("Error in repository evaluate interview answer:", error);
      throw error;
    }
  },
}; 