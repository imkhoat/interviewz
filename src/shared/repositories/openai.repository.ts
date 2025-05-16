import { httpClient } from "@shared/lib/http-client";

export interface OpenAIPromptResponse {
  suggestions: string[];
}

export const openaiRepository = {
  generatePrompt: async (keywords: string): Promise<OpenAIPromptResponse> => {
    const response = await httpClient("/openai/chat", {
      method: "POST",
      body: JSON.stringify({ keywords }),
    });
    return response as OpenAIPromptResponse;
  },

  async chatCompletion(messages: any[]) {
    const response = await httpClient("/openai/chat", {
      method: "POST",
      body: JSON.stringify({ messages }),
    });
    return response;
  },

  async generateResumeFeedback(resume: string) {
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
  },

  async generateInterviewQuestions(jobDescription: string, candidateProfile: string) {
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
  },

  async evaluateInterviewAnswer(question: string, answer: string) {
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
  },
}; 