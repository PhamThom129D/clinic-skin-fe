import { Box, Typography, TextField, Button, Container, Stack, useTheme } from "@mui/material";

export default function ContactBooking() {
  const theme = useTheme();
  return (
    <Box sx={{ py: { xs: 10, md: 16 } }} id="booking">
      {/* Section title */}
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

      {/* Form */}
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
              fullWidth 
              variant="outlined" 
              sx={{ bgcolor: "#f5f5f5", borderRadius: 1 }}
            />
            <TextField 
              label="Số điện thoại" 
              fullWidth 
              variant="outlined" 
              sx={{ bgcolor: "#f5f5f5", borderRadius: 1 }}
            />
            <TextField
              label="Nội dung"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              sx={{ bgcolor: "#f5f5f5", borderRadius: 1 }}
            />
            <Button 
              variant="contained" 
              size="large" 
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
