export type SupportedLanguage =
  | "en"
  | "es"
  | "fr"
  | "de"
  | "ja"
  | "ko"
  | "zh"
  | "pt"
  | "it"
  | "ru";

export type UserRole = "student" | "teacher" | "moderator";

export type ContentSafetyStatus = "safe" | "flagged" | "blocked";

export interface User {
  id: string;
  username: string;
  role: UserRole;
  language: SupportedLanguage;
  age?: number;
}

export interface ChatMessage {
  id: string;
  content: string;
  author: User;
  courseLanguage: SupportedLanguage;
  timestamp: Date;
  safetyStatus: ContentSafetyStatus;
}
