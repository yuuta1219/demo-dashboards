const recentDocuments = [
  { id: "EST-2026-003", type: "見積もり", client: "グローバルメディア株式会社", title: "ECサイト構築", amount: 3200000, date: "2026-05-24", status: "下書き" },
  { id: "INV-2026-003", type: "請求書", client: "テクノソリューションズ株式会社", title: "業務システム開発（中間金）", amount: 2700000, date: "2026-05-15", status: "送付済み" },
  { id: "PO-2026-003", type: "発注書", client: "クラウドサービス株式会社", title: "クラウドインフラ利用料", amount: 3600000, date: "2026-05-20", status: "承認待ち" },
  { id: "INV-2026-005", type: "請求書", client: "グローバルメディア株式会社", title: "コンサルティング費用", amount: 550000, date: "2026-04-25", status: "延滞" },
  { id: "EST-2026-002", type: "見積もり", client: "テクノソリューションズ株式会社", title: "業務システム開発", amount: 5400000, date: "2026-05-22", status: "送付済み" },
];

const alerts = [
  { message: "請求書 INV-2026-005 の支払期限が超過しています", type: "error" as const },
  { message: "見積もり EST-2026-001 の有効期限が5日以内です", type: "warning" as const },
  { message: "発注書 PO-2026-003 が承認待ちです", type: "info" as const },
];

const alertStyles = {
  error: "bg-red-50 border-red-200 text-red-700",
  warning: "bg-yellow-50 border-yellow-200 text-yellow-700",
  info: "bg-blue-50 border-blue-200 text-blue-700",
};

const typeColors: Record<string, string> = {
  "見積もり": "bg-blue-100 text-blue-700",
  "発注書": "bg-green-100 text-green-700",
  "請求書": "bg-purple-100 text-purple-700",
};

const statusColors: Record<string, string> = {
  "下書き": "text-gray-500",
  "送付済み": "text-blue-600",
  "承認待ち": "text-yellow-600",
  "入金済み": "text-green-600",
  "延滞": "text-red-600",
};

function fmt(n: number) {
  return "¥" + n.toLocaleString();
}

export default function HomePage() {
  return (
    <div className="px-8 py-6">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">ダッシュボード</h1>
        <p className="text-sm text-gray-500 mt-0.5">2026年5月の概況</p>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">今月の売上（入金済み）</p>
          <p className="text-2xl font-bold text-gray-900">¥3,890,000</p>
          <p className="text-xs text-green-600 mt-1">前月比 +12%</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">未回収額</p>
          <p className="text-2xl font-bold text-gray-900">¥5,990,000</p>
          <p className="text-xs text-gray-400 mt-1">送付済み 3件</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">見積もり（承認待ち）</p>
          <p className="text-2xl font-bold text-gray-900">2件</p>
          <p className="text-xs text-gray-400 mt-1">合計 ¥6,900,000</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">今月の発注額</p>
          <p className="text-2xl font-bold text-gray-900">¥5,696,000</p>
          <p className="text-xs text-gray-400 mt-1">発注 7件</p>
        </div>
      </div>

      {/* アラート */}
      <div className="space-y-2 mb-6">
        {alerts.map((alert, i) => (
          <div key={i} className={`px-4 py-2.5 rounded-lg border text-sm ${alertStyles[alert.type]}`}>
            {alert.message}
          </div>
        ))}
      </div>

      {/* 新着注文 */}
      <div className="bg-white rounded-lg border border-gray-200 mb-6">
        <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-sm font-medium text-gray-900">新着注文（フォーム経由）</h2>
          <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded font-medium">2件 未対応</span>
        </div>
        <div className="divide-y divide-gray-50">
          <div className="px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors">
            <div>
              <p className="text-sm text-gray-900 font-medium">株式会社田中製作所 - ステンレスボルト他3点</p>
              <p className="text-xs text-gray-400 mt-0.5">2026-05-27 14:32 受付 ・ 担当者: 田中 太郎</p>
            </div>
            <button className="text-xs text-blue-600 border border-blue-200 bg-blue-50 px-3 py-1 rounded hover:bg-blue-100 transition-colors">見積もりを作成</button>
          </div>
          <div className="px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors">
            <div>
              <p className="text-sm text-gray-900 font-medium">大阪機械工業株式会社 - 切削工具セット</p>
              <p className="text-xs text-gray-400 mt-0.5">2026-05-27 10:15 受付 ・ 担当者: 佐藤 健一</p>
            </div>
            <button className="text-xs text-blue-600 border border-blue-200 bg-blue-50 px-3 py-1 rounded hover:bg-blue-100 transition-colors">見積もりを作成</button>
          </div>
        </div>
      </div>

      {/* 最近の書類 */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-4 py-3 border-b border-gray-200">
          <h2 className="text-sm font-medium text-gray-900">最近の書類</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-gray-500 text-xs">
              <th className="text-left px-4 py-2.5 font-medium">番号</th>
              <th className="text-left px-4 py-2.5 font-medium">種類</th>
              <th className="text-left px-4 py-2.5 font-medium">取引先</th>
              <th className="text-left px-4 py-2.5 font-medium">件名</th>
              <th className="text-right px-4 py-2.5 font-medium">金額</th>
              <th className="text-left px-4 py-2.5 font-medium">ステータス</th>
            </tr>
          </thead>
          <tbody>
            {recentDocuments.map((doc) => (
              <tr key={doc.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-2.5 font-mono text-xs text-gray-500">{doc.id}</td>
                <td className="px-4 py-2.5">
                  <span className={`text-xs px-2 py-0.5 rounded font-medium ${typeColors[doc.type]}`}>{doc.type}</span>
                </td>
                <td className="px-4 py-2.5 text-gray-700">{doc.client}</td>
                <td className="px-4 py-2.5 text-gray-600">{doc.title}</td>
                <td className="px-4 py-2.5 text-right font-mono text-gray-900">{fmt(doc.amount)}</td>
                <td className={`px-4 py-2.5 text-xs font-medium ${statusColors[doc.status]}`}>{doc.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
