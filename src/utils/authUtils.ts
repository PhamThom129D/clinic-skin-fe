import { useRouter } from "next/navigation";

export function redirectByRole(
  role: string,
  router: ReturnType<typeof useRouter>
) {
  switch (role) {
    case "ROLE_ADMIN":
    case "ROLE_DOCTOR":
    case "ROLE_RECEPTIONIST":
    case "ROLE_LAB_STAFF":
    case "ROLE_CONSULTANT":
    case "ROLE_CASHIER":
      router.push("/dashboard");
      break;
    case "ROLE_PATIENT":
      router.push("/home");
      break;
    default:
      router.push("/");
  }
}
