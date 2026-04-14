"use client";
import { MessageForm } from "@/app/components/forms/MessageForm";
import { ErrorBoundary } from "@/app/components/ui/ErrorBoundary";

export default function Home() {
  return (
    <main>
      <ErrorBoundary>
        <MessageForm />
      </ErrorBoundary>
    </main>
  );
}
