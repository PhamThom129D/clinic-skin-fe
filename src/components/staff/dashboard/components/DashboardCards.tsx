"use client";

import React from "react";
import { Grid, Card, Typography, Avatar, Box } from "@mui/material";
import { FaUserInjured, FaCalendarCheck, FaUserMd, FaHospital, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { Sparklines, SparklinesLine } from "react-sparklines";

interface CardInfo {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
  trend?: "up" | "down";
  trendValue?: number;
  subtitle?: string;
  data?: number[];
}

const cardData: CardInfo[] = [
  {
    title: "Doctors",
    value: 247,
    icon: <FaUserMd />,
    color: "#5e72e4",
    trend: "up",
    trendValue: 95,
    subtitle: "in last 7 Days",
    data: [5, 10, 7, 12, 9, 14, 11],
  },
  {
    title: "Patients",
    value: 4178,
    icon: <FaUserInjured />,
    color: "#f5365c",
    trend: "up",
    trendValue: 25,
    subtitle: "in last 7 Days",
    data: [100, 120, 110, 130, 125, 140, 135],
  },
  {
    title: "Appointment",
    value: 12178,
    icon: <FaCalendarCheck />,
    color: "#11cdef",
    trend: "down",
    trendValue: 15,
    subtitle: "in last 7 Days",
    data: [50, 45, 60, 55, 50, 52, 48],
  },
  {
    title: "Revenue",
    value: "$55,1240",
    icon: <FaHospital />,
    color: "#2dce89",
    trend: "up",
    trendValue: 25,
    subtitle: "in last 7 Days",
    data: [5000, 5200, 5100, 5300, 5400, 5500, 5600],
  },
  // {
  //   title: "Consult Requests",
  //   value: 342,
  //   icon: <FaUserInjured />, // bạn có thể đổi icon khác
  //   color: "#ff9f43",
  //   trend: "up",
  //   trendValue: 18,
  //   subtitle: "in last 7 Days",
  //   data: [40, 50, 45, 60, 55, 70, 65],
  // }

];


const DashboardCards: React.FC = () => {
  return (
    <Box sx={{ width: "100%", p: 6 }}>
      <Grid container spacing={3}>
        {cardData.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                p: 5,
                borderRadius: 2,
                boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                transition: "transform 0.2s, box-shadow 0.2s",
                cursor: "pointer",
                height: "100%", 
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
                },
              }}
            >
              {/* Top: Icon + Title/Value */}
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Avatar sx={{ bgcolor: card.color, width: 56, height: 56, mr: 2 }}>
                  {card.icon}
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    {card.title}
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {card.value}
                  </Typography>
                </Box>
              </Box>

              {/* Trend + Chart */}
              {card.trend && card.trendValue !== undefined && (
                <Box sx={{ mt: 2, width: "100%" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: card.trend === "up" ? "#2dce89" : "#f5365c",
                      fontWeight: 500,
                      mb: 1,
                    }}
                  >
                    {card.trend === "up" ? <FaArrowUp /> : <FaArrowDown />}
                    <Typography variant="subtitle2" sx={{ ml: 0.5 }}>
                      {card.trendValue}%
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                      {card.subtitle}
                    </Typography>
                  </Box>

                  {/* Biểu đồ full width */}
                  {card.data && (
                    <Sparklines data={card.data} width={300} height={60} style={{ width: "100%" }}>
                      <SparklinesLine color={card.color} />
                    </Sparklines>
                  )}
                </Box>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DashboardCards;
