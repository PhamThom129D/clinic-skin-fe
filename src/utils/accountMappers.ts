import { AuthResponse } from "@/types/auth";
import { AccountResponse } from "@/types/userinfo";

export function mapToFormData( account: AuthResponse) : AccountResponse {
  return {
    fullName: account.fullName,
    phoneNumber: account.phoneNumber,
    email: account.email,
    address: account.address,
    dateOfBirth: account.dateOfBirth,
    gender: (account.gender?.toUpperCase() as AccountResponse["gender"]) || "OTHER",
    avatarUrl: account.avatarUrl,
  };
}
