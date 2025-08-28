import React from "react";
import { Box, Typography, Paper } from "@mui/material";

interface ContentProps {
  selectedMenu: string;
}

const contentTopOffset = 64; // bằng chiều cao AppBar

const Content: React.FC<ContentProps> = ({ selectedMenu }) => {
  return (
    <Box
      component="main"
      flex={1}
      p={3}
      mt={`${contentTopOffset}px`}
      overflow="auto"
    >
      <Typography variant="h4" gutterBottom>
        {selectedMenu || "Chọn menu"}
      </Typography>
      <Paper elevation={3} sx={{ p: 2 }}>
        Nội dung cho: {selectedMenu || "Chọn menu"}
      </Paper>
    </Box>
  );
};

export default Content;
