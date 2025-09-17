"use client";
import { useEffect, useRef, useState } from "react";

interface ChatMessage { senderId: number | null; guestId: string | null; receiverId: number | null; content: string; sentAt: number; }
interface Conversation { key: string; customerName: string; messages?: ChatMessage[] }

export default function StaffChatWindow({ conversation, staffId }: { conversation: Conversation; staffId: number }) {
  const [messages, setMessages] = useState<ChatMessage[]>(conversation.messages || []);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`http://localhost:1209/api/chat/history/${conversation.key}`)
      .then(res => res.json())
      .then((data: ChatMessage[]) => setMessages(data))
      .catch(err => console.error(err));
  }, [conversation.key]);

  useEffect(() => {
    const SockJS = require("sockjs-client");
    const { Client } = require("@stomp/stompjs");

    const sock = new SockJS("http://localhost:1209/ws-chat");
    const client = new Client({
      webSocketFactory: () => sock,
      onConnect: () => client.subscribe(`/topic/message/${conversation.key}`, (msg) => {
        const body: ChatMessage = JSON.parse(msg.body);
        setMessages(prev => [...prev, body]);
      }),
    });
    client.activate();
    return () => client.deactivate();
  }, [conversation.key]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const body = {
      senderId: staffId,
      receiverId: conversation.key.startsWith("user-") ? Number(conversation.key.replace("user-", "")) : null,
      guestId: conversation.key.startsWith("guest-") ? conversation.key.replace("guest-", "") : null,
      content: input
    };
    await fetch(`http://localhost:1209/api/chat/reply?role=ROLE_CONSULTANT`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    setInput("");
  };

  useEffect(() => { scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" }); }, [messages]);

  return (
    <div style={{ border: "1px solid #ccc", borderRadius: 8, padding: 12, height: "100%", display: "flex", flexDirection: "column" }}>
      <h4>Chat với {conversation.customerName}</h4>
      <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", border: "1px solid #ddd", padding: 8, marginBottom: 8 }}>
        {messages.map((m, idx) => (
          <div key={idx} style={{ textAlign: m.senderId === staffId ? "right" : "left", marginBottom: 6 }}>
            <span style={{ display: "inline-block", padding: "6px 10px", borderRadius: 6, background: m.senderId === staffId ? "#027d44" : "#eee", color: m.senderId === staffId ? "#fff" : "#000" }}>
              {m.content}
            </span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <input style={{ flex: 1, padding: 6 }} value={input} onChange={(e) => setInput(e.target.value)} placeholder="Nhập tin nhắn..." onKeyDown={e => { if(e.key === "Enter") handleSend(); }} />
        <button onClick={handleSend}>Gửi</button>
      </div>
    </div>
  );
}
