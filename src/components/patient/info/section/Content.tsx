"use client";

import React, { useState, useEffect } from "react";
import { Box, useTheme, Grid } from "@mui/material";
import Sidebar from "./Sidebar";
import UserInfo from "./UserInfo";
import { AuthResponse } from "@/types/auth";
import UserInfoUpdate from "./UserInfoUpdate";
import { EmergencyContact } from "@/types/userinfo";

const Content: React.FC = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [account, setAccount] = useState<AuthResponse | null>(null);
  const [emergencyContact, setEmergencyContact] = useState<EmergencyContact | null>(null);

  const [editing, setEditing] = useState(false);
  const handleEditClick = () => setEditing(true);
  const handleBackClick = () => setEditing(false);

  useEffect(() => {
    const checkAuth = () => {
      const token =
        localStorage.getItem("authToken") ||
        sessionStorage.getItem("authToken");
      setIsLoggedIn(!!token);
    };
    checkAuth();
    window.addEventListener("authChange", checkAuth);
    return () => window.removeEventListener("authChange", checkAuth);
  }, []);

  useEffect(() => {
    const accInfo = localStorage.getItem("account") || sessionStorage.getItem("account");
    if (accInfo) {
      try {
        const acc = JSON.parse(accInfo);
        setAccount(acc);
        setIsLoggedIn(true);

        // Dữ liệu mẫu cho Liên hệ khẩn cấp
        const dummyEmergencyContact: EmergencyContact = {
          emergency_id: 1,
          contact_name: "Nguyễn Văn A",
          contact_phone: "0912345678",
          patient_id: 101,
        };
        setEmergencyContact(dummyEmergencyContact);

      } catch {
        setAccount(null);
        setIsLoggedIn(false);
      }
    }
  }, []);

  // Hàm để cập nhật thông tin cá nhân khi thành công
  const handleUpdateSuccess = (updatedAccount: AuthResponse, updatedEmergencyContact: EmergencyContact) => {
    setAccount(updatedAccount);
    setEmergencyContact(updatedEmergencyContact);
    setEditing(false);
  }

  return (
    <Box
      sx={{
        position: "relative",
        backgroundImage: `url("https://res.cloudinary.com/dgmrwe4eo/image/upload/v1756106511/test_Bg_naaz2k.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      {isDark && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(40, 99, 57, 0.5)",
            pointerEvents: "none",
          }}
        />
      )}

      {/* Nội dung chính */}
      <Box sx={{ position: "relative", py: 4, px: { xs: 2, sm: 4, md: 8 } }}>
        <Grid
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: '30px',
            maxWidth: '1200px',
            mx: 'auto',
          }}
        >
          <Grid sx={{ flexShrink: 0, width: { xs: '100%', md: '300px' } }}>
            <Sidebar
              account={account}
              setIsLoggedIn={setIsLoggedIn}
            />
          </Grid>
          <Grid sx={{ flexGrow: 1, minWidth: 0 }}>
            {editing ? (
              <UserInfoUpdate
                account={account}
                emergencyContact={emergencyContact}
                onBackClick={handleBackClick}
                onUpdateSuccess={handleUpdateSuccess}
              />
            ) : (
              account && (
                <UserInfo
                  account={account}
                  emergencyContact={emergencyContact}
                  onEditClick={handleEditClick}
                />
              )
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Content;