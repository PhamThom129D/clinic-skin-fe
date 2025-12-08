// src/components/patient/personal/history/HistoryTableMRT.tsx
"use client";

import React, { useMemo } from "react";
import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import { Box, Chip, IconButton, Tooltip, Paper } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { PatientMedicalHistoryDTO } from "@/types/patient";
import { formatDateTimeForDisplay } from "@/utils/validation/validators";
import { useRouter } from "next/navigation";

interface HistoryTableMRTProps {
  data: PatientMedicalHistoryDTO[];
  darkMode?: boolean;
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
}) => {
  const router = useRouter();
  const columns = useMemo<MRT_ColumnDef<PatientMedicalHistoryDTO>[]>(
    () => [
      {
        accessorKey: "sessionDateTime",
        header: "Ngày & Giờ",
        minSize: 140,
        Cell: ({ row }) => formatDateTimeForDisplay(row.original.sessionDate),
      },
      {
        accessorKey: "symptoms",
        header: "Triệu chứng",
        minSize: 10,
        enableColumnFilter: true,
        Cell: ({ row }) => row.original.symptoms,
      },
      {
        accessorKey: "diagnosis",
        header: "Chẩn đoán của bác sĩ",
        minSize: 250,
        enableColumnFilter: true,
        Cell: ({ row }) => row.original.diagnosis,
      },
      {
        accessorKey: "doctorName",
        header: "Bác sĩ phụ trách",
        minSize: 190,
        enableColumnFilter: true,
        Cell: ({ row }) => row.original.doctorFullName
      },
      {
        accessorKey: "actions",
        header: "Xem chi tiết",
        enableSorting: false,
        enableColumnFilter: false,
        size: 150,
        Cell: ({ row }) => {
          const item = row.original;
          const hasRecord = !!item.recordId;
          const tooltipTitle = hasRecord ? "Xem chi tiết hồ sơ" : "Chưa có hồ sơ y tế (Đang chờ/Đã hủy)";
          const detailPath = hasRecord 
                        ? `/record-detail` // Tạo đường dẫn chi tiết
                        : '';
          const handleViewDetails = () => {
                        if (hasRecord && detailPath) {
                            const targetPath = `/user/personal/medical-records/record-detail/${item.recordId}`; 
                          router.push(targetPath); // Chuyển hướng tới URL thân thiện
                        }
                    };
          return (
                        <Box sx={{ width: "80%", display: 'flex', justifyContent: 'center' }}>
                            <Tooltip title={tooltipTitle}>
                                <span>
                                    <IconButton
                                        size="small"
                                        color="primary"
                                        onClick={handleViewDetails} // Gắn hàm chuyển hướng
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
    [router]
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
