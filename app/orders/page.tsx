const orders = [
  { id: "PO-2026-001", supplier: "株式会社サプライテック", title: "開発用サーバー機器一式", amount: 1250000, orderDate: "2026-05-10", deliveryDate: "2026-06-10", status: "納品済み" as const },
  { id: "PO-2026-002", supplier: "オフィスプロ株式会社", title: "オフィス家具（デスク・チェア）", amount: 480000, orderDate: "2026-05-15", deliveryDate: "2026-06-01", status: "発注済み" as const },
  { id: "PO-2026-003", supplier: "クラウドサービス株式会社", title: "クラウドインフラ利用料（年間）", amount: 3600000, orderDate: "2026-05-20", deliveryDate: "2026-06-20", status: "承認待ち" as const },
  { id: "PO-2026-004", supplier: "株式会社デザインワークス", title: "パンフレット印刷（1000部）", amount: 320000, orderDate: "2026-05-22", deliveryDate: "2026-06-05", status: "発注済み" as const },
  { id: "PO-2026-005", supplier: "株式会社サプライテック", title: "ネットワーク機器交換", amount: 890000, orderDate: "2026-05-08", deliveryDate: "2026-05-25", status: "納品済み" as const },
  { id: "PO-2026-006", supplier: "セキュアソフト株式会社", title: "セキュリティソフトライセンス", amount: 720000, orderDate: "2026-05-25", deliveryDate: "2026-06-25", status: "下書き" as const },
  { id: "PO-2026-007", supplier: "オフィスプロ株式会社", title: "複合機リース契約", amount: 156000, orderDate: "2026-05-18", deliveryDate: "2026-06-18", status: "発注済み" as const },
];

const statusColors: Record<string, string> = {
  "下書き": "bg-gray-100 text-gray-600",
  "承認待ち": "bg-yellow-100 text-yellow-700",
  "発注済み": "bg-blue-100 text-blue-700",
  "納品済み": "bg-green-100 text-green-700",
};

function fmt(n: number) {
  return "¥" + n.toLocaleString();
}

export default function OrdersPage() {
  const total = orders.length;
  const delivered = orders.filter((o) => o.status === "納品済み").length;
  const ordered = orders.filter((o) => o.status === "発注済み").length;
  const pending = orders.filter((o) => o.status === "承認待ち").length;

  return (
    <div className="px-8 py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">発注書</h1>
          <p className="text-sm text-gray-500 mt-0.5">全 {total}件 ・ 納品済み {delivered}件 ・ 発注済み {ordered}件 ・ 承認待ち {pending}件</p>
        </div>
        <button className="bg-gray-900 text-white text-sm px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
          + 新規作成
        </button>
      </div>

      {/* フィルター */}
      <div className="flex gap-2 mb-4">
        {["すべて", "下書き", "承認待ち", "発注済み", "納品済み"].map((f, i) => (
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
              <th className="text-left px-4 py-2.5 font-medium">発注番号</th>
              <th className="text-left px-4 py-2.5 font-medium">発注先</th>
              <th className="text-left px-4 py-2.5 font-medium">件名</th>
              <th className="text-right px-4 py-2.5 font-medium">金額（税込）</th>
              <th className="text-center px-4 py-2.5 font-medium">ステータス</th>
              <th className="text-left px-4 py-2.5 font-medium">発注日</th>
              <th className="text-left px-4 py-2.5 font-medium">納品予定日</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer">
                <td className="px-4 py-2.5 font-mono text-xs text-gray-500">{order.id}</td>
                <td className="px-4 py-2.5 text-gray-700 font-medium">{order.supplier}</td>
                <td className="px-4 py-2.5 text-gray-600">{order.title}</td>
                <td className="px-4 py-2.5 text-right font-mono text-gray-900">{fmt(order.amount)}</td>
                <td className="px-4 py-2.5 text-center">
                  <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${statusColors[order.status]}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-gray-400 text-xs">{order.orderDate}</td>
                <td className="px-4 py-2.5 text-gray-400 text-xs">{order.deliveryDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
