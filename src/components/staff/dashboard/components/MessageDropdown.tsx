"use client";

import React, { useState, useEffect } from "react";
import { Popover, Stack, Typography, Button, Box, Avatar, Badge, useTheme } from "@mui/material";

// Fake messages kiểu Messenger
const initialMessages = [
  { id: 1, sender: "Dr. Smith", avatar: "/avatars/dr_smith.png", content: "Your report is ready", time: "1 giờ trước", isRead: false },
  { id: 2, sender: "Admin", avatar: "/avatars/admin.png", content: "New appointment scheduled", time: "2 ngày trước", isRead: false },
  { id: 3, sender: "Nurse Lisa", avatar: "/avatars/nurse.png", content: "Reminder: check lab results", time: "1 tuần trước", isRead: true },
  { id: 4, sender: "Dr. John", avatar: "/avatars/dr_john.png", content: "Lab results updated", time: "2 tuần trước", isRead: true },
];

// Component 1 message
const MessageItem = ({
  sender,
  avatar,
  content,
  time,
  isRead,
}: {
  sender: string;
  avatar: string;
  content: string;
  time: string;
  isRead: boolean;
}) => {
  const theme = useTheme();

  return (
    <Button
      fullWidth
      sx={{
        justifyContent: "flex-start",
        textAlign: "left",
        textTransform: "none",
        p: 1,
        borderRadius: 2,
        backgroundColor: isRead ? "background.paper" : theme.palette.action.selected,
        "&:hover": { backgroundColor: theme.palette.action.hover },
      }}
    >
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Avatar src={avatar} sx={{ width: 40, height: 40 }} />
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
            {sender}
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
            {content}
          </Typography>
        </Box>
        <Typography variant="caption" color="text.disabled" sx={{ flexShrink: 0, ml: 0.5 }}>
          {time}
        </Typography>
      </Stack>
    </Button>
  );
};

interface MessageDropdownProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
}

export default function MessageDropdown({ anchorEl, onClose }: MessageDropdownProps) {
  const theme = useTheme();
  const open = Boolean(anchorEl);
  const [messages, setMessages] = useState(initialMessages);

  // Tính số tin nhắn chưa đọc
  const unreadCount = messages.filter(msg => !msg.isRead).length;

  // Khi mở dropdown => đánh dấu tất cả đã đọc
  useEffect(() => {
    if (open) {
      setMessages(prev => prev.map(msg => ({ ...msg, isRead: true })));
    }
  }, [open]);

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
            maxHeight: 400,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          },
        },
      }}
    >
      <Stack sx={{ flexGrow: 1, overflow: "hidden" }}>
        <Typography variant="h6" sx={{ px: 2, pt: 1, fontWeight: "bold" }}>
          Tin nhắn {unreadCount > 0 && `(${unreadCount})`}
        </Typography>

        {/* Scrollable list */}
        <Stack
          spacing={1}
          sx={{
            p: 1,
            flexGrow: 1,
            overflowY: "auto",
            "&::-webkit-scrollbar": { width: "0.4em" },
            "&::-webkit-scrollbar-thumb": { backgroundColor: "rgba(0,0,0,.1)", borderRadius: "5px" },
          }}
        >
          {messages.map(msg => (
            <MessageItem key={msg.id} {...msg} />
          ))}
        </Stack>

        {/* Fixed "View All Messages" button */}
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
          Xem tất cả 
        </Button>
      </Stack>
    </Popover>
  );
}
