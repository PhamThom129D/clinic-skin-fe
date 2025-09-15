import { useState, useEffect } from "react";
import { AuthResponse } from "@/types/auth";
import { logoutClient } from "@/services/authService"; // Giả sử có service này

export const useUser = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [account, setAccount] = useState<AuthResponse | null>(null);

    useEffect(() => {
        const checkAuth = () => {
            const accInfo = localStorage.getItem("account") || sessionStorage.getItem("account");
            const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
            if (accInfo && token) {
                try {
                    const acc = JSON.parse(accInfo);
                    setAccount(acc);
                    setIsLoggedIn(true);
                } catch {
                    setAccount(null);
                    setIsLoggedIn(false);
                }
            } else {
                setAccount(null);
                setIsLoggedIn(false);
            }
        };
        checkAuth();
        window.addEventListener("authChange", checkAuth);
        return () => window.removeEventListener("authChange", checkAuth);
    }, []);

    const logout = () => {
        logoutClient();
        setIsLoggedIn(false);
        setAccount(null);
    };

    return { account, isLoggedIn, logout, setAccount };
};