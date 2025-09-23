"use client";

import React from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function Page() {
 return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <Typography>Đang tải thông tin...</Typography>
      </Box>
    );
}