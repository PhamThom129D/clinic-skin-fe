import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import React, { useState } from "react";
import CardHover from "../../../../../common/CardHover";
import { Offer } from "@/types/screen";
import { getOffers } from "@/services/screenService";
import { useFetchData } from "@/hooks/useFetchData";
import WhatshotIcon from "@mui/icons-material/Whatshot";

const Offers: React.FC = () => {
  const { data: offers, isLoading } = useFetchData<Offer[]>(getOffers);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Offer | null>(null);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (!offers || offers.length === 0) {
    return <Typography></Typography>;
  }

  const handleOpen = (o: Offer) => {
    setSelected(o);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelected(null);
  };

  return (
    <Box sx={{ py: 8, px: { xs: 2, sm: 6, md: 16 } }}>
 <Box sx={{ textAlign: "center", mb: 6 }}>
  <Typography
    variant="h2"
    fontWeight="bold"
    sx={{
      textTransform: "uppercase",
      letterSpacing: 2,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 1,
      background: "linear-gradient(90deg, #158437, #52b788)", // gradient xanh
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    }}
  >
    <WhatshotIcon sx={{ fontSize: 60, color: "#158437" }} /> 
    Dịch Vụ Hot
  </Typography>

  <Typography
    variant="h6"
    color="text.secondary"
    sx={{ mt: 1, fontStyle: "italic" }}
  >
    Khám phá dịch vụ làm đẹp chuẩn 5★, an toàn & hiệu quả
  </Typography>
</Box>


      <Box
        sx={{
          display: "grid",
          gap: 4,
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2,1fr)",
            md: "repeat(3,1fr)",
          },
        }}
      >
        {offers.map((o, i) => (
          <CardHover
            key={(o as any).id ?? i}
            image={o.img}
            sx={{
              backgroundColor: "#e7fdf1",
              borderRadius: 3,
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              p: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography
                variant="h6"
                color="primary"
                sx={{ mb: 1, fontWeight: "bold" }}
              >
                {o.title}
              </Typography>

              {/* Hiển thị mô tả ngắn (truncate 3 dòng) */}
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  fontSize: "0.9rem",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  p:2
                }}
              >
                {o.description}
              </Typography>
            </Box>

            <Button
              variant="contained"
              sx={{
                mt: 2,
                alignSelf: "flex-start",
                backgroundColor: "#158437",
                "&:hover": { backgroundColor: "#052f17" },
                borderRadius: 2,
                textTransform: "none",
                fontWeight: "bold",
              }}
              onClick={() => handleOpen(o)}
            >
              Tìm hiểu thêm
            </Button>
          </CardHover>
        ))}
      </Box>

      {/* Dialog hiển thị mô tả đầy đủ */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{selected?.title}</DialogTitle>
        <DialogContent dividers>
          <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: "pre-wrap" }}>
            {selected?.description}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Đóng</Button>
          <Button variant="contained" onClick={handleClose}>
            Đặt lịch
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Offers;
