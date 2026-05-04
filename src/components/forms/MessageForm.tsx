"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageSchema, type MessageInput } from "@/schemas/message.schema";
import { useState, useRef, useEffect } from "react";
import { ContentSafetyStatus } from "@/app/types/chat";
import Image from "next/image";

type UIMessage = {
  content: string;
  safetyStatus: ContentSafetyStatus;
};

const statusColor: Record<ContentSafetyStatus, string> = {
  safe: "text-green-500",
  flagged: "text-yellow-500",
  blocked: "text-red-500",
};

export function MessageForm() {
  const [messages, setMessages] = useState<UIMessage[]>([]);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MessageInput>({
    resolver: zodResolver(MessageSchema),
    defaultValues: {
      courseLanguage: "en",
      authorId: "user-123",
    },
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
    reset({ content: "", courseLanguage: "en", authorId: "user-123" });
  }

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto border-x border-gray-200 bg-[#fefae9] shadow-2xl">
      <div className="flex bg-[#E0F3DE] p-4 justify-center shadow-lg rounded-bl-2xl rounded-br-2xl ">
        <Image
          src={"/duolingo-1.svg"}
          width={60}
          height={60}
          alt="dualingo-svg"
        />
        <Image
          src={"/duolingo-2019.svg"}
          width={150}
          height={150}
          alt="dualingo-svg"
          className="pl-5"
        />
      </div>
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 ml-1">
        {messages.map((item, index) => (
          <div
            key={index}
            className="bg-gray-200 rounded-2xl pl-5 pt-2 pb-2 pr-5 w-fit max-w-[75%] gap-2 break-all"
          >
            <p>{item.content}</p>
            <small className={statusColor[item.safetyStatus]}>
              {item.safetyStatus}
            </small>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Инпут — фиксирован снизу */}
      <div className="p-4 flex gap-2 bg-[#264F39] rounded-tl-2xl rounded-tr-2xl">
        <input
          {...register("content")}
          type="text"
          placeholder="Type a message..."
          className="flex-1 border rounded-2xl border-gray-400 p-2 bg-white"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit(onSubmit)();
            }
          }}
        />
        <button
          className="border border-green-600 rounded-2xl px-4 py-2 active:bg-gray-600 bg-[#64C601] text-white"
          onClick={handleSubmit(onSubmit)}
        >
          Send
        </button>
      </div>

      {errors.content && (
        <p className="px-4 pb-2 text-red-500 text-sm">
          {errors.content.message}
        </p>
      )}
    </div>
  );
}
