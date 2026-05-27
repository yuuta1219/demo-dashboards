const logs = [
  { id: 1, date: "2026-05-26", project: "社内ポータル刷新", task: "トップページUI実装", hours: 3.0 },
  { id: 2, date: "2026-05-26", project: "顧客管理システム", task: "検索API改修", hours: 2.5 },
  { id: 3, date: "2026-05-26", project: "社内ポータル刷新", task: "コードレビュー対応", hours: 1.0 },
  { id: 4, date: "2026-05-25", project: "顧客管理システム", task: "DB設計書更新", hours: 2.0 },
  { id: 5, date: "2026-05-25", project: "採用サイトリニューアル", task: "ワイヤーフレーム作成", hours: 4.0 },
  { id: 6, date: "2026-05-24", project: "社内ポータル刷新", task: "認証機能テスト", hours: 3.5 },
  { id: 7, date: "2026-05-24", project: "採用サイトリニューアル", task: "デザインレビュー", hours: 1.5 },
  { id: 8, date: "2026-05-23", project: "顧客管理システム", task: "バグ修正 #142", hours: 2.0 },
  { id: 9, date: "2026-05-23", project: "社内ポータル刷新", task: "ミーティング・仕様確認", hours: 1.5 },
  { id: 10, date: "2026-05-22", project: "採用サイトリニューアル", task: "コンテンツ移行作業", hours: 5.0 },
  { id: 11, date: "2026-05-22", project: "顧客管理システム", task: "E2Eテスト作成", hours: 2.5 },
];

const projectConfig: Record<string, { gradient: string; dot: string }> = {
  "社内ポータル刷新": { gradient: "from-blue-500 to-cyan-400", dot: "bg-blue-400" },
  "顧客管理システム": { gradient: "from-emerald-500 to-teal-400", dot: "bg-emerald-400" },
  "採用サイトリニューアル": { gradient: "from-orange-500 to-amber-400", dot: "bg-orange-400" },
};

export default function WorklogPage() {
  const totalHours = logs.reduce((sum, l) => sum + l.hours, 0);
  const projects = [...new Set(logs.map((l) => l.project))];
  const projectHours = projects.map((p) => ({
    name: p,
    hours: logs.filter((l) => l.project === p).reduce((s, l) => s + l.hours, 0),
  }));
  const dates = [...new Set(logs.map((l) => l.date))];

  const summaryCards = [
    { label: "合計工数", value: `${totalHours}h`, accent: "from-violet-500 to-blue-500" },
    { label: "プロジェクト数", value: projects.length, accent: "from-emerald-500 to-teal-500" },
    { label: "稼働日数", value: `${dates.length}日`, accent: "from-blue-500 to-cyan-500" },
    { label: "日平均", value: `${(totalHours / dates.length).toFixed(1)}h`, accent: "from-orange-500 to-amber-500" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">作業ログ・工数メモ</h1>
          <p className="text-sm text-gray-400">2026年5月22日 〜 5月26日の作業記録</p>
        </div>
        <button className="glass glass-hover text-xs text-gray-500 px-3 py-1.5 rounded-lg transition-all">
          + ログを追加
        </button>
      </div>

      {/* サマリーカード */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {summaryCards.map((card) => (
          <div key={card.label} className="glass rounded-xl p-4 relative overflow-hidden">
            <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${card.accent}`} />
            <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider">{card.label}</p>
            <p className="text-3xl font-bold text-gray-800">{card.value}</p>
          </div>
        ))}
      </div>

      {/* プロジェクト別工数 */}
      <div className="glass rounded-xl p-5 mb-8">
        <p className="text-xs text-gray-400 uppercase tracking-wider mb-4">プロジェクト別工数</p>
        <div className="space-y-4">
          {projectHours.map((p) => {
            const config = projectConfig[p.name] || { gradient: "from-gray-500 to-gray-400", dot: "bg-gray-400" };
            return (
              <div key={p.name}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600 font-medium">{p.name}</span>
                  <span className="text-gray-400 font-mono text-xs">
                    {p.hours}h
                    <span className="text-gray-300 ml-1">
                      ({((p.hours / totalHours) * 100).toFixed(0)}%)
                    </span>
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full bg-gradient-to-r ${config.gradient}`}
                    style={{ width: `${(p.hours / totalHours) * 100}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 作業ログテーブル */}
      <div className="glass rounded-xl overflow-hidden">
        <table className="w-full text-sm ai-table">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-5 py-3">日付</th>
              <th className="text-left px-5 py-3">プロジェクト</th>
              <th className="text-left px-5 py-3">作業内容</th>
              <th className="text-right px-5 py-3">工数</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => {
              const config = projectConfig[log.project] || { dot: "bg-gray-400" };
              return (
                <tr key={log.id} className="transition-colors">
                  <td className="px-5 py-3.5 text-gray-300 font-mono text-xs">{log.date}</td>
                  <td className="px-5 py-3.5">
                    <span className="inline-flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${config.dot}`} />
                      <span className="text-gray-600 font-medium">{log.project}</span>
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-gray-700">{log.task}</td>
                  <td className="px-5 py-3.5 text-right font-mono text-gray-800">{log.hours}h</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
