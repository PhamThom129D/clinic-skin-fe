"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { ThemeProvider as NextThemeProvider, useTheme } from "next-themes";
import React, { useMemo } from "react";
import { lightTheme, darkTheme } from "../theme"; // import 2 theme

// QueryClient để wrap React Query
const queryClient = new QueryClient();

// Component chọn MUI theme dựa vào next-themes
function MuiThemeRegistry({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  const muiTheme = useMemo(() => {
    return theme === "dark" ? darkTheme : lightTheme;
  }, [theme]);

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <QueryClientProvider client={queryClient}>
          <NextThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={true}
          >
            <MuiThemeRegistry>
              {children}

              {/* Toastify config */}
              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored" // dùng màu success/error đẹp hơn
              />
            </MuiThemeRegistry>
          </NextThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
