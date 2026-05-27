import Link from "next/link";

const apps = [
  {
    title: "見積もり",
    description: "見積書の作成・管理ができます。取引先ごとの見積もり状況をひと目で把握できます。",
    href: "/estimates",
    gradient: "from-blue-500 to-cyan-400",
    iconPath: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
  {
    title: "発注書",
    description: "発注書の作成・管理ができます。発注状況のトラッキングで抜け漏れを防ぎます。",
    href: "/orders",
    gradient: "from-emerald-500 to-teal-400",
    iconPath: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
  },
  {
    title: "請求書",
    description: "請求書の作成・管理ができます。入金ステータスの管理で回収漏れを防ぎます。",
    href: "/invoices",
    gradient: "from-violet-500 to-purple-400",
    iconPath: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
];

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">書類管理ダッシュボード</h1>
        <p className="text-gray-400 text-lg">見積もり・発注書・請求書の作成と管理</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {apps.map((app) => (
          <Link
            key={app.href}
            href={app.href}
            className="group glass glass-hover rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02]"
          >
            <div
              className={`w-11 h-11 rounded-xl bg-gradient-to-br ${app.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:shadow-xl transition-shadow`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d={app.iconPath} />
              </svg>
            </div>
            <h2 className="text-base font-semibold text-gray-800 mb-2 group-hover:text-gray-900 transition-colors">
              {app.title}
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-500 transition-colors">
              {app.description}
            </p>
            <div className="mt-5 flex items-center gap-1 text-xs text-gray-300 group-hover:text-gray-500 transition-colors">
              <span>管理画面を開く</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
