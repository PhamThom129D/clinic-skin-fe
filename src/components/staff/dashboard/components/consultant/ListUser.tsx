"use client";
import { useEffect, useState } from "react";
import StaffChatWindow from "./ChatWindow";
import {
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Badge,
  Paper,
} from "@mui/material";

import { fetchInbox, Conversation } from "@/services/chatbox";
import { connectChatSocket } from "@/services/chatSocket";

interface StaffChatInboxProps {
  darkMode: boolean;
}

export default function StaffChatInbox({ darkMode }: StaffChatInboxProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [unread, setUnread] = useState<Record<string, boolean>>({});
  const staffId = 1;

  const loadInbox = async () => {
    try {
      const data = await fetchInbox(staffId);

      setConversations((prev) => {
        const newUnread: Record<string, boolean> = { ...unread };

        const merged = data.map((conv) => {
          const lastMsg = conv.messages[conv.messages.length - 1];
          const existed = prev.find((c) => c.key === conv.key);

          if (!existed) {
            if (lastMsg && lastMsg.senderId !== staffId) newUnread[conv.key] = true;
            else newUnread[conv.key] = false;
          } else {
            newUnread[conv.key] = unread[conv.key] ?? false;

            const prevLast = existed.messages[existed.messages.length - 1];
            if (
              lastMsg &&
              lastMsg.senderId !== staffId &&
              prevLast?.sentAt !== lastMsg.sentAt
            ) {
              newUnread[conv.key] = true;
            }
          }

          return conv;
        });

        setUnread(newUnread);
        return merged;
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadInbox();

    const disconnect = connectChatSocket(staffId, () => {
      loadInbox();
    });

    return () => disconnect();
  }, []);

  const activeConv = conversations.find((c) => c.key === activeKey) ?? null;

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        height: "92vh",
        padding: "20px",
        backgroundColor: darkMode ? "#1e1e2e" : "#f5f6fa",
      }}
    >
      {/* Sidebar */}
      <Paper
        sx={{
          width: 400,
          display: "flex",
          flexDirection: "column",
          borderRadius: 2,
          overflow: "hidden",
          bgcolor: darkMode ? "#2c2c3a" : "#fff",
          color: darkMode ? "#f0f0f0" : "inherit",
        }}
        elevation={4}
      >
        <Box sx={{ bgcolor: "#027d44", p: 2 }}>
          <Typography variant="h6" color="#fff" fontWeight="bold">
            Hộp thư khách
          </Typography>
        </Box>

        <List sx={{ flex: 1, overflowY: "auto" }}>
          {conversations.map((conv) => {
            const lastMsg = conv.messages[conv.messages.length - 1]?.content ?? "";
            return (
              <ListItem
                key={conv.key}
                button
                onClick={() => {
                  setActiveKey(conv.key);
                  setUnread((prev) => ({ ...prev, [conv.key]: false }));
                }}
                sx={{
                  bgcolor:
                    activeKey === conv.key
                      ? darkMode
                        ? "rgba(2,125,68,0.2)"
                        : "rgba(2,125,68,0.1)"
                      : darkMode
                      ? "#2c2c3a"
                      : "#fff",
                  borderBottom: darkMode ? "1px solid #444" : "1px solid #eee",
                  color: darkMode ? "#f0f0f0" : "inherit",
                }}
              >
                <ListItemAvatar>
                  <Badge
                    color="error"
                    variant="dot"
                    invisible={!unread[conv.key]}
                    overlap="circular"
                  >
                    <Avatar src="/images/default.jpg" />
                  </Badge>
                </ListItemAvatar>
                <ListItemText
                  primary={<Typography fontWeight="bold">{conv.customerName}</Typography>}
                  secondary={
                    <Typography
                      noWrap
                      sx={{ fontSize: 18, color: darkMode ? "#ccc" : "#555" }}
                    >
                      {lastMsg}
                    </Typography>
                  }
                />
              </ListItem>
            );
          })}
        </List>
      </Paper>

      {/* Chat window */}
      <Paper
        sx={{
          flex: 1,
          borderRadius: 2,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          bgcolor: darkMode ? "#1e1e2e" : "#fff",
          color: darkMode ? "#f0f0f0" : "inherit",
        }}
        elevation={4}
      >
        {activeConv ? (
          <StaffChatWindow conversation={activeConv} staffId={staffId} darkMode={darkMode} />
        ) : (
          <Box
            sx={{
              p: 4,
              fontSize: "2em",
              margin: "auto",
              textAlign: "center",
              color: darkMode ? "#888" : "#777",
            }}
          >
            👉 Chọn khách để bắt đầu chat
          </Box>
        )}
      </Paper>
    </Box>
  );
}
