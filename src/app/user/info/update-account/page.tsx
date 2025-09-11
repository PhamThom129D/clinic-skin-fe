"use client";
import React, { useEffect, useState } from "react";
import UserInfoUpdate from "@/components/patient/info/section/UserInfoUpdate";
import { AuthResponse } from "@/types/auth";
import { EmergencyContact } from "@/types/userinfo";

export default function UpdateAccountPage() {
  const [account, setAccount] = useState<AuthResponse | null>(null);
  const [emergencyContact, setEmergencyContact] = useState<EmergencyContact | null>(null);

  useEffect(() => {
    const accInfo = localStorage.getItem("account") || sessionStorage.getItem("account");
    if (accInfo) {
      try {
        const acc = JSON.parse(accInfo);
        setAccount(acc);

        // Dummy contact
        setEmergencyContact({
          emergency_id: 1,
          contact_name: "Phạm T",
          contact_phone: "0397464805",
          patient_id: 101,
        });
      } catch {
        setAccount(null);
      }
    }
  }, []);

  return (
    <UserInfoUpdate
      account={account}
      emergencyContact={emergencyContact}
      onBackClick={() => (window.location.href = "/user/info")}
      onUpdateSuccess={(acc, ec) => {
        setAccount(acc);
        setEmergencyContact(ec);
        window.location.href = "/user/info"; // Quay lại sau khi update
      }}
    />
  );
}
