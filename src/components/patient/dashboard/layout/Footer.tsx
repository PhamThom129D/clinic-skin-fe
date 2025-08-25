'use client';

import { Box, Typography, Link, Stack, Divider, IconButton } from "@mui/material";
import { Facebook, Instagram, YouTube, LocationOn, Phone, Email } from "@mui/icons-material";


const contactInfo = [
  { icon: <LocationOn sx={{ verticalAlign: "middle", mr: 0.5 }} />, text: "123 Đường ABC, Quận XYZ, TP. HCM" },
  { icon: <Phone sx={{ verticalAlign: "middle", mr: 0.5 }} />, text: "0909 123 456" },
  { icon: <Email sx={{ verticalAlign: "middle", mr: 0.5 }} />, text: "contact@thucuc.vn" },
];

const quickLinks = [
  { label: "Trang chủ", href: "#" },
  { label: "Ưu đãi", href: "#" },
  { label: "Bác sĩ", href: "#" },
  { label: "Về chúng tôi", href: "#" },
  { label: "Liên hệ", href: "#booking" },
];

const services = [
  { label: "Nâng mũi", href: "#" },
  { label: "Cắt mí", href: "#" },
  { label: "Trị nám", href: "#" },
  { label: "Chăm sóc da", href: "#" },
];

const socialLinks = [
  { icon: <Facebook />, href: "#", hoverColor: "#4267B2" },
  { icon: <Instagram />, href: "#", hoverColor: "#E1306C" },
  { icon: <YouTube />, href: "#", hoverColor: "#FF0000" },
];

// ===================== COMPONENT =====================
export default function Footer() {
  return (
    <Box sx={{ bgcolor: "#6b8e6f", color: "#ffffff", py: 4 }}>
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
            {contactInfo.map((item, i) => (
              <Typography key={i} variant="body2" sx={{ color: "#d3f4d1" }}>
                {item.icon} {item.text}
              </Typography>
            ))}
          </Stack>
        </Box>

        {/* Liên kết nhanh */}
        <Box>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Liên kết nhanh
          </Typography>
          <Stack spacing={1}>
            {quickLinks.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                underline="hover"
                sx={{
                  color: "#d3f4d1",
                  fontWeight: 500,
                  "&:hover": { color: "#f4d6b0" },
                }}
              >
                {item.label}
              </Link>
            ))}
          </Stack>
        </Box>

        {/* Dịch vụ */}
        <Box>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Dịch vụ
          </Typography>
          <Stack spacing={1}>
            {services.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                underline="hover"
                sx={{
                  color: "#d3f4d1",
                  fontWeight: 500,
                  "&:hover": { color: "#f4d6b0" },
                }}
              >
                {item.label}
              </Link>
            ))}
          </Stack>
        </Box>

        {/* Mạng xã hội */}
        <Box>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Theo dõi chúng tôi
          </Typography>
          <Stack direction="row" spacing={1}>
            {socialLinks.map((item, i) => (
              <IconButton
                key={i}
                href={item.href}
                sx={{
                  color: "#ffffff",
                  "&:hover": { color: item.hoverColor, bgcolor: "rgba(255, 145, 0, 0.1)" },
                }}
              >
                {item.icon}
              </IconButton>
            ))}
          </Stack>
        </Box>
      </Box>

      <Divider sx={{ my: 3, borderColor: "rgba(255, 255, 255, 0.3)" }} />

      <Typography textAlign="center" variant="body2" sx={{ color: "#ffffff", opacity: 0.85 }}>
        &copy; {new Date().getFullYear()} Thu Cúc Clinic. All rights reserved.
      </Typography>
    </Box>
  );
}
