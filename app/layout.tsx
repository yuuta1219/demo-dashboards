import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "業務管理ダッシュボード",
  description: "備品管理・作業ログ・タスクボード",
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
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-gray-800">業務管理</span>
          </Link>
          <nav className="flex gap-1 text-sm">
            <Link
              href="/inventory"
              className="px-3 py-1.5 rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-100/80 transition-all"
            >
              在庫管理
            </Link>
            <Link
              href="/worklog"
              className="px-3 py-1.5 rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-100/80 transition-all"
            >
              作業ログ
            </Link>
            <Link
              href="/kanban"
              className="px-3 py-1.5 rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-100/80 transition-all"
            >
              タスクボード
            </Link>
          </nav>
        </header>
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
