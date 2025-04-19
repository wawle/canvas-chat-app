"use client";
import { useRef, useEffect } from "react";
import { ChatMessage } from "./ChatMessage";

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  createdAt?: Date;
}

interface ChatListProps {
  messages: Message[];
  loading?: boolean;
  onViewInCanvas?: (code: string, language: string) => void;
}

export function ChatList({
  messages,
  loading = false,
  onViewInCanvas,
}: ChatListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  // Otomatik kaydırma
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex flex-col gap-4 w-full p-4 overflow-y-auto">
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          role={message.role}
          content={message.content}
          onViewInCanvas={onViewInCanvas}
        />
      ))}

      {loading && (
        <div className="flex items-center justify-center py-4">
          <div className="h-4 w-4 rounded-full bg-muted-foreground animate-pulse"></div>
          <div
            className="h-4 w-4 rounded-full bg-muted-foreground animate-pulse mx-1"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="h-4 w-4 rounded-full bg-muted-foreground animate-pulse"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
