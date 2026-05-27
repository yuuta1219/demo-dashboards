const categories = ["すべて", "文房具", "PC周辺機器", "清掃用品", "オフィス家具", "飲料・食品"];

const items = [
  { id: 1, name: "コピー用紙 A4", category: "文房具", quantity: 45, unit: "束", threshold: 20, updatedAt: "2026-05-26" },
  { id: 2, name: "ボールペン（黒）", category: "文房具", quantity: 8, unit: "本", threshold: 10, updatedAt: "2026-05-25" },
  { id: 3, name: "付箋（75mm）", category: "文房具", quantity: 0, unit: "個", threshold: 5, updatedAt: "2026-05-20" },
  { id: 4, name: "USBマウス", category: "PC周辺機器", quantity: 3, unit: "個", threshold: 5, updatedAt: "2026-05-24" },
  { id: 5, name: "HDMIケーブル", category: "PC周辺機器", quantity: 12, unit: "本", threshold: 3, updatedAt: "2026-05-22" },
  { id: 6, name: "キーボード", category: "PC周辺機器", quantity: 2, unit: "台", threshold: 3, updatedAt: "2026-05-23" },
  { id: 7, name: "トイレットペーパー", category: "清掃用品", quantity: 30, unit: "ロール", threshold: 10, updatedAt: "2026-05-26" },
  { id: 8, name: "ゴミ袋（45L）", category: "清掃用品", quantity: 5, unit: "枚", threshold: 20, updatedAt: "2026-05-21" },
  { id: 9, name: "デスクライト", category: "オフィス家具", quantity: 15, unit: "台", threshold: 5, updatedAt: "2026-05-18" },
  { id: 10, name: "ミネラルウォーター", category: "飲料・食品", quantity: 24, unit: "本", threshold: 12, updatedAt: "2026-05-26" },
];

function getStatus(quantity: number, threshold: number) {
  if (quantity === 0) return { label: "在庫切れ", dot: "bg-red-400", bg: "bg-red-50 text-red-600 border-red-200" };
  if (quantity <= threshold) return { label: "在庫少", dot: "bg-amber-400", bg: "bg-amber-50 text-amber-600 border-amber-200" };
  return { label: "十分", dot: "bg-emerald-400", bg: "bg-emerald-50 text-emerald-600 border-emerald-200" };
}

export default function InventoryPage() {
  const totalItems = items.length;
  const lowStock = items.filter((i) => i.quantity > 0 && i.quantity <= i.threshold).length;
  const outOfStock = items.filter((i) => i.quantity === 0).length;
  const sufficient = totalItems - lowStock - outOfStock;

  const summaryCards = [
    { label: "全品目数", value: totalItems, accent: "from-violet-500 to-blue-500" },
    { label: "在庫十分", value: sufficient, accent: "from-emerald-500 to-teal-500" },
    { label: "在庫少", value: lowStock, accent: "from-amber-500 to-orange-500" },
    { label: "在庫切れ", value: outOfStock, accent: "from-red-500 to-pink-500" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">備品・消耗品 在庫管理</h1>
        <p className="text-sm text-gray-400">オフィスの備品・消耗品の在庫状況を管理します</p>
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

      {/* カテゴリフィルター */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {categories.map((cat, i) => (
          <button
            key={cat}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
              i === 0
                ? "bg-gradient-to-r from-violet-500 to-blue-500 text-white shadow-md shadow-violet-500/20"
                : "glass text-gray-500 hover:text-gray-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 在庫テーブル */}
      <div className="glass rounded-xl overflow-hidden">
        <table className="w-full text-sm ai-table">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-5 py-3">品名</th>
              <th className="text-left px-5 py-3">カテゴリ</th>
              <th className="text-right px-5 py-3">数量</th>
              <th className="text-center px-5 py-3">ステータス</th>
              <th className="text-left px-5 py-3">最終更新</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const status = getStatus(item.quantity, item.threshold);
              return (
                <tr key={item.id} className="transition-colors">
                  <td className="px-5 py-3.5 font-medium text-gray-800">{item.name}</td>
                  <td className="px-5 py-3.5 text-gray-400">{item.category}</td>
                  <td className="px-5 py-3.5 text-right text-gray-700 font-mono">
                    {item.quantity} <span className="text-gray-300">{item.unit}</span>
                  </td>
                  <td className="px-5 py-3.5 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${status.bg}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                      {status.label}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-gray-300 font-mono text-xs">{item.updatedAt}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
