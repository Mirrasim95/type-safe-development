"use client";
import { MessageForm } from "@/components/forms/MessageForm";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";

export default function Home() {
  return (
    <main>
      <ErrorBoundary>
        <MessageForm />
      </ErrorBoundary>
    </main>
  );
}
