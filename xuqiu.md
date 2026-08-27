# 项目需求文档

对照来源：`文档/DSun_CV_2026.08 refined.doc`（原文不可改写）、`文档/信息.md`（ORCID 等身份信息，不进入履历正文）。

## 角色清单

| 角色 | 说明 |
|------|------|
| 访客（唯一角色） | 学术同行、编辑、学生、合作者。无需登录。只读浏览与联系。 |

无管理员、无注册、无权限分级。

## 功能模块

### 访客模块
- **身份识别（P0）**：展示 Word 中的照片、姓名 DeGui Sun、现任职务原文、手机与邮箱。
- **ORCID 入口（P0）**：将 `文档/信息.md` 中的 ORCID（https://orcid.org/0000-0001-5835-1354）放在身份板或页脚，**不出现在履历正文段落中**。
- **履历阅读（P0）**：按 Word 结构呈现 EDUCATION、RESEARCH INTERESTS、EMPLOYMENT EXPERIENCE, POSITIONS and ACHIEVEMENTS、PUBLICATIONS。文字描述与 Word 保持一致。
- **论文列表（P0）**：2.1 Since 2018 起全部条目原样列出；若条目含 DOI，提供可点击链接，但不改写著录文字。
- **页内导航（P1）**：锚定到教育 / 研究 / 任职 / 论文；键盘与移动端可用。
- **联系（P1）**：`mailto:` 与 `tel:`，不经后端。

明确不做：后台 CMS、登录、多语言切换、把成就改写成统计大数字卡片、修改 Word 措辞。

## 业务流程（核心闭环）

1. 打开站点，首屏确认「这是谁」（照片 + 姓名）。
2. 在身份区看到联系方式与 ORCID（正文外）。
3. 阅读 2018 至今总述原文。
4. 按导航跳到教育 / 研究兴趣 / 任职成就 / 论文。
5. 需要核论文时点 DOI；需要联系时点邮件或电话。

## 信息架构

```
学术个人主页（单页）
├── 身份板（照片 / 姓名 / 职务 / 邮件 / 手机 / ORCID）
├── 总述（2018-Present 原文）
├── EDUCATION
├── RESEARCH INTERESTS
├── EMPLOYMENT EXPERIENCE, POSITIONS and ACHIEVEMENTS
└── 2. PUBLICATIONS: Since 2011 to present
    └── 2.1 Since 2018
```

## 术语表

| 用语 | 含义 |
|------|------|
| 身份板 | 照片与联系信息所在区域，不属于履历正文 |
| 履历正文 | Word 中 EDUCATION 起的叙述与条目 |
| 原文 | Word 中的文字描述，界面必须逐句保持 |
