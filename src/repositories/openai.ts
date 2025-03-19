import { httpClient } from "@/lib/http-client";

export const openAIRepository = {
  generateAnswer: (data: {
    role: "system" | "user";
    content: string;
  }[]) => {
    return httpClient('/api/openai', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },
}