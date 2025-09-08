"use client";

import React, { useState } from "react";
import { Box, Container, Paper, useTheme, alpha } from "@mui/material";
import BackButton from "./common/BackButton";
import LogoBrand from "./common/LogoBrand";
import LeftPanel from "./common/LeftPanel";
import RightPanel from "./common/RightPanel";

export default function AuthContainer() {
  const [isLogin, setIsLogin] = useState(true);
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        background: isDark
          ? `linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 25%, #2d5a3d 50%, #1a4a2c 75%, #0d1f11 100%)`
          : `linear-gradient(135deg, #f0fdf4 0%, #dcfce7 25%, #bbf7d0 50%, #86efac 75%, #22c55e 100%)`,
      }}
    >
      {/* Back button & logo */}
      <Box sx={{ position: "absolute", top: 24, left: 24, zIndex: 10 }}>
        <BackButton />
      </Box>
      <Box sx={{ position: "absolute", top: 24, right: 24, zIndex: 10 }}>
        <LogoBrand />
      </Box>

      <Container
        maxWidth={false} // full width
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
        }}
      >
        <Paper
          elevation={24}
          sx={{
            width: { xs: "85%", md: "60vw" }, // mobile: 95%, desktop: 3/4 màn hình
            minHeight: 800,
            borderRadius: 5,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            overflow: "hidden",
            background: isDark
              ? `linear-gradient(135deg, ${alpha("#1a1a1a", 0.98)} 0%, ${alpha("#2d2d2d", 0.95)} 100%)`
              : `linear-gradient(135deg, ${alpha("#ffffff", 0.98)} 0%, ${alpha("#f8f9fa", 0.95)} 100%)`,
            backdropFilter: "blur(40px)",
            border: `2px solid ${alpha(theme.palette.primary.main, 0.15)}`,
          }}
        >
          {/* Left Panel */}
          <Box
            sx={{
              flex: { xs: "unset", md: 1 },
              width: { xs: "100%", md: "50%" },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 4,
              background: isDark
                ? alpha("#2d5a3d", 0.05)
                : alpha("#4caf50", 0.05),
            }}
          >
            <LeftPanel isLogin={isLogin} toggleLogin={() => setIsLogin(!isLogin)} />
          </Box>

          {/* Right Panel */}
          <Box
            sx={{
              flex: { xs: "unset", md: 1 },
              width: { xs: "100%", md: "50%" },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 4,
            }}
          >
            <RightPanel isLogin={isLogin} />
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
