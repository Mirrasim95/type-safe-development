import { z } from "zod";

const bannedWords = ["spam", "badword", "stupid", "idiot"];

export const MessageSchema = z.object({
  content: z
    .string()
    .min(1, "Message cannot be empty")
    .max(500, "Message is too long")
    .refine(
      (val) => !bannedWords.some((word) => val.toLowerCase().includes(word)),
      "Wrong message",
    ),
  courseLanguage: z
    .enum(["en", "es", "fr", "de", "ja", "ko", "zh", "pt", "it", "ru"])
    .default("en"),
  authorId: z.string().default("user-123"),
});

export type MessageInput = z.infer<typeof MessageSchema>;
