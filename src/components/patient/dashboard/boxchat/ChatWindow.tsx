"use client";

import { Box, Paper, TextField, Button, Typography, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import React, { useState, useRef, useEffect } from "react";

interface ChatWindowProps {
  messages: { text: string; sender: "staff" | "user" | "guest"; sentAt?: string }[];
  onSend: (msg: string) => void;
  onClose: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ messages, onSend, onClose }) => {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if(input.trim()) {
      onSend(input);
      setInput("");
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  return (
    <Paper sx={{
      position: "fixed", bottom: 70, right: 20,
      width: { xs:"90vw", sm:400, md:450 }, height: 500,
      display: "flex", flexDirection: "column", borderRadius:2, overflow:"hidden", zIndex:1000
    }} elevation={6}>
      <Box sx={{ p:1, bgcolor:"#027d44", color:"#fff", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <Typography variant="subtitle1" fontWeight="bold">Chat với chúng tôi</Typography>
        <IconButton onClick={onClose} sx={{ color:"#fff" }}><CloseIcon /></IconButton>
      </Box>
      <Box ref={scrollRef} sx={{ flex:1, p:2, overflowY:"auto", display:"flex", flexDirection:"column", bgcolor:"#f9f9f9" }}>
        {messages.map((m,i)=>(
          <Box key={i} sx={{
            alignSelf: m.sender==="staff"?"flex-start":"flex-end",
            mb:1, p:1, borderRadius:2,
            bgcolor: m.sender==="staff"?"#eee":"#027d44",
            color: m.sender==="staff"?"#000":"#fff",
            maxWidth:"80%"
          }}>
            {m.text}
          </Box>
        ))}
      </Box>
      <Box sx={{ display:"flex", p:1, borderTop:"1px solid #ccc" }}>
        <TextField
          fullWidth size="small"
          placeholder="Nhập tin nhắn..."
          value={input}
          onChange={e=>setInput(e.target.value)}
          onKeyDown={e=>{ if(e.key==="Enter") handleSend(); }}
        />
        <Button onClick={handleSend} sx={{ ml:1, bgcolor:"#027d44","&:hover":{bgcolor:"#026836"}, color:"#fff" }}>Gửi</Button>
      </Box>
    </Paper>
  );
};
