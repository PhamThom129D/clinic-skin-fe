import { Box, Typography, Button, Container } from "@mui/material";

export default function Hero() {
  return (
    <Box
      sx={{
        height: "80vh",
        backgroundImage: "url('/hero-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "white",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
        },
      }}
    >
      <Container sx={{ position: "relative", zIndex: 1 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Thẩm Mỹ Thu Cúc
        </Typography>
        <Typography variant="h6" gutterBottom>
          Nơi sắc đẹp được nâng tầm đẳng cấp ✨
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          href="#booking"
        >
          Đặt lịch ngay
        </Button>
      </Container>
    </Box>
  );
}
