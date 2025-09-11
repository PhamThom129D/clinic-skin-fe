"use client";

import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

// Ví dụ dữ liệu thống kê
const data = [
  { date: "01-09", value: 400 },
  { date: "02-09", value: 300 },
  { date: "03-09", value: 500 },
  { date: "04-09", value: 200 },
  { date: "05-09", value: 450 },
  { date: "06-09", value: 600 },
  { date: "07-09", value: 550 },
];

const ChartSection: React.FC<{ title?: string }> = ({ title = "Biểu đồ thống kê" }) => {
  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2, width: "100%", mb: 8 }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Box sx={{ width: "100%", height: 500 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#5e72e4" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default ChartSection;
