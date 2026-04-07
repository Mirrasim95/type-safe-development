import { z } from "zod";

export const MessageSchema = z.object({
  content: z
    .string()
    .min(1, "Message cannot be empty")
    .max(500, "Message is too long")
    .refine((val) => !val.toLocaleLowerCase().includes("spam"), "Wrong message"),
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