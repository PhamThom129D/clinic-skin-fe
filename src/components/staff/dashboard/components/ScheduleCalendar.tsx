"use client";

import React, { useState } from "react";
import { Box, Typography, Paper, Stack, Chip, Tooltip } from "@mui/material";
import { Calendar, dateFnsLocalizer, EventProps } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Locale
const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

// Interface event
interface ScheduleEvent {
  title: string;
  start: Date;
  end: Date;
  type: "Doctor" | "Nurse" | "Leave" | "Admin";
  staff: string;
  notes: string;
}

// Dữ liệu mẫu
const events: ScheduleEvent[] = [
  { title: "Ca sáng", start: new Date(2025, 8, 9, 8), end: new Date(2025, 8, 9, 16), type: "Doctor", staff: "Dr. Smith", notes: "Trực ca sáng" },
  { title: "Ca chiều", start: new Date(2025, 8, 9, 12), end: new Date(2025, 8, 9, 20), type: "Nurse", staff: "Nurse Jane", notes: "Trực ca chiều" },
  { title: "Nghỉ phép", start: new Date(2025, 8, 10, 0), end: new Date(2025, 8, 10, 23, 59), type: "Leave", staff: "Dr. Lee", notes: "Nghỉ phép" },
  { title: "Hỗ trợ tổng quát", start: new Date(2025, 8, 11, 9), end: new Date(2025, 8, 11, 17), type: "Admin", staff: "Admin Team", notes: "Hỗ trợ tổng quát" },
  { title: "Ca sáng", start: new Date(2025, 8, 12, 8), end: new Date(2025, 8, 12, 16), type: "Doctor", staff: "Dr. Anna", notes: "Trực ca sáng" },
  { title: "Ca chiều", start: new Date(2025, 8, 12, 14), end: new Date(2025, 8, 12, 22), type: "Nurse", staff: "Nurse Mike", notes: "Trực ca chiều" },
  { title: "Ca sáng", start: new Date(2025, 8, 13, 8), end: new Date(2025, 8, 13, 16), type: "Doctor", staff: "Dr. Tom", notes: "Trực ca sáng" },
  { title: "Hỗ trợ tổng quát", start: new Date(2025, 8, 13, 10), end: new Date(2025, 8, 13, 18), type: "Admin", staff: "Admin Team", notes: "Hỗ trợ tổng quát" },
];

// Màu theo type
const eventColors: Record<ScheduleEvent["type"], string> = {
  Doctor: "#5e72e4",
  Nurse: "#11cdef",
  Leave: "#f5365c",
  Admin: "#f7b731",
};

const ScheduleCalendar: React.FC<{ title?: string }> = ({ title = "Lịch làm việc tuần này" }) => {
  const [calendarEvents] = useState<ScheduleEvent[]>(events);

  const eventStyleGetter = (event: ScheduleEvent) => ({
    style: {
      backgroundColor: eventColors[event.type] || "#ccc",
      color: "#fff",
      borderRadius: 6,
      padding: "4px 6px",
      fontSize: "0.85rem",
      fontWeight: 500,
      border: "none",
    },
  });

  const EventRenderer: React.FC<EventProps<ScheduleEvent>> = ({ event }) => (
    <Tooltip title={`${event.staff}: ${event.notes}`} arrow>
      <span>{event.title}</span>
    </Tooltip>
  );

  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 2, width: "100%", mb: 4 }}>
      <Typography variant="h6" gutterBottom>{title}</Typography>

      {/* Legend */}
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        {Object.entries(eventColors).map(([key, color]) => (
          <Chip key={key} label={key} sx={{ bgcolor: color, color: "#fff" }} size="small" />
        ))}
      </Stack>

      <Box sx={{ height: 600 }}>
        <Calendar
          localizer={localizer}
          events={calendarEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100%", width: "100%" }}
          eventPropGetter={eventStyleGetter}
          components={{ event: EventRenderer }}
          views={["month", "week", "day", "agenda"]}
          defaultView="week"
          step={60}
          showMultiDayTimes
        />
      </Box>
    </Paper>
  );
};

export default ScheduleCalendar;
