export default function OrderFormPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* このページはサイドバーなしの独立レイアウト風に見せる */}
      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="mb-8">
          <p className="text-sm text-gray-500 mb-1">株式会社サンプル工業</p>
          <h1 className="text-2xl font-bold text-gray-900">注文・発注フォーム</h1>
          <p className="text-sm text-gray-500 mt-1">以下のフォームに必要事項を入力して送信してください。</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
          {/* 発注者情報 */}
          <div>
            <h2 className="text-sm font-medium text-gray-900 mb-3 pb-2 border-b border-gray-100">発注者情報</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">会社名 <span className="text-red-500">*</span></label>
                <input type="text" placeholder="株式会社〇〇" className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">担当者名 <span className="text-red-500">*</span></label>
                <input type="text" placeholder="山田 太郎" className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">メールアドレス <span className="text-red-500">*</span></label>
                <input type="email" placeholder="yamada@example.co.jp" className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">電話番号</label>
                <input type="tel" placeholder="03-1234-5678" className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
            </div>
          </div>

          {/* 納品先 */}
          <div>
            <h2 className="text-sm font-medium text-gray-900 mb-3 pb-2 border-b border-gray-100">納品先</h2>
            <div>
              <label className="block text-xs text-gray-500 mb-1">納品先住所 <span className="text-red-500">*</span></label>
              <input type="text" placeholder="東京都千代田区〇〇1-2-3" className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
            <div className="mt-3">
              <label className="block text-xs text-gray-500 mb-1">希望納品日</label>
              <input type="date" defaultValue="2026-06-15" className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
          </div>

          {/* 注文明細 */}
          <div>
            <h2 className="text-sm font-medium text-gray-900 mb-3 pb-2 border-b border-gray-100">注文明細</h2>
            <table className="w-full text-sm mb-3">
              <thead>
                <tr className="text-xs text-gray-500">
                  <th className="text-left pb-2 font-medium">品名</th>
                  <th className="text-left pb-2 font-medium w-24">数量</th>
                  <th className="text-left pb-2 font-medium w-20">単位</th>
                  <th className="w-10"></th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                <tr>
                  <td className="pr-2 pb-2">
                    <input type="text" defaultValue="ステンレスボルト M8×30" className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </td>
                  <td className="pr-2 pb-2">
                    <input type="number" defaultValue="500" className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </td>
                  <td className="pr-2 pb-2">
                    <select className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
                      <option>個</option>
                      <option>本</option>
                      <option>セット</option>
                      <option>kg</option>
                    </select>
                  </td>
                  <td className="pb-2 text-center">
                    <button className="text-gray-300 hover:text-red-400 text-lg">×</button>
                  </td>
                </tr>
                <tr>
                  <td className="pr-2 pb-2">
                    <input type="text" defaultValue="六角ナット M8" className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </td>
                  <td className="pr-2 pb-2">
                    <input type="number" defaultValue="500" className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </td>
                  <td className="pr-2 pb-2">
                    <select className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
                      <option>個</option>
                    </select>
                  </td>
                  <td className="pb-2 text-center">
                    <button className="text-gray-300 hover:text-red-400 text-lg">×</button>
                  </td>
                </tr>
                <tr>
                  <td className="pr-2 pb-2">
                    <input type="text" defaultValue="平ワッシャー M8" className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </td>
                  <td className="pr-2 pb-2">
                    <input type="number" defaultValue="1000" className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </td>
                  <td className="pr-2 pb-2">
                    <select className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
                      <option>個</option>
                    </select>
                  </td>
                  <td className="pb-2 text-center">
                    <button className="text-gray-300 hover:text-red-400 text-lg">×</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <button className="text-sm text-blue-600 hover:text-blue-800">+ 行を追加</button>
          </div>

          {/* 備考 */}
          <div>
            <h2 className="text-sm font-medium text-gray-900 mb-3 pb-2 border-b border-gray-100">備考</h2>
            <textarea
              rows={3}
              placeholder="特記事項があればご記入ください"
              defaultValue="納品時は正面入口ではなく、裏手の搬入口からお願いします。"
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* 送信ボタン */}
          <div className="flex items-center justify-between pt-2">
            <p className="text-xs text-gray-400">送信後、担当者より見積もりをお送りします</p>
            <button className="bg-gray-900 text-white text-sm font-medium px-6 py-2.5 rounded-md hover:bg-gray-800 transition-colors">
              注文を送信する
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
