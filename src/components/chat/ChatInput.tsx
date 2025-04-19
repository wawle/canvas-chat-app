"use client";
import { useState, KeyboardEvent } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SendIcon } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({
  onSendMessage,
  disabled = false,
  placeholder = "Mesajınızı yazın...",
}: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!message.trim() || disabled) return;

    onSendMessage(message);
    setMessage("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col w-full gap-2 bg-background border border-border rounded-lg p-2">
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="min-h-20 resize-none border-0 focus-visible:ring-0 focus-visible:ring-transparent"
        disabled={disabled}
      />
      <div className="flex justify-end">
        <Button
          onClick={handleSubmit}
          size="sm"
          disabled={!message.trim() || disabled}
        >
          <SendIcon className="h-4 w-4 mr-2" /> Gönder
        </Button>
      </div>
    </div>
  );
}
