import { NextResponse } from "next/server";
import { openAIService } from "@/services/openai";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    if (!prompt) return NextResponse.json({ error: "Prompt is required" }, { status: 400 });

    const response = await openAIService.getGeneratedText(prompt);
    return NextResponse.json({ response });
  } catch (error: Error) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
} ``
