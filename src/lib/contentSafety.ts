import { ContentSafetyStatus } from "@/app/types/chat";

const bannedWords = ["spam", "badword", "stupid", "idiot"];

export function getSafetyStatus(content: string): ContentSafetyStatus {
  const sortContent = content.trim().toLowerCase();

  if (bannedWords.some((word: string) => sortContent.includes(word))) {
    return "blocked";
  }

  if (sortContent.length < 2) {
    return "flagged";
  }

  return "safe";
}
