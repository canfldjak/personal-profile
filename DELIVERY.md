# 项目交付说明文档

## 一、项目概述

- 项目名称：DeGui Sun 学术个人主页
- 设计目标：把 Word 履历原样呈现为可阅读、可核对的学者主页，照片与 ORCID 放在身份区，不打断履历正文。
- 目标用户：学术同行、期刊编辑、研究生与潜在合作者（见 `.impeccable.md`）
- 核心使用场景：核对照片与身份 → 阅读研究方向与任职 → 查找 2018 年以来论文 → 用邮件或 ORCID 联系
- 本次交付范围：单页静态站点。不包含后台、登录、CMS、多语言、后端接口。

## 二、设计思路

- 视觉风格：Swiss Modernism 2.0 × 学术编辑体。访客需要可引用的长文，而不是作品集炫技；暖纸色与单点铜橙来自本人冬装照片。
- 反参考：紫蓝渐变 SaaS、大数字英雄指标卡、等大卡片网格、玻璃拟态、Inter/Roboto、把 27 篇论文做成仪表盘。
- 色彩策略：纸面 `#F1EBE0` 60% + 墨色 `#2C261E` 30% + 铜橙 `#9A4314` 10%
- 字体：Crimson Pro（姓名与节题）+ Atkinson Hyperlegible（正文与导航）。[Google Fonts 配对](https://fonts.google.com/share?selection.family=Atkinson+Hyperlegible:wght@400;700|Crimson+Pro:wght@400;500;600;700)
- 布局原则：8px 栅格；桌面左粘性身份板 20.5rem + 正文最大 42rem；首屏焦点是人（照片 + 姓名）

## 三、技术方案

- 技术栈：Vue 3.5 + Vite 6，无路由、无后端
- 核心依赖：`vue`、`@vitejs/plugin-vue`、`vite`
- 浏览器兼容：现代 Chromium / Firefox / Safari（使用 `color-mix`、`:focus-visible`）
- 响应式断点及布局差异：
  - 320–767：顶栏 + 汉堡导航；照片通栏（面部构图）；正文单列
  - 768–1023：身份板顶栏横排（照片左、联系右）；正文在下
  - 1024+：左粘性身份板 + 右履历；导航五项同屏可见

## 四、目录结构

```
HCA20260081/
├── .impeccable.md
├── xuqiu.md
├── jishu.md
├── jihua.md
├── DESIGN-SYSTEM.md
├── DELIVERY.md
├── 文档/
│   ├── 信息.md              # YAML 元数据 + 原文 ORCID 正文 + Word 注释块
│   └── DSun_CV_2026.08 refined.doc
└── code/faculty-homepage/
    ├── index.html
    ├── src/
    │   ├── content/profile.js
    │   ├── components/
    │   ├── styles/tokens.css
    │   └── App.vue
    └── public/photos/degui-sun.jpg
```

## 五、启动方式

```bash
cd code/faculty-homepage
npm install
npm run dev
```

生产构建：`npm run build`。预览：`npm run preview`。

无环境变量、无接口地址。

## 六、设计规范速查

| 项 | 值 |
|---|---|
| 主色 / 次色 / 强调色 | `#9A4314` / `#5A5148` / `#9A4314` |
| 语义色（成功/警告/错误/信息） | `#2F5D3A` / `#8A5A12` / `#8B2E2E` / `#2C5270` |
| 字体（Display / Body / Mono） | Crimson Pro / Atkinson Hyperlegible / ui-monospace |
| 基准间距 | 4px / 8px |
| 圆角（组件级 / 容器级） | 4px / 4px |
| 动效时长（快/标准/慢）+ 缓动 | 150 / 250 / 400ms，`cubic-bezier(0.22, 1, 0.36, 1)` |

完整规范见 `DESIGN-SYSTEM.md`。

## 七、验收结果

| 项 | 结果 |
|---|---|
| 体验评分（critique） | 34/40 |
| 技术评分（audit） | 18/20 |
| 合并健康分 | 88/100 |
| P0 遗留 | 0 |
| AI Slop 判定 | 通过（无紫蓝渐变、无大数字英雄卡、无等大卡片网格、无 Inter） |
| WCAG 2.1 AA | 正文与链接对比度均 ≥4.5:1，已实算 |
| 实测断点 | 375 / 768 / 1440px 无横向滚动；375 汉堡菜单可开闭；1440 五项导航同屏 |

## 八、已知限制与后续建议

- 本版本未覆盖：2011–2017 论文（Word 正文只列到 2.1 Since 2018）、专利与邀请报告的独立章节（仅出现在总述原文中）。
- 已知技术债：照片仍为 Word 内嵌 JPEG（约 209KB），未做响应式 srcset。
- 建议下一迭代：若 Word 补全 2.2 更早论文或专利列表，按同样「原文不改写」规则追加章节。
