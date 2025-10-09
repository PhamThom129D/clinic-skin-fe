"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { ChatMessage, fetchHistory, sendReply } from "@/services/chatbox";
import { connectMessageSocket } from "@/services/chatSocket";
import { getAccountById } from "@/services/accountService";
import "@/css/chat/StaffChatWindow.css";

interface Conversation {
  key: string;
  customerName: string;
  messages?: ChatMessage[];
}

interface StaffChatWindowProps {
  conversation: Conversation;
  staffId: number;
  darkMode?: boolean;
}

export default function StaffChatWindow({
  conversation,
  staffId,
  darkMode = false,
}: StaffChatWindowProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(conversation.messages || []);
  const [input, setInput] = useState("");
  const [customerName, setCustomerName] = useState(conversation.customerName);
  const scrollRef = useRef<HTMLDivElement>(null);

  /** Lấy lịch sử tin nhắn */
  useEffect(() => {
    fetchHistory(conversation.key)
      .then((data) => setMessages(data))
      .catch((err) => console.error("Lỗi fetch history:", err));
  }, [conversation.key]);

  /** Lấy thông tin khách hàng từ key */
  useEffect(() => {
    console.log("Conversation key:", conversation.key);

    if (conversation.key.startsWith("user-")) {
      const customerId = Number(conversation.key.replace("user-", ""));
      getAccountById(customerId)
        .then((account) => {
          if (account) {
            setCustomerName(account.fullName);
          }
        })
        .catch((err) => console.error("Lỗi getAccountById:", err));
    }

    if (conversation.key.startsWith("guest-")) {
      setCustomerName(conversation.customerName);
    }
  }, [conversation.key]);

  /** Lắng nghe socket nhận tin nhắn mới */
  useEffect(() => {
    const disconnect = connectMessageSocket(conversation.key, (body: ChatMessage) => {
      console.log("Tin nhắn mới:", body);
      setMessages((prev) => [...prev, body]);
    });
    return () => disconnect();
  }, [conversation.key]);

  /** Gửi tin nhắn */
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
      console.error("Lỗi gửi tin:", err);
    }
  }, [input, staffId, conversation.key]);

  /** Auto scroll xuống cuối khi có tin nhắn */
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className={`chat-window ${darkMode ? "dark" : ""}`}>
      <h4>Chat với {customerName}</h4>

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
