import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Game Backlog",
  description: "A Library for tracking your games",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased bg-black dark font-sans`}>
        {children}
      </body>
    </html>
  );
}
