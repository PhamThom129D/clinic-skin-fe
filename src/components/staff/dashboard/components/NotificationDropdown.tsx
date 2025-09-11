"use client";

import React, { useState, useEffect } from "react";
import {
  Popover,
  Stack,
  Typography,
  Button,
  Box,
  useTheme,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EventNoteIcon from "@mui/icons-material/EventNote";
import AssessmentIcon from "@mui/icons-material/Assessment";

// Fake data
const initialNotifications = [
  {
    id: 1,
    title: "System Update",
    detail: "Version 2.0 installed successfully",
    type: "update",
    time: "1 giờ trước",
    isRead: false,
  },
  {
    id: 2,
    title: "New Doctor Joined",
    detail: "Dr. John joined the clinic",
    type: "staff",
    time: "2 ngày trước",
    isRead: false,
  },
  {
    id: 3,
    title: "Billing Alert",
    detail: "Invoice #12345 generated",
    type: "billing",
    time: "3 ngày trước",
    isRead: true,
  },
  {
    id: 4,
    title: "Maintenance",
    detail: "Server downtime scheduled tomorrow",
    type: "update",
    time: "4 ngày trước",
    isRead: true,
  },
  {
    id: 5,
    title: "New Staff Notice",
    detail: "Nurse Lisa joined the team",
    type: "staff",
    time: "1 tuần trước",
    isRead: true,
  },
];

// Icon theo type
const getIconForNotificationType = (type: string) => {
  switch (type) {
    case "update":
      return <NotificationsIcon color="primary" />;
    case "staff":
      return <EventNoteIcon color="secondary" />;
    case "billing":
      return <AssessmentIcon sx={{ color: "green" }} />;
    default:
      return <NotificationsIcon />;
  }
};

// Item notification
const NotificationItem = ({
  title,
  detail,
  type,
  time,
  isRead,
}: {
  title: string;
  detail: string;
  type: string;
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
        p: 1.5,
        borderRadius: 2,
        backgroundColor: isRead
          ? "background.paper"
          : theme.palette.action.selected,
        boxShadow: 1,
        "&:hover": {
          backgroundColor: theme.palette.action.hover,
        },
      }}
    >
      <Stack direction="row" spacing={1.5} alignItems="center">
        {getIconForNotificationType(type)}
        <Box flexGrow={1}>
          <Typography
            variant="body2"
            fontWeight="bold"
            sx={{
              whiteSpace: "normal",
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              whiteSpace: "normal",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {detail}
          </Typography>
          <Typography variant="caption" color="text.disabled">
            {time}
          </Typography>
        </Box>
      </Stack>
    </Button>
  );
};

interface NotificationDropdownProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
}

export default function NotificationDropdown({
  anchorEl,
  onClose,
}: NotificationDropdownProps) {
  const theme = useTheme();
  const open = Boolean(anchorEl);
  const [notifications, setNotifications] = useState(initialNotifications);

  // Khi mở dropdown => đánh dấu tất cả đã đọc
  useEffect(() => {
    if (open) {
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
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
      {/* Notifications container */}
      <Stack sx={{ flexGrow: 1, overflow: "hidden" }}>
        <Typography variant="h6" sx={{ px: 1, pt: 1, fontWeight: "bold" }}>
          Thông báo
        </Typography>

        {/* Scrollable list */}
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
          {notifications.map((noti) => (
            <NotificationItem key={noti.id} {...noti} />
          ))}
        </Stack>

        {/* Fixed "View All" button */}
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
