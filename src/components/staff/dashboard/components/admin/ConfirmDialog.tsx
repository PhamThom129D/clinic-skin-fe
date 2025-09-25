"use client";

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  message?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmDialog({
  open,
  title = "Cảnh báo",
  message = "Bạn có chắc chắn?",
  onCancel,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#d32f2f' }}>
        <WarningAmberIcon fontSize="large" />
        {title}
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#444' }}>
          {message}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', gap: 2, pb: 2 }}>
        <Button
          variant="outlined"
          color="inherit"
          onClick={onCancel}
          sx={{ minWidth: 100 }}
        >
          Hủy
        </Button>
        <Button
          variant="contained"
          color="warning"
          onClick={onConfirm}
          sx={{ minWidth: 100 }}
        >
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
}
