"use client";

import React from "react";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { Button, Box, alpha, useTheme } from "@mui/material";
import { Google } from "@mui/icons-material";
import { notifySuccess, notifyWarning } from "@/utils/toast";
import { loginWithGoogle } from "@/services/authService";
import { redirectByRole } from "@/utils/authUtils";

export default function GoogleLoginButton() {
  const router = useRouter();
  const theme = useTheme();

  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    const idToken = credentialResponse.credential;
    if (!idToken) return notifyWarning("Đăng nhập Google thất bại");

    try {
      const response = await loginWithGoogle(idToken); 
      const { token, roles } = response.data;           
      const role = roles[0] || "ROLE_PATIENT";        

      localStorage.setItem("authToken", token);
      localStorage.setItem("userRole", role);

      notifySuccess("Đăng nhập thành công với Google!");
console.log("Redirecting role:", role);
redirectByRole(role!, router);
    } catch (err) {
      console.error(err);
      notifyWarning("Đăng nhập Google thất bại");
    }
  };

  const handleError = () => {
    notifyWarning("Đăng nhập Google thất bại");
  };

  return (
    <Box sx={{ position: "relative" }}>
      {/* Custom styled button overlay */}
      <Button
        fullWidth
        variant="outlined"
        startIcon={<Google />}
        sx={{
          py: 1.5,
          borderRadius: 3,
          borderColor: alpha(theme.palette.primary.main, 0.3),
          color: theme.palette.text.primary,
          fontWeight: 600,
          fontSize: "1rem",
          background: alpha("#ffffff", 0.8),
          "&:hover": {
            borderColor: theme.palette.primary.main,
            background: alpha(theme.palette.primary.main, 0.04),
            transform: "translateY(-1px)",
            boxShadow: `0 4px 15px ${alpha(theme.palette.primary.main, 0.2)}`,
          },
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        Đăng nhập với Google
      </Button>
      
      {/* Hidden Google Login component */}
      <Box sx={{ 
        position: "absolute", 
        top: 0, 
        left: 0, 
        width: "100%", 
        height: "100%",
        opacity: 0,
        "& > div": {
          width: "100% !important",
          height: "100% !important",
        }
      }}>
        <GoogleLogin 
          onSuccess={handleSuccess} 
          onError={handleError} 
          useOneTap={false}
          size="large"
          width="100%"
        />
      </Box>
    </Box>
  );
}
