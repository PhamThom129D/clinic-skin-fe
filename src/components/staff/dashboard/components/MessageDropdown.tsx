"use client";

import React, { useState, useEffect } from "react";
import {
  Popover,
  Stack,
  Typography,
  Button,
  Box,
  Avatar,
  Badge,
  useTheme,
  CircularProgress,
} from "@mui/material";
import { fetchInbox, Conversation, markAsRead } from "@/services/chatbox";
import { connectChatSocket } from "@/services/chatSocket";
import { getAccountById } from "@/services/accountService";

interface MessageDropdownProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onSelectMenu: (menu: string) => void;
  onUnreadCountChange: (count: number) => void;
}

export default function MessageDropdown({
  anchorEl,
  onClose,
  onSelectMenu,
  onUnreadCountChange
}: MessageDropdownProps) {
  const theme = useTheme();
  const open = Boolean(anchorEl);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [unread, setUnread] = useState<Record<string, boolean>>({});
  const [guestMap, setGuestMap] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);
  const staffId = 1;

  const loadInbox = async () => {
    if (!staffId) return;
    console.log("userId", staffId)

    try {
      setLoading(true);
      const data = await fetchInbox(staffId);
      console.log("✅ Dữ liệu inbox nhận được:", data);


      setConversations((prev) => {
        const newUnread: Record<string, boolean> = { ...unread };
        const newGuestMap: Record<string, number> = { ...guestMap };

        const existingMax =
          Object.values(newGuestMap).length > 0
            ? Math.max(...Object.values(newGuestMap))
            : 0;
        let nextIndex = existingMax + 1;

        const unassignedGuests = data
          .filter((c) => c.key.startsWith("guest-") && !newGuestMap[c.key])
          .map((c) => {
            const firstMsg = c.messages?.[0];
            const firstAt = firstMsg?.sentAt ?? Number.POSITIVE_INFINITY;
            return { key: c.key, firstAt };
          });
        console.log("🧩 Danh sách khách chưa gán số:", unassignedGuests);
        unassignedGuests.sort((a, b) => a.firstAt - b.firstAt);
        for (const g of unassignedGuests) {
          newGuestMap[g.key] = nextIndex++;
        }

        const merged = data.map((conv) => {
          const lastMsg =
            conv.messages && conv.messages.length
              ? conv.messages[conv.messages.length - 1]
              : null;

          const existed = prev.find((c) => c.key === conv.key);
          let displayName = conv.customerName;

          if (conv.key.startsWith("user-")) {
            const userId = Number(conv.key.replace("user-", ""));
            getAccountById(userId)
              .then((acc) => {
                if (acc?.fullName) {
                  setConversations((prevList) =>
                    prevList.map((c) =>
                      c.key === conv.key
                        ? { ...c, customerName: acc.fullName }
                        : c
                    )
                  );
                }
              })
              .catch(() => { });
          }
          else if (conv.key.startsWith("guest-")) {
            const num = newGuestMap[conv.key] ?? (newGuestMap[conv.key] = nextIndex++);
            displayName = `Khách vãng lai ${num}`;
          }

          if (!existed) {
            if (lastMsg && lastMsg.senderId !== staffId)
              newUnread[conv.key] = true;
            else newUnread[conv.key] = false;
          } else {
            newUnread[conv.key] = unread[conv.key] ?? false;
            const prevLast =
              existed.messages && existed.messages.length
                ? existed.messages[existed.messages.length - 1]
                : null;
            if (
              lastMsg &&
              lastMsg.senderId !== staffId &&
              prevLast?.sentAt !== lastMsg.sentAt
            ) {
              newUnread[conv.key] = true;
            }
          }

          return { ...conv, customerName: displayName };
        });

        setGuestMap(newGuestMap);
        setUnread(newUnread);

        const unreadCount = Object.values(newUnread).filter(Boolean).length;
        onUnreadCountChange(unreadCount);

        return merged;
      });
    } catch (err) {
      console.error("❌ Lỗi tải tin nhắn:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) loadInbox();
  }, [open]);

  useEffect(() => {
    if (!staffId) return;
    const disconnect = connectChatSocket(staffId, () => loadInbox());
    return () => disconnect();
  }, [staffId]);

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
          Tin nhắn
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
          ) : conversations.length > 0 ? (
            conversations.map((conv) => {
              const lastMsg = conv.messages[conv.messages.length - 1];
              return (
                <Button
                  key={conv.key}
                  fullWidth
                  onClick={async () => {
                    onSelectMenu("Tư vấn trực tuyến");
                    try {
                      const res = await markAsRead(conv.key, staffId);
                      console.log("Đánh dấu đã đọc:", res);
                      const newUnread = { ...unread, [conv.key]: false };
                      setUnread(newUnread);
                      const unreadCount = Object.values(newUnread).filter(Boolean).length;
                      onUnreadCountChange(unreadCount);
                    } catch (err) {
                      console.error("Không thể đánh dấu đã đọc:", err);
                    }
                    onClose();
                  }}

                  sx={{
                    justifyContent: "flex-start",
                    textAlign: "left",
                    textTransform: "none",
                    borderRadius: 2,
                    p: 1,
                    backgroundColor: unread[conv.key]
                      ? theme.palette.action.selected
                      : "background.paper",
                    "&:hover": { backgroundColor: theme.palette.action.hover },
                  }}
                >
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Badge
                      color="error"
                      variant="dot"
                      overlap="circular"
                      invisible={!unread[conv.key]}
                    >
                      <Avatar src="/avatars/default_user.png" sx={{ width: 40, height: 40 }} />
                    </Badge>
                    <Box flexGrow={1} minWidth={0}>
                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        sx={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {conv.customerName}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {lastMsg?.content ?? ""}
                      </Typography>
                    </Box>
                    {lastMsg && (
                      <Typography
                        variant="caption"
                        color="text.disabled"
                        sx={{ flexShrink: 0, ml: 0.5 }}
                      >
                        {formatTime(lastMsg.sentAt)}
                      </Typography>
                    )}
                  </Stack>
                </Button>
              );
            })
          ) : (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "center", py: 2 }}
            >
              Không có tin nhắn
            </Typography>
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
          onClick={() => {
            onSelectMenu("Tư vấn trực tuyến");
            onClose();
          }}
        >
          Xem tất cả
        </Button>

      </Stack>
    </Popover>
  );
}
