// src/components/patient/personal/history/HistoryTableMRT.tsx
"use client";

import React, { useMemo } from "react";
import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import { Box, Chip, IconButton, Tooltip, Paper } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { AppointmentHistoryItem } from "@/types/patient";
import { formatDateTimeForDisplay } from "@/utils/validation/validators";

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
        Cell: ({ row }) => formatDateTimeForDisplay(row.original.appointmentDateTime),
      },
      {
        accessorKey: "status",
        header: "Trạng thái",
        minSize: 10,
        enableColumnFilter: true,
        Cell: ({ row }) => {
          const { label, color } = getStatusChipProps(row.original.status);
          return <Chip label={label} color={color} size="small" />;
        },
      },
      {
        accessorKey: "note",
        header: "Ghi chú",
        minSize: 293,
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
        size: 130,
        Cell: ({ row }) => {
          const item = row.original;
          const hasRecord = !!item.recordId;
          const tooltipTitle = hasRecord ? "Xem chi tiết hồ sơ" : "Chưa có hồ sơ y tế (Đang chờ/Đã hủy)";

          return (
            <Box sx={{ width: "80%", display: 'flex', justifyContent: 'center' }}>
              <Tooltip title={tooltipTitle}>
                <span>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => onViewDetails(item)}
                    disabled={!hasRecord} // Vô hiệu hóa nếu không có recordId
                  >
                    <VisibilityIcon fontSize="medium" />
                  </IconButton>
                </span>
              </Tooltip>
            </Box>
          );
        },
      },
    ],
    [onViewDetails]
  );

  return (
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
  );
};

export default HistoryTable;
