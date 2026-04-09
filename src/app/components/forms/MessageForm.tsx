"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageSchema, type MessageInput } from "@/schemas/message.schema";

export function MessageForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MessageInput>({
    resolver: zodResolver(MessageSchema),
  });

  function onSubmit(data: MessageInput) {
    console.log(data);
  }

  return (
    <div className="flex flex-col max-w-xs">
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
