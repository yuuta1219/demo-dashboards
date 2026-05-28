function fmt(n: number) {
  return "¥" + n.toLocaleString();
}

const lineItems = [
  { name: "Webサイトリニューアル - デザイン制作", quantity: 1, unit: "式", unitPrice: 450000, amount: 450000 },
  { name: "Webサイトリニューアル - コーディング", quantity: 1, unit: "式", unitPrice: 380000, amount: 380000 },
  { name: "CMS導入・設定", quantity: 1, unit: "式", unitPrice: 80000, amount: 80000 },
  { name: "動作テスト・検証", quantity: 2, unit: "人日", unitPrice: 40000, amount: 80000 },
];

const subtotal = lineItems.reduce((s, i) => s + i.amount, 0);
const tax = Math.floor(subtotal * 0.1);
const total = subtotal + tax;

export default function InvoicePreviewPage() {
  return (
    <div className="px-8 py-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">請求書プレビュー</h1>
        <div className="flex gap-2">
          <button className="bg-white text-gray-700 text-sm px-4 py-2 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors">
            編集する
          </button>
          <button className="bg-gray-900 text-white text-sm px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
            PDFダウンロード
          </button>
        </div>
      </div>

      {/* 請求書本体 */}
      <div className="bg-white border border-gray-200 rounded-lg max-w-3xl mx-auto p-10 shadow-sm">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 tracking-widest">請 求 書</h2>
        </div>

        <div className="flex justify-between mb-8">
          {/* 宛先 */}
          <div>
            <div className="border-b-2 border-gray-900 pb-1 mb-3">
              <p className="text-lg font-bold text-gray-900">株式会社ABC商事 御中</p>
            </div>
            <p className="text-sm text-gray-600">下記の通りご請求申し上げます。</p>
          </div>
          {/* 発行情報 */}
          <div className="text-right text-sm text-gray-600">
            <p>請求番号: <span className="font-mono">INV-2026-001</span></p>
            <p>発行日: 2026年5月1日</p>
            <p>お支払期限: 2026年5月31日</p>
          </div>
        </div>

        {/* 合計金額 */}
        <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-8">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">ご請求金額（税込）</p>
            <p className="text-2xl font-bold text-gray-900">{fmt(total)}</p>
          </div>
        </div>

        {/* 明細テーブル */}
        <table className="w-full text-sm mb-6">
          <thead>
            <tr className="border-b-2 border-gray-900 text-gray-600">
              <th className="text-left py-2 font-medium">品名・内容</th>
              <th className="text-right py-2 font-medium w-16">数量</th>
              <th className="text-center py-2 font-medium w-12">単位</th>
              <th className="text-right py-2 font-medium w-24">単価</th>
              <th className="text-right py-2 font-medium w-28">金額</th>
            </tr>
          </thead>
          <tbody>
            {lineItems.map((item, i) => (
              <tr key={i} className="border-b border-gray-100">
                <td className="py-2.5 text-gray-800">{item.name}</td>
                <td className="py-2.5 text-right font-mono text-gray-700">{item.quantity}</td>
                <td className="py-2.5 text-center text-gray-500">{item.unit}</td>
                <td className="py-2.5 text-right font-mono text-gray-700">{fmt(item.unitPrice)}</td>
                <td className="py-2.5 text-right font-mono text-gray-900">{fmt(item.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* 小計・税・合計 */}
        <div className="flex justify-end mb-8">
          <div className="w-64">
            <div className="flex justify-between py-1.5 text-sm">
              <span className="text-gray-500">小計</span>
              <span className="font-mono text-gray-700">{fmt(subtotal)}</span>
            </div>
            <div className="flex justify-between py-1.5 text-sm">
              <span className="text-gray-500">消費税（10%）</span>
              <span className="font-mono text-gray-700">{fmt(tax)}</span>
            </div>
            <div className="flex justify-between py-2 text-sm font-bold border-t-2 border-gray-900 mt-1">
              <span className="text-gray-900">合計</span>
              <span className="font-mono text-gray-900">{fmt(total)}</span>
            </div>
          </div>
        </div>

        {/* 振込先 */}
        <div className="border border-gray-200 rounded-md p-4 mb-6">
          <p className="text-xs text-gray-500 mb-2">お振込先</p>
          <div className="text-sm text-gray-700 space-y-0.5">
            <p>三菱UFJ銀行 渋谷支店（普通）1234567</p>
            <p>口座名義: カ）サンプルコウギョウ</p>
          </div>
        </div>

        {/* 発行元 */}
        <div className="text-right text-sm text-gray-600 space-y-0.5">
          <p className="font-medium text-gray-800">株式会社サンプル工業</p>
          <p>〒150-0001 東京都渋谷区神宮前1-2-3</p>
          <p>TEL: 03-1234-5678 / FAX: 03-1234-5679</p>
          <p>登録番号: T1234567890123</p>
        </div>
      </div>
    </div>
  );
}
