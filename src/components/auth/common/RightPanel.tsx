"use client";
import React from "react";
import { Box, useTheme } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import LoginForm from "../LoginForm";
import RegisterForm from "../RegisterForm";


interface RightPanelProps {
  isLogin: boolean;
}

export default function RightPanel({ isLogin }: RightPanelProps) {
  const theme = useTheme();

  const pageVariants = {
    initial: { opacity: 0, x: isLogin ? -100 : 100 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: isLogin ? 100 : -100 },
  };

  const pageTransition = { type: "tween" as const, ease: "anticipate" as const, duration: 0.6 };

  return (
    <Box sx={{ flex: 1, p: { xs: 3, md: 4 }, display: "flex", flexDirection: "column", position: "relative", overflowY: "auto", maxHeight: "100%" }}>
      <Box sx={{ width: "100%", maxWidth: 350, margin: "auto", my: "auto" }}>
        <AnimatePresence mode="wait">
          <motion.div key={isLogin ? "login" : "register"} initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
            {isLogin ? (
              <LoginForm />
            ) : (
              <Box sx={{ maxHeight: "50vh", overflow: "auto", pr: 1, "&::-webkit-scrollbar": { width: "6px" }, "&::-webkit-scrollbar-track": { background: "rgba(0,0,0,0.1)", borderRadius: "10px" }, "&::-webkit-scrollbar-thumb": { background: theme.palette.primary.main, borderRadius: "10px", "&:hover": { background: theme.palette.primary.dark } } }}>
                <RegisterForm onSubmit={async (data) => console.log("Register:", data)} />
              </Box>
            )}
          </motion.div>
        </AnimatePresence>
      </Box>
    </Box>
  );
}
