# Duolingo AI Classroom

## Description

A type-safe classroom chat system inspired by Duolingo, enhanced with AI tutoring capabilities. Built with Next.js App Router, TypeScript, and Groq AI. Students can practice languages, get grammar corrections, and receive personalized lessons.

## AI Provider

I chose **Groq** because it is free and has no significant limitations for small projects. It is also extremely fast compared to other providers.

## Features

- 🤖 AI language tutor powered by Groq
- 💬 Real-time streaming responses
- 🔤 Grammar correction and explanations
- 🌍 Translation between languages
- 📚 Homework and exercises generation
- 🛡️ Content moderation with banned words filter
- 💾 Conversation history — AI remembers context

## How Streaming Works

Instead of waiting for the full response, the AI sends text chunk by chunk so the user sees the answer being typed in real time.

## Installation

```bash
git clone <your-repo-url>
cd duolingo-ai-classroom
npm install
```

Create `.env.local`:

```
GROQ_API_KEY=your_key_here
```

Run:

```bash
npm run dev
```

## Project Structure

```
/app
  /api/chat      → AI streaming endpoint
/components      → UI components
/lib             → business logic
/schemas         → Zod validation
/types           → TypeScript types
```

## Core Concepts

- TypeScript + Zod for type safety
- Groq AI with streaming responses
- Conversation history for context
- Content filtering for educational safety
