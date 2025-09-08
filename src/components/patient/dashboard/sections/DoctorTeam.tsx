import React from "react";
import { Typography, Box } from "@mui/material";
import { Doctor } from "@/types/screen";
import { getDoctorsBasic } from "@/services/screenService";
import { useFetchData } from "@/hooks/useFetchData";

const DoctorTeamSimple: React.FC = () => {
  const { data: doctors, isLoading } = useFetchData<Doctor[]>(getDoctorsBasic);

  if (isLoading) return <Typography>Loading...</Typography>;

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
            mx: 8,
            flex: { xs: "1 1 100%", sm: "1 1 250px" },
          }}
        >
          <Box
            component="img"
            src={doc.avtPath}
            alt={doc.fullName}
            sx={{ width: "100%", height: "auto", borderRadius: 2, mb: 1}}
          />
          <Typography variant="h5" sx={{ mt: 1 }}>
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
