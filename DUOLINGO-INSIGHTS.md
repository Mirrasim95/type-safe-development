# DUOLINGO-AI-INSIGHTS.md

## What I Learned

### 1. LLM Integration

I learned how to connect a real AI provider (Groq) to a Next.js application. The most important thing I understood is that calling an AI is just a regular HTTP request — you send messages, you get a response. The Groq SDK makes this simple.

### 2. Streaming Responses

Before this project I did not know how streaming worked. Now I understand that instead of waiting for the full AI response, the server sends data chunk by chunk using a ReadableStream. On the frontend I read these chunks with a while loop and update the UI in real time. This makes the app feel much faster.

### 3. Prompt Engineering

I learned that the system prompt controls how the AI behaves. Without a system prompt the AI answers any question including recipes and sports. With a strict system prompt it stays focused on language learning. The quality of the AI response depends more on the prompt than on the code.

### 4. Conversation History

At first the AI did not remember anything between messages. I fixed this by sending the full message history with every request. Now the AI remembers the user's name and previous questions. This required adding a `history` field to the Zod schema so it gets validated properly.

### 5. Debugging Streaming

Streaming was the hardest part. I had issues with duplicated text — the AI response appeared twice. I fixed it by accumulating chunks in a separate variable (`aiResponse`) and using `=` instead of `+=` when updating state. This prevents React from applying updates twice.

## Challenges

- **Duplicate text bug** — took a long time to debug. The fix was to accumulate text outside of setState and replace instead of append.
- **Model deprecation** — the first model I tried (`llama3-8b-8192`) was decommissioned. I switched to `llama-3.3-70b-versatile`.
- **`toDataStreamResponse` error** — the `ai` package version 6 changed its API. I switched to `toTextStreamResponse`.

## Provider Choice: Groq

I chose Groq because:

- Free tier with generous limits
- Extremely fast response times
- Easy setup with `@ai-sdk/groq`
- Good model quality with LLaMA 3.3

## What I Would Add Next

- Typing indicator while AI is generating
- Ability to select language to practice
- Save conversation history to localStorage
- Error message when AI is unavailable
