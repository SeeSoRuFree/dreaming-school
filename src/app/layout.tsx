import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import CustomCursor from "@/components/ui/CustomCursor";
import FloatingButtons from "@/components/ui/FloatingButtons";
import { AlertProvider } from "@/contexts/AlertContext";
import { ConfirmProvider } from "@/contexts/ConfirmContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import DataInitializer from "@/components/DataInitializer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "꿈을 짓는 학교 사회적협동조합",
  description: "지역사회 교육 발전을 위한 사회적협동조합",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider>
          <AlertProvider>
            <ConfirmProvider>
              <CustomCursor />
              <DataInitializer>
                <Header />
                <main className="flex-grow">
                  {children}
                </main>
                <Footer />
                <FloatingButtons />
              </DataInitializer>
            </ConfirmProvider>
          </AlertProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
