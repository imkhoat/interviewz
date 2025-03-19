
import { Prompt } from "@/types/prompt";
import { OpenAI } from "openai";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export const aiService = {
  generateResponse: async (prompt: Prompt[]) => {
      const openai = new OpenAI({
        apiKey: OPENAI_API_KEY,
      });
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: prompt,
        store: true,
    });
      return completion.choices[0].message;
    },
}