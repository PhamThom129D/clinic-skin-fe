"use client";

import { Box, Paper, TextField, Button, Typography, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import React, { useState, useRef, useEffect } from "react";
import { useChatSession } from "@/services/chatbox";

interface ChatWindowProps {
  messages: { text: string; sender: "staff" | "user" | "guest"; sentAt?: string }[];
  onSend: (msg: string, chatKey: string, guestId: string | null) => void;
  onClose: () => void;
  userId: number | null,
  userAvatar?: string;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ messages, onSend, onClose, userId }) => {
  const [input, setInput] = useState("");
  const [localMessages, setLocalMessages] = useState(messages);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { chatKey, guestId } = useChatSession(userId);

 useEffect(() => {
  if (userId === null) {
    setLocalMessages([]);  
  } else {
    setLocalMessages(messages); 
  }
}, [userId, messages]);


  const handleSend = () => {
    if (input.trim() && chatKey) {
      onSend(input, chatKey, guestId);
      setInput("");
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);


  return (
    <Paper sx={{
      position: "fixed", bottom: 70, right: 20,
      width: { xs: "calc(100vw - 40px)", sm: 400, md: 450 }, height: 500,
      display: "flex", flexDirection: "column", borderRadius: 2, overflow: "hidden", zIndex: 1000
    }} elevation={6}>
      <Box sx={{ p: 1, bgcolor: "#027d44", color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="subtitle1" fontWeight="bold">Chat với chúng tôi</Typography>
        <IconButton onClick={onClose} sx={{ color: "#fff" }}><CloseIcon /></IconButton>
      </Box>

      <Box ref={scrollRef} sx={{ flex: 1, p: 2, overflowY: "auto", display: "flex", flexDirection: "column", bgcolor: "#f9f9f9" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",

            gap: 1,
            mb: 1.5,
          }}
        >
          <img
            src="/images/logo.png"
            alt="Shop logo"
            style={{ width: 36, height: 36, borderRadius: "50%" }}
          />
          <Box
            sx={{
              bgcolor: "#eee",
              color: "#000",
              p: 1.2,
              borderRadius: 2,
              maxWidth: "80%",
            }}
          >
            Bạn cần tư vấn gì?
          </Box>
        </Box>

        {messages.map((m, i) =>
          m.sender === "staff" ? (
            // Tin nhắn staff: logo bên trái, bubble bên phải
            <Box
              key={i}
              sx={{
                display: "flex",
                alignItems: "flex-end",

                gap: 1,
                mb: 1.5,
              }}
            >
              <img
                src="/images/logo.png"
                alt="Shop logo"
                style={{ width: 36, height: 36, borderRadius: "50%" }}
              />
              <Box
                sx={{
                  bgcolor: "#eee",
                  color: "#000",
                  p: 1.2,
                  borderRadius: 2,
                  maxWidth: "70%",
                  wordBreak: "break-word",
                  whiteSpace: "pre-wrap",
                }}
              >
                {m.text}
              </Box>
            </Box>
          ) : (
            // Tin nhắn user/guest: bubble căn phải
            <Box
              key={i}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
                gap: 1,
                mb: 1.5,
              }}
            >
              <Box
                sx={{
                  bgcolor: "#027d44",
                  color: "#fff",
                  p: 1.2,
                  borderRadius: 2,
                  maxWidth: "70%",
                  wordBreak: "break-word",
                  whiteSpace: "pre-wrap",
                }}
              >
                {m.text}
              </Box>

            </Box>
          )
        )}
      </Box>
      <Box sx={{ display: "flex", p: 1, borderTop: "1px solid #ccc" }}>
        <TextField
          fullWidth size="small"
          placeholder="Nhập tin nhắn..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") handleSend(); }}
        />
        <Button onClick={handleSend} sx={{ ml: 1, bgcolor: "#027d44", "&:hover": { bgcolor: "#026836" }, color: "#fff" }}>Gửi</Button>
      </Box>
    </Paper>
  );
};
