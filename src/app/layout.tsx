import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner"
import { AuthProvider } from "@/lib/auth/auth-context"

export const metadata: Metadata = {
  title: "SportStocks",
  description: "The NFL stock market game",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
        <Toaster theme="dark" position="top-center" />
      </body>
    </html>
  );
}