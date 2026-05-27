import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "書類管理ダッシュボード",
  description: "見積もり・発注書・請求書の作成・管理",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${geistSans.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[#f8fafc] font-[var(--font-geist-sans)]">
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/60 px-6 py-3 flex items-center gap-8 sticky top-0 z-50">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <path d="M14 2v6h6" />
                <path d="M16 13H8M16 17H8M10 9H8" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-gray-800">書類管理</span>
          </Link>
          <nav className="flex gap-1 text-sm">
            <Link href="/estimates" className="px-3 py-1.5 rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-100/80 transition-all">
              見積もり
            </Link>
            <Link href="/orders" className="px-3 py-1.5 rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-100/80 transition-all">
              発注書
            </Link>
            <Link href="/invoices" className="px-3 py-1.5 rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-100/80 transition-all">
              請求書
            </Link>
          </nav>
        </header>
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
