type Task = {
  id: number;
  title: string;
  assignee: string;
  priority: "高" | "中" | "低";
  dueDate: string;
};

const columns: { title: string; dotColor: string; cardBg: string; tasks: Task[] }[] = [
  {
    title: "Todo",
    dotColor: "bg-gray-300",
    cardBg: "bg-gray-50",
    tasks: [
      { id: 1, title: "ユーザー認証のリファクタリング", assignee: "田中", priority: "高", dueDate: "5/30" },
      { id: 2, title: "月次レポート機能の設計", assignee: "佐藤", priority: "中", dueDate: "6/3" },
      { id: 3, title: "テスト環境のDockerfile更新", assignee: "鈴木", priority: "低", dueDate: "6/5" },
      { id: 4, title: "APIドキュメント整備", assignee: "山田", priority: "中", dueDate: "6/2" },
    ],
  },
  {
    title: "In Progress",
    dotColor: "bg-blue-400",
    cardBg: "bg-blue-50/50",
    tasks: [
      { id: 5, title: "検索機能のパフォーマンス改善", assignee: "田中", priority: "高", dueDate: "5/28" },
      { id: 6, title: "通知メールテンプレート作成", assignee: "佐藤", priority: "中", dueDate: "5/29" },
      { id: 7, title: "ダッシュボードのグラフ表示", assignee: "山田", priority: "高", dueDate: "5/28" },
    ],
  },
  {
    title: "Done",
    dotColor: "bg-emerald-400",
    cardBg: "bg-emerald-50/50",
    tasks: [
      { id: 8, title: "ログイン画面のUI改修", assignee: "鈴木", priority: "中", dueDate: "5/25" },
      { id: 9, title: "CSV一括インポート機能", assignee: "田中", priority: "高", dueDate: "5/24" },
      { id: 10, title: "エラーハンドリング統一", assignee: "佐藤", priority: "低", dueDate: "5/23" },
      { id: 11, title: "CI/CDパイプライン構築", assignee: "山田", priority: "高", dueDate: "5/22" },
    ],
  },
];

const priorityConfig: Record<string, string> = {
  "高": "bg-red-50 text-red-600 border border-red-200",
  "中": "bg-amber-50 text-amber-600 border border-amber-200",
  "低": "bg-gray-50 text-gray-500 border border-gray-200",
};

const avatarGradients = [
  "from-blue-500 to-cyan-400",
  "from-emerald-500 to-teal-400",
  "from-violet-500 to-purple-400",
  "from-orange-500 to-amber-400",
];
const assigneeMap: Record<string, number> = {};
let idx = 0;
function getAvatarGradient(name: string) {
  if (!(name in assigneeMap)) {
    assigneeMap[name] = idx % avatarGradients.length;
    idx++;
  }
  return avatarGradients[assigneeMap[name]];
}

export default function KanbanPage() {
  const totalTasks = columns.reduce((s, c) => s + c.tasks.length, 0);
  const doneTasks = columns.find((c) => c.title === "Done")?.tasks.length || 0;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">カンバン式タスクボード</h1>
          <p className="text-sm text-gray-400">
            全 {totalTasks} タスク ・ 完了率{" "}
            <span className="text-emerald-500 font-medium">{((doneTasks / totalTasks) * 100).toFixed(0)}%</span>
          </p>
        </div>
        <button className="bg-gradient-to-r from-violet-500 to-blue-500 text-white text-xs font-medium px-4 py-2 rounded-lg hover:opacity-90 transition-opacity shadow-md shadow-violet-500/20">
          + タスクを追加
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {columns.map((col) => (
          <div key={col.title}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${col.dotColor}`} />
                <h2 className="font-semibold text-gray-600 text-sm">{col.title}</h2>
              </div>
              <span className="text-xs text-gray-400 bg-gray-100 rounded-full px-2 py-0.5">
                {col.tasks.length}
              </span>
            </div>
            <div className={`${col.cardBg} rounded-xl p-3 space-y-3 min-h-[200px] border border-gray-100`}>
              {col.tasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white rounded-lg border border-gray-200/80 p-4 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-[1.01]"
                >
                  <p className="font-medium text-gray-800 text-sm mb-3">{task.title}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-6 h-6 rounded-full bg-gradient-to-br ${getAvatarGradient(task.assignee)} flex items-center justify-center text-white text-[10px] font-bold`}
                      >
                        {task.assignee[0]}
                      </div>
                      <span className="text-xs text-gray-400">{task.assignee}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${priorityConfig[task.priority]}`}>
                        {task.priority}
                      </span>
                      <span className="text-[10px] text-gray-300 font-mono">{task.dueDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
