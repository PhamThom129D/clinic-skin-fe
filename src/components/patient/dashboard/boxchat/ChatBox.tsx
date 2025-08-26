"use client"; 
import { IconButton } from "@mui/material";
import React, { useState } from "react";
import { ChatWindow } from "./ChatWindow";
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';

type Message = { text: string; sender: "A" | "user" };

export default function ChatBox() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ text:"Xin chào. Bạn cần tư vấn gì?", sender:"A" }]);

  const handleSend = (msg:string) => setMessages([...messages,{text:msg,sender:"user"}]);

  return (
    <>
      <IconButton onClick={()=>setOpen(!open)} sx={{ position:"fixed", bottom:20, right:20, bgcolor:"#027d44", color:"#fff", '&:hover':{bgcolor:"#026836"}, zIndex:1000 }}>
        {open?<CloseIcon/>:<ChatIcon/>}
      </IconButton>
      {open && <ChatWindow messages={messages} onSend={handleSend} onClose={()=>setOpen(false)} />}
    </>
  );
}