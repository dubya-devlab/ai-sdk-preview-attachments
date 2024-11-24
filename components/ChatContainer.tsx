"use client";

import { useEffect, useRef, useState } from "react";
import { Message } from "./types/chat";
import { ChatMessage } from "./ChatMessage";
import { LoadingMessage } from "./LoadingMessage";
import { ChatInput } from "./ChatInput";
import { DragOverlay } from "./DragOverlay";

export function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (message: string, attachments?: File[]) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { role: "user", content: message }]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, attachments }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.message }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, there was an error processing your message." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] max-h-[600px] bg-gray-50 rounded-lg shadow-md">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
        {isLoading && <LoadingMessage />}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t p-4 relative">
        {isDragging && <DragOverlay />}
        <ChatInput
          onSubmit={handleSubmit}
          isLoading={isLoading}
          onDragEnter={() => setIsDragging(true)}
          onDragLeave={() => setIsDragging(false)}
          onDrop={() => setIsDragging(false)}
        />
      </div>
    </div>
  );
}
