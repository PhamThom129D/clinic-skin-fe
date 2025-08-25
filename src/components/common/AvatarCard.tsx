import { Card, CardContent, Avatar, Typography, Box } from "@mui/material";
import React from "react";

interface AvatarCardProps {
  name: string;
  role?: string;
  text?: string;
  img: string;
}

const AvatarCard: React.FC<AvatarCardProps> = ({ name, role, text, img }) => (
  <Card sx={{ p: 3, textAlign: "center", transition: "0.3s", "&:hover": { boxShadow: 6 } }}>
    <CardContent>
      <Avatar src={img} alt={name} sx={{ width: 100, height: 100, mx: "auto", mb: 2 }} />
      <Typography variant="h6" color="primary">{name}</Typography>
      {role && <Typography color="text.secondary">{role}</Typography>}
      {text && <Typography color="text.secondary" fontStyle="italic">“{text}”</Typography>}
    </CardContent>
  </Card>
);

export default AvatarCard;
