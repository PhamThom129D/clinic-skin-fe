"use client";

import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Stack, Dialog, DialogTitle, DialogContent } from "@mui/material";
import { AccountTable, Account } from "./AccountTable";
import { getListAccounts } from "@/services/accountService";

interface ManageAccountProps {
  darkMode?: boolean;
}

export default function ManageAccount({ darkMode = false }: ManageAccountProps) {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loadingAccounts, setLoadingAccounts] = useState(true);
  const [openAddDialog, setOpenAddDialog] = useState(false);

  // Fetch accounts từ API khi mount
  useEffect(() => {
    setLoadingAccounts(true);
    getListAccounts()
      .then((data) => {
        const mapped: Account[] = data.map((a: any) => ({
          id: a.id,
          fullName: a.fullName,
          email: a.email,
          roles: a.roles.map((r: string) => {
            // Map sang tiếng Việt
            switch (r) {
              case "ROLE_ADMIN": return "Quản trị viên";
              case "ROLE_DOCTOR": return "Bác sĩ";
              case "ROLE_RECEPTIONIST": return "Lễ tân";
              case "ROLE_CONSULTANT": return "Tư vấn";
              case "ROLE_CASHIER": return "Thu ngân";
              case "ROLE_LAB_STAFF": return "Nhân viên lab";
              case "ROLE_PATIENT": return "Bệnh nhân";
              default: return r;
            }
          }),
          avtPath: a.avtPath,
        }));
        setAccounts(mapped);
      })
      .finally(() => setLoadingAccounts(false));
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight="bold">
          Danh sách tài khoản
        </Typography>
        <Button variant="contained" color="primary" onClick={() => setOpenAddDialog(true)}>
          Thêm mới tài khoản
        </Button>
      </Stack>

      {/* Table */}
      {loadingAccounts ? (
        <div>Đang tải danh sách tài khoản...</div>
      ) : (
        <AccountTable data={accounts} darkMode={darkMode} />
      )}

      {/* Add Account Dialog */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Thêm mới tài khoản</DialogTitle>
        <DialogContent>
          {/* TODO: Form thêm tài khoản */}
          <Typography>Form thêm tài khoản sẽ ở đây</Typography>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
