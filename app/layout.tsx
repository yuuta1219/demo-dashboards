import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "書類管理 - 見積もり・発注書・請求書",
  description: "見積もり・発注書・請求書の作成・管理アプリ",
};

const navItems = [
  { href: "/", label: "ホーム" },
  { href: "/clients", label: "取引先" },
  { href: "/estimates", label: "見積もり" },
  { href: "/orders", label: "発注書" },
  { href: "/invoices", label: "請求書" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${geistSans.variable} h-full`}>
      <body className="min-h-full flex font-[var(--font-geist-sans)]">
        {/* サイドバー */}
        <aside className="w-56 bg-white border-r border-gray-200 flex flex-col fixed h-full">
          <div className="px-5 py-4 border-b border-gray-200">
            <p className="text-sm font-bold text-gray-900">書類管理</p>
            <p className="text-xs text-gray-400 mt-0.5">見積・発注・請求</p>
          </div>
          <nav className="flex-1 px-3 py-3 space-y-0.5">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-3 py-2 rounded-md text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="flex-1 ml-56 bg-gray-50 min-h-screen">{children}</main>
      </body>
    </html>
  );
}
