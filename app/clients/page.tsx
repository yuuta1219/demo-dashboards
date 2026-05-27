const clients = [
  { id: 1, name: "株式会社ABC商事", contact: "山田 太郎", email: "yamada@abc-shoji.co.jp", phone: "03-1234-5678", type: "顧客" as const, estimateCount: 2, invoiceCount: 3, totalAmount: 2050000 },
  { id: 2, name: "テクノソリューションズ株式会社", contact: "鈴木 花子", email: "suzuki@techno-sol.co.jp", phone: "03-2345-6789", type: "顧客" as const, estimateCount: 2, invoiceCount: 2, totalAmount: 9600000 },
  { id: 3, name: "グローバルメディア株式会社", contact: "佐藤 健一", email: "sato@global-media.co.jp", phone: "03-3456-7890", type: "顧客" as const, estimateCount: 1, invoiceCount: 1, totalAmount: 3750000 },
  { id: 4, name: "株式会社ネクストステージ", contact: "田中 美咲", email: "tanaka@nextstage.co.jp", phone: "06-1234-5678", type: "顧客" as const, estimateCount: 1, invoiceCount: 2, totalAmount: 9000000 },
  { id: 5, name: "ファーストデザイン株式会社", contact: "伊藤 直樹", email: "ito@first-design.co.jp", phone: "03-4567-8901", type: "顧客" as const, estimateCount: 1, invoiceCount: 1, totalAmount: 1020000 },
  { id: 6, name: "株式会社サプライテック", contact: "中村 誠", email: "nakamura@supplytech.co.jp", phone: "045-123-4567", type: "仕入先" as const, estimateCount: 0, invoiceCount: 0, totalAmount: 2140000 },
  { id: 7, name: "オフィスプロ株式会社", contact: "小林 裕子", email: "kobayashi@officepro.co.jp", phone: "03-5678-9012", type: "仕入先" as const, estimateCount: 0, invoiceCount: 0, totalAmount: 636000 },
  { id: 8, name: "クラウドサービス株式会社", contact: "渡辺 大輔", email: "watanabe@cloud-svc.co.jp", phone: "03-6789-0123", type: "仕入先" as const, estimateCount: 0, invoiceCount: 0, totalAmount: 3600000 },
];

const typeColors: Record<string, string> = {
  "顧客": "bg-blue-100 text-blue-700",
  "仕入先": "bg-green-100 text-green-700",
};

function fmt(n: number) {
  return "¥" + n.toLocaleString();
}

export default function ClientsPage() {
  const customers = clients.filter((c) => c.type === "顧客").length;
  const suppliers = clients.filter((c) => c.type === "仕入先").length;

  return (
    <div className="px-8 py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">取引先管理</h1>
          <p className="text-sm text-gray-500 mt-0.5">顧客 {customers}社 ・ 仕入先 {suppliers}社</p>
        </div>
        <button className="bg-gray-900 text-white text-sm px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
          + 取引先を追加
        </button>
      </div>

      {/* フィルター */}
      <div className="flex gap-2 mb-4">
        {["すべて", "顧客", "仕入先"].map((f, i) => (
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
              <th className="text-left px-4 py-2.5 font-medium">取引先名</th>
              <th className="text-left px-4 py-2.5 font-medium">種別</th>
              <th className="text-left px-4 py-2.5 font-medium">担当者</th>
              <th className="text-left px-4 py-2.5 font-medium">メール</th>
              <th className="text-left px-4 py-2.5 font-medium">電話番号</th>
              <th className="text-right px-4 py-2.5 font-medium">取引総額</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((c) => (
              <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer">
                <td className="px-4 py-2.5 font-medium text-gray-900">{c.name}</td>
                <td className="px-4 py-2.5">
                  <span className={`text-xs px-2 py-0.5 rounded font-medium ${typeColors[c.type]}`}>{c.type}</span>
                </td>
                <td className="px-4 py-2.5 text-gray-700">{c.contact}</td>
                <td className="px-4 py-2.5 text-gray-500">{c.email}</td>
                <td className="px-4 py-2.5 text-gray-500">{c.phone}</td>
                <td className="px-4 py-2.5 text-right font-mono text-gray-900">{fmt(c.totalAmount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
