import { Box, Typography } from "@mui/material";
import React from "react";
import { createContact } from "@/services/bookingService";
import ContactForm from "@/components/forms/ContactForm";
import { notifyError, notifySuccess } from "@/utils/toast";

export default function ContactBooking() {
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
      {/* Tiêu đề chính đồng bộ */}
      <Box
        component="h2"
        sx={{
          textTransform: "uppercase",
          letterSpacing: 2,
          fontWeight: "bold",
          fontSize: { xs: "2rem", md: "2.5rem" },
          textAlign: "center",
          background: "linear-gradient(90deg, #158437, #52b788)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          mb: 2,
        }}
      >
        Liên Hệ & Đặt Lịch
      </Box>

      {/* Nội dung phụ */}
      <Typography
        variant="subtitle1"
        textAlign="center"
        sx={{ mb: { xs: 4, md: 6 }, color: "text.secondary", fontSize: "1.1rem" }}
      >
        Vui lòng điền thông tin dưới đây, chúng tôi sẽ liên hệ bạn sớm nhất.
      </Typography>

      {/* Gọi ContactForm */}
      <ContactForm onSubmit={handleSubmit} />
    </Box>
  );
}
