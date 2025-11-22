// my-monorepo/.prettierrc.js
module.exports = {
  // 基础规则（示例）
  printWidth: 100, // 每行最大字符数
  tabWidth: 2, // 缩进空格数
  useTabs: false, // 不使用制表符
  semi: true, // 语句末尾加分号
  singleQuote: true, // 使用单引号
  quoteProps: "as-needed", // 对象属性引号按需添加
  jsxSingleQuote: false, // JSX 中使用双引号
  trailingComma: "es5", // 数组/对象末尾添加逗号（ES5 风格）
  bracketSpacing: true, // 对象字面量前后加空格（{ foo } 而非 {foo}）
  jsxBracketSameLine: false, // JSX 标签闭合符不换行
  arrowParens: "avoid", // 箭头函数参数只有一个时省略括号
  rangeStart: 0, // 格式化范围（默认全文件）
  rangeEnd: Infinity,
  requirePragma: false, // 不需要文件头部注释触发格式化
  insertPragma: false, // 不自动插入格式化注释
  proseWrap: "preserve", // Markdown 文本换行保留原格式
  htmlWhitespaceSensitivity: "css", // HTML 空格敏感度（遵循 CSS 规则）
  vueIndentScriptAndStyle: false, // Vue 中 script/style 不缩进
  endOfLine: "lf", // 换行符使用 LF（统一跨平台）
  embeddedLanguageFormatting: "auto", // 自动格式化嵌入的代码（如 HTML 中的 JS）
};
