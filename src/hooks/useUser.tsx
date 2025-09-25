// hooks/useUser.tsx

import { useState, useEffect } from "react";
import { AuthResponse } from "@/types/auth";
import { logoutClient } from "@/services/authService";

// Helper function để xác định vị trí lưu trữ (localStorage hoặc sessionStorage)
const getStorageType = (): Storage | null => {
    if (typeof window === 'undefined') return null;
    if (localStorage.getItem("authToken")) return localStorage;
    if (sessionStorage.getItem("authToken")) return sessionStorage;
    // Mặc định lưu vào localStorage nếu không tìm thấy token, để đảm bảo lưu trữ
    return localStorage; 
}

export const useUser = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [account, setAccount] = useState<AuthResponse | null>(null);

    // Hàm tùy chỉnh để lưu trữ tài khoản vào storage
    const saveAccountToStorage = (newAccount: AuthResponse | null) => {
        const storage = getStorageType();
        if (!storage) return;

        if (newAccount) {
            // LƯU Ý: Không lưu token, status, roles, v.v. nếu không cần thiết. 
            // Ở đây ta lưu toàn bộ AuthResponse (hoặc một phiên bản đã dọn dẹp)
            storage.setItem("account", JSON.stringify(newAccount));
        } else {
            storage.removeItem("account");
        }
    };

    // Tạo hàm setAccount tùy chỉnh để vừa cập nhật state, vừa cập nhật storage
    const setAccountWithStorage = (newAccount: AuthResponse | null) => {
        setAccount(newAccount);
        saveAccountToStorage(newAccount);
        
        // Kích hoạt sự kiện để các component khác có thể lắng nghe nếu cần
        window.dispatchEvent(new Event("authChange"));
    };

    useEffect(() => {
        const checkAuth = () => {
            const accInfo = localStorage.getItem("account") || sessionStorage.getItem("account");
            const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
            
            if (accInfo && token) {
                try {
                    const acc = JSON.parse(accInfo);
                    setAccount(acc); // Chỉ cập nhật state, KHÔNG cập nhật storage để tránh vòng lặp
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
        // Giữ lại lắng nghe sự kiện để cập nhật khi có thay đổi từ bên ngoài
        window.addEventListener("authChange", checkAuth); 
        return () => window.removeEventListener("authChange", checkAuth);
    }, []);

    const logout = () => {
        logoutClient();
        setIsLoggedIn(false);
        setAccount(null);
        // Sau khi logout, ta gọi hàm setAccountWithStorage để xóa account khỏi storage
        setAccountWithStorage(null); 
    };

    // TRẢ VỀ: Trả về setAccountWithStorage thay vì setAccount gốc
    return { account, isLoggedIn, logout, setAccount: setAccountWithStorage };
};