"use client";
import React, { useEffect, useState } from "react";
import {
  Stack,
  Button,
  Typography,
  Paper,
  Divider,
  SelectChangeEvent,
  useTheme,
} from "@mui/material";
import InputField from "../common/InputField";
import GenderSelect from "../common/GenderSelect";
import { BookingData } from "@/types/screen";
import {
  validateField,
  validateFormBooking,
} from "@/utils/validation/bookingValidator";
import {
  notifyError,
  notifySuccess,
  notifyWarning,
} from "@/utils/toast";
import { registerAppointment } from "@/services/bookingService";

type Errors = Partial<Record<keyof BookingData, string>>;

interface BookingFormProps {
  darkMode?: boolean;
  isStaff?: boolean;
  onSubmit?: (data: BookingData) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({
  darkMode = false,
  isStaff = false,
  onSubmit,
}) => {
  const theme = useTheme();

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
  });

  const [errors, setErrors] = useState<Errors>({});

 
  useEffect(() => {
    if (isStaff) {
      const now = new Date();
      const currentDate = now.toISOString().split("T")[0];
      const currentTime = now.toTimeString().slice(0, 5);
      setForm((prev) => ({
        ...prev,
        appointmentDate: currentDate,
        appointmentTime: currentTime,
      }));
    }
  }, [isStaff]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    const err = validateField(name as keyof BookingData, value);
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    const err = validateField(name as keyof BookingData, value);
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateFormBooking(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      notifyWarning("⚠️ Vui lòng kiểm tra lại thông tin.");
      return;
    }

    try {
    
      const staffInfo = isStaff
        ? JSON.parse(sessionStorage.getItem("user") || "{}")
        : null;

 
      const dataToSubmit = {
        ...form,
        createdBy: isStaff ? staffInfo?.username || "staff" : "user",
        status: isStaff ? "IN_PROGRESS" : "PENDING",
      };

      await registerAppointment(dataToSubmit);

      notifySuccess(
        isStaff
          ? "✅ Nhân viên đã tạo lịch khám thành công!"
          : "🎉 Đặt lịch thành công! Chúng tôi sẽ liên hệ bạn sớm."
      );

      onSubmit?.(dataToSubmit);

   
      const now = new Date();
      const currentDate = now.toISOString().split("T")[0];
      const currentTime = now.toTimeString().slice(0, 5);

      setForm({
        fullName: "",
        email: "",
        phoneNumber: "",
        passportNumber: "",
        occupation: "",
        address: "",
        gender: "",
        dateOfBirth: "",
        appointmentDate: isStaff ? currentDate : "",
        appointmentTime: isStaff ? currentTime : "",
        note: "",
      });
      setErrors({});
    } catch (error) {
      notifyError("❌ Đặt lịch thất bại. Vui lòng thử lại.");
      console.error("API Error:", error);
    }
  };

  return (
    <Paper
      elevation={6}
      sx={{
        p: 4,
        borderRadius: 3,
        background: darkMode ? "#1e1e2f" : "#dffbec",
        color: darkMode ? "#fff" : "#000",
        maxWidth: "95%",
        mx: "auto",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <Typography
            variant="h5"
            fontWeight="bold"
            textAlign="center"
            color={darkMode ? "#7ee787" : "#158437"}
          >
            {isStaff ? "Tạo lịch khám cho bệnh nhân" : "Đặt lịch khám"}
          </Typography>

          <Divider
            sx={{
              borderColor: darkMode ? "#3a3a4a" : "#a0d9b8",
            }}
          />

          <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
            {/* Cột 1: Thông tin cá nhân */}
            <Stack spacing={2} flex={1}>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                color={darkMode ? "#9be9a8" : "#046920"}
              >
                Thông tin cá nhân
              </Typography>

              <InputField
                label="Số điện thoại"
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber}
                sx={{ backgroundColor: darkMode ? "#2b2b3b" : "#eaf9ee" }}
              />

              <InputField
                label="CMND/Hộ chiếu"
                name="passportNumber"
                value={form.passportNumber}
                onChange={handleChange}
                error={!!errors.passportNumber}
                helperText={errors.passportNumber}
                sx={{ backgroundColor: darkMode ? "#2b2b3b" : "#eaf9ee" }}
              />

              <InputField
                label="Nghề nghiệp"
                name="occupation"
                value={form.occupation}
                onChange={handleChange}
                error={!!errors.occupation}
                helperText={errors.occupation}
                sx={{ backgroundColor: darkMode ? "#2b2b3b" : "#eaf9ee" }}
              />

              <InputField
                label="Địa chỉ"
                name="address"
                value={form.address}
                onChange={handleChange}
                error={!!errors.address}
                helperText={errors.address}
                sx={{ backgroundColor: darkMode ? "#2b2b3b" : "#eaf9ee" }}
              />

              <GenderSelect
                name="gender"
                value={form.gender}
                onChange={handleSelectChange}
                error={!!errors.gender}
                helperText={errors.gender}
              />

              <InputField
                label="Ngày sinh"
                name="dateOfBirth"
                value={form.dateOfBirth}
                onChange={handleChange}
                type="date"
                error={!!errors.dateOfBirth}
                helperText={errors.dateOfBirth}
                sx={{ backgroundColor: darkMode ? "#2b2b3b" : "#eaf9ee" }}
              />
            </Stack>

            {/* Cột 2: Thông tin đặt lịch */}
            <Stack spacing={2} flex={1}>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                color={darkMode ? "#9be9a8" : "#046920"}
              >
                Thông tin đặt lịch
              </Typography>

              <InputField
                label="Họ và tên"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                error={!!errors.fullName}
                helperText={errors.fullName}
                sx={{ backgroundColor: darkMode ? "#2b2b3b" : "#eaf9ee" }}
              />

              <InputField
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                error={!!errors.email}
                helperText={errors.email}
                sx={{ backgroundColor: darkMode ? "#2b2b3b" : "#eaf9ee" }}
              />

              <InputField
                label="Ngày khám"
                name="appointmentDate"
                value={form.appointmentDate}
                onChange={handleChange}
                type="date"
                error={!!errors.appointmentDate}
                helperText={errors.appointmentDate}
                sx={{ backgroundColor: darkMode ? "#2b2b3b" : "#eaf9ee" }}
              />

              <InputField
                label="Giờ khám"
                name="appointmentTime"
                value={form.appointmentTime}
                onChange={handleChange}
                type="time"
                error={!!errors.appointmentTime}
                helperText={errors.appointmentTime}
                sx={{ backgroundColor: darkMode ? "#2b2b3b" : "#eaf9ee" }}
              />

              <InputField
                label="Ghi chú"
                name="note"
                value={form.note}
                onChange={handleChange}
                multiline
                rows={4}
                sx={{ backgroundColor: darkMode ? "#2b2b3b" : "#eaf9ee" }}
              />
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
              background: darkMode
                ? "linear-gradient(90deg, #0a5a3b, #158437)"
                : "linear-gradient(90deg, #158437, #52b788)",
              "&:hover": {
                background: darkMode
                  ? "linear-gradient(90deg, #046920, #158437)"
                  : "linear-gradient(90deg, #046920, #0a5a3b)",
              },
            }}
          >
            {isStaff ? "Tạo lịch khám" : "Đặt lịch ngay"}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default BookingForm;
