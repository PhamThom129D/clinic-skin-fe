import { GoogleOAuthProvider } from "@react-oauth/google";
import AuthContainer from "@/components/auth/AuthContainer";
import { NEXT_PUBLIC_GOOGLE_CLIENT } from "@/constants/api";


export default function LoginPage() {
  return (
    <GoogleOAuthProvider clientId={NEXT_PUBLIC_GOOGLE_CLIENT}>
      <AuthContainer />
    </GoogleOAuthProvider>
  );
}
