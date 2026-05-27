import Link from "next/link";

const apps = [
  {
    title: "備品・消耗品 在庫管理",
    description: "オフィスの備品・消耗品の在庫状況をリアルタイムで把握。発注タイミングを逃しません。",
    href: "/inventory",
    gradient: "from-blue-500 to-cyan-400",
    iconPath: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
  },
  {
    title: "作業ログ・工数メモ",
    description: "日々の作業内容と工数を記録。プロジェクト別の工数集計も一目で確認できます。",
    href: "/worklog",
    gradient: "from-emerald-500 to-teal-400",
    iconPath: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
  },
  {
    title: "カンバン式タスクボード",
    description: "チームのタスクをカンバン方式で管理。進捗状況がひと目でわかります。",
    href: "/kanban",
    gradient: "from-violet-500 to-purple-400",
    iconPath: "M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2",
  },
];

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">業務管理ダッシュボード</h1>
        <p className="text-gray-400 text-lg">管理したいアプリを選択してください</p>
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
              <span>ダッシュボードを開く</span>
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
