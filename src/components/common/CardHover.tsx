import { Card, CardContent, CardMedia, SxProps, Theme } from "@mui/material";
import React from "react";

interface CardHoverProps {
  image?: string;
  children: React.ReactNode;
  onClick?: () => void;
  imageWidth?: number | string;  
  imageHeight?: number | string; 
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  sx?: SxProps<Theme>;           
}

const CardHover: React.FC<CardHoverProps> = ({
  image,
  children,
  onClick,
  imageWidth = 250,
  imageHeight = 250,
}) => (
  <Card
    onClick={onClick}
    sx={{
      p: 2,
      textAlign: "center",
      transition: "0.5s",
      "&:hover": { boxShadow: 10, transform: "translateY(-6px)" },
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}
  >
    {image && (
      <CardMedia
        component="img"
        image={image}
        alt="card-img"
        sx={{
          width: imageWidth,
          height: imageHeight,
          objectFit: "cover",
          borderRadius: 2,
          mb: 2,
        }}
      />
    )}
    <CardContent>{children}</CardContent>
  </Card>
);

export default CardHover;
