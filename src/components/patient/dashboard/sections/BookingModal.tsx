import React from "react";
import { Modal, Box, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { BookingData } from "@/types/screen";
import { registerAppointment } from "@/services/bookingService";
import { notifyError, notifySuccess } from "@/utils/toast";
import BookingForm from "@/components/forms/BookingForm";


interface BookingModalProps {
  open: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ open, onClose }) => {
  // 🔹 Xử lý khi user submit form
  const handleUserSubmit = async (data: BookingData) => {
    try {
      await registerAppointment(data);
      notifySuccess("🎉 Đặt lịch thành công! Chúng tôi sẽ liên hệ với bạn sớm.");
      onClose(); 
    } catch (error) {
      console.error("❌ Lỗi khi đặt lịch:", error);
      notifyError("Không thể đặt lịch, vui lòng thử lại.");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          maxWidth: { xs: "95%", sm: 700, md: 1500 },
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 2,
          maxHeight: "90vh",
          overflowY: "auto",
          mx: "auto",
        }}
      >
        {/* Nút đóng */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            mb: 2,
          }}
        >
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>

        {/* Form đặt lịch */}
        <BookingForm onSubmit={handleUserSubmit} />
      </Box>
    </Modal>
  );
};

export default BookingModal;

