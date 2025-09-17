"use client";

import { IconButton } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { ChatWindow } from "./ChatWindow";

type Message = { text: string; sender: "staff" | "user"; sentAt?: string };

// Tạo guestId ngẫu nhiên nếu chưa có
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
    } else {
      let gid = localStorage.getItem("guestId");
      if (!gid) {
        gid = generateGuestId();
        localStorage.setItem("guestId", gid);
      }
      setGuestId(gid);
    }
  }, []);

  // 🔹 Key để nhận WS / fetch lịch sử
  const key = userId ? `user-${userId}` : guestId ? `guest-${guestId}` : null;

  // 🔹 Lấy lịch sử chat khi mở
  useEffect(() => {
    if (!open || !key) return;

    fetch(`http://localhost:1209/api/chat/history/${key}`)
      .then(res => res.json())
      .then(data => {
        setMessages(data.map((m: any) => ({
          text: m.content,
          sender: m.senderId === staffId ? "staff" : "user",
          sentAt: new Date(m.sentAt).toISOString()
        })));
      })
      .catch(err => console.error(err));
  }, [open, key]);

  // 🔹 WS realtime chỉ subscribe 1 lần khi key thay đổi
  useEffect(() => {
    if (!key) return;

    const sock = new SockJS("http://localhost:1209/ws-chat");
    const client = new Client({
      webSocketFactory: () => sock,
      onConnect: () => {
        client.subscribe(`/topic/message/${key}`, (msg) => {
          const body = JSON.parse(msg.body);
          setMessages(prev => [...prev, {
            text: body.content,
            sender: body.senderId === staffId ? "staff" : "user",
            sentAt: new Date(body.sentAt).toISOString()
          }]);
        });
      },
    });

    client.activate();
    return () => client.deactivate();
  }, [key]);

  // 🔹 Gửi tin nhắn
  const handleSend = async (msg: string) => {
    if (!msg.trim()) return;
    const body = { senderId: userId, guestId, receiverId: staffId, content: msg };
    await fetch("http://localhost:1209/api/chat/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    // setMessages(prev => [...prev, { text: msg, sender: "user", sentAt: new Date().toISOString() }]);
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

      {open && <ChatWindow messages={messages} onSend={handleSend} onClose={() => setOpen(false)} />}
    </>
  );
}
