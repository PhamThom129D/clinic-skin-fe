"use client";

import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { AccountTable, Account } from "./AccountTable";
import { getListAccounts } from "@/services/accountService";
import { roleLabels } from "@/utils/enums";
import AccountDialog from "../../../components/admin/AccountDialog";

interface ManageAccountProps {
  darkMode?: boolean;
}

export default function ManageAccount({ darkMode = false }: ManageAccountProps) {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loadingAccounts, setLoadingAccounts] = useState(true);

  // State cho dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [currentAccount, setCurrentAccount] = useState<Account | null>(null);
  const [dialogTitle, setDialogTitle] = useState("Thêm mới tài khoản");

  // Lấy danh sách tài khoản
  useEffect(() => {
    setLoadingAccounts(true);
    getListAccounts()
      .then((data) => {
        const mapped: Account[] = data.map((a: any) => ({
          id: a.id,
          fullName: a.fullName,
          email: a.email,
          phoneNumber: a.phoneNumber,
          address: a.address,
          dateOfBirth: a.dateOfBirth,
          gender: a.gender,
          roles: a.roles.map((r: string) => roleLabels[r] || r),
          avtPath: a.avtPath,
          status: a.status as "Active" | "Inactive" | "Banned",
          specialty: a.specialty,
          level: a.level,
          certificates: a.certificates || [],
        }));
        setAccounts(mapped);
      })
      .finally(() => setLoadingAccounts(false));
  }, []);

  // Mở dialog thêm mới
  const handleAdd = () => {
    setCurrentAccount(null);
    setDialogTitle("Thêm mới tài khoản");
    setOpenDialog(true);
  };

  // Mở dialog sửa / xem chi tiết
  const handleEdit = (account: Account) => {
    setCurrentAccount(account);
    setDialogTitle("Chỉnh sửa tài khoản");
    setOpenDialog(true);
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight="bold">
          Danh sách tài khoản
        </Typography>
        <Button variant="contained" color="primary" onClick={handleAdd}>
          Thêm mới tài khoản
        </Button>
      </Stack>

      {/* Table */}
      {loadingAccounts ? (
        <div>Đang tải danh sách tài khoản...</div>
      ) : (
        <AccountTable
          data={accounts}
          darkMode={darkMode}
          onEdit={handleEdit}    // thêm props onEdit
          onView={handleEdit}    // dùng chung dialog
        />
      )}

      {/* Dialog chung (thêm / chỉnh sửa / xem chi tiết) */}
      <AccountDialog
        open={openDialog}
        title={dialogTitle}
        account={currentAccount || undefined}
        onClose={() => setOpenDialog(false)}
        onSubmit={(formData) => {
          if (currentAccount) {
            console.log("Cập nhật tài khoản:", formData);
          } else {
            console.log("Thêm mới tài khoản:", formData);
          }
          setOpenDialog(false);
        }}
      />
    </Box>
  );
}
