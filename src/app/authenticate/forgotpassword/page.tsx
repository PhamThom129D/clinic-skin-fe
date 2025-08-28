// src/app/authenticate/otp/page.tsx
import React from "react";
import OTPVerificationForm from "@/components/forms/OTPVerificationForm";
import "../../../../public/css/Auth.css"; // Sử dụng lại CSS đã có

export default function OTPVerificationPage() {
  return (
    <main className="container">
      <OTPVerificationForm />
    </main>
  );
}