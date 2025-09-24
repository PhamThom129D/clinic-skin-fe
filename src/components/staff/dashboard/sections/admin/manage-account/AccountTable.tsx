"use client";

import React, { useMemo } from "react";
import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import { Box, Avatar, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

export interface Account {
  id: number;
  fullName: string;
  email: string;
  roles: string[];
  avtPath?: string | null;
}

interface AccountTableProps {
  data: Account[];
  darkMode?: boolean;
}

export function AccountTable({ data, darkMode = false }: AccountTableProps) {
  const columns = useMemo<MRT_ColumnDef<Account>[]>(
    () => [
      { accessorKey: "id", header: "STT", size: 50 },
      {
        accessorKey: "avtPath",
        header: "Ảnh đại diện",
        Cell: ({ row }) => (
          <Avatar
            src={row.original.avtPath || undefined}
            sx={{ width: 100, height: 100 }}
          />
        ),
        size: 80,
        enableColumnFilter: false,
        enableSorting: false,
      },
      { accessorKey: "fullName", header: "Họ và tên" },
      { accessorKey: "email", header: "Email" },
      {
        accessorKey: "roles",
        header: "Vai trò",
        Cell: ({ row }) => {
          const roleMap: Record<string, string> = {
            ROLE_DOCTOR: "Bác sĩ",
            ROLE_ADMIN: "Quản trị viên",
            ROLE_CONSULTANT: "Tư vấn viên",
            ROLE_RECEPTIONIST: "Lễ tân",
            ROLE_LAB_STAFF: "Nhân viên phòng lab",
            ROLE_CASHIER: "Thu ngân",
            ROLE_PATIENT: "Bệnh nhân",
          };
          return row.original.roles.map(r => roleMap[r] || r).join(", ");
        },
      },
      {
        accessorKey: "actions",
        header: "Hành động",
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => (
          <Box sx={{ display: "flex", gap: 1 }}>
            <Tooltip title="Xem chi tiết">
              <IconButton
                color="primary"
                onClick={() => alert(`Xem ${row.original.fullName}`)}
              >
                <VisibilityIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Sửa">
              <IconButton
                color="primary"
                onClick={() => alert(`Sửa ${row.original.fullName}`)}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Xóa">
              <IconButton
                color="error"
                onClick={() => alert(`Xóa ${row.original.fullName}`)}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        ),
      },
    ],
    []
  );

  return (
    <Box sx={{ padding: 2, backgroundColor: darkMode ? "#1e1e2e" : "#fff" }}>
      <MaterialReactTable
        columns={columns}
        data={data}
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
            fontSize: 14,
            backgroundColor: darkMode ? "#2a2a3a" : "#f0f0f0",
            color: darkMode ? "#f0f0f0" : "#000",
          },
        }}
        muiPaginationProps={{
          labelRowsPerPage: "Số dòng mỗi trang",
          labelDisplayedRows: ({ from, to, count }: { from: number; to: number; count: number }) =>
            `${from}-${to} trên ${count}`,
        }}
        muiSearchTextFieldProps={{
          placeholder: "Tìm kiếm...",
          variant: "outlined",
          size: "small",
        }}
        initialState={{ pagination: { pageSize: 10, pageIndex: 0 } }}
      />
    </Box>
  );
}
