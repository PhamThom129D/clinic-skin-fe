import React from "react";
import { Typography, Box } from "@mui/material";
import { Doctor } from "@/types/screen";
import { getDoctorsBasic } from "@/services/screenService";
import { useFetchData } from "@/hooks/useFetchData";

const DoctorTeamSimple: React.FC = () => {
  const { data: doctors, isLoading } = useFetchData<Doctor[]>(getDoctorsBasic);

<<<<<<< HEAD
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:1209/api/screen/doctors");
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }
=======
  if (isLoading) return <Typography>Loading...</Typography>;
>>>>>>> 69d1592126eb443eafece335cd0fd8935d056119

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 4,
        justifyContent: "center",
        px: { xs: 2, sm: 4, md: 8 },
      }}
    >
      {doctors?.map((doc, i) => (
        <Box
          key={i}
          sx={{
            textAlign: "center",
            maxWidth: { xs: "100%", sm: 250 },
            flex: { xs: "1 1 100%", sm: "1 1 250px" },
          }}
        >
          <Box
            component="img"
            src={doc.avtPath}
            alt={doc.fullName}
            sx={{ width: "100%", height: "auto", borderRadius: 2, mb: 1 }}
          />
          <Typography variant="h6" sx={{ mt: 1 }}>
            {doc.fullName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {doc.specialty}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default DoctorTeamSimple;
