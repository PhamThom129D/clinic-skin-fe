import React from "react";
import { Modal, Box, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import BookingForm from "@/components/forms/BookingForm";

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ open, onClose }) => {
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

        <BookingForm onSubmit={onClose} />
      </Box>
    </Modal>
  );
};

export default BookingModal;
