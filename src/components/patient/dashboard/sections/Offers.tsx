import { Box, Typography } from "@mui/material";
import React from "react";
import CardHover from "../../../common/CardHover";
import { Offer } from "@/types/screen";
import { getOffers } from "@/services/screenService";
import { useFetchData } from "@/hooks/useFetchData";

const Offers: React.FC = () => {
  const { data: offers, isLoading } = useFetchData<Offer[]>(getOffers);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (!offers || offers.length === 0) {
    return <Typography>Không có ưu đãi nào</Typography>;
  }

  return (
    <Box sx={{ py: 8, px: { xs: 2, sm: 6, md: 16 } }}>
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography variant="h4" fontWeight="bold">
          Ưu Đãi Hot
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
          <CardHover key={i} image={o.img}>
            <Typography
              variant="h6"
              color="primary"
              sx={{ mb: 1, fontWeight: "bold" }}
            >
              {o.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {o.desc}
            </Typography>
          </CardHover>
        ))}
      </Box>
    </Box>
  );
};

export default Offers;
