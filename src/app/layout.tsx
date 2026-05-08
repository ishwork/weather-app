import type { Metadata } from "next";
import { Geist } from "next/font/google";

import "@/app/globals.scss";
import styles from "@/app/layout.module.scss";
import { UnitProvider } from "@/contexts/UnitContext";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Check Weather",
  description: "Weather forecasts",
};

/**
 * RootLayout is the main layout component for the application.
 * It wraps the entire application in a HTML element and provides the necessary context for the application.
 * It also includes the Header, Footer, and main content area.
 */

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" className={geist.variable}>
      <body>
        <UnitProvider>
          <Header />
          <main className={styles.content}>{children}</main>
          <Footer />
        </UnitProvider>
      </body>
    </html>
  );
};

export default RootLayout;
