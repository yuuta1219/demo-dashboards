const invoices = [
  { id: "INV-2026-001", client: "株式会社ABC商事", title: "Webサイトリニューアル（第1期）", amount: 990000, issueDate: "2026-05-01", dueDate: "2026-05-31", status: "入金済み" as const },
  { id: "INV-2026-002", client: "株式会社ネクストステージ", title: "モバイルアプリ開発（着手金）", amount: 2400000, issueDate: "2026-05-05", dueDate: "2026-06-05", status: "送付済み" as const },
  { id: "INV-2026-003", client: "テクノソリューションズ株式会社", title: "業務システム開発（中間金）", amount: 2700000, issueDate: "2026-05-15", dueDate: "2026-06-15", status: "送付済み" as const },
  { id: "INV-2026-004", client: "株式会社ABC商事", title: "保守運用費（5月分）", amount: 80000, issueDate: "2026-05-20", dueDate: "2026-06-20", status: "下書き" as const },
  { id: "INV-2026-005", client: "グローバルメディア株式会社", title: "コンサルティング費用", amount: 550000, issueDate: "2026-04-25", dueDate: "2026-05-25", status: "延滞" as const },
  { id: "INV-2026-006", client: "株式会社ネクストステージ", title: "データ分析基盤構築（完了金）", amount: 1400000, issueDate: "2026-05-10", dueDate: "2026-06-10", status: "入金済み" as const },
  { id: "INV-2026-007", client: "ファーストデザイン株式会社", title: "ロゴ制作費", amount: 340000, issueDate: "2026-05-22", dueDate: "2026-06-22", status: "送付済み" as const },
  { id: "INV-2026-008", client: "テクノソリューションズ株式会社", title: "セキュリティ診断報告", amount: 1500000, issueDate: "2026-04-20", dueDate: "2026-05-20", status: "入金済み" as const },
];

const statusConfig: Record<string, string> = {
  "下書き": "bg-gray-50 text-gray-500 border border-gray-200",
  "送付済み": "bg-blue-50 text-blue-600 border border-blue-200",
  "入金済み": "bg-emerald-50 text-emerald-600 border border-emerald-200",
  "延滞": "bg-red-50 text-red-600 border border-red-200",
};

function formatCurrency(n: number) {
  return "¥" + n.toLocaleString();
}

export default function InvoicesPage() {
  const totalAmount = invoices.reduce((s, i) => s + i.amount, 0);
  const paid = invoices.filter((i) => i.status === "入金済み");
  const paidAmount = paid.reduce((s, i) => s + i.amount, 0);
  const sent = invoices.filter((i) => i.status === "送付済み");
  const sentAmount = sent.reduce((s, i) => s + i.amount, 0);
  const overdue = invoices.filter((i) => i.status === "延滞");
  const overdueAmount = overdue.reduce((s, i) => s + i.amount, 0);

  const summaryCards = [
    { label: "請求総額", value: formatCurrency(totalAmount), accent: "from-violet-500 to-blue-500" },
    { label: "入金済み", value: formatCurrency(paidAmount), accent: "from-emerald-500 to-teal-500" },
    { label: "入金待ち", value: formatCurrency(sentAmount), accent: "from-blue-500 to-cyan-500" },
    { label: "延滞", value: formatCurrency(overdueAmount), accent: "from-red-500 to-pink-500" },
  ];

  // 回収率
  const collectionRate = ((paidAmount / totalAmount) * 100).toFixed(0);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">請求書管理</h1>
          <p className="text-sm text-gray-400">請求書の作成・入金ステータス管理</p>
        </div>
        <button className="bg-gradient-to-r from-violet-500 to-purple-500 text-white text-xs font-medium px-4 py-2 rounded-lg hover:opacity-90 transition-opacity shadow-md shadow-violet-500/20">
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

      {/* 回収率バー */}
      <div className="glass rounded-xl p-5 mb-8">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs text-gray-400 uppercase tracking-wider">入金回収率</p>
          <p className="text-sm font-bold text-gray-800">{collectionRate}%</p>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-3">
          <div
            className="h-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all"
            style={{ width: `${collectionRate}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-300">
          <span>入金済み {formatCurrency(paidAmount)}</span>
          <span>請求総額 {formatCurrency(totalAmount)}</span>
        </div>
      </div>

      <div className="glass rounded-xl overflow-hidden">
        <table className="w-full text-sm ai-table">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-5 py-3">請求番号</th>
              <th className="text-left px-5 py-3">取引先</th>
              <th className="text-left px-5 py-3">件名</th>
              <th className="text-right px-5 py-3">金額</th>
              <th className="text-center px-5 py-3">ステータス</th>
              <th className="text-left px-5 py-3">支払期限</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id} className="transition-colors cursor-pointer">
                <td className="px-5 py-3.5 font-mono text-xs text-violet-500">{inv.id}</td>
                <td className="px-5 py-3.5 text-gray-700 font-medium">{inv.client}</td>
                <td className="px-5 py-3.5 text-gray-600">{inv.title}</td>
                <td className="px-5 py-3.5 text-right font-mono text-gray-800 font-medium">{formatCurrency(inv.amount)}</td>
                <td className="px-5 py-3.5 text-center">
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig[inv.status]}`}>
                    {inv.status}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-gray-300 font-mono text-xs">{inv.dueDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
