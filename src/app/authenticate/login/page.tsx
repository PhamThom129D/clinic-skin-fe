// src/app/authenticate/login/page.tsx
import React from "react";
import LoginForm from "@/components/forms/LoginForm";
import "../../../../public/css/Auth.css"; // Import CSS chung cho Auth

export default function LoginPage() {
  return (
    <main className="container">
      <LoginForm />
    </main>
  );
}