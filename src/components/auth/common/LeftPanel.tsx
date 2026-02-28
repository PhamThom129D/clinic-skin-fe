"use client";

import React from "react";
import { Box, Typography, Fab, useTheme, alpha, useMediaQuery } from "@mui/material";
import { AutoAwesome, Spa } from "@mui/icons-material";

interface LeftPanelProps {
  isLogin: boolean;
  toggleLogin: () => void;
}

export default function LeftPanel({ isLogin, toggleLogin }: LeftPanelProps) {
  const theme = useTheme();
  const isDesktop = useMediaQuery("(min-width:1024px)");

  const features = [
    { text: "Công nghệ tiên tiến", icon: "🚀" },
    { text: "Bác sĩ chuyên nghiệp", icon: "👨‍⚕️" },
    { text: "Giải pháp cá nhân", icon: "🎯" },
    { text: "10+ năm kinh nghiệm", icon: "🏆" },
  ];

  return (
    <Box
      sx={{
        flex: 1,
        p: { xs: 2, md: 6 },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        position: "relative",
        background: isDesktop
          ? `linear-gradient(135deg, ${alpha("#64ce82", 0.08)} 0%, ${alpha("#4caf50", 0.12)} 100%)`
          : "transparent",
      }}
    >
      {isDesktop ? (
        <>
          {/* Logo/Icon */}
          <Box sx={{ mb: 3 }}>
            <Box
              sx={{
                position: "relative",
                display: "inline-block",
                p: 2,
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
                border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                mb: 2,
              }}
            >
              <Spa sx={{ fontSize: 40, color: theme.palette.primary.main }} />
            </Box>

            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 1,
                letterSpacing: "-0.02em",
              }}
            >
              Chào mừng bạn
            </Typography>

            <Typography variant="body1" sx={{ color: theme.palette.text.secondary, fontWeight: 500, mb: 2, lineHeight: 1.6, maxWidth: 280 }}>
              {isLogin
                ? "Đăng nhập để trải nghiệm dịch vụ chăm sóc da chuyên nghiệp nhất"
                : "Tham gia cộng đồng để có làn da khỏe mạnh và rạng rỡ tự nhiên"}
            </Typography>
          </Box>

          {/* Features */}
          <Box sx={{ textAlign: "left", maxWidth: 280 }}>
            {features.map((feature, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 1.5,
                  p: 1.5,
                  borderRadius: 2,
                  background: alpha(theme.palette.primary.main, 0.06),
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
                  cursor: "pointer",
                  "&:hover": {
                    background: alpha(theme.palette.primary.main, 0.12),
                  },
                }}
              >
                <Box sx={{ fontSize: "1rem", mr: 1.5, minWidth: 24, textAlign: "center" }}>{feature.icon}</Box>
                <Typography variant="body2" sx={{ color: theme.palette.text.primary, fontWeight: 600, flex: 1, fontSize: "0.85rem" }}>
                  {feature.text}
                </Typography>
              </Box>
            ))}
          </Box>
        </>
      ) : null}

      {/* Nút chuyển login/register (luôn hiện, canh giữa) */}
      <Box
        sx={{
          mt: isDesktop ? 3 : 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <Fab
          size="small"
          variant="extended"
          onClick={toggleLogin}
          sx={{
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
            color: "white",
            fontWeight: 600,
            px: 3,
            fontSize: "0.8rem",
            "&:hover": {
              background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.main})`,
              transform: "scale(1.05)",
            },
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <AutoAwesome sx={{ mr: 1, fontSize: "1rem" }} />
          {isLogin ? "Đăng ký ngay" : "Đăng nhập"}
        </Fab>
      </Box>
    </Box>
  );
}
