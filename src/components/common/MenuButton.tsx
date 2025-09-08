import { Button, useTheme, alpha, SxProps, Theme } from "@mui/material";

const MenuButton = ({
  label,
  onClick,
  fullWidth = false,
  sx,
}: {
  label: string;
  onClick: () => void;
  fullWidth?: boolean;
  sx?: SxProps<Theme>;
}) => {
  const theme = useTheme();
  return (
    <Button
      onClick={onClick}
      fullWidth={fullWidth}
      sx={{
        textTransform: "none",
        fontWeight: 500,
        color: theme.palette.text.primary,
        justifyContent: fullWidth ? "flex-start" : "center",
        "&:hover": {
          background: alpha(theme.palette.primary.main, 0.08),
        },
        ...sx, // merge prop sx từ bên ngoài
      }}
    >
      {label}
    </Button>
  );
};

export default MenuButton;
