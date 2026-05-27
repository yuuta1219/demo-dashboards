const orders = [
  { id: "PO-2026-001", supplier: "株式会社サプライテック", title: "開発用サーバー機器一式", amount: 1250000, orderDate: "2026-05-10", deliveryDate: "2026-06-10", status: "納品済み" as const },
  { id: "PO-2026-002", supplier: "オフィスプロ株式会社", title: "オフィス家具（デスク・チェア）", amount: 480000, orderDate: "2026-05-15", deliveryDate: "2026-06-01", status: "発注済み" as const },
  { id: "PO-2026-003", supplier: "クラウドサービス株式会社", title: "クラウドインフラ利用料（年間）", amount: 3600000, orderDate: "2026-05-20", deliveryDate: "2026-06-20", status: "承認待ち" as const },
  { id: "PO-2026-004", supplier: "株式会社デザインワークス", title: "パンフレット印刷（1000部）", amount: 320000, orderDate: "2026-05-22", deliveryDate: "2026-06-05", status: "発注済み" as const },
  { id: "PO-2026-005", supplier: "株式会社サプライテック", title: "ネットワーク機器交換", amount: 890000, orderDate: "2026-05-08", deliveryDate: "2026-05-25", status: "納品済み" as const },
  { id: "PO-2026-006", supplier: "セキュアソフト株式会社", title: "セキュリティソフトライセンス", amount: 720000, orderDate: "2026-05-25", deliveryDate: "2026-06-25", status: "下書き" as const },
  { id: "PO-2026-007", supplier: "オフィスプロ株式会社", title: "複合機リース契約", amount: 156000, orderDate: "2026-05-18", deliveryDate: "2026-06-18", status: "発注済み" as const },
];

const statusConfig: Record<string, { badge: string; dot: string }> = {
  "下書き": { badge: "bg-gray-50 text-gray-500 border border-gray-200", dot: "bg-gray-300" },
  "承認待ち": { badge: "bg-amber-50 text-amber-600 border border-amber-200", dot: "bg-amber-400" },
  "発注済み": { badge: "bg-blue-50 text-blue-600 border border-blue-200", dot: "bg-blue-400" },
  "納品済み": { badge: "bg-emerald-50 text-emerald-600 border border-emerald-200", dot: "bg-emerald-400" },
};

function formatCurrency(n: number) {
  return "¥" + n.toLocaleString();
}

export default function OrdersPage() {
  const totalAmount = orders.reduce((s, o) => s + o.amount, 0);
  const delivered = orders.filter((o) => o.status === "納品済み");
  const deliveredAmount = delivered.reduce((s, o) => s + o.amount, 0);
  const ordered = orders.filter((o) => o.status === "発注済み").length;
  const pendingApproval = orders.filter((o) => o.status === "承認待ち").length;

  const summaryCards = [
    { label: "発注総額", value: formatCurrency(totalAmount), accent: "from-violet-500 to-blue-500" },
    { label: "納品済み", value: formatCurrency(deliveredAmount), accent: "from-emerald-500 to-teal-500" },
    { label: "発注中", value: `${ordered}件`, accent: "from-blue-500 to-cyan-500" },
    { label: "承認待ち", value: `${pendingApproval}件`, accent: "from-amber-500 to-orange-500" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">発注書管理</h1>
          <p className="text-sm text-gray-400">発注書の作成・発注状況のトラッキング</p>
        </div>
        <button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-medium px-4 py-2 rounded-lg hover:opacity-90 transition-opacity shadow-md shadow-emerald-500/20">
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

      {/* 進捗トラッカー */}
      <div className="glass rounded-xl p-5 mb-8">
        <p className="text-xs text-gray-400 uppercase tracking-wider mb-4">発注ステータス内訳</p>
        <div className="flex gap-6">
          {Object.entries(statusConfig).map(([status, config]) => {
            const count = orders.filter((o) => o.status === status).length;
            return (
              <div key={status} className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${config.dot}`} />
                  <span className="text-sm text-gray-500">{status}</span>
                </div>
                <span className="text-sm font-bold text-gray-800">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="glass rounded-xl overflow-hidden">
        <table className="w-full text-sm ai-table">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-5 py-3">発注番号</th>
              <th className="text-left px-5 py-3">発注先</th>
              <th className="text-left px-5 py-3">件名</th>
              <th className="text-right px-5 py-3">金額</th>
              <th className="text-center px-5 py-3">ステータス</th>
              <th className="text-left px-5 py-3">納品予定日</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="transition-colors cursor-pointer">
                <td className="px-5 py-3.5 font-mono text-xs text-emerald-500">{order.id}</td>
                <td className="px-5 py-3.5 text-gray-700 font-medium">{order.supplier}</td>
                <td className="px-5 py-3.5 text-gray-600">{order.title}</td>
                <td className="px-5 py-3.5 text-right font-mono text-gray-800 font-medium">{formatCurrency(order.amount)}</td>
                <td className="px-5 py-3.5 text-center">
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig[order.status].badge}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-gray-300 font-mono text-xs">{order.deliveryDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
