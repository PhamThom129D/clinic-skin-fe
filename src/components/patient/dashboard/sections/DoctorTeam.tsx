'user client';

import React, { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import axios from "axios";

interface Doctor {
  doctorId: number;
  fullName: string;
  specialty: string;
  avtPath: string;
}

const DoctorTeamSimple: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 4,
      justifyContent: "center",
      px: { xs: 2, sm: 4, md: 8 },
      py: 8,
    }}
  >
    {doctors.map((doc, i) => (
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
          sx={{
            width: "100%",
            height: "auto",
            borderRadius: 2,
            mb: 1,
          }}
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
