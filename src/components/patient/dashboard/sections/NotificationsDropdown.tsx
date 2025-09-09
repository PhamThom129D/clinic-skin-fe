"use client";
import React from 'react';
import {
  Box,
  Button,
  Popover,
  Stack,
  Typography,
  useTheme
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ScienceIcon from "@mui/icons-material/Science";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

// Dữ liệu mẫu thông báo
const notifications = [
  {
    id: 1,
    title: "Ưu đãi đặc biệt: Giảm 20% dịch vụ chăm sóc da chuyên sâu!",
    type: "promotion",
    time: "10 giờ trước",
  },
  {
    id: 2,
    title: "Xác nhận lịch hẹn khám da liễu vào 10:00, 15/07.",
    type: "appointment",
    time: "2 ngày trước",
  },
  {
    id: 3,
    title: "Kết quả phân tích da của bạn đã có.",
    type: "result",
    time: "1 tuần trước",
  },
  {
    id: 4,
    title: "Bác sĩ đã trả lời câu hỏi của bạn.",
    type: "chat",
    time: "2 tuần trước",
  },
  {
    id: 5,
    title: "Tin tức: Mở rộng dịch vụ Laser Tái Tạo Da mới nhất.",
    type: "promotion",
    time: "3 tuần trước",
  },
  {
    id: 6,
    title: "Nhắc nhở: Lịch hẹn của bạn vào 14:00 hôm nay.",
    type: "appointment",
    time: "1 tháng trước",
  },
];

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

const NotificationItem = ({ title, type, time }: { title: string, type: string, time: string }) => {
  return (
    <Button
      fullWidth
      sx={{
        justifyContent: "flex-start",
        textAlign: "left",
        textTransform: "none",
        p: 1.5,
        borderRadius: 2,
        backgroundColor: "background.paper",
        boxShadow: 1,
        "&:hover": {
          backgroundColor: "action.hover",
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
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {title}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {time}
          </Typography>
        </Box>
      </Stack>
    </Button>
  );
};

interface NotificationsDropdownProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
}

export const NotificationsDropdown: React.FC<NotificationsDropdownProps> = ({ anchorEl, open, onClose }) => {
  const theme = useTheme();

  return (
    <Popover
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      disableScrollLock
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      slotProps={{
        paper: { sx: { mt: 2.5, width: 300, maxHeight: 400, borderRadius: 2 } },
      }}
    >
      <Stack
        spacing={1}
        sx={{
          p: 1,
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "0.4em",
          },
          "&::-webkit-scrollbar-track": {
            boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
            webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,.1)",
            borderRadius: "5px",
          },
        }}
      >
        {notifications.map((notif) => (
          <NotificationItem key={notif.id} title={notif.title} type={notif.type} time={notif.time} />
        ))}
        <Button
          fullWidth
          sx={{
            justifyContent: "center",
            textTransform: "none",
            fontWeight: "bold",
            mt: 1,
            py: 1,
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