"use client";

import { IconButton } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { ChatWindow } from "./ChatWindow";

type Message = { text: string; sender: "staff" | "user" | "guest"; sentAt?: string };

function generateGuestId(): string {
  return Math.random().toString(36).substring(2, 10);
}

export default function ChatBox() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userId, setUserId] = useState<number | null>(null);
  const [guestId, setGuestId] = useState<string | null>(null);

  const staffId = 1;

  // 🔹 Lấy userId hoặc guestId
  useEffect(() => {
    const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    if (token) {
      try {
        const decoded: any = JSON.parse(atob(token.split(".")[1]));
        setUserId(decoded.id);
      } catch {
        console.error("Token invalid");
      }
    }

    let gid = localStorage.getItem("guestId");
    if (!gid) {
      gid = generateGuestId();
      localStorage.setItem("guestId", gid);
    }
    setGuestId(gid);
  }, []);

  // 🔹 Key định danh chat
  const key = userId ? `user-${userId}` : guestId ? `guest-${guestId}` : null;

  // 🔹 Lấy lịch sử chat khi mở chat
  useEffect(() => {
    if (!open || !key) return;

    async function fetchHistory() {
      let msgs: any[] = [];

      // Merge guest lịch sử vào user nếu đã login
      if (userId && guestId) {
        const resGuest = await fetch(`http://localhost:1209/api/chat/history/guest-${guestId}`);
        const guestMsgs = await resGuest.json();
        msgs = msgs.concat(guestMsgs);
      }

      const resUser = await fetch(`http://localhost:1209/api/chat/history/${key}`);
      const userMsgs = await resUser.json();
      msgs = msgs.concat(userMsgs);

      // Sort theo thời gian để hiển thị đúng thứ tự
      msgs.sort((a, b) => a.sentAt - b.sentAt);

      setMessages(
        msgs.map(m => ({
          text: m.content,
          sender:
            m.senderId === staffId
              ? "staff"
              : m.senderId === userId
              ? "user"
              : "guest",
          sentAt: new Date(m.sentAt).toISOString()
        }))
      );
    }

    fetchHistory().catch(console.error);
  }, [open, key, userId, guestId]);

  // 🔹 WS realtime
  useEffect(() => {
    if (!key) return;

    const sock = new SockJS("http://localhost:1209/ws-chat");
    const client = new Client({
      webSocketFactory: () => sock,
      onConnect: () => {
        client.subscribe(`/topic/message/${key}`, (msg) => {
          const body = JSON.parse(msg.body);

          setMessages(prev => {
            // tránh duplicate
            if (prev.some(m => m.sentAt === new Date(body.sentAt).toISOString() && m.text === body.content)) {
              return prev;
            }
            return [
              ...prev,
              {
                text: body.content,
                sender:
                  body.senderId === staffId
                    ? "staff"
                    : body.senderId === userId
                    ? "user"
                    : "guest",
                sentAt: new Date(body.sentAt).toISOString()
              }
            ];
          });
        });
      },
    });

    client.activate();
    return () => client.deactivate();
  }, [key, userId]);

  // 🔹 Gửi tin nhắn
  const handleSend = async (msg: string) => {
    if (!msg.trim()) return;

    const body = { senderId: userId, guestId, receiverId: staffId, content: msg };
    await fetch("http://localhost:1209/api/chat/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    // Không push local, WS sẽ push
  };

  return (
    <>
      <IconButton
        onClick={() => setOpen(prev => !prev)}
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          bgcolor: "#027d44",
          color: "#fff",
          "&:hover": { bgcolor: "#026836" },
          zIndex: 1000
        }}
      >
        {open ? <CloseIcon /> : <ChatIcon />}
      </IconButton>

      {open && (
        <ChatWindow
          messages={messages}
          onSend={handleSend}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
