import { OpenAI, ClientOptions } from "openai";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export const openAIRepository = {
  generateResponse: async (prompt: string) => {
    const openai = new OpenAI({
      apiKey: OPENAI_API_KEY,
    });
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
          { role: "system", content: "You are a helpful assistant." },
          {
              role: "user",
              content: "Write a haiku about recursion in programming.",
          },
      ],
      store: true,
  });
    return completion.choices[0].message;
  },
}