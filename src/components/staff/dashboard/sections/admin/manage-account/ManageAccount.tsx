"use client";

import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { AccountTable, Account } from "./AccountTable";
import { getListAccounts, createAccount } from "@/services/accountService";
import AccountDialog from "../../../components/admin/AccountDialog";

interface ManageAccountProps {
  darkMode?: boolean;
}

export default function ManageAccount({ darkMode = false }: ManageAccountProps) {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loadingAccounts, setLoadingAccounts] = useState(true);

  const [openDialog, setOpenDialog] = useState(false);
  const [currentAccount, setCurrentAccount] = useState<Account | null>(null);
  const [dialogTitle, setDialogTitle] = useState("Thêm mới tài khoản");

  useEffect(() => {
    console.log("[ManageAccount] mounted");
    loadAccounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Hàm load danh sách
  const loadAccounts = async () => {
    console.log("[ManageAccount] loadAccounts -> start");
    setLoadingAccounts(true);
    try {
      const data = await getListAccounts();
      console.log("[ManageAccount] loadAccounts -> raw data length:", Array.isArray(data) ? data.length : "not array");
      const mapped: Account[] = data.map((a: any) => ({
        id: a.id,
        fullName: a.fullName,
        email: a.email,
        phoneNumber: a.phoneNumber,
        address: a.address,
        dateOfBirth: a.dateOfBirth,
        gender: a.gender,
        avtPath: a.avtPath,
        status: a.status as "Active" | "Inactive" | "Banned",
      }));
      setAccounts(mapped);
      console.log("[ManageAccount] loadAccounts -> mapped length:", mapped.length);
    } catch (err) {
      console.error("[ManageAccount] Lỗi load accounts:", err);
    } finally {
      setLoadingAccounts(false);
    }
  };

  // Mở dialog thêm mới
  const handleAdd = () => {
    console.log("[ManageAccount] handleAdd clicked");
    setCurrentAccount(null);
    setDialogTitle("Thêm mới tài khoản");
    setOpenDialog(true);
  };

  // Mở dialog sửa / xem chi tiết
  const handleEdit = (account: Account) => {
    console.log("[ManageAccount] handleEdit for account:", account);
    setCurrentAccount(account);
    setDialogTitle("Chỉnh sửa tài khoản");
    setOpenDialog(true);
  };

  // Xử lý submit từ dialog
  const handleSubmit = async (formData: FormData, account?: Account | null) => {
    console.log("[ManageAccount] handleSubmit called. account:", account);
    try {
      const entries = Array.from(formData.entries()).map(([k, v]) => [
        k,
        v instanceof File ? `File(${v.name})` : v,
      ]);
      console.log("[ManageAccount] received FormData entries:", entries);

      if (account) {
        console.log("[ManageAccount] update flow (TODO) - accountId:", account.id);
        // TODO: gọi API updateAccount(account.id, formData);
        // Example:
        // const resp = await updateAccount(account.id, formData);
        // console.log("[ManageAccount] updateAccount response:", resp);
      } else {
        console.log("[ManageAccount] create flow -> calling createAccount(formData) ...");
        const resp = await createAccount(formData);
        console.log("[ManageAccount] createAccount response:", resp);
      }

      console.log("[ManageAccount] reload accounts after submit");
      await loadAccounts();
      setOpenDialog(false);
    } catch (err) {
      console.error("[ManageAccount] Lỗi khi submit account:", err);
    }
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
          onEdit={handleEdit}
          onView={handleEdit}
        />
      )}

      {/* Dialog thêm / sửa */}
      <AccountDialog
        open={openDialog}
        title={dialogTitle}
        account={currentAccount || undefined}
        onClose={() => {
          console.log("[ManageAccount] AccountDialog onClose");
          setOpenDialog(false);
        }}
        onSubmit={handleSubmit}
      />
    </Box>
  );
}
