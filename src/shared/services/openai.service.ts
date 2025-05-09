import { httpClient } from "@shared/lib/http-client";

export const openAIService = {
  async chatCompletion(messages: any[]) {
    try {
      const response = await httpClient("/openai/chat", {
        method: "POST",
        body: JSON.stringify({ messages }),
      });
      return response;
    } catch (error) {
      console.error("Error in OpenAI chat completion:", error);
      throw error;
    }
  },

  async generateResumeFeedback(resume: string) {
    try {
      const messages = [
        {
          role: "system",
          content: "You are a professional resume reviewer. Analyze the resume and provide constructive feedback.",
        },
        {
          role: "user",
          content: resume,
        },
      ];

      return await this.chatCompletion(messages);
    } catch (error) {
      console.error("Error generating resume feedback:", error);
      throw error;
    }
  },

  async generateInterviewQuestions(jobDescription: string, candidateProfile: string) {
    try {
      const messages = [
        {
          role: "system",
          content: "You are an experienced interviewer. Generate relevant interview questions based on the job description and candidate profile.",
        },
        {
          role: "user",
          content: `Job Description: ${jobDescription}\n\nCandidate Profile: ${candidateProfile}`,
        },
      ];

      return await this.chatCompletion(messages);
    } catch (error) {
      console.error("Error generating interview questions:", error);
      throw error;
    }
  },

  async evaluateInterviewAnswer(question: string, answer: string) {
    try {
      const messages = [
        {
          role: "system",
          content: "You are an experienced interviewer. Evaluate the candidate's answer and provide constructive feedback.",
        },
        {
          role: "user",
          content: `Question: ${question}\n\nAnswer: ${answer}`,
        },
      ];

      return await this.chatCompletion(messages);
    } catch (error) {
      console.error("Error evaluating interview answer:", error);
      throw error;
    }
  },
}; 