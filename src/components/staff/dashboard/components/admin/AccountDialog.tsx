"use client";

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddAccountForm from "../../sections/admin/manage-account/AccountForm";

interface AccountDialogProps {
  open: boolean;
  account?: any; // account để edit, nếu undefined là thêm mới
  title?: string;
  onClose: () => void;
  onSubmit: (formData: FormData, account?: any) => void;
}

export default function AccountDialog({
  open,
  account,
  title = "Tài khoản",
  onClose,
  onSubmit,
}: AccountDialogProps) {
  const handleSubmit = (formData: FormData) => {
    onSubmit(formData, account);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth scroll="paper">
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontWeight: "bold",
        }}
      >
        {title}
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />

      <DialogContent sx={{ p: 3 }}>
        <AddAccountForm onSubmit={handleSubmit} onCancel={onClose} />
      </DialogContent>

      <Divider />
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} variant="outlined">
          Hủy
        </Button>
        <Button type="submit" form="account-form" variant="contained">
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
}
