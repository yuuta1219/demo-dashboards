const estimates = [
  { id: "EST-2026-001", client: "株式会社ABC商事", title: "Webサイトリニューアル", amount: 1980000, issueDate: "2026-05-20", expiryDate: "2026-06-20", status: "承認済み" as const },
  { id: "EST-2026-002", client: "テクノソリューションズ株式会社", title: "業務システム開発", amount: 5400000, issueDate: "2026-05-22", expiryDate: "2026-06-22", status: "送付済み" as const },
  { id: "EST-2026-003", client: "グローバルメディア株式会社", title: "ECサイト構築", amount: 3200000, issueDate: "2026-05-24", expiryDate: "2026-06-24", status: "下書き" as const },
  { id: "EST-2026-004", client: "株式会社ネクストステージ", title: "モバイルアプリ開発", amount: 4800000, issueDate: "2026-05-18", expiryDate: "2026-06-18", status: "承認済み" as const },
  { id: "EST-2026-005", client: "株式会社ABC商事", title: "保守運用契約（年間）", amount: 960000, issueDate: "2026-05-15", expiryDate: "2026-06-15", status: "却下" as const },
  { id: "EST-2026-006", client: "ファーストデザイン株式会社", title: "ロゴ・ブランディング制作", amount: 680000, issueDate: "2026-05-26", expiryDate: "2026-06-26", status: "下書き" as const },
  { id: "EST-2026-007", client: "テクノソリューションズ株式会社", title: "セキュリティ診断", amount: 1500000, issueDate: "2026-05-10", expiryDate: "2026-06-10", status: "送付済み" as const },
  { id: "EST-2026-008", client: "株式会社ネクストステージ", title: "データ分析基盤構築", amount: 2800000, issueDate: "2026-05-12", expiryDate: "2026-06-12", status: "承認済み" as const },
];

const statusConfig: Record<string, string> = {
  "下書き": "bg-gray-50 text-gray-500 border border-gray-200",
  "送付済み": "bg-blue-50 text-blue-600 border border-blue-200",
  "承認済み": "bg-emerald-50 text-emerald-600 border border-emerald-200",
  "却下": "bg-red-50 text-red-600 border border-red-200",
};

function formatCurrency(n: number) {
  return "¥" + n.toLocaleString();
}

export default function EstimatesPage() {
  const totalAmount = estimates.reduce((s, e) => s + e.amount, 0);
  const approved = estimates.filter((e) => e.status === "承認済み");
  const approvedAmount = approved.reduce((s, e) => s + e.amount, 0);
  const pending = estimates.filter((e) => e.status === "送付済み").length;
  const drafts = estimates.filter((e) => e.status === "下書き").length;

  const summaryCards = [
    { label: "見積もり総額", value: formatCurrency(totalAmount), accent: "from-violet-500 to-blue-500" },
    { label: "承認済み", value: formatCurrency(approvedAmount), accent: "from-emerald-500 to-teal-500" },
    { label: "返答待ち", value: `${pending}件`, accent: "from-blue-500 to-cyan-500" },
    { label: "下書き", value: `${drafts}件`, accent: "from-orange-500 to-amber-500" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">見積もり管理</h1>
          <p className="text-sm text-gray-400">見積書の作成・送付・ステータス管理</p>
        </div>
        <button className="bg-gradient-to-r from-violet-500 to-blue-500 text-white text-xs font-medium px-4 py-2 rounded-lg hover:opacity-90 transition-opacity shadow-md shadow-violet-500/20">
          + 新規作成
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {summaryCards.map((card) => (
          <div key={card.label} className="glass rounded-xl p-4 relative overflow-hidden">
            <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${card.accent}`} />
            <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider">{card.label}</p>
            <p className="text-2xl font-bold text-gray-800">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="glass rounded-xl overflow-hidden">
        <table className="w-full text-sm ai-table">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-5 py-3">見積番号</th>
              <th className="text-left px-5 py-3">取引先</th>
              <th className="text-left px-5 py-3">件名</th>
              <th className="text-right px-5 py-3">金額</th>
              <th className="text-center px-5 py-3">ステータス</th>
              <th className="text-left px-5 py-3">有効期限</th>
            </tr>
          </thead>
          <tbody>
            {estimates.map((est) => (
              <tr key={est.id} className="transition-colors cursor-pointer">
                <td className="px-5 py-3.5 font-mono text-xs text-blue-500">{est.id}</td>
                <td className="px-5 py-3.5 text-gray-700 font-medium">{est.client}</td>
                <td className="px-5 py-3.5 text-gray-600">{est.title}</td>
                <td className="px-5 py-3.5 text-right font-mono text-gray-800 font-medium">{formatCurrency(est.amount)}</td>
                <td className="px-5 py-3.5 text-center">
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig[est.status]}`}>
                    {est.status}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-gray-300 font-mono text-xs">{est.expiryDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
