"use client";
import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import StaffChatWindow from "./ChatWindow";

interface ChatMessage {
  senderId: number | null;
  guestId: string | null;
  receiverId: number | null;
  content: string;
  sentAt: number;
}

interface Conversation {
  key: string;
  customerName: string;
  messages: ChatMessage[];
}

export default function StaffChatInbox() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [unread, setUnread] = useState<Record<string, boolean>>({});
  const staffId = 1; // staff hiện tại

  // 🔹 Lấy inbox từ backend
  const fetchInbox = async () => {
    try {
      const res = await fetch(`http://localhost:1209/api/chat/inbox/${staffId}`);
      const dataRaw: any[] = await res.json();

      const data: Conversation[] = dataRaw.map(conv => {
        const key = conv.customerId ? `user-${conv.customerId}` : `guest-${conv.guestId}`;
        const customerName = conv.customerName ?? key;
        return { key, customerName, messages: conv.messages };
      });

      setConversations(data);

      // Cập nhật tin nhắn mới
      const newUnread: Record<string, boolean> = {};
      data.forEach(conv => {
        const lastMsg = conv.messages[conv.messages.length - 1];
        if (lastMsg && lastMsg.senderId !== staffId) newUnread[conv.key] = true;
      });
      setUnread(newUnread);

    } catch (err) { console.error(err); }
  };

  useEffect(() => {
    fetchInbox();

    // 🔹 Kết nối websocket
    const sock = new SockJS("http://localhost:1209/ws-chat");
    const client = new Client({
      webSocketFactory: () => sock,
      onConnect: () => {
        client.subscribe("/topic/inbox-updates", (msg) => {
          const body = msg.body; // ví dụ: "staff-1"
          if (body === `staff-${staffId}`) {
            fetchInbox(); // update inbox realtime
          }
        });
      },
    });
    client.activate();
    return () => client.deactivate();
  }, []);

  const activeConv = conversations.find(c => c.key === activeKey) ?? null;

  return (
    <div style={{ display: "flex", gap: 20, height: "80vh" }}>
      <div style={{ width: 300, overflowY: "auto", border: "1px solid #ccc", borderRadius: 6, padding: 8 }}>
        <h3>Khách đã nhắn</h3>
        {conversations.map(conv => {
          const lastMsg = conv.messages[conv.messages.length - 1]?.content ?? "";
          return (
            <div
              key={conv.key}
              onClick={() => {
                setActiveKey(conv.key);
                setUnread(prev => ({ ...prev, [conv.key]: false }));
              }}
              style={{
                marginBottom: 8,
                padding: 8,
                borderRadius: 6,
                cursor: "pointer",
                background: activeKey === conv.key ? "#eef" : "#fff",
                position: "relative",
                border: "1px solid #ddd"
              }}
            >
              <div style={{ fontWeight: "bold" }}>{conv.customerName}</div>
              <div style={{ fontSize: 12, color: "#555" }}>Tin nhắn cuối: {lastMsg}</div>
              {unread[conv.key] && (
                <span style={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  background: "red",
                  color: "#fff",
                  borderRadius: "50%",
                  padding: "2px 6px",
                  fontSize: 10
                }}>Mới</span>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ flex: 1, border: "1px solid #ccc", borderRadius: 6, overflow: "hidden" }}>
        {activeConv
          ? <StaffChatWindow conversation={activeConv} staffId={staffId} />
          : <div style={{ padding: 20 }}>👉 Chọn khách để chat</div>}
      </div>
    </div>
  );
}
