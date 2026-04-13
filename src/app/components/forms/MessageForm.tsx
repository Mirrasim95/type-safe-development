"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageSchema, type MessageInput } from "@/schemas/message.schema";
import { useState } from "react";
import { ContentSafetyStatus } from "@/app/types/chat";

type UIMessage = {
  content: string;
  safetyStatus: ContentSafetyStatus;
};

export function MessageForm() {
  const [messages, setMessages] = useState<UIMessage[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MessageInput>({
    resolver: zodResolver(MessageSchema),
  });

  async function onSubmit(data: MessageInput) {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error status: ${response.status}`);
    }

    const result = await response.json();

    setMessages((prev) => [
      ...prev,
      {
        content: result.data.content,
        safetyStatus: result.data.safetyStatus,
      },
    ]);
  }

  return (
    <div className="flex flex-col max-w-xs">
      {messages.map((item) => {
        return (
          <div key={index}>
            <p>{item.content}</p>
            <small>{item.safetyStatus}</small>
          </div>
        );
      })}
      <input
        {...register("content")}
        type="text"
        placeholder="Type a message..."
        className="border rounded-2xl border-gray-400 p-2"
      />
      {errors.content && (
        <p style={{ color: "red" }}>{errors.content.message}</p>
      )}
      <button
        className="border rounded-2xl p-2 active:bg-gray-600 mt-2"
        onClick={handleSubmit(onSubmit)}
      >
        Send
      </button>
    </div>
  );
}
