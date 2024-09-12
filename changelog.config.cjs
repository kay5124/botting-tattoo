module.exports = {
  disableEmoji: false, // 是否禁用 emoji
  format: "{type}{scope}: {emoji}{subject}", // Commit 訊息的格式
  list: ["test", "feat", "fix", "chore", "docs", "refactor", "style", "ci", "perf"], // Commit 類型的清單
  maxMessageLength: 64, // Commit 訊息的最大長度
  minMessageLength: 3, // Commit 訊息的最小長度
  questions: ["type", "scope", "subject", "body", "breaking", "issues", "lerna"], // 問題的清單
  scopes: [], // Commit 範圍的清單
  types: {
    // Commit 類型的清單
    chore: {
      description: "增加或修改第三方套件(輔助工具)等 (maintain)", // Commit 類型的描述
      emoji: "🤖", // Commit 類型的 emoji
      value: "chore", // Commit 類型的值
    },
    ci: {
      description: "CI 相關更動(Continuous Integration)",
      emoji: "🎡",
      value: "ci",
    },
    docs: {
      description: "修改/新增文件 (documentation)",
      emoji: "✏️",
      value: "docs",
    },
    feat: {
      description: "新增/修改功能 (Feature)",
      emoji: "🎸",
      value: "feat",
    },
    fix: {
      description: "修正 Bug (bug fix)",
      emoji: "🐛",
      value: "fix",
    },
    perf: {
      description: "提高效能的程式碼修正",
      emoji: "⚡️",
      value: "perf",
    },
    refactor: {
      description: "重構 or 優化，不屬於 bug 也不屬於新增功能等",
      emoji: "💡",
      value: "refactor",
    },
    release: {
      description: "新增正式釋出的 release commit 訊息",
      emoji: "🏹",
      value: "release",
    },
    style: {
      description: "修改程式碼格式或風格，不影響原有運作，例如 ESLint (formatting, missing semi colons, …)",
      emoji: "💄",
      value: "style",
    },
    test: {
      description: "增加測試功能 (when adding missing tests)",
      emoji: "💍",
      value: "test",
    },
  },
  messages: {
    // Commit 的提示訊息描述
    type: "請選擇您要 Commit 的類型(必選)：",
    customScope: "選擇此次 Commit 影響的範圍(可選，若無，請按 Enter 略過):",
    subject: "簡短描述 Commit 的修正範圍(必填)：\n",
    body: "更詳細的 Commit 說明(可選，若無，請按 Enter 略過):\n ",
    breaking: "列出所有重大更改(可選，若無，請按 Enter 略過):\n",
    footer: "此次 Commit 會關閉的 Issues, e.g #123(可選，若無，請按 Enter 略過):",
    confirmCommit: "請確認本次 Commit 描述。\n",
  },
};
