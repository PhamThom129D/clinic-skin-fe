"use client";
import React, { useMemo } from "react";
import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import { Box, IconButton, Tooltip, Chip, Paper } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { RoleEnum } from "@/utils/enums";
import { Patient } from "@/services/patientList";

interface PatientTableProps {
  patients: Patient[];
  role: RoleEnum;
  darkMode?: boolean;
  onViewDetails: (patient: Patient) => void;
  onExam?: (patient: Patient) => void;
  onApprove?: (patient: Patient) => void;
}

export default function PatientTable({
  patients,
  role,
  darkMode = false,
  onViewDetails,
  onExam,
}: PatientTableProps) {
  const isDoctor = role === RoleEnum.DOCTOR;
  const isStaff = role === RoleEnum.RECEPTIONIST;

  const columns = useMemo<MRT_ColumnDef<Patient>[]>(
    () => [
      {
  accessorKey: "stt",
  header: "STT",
  size: 50,
  enableSorting: false,
  enableColumnFilter: false,
  Cell: ({ row }) => row.index + 1, 
},

      { accessorKey: "name", header: "Họ và tên" },
      { accessorKey: "visitDate", header: "Ngày khám" },
      {
        accessorKey: "symptoms",
        header: "Triệu chứng",
        Cell: ({ row }) =>
          row.original.symptoms.length ? row.original.symptoms.join(", ") : "-",
      },
      {
        accessorKey: "status",
        header: "Trạng thái",
        enableSorting: false,
        enableColumnFilter: false,
        Cell: ({ row }) => {
          const status = row.original.status || "waiting";
          let color: "success" | "warning" | "default" = "default";
          let label = "";

          switch (status) {
            case "examining":
              color = "success";
              label = "Đang khám";
              break;
            case "waiting":
              color = "warning";
              label = "Chờ khám";
              break;
            case "approval":
              color = "default";
              label = "Chờ duyệt";
              break;
            default:
              label = "Không xác định";
          }

          return <Chip label={label} color={color} size="small" />;
        },
      },
      {
        accessorKey: "actions",
        header: "Hành động",
        enableSorting: false,
        enableColumnFilter: false,
        Cell: ({ row }) => (
          <Box sx={{ display: "flex", gap: 1 }}>
            <Tooltip title="Xem chi tiết">
              <IconButton size="small" color="primary" onClick={() => onViewDetails(row.original)}>
                <VisibilityIcon fontSize="medium" /> 
              </IconButton>
            </Tooltip>

            {isDoctor && onExam && (
              <Tooltip title="Khám bệnh">
                <IconButton size="small" color="success" onClick={() => onExam(row.original)}>
                  <MedicalServicesIcon fontSize="medium" />
                </IconButton>
              </Tooltip>
            )}

    
          </Box>
        ),
      },
    ],
    [isDoctor, isStaff, onViewDetails, onExam]
  );

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 2,
        borderRadius: 3,
        backgroundColor: darkMode ? "#1e1e2f" : "#fff",
      }}
    >
      <MaterialReactTable
        columns={columns}
        data={patients}
        enableColumnFilters
        enableSorting
        enablePagination
        muiTablePaperProps={{
          sx: {
            backgroundColor: darkMode ? "#2e2e3e" : "#fff",
            color: darkMode ? "#f0f0f0" : "#000",
          },
        }}
        muiTableBodyRowProps={{
          sx: {
            "&:hover": {
              backgroundColor: darkMode ? "#3a3a4a" : "#f5f5f5",
              cursor: "pointer",
            },
          },
        }}
        muiTableBodyCellProps={{
          sx: { color: darkMode ? "#f0f0f0" : "#000" },
        }}
        muiTableHeadCellProps={{
          sx: {
            fontWeight: "bold",
            backgroundColor: darkMode ? "#2a2a3a" : "#f0f0f0",
            color: darkMode ? "#f0f0f0" : "#000",
          },
        }}
        muiSearchTextFieldProps={{
          placeholder: " Tìm kiếm...",
          variant: "outlined",
          size: "small",
          sx: { borderRadius: 2 },
        }}
        initialState={{ pagination: { pageSize: 10, pageIndex: 0 } }}
      />
    </Paper>
  );
}
