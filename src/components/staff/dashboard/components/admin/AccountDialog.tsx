"use client";

import React, { useEffect } from "react";
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
  account?: any;
  title?: string;
  onClose: () => void;
  onSubmit: (formData: FormData, account?: any) => void;
}

export default function AccountDialog({
  open,
  title = "Tài khoản",
  onClose,
  onSubmit,
  account,
}: AccountDialogProps) {
  useEffect(() => {
    console.log("[AccountDialog] render/mount. props:", { open, title, account });
  }, []); // mount only

  useEffect(() => {
    console.log("[AccountDialog] open changed ->", open);
  }, [open]);

  // wrapper so we can log and then forward to parent
  const handleInternalSubmit = (formData: FormData) => {
    try {
      console.log("[AccountDialog] handleInternalSubmit called. current account:", account);

      const entries = Array.from(formData.entries()).map(([k, v]) => [
        k,
        v instanceof File ? `File(${v.name})` : v,
      ]);
      console.log("[AccountDialog] received FormData entries:", entries);

      console.log("[AccountDialog] forwarding to props.onSubmit(formData, account) ...");
      onSubmit(formData, account);
    } catch (err) {
      console.error("[AccountDialog] error in handleInternalSubmit:", err);
    }
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
        <AddAccountForm onSubmit={handleInternalSubmit} onCancel={onClose} />
      </DialogContent>

      <Divider />
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} variant="outlined">
          Hủy
        </Button>
        {/* This button submits the form inside AddAccountForm (id="account-form") */}
        <Button type="submit" form="account-form" variant="contained">
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
}
