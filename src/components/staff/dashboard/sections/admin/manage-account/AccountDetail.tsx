"use client";

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Avatar,
  Stack,
  Typography,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Account, RoleEnum, StatusEnum, statusLabels, roleLabels } from "@/utils/enums";

interface DoctorCertificate {
  id: number;
  name: string;
  issuedBy: string;
  year: number;
}

interface AccountDetailDialogProps {
  open: boolean;
  account: Account & { doctorInfo?: { specialization: string; certificates: DoctorCertificate[] } } | null;
  onClose: () => void;
}

export default function AccountDetailDialog({ open, account, onClose }: AccountDetailDialogProps) {
  if (!account) return null;

  const isDoctor = account.roles.includes(RoleEnum.DOCTOR);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Chi tiết tài khoản</DialogTitle>
      <DialogContent dividers>
        <Stack direction="row" spacing={2} alignItems="center" mb={2}>
          <Avatar src={account.avtPath || undefined} sx={{ width: 100, height: 100 }} />
          <Stack>
            <Typography variant="h6">{account.fullName}</Typography>
            <Typography variant="body2">{account.email}</Typography>
            <Stack direction="row" spacing={1} mt={1}>
              {account.roles.map((r) => (
                <Chip key={r} label={roleLabels[r]} size="small" />
              ))}
            </Stack>
            <Chip
              label={statusLabels[account.status || StatusEnum.INACTIVE]}
              color={
                account.status === StatusEnum.ACTIVE
                  ? "success"
                  : account.status === StatusEnum.BANNED
                  ? "error"
                  : "default"
              }
              size="small"
              sx={{ mt: 1 }}
            />
          </Stack>
        </Stack>

        {isDoctor && account.doctorInfo && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" fontWeight="bold">
              Thông tin bác sĩ
            </Typography>
            <Typography>Chuyên môn: {account.doctorInfo.specialization}</Typography>

            <Typography mt={2} fontWeight="bold">
              Danh sách chứng chỉ
            </Typography>
            {account.doctorInfo.certificates.length === 0 ? (
              <Typography>Chưa có chứng chỉ nào</Typography>
            ) : (
              <List dense>
                {account.doctorInfo.certificates.map((cert) => (
                  <ListItem key={cert.id}>
                    <ListItemText
                      primary={cert.name}
                      secondary={`Cấp bởi: ${cert.issuedBy}, Năm: ${cert.year}`}
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Đóng</Button>
      </DialogActions>
    </Dialog>
  );
}
