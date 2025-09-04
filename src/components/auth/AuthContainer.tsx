"use client";

import React, { useState } from "react";
import { Box, Paper, Typography, Link } from "@mui/material";
import { motion } from "framer-motion";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function AuthContainer() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#c1f6ffff", 
      }}
    >
      <Paper
        sx={{
          width: "100%",
          maxWidth: 1600,
          height: 990,
          borderRadius: 4,
          boxShadow: 10,
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "row",
        }}
      >
        {/* RegisterForm */}
        <Box
          sx={{
            flex: 3,
            p: 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={{ width: "100%", maxWidth: 750 }}>
            <Typography
              variant="h4"
              fontWeight={700}
              color="#023e8a"
              textAlign="center"
              mb={3}
            >
              Đăng ký tài khoản
            </Typography>
            <RegisterForm onSubmit={async (data) => console.log("Register:", data)} />
          </Box>
        </Box>

        {/* LoginForm */}
        <Box
          sx={{
            flex: 2,
            p: 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={{ width: "100%", maxWidth: 420 }}>
            <Typography
              variant="h4"
              fontWeight={700}
              color="#023e8a"
              textAlign="center"
              mb={3}
            >
              Đăng nhập hệ thống
            </Typography>
            <LoginForm />
          </Box>
        </Box>

        {/* Overlay ảnh */}
        <motion.div
          aria-hidden
          animate={{ x: isLogin ? "0%" : "150%" }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            width: isLogin ? "60%" : "40%",
            zIndex: 3,
            backgroundImage:
              "url('https://i.pinimg.com/736x/3a/20/fb/3a20fb6e1617c50952612e4baceaf4ff.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: "skewX(-8deg)",
            transformOrigin: "left center",
      
            filter: "brightness(0.75)",
          }}
        />

        {/* CTA */}
        <motion.div
          animate={{ x: isLogin ? "0%" : "150%" }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            width: isLogin ? "60%" : "40%",
            zIndex: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            pointerEvents: "auto",
          }}
        >
          <Box sx={{ position: "relative", textAlign: "center", px: 3 }}>
            <Typography
              variant="h4"
              sx={{
                color: "#ffffff",
                fontWeight: 700,
                mb: 2,
                textShadow: "2px 2px 8px rgba(0,0,0,0.4)",
              }}
            >
              {isLogin ? "Bạn chưa có tài khoản?" : "Bạn đã có tài khoản?"}
            </Typography>
            <Typography
              sx={{
                color: "#ffffff",
                opacity: 0.9,
                mb: 3,
                textShadow: "1px 1px 6px rgba(0,0,0,0.3)",
              }}
            >
              {isLogin
                ? "Nhấn để tạo tài khoản mới và bắt đầu sử dụng hệ thống."
                : "Nhấn để quay về đăng nhập bằng tài khoản hiện có."}
            </Typography>
            <Link
              component="button"
              onClick={() => setIsLogin((v) => !v)}
              sx={{
                display: "inline-block",
                color: "#ceee41ff",
                fontWeight: 700,
                fontSize: "1.4rem",
                textDecoration: "underline",
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": { color: "#ffffff", textShadow: "2px 2px 6px rgba(0,0,0,0.5)" },
              }}
            >
              {isLogin ? "Đăng ký ngay" : "Đăng nhập"}
            </Link>
          </Box>
        </motion.div>
      </Paper>
    </Box>
  );
}
