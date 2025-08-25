"use client";

import { Box, Typography, Link, Stack, Divider, IconButton } from "@mui/material";
import { Facebook, Instagram, YouTube, LocationOn, Phone, Email } from "@mui/icons-material";

export default function Footer() {
  return (
    <Box sx={{ bgcolor: "#885f6c", color: "white", py: 10 }}>
      <Box
        sx={{
          px: { xs: 2, sm: 4, md: 8 },
          display: "grid",
          gap: 6,
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
        }}
      >
        {/* Thông tin phòng khám */}
        <Box>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Thu Cúc Clinic
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body2">
              <LocationOn sx={{ verticalAlign: "middle", mr: 0.5 }} /> 123 Đường ABC, Quận XYZ, TP. HCM
            </Typography>
            <Typography variant="body2">
              <Phone sx={{ verticalAlign: "middle", mr: 0.5 }} /> 0909 123 456
            </Typography>
            <Typography variant="body2">
              <Email sx={{ verticalAlign: "middle", mr: 0.5 }} /> contact@thucuc.vn
            </Typography>
          </Stack>
        </Box>

        {/* Liên kết nhanh */}
        <Box>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Liên kết nhanh
          </Typography>
          <Stack spacing={1}>
            <Link href="#" color="inherit" underline="hover">Trang chủ</Link>
            <Link href="#" color="inherit" underline="hover">Ưu đãi</Link>
            <Link href="#" color="inherit" underline="hover">Bác sĩ</Link>
            <Link href="#" color="inherit" underline="hover">Về chúng tôi</Link>
            <Link href="#booking" color="inherit" underline="hover">Liên hệ</Link>
          </Stack>
        </Box>

        {/* Dịch vụ */}
        <Box>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Dịch vụ
          </Typography>
          <Stack spacing={1}>
            <Link href="#" color="inherit" underline="hover">Nâng mũi</Link>
            <Link href="#" color="inherit" underline="hover">Cắt mí</Link>
            <Link href="#" color="inherit" underline="hover">Trị nám</Link>
            <Link href="#" color="inherit" underline="hover">Chăm sóc da</Link>
          </Stack>
        </Box>

        {/* Mạng xã hội */}
        <Box>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Theo dõi chúng tôi
          </Typography>
          <Stack direction="row" spacing={1}>
            <IconButton
              href="#"
              sx={{ color: "white", "&:hover": { color: "#4267B2", bgcolor: "rgba(255,255,255,0.1)" } }}
            >
              <Facebook />
            </IconButton>
            <IconButton
              href="#"
              sx={{ color: "white", "&:hover": { color: "#E1306C", bgcolor: "rgba(255,255,255,0.1)" } }}
            >
              <Instagram />
            </IconButton>
            <IconButton
              href="#"
              sx={{ color: "white", "&:hover": { color: "#FF0000", bgcolor: "rgba(255,255,255,0.1)" } }}
            >
              <YouTube />
            </IconButton>
          </Stack>
        </Box>
      </Box>

      <Divider sx={{ my: 5, borderColor: "rgba(255,255,255,0.3)" }} />

      <Typography textAlign="center" variant="body2" sx={{ opacity: 0.8 }}>
        &copy; {new Date().getFullYear()} Thu Cúc Clinic. All rights reserved.
      </Typography>
    </Box>
  );
}
