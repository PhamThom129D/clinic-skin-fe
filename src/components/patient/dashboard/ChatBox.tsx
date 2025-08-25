'use client';
import { useState } from "react";
import { Box, IconButton, Paper, TextField, Button, Typography } from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';

export default function ChatBox() {
  const [open, setOpen] = useState(false); // trạng thái mở/đóng chat
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  const handleSend = () => {
    if (message.trim() !== "") {
      setMessages([...messages, message]);
      setMessage("");
    }
  };

  return (
    <>
      {/* Nút chat ở góc màn hình */}
      <IconButton
        onClick={() => setOpen(!open)}
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          backgroundColor: "#027d44",
          color: "#fff",
          '&:hover': { backgroundColor: "#026836" },
          zIndex: 1000,
        }}
      >
        {open ? <CloseIcon /> : <ChatIcon />}
      </IconButton>

      {/* Giao diện chat */}
      {open && (
        <Paper
          elevation={5}
          sx={{
            position: "fixed",
            bottom: 70,
            right: 20,
            width: 300,
            maxHeight: 400,
            display: "flex",
            flexDirection: "column",
            borderRadius: 2,
            overflow: "hidden",
            zIndex: 1000,
          }}
        >
          <Box sx={{ flex: 1, p: 1, overflowY: "auto" }}>
            {messages.length === 0 ? (
              <Typography variant="body2" color="textSecondary">Chưa có tin nhắn nào</Typography>
            ) : (
              messages.map((msg, index) => (
                <Typography key={index} sx={{ mb: 1, backgroundColor: "#f0f0f0", p: 1, borderRadius: 1 }}>
                  {msg}
                </Typography>
              ))
            )}
          </Box>

          <Box sx={{ display: "flex", p: 1, borderTop: "1px solid #ccc" }}>
            <TextField
              size="small"
              fullWidth
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Nhập tin nhắn..."
            />
            <Button variant="contained" sx={{ ml: 1, backgroundColor: "#027d44" }} onClick={handleSend}>
              Gửi
            </Button>
          </Box>
        </Paper>
      )}
    </>
  );
}
