"use client";

import React, { useMemo } from "react";
import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import { Box, Chip, IconButton, Tooltip, Paper } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { AppointmentHistoryItem } from "@/types/patient";

interface HistoryTableMRTProps {
  data: AppointmentHistoryItem[];
  darkMode?: boolean;
  onViewDetails: (item: AppointmentHistoryItem) => void;
}

const getStatusChipProps = (status: string) => {
  switch (status) {
    case "COMPLETED":
      return { label: "Đã hoàn thành", color: "success" as const };
    case "IN_PROGRESS":
      return { label: "Đang tiến hành", color: "info" as const };
    case "PENDING":
      return { label: "Chờ xác nhận", color: "warning" as const };
    case "CANCELLED":
      return { label: "Đã hủy", color: "error" as const };
    default:
      return { label: status, color: "default" as const };
  }
};

const HistoryTable: React.FC<HistoryTableMRTProps> = ({
  data,
  darkMode = false,
  onViewDetails,
}) => {
  const columns = useMemo<MRT_ColumnDef<AppointmentHistoryItem>[]>(
    () => [
      {
        accessorKey: "appointmentDateTime",
        header: "Ngày & Giờ",
        minSize: 180,
      },
      {
        accessorKey: "status",
        header: "Trạng thái",
        minSize: 180,
        enableColumnFilter: true,
        Cell: ({ row }) => {
          const { label, color } = getStatusChipProps(row.original.status);
          return <Chip label={label} color={color} size="small" />;
        },
      },
      {
        accessorKey: "notes", 
        header: "Triệu chứng / Ghi chú",
        minSize: 245,
        enableColumnFilter: true,
        Cell: ({ row }) => row.original.appointmentNote || "— Không có dữ liệu —",
      },
      {
        accessorKey: "doctorName",
        header: "Bác sĩ",
        minSize: 180,
        enableColumnFilter: true,
        Cell: ({ row }) => row.original.doctorName || "— Chưa phân công —",
      },
      {
        accessorKey: "actions",
        header: "Hành động",
        enableSorting: false,
        enableColumnFilter: false,
        size: 100, 
        muiTableHeadCellProps: {
          align: 'center', // Căn giữa tiêu đề cột
        },
        muiTableBodyCellProps: {
          align: 'center', // Căn giữa nội dung ô (đảm bảo Box căn giữa)
        }
      },
    ],
    [onViewDetails]
  );

  return (
    <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <MaterialReactTable
        columns={columns}
        data={data}
        enableColumnFilters
        enableSorting
        enablePagination
        enableColumnResizing
        enableRowNumbers
        muiTablePaperProps={{
          sx: {
            backgroundColor: darkMode ? "#2e2e3e" : "#fff",
            color: darkMode ? "#f0f0f0" : "#000",
            boxShadow: 'none',
          },
        }}
        muiTableContainerProps={{
          sx: {
            overflowX: 'auto',
          },
        }}
        muiTableHeadCellProps={{
          sx: {
            fontWeight: "bold",
            backgroundColor: darkMode ? "#2a2a3a" : "#f0f0f0",
            color: darkMode ? "#f0f0f0" : "#000",
          },
        }}
        muiTableBodyCellProps={{
          sx: { color: darkMode ? "#f0f0f0" : "#000" },
        }}
        initialState={{ pagination: { pageSize: 10, pageIndex: 0 } }}
      />
    </Paper>
  );
};

export default HistoryTable;