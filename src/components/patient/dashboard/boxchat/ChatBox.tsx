"use client";

import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import { ChatWindow } from "./ChatWindow";
import { fetchHistory, sendMessage } from "@/services/chatbox";
import { connectMessageSocket } from "@/services/chatSocket";

type Message = {
  text: string;
  sender: "staff" | "user" | "guest";
  sentAt?: string;
};

function generateGuestId(): string {
  return Math.random().toString(36).substring(2, 10);
}

export default function ChatBox() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userId, setUserId] = useState<number | null>(null);
  const [guestId, setGuestId] = useState<string | null>(null);

  const staffId = 1;

  useEffect(() => {
    const token =
      localStorage.getItem("authToken") ||
      sessionStorage.getItem("authToken");

    if (token) {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
        const decoded = JSON.parse(jsonPayload);

        setUserId(decoded.userId);

      } catch (err) {
        console.error("Token invalid", err);
      }
    }


    let gid = localStorage.getItem("guestId");
    if (!gid) {
      gid = generateGuestId();
      localStorage.setItem("guestId", gid);
    }
    setGuestId(gid);
  }, []);

  const key = userId
    ? `user-${userId}`
    : guestId
      ? `guest-${guestId}`
      : null;

  useEffect(() => {
    if (!open || !key) return;

    async function loadHistory() {
      let msgs: any[] = [];

      if (userId) {
        // Nếu login thì chỉ lấy chat theo userId
        msgs = await fetchHistory(`user-${userId}`);
      } else if (guestId) {
        // Nếu chưa login thì dùng guestId
        msgs = await fetchHistory(`guest-${guestId}`);
      }

      msgs.sort((a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime());

      setMessages(
        msgs.map((m) => ({
          text: m.content,
          sender:
            m.senderId === staffId
              ? "staff"
              : m.senderId === userId
                ? "user"
                : "guest",
          sentAt: new Date(m.sentAt).toISOString(),
        }))
      );
    }


    loadHistory().catch(console.error);
  }, [open, key, userId, guestId]);

  useEffect(() => {
    if (!key) return;

    const disconnect = connectMessageSocket(key, (body) => {
      setMessages((prev) => {
        if (
          prev.some(
            (m) =>
              m.sentAt === new Date(body.sentAt).toISOString() &&
              m.text === body.content
          )
        ) {
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
            sentAt: new Date(body.sentAt).toISOString(),
          },
        ];
      });
    });

    return () => disconnect();
  }, [key, userId]);

  const handleSend = async (msg: string) => {
    if (!msg.trim()) return;

    await sendMessage({
      senderId: userId ?? null,
      guestId: userId ? null : guestId,
      receiverId: staffId,
      content: msg,
    });
  };

  return (
    <>
      <IconButton
        onClick={() => setOpen((prev) => !prev)}
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          bgcolor: "#027d44",
          color: "#fff",
          "&:hover": { bgcolor: "#026836" },
          zIndex: 1000,
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
