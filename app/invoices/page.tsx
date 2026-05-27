const invoices = [
  { id: "INV-2026-001", client: "株式会社ABC商事", title: "Webサイトリニューアル（第1期）", amount: 990000, issueDate: "2026-05-01", dueDate: "2026-05-31", status: "入金済み" as const, fromEstimate: "EST-2026-001" },
  { id: "INV-2026-002", client: "株式会社ネクストステージ", title: "モバイルアプリ開発（着手金）", amount: 2400000, issueDate: "2026-05-05", dueDate: "2026-06-05", status: "送付済み" as const, fromEstimate: "EST-2026-004" },
  { id: "INV-2026-003", client: "テクノソリューションズ株式会社", title: "業務システム開発（中間金）", amount: 2700000, issueDate: "2026-05-15", dueDate: "2026-06-15", status: "送付済み" as const, fromEstimate: null },
  { id: "INV-2026-004", client: "株式会社ABC商事", title: "保守運用費（5月分）", amount: 80000, issueDate: "2026-05-20", dueDate: "2026-06-20", status: "下書き" as const, fromEstimate: null },
  { id: "INV-2026-005", client: "グローバルメディア株式会社", title: "コンサルティング費用", amount: 550000, issueDate: "2026-04-25", dueDate: "2026-05-25", status: "延滞" as const, fromEstimate: null },
  { id: "INV-2026-006", client: "株式会社ネクストステージ", title: "データ分析基盤構築（完了金）", amount: 1400000, issueDate: "2026-05-10", dueDate: "2026-06-10", status: "入金済み" as const, fromEstimate: "EST-2026-008" },
  { id: "INV-2026-007", client: "ファーストデザイン株式会社", title: "ロゴ制作費", amount: 340000, issueDate: "2026-05-22", dueDate: "2026-06-22", status: "送付済み" as const, fromEstimate: null },
  { id: "INV-2026-008", client: "テクノソリューションズ株式会社", title: "セキュリティ診断報告", amount: 1500000, issueDate: "2026-04-20", dueDate: "2026-05-20", status: "入金済み" as const, fromEstimate: "EST-2026-007" },
];

const statusColors: Record<string, string> = {
  "下書き": "bg-gray-100 text-gray-600",
  "送付済み": "bg-blue-100 text-blue-700",
  "入金済み": "bg-green-100 text-green-700",
  "延滞": "bg-red-100 text-red-700",
};

function fmt(n: number) {
  return "¥" + n.toLocaleString();
}

export default function InvoicesPage() {
  const totalAmount = invoices.reduce((s, i) => s + i.amount, 0);
  const paidAmount = invoices.filter((i) => i.status === "入金済み").reduce((s, i) => s + i.amount, 0);
  const unpaidAmount = invoices.filter((i) => i.status === "送付済み").reduce((s, i) => s + i.amount, 0);
  const overdueAmount = invoices.filter((i) => i.status === "延滞").reduce((s, i) => s + i.amount, 0);

  return (
    <div className="px-8 py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">請求書</h1>
          <p className="text-sm text-gray-500 mt-0.5">全 {invoices.length}件</p>
        </div>
        <button className="bg-gray-900 text-white text-sm px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
          + 新規作成
        </button>
      </div>

      {/* 金額サマリー */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">請求総額</p>
          <p className="text-xl font-bold text-gray-900">{fmt(totalAmount)}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">入金済み</p>
          <p className="text-xl font-bold text-green-700">{fmt(paidAmount)}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">入金待ち</p>
          <p className="text-xl font-bold text-blue-700">{fmt(unpaidAmount)}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">延滞</p>
          <p className="text-xl font-bold text-red-700">{fmt(overdueAmount)}</p>
        </div>
      </div>

      {/* フィルター */}
      <div className="flex gap-2 mb-4">
        {["すべて", "下書き", "送付済み", "入金済み", "延滞"].map((f, i) => (
          <button
            key={f}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
              i === 0 ? "bg-gray-900 text-white" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-gray-500 text-xs">
              <th className="text-left px-4 py-2.5 font-medium">請求番号</th>
              <th className="text-left px-4 py-2.5 font-medium">取引先</th>
              <th className="text-left px-4 py-2.5 font-medium">件名</th>
              <th className="text-right px-4 py-2.5 font-medium">金額（税込）</th>
              <th className="text-center px-4 py-2.5 font-medium">ステータス</th>
              <th className="text-left px-4 py-2.5 font-medium">支払期限</th>
              <th className="text-left px-4 py-2.5 font-medium">見積もり元</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer">
                <td className="px-4 py-2.5 font-mono text-xs text-gray-500">{inv.id}</td>
                <td className="px-4 py-2.5 text-gray-700 font-medium">{inv.client}</td>
                <td className="px-4 py-2.5 text-gray-600">{inv.title}</td>
                <td className="px-4 py-2.5 text-right font-mono text-gray-900">{fmt(inv.amount)}</td>
                <td className="px-4 py-2.5 text-center">
                  <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${statusColors[inv.status]}`}>
                    {inv.status}
                  </span>
                </td>
                <td className={`px-4 py-2.5 text-xs ${inv.status === "延滞" ? "text-red-600 font-medium" : "text-gray-400"}`}>
                  {inv.dueDate}
                </td>
                <td className="px-4 py-2.5">
                  {inv.fromEstimate ? (
                    <span className="text-xs font-mono text-blue-600">{inv.fromEstimate}</span>
                  ) : (
                    <span className="text-xs text-gray-300">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
