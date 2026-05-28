import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { AppShell } from "./app-shell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "書類管理 - 見積もり・発注書・請求書",
  description: "見積もり・発注書・請求書の作成・管理アプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${geistSans.variable} h-full`}>
      <body className="min-h-full font-[var(--font-geist-sans)]">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
