"use client";

import React, { useMemo, useState } from "react";
import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import {
  Box,
  Avatar,
  IconButton,
  Tooltip,
  Chip,
  Paper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";

import { StatusEnum, statusLabels, RoleEnum, roleLabels } from "@/utils/enums";
import AccountDialog from "../../../components/admin/AccountDialog";
import AccountDetailDialog from "./AccountDetail";
import ConfirmDialog from "../../../components/admin/ConfirmDialog";


export interface Account {
  id: number;
  fullName: string;
  email: string;
  roles: RoleEnum[];
  avtPath?: string | null;
  status?: StatusEnum;
}

interface AccountTableProps {
  data: Account[];
  darkMode?: boolean;
  onEdit?: (account: Account) => void;
  onView?: (account: Account) => void;
}

export function AccountTable({
  data,
  darkMode = false,
  onEdit,
  onView,
}: AccountTableProps) {
  const [editAccount, setEditAccount] = useState<Account | null>(null);
  const [viewAccount, setViewAccount] = useState<Account | null>(null);
  const [confirm, setConfirm] = useState<{
    open: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({ open: false, title: "", message: "", onConfirm: () => {} });

  const handleCloseEdit = () => setEditAccount(null);

  const handleEditSubmit = (formData: FormData, account?: Account) => {
    console.log("Cập nhật account:", account, formData);
    handleCloseEdit();
  };

  const handleDelete = (account: Account) => {
    setConfirm({
      open: true,
      title: "Xóa tài khoản",
      message: `Bạn có chắc chắn muốn xóa tài khoản "${account.fullName}" không?`,
      onConfirm: () => {
        console.log("Đã xóa:", account);
        setConfirm({ ...confirm, open: false });
      },
    });
  };

  const handleToggleLock = (account: Account) => {
    const action = account.status === StatusEnum.ACTIVE ? "khóa" : "mở khóa";
    setConfirm({
      open: true,
      title: `${action.charAt(0).toUpperCase() + action.slice(1)} tài khoản`,
      message: `Bạn có chắc chắn muốn ${action} tài khoản "${account.fullName}" không?`,
      onConfirm: () => {
        console.log(`${action} tài khoản:`, account);
        setConfirm({ ...confirm, open: false });
      },
    });
  };

  const columns = useMemo<MRT_ColumnDef<Account>[]>(
    () => [
      { accessorKey: "id", header: "STT", size: 50 },
      {
        accessorKey: "avtPath",
        header: "Ảnh",
        Cell: ({ row }) => (
          <Avatar
            src={row.original.avtPath || undefined}
            sx={{ width: 100, height: 100 }}
          />
        ),
        size: 70,
        enableColumnFilter: false,
        enableSorting: false,
      },
      { accessorKey: "fullName", header: "Họ và tên" },
      { accessorKey: "email", header: "Email" },

      {
        accessorKey: "status",
        header: "Trạng thái",
        enableColumnFilter: false,
        enableSorting: true,
        Cell: ({ row }) => {
          const status = row.original.status;
          if (!status) return <Chip label="Không xác định" size="small" />;
          let color: "success" | "error" | "default" = "default";
          if (status === StatusEnum.ACTIVE) color = "success";
          else if (status === StatusEnum.INACTIVE) color = "default";
          else if (status === StatusEnum.BANNED) color = "error";
          return (
            <Chip
              label={statusLabels[status]}
              color={color}
              size="small"
              sx={{ fontWeight: "bold" }}
            />
          );
        },
      },
      {
        accessorKey: "actions",
        header: "Hành động",
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => {
          const { fullName, status } = row.original;
          return (
            <Box sx={{ display: "flex", gap: 1 }}>
              {/* Sửa */}
              <Tooltip title="Sửa">
                <IconButton
                  size="small"
                  color="info"
                  onClick={() =>
                    onEdit?.(row.original) || setEditAccount(row.original)
                  }
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              {/* Xem chi tiết */}
              <Tooltip title="Xem chi tiết">
                <IconButton
                  size="small"
                  color="primary"
                  onClick={() => setViewAccount(row.original)}
                >
                  <VisibilityIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              {/* Xóa */}
              <Tooltip title="Xóa">
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => handleDelete(row.original)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              {/* Khóa / Mở khóa */}
              <Tooltip
                title={
                  status === StatusEnum.ACTIVE
                    ? "Khóa tài khoản"
                    : "Mở khóa tài khoản"
                }
              >
                <IconButton
                  size="small"
                  color={status === StatusEnum.ACTIVE ? "error" : "success"}
                  onClick={() => handleToggleLock(row.original)}
                >
                  {status === StatusEnum.ACTIVE ? (
                    <LockIcon fontSize="small" />
                  ) : (
                    <LockOpenIcon fontSize="small" />
                  )}
                </IconButton>
              </Tooltip>
            </Box>
          );
        },
      },
    ],
    [onEdit, onView]
  );

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 2,
        borderRadius: 3,
        backgroundColor: darkMode ? "#1e1e2e" : "#fff",
      }}
    >
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
          sx: { color: darkMode ? "#f0f0f0" : "#000", fontSize: 20 },
        }}
        muiTableHeadCellProps={{
          sx: {
            fontWeight: "bold",
            fontSize: 24,
            backgroundColor: darkMode ? "#2a2a3a" : "#f0f0f0",
            color: darkMode ? "#f0f0f0" : "#000",
          },
        }}
        muiSearchTextFieldProps={{
          placeholder: "🔍 Tìm kiếm...",
          variant: "outlined",
          size: "small",
          sx: { borderRadius: 2 },
        }}
        initialState={{ pagination: { pageSize: 10, pageIndex: 0 } }}
      />

      {/* Dialog sửa / xem chi tiết */}
      <AccountDialog
        open={!!editAccount}
        account={editAccount || undefined}
        title="Chỉnh sửa tài khoản"
        onClose={handleCloseEdit}
        onSubmit={handleEditSubmit}
      />
      <AccountDetailDialog
        open={!!viewAccount}
        account={viewAccount}
        onClose={() => setViewAccount(null)}
      />

      {/* Confirm Dialog */}
      <ConfirmDialog
        open={confirm.open}
        title={confirm.title}
        message={confirm.message}
        onCancel={() => setConfirm({ ...confirm, open: false })}
        onConfirm={confirm.onConfirm}
      />
    </Paper>
  );
}
