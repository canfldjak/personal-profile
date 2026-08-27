# 开发计划

对照：`xuqiu.md`、`jishu.md`。先后端后前端的惯例在本项目不适用（无后端）。按页面模块排列。

## Day1 — 设计规范与身份板

### 前端（Web 用户端）
- 落盘 `DESIGN-SYSTEM.md` 与 `src/styles/tokens.css`
- 页面：身份板（照片、姓名、职务、邮件、手机、ORCID）
- 数据：`profile.js` 身份字段 + Word 照片
- 必须使用 frontend-design Skills：
  - teach-impeccable → `.impeccable.md`
  - frontend-design → AI Slop 反模式
  - ui-ux-pro-max → Academic/Research 字体与 Swiss Modernism 2.0
  - typeset / colorize → Crimson Pro + Atkinson Hyperlegible；暖纸 / 墨 / 铜橙

## Day2 — 履历正文四章

### 前端（Web 用户端）
- 页面：总述、EDUCATION、RESEARCH INTERESTS、EMPLOYMENT…
- 调用数据：`profile.js` 各章节原文
- 必须使用 frontend-design Skills：
  - arrange → 左栏身份 / 右栏长文，不对称栏宽
  - adapt → 320 单栏、768 顶栏+正文、1440 粘性身份板

## Day3 — 论文列表、韧性、验收

### 前端（Web 用户端）
- 页面：2. PUBLICATIONS / 2.1 Since 2018
- DOI 可点，著录文字不改写
- 必须使用 frontend-design Skills：
  - harden → 超长题名、DOI 折行、空链降级
  - critique + audit → 体验与技术体检
  - polish → 交付前收尾
