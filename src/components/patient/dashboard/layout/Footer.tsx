'use client';

import { 
  Box, 
  Typography, 
  Link, 
  Stack, 
  Divider, 
  IconButton, 
  Container,
  alpha,
  useTheme,
  Paper
} from "@mui/material";
import { 
  Facebook, 
  Instagram, 
  YouTube, 
  LocationOn, 
  Phone, 
  Email,
  Schedule,
  LocalHospital,
  Security,
  EmojiEvents,
  KeyboardArrowRight
} from "@mui/icons-material";

const contactInfo = [
  { 
    icon: <LocationOn sx={{ color: "#4facfe" }} />, 
    title: "Địa chỉ",
    text: "123 Đường ABC, Quận XYZ, TP. HCM" 
  },
  { 
    icon: <Phone sx={{ color: "#38ef7d" }} />, 
    title: "Hotline 24/7",
    text: "0909 123 456" 
  },
  { 
    icon: <Email sx={{ color: "#00f2fe" }} />, 
    title: "Email",
    text: "contact@thucuc.vn" 
  },
  { 
    icon: <Schedule sx={{ color: "#11998e" }} />, 
    title: "Giờ làm việc",
    text: "8:00 - 20:00 (T2-CN)" 
  },
];

const quickLinks = [
  { label: "Trang chủ", href: "#banner" },
  { label: "Ưu đãi đặc biệt", href: "#offers" },
  { label: "Đội ngũ bác sĩ", href: "#doctor-team" },
  { label: "Về chúng tôi", href: "#why-choose-us" },
  { label: "Liên hệ đặt lịch", href: "#contact-booking" },
  { label: "Chứng nhận", href: "#facilities" },
];

const services = [
  { label: "Nâng mũi S-Line", href: "#", isNew: true },
  { label: "Cắt mí Hàn Quốc", href: "#", isHot: true },
  { label: "Trị nám công nghệ cao", href: "#" },
  { label: "Chăm sóc da Anti-aging", href: "#" },
  { label: "Botox & Filler", href: "#" },
  { label: "Laser trẻ hóa da", href: "#" },
];

const achievements = [
  { icon: <LocalHospital />, number: "10+", text: "Năm kinh nghiệm" },
  { icon: <EmojiEvents />, number: "50K+", text: "Khách hàng tin tưởng" },
  { icon: <Security />, number: "100%", text: "Bảo hành dịch vụ" },
];

const socialLinks = [
  { 
    icon: <Facebook />, 
    href: "#", 
    hoverColor: "#3b5998",
    name: "Facebook"
  },
  { 
    icon: <Instagram />, 
    href: "#", 
    hoverColor: "#e1306c",
    name: "Instagram"
  },
  { 
    icon: <YouTube />, 
    href: "#", 
    hoverColor: "#ff0000",
    name: "YouTube"
  },
];

export default function Footer() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const handleLinkClick = (href: string) => {
    if (href.startsWith("#")) {
      document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        background: isDark
          ? `linear-gradient(135deg, 
              #0f3460 0%, 
              #0e4749 50%, 
              #16537e 100%)`
          : `linear-gradient(135deg, 
              #11998e 0%, 
              #38ef7d 30%,
              #4facfe 60%,
              #00f2fe 100%)`,
        color: "#ffffff",
        py: { xs: 6, md: 8 },
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M30 30c0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12 12-5.373 12-12M60 30c0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12 12-5.373 12-12M0 30c0-6.627 5.373-12 12-12s12 5.373 12 12-5.373 12-12 12S0 36.627 0 30M30 0c0-6.627-5.373-12-12-12S6 -6.627 6 0s5.373 12 12 12 12-5.373 12-12M60 0c0-6.627-5.373-12-12-12S36-6.627 36 0s5.373 12 12 12 12-5.373 12-12M30 60c0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12 12-5.373 12-12M60 60c0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12 12-5.373 12-12'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          opacity: 0.1,
        },
        "&::after": {
          content: '""',
          position: "absolute",
          top: "-50%",
          left: "-50%",
          width: "200%",
          height: "200%",
          background: `conic-gradient(from 0deg, transparent, rgba(56,239,125,0.1), transparent)`,
          animation: "rotate 25s linear infinite",
        },
      }}
    >
      <Container maxWidth="xl">
        {/* Achievements Bar */}
        <Box sx={{ mb: 6 }}>
          <Box 
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
              gap: 3,
            }}
          >
            {achievements.map((item, index) => (
              <Paper
                key={index}
                elevation={0}
                sx={{
                  background: alpha("#ffffff", 0.1),
                  backdropFilter: "blur(10px)",
                  borderRadius: 3,
                  p: 3,
                  textAlign: "center",
                  border: `1px solid ${alpha("#ffffff", 0.1)}`,
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    background: alpha("#ffffff", 0.15),
                    transform: "translateY(-4px)",
                    boxShadow: `0 8px 25px ${alpha("#000000", 0.2)}`,
                  }
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${alpha("#ffffff", 0.2)}, ${alpha("#ffffff", 0.1)})`,
                      color: "#ffffff",
                    }}
                  >
                    {item.icon}
                  </Box>
                </Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "800",
                    background: "linear-gradient(135deg, #ffffff, #f0f0f0)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    mb: 1,
                  }}
                >
                  {item.number}
                </Typography>
                <Typography variant="body2" sx={{ color: alpha("#ffffff", 0.9), fontWeight: 500 }}>
                  {item.text}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Box>

        {/* Main Footer Content */}
        <Box 
          sx={{
            display: "grid",
            gridTemplateColumns: { 
              xs: "1fr", 
              md: "2fr 1fr 1fr 1.2fr" 
            },
            gap: { xs: 4, md: 6 },
          }}
        >
          {/* Company Info */}
          <Box>
            <Box sx={{ mb: 3 }}>
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: "800",
                  background: "linear-gradient(135deg, #ffffff, #f0f0f0)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <LocalHospital sx={{ color: "#ffffff" }} />
                Thu Cúc Clinic
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: alpha("#ffffff", 0.9), 
                  mb: 3,
                  lineHeight: 1.7,
                  fontWeight: 400,
                }}
              >
                Trung tâm thẩm mỹ da liễu hàng đầu với công nghệ tiên tiến và đội ngũ bác sĩ giàu kinh nghiệm, mang đến vẻ đẹp tự nhiên và an toàn cho khách hàng.
              </Typography>
            </Box>

            {/* Contact Info với design đẹp */}
            <Stack spacing={2}>
              {contactInfo.map((item, i) => (
                <Box 
                  key={i}
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 2,
                    p: 2,
                    borderRadius: 2,
                    background: alpha("#ffffff", 0.05),
                    border: `1px solid ${alpha("#ffffff", 0.1)}`,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background: alpha("#ffffff", 0.1),
                      transform: "translateX(4px)",
                    }
                  }}
                >
                  <Box sx={{ mt: 0.5 }}>{item.icon}</Box>
                  <Box>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: alpha("#ffffff", 0.7),
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: 1,
                        mb: 0.5,
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: "#ffffff",
                        fontWeight: 500,
                      }}
                    >
                      {item.text}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Stack>
          </Box>

          {/* Quick Links */}
          <Box>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: "700",
                color: "#ffffff",
                mb: 3,
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: -8,
                  left: 0,
                  width: 40,
                  height: 3,
                  background: "linear-gradient(90deg, #ffffff, transparent)",
                  borderRadius: 2,
                }
              }}
            >
              Liên kết nhanh
            </Typography>
            <Stack spacing={1.5}>
              {quickLinks.map((item, i) => (
                <Box
                  key={i}
                  onClick={() => handleLinkClick(item.href)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    cursor: "pointer",
                    p: 1,
                    borderRadius: 1,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background: alpha("#ffffff", 0.1),
                      transform: "translateX(8px)",
                      "& .arrow": {
                        transform: "translateX(4px)",
                        opacity: 1,
                      }
                    }
                  }}
                >
                  <KeyboardArrowRight 
                    className="arrow"
                    sx={{ 
                      fontSize: "1rem",
                      color: alpha("#ffffff", 0.6),
                      transition: "all 0.3s ease",
                      opacity: 0,
                    }} 
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      color: alpha("#ffffff", 0.9),
                      fontWeight: 500,
                      "&:hover": { color: "#ffffff" },
                    }}
                  >
                    {item.label}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>

          {/* Services */}
          <Box>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: "700",
                color: "#ffffff",
                mb: 3,
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: -8,
                  left: 0,
                  width: 40,
                  height: 3,
                  background: "linear-gradient(90deg, #ffffff, transparent)",
                  borderRadius: 2,
                }
              }}
            >
              Dịch vụ nổi bật
            </Typography>
            <Stack spacing={1.5}>
              {services.map((item, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    cursor: "pointer",
                    p: 1,
                    borderRadius: 1,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background: alpha("#ffffff", 0.1),
                      transform: "translateX(8px)",
                    }
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: alpha("#ffffff", 0.9),
                      fontWeight: 500,
                      "&:hover": { color: "#ffffff" },
                    }}
                  >
                    {item.label}
                  </Typography>
                  {item.isNew && (
                    <Box
                      sx={{
                        px: 1,
                        py: 0.25,
                        borderRadius: 1,
                        background: "linear-gradient(135deg, #38ef7d, #11998e)",
                        fontSize: "0.6rem",
                        fontWeight: "bold",
                        color: "#ffffff",
                        textTransform: "uppercase",
                        boxShadow: "0 2px 8px rgba(56, 239, 125, 0.4)",
                      }}
                    >
                      New
                    </Box>
                  )}
                  {item.isHot && (
                    <Box
                      sx={{
                        px: 1,
                        py: 0.25,
                        borderRadius: 1,
                        background: "linear-gradient(135deg, #00f2fe, #4facfe)",
                        fontSize: "0.6rem",
                        fontWeight: "bold",
                        color: "#ffffff",
                        textTransform: "uppercase",
                        boxShadow: "0 2px 8px rgba(79, 172, 254, 0.4)",
                      }}
                    >
                      Hot
                    </Box>
                  )}
                </Box>
              ))}
            </Stack>
          </Box>

          {/* Social & Newsletter */}
          <Box>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: "700",
                color: "#ffffff",
                mb: 3,
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: -8,
                  left: 0,
                  width: 40,
                  height: 3,
                  background: "linear-gradient(90deg, #ffffff, transparent)",
                  borderRadius: 2,
                }
              }}
            >
              Kết nối với chúng tôi
            </Typography>
            
            {/* Social Links */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="body2" sx={{ color: alpha("#ffffff", 0.8), mb: 2 }}>
                Theo dõi để nhận tin tức và ưu đãi mới nhất
              </Typography>
              <Stack direction="row" spacing={2}>
                {socialLinks.map((item, i) => (
                  <IconButton
                    key={i}
                    href={item.href}
                    sx={{
                      background: alpha("#ffffff", 0.1),
                      color: "#ffffff",
                      width: 48,
                      height: 48,
                      backdropFilter: "blur(10px)",
                      border: `1px solid ${alpha("#ffffff", 0.1)}`,
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      "&:hover": {
                        background: item.hoverColor,
                        transform: "translateY(-4px) scale(1.1)",
                        boxShadow: `0 8px 25px ${alpha(item.hoverColor, 0.3)}`,
                      }
                    }}
                  >
                    {item.icon}
                  </IconButton>
                ))}
              </Stack>
            </Box>

            {/* Quality Badges */}
            <Box
              sx={{
                p: 3,
                borderRadius: 3,
                background: alpha("#ffffff", 0.08),
                border: `1px solid ${alpha("#ffffff", 0.1)}`,
                textAlign: "center",
              }}
            >
              <Typography 
                variant="body2" 
                sx={{ 
                  color: alpha("#ffffff", 0.9),
                  fontWeight: 600,
                  mb: 1,
                }}
              >
                🏆 Chứng nhận chất lượng
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: alpha("#ffffff", 0.7),
                  fontSize: "0.8rem",
                }}
              >
                ISO 9001:2015 • FDA Approved • GMP Standard
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Divider với gradient */}
        <Divider 
          sx={{ 
            my: 6, 
            borderColor: "transparent",
            background: `linear-gradient(90deg, transparent, ${alpha("#ffffff", 0.3)}, transparent)`,
            height: 1,
          }} 
        />

        {/* Bottom Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography 
            variant="body2" 
            sx={{ 
              color: alpha("#ffffff", 0.8),
              textAlign: { xs: "center", md: "left" },
            }}
          >
            &copy; {new Date().getFullYear()} Thu Cúc Clinic. Tất cả quyền được bảo lưu.
          </Typography>
          
          <Box sx={{ display: "flex", gap: 3 }}>
            <Link
              href="#"
              underline="hover"
              sx={{
                color: alpha("#ffffff", 0.8),
                fontSize: "0.8rem",
                fontWeight: 500,
                "&:hover": { color: "#ffffff" },
              }}
            >
              Chính sách bảo mật
            </Link>
            <Link
              href="#"
              underline="hover"
              sx={{
                color: alpha("#ffffff", 0.8),
                fontSize: "0.8rem",
                fontWeight: 500,
                "&:hover": { color: "#ffffff" },
              }}
            >
              Điều khoản sử dụng
            </Link>
          </Box>
        </Box>
      </Container>
      
      {/* CSS cho animation */}
      <style jsx global>{`
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </Box>
  );
}
