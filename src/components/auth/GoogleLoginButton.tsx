"use client";

import React from "react";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { notifySuccess, notifyWarning } from "@/utils/toast";
import { loginWithGoogle } from "@/services/authService";
import { redirectByRole } from "@/utils/authUtils";

export default function GoogleLoginButton() {
  const router = useRouter();

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
    redirectByRole(role, router);
  } catch (err) {
    console.error(err);
    notifyWarning("Đăng nhập Google thất bại");
  }
};

  const handleError = () => {
    notifyWarning("Đăng nhập Google thất bại");
  };

  return <GoogleLogin onSuccess={handleSuccess} onError={handleError} useOneTap />

}
