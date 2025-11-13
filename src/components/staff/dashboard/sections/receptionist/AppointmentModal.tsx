"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Stack,
  Divider,
  TextField,
  MenuItem,
  Tab,
  Tabs,
  CircularProgress,
} from "@mui/material";
import { AppointmentResponse, updateAppointment, getAppointmentById } from "@/services/bookingService";

interface AppointmentModalProps {
  open: boolean;
  appointment?: AppointmentResponse | null;
  appointmentId?: number; // fallback nếu chỉ có id
  onClose: () => void;
  onUpdateSuccess: (updated: AppointmentResponse) => void;
}

const statusOptions = ["PENDING", "IN_PROGRESS", "APPROVED", "REJECTED"];

const statusVN: Record<string, string> = {
  PENDING: "Chờ duyệt",
  IN_PROGRESS: "Đang khám",
  APPROVED: "Đã duyệt",
  REJECTED: "Từ chối",
};

const AppointmentModal: React.FC<AppointmentModalProps> = ({
  open,
  appointment,
  appointmentId,
  onClose,
  onUpdateSuccess,
}) => {
  const [tab, setTab] = useState(0);
  const [formData, setFormData] = useState<Partial<AppointmentResponse>>({});
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (open) return;

    const fetchDetail = async () => {
      try {
        if (!appointment && appointmentId) {
          setLoading(true);
          const res = await getAppointmentById(appointmentId);
          setFormData(res.data);
        } else if (appointment) {
          setFormData(appointment);
        }
      } catch (err) {
        console.error("❌ Lỗi lấy chi tiết lịch hẹn:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [appointment, appointmentId, open]);

  const handleChange = (field: keyof AppointmentResponse, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdate = async () => {
    if (!formData?.id) return;
    try {
      setLoading(true);
      const updated = await updateAppointment(formData.id, {
        appointmentDate: formData.appointmentDate!,
        appointmentTime: formData.appointmentTime!,
        note: formData.note,
        status: formData.status!,
      });
      onUpdateSuccess(updated);
      onClose();
    } catch (err) {
      console.error("❌ Lỗi cập nhật lịch hẹn:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Lịch hẹn</DialogTitle>
      <Tabs value={tab} onChange={(_, v) => setTab(v)}>
        <Tab label="Chi tiết" />
        <Tab label="Cập nhật" />
      </Tabs>
      <DialogContent dividers>
        {loading ? (
          <Stack alignItems="center" justifyContent="center" minHeight={200}>
            <CircularProgress />
          </Stack>
        ) : (
          <>
            {tab === 0 && formData && (
              <Stack spacing={2}>
                <Typography variant="subtitle1">
                  <b>Họ và tên:</b> {formData.patient?.account.fullName || "Chưa có"}
                </Typography>
                <Typography>
                  <b>Email:</b> {formData.patient?.account.email}
                </Typography>
                <Typography>
                  <b>Số điện thoại:</b> {formData.patient?.account.phoneNumber || "Chưa có"}
                </Typography>
                <Typography>
                  <b>Ngày hẹn:</b> {formData.appointmentDate}
                </Typography>
                <Typography>
                  <b>Giờ hẹn:</b> {formData.appointmentTime}
                </Typography>
                <Typography>
                  <b>Ghi chú:</b> {formData.note || "Không có"}
                </Typography>
                <Typography>
                  <b>Trạng thái:</b> {statusVN[formData.status!]}
                </Typography>
                <Divider />
                <Typography variant="subtitle2">Thông tin bệnh nhân</Typography>
                <Typography>
                  <b>Mã hộ chiếu:</b> {formData.patient?.passportNumber || "Chưa có"}
                </Typography>
                <Typography>
                  <b>Nghề nghiệp:</b> {formData.patient?.occupation || "Chưa có"}
                </Typography>
      
              </Stack>
            )}
            {tab === 1 && formData && (
              <Stack spacing={2}>
                <TextField
                  label="Ngày hẹn"
                  type="date"
                  value={formData.appointmentDate || ""}
                  onChange={(e) => handleChange("appointmentDate", e.target.value)}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  label="Giờ hẹn"
                  type="time"
                  value={formData.appointmentTime || ""}
                  onChange={(e) => handleChange("appointmentTime", e.target.value)}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  label="Ghi chú"
                  value={formData.note || ""}
                  onChange={(e) => handleChange("note", e.target.value)}
                  fullWidth
                  multiline
                  rows={2}
                />
                <TextField
                  select
                  label="Trạng thái"
                  value={formData.status || ""}
                  onChange={(e) => handleChange("status", e.target.value)}
                  fullWidth
                >
                  {statusOptions.map((status) => (
                    <MenuItem key={status} value={status}>
                      {statusVN[status]}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
            )}
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Đóng</Button>
        {tab === 1 && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdate}
            disabled={loading}
          >
            Lưu
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default AppointmentModal;
