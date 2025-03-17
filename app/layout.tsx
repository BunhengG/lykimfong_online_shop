/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Battambang } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  weight: "400", 
  subsets: ["latin"], 
  display: "swap",
});

const battambang = Battambang({
  weight: "400", 
  subsets: ["khmer"], 
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ly Kimfong Shop",
  description: "Phone Accessories Shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${battambang.className} antialiased bg-black`}
      >
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
