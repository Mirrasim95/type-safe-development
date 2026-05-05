import { NextRequest, NextResponse } from "next/server";
import { MessageSchema } from "@/schemas/message.schema";
import { getSafetyStatus } from "@/lib/contentSafety";
import { createGroq } from "@ai-sdk/groq";
import { streamText } from "ai";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = MessageSchema.parse(body);
    const safetyStatus = getSafetyStatus(validated.content);

    if (safetyStatus === "blocked") {
      return NextResponse.json({ error: "Message blocked" }, { status: 400 });
    }

    const groq = createGroq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const stream = streamText({
      model: groq("llama-3.3-70b-versatile"),
      system: `You are a strict but friendly language tutor for Duolingo. 
              Your ONLY job is to help students learn languages.
              If a student asks about anything unrelated to language learning (recipes, sports, news, etc.), 
              politely decline and redirect them back to language practice.
              Help with: grammar, vocabulary, translation, pronunciation, conversation practice.
              Do NOT help with: recipes, cooking, news, entertainment, or any non-language topics.`,
      messages: [
        ...validated.history,
        { role: "user", content: validated.content },
      ],
    });

    return stream.toTextStreamResponse();
  } catch (error) {
    console.error("Route error:", error);
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}
