import { useState } from "react";
import { Box, Typography, TextField, Button, Container, Stack, useTheme } from "@mui/material";
import { createContact } from "@/services/contactService";

export default function ContactBooking() {
  const theme = useTheme();
  const [form, setForm] = useState({ fullname: "", phone: "", reason: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await createContact(form);
      alert("📩 Gửi yêu cầu thành công!");
      setForm({ fullname: "", phone: "", reason: "" });
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu:", error);
      alert("❌ Gửi yêu cầu thất bại!");
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

      <Container maxWidth="sm">
        <Box 
          sx={{ 
            p: { xs: 3, md: 6 }, 
            bgcolor: "background.paper", 
            borderRadius: 3, 
            boxShadow: "0 4px 25px rgba(0,0,0,0.08)" 
          }}
        >
          <Stack spacing={3}>
            <TextField 
              label="Họ và tên" 
              name="fullname"
              value={form.fullname}
              onChange={handleChange}
              fullWidth 
              variant="outlined" 
              sx={{ bgcolor: "#f5f5f5", borderRadius: 1 }}
            />
            <TextField 
              label="Số điện thoại" 
              name="phone"
              value={form.phone}
              onChange={handleChange}
              fullWidth 
              variant="outlined" 
              sx={{ bgcolor: "#f5f5f5", borderRadius: 1 }}
            />
            <TextField
              label="Nội dung"
              name="reason"
              value={form.reason}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              sx={{ bgcolor: "#f5f5f5", borderRadius: 1 }}
            />
            <Button 
              variant="contained" 
              size="large" 
              onClick={handleSubmit}
              sx={{ 
                bgcolor: theme.palette.primary.main, 
                color: "#fff", 
                fontWeight: "bold", 
                py: 1.5,
                "&:hover": { bgcolor: theme.palette.primary.dark } 
              }}
            >
              Gửi yêu cầu
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
