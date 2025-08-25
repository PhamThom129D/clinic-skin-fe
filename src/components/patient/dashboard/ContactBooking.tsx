import { Box, Typography, TextField, Button, Container, Stack } from "@mui/material";

export default function ContactBooking() {
  return (
    <Box sx={{ py: 16 }} id="booking">
      <Typography variant="h4" textAlign="center" gutterBottom>
        Liên Hệ & Đặt Lịch
      </Typography>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Stack spacing={3}>
          <TextField label="Họ và tên" fullWidth variant="outlined" />
          <TextField label="Số điện thoại" fullWidth variant="outlined" />
          <TextField
            label="Nội dung"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
          />
          <Button variant="contained" color="primary" size="large">
            Gửi yêu cầu
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
