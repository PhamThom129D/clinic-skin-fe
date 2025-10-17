"use client";
import React, { useState, useEffect } from "react";
import {
  Popover,
  Stack,
  Typography,
  Button,
  Box,
  Badge,
  useTheme,
  CircularProgress,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ScienceIcon from "@mui/icons-material/Science";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

import { fetchInbox, markAsRead } from "@/services/chatbox";
import { connectMessageSocket } from "@/services/chatSocket";
import { id } from "date-fns/locale";

interface Notification {
  id: string; // conversationId
  title: string;
  type: string;
  time: number;
  isRead: boolean;
  displayName?: string;
}


interface NotificationsDropdownProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onUnreadCountChange: (count: number) => void;
  userId: number | null;
}

const getIconForNotificationType = (type: string) => {
  switch (type) {
    case "promotion":
      return <NotificationsIcon color="primary" />;
    case "appointment":
      return <EventNoteIcon color="secondary" />;
    case "result":
      return <ScienceIcon sx={{ color: "error.main" }} />;
    case "chat":
      return <ChatBubbleOutlineIcon sx={{ color: "info.main" }} />;
    default:
      return <NotificationsIcon />;
  }
};

export const NotificationsDropdown: React.FC<NotificationsDropdownProps> = ({
  anchorEl,
  onClose,
  onUnreadCountChange,
  userId,
}) => {
  const theme = useTheme();
  const open = Boolean(anchorEl);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);

  const formatTime = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return "Vừa xong";
    if (minutes < 60) return `${minutes} phút trước`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} giờ trước`;
    const days = Math.floor(hours / 24);
    return `${days} ngày trước`;
  };

  const loadNotifications = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const inbox = await fetchInbox(userId);
      setNotifications((prev) => {
        const updated = [...prev];
        inbox.forEach((conv) => {
          const lastMsg =
            conv.messages && conv.messages.length
              ? conv.messages[conv.messages.length - 1]
              : null;
          if (!lastMsg) return;
          const conversationKey = conv.key.startsWith("user-")
            ? conv.key
            : `user-${conv.key}`;

          console.log("🟡 Conversation key:", conv.key);

          const existsIndex = updated.findIndex((n) => n.id === conv.key);
          const newNotif: Notification = {
            id: conversationKey,
            title: lastMsg.content,
            type: "chat",
            time: lastMsg.sentAt,
            isRead: existsIndex !== -1 ? updated[existsIndex].isRead : false,
            displayName: conv.displayName || "Thu Cúc Clinic",
          };

          console.log("vdsuf", id)

          if (existsIndex !== -1) updated[existsIndex] = newNotif;
          else updated.push(newNotif);
        });
        return updated.sort((a, b) => b.time - a.time);
      });
    } catch (err) {
      console.error("❌ Lỗi tải thông báo:", err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (open) loadNotifications();
  }, [open, userId]);

  useEffect(() => {
    const count = notifications.filter((n) => !n.isRead).length;
    onUnreadCountChange(count);
  }, [notifications, onUnreadCountChange]);

  useEffect(() => {
    if (!userId) return;
    const disconnect = connectMessageSocket(String(userId), (msg) => {
      const conversationId = msg.conversationId || `user-${msg.senderId}-shop`;
      setNotifications(prev => {
        const updated = [...prev];
        const existsIndex = updated.findIndex(n => n.id === conversationId);

        const newNotif: Notification = {
          id: conversationId,
          title: msg.content || "Tin nhắn mới",
          type: "chat",
          time: Date.now(),
          isRead: false,
          displayName: "Thu Cúc Clinic",
        };

        if (existsIndex !== -1) updated[existsIndex] = newNotif;
        else updated.unshift(newNotif);

        return updated.sort((a, b) => b.time - a.time);
      });
    });
    return disconnect;
  }, [userId]);

  const handleClick = async (notif: Notification) => {
    if (!userId) return;
    try {
      await markAsRead(notif.id, userId);
      setNotifications((prev) =>
        prev.map((n) => (n.id === notif.id ? { ...n, isRead: true } : n))
      );
    } catch (err) {
      console.error("Không thể đánh dấu đã đọc:", err);
    }
    onClose();
  };

  return (
    <Popover
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      disableScrollLock
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      slotProps={{
        paper: {
          sx: {
            mt: 2.5,
            width: 400,
            maxHeight: 420,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          },
        },
      }}
    >
      <Stack sx={{ flexGrow: 1 }}>
        <Typography variant="h6" sx={{ px: 2, pt: 1, fontWeight: "bold" }}>
          Thông báo
        </Typography>

        <Stack
          spacing={1}
          sx={{
            p: 1,
            flexGrow: 1,
            overflowY: "auto",
            "&::-webkit-scrollbar": { width: "0.4em" },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0,0,0,.1)",
              borderRadius: "5px",
            },
          }}
        >
          {loading ? (
            <Box sx={{ textAlign: "center", py: 3 }}>
              <CircularProgress size={24} />
            </Box>
          ) : notifications.length === 0 ? (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "center", py: 2 }}
            >
              Không có thông báo
            </Typography>
          ) : (
            notifications.map((n) => (
              <Button
                key={n.id}
                fullWidth
                onClick={() => handleClick(n)}
                sx={{
                  justifyContent: "flex-start",
                  textAlign: "left",
                  textTransform: "none",
                  borderRadius: 2,
                  p: 1.5,
                  backgroundColor: n.isRead
                    ? "background.paper"
                    : theme.palette.action.selected,
                  "&:hover": { backgroundColor: theme.palette.action.hover },
                }}
              >
                <Stack direction="row" spacing={1.5} alignItems="flex-start" width="100%">
                  <Badge
                    color="error"
                    variant="dot"
                    overlap="circular"
                    invisible={n.isRead}
                  >
                    {getIconForNotificationType(n.type)}
                  </Badge>

                  <Box flexGrow={1} minWidth={0}>
                    {/* Dòng 1: Tên người gửi */}
                    <Typography
                      variant="subtitle2"
                      fontWeight="bold"
                      color="text.primary"
                      sx={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {n.displayName || "Thu Cúc Clinic"}
                    </Typography>

                    {/* Dòng 2: Tin nhắn + thời gian */}
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          flexGrow: 1,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {n.displayName === "Bạn"
                          ? `Bạn: ${n.title}`
                          : n.title}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.disabled"
                        sx={{ flexShrink: 0, ml: 1 }}
                      >
                        {formatTime(n.time)}
                      </Typography>
                    </Stack>
                  </Box>
                </Stack>
              </Button>
            ))
          )}
        </Stack>

        <Button
          fullWidth
          sx={{
            justifyContent: "center",
            textTransform: "none",
            fontWeight: "bold",
            py: 1,
            borderTop: `1px solid ${theme.palette.divider}`,
            color: theme.palette.primary.main,
            "&:hover": { backgroundColor: theme.palette.action.hover },
          }}
          onClick={onClose}
        >
          Đóng
        </Button>
      </Stack>
    </Popover>
  );
};
