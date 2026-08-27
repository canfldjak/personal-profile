# 技术文档

对照需求：`xuqiu.md`  
工程目录：`code/faculty-homepage/`  
数据来源：Word 履历原文（`src/content/profile.js`）+ `文档/信息.md` 中的 ORCID。无后端。

## 1. 技术栈

| 层级 | 技术 | 版本 |
|------|------|------|
| 框架 | Vue 3（Composition API，`<script setup>`） | 3.5.x |
| 构建 | Vite | 6.x |
| 路由 | 无（单页锚点） | — |
| 样式 | CSS 自定义属性（`src/styles/tokens.css`） | — |
| 图标 | Heroicons 轮廓 SVG（项目内一份路径表） | 24×24 |
| 字体 | Google Fonts：Crimson Pro + Atkinson Hyperlegible | — |

**相对通用模板的例外（必须遵守）：**

| 通用 pitfalls / UI-Skill 铁律 | 本项目 |
|------------------------------|--------|
| 禁止 Mock、数据必须来自数据库 | **无业务库表。** 内容是本人 Word 履历与 ORCID，写入 `profile.js`，不是假接口。 |
| Spring Boot / MySQL / 管理端 | **不做后端、不做 B 端。** 个人主页没有增删改。 |
| 用户端必须 ElementPlus + Tailwind | **不用 ElementPlus。** 后台组件库会把学者主页做成控制台；样式走 token + 语义 HTML。 |
| 图标用 ElementPlus Icons | **用 Heroicons 轮廓 SVG**，全站一套，不用 Emoji。 |

## 2. 架构概述

纯前端静态站点。页面只渲染 `profile.js` 中的原文结构；ORCID 只绑定身份板组件，不进入履历章节组件。

```
访客浏览器
    │
    ▼
Vue 单页（IdentityRail + 履历章节）
    │
    ├── content/profile.js   ← Word 原文结构化（不改写句子）
    ├── public/photos/       ← Word 中的照片
    └── styles/tokens.css    ← 设计规范唯一真理
```

## 3. 工程目录

```
code/faculty-homepage/
├── index.html
├── package.json
├── vite.config.js
├── public/
│   └── photos/degui-sun.jpg
├── src/
│   ├── main.js
│   ├── App.vue
│   ├── content/profile.js
│   ├── components/
│   │   ├── Icon.vue
│   │   ├── IdentityRail.vue
│   │   ├── SiteNav.vue
│   │   ├── CvSection.vue
│   │   └── PublicationList.vue
│   └── styles/
│       ├── tokens.css
│       └── base.css
└── DESIGN-SYSTEM.md   # 规范在仓库根目录
```

## 4. 数据约定

- 履历句子、标题、条目顺序与 Word 一致。仅剥离 Word 域代码 `HYPERLINK "..."`，不改作者措辞。
- ORCID、APS 账户说明只存在于身份板与 `文档/信息.md` 的 YAML 前置元数据，不插入 EDUCATION 等章节。
- 照片文件来自 Word 内嵌 JPEG，文件名 `degui-sun.jpg`。

## 5. 开发规范

- 颜色与间距只引用 token，禁止在组件里写死色值。
- 动效只改变 `transform` / `opacity`，并提供 `prefers-reduced-motion` 降级。
- 可点击元素有 `cursor: pointer`、可见 `:focus-visible`。
- 移动端样式用 `max-width: 767px` 向下叠加，不改写桌面主布局类。

## 6. 启动

```bash
cd code/faculty-homepage
npm install
npm run dev
```

生产构建：`npm run build`，预览：`npm run preview`。
