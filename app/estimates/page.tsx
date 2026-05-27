const estimates = [
  { id: "EST-2026-001", client: "株式会社ABC商事", title: "Webサイトリニューアル", amount: 1980000, issueDate: "2026-05-20", expiryDate: "2026-06-20", status: "承認済み" as const, convertedTo: "INV-2026-001" },
  { id: "EST-2026-002", client: "テクノソリューションズ株式会社", title: "業務システム開発", amount: 5400000, issueDate: "2026-05-22", expiryDate: "2026-06-22", status: "送付済み" as const, convertedTo: null },
  { id: "EST-2026-003", client: "グローバルメディア株式会社", title: "ECサイト構築", amount: 3200000, issueDate: "2026-05-24", expiryDate: "2026-06-24", status: "下書き" as const, convertedTo: null },
  { id: "EST-2026-004", client: "株式会社ネクストステージ", title: "モバイルアプリ開発", amount: 4800000, issueDate: "2026-05-18", expiryDate: "2026-06-18", status: "承認済み" as const, convertedTo: "INV-2026-002" },
  { id: "EST-2026-005", client: "株式会社ABC商事", title: "保守運用契約（年間）", amount: 960000, issueDate: "2026-05-15", expiryDate: "2026-06-15", status: "却下" as const, convertedTo: null },
  { id: "EST-2026-006", client: "ファーストデザイン株式会社", title: "ロゴ・ブランディング制作", amount: 680000, issueDate: "2026-05-26", expiryDate: "2026-06-26", status: "下書き" as const, convertedTo: null },
  { id: "EST-2026-007", client: "テクノソリューションズ株式会社", title: "セキュリティ診断", amount: 1500000, issueDate: "2026-05-10", expiryDate: "2026-06-10", status: "承認済み" as const, convertedTo: "INV-2026-008" },
  { id: "EST-2026-008", client: "株式会社ネクストステージ", title: "データ分析基盤構築", amount: 2800000, issueDate: "2026-05-12", expiryDate: "2026-06-12", status: "承認済み" as const, convertedTo: "INV-2026-006" },
];

const statusColors: Record<string, string> = {
  "下書き": "bg-gray-100 text-gray-600",
  "送付済み": "bg-blue-100 text-blue-700",
  "承認済み": "bg-green-100 text-green-700",
  "却下": "bg-red-100 text-red-700",
};

function fmt(n: number) {
  return "¥" + n.toLocaleString();
}

export default function EstimatesPage() {
  const total = estimates.length;
  const approved = estimates.filter((e) => e.status === "承認済み").length;
  const sent = estimates.filter((e) => e.status === "送付済み").length;
  const draft = estimates.filter((e) => e.status === "下書き").length;

  return (
    <div className="px-8 py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">見積もり</h1>
          <p className="text-sm text-gray-500 mt-0.5">全 {total}件 ・ 承認済み {approved}件 ・ 送付済み {sent}件 ・ 下書き {draft}件</p>
        </div>
        <button className="bg-gray-900 text-white text-sm px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
          + 新規作成
        </button>
      </div>

      {/* フィルター */}
      <div className="flex gap-2 mb-4">
        {["すべて", "下書き", "送付済み", "承認済み", "却下"].map((f, i) => (
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
              <th className="text-left px-4 py-2.5 font-medium">見積番号</th>
              <th className="text-left px-4 py-2.5 font-medium">取引先</th>
              <th className="text-left px-4 py-2.5 font-medium">件名</th>
              <th className="text-right px-4 py-2.5 font-medium">金額（税込）</th>
              <th className="text-center px-4 py-2.5 font-medium">ステータス</th>
              <th className="text-left px-4 py-2.5 font-medium">有効期限</th>
              <th className="text-left px-4 py-2.5 font-medium">変換先</th>
            </tr>
          </thead>
          <tbody>
            {estimates.map((est) => (
              <tr key={est.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer">
                <td className="px-4 py-2.5 font-mono text-xs text-gray-500">{est.id}</td>
                <td className="px-4 py-2.5 text-gray-700 font-medium">{est.client}</td>
                <td className="px-4 py-2.5 text-gray-600">{est.title}</td>
                <td className="px-4 py-2.5 text-right font-mono text-gray-900">{fmt(est.amount)}</td>
                <td className="px-4 py-2.5 text-center">
                  <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${statusColors[est.status]}`}>
                    {est.status}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-gray-400 text-xs">{est.expiryDate}</td>
                <td className="px-4 py-2.5">
                  {est.convertedTo ? (
                    <span className="text-xs font-mono text-blue-600">{est.convertedTo}</span>
                  ) : est.status === "承認済み" ? (
                    <button className="text-xs text-blue-600 hover:underline">請求書に変換</button>
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
