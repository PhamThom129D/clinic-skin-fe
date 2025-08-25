import { Card, CardContent, CardMedia, SxProps, Theme } from "@mui/material";
import React from "react";

interface CardHoverProps {
  image?: string;
  children?: React.ReactNode;
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
  imageWidth = "100%",
  imageHeight = 250,
  objectFit = "cover",
  sx = {},
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
      alignItems: "center",
      ...sx
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
          objectFit,
          borderRadius: 2,
          mb: 2,
        }}
      />
    )}
    {children && <CardContent sx={{ p: 0 }}>{children}</CardContent>}
  </Card>
);

export default CardHover;
