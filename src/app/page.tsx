import { MessageForm } from "@/app/components/forms/MessageForm";
import { ErrorBoundary } from "@/app/components/ui/ErrorBoundary";

export default function Home() {
  return (
    <main>
      <h1>Duolingo Classroom Chat</h1>
      <ErrorBoundary>
        <MessageForm />
      </ErrorBoundary>
    </main>
  );
}
