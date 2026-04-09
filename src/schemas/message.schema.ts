import { z } from "zod";

const bannedWords = ["spam", "badword", "stupid", "idiot"];

export const MessageSchema = z.object({
  content: z
    .string()
    .min(1, "Message cannot be empty")
    .max(500, "Message is too long")
    .refine(
      (val) =>
        !bannedWords.some((word) => val.trim().toLowerCase().includes(word)),
      {
        message: "Message contains inappropriate content",
      },
    ),
  courseLanguage: z.enum([
    "en",
    "es",
    "fr",
    "de",
    "ja",
    "ko",
    "zh",
    "pt",
    "it",
    "ru",
  ]),
  authorId: z.string().min(1, "Author is undefined"),
});

export type MessageInput = z.infer<typeof MessageSchema>;
