"use client";
import React, { useEffect, useState } from "react";
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
import {
  Notifications as NotificationsIcon,
  EventNote as EventNoteIcon,
  Science as ScienceIcon,
  ChatBubbleOutline as ChatBubbleOutlineIcon,
} from "@mui/icons-material";
import { fetchInbox, markAsRead } from "@/services/chatbox";

interface Notification {
  id: string;
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

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getIcon = (type: string) => {
    switch (type) {
      case "promotion": return <NotificationsIcon color="primary" />;
      case "appointment": return <EventNoteIcon color="secondary" />;
      case "result": return <ScienceIcon sx={{ color: "error.main" }} />;
      case "chat": return <ChatBubbleOutlineIcon sx={{ color: "info.main" }} />;
      default: return <NotificationsIcon />;
    }
  };

  const formatTime = (ts: number) => {
    const diff = Date.now() - ts;
    if (diff < 60000) return "Vừa xong";
    if (diff < 3600000) return `${Math.floor(diff / 60000)} phút trước`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)} giờ trước`;
    return `${Math.floor(diff / 86400000)} ngày trước`;
  };

  const loadNotifications = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const inbox = await fetchInbox(userId);

      const notifs: Notification[] = inbox.map(conv => {
        const lastMsg = conv.messages?.[conv.messages.length - 1];
        return {
          id: conv.key,
          title: lastMsg?.content || "Tin nhắn mới",
          type: "chat",
          time: lastMsg?.sentAt || Date.now(),
          isRead: true, 
          displayName: "Thu Cúc Clinic",
        };
      });

      setNotifications(notifs.sort((a, b) => b.time - a.time));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => { if (userId) loadNotifications(); }, [userId]);
  useEffect(() => { if (open && userId) loadNotifications(); }, [open]);

  // ✅ Update unreadCount safely after state update
  useEffect(() => {
    onUnreadCountChange(unreadCount);
  }, [unreadCount, onUnreadCountChange]);

  useEffect(() => {
    const handler = (e: any) => {
      const msg = e.detail;

      if (Number(msg.receiverId) !== Number(userId)) return;

      setNotifications(prev => {
        const conversationId = msg.conversationId || `user-${msg.senderId}-shop`;

        const newNotif: Notification = {
          id: conversationId,
          title: msg.content || "Tin nhắn mới",
          type: "chat",
          time: Date.now(),
          isRead: false,
          displayName: "Thu Cúc Clinic",
        };

        const filtered = prev.filter(n => n.id !== conversationId);
        return [newNotif, ...filtered];
      });
    };

    window.addEventListener("newMessage", handler);
    return () => window.removeEventListener("newMessage", handler);
  }, [userId]);

  const handleClick = async (notif: Notification) => {
    if (!userId) return;
    try {
      await markAsRead(notif.id, userId);

      setNotifications(prev =>
        prev.map(n => n.id === notif.id ? { ...n, isRead: true } : n)
      );
    } catch (err) {
      console.error("❌ markAsRead thất bại:", err);
    }
    onClose();

    if (notif.type === "chat") {
      window.dispatchEvent(
        new CustomEvent("openChatBox", {
          detail: { conversationId: notif.id }
        })
      );
    }
  };

  useEffect(() => {
    const handler = (e: any) => {
      const { userId: targetId } = e.detail;
      if (Number(targetId) !== Number(userId)) return;

      setNotifications(prev =>
        prev.map(n => ({ ...n, isRead: true }))
      );
    };

    window.addEventListener("allNotificationsRead", handler);
    return () => window.removeEventListener("allNotificationsRead", handler);
  }, [userId]);


  return (
    <Popover
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      slotProps={{
        paper: {
          sx: {
            mt: 2.5, width: 400, maxHeight: 420,
            borderRadius: 2, display: "flex",
            flexDirection: "column", overflow: "hidden"
          }
        }
      }}
    >
      <Stack sx={{ flexGrow: 1 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 2, pt: 1 }}>
          <Typography variant="h6" fontWeight="bold">Thông báo</Typography>
          {unreadCount > 0 && (
            <Badge badgeContent={unreadCount} color="error">
              <NotificationsIcon />
            </Badge>
          )}
        </Stack>

        <Stack spacing={1} sx={{ p: 1, flexGrow: 1, overflowY: "auto" }}>
          {loading ? (
            <Box sx={{ py: 3, textAlign: "center" }}>
              <CircularProgress size={24} />
            </Box>
          ) : notifications.length === 0 ? (
            <Typography sx={{ py: 2, textAlign: "center" }}>
              Không có thông báo
            </Typography>
          ) : (
            notifications.map(n => (
              <Button
                key={n.id}
                fullWidth
                onClick={() => handleClick(n)}
                sx={{
                  justifyContent: "flex-start",
                  borderRadius: 2,
                  textAlign: "left",
                  p: 1.5,
                  backgroundColor: n.isRead
                    ? "background.paper"
                    : theme.palette.action.selected
                }}
              >
                <Stack direction="row" spacing={1.5} alignItems="flex-start" width="100%">
                  <Badge
                    color="error"
                    variant="dot"
                    overlap="circular"
                    invisible={n.isRead}
                  >
                    {getIcon(n.type)}
                  </Badge>

                  <Box flexGrow={1} minWidth={0}>
                    <Typography
                      variant="subtitle2"
                      fontWeight="bold"
                      sx={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                      }}
                    >
                      {n.displayName}
                    </Typography>

                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography
                        variant="body2"
                        sx={{
                          flexGrow: 1,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis"
                        }}
                      >
                        {n.title}
                      </Typography>

                      <Typography variant="caption" sx={{ ml: 1 }}>
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
            py: 1,
            fontWeight: "bold",
            borderTop: `1px solid ${theme.palette.divider}`
          }}
          onClick={onClose}
        >
          Đóng
        </Button>
      </Stack>
    </Popover>
  );
};
