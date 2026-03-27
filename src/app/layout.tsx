import type { Metadata } from "next";
import { Providers } from "@/lib/providers";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

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
          <Providers>
            {children}
            <Toaster />
          </Providers>
        </body>
      </html>
  );
}