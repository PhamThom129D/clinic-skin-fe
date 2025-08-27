// src/components/ContactBooking.tsx
import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import { createContact } from "@/services/contactService";
import ContactForm from "@/components/forms/ContactForm";
import { notifyError, notifySuccess } from "@/utils/toast";


export default function ContactBooking() {
  const theme = useTheme();

  const handleSubmit = async (data: { fullname: string; phone: string; reason: string }) => {
    try {
      await createContact(data);
      notifySuccess("Gửi yêu cầu thành công! Chúng tôi sẽ liên hệ bạn sớm.");
    } catch (err) {
      console.error("Lỗi khi gửi yêu cầu:", err);
      notifyError("Gửi yêu cầu thất bại! Thử lại sau.");
    }
  };

  return (
    <Box sx={{ py: { xs: 10, md: 16 } }} id="booking">
      <Typography
        variant="h4"
        textAlign="center"
        gutterBottom
        sx={{ fontWeight: "bold", color: theme.palette.primary.main }}
      >
        Liên Hệ & Đặt Lịch
      </Typography>
      <Typography
        variant="body1"
        textAlign="center"
        sx={{ mb: { xs: 4, md: 6 }, color: "text.secondary" }}
      >
        Vui lòng điền thông tin dưới đây, chúng tôi sẽ liên hệ bạn sớm nhất.
      </Typography>

      <ContactForm onSubmit={handleSubmit} />
    </Box>
  );
}
