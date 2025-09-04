"use client";

import React, { useState } from "react";
import { 
  Box, 
  Paper, 
  Typography, 
  Container, 
  useTheme, 
  alpha,
  IconButton,
  Fab
} from "@mui/material";
import { 
  motion, 
  AnimatePresence 
} from "framer-motion";
import { 
  LocalHospital,
  AutoAwesome,
  ArrowBack,
  Spa
} from "@mui/icons-material";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function AuthContainer() {
  const [isLogin, setIsLogin] = useState(true);
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const pageVariants = {
    initial: { opacity: 0, x: isLogin ? -100 : 100 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: isLogin ? 100 : -100 }
  };

  const pageTransition = {
    type: "tween" as const,
    ease: "anticipate" as const,
    duration: 0.6
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        background: isDark 
          ? `linear-gradient(135deg, 
              #0a0a0a 0%, 
              #1a1a1a 25%, 
              #2d5a3d 50%, 
              #1a4a2c 75%, 
              #0d1f11 100%)`
          : `linear-gradient(135deg, 
              #f0fdf4 0%, 
              #dcfce7 25%, 
              #bbf7d0 50%, 
              #86efac 75%, 
              #22c55e 100%)`,
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2364ce82' fill-opacity='0.03'%3E%3Cpath d='M60 60c16.569 0 30-13.431 30-30S76.569 0 60 0 30 13.431 30 30s13.431 30 30 30zM30 0c16.569 0 30 13.431 30 30S46.569 60 30 60 0 46.569 0 30 13.431 0 30 0zm60 60c16.569 0 30-13.431 30-30S106.569 0 90 0 60 13.431 60 30s13.431 30 30 30zm30 30c16.569 0 30-13.431 30-30s-13.431-30-30-30-30 13.431-30 30 13.431 30 30 30zM0 60c16.569 0 30 13.431 30 30S16.569 120 0 120s-30-13.431-30-30S-16.569 60 0 60zm60 60c16.569 0 30-13.431 30-30s-13.431-30-30-30-30 13.431-30 30 13.431 30 30 30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          opacity: 0.6,
        },
        "&::after": {
          content: '""',
          position: "absolute",
          top: "0",
          left: "0", 
          width: "100%",
          height: "100%",
          background: `radial-gradient(circle at 30% 30%, ${alpha(theme.palette.primary.main, 0.1)} 0%, transparent 50%), radial-gradient(circle at 70% 70%, ${alpha(theme.palette.secondary.main, 0.08)} 0%, transparent 50%)`,
          animation: "float 6s ease-in-out infinite",
        },
      }}
    >
      {/* Back to Home Button */}
      <Box sx={{ position: "absolute", top: 24, left: 24, zIndex: 10 }}>
        <Fab
          size="medium"
          onClick={() => window.location.href = "/dashboard"}
          sx={{
            background: `linear-gradient(135deg, ${alpha("#ffffff", 0.9)}, ${alpha("#f8f9fa", 0.9)})`,
            backdropFilter: "blur(20px)",
            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
            color: theme.palette.primary.main,
            "&:hover": {
              background: `linear-gradient(135deg, ${alpha("#ffffff", 1)}, ${alpha("#f0f0f0", 1)})`,
              transform: "scale(1.05)",
            },
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <ArrowBack />
        </Fab>
      </Box>

      {/* Logo & Brand */}
      <Box sx={{ position: "absolute", top: 24, right: 24, zIndex: 10 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <LocalHospital 
            sx={{ 
              fontSize: 32, 
              color: theme.palette.primary.main,
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
            }} 
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            Thu Cúc Clinic
          </Typography>
        </Box>
      </Box>

      <Container maxWidth="lg" sx={{ height: "100vh", display: "flex", alignItems: "center", position: "relative", zIndex: 1 }}>
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <Paper
            elevation={24}
            sx={{
              width: "100%",
              maxWidth: 900,
              height: 650, // Chiều cao cố định để tránh co giãn
              borderRadius: 5,
              background: isDark 
                ? `linear-gradient(135deg, 
                    ${alpha("#1a1a1a", 0.98)} 0%, 
                    ${alpha("#2d2d2d", 0.95)} 100%)`
                : `linear-gradient(135deg, 
                    ${alpha("#ffffff", 0.98)} 0%, 
                    ${alpha("#f8f9fa", 0.95)} 100%)`,
              backdropFilter: "blur(40px)",
              border: `2px solid ${alpha(theme.palette.primary.main, 0.15)}`,
              boxShadow: `
                0 32px 64px ${alpha(theme.palette.primary.main, 0.12)},
                0 16px 32px ${alpha(theme.palette.primary.main, 0.08)},
                inset 0 1px 0 ${alpha("#ffffff", 0.1)}
              `,
              position: "relative",
              overflow: "hidden",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 6,
                background: `linear-gradient(90deg, 
                  ${theme.palette.primary.main} 0%, 
                  ${theme.palette.secondary.main} 50%, 
                  ${theme.palette.primary.main} 100%)`,
                backgroundSize: "200% 100%",
                animation: "shimmer 3s ease-in-out infinite",
              },
              "&::after": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, ${alpha(theme.palette.primary.main, 0.03)} 180deg, transparent 360deg)`,
                pointerEvents: "none",
              },
            }}
          >
            {/* Left Panel - Welcome & Branding */}
            <Box
              sx={{
                flex: 1,
                background: isDark
                  ? `linear-gradient(135deg, 
                      ${alpha("#1a4a2c", 0.95)} 0%, 
                      ${alpha("#2d5a3d", 0.90)} 100%)`
                  : `linear-gradient(135deg, 
                      ${alpha("#64ce82", 0.08)} 0%, 
                      ${alpha("#4caf50", 0.12)} 100%)`,
                p: { xs: 4, md: 6 },
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                position: "relative",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: `url("https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  opacity: isDark ? 0.08 : 0.03,
                  borderRadius: "20px 0 0 20px",
                },
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.05)}, transparent, ${alpha(theme.palette.secondary.main, 0.05)})`,
                  borderRadius: "20px 0 0 20px",
                },
              }}
            >
              <Box sx={{ position: "relative", zIndex: 1 }}>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
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
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          top: -2,
                          left: -2,
                          right: -2,
                          bottom: -2,
                          borderRadius: "50%",
                          background: `conic-gradient(from 0deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                          zIndex: -1,
                          animation: "rotate 3s linear infinite",
                        },
                      }}
                    >
                      <Spa 
                        sx={{ 
                          fontSize: 40, 
                          color: theme.palette.primary.main,
                          filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))",
                        }} 
                      />
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
                        filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
                      }}
                    >
                      Chào mừng bạn
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: theme.palette.text.secondary,
                        fontWeight: 500,
                        mb: 2,
                        lineHeight: 1.6,
                        maxWidth: 280,
                      }}
                    >
                      {isLogin 
                        ? "Đăng nhập để trải nghiệm dịch vụ chăm sóc da chuyên nghiệp nhất"
                        : "Tham gia cộng đồng để có làn da khỏe mạnh và rạng rỡ tự nhiên"
                      }
                    </Typography>
                  </Box>
                </motion.div>

                {/* Features List */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Box sx={{ textAlign: "left", maxWidth: 280 }}>
                    {[
                      { text: "Công nghệ tiên tiến", icon: "🚀" },
                      { text: "Bác sĩ chuyên nghiệp", icon: "👨‍⚕️" },  
                      { text: "Giải pháp cá nhân", icon: "🎯" },
                      { text: "10+ năm kinh nghiệm", icon: "🏆" },
                    ].map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ x: -30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            mb: 1.5,
                            p: 1.5,
                            borderRadius: 2,
                            background: alpha(theme.palette.primary.main, 0.06),
                            border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
                            backdropFilter: "blur(10px)",
                            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                            cursor: "pointer",
                            "&:hover": {
                              background: alpha(theme.palette.primary.main, 0.12),
                              transform: "translateX(8px) scale(1.02)",
                              boxShadow: `0 4px 15px ${alpha(theme.palette.primary.main, 0.2)}`,
                            }
                          }}
                        >
                          <Box
                            sx={{
                              fontSize: "1rem",
                              mr: 1.5,
                              minWidth: 24,
                              textAlign: "center",
                            }}
                          >
                            {feature.icon}
                          </Box>
                          <Typography
                            variant="body2"
                            sx={{
                              color: theme.palette.text.primary,
                              fontWeight: 600,
                              flex: 1,
                              fontSize: "0.85rem",
                            }}
                          >
                            {feature.text}
                          </Typography>
                        </Box>
                      </motion.div>
                    ))}
                  </Box>
                </motion.div>

                {/* Switch Button */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <Box sx={{ mt: 3 }}>
                    <Typography
                      variant="body2"
                      sx={{ color: theme.palette.text.secondary, mb: 1.5 }}
                    >
                      {isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?"}
                    </Typography>
                    <Fab
                      size="small"
                      variant="extended"
                      onClick={() => setIsLogin(!isLogin)}
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
                </motion.div>
              </Box>
            </Box>

            {/* Right Panel - Form */}
            <Box
              sx={{
                flex: 1,
                p: { xs: 3, md: 4 },
                display: "flex",
                flexDirection: "column",
                position: "relative",
                overflowY: "auto", // Cho phép scroll dọc
                maxHeight: "100%", // Giới hạn chiều cao
              }}
            >
              <Box sx={{ 
                width: "100%", 
                maxWidth: 350,
                margin: "auto",
                my: "auto", // Căn giữa theo chiều dọc khi không cần scroll
              }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isLogin ? "login" : "register"}
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <Box sx={{ 
                      mb: 3, 
                      textAlign: "center",
                      position: "sticky", // Sticky để tiêu đề luôn hiển thị khi scroll
                      top: 0,
                      background: "inherit", // Kế thừa background từ parent
                      backdropFilter: "blur(10px)",
                      zIndex: 10,
                      py: 1, // Padding nhỏ cho tiêu đề
                    }}>
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: 700,
                          color: theme.palette.text.primary,
                          mb: 1,
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {isLogin ? "Đăng nhập" : "Đăng ký"}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: theme.palette.text.secondary,
                          fontWeight: 500,
                        }}
                      >
                        {isLogin 
                          ? "Nhập thông tin để truy cập tài khoản"
                          : "Điền thông tin để bắt đầu"
                        }
                      </Typography>
                    </Box>

                    {isLogin ? (
                      <LoginForm />
                    ) : (
                      <Box sx={{ 
                        maxHeight: "50vh", // Giảm chiều cao để có chỗ cho header
                        overflow: "auto", 
                        pr: 1,
                        "&::-webkit-scrollbar": {
                          width: "6px",
                        },
                        "&::-webkit-scrollbar-track": {
                          background: "rgba(0,0,0,0.1)",
                          borderRadius: "10px",
                        },
                        "&::-webkit-scrollbar-thumb": {
                          background: theme.palette.primary.main,
                          borderRadius: "10px",
                          "&:hover": {
                            background: theme.palette.primary.dark,
                          },
                        },
                      }}>
                        <RegisterForm onSubmit={async (data) => console.log("Register:", data)} />
                      </Box>
                    )}
                  </motion.div>
                </AnimatePresence>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Container>

      {/* CSS cho animation */}
      <style jsx global>{`
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(100, 206, 130, 0.3); }
          50% { box-shadow: 0 0 40px rgba(100, 206, 130, 0.6); }
        }
      `}</style>
    </Box>
  );
}
