'use client'

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import CustomCursor from "@/components/ui/CustomCursor";
import FloatingButtons from "@/components/ui/FloatingButtons";
import { AlertProvider } from "@/contexts/AlertContext";
import { ConfirmProvider } from "@/contexts/ConfirmContext";
import DataInitializer from "@/components/DataInitializer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
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
  );
}
