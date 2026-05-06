import type { Metadata } from "next";
import { Geist } from "next/font/google";

import "./globals.scss";
import styles from "./layout.module.scss";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Weather app",
  description: "Weather forecasts",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" className={geist.variable}>
      <body>
        <Header />
        <main className={styles.content}>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
