import { Box, Typography } from "@mui/material";
import React from "react";
import CardHover from "../../../common/CardHover";
import { Offer } from "@/types/screen";
import { getOffers } from "@/services/screenService";
import { useFetchData } from "@/hooks/useFetchData";

const Offers: React.FC = () => {
<<<<<<< HEAD
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get("http://localhost:1209/api/screen/offers");
        setOffers(response.data);
      } catch (error) {
        console.error("Error fetching offers:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOffers();
  }, []);
=======
  const { data: offers, isLoading } = useFetchData<Offer[]>(getOffers);
>>>>>>> 69d1592126eb443eafece335cd0fd8935d056119

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
