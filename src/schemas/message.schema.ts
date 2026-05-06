import { z } from "zod";

export const MessageSchema = z.object({
  content: z
    .string()
    .min(1, "Message cannot be empty")
    .max(500, "Message is too long"),
  courseLanguage: z
    .enum(["en", "es", "fr", "de", "ja", "ko", "zh", "pt", "it", "ru"])
    .default("en"),
  authorId: z.string().default("user-123"),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string(),
      }),
    )
    .default([]),
});

export type MessageInput = z.input<typeof MessageSchema>;
