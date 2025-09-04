// src/components/Booking/BookingForm.tsx
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
} from "@mui/material";
import InputField from "../common/InputField";
import { BookingData } from "@/types/booking";
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
    doctorId: 0,
  });

  const { data: doctors, isLoading } = useFetchData<Doctor[]>(getDoctorsBasic);
  const [errors, setErrors] = useState<Errors>({});

  // Dùng cho input/textarea
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "doctorId" ? Number(value) : value,
    }));

    // validate ngay khi nhập
    const err = validateField(name as keyof BookingData, value);
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  // Dùng riêng cho Select (MUI SelectChangeEvent)
  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    const err = validateField(name as keyof BookingData, value);
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  // Dùng riêng cho chọn bác sĩ
  const handleSelectDoctor = (id: number) => {
    setForm((prev) => ({ ...prev, doctorId: id }));
    const err = validateField("doctorId", id);
    setErrors((prev) => ({ ...prev, doctorId: err }));
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
      console.log("Payload gửi đi:", form);

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
        note: "",
        doctorId: 0,
      });
      setErrors({});
    } catch (error) {
      notifyError("Đặt lịch thất bại. Vui lòng thử lại.");
      console.error("❌ API Error:", error);
    }
  };

  return (
    <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <Typography
            variant="h5"
            fontWeight="bold"
            textAlign="center"
            color="primary"
          >
            Đặt lịch khám
          </Typography>

          <Divider />

          <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
            {/* Thông tin cá nhân */}
            <Stack spacing={2} flex={1}>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                color="text.secondary"
              >
                Thông tin cá nhân
              </Typography>

              <InputField
                label="Họ và tên"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                error={!!errors.fullName}
                helperText={errors.fullName}
              />
              <InputField
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                error={!!errors.email}
                helperText={errors.email}
              />
              <InputField
                label="Số điện thoại"
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber}
              />
              <InputField
                label="CMND/Hộ chiếu"
                name="passportNumber"
                value={form.passportNumber}
                onChange={handleChange}
                error={!!errors.passportNumber}
                helperText={errors.passportNumber}
              />
              <InputField
                label="Nghề nghiệp"
                name="occupation"
                value={form.occupation}
                onChange={handleChange}
                error={!!errors.occupation}
                helperText={errors.occupation}
              />
              <InputField
                label="Địa chỉ"
                name="address"
                value={form.address}
                onChange={handleChange}
                error={!!errors.address}
                helperText={errors.address}
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
              />
            </Stack>

            {/* Thông tin đặt lịch */}
            <Stack spacing={2} flex={1}>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                color="text.secondary"
              >
                Thông tin đặt lịch
              </Typography>
              <InputField
                label="Ngày khám"
                name="appointmentDate"
                value={form.appointmentDate}
                onChange={handleChange}
                type="date"
                error={!!errors.appointmentDate}
                helperText={errors.appointmentDate}
              />
              <InputField
                label="Giờ khám"
                name="appointmentTime"
                value={form.appointmentTime}
                onChange={handleChange}
                type="time"
                error={!!errors.appointmentTime}
                helperText={errors.appointmentTime}
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
                            height: 200,
                            border:
                              form.doctorId === doc.doctorId
                                ? "2px solid #1976d2"
                                : "1px solid #ddd",
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
                              form.doctorId === doc.doctorId
                                ? "action.hover"
                                : "background.paper",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          onClick={() => handleSelectDoctor(doc.doctorId)}
                        >
                          <Avatar
                            src={doc.avtPath}
                            alt={doc.fullName}
                            sx={{ width: 100, height: 100, mb: 1 }}
                          />
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
                {errors.doctorId && (
                  <Typography color="error" variant="caption">
                    {errors.doctorId}
                  </Typography>
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
