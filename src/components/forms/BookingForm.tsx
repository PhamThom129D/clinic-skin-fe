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
  SelectChangeEvent,
  useTheme,
} from "@mui/material";
import InputField from "../common/InputField";
import { BookingData } from "@/types/screen";
import { Doctor } from "@/types/screen";
import { getDoctorsBasic } from "@/services/screenService";
import { useFetchData } from "@/hooks/useFetchData";
import { notifyError, notifySuccess, notifyWarning } from "@/utils/toast";
import { registerAppointment } from "@/services/bookingService";
import GenderSelect from "../common/GenderSelect";
import {
  validateField,
  validateFormBooking,
} from "@/utils/validation/bookingValidator";

type Errors = Partial<Record<keyof BookingData, string>>;

interface BookingFormProps {
  onSubmit?: (data: BookingData) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ onSubmit }) => {
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
    note: ""
  });

  const [errors, setErrors] = useState<Errors>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
    [name]: value
    }));
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
      notifyWarning("Vui lòng kiểm tra lại thông tin.");
      return;
    }
    try {
      await registerAppointment(form);
      notifySuccess("Đặt lịch thành công! Chúng tôi sẽ liên hệ bạn sớm.");
      onSubmit?.(form);
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
        note: ""
      });
      setErrors({});
    } catch (error) {
      notifyError("Đặt lịch thất bại. Vui lòng thử lại.");
      console.error("❌ API Error:", error);
    }
  };

  return (
<Paper
  elevation={6}
  sx={{
    p: 4,
    borderRadius: 3,
    background: "#dffbec", 
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
            color="#158437" // màu xanh chủ đạo
          >
            Đặt lịch khám
          </Typography>

          <Divider sx={{ borderColor: "#a0d9b8" }} />

          <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
            {/* Thông tin cá nhân */}
            <Stack spacing={2} flex={1}>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                color="#046920"
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
                sx={{ backgroundColor: "#eaf9ee" }}
              />
              <InputField
                label="CMND/Hộ chiếu"
                name="passportNumber"
                value={form.passportNumber}
                onChange={handleChange}
                error={!!errors.passportNumber}
                helperText={errors.passportNumber}
                sx={{ backgroundColor: "#eaf9ee" }}
              />
              <InputField
                label="Nghề nghiệp"
                name="occupation"
                value={form.occupation}
                onChange={handleChange}
                error={!!errors.occupation}
                helperText={errors.occupation}
                sx={{ backgroundColor: "#eaf9ee" }}
              />
              <InputField
                label="Địa chỉ"
                name="address"
                value={form.address}
                onChange={handleChange}
                error={!!errors.address}
                helperText={errors.address}
                sx={{ backgroundColor: "#eaf9ee" }}
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
                sx={{ backgroundColor: "#eaf9ee" }}
              />
            </Stack>

            {/* Thông tin đặt lịch */}
            <Stack spacing={2} flex={1}>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                color="#046920"
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
                sx={{ backgroundColor: "#eaf9ee" }}
              />
                    <InputField
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                error={!!errors.email}
                helperText={errors.email}
                sx={{ backgroundColor: "#eaf9ee" }}
              />
              <InputField
                label="Ngày khám"
                name="appointmentDate"
                value={form.appointmentDate}
                onChange={handleChange}
                type="date"
                error={!!errors.appointmentDate}
                helperText={errors.appointmentDate}
                sx={{ backgroundColor: "#eaf9ee" }}
              />
              <InputField
                label="Giờ khám"
                name="appointmentTime"
                value={form.appointmentTime}
                onChange={handleChange}
                type="time"
                error={!!errors.appointmentTime}
                helperText={errors.appointmentTime}
                sx={{ backgroundColor: "#eaf9ee" }}
              />
              <InputField
                label="Ghi chú"
                name="note"
                value={form.note}
                onChange={handleChange}
                multiline
                rows={4}
                sx={{ backgroundColor: "#eaf9ee" }}
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
              background: "linear-gradient(90deg, #158437, #52b788)",
              "&:hover": {
                background: "linear-gradient(90deg, #046920, #0a5a3b)",
              },
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
