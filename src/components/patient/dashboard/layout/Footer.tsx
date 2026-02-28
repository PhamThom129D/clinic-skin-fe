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
    icon: <Phone sx={{ color: "#b766eeff" }} />, 
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
    hoverColor: "#22448dff",
    name: "Facebook"
  },
  { 
    icon: <Instagram />, 
    href: "#", 
    hoverColor: "#dd205fff",
    name: "Instagram"
  },
  { 
    icon: <YouTube />, 
    href: "#", 
    hoverColor: "#fa0000ff",
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
      ? `linear-gradient(135deg, #0f2417 0%, #0d2e1b 50%, #052f17 100%)`
      : `linear-gradient(135deg, #3eff9bff 0%, #7ccea8ff 40%, #0d5723ff 80%)`,
    color: "#ffffff",
    py: { xs: 8, md: 10 },
    overflow: "hidden",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M30 30c0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12 12-5.373 12-12M60 30c0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12 12-5.373 12-12M0 30c0-6.627-5.373-12-12-12s12 5.373 12 12-5.373 12-12 12S0 36.627 0 30M30 0c0-6.627-5.373-12-12-12S6 -6.627 6 0s5.373 12 12 12 12-5.373 12-12M60 0c0-6.627-5.373-12-12-12S36-6.627 36 0s5.373 12 12 12 12-5.373 12-12M30 60c0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12 12-5.373 12-12M60 60c0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12 12-5.373 12-12'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      opacity: 0.08,
    },
    "&::after": {
      content: '""',
      position: "absolute",
      top: "-50%",
      left: "-50%",
      width: "200%",
      height: "200%",
      background: `conic-gradient(from 0deg, transparent, rgba(56,239,125,0.12), transparent)`,
      animation: "rotate 25s linear infinite",
    },
  }}
>
  <Container maxWidth="xl">
    {/* Achievements */}
    <Box sx={{ mb: 8 }}>
      <Box 
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
          gap: 6,
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
              p: 6,
              textAlign: "center",
              border: `1px solid ${alpha("#ffffff", 0.15)}`,
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": {
                background: alpha("#ffffff", 0.15),
                transform: "translateY(-6px)",
                boxShadow: `0 10px 30px ${alpha("#000000", 0.25)}`,
              }
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 5 }}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: "100%",
                  background: `linear-gradient(135deg, ${alpha("#ffffff", 0.25)}, ${alpha("#ffffff", 0.15)})`,
                  color: "#1997a0ff",
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
                mb: 1.5,
              }}
            >
              {item.number}
            </Typography>
            <Typography variant="body2" sx={{ color: alpha("#ffffff", 0.9), fontWeight: 800 }}>
              {item.text}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Box>

    {/* Footer Main */}
    <Box 
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "2fr 1fr 1fr 1.2fr" },
        gap: { xs: 5, md: 7 },
        mb: 6,
        
      }}
    >
      {/* Company Info */}
      <Box>
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: "800",
              background: "linear-gradient(135deg, #ffffff, #f0f0f0)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 2.5,
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
              lineHeight: 1.8,
            }}
          >
            Trung tâm thẩm mỹ da liễu hàng đầu với công nghệ tiên tiến và đội ngũ bác sĩ giàu kinh nghiệm, mang đến vẻ đẹp tự nhiên và an toàn cho khách hàng.
          </Typography>
        </Box>

        {/* Contact Info */}
        <Stack spacing={2.5}>
          {contactInfo.map((item, i) => (
            <Box 
              key={i}
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 2,
                p: 2,
                borderRadius: 2,
                background: alpha("#ffffff", 0.06),
                border: `1px solid ${alpha("#ffffff", 0.1)}`,
                transition: "all 0.3s ease",
                "&:hover": {
                  background: alpha("#ffffff", 0.12),
                  transform: "translateX(5px)",
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
                    mb: 0.7,
                  }}
                >
                  {item.title}
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ color: "#ffffff", fontWeight: 500 }}
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
        <Typography variant="h6" sx={sectionTitle}>Liên kết nhanh</Typography>
        <Stack spacing={2}>
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
                  "& .arrow": { transform: "translateX(4px)", opacity: 1 }
                }
              }}
            >
              <KeyboardArrowRight 
                className="arrow"
                sx={{ fontSize: "1rem", color: alpha("#ffffff", 0.6), opacity: 0, transition: "all 0.3s ease" }} 
              />
              <Typography variant="body2" sx={{ color: alpha("#ffffff", 0.9), fontWeight: 500 }}>
                {item.label}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>

      {/* Services */}
      <Box>
        <Typography variant="h6" sx={sectionTitle}>Dịch vụ nổi bật</Typography>
        <Stack spacing={2}>
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
                "&:hover": { background: alpha("#ffffff", 0.1), transform: "translateX(8px)" }
              }}
            >
              <Typography variant="body2" sx={{ color: alpha("#ffffff", 0.9), fontWeight: 500 }}>
                {item.label}
              </Typography>
              {item.isNew && <Badge text="New" colors={["#38ef47ff", "#11998e"]} />}
              {item.isHot && <Badge text="Hot" colors={["#00f2fe", "#4facfe"]} />}
            </Box>
          ))}
        </Stack>
      </Box>

      {/* Social */}
      <Box>
        <Typography variant="h6" sx={sectionTitle}>Kết nối với chúng tôi</Typography>
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

        {/* Quality */}
        <Box sx={{ p: 3, borderRadius: 3, background: alpha("#ffffff", 0.08), border: `1px solid ${alpha("#ffffff", 0.1)}`, textAlign: "center" }}>
          <Typography variant="body2" sx={{ color: alpha("#ffffff", 0.9), fontWeight: 600, mb: 1 }}>
            🏆 Chứng nhận chất lượng
          </Typography>
          <Typography variant="body2" sx={{ color: alpha("#ffffff", 0.7), fontSize: "0.8rem" }}>
            ISO 9001:2015 • FDA Approved • GMP Standard
          </Typography>
        </Box>
      </Box>
    </Box>

    {/* Divider */}
    <Divider sx={{ my: 6, borderColor: "transparent", background: `linear-gradient(90deg, transparent, ${alpha("#221e1eff", 0.3)}, transparent)`, height: 1 }} />

    {/* Bottom */}
    <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", alignItems: "center", gap: 3 }}>
      <Typography variant="body2" sx={{ color: alpha("#ffffff", 0.8), textAlign: { xs: "center", md: "left" } }}>
        &copy; {new Date().getFullYear()} Thu Cúc Clinic. Tất cả quyền được bảo lưu.
      </Typography>
      <Box sx={{ display: "flex", gap: 3 }}>
        <Link href="#" underline="hover" sx={linkStyle}>Chính sách bảo mật</Link>
        <Link href="#" underline="hover" sx={linkStyle}>Điều khoản sử dụng</Link>
      </Box>
    </Box>
  </Container>

  {/* Animation */}
  <style jsx global>{`
    @keyframes rotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `}</style>
</Box>
  );
}

const sectionTitle = {
  fontWeight: "700",
  color: "#ffffffff",
  mb: 3,
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: -8,
    left: 0,
    width: 40,
    height: 3,
    background: "linear-gradient(90deg, #e7d35dff, transparent)",
    borderRadius: 2,
  }
};

const linkStyle = {
  color: "rgba(255, 255, 255, 0.8)",
  fontWeight: 500,
  position: "relative",
  overflow: "hidden",
  background: "linear-gradient(90deg, rgba(199, 174, 174, 0.8), rgba(255,255,255,0.8))",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  transition: "all 0.3s ease",
  "&:hover": {
    background: "linear-gradient(135deg, #1bff73ff, #11998e, #00f2fe, #4facfe)",
    backgroundSize: "300% 300%",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    animation: "gradientShift 3s ease infinite",
  },
};

// Và animation global
<style jsx global>{`
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`}</style>
const Badge = ({ text, colors }: { text: string; colors: string[] }) => (
  <Box
    sx={{
      ml: 1,
      px: 1.2,
      py: 0.3,
      borderRadius: 1,
      fontSize: "0.65rem",
      fontWeight: "700",
      color: "#fff",
      background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`,
      textTransform: "uppercase",
      boxShadow: `0 2px 8px ${alpha(colors[1], 0.4)}`,
    }}
  >
    {text}
  </Box>
);  