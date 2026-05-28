"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "ホーム" },
  { href: "/clients", label: "取引先" },
  { href: "/estimates", label: "見積もり" },
  { href: "/orders", label: "発注書" },
  { href: "/invoices", label: "請求書" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isOrderForm = pathname.startsWith("/order-form");

  if (isOrderForm) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-full">
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
              className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                pathname === item.href
                  ? "bg-gray-100 text-gray-900 font-medium"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-3 mt-3 border-t border-gray-100">
            <p className="px-3 py-1 text-xs text-gray-400">外部向け</p>
            <Link
              href="/order-form"
              className="block px-3 py-2 rounded-md text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
            >
              注文フォーム ↗
            </Link>
          </div>
        </nav>
      </aside>
      <main className="flex-1 ml-56 bg-gray-50 min-h-screen">{children}</main>
    </div>
  );
}
