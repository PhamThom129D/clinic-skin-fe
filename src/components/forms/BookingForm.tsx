import React, { useState } from "react";
import {
  Stack,
  Button,
  Box,
  Typography,
  Avatar,
  Paper,
  Divider,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import InputField from "../common/InputField";
import { BookingData } from "@/types/booking";
import { Doctor } from "@/types/screen";
import { getDoctorsBasic } from "@/services/screenService";
import { useFetchData } from "@/hooks/useFetchData";
import { notifyError, notifySuccess } from "@/utils/toast";
import { registerAppointment } from "@/services/bookingService";
import GenderSelect from "../common/GenderSelect";

interface BookingFormProps {
  onSubmit?: (data: BookingData) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ onSubmit }) => {
  const [form, setForm] = useState<BookingData>({
    fullName: "",
    email: "",
    phoneNumber: "",
    passportNumber: "",
    occupation: "",
    address: "",
    gender: "",
    dateOfBirth: "",
    appointmentDate: "",
    appointmentTime: "",
    note: "",
    doctorId: 0, // ✅ để number, mặc định 0
  });

  const { data: doctors, isLoading } = useFetchData<Doctor[]>(getDoctorsBasic);

  // Dùng cho input/textarea
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "doctorId" ? Number(value) : value,
    }));
  };

  // Dùng riêng cho Select (MUI SelectChangeEvent)
  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectDoctor = (id: number) => {
    setForm((prev) => ({ ...prev, doctorId: id }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate cơ bản
    if (!form.fullName || !form.phoneNumber || !form.appointmentDate || !form.doctorId) {
      notifyError("Vui lòng nhập đầy đủ thông tin bắt buộc.");
      return;
    }

    try {
      // Gọi API
      await registerAppointment(form);

      notifySuccess("Đặt lịch thành công! Chúng tôi sẽ liên hệ bạn sớm.");
      console.log("Form data submitted:", form);

      if (onSubmit) onSubmit(form);

      // Reset form (optional)
      setForm({
        fullName: "",
        email: "",
        phoneNumber: "",
        passportNumber: "",
        occupation: "",
        address: "",
        gender: "",
        dateOfBirth: "",
        appointmentDate: "",
        appointmentTime: "",
        note: "",
        doctorId: 0,
      });
    } catch (error) {
      notifyError("Đặt lịch thất bại. Vui lòng thử lại.");
      console.error("❌ API Error:", error);
    }
  };

  return (
    <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          {/* Title */}
          <Typography
            variant="h5"
            fontWeight="bold"
            textAlign="center"
            color="primary"
          >
            Đặt lịch khám
          </Typography>

          <Divider />

          {/* Hai phần chính */}
          <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
            {/* Thông tin cá nhân */}
            <Stack spacing={2} flex={1}>
              <Typography variant="subtitle1" fontWeight={600} color="text.secondary">
                Thông tin cá nhân
              </Typography>
              <InputField label="Họ và tên" name="fullName" value={form.fullName} onChange={handleChange} required />
              <InputField label="Email" name="email" value={form.email} onChange={handleChange} type="email" />
              <InputField label="Số điện thoại" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} required />
              <InputField label="CMND/Hộ chiếu" name="passportNumber" value={form.passportNumber} onChange={handleChange} />
              <InputField label="Nghề nghiệp" name="occupation" value={form.occupation} onChange={handleChange} />
              <InputField label="Địa chỉ" name="address" value={form.address} onChange={handleChange} />

   <GenderSelect
  name="gender"
  value={form.gender}
  onChange={handleChange}
/>


              <InputField
                label="Ngày sinh"
                name="dateOfBirth"
                value={form.dateOfBirth}
                onChange={handleChange}
                type="date"
              />
            </Stack>

            {/* Thông tin đặt lịch */}
            <Stack spacing={2} flex={1}>
              <Typography variant="subtitle1" fontWeight={600} color="text.secondary">
                Thông tin đặt lịch
              </Typography>
              <InputField
                label="Ngày khám"
                name="appointmentDate"
                value={form.appointmentDate}
                onChange={handleChange}
                type="date"
                required
              />
              <InputField
                label="Giờ khám"
                name="appointmentTime"
                value={form.appointmentTime}
                onChange={handleChange}
                type="time"
              />
              <InputField
                label="Ghi chú"
                name="note"
                value={form.note}
                onChange={handleChange}
                multiline
                rows={4}
              />

              {/* Chọn bác sĩ */}
              <Box>
                <Typography variant="subtitle1" fontWeight={600} mb={2}>
                  Chọn bác sĩ
                </Typography>

                {isLoading ? (
                  <Typography>Đang tải danh sách bác sĩ...</Typography>
                ) : !doctors || doctors.length === 0 ? (
                  <Typography>Không có bác sĩ nào.</Typography>
                ) : (
                  <Grid container spacing={2} justifyContent="center">
                    {doctors.map((doc) => (
                      <Grid item key={doc.doctorId} xs={12} sm={6} md={4}>
                        <Box
                          sx={{
                            width: 200,
                            height: 180,
                            border:
                              form.doctorId === doc.doctorId ? "2px solid #1976d2" : "1px solid #ddd",
                            borderRadius: 2,
                            p: 2,
                            cursor: "pointer",
                            textAlign: "center",
                            transition: "all 0.25s",
                            "&:hover": {
                              transform: "scale(1.05)",
                              borderColor: "#1976d2",
                              boxShadow: 3,
                            },
                            bgcolor:
                              form.doctorId === doc.doctorId ? "action.hover" : "background.paper",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          onClick={() => handleSelectDoctor(doc.doctorId)}
                        >
                          <Avatar src={doc.avtPath} alt={doc.fullName} sx={{ width: 100, height: 100, mb: 1 }} />
                          <Typography
                            variant="body2"
                            fontWeight={600}
                            gutterBottom
                            sx={{ fontSize: "0.75rem", textAlign: "center" }}
                          >
                            {doc.fullName}
                          </Typography>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ fontSize: "0.65rem", textAlign: "center" }}
                          >
                            {doc.specialty}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Box>
            </Stack>
          </Stack>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
              fontSize: "1rem",
              textTransform: "none",
            }}
          >
            Đặt lịch ngay
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default BookingForm;
