"use client";
import React, { createContext, useContext } from "react";
import { AuthResponse } from "@/types/auth";

interface AccountContextType {
  account: AuthResponse | null;
  isLoggedIn: boolean;
  setAccount: React.Dispatch<React.SetStateAction<AuthResponse | null>>;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

export const useAccount = () => {
  const ctx = useContext(AccountContext);
  if (!ctx) throw new Error("useAccount must be used within AccountProvider");
  return ctx;
};

export const AccountProvider = ({ children }: { children: React.ReactNode }) => {
  const [account, setAccount] = React.useState<AuthResponse | null>(null);

  React.useEffect(() => {
    const accInfo = localStorage.getItem("account") || sessionStorage.getItem("account");
    if (accInfo) {
      try {
        setAccount(JSON.parse(accInfo));
      } catch {
        setAccount(null);
      }
    }
  }, []);

  return (
    <AccountContext.Provider value={{ account, isLoggedIn: !!account, setAccount }}>
      {children}
    </AccountContext.Provider>
  );
};
