import React from "react";
import { AppBar, Toolbar, Typography, Box, Button, Avatar } from "@mui/material";
import { useRouter } from "next/navigation"; // Next.js 13+ App Router
import { logoutClient } from "@/services/authService";

interface TopbarProps {
  username: string;
  role: string;
}

const Topbar: React.FC<TopbarProps> = ({ username, role }) => {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/logout"); // chuyển hướng sang /logout
  };

  return (
    <AppBar
      position="fixed"
      color="primary"
      elevation={2}
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Phòng khám
        </Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <Typography>{role}</Typography>
          <Avatar>{username.charAt(0).toUpperCase()}</Avatar>
          <Typography>{username}</Typography>
       <Button variant="contained" color="error" onClick={logoutClient}>
  Logout
</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
