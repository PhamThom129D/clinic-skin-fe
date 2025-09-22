"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { ChatMessage, fetchHistory, sendReply } from "@/services/chatbox";
import { connectMessageSocket } from "@/services/chatSocket";
import "@/css/chat/StaffChatWindow.css";  

interface Conversation {
  key: string;
  customerName: string;
  messages?: ChatMessage[];
}

export default function StaffChatWindow({
  conversation,
  staffId,
}: {
  conversation: Conversation;
  staffId: number;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>(conversation.messages || []);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchHistory(conversation.key)
      .then((data) => setMessages(data))
      .catch((err) => console.error(err));
  }, [conversation.key]);

  useEffect(() => {
    const disconnect = connectMessageSocket(conversation.key, (body: ChatMessage) => {
      setMessages((prev) => [...prev, body]);
    });
    return () => disconnect();
  }, [conversation.key]);

  const handleSend = useCallback(async () => {
    if (!input.trim()) return;

    const body = {
      senderId: staffId,
      receiverId: conversation.key.startsWith("user-")
        ? Number(conversation.key.replace("user-", ""))
        : null,
      guestId: conversation.key.startsWith("guest-")
        ? conversation.key.replace("guest-", "")
        : null,
      content: input.trim(),
    };

    try {
      await sendReply(body, "ROLE_CONSULTANT");
      setInput("");
    } catch (err) {
      console.error("send error", err);
    }
  }, [input, staffId, conversation.key]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="chat-window">
      <h4>Chat với {conversation.customerName}</h4>

      <div className="chat-messages" ref={scrollRef}>
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`chat-message ${m.senderId === staffId ? "staff" : "customer"}`}
          >
            <span>{m.content}</span>
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nhập tin nhắn..."
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
        />
        <button onClick={handleSend}>Gửi</button>
      </div>
    </div>
  );
}
