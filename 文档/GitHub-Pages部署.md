# GitHub Pages 部署说明

仓库：https://github.com/canfldjak/personal-profile  
站点：https://canfldjak.github.io/personal-profile/

本仓库是 **项目站点**（不是 `用户名.github.io` 那种用户主页），所以线上地址一定带仓库名：`/personal-profile/`。  
GitHub 网页若已切成中文，括号里是对应中文按钮。

---

## 0. 当前状态（已经做完）

下面这些已经在仓库里，**不用再新建**：

| 文件 | 作用 |
|------|------|
| `.github/workflows/deploy-pages.yml` | 推送到 `main` 后自动构建并发布 |
| `code/faculty-homepage/vite.config.js` | 用 `BASE_PATH` 区分本地 `/` 和 Pages `/personal-profile/` |
| `code/faculty-homepage/src/content/profile.js` | 照片地址用 `import.meta.env.BASE_URL`，否则 Pages 上照片 404 |
| `code/faculty-homepage/public/.nojekyll` | 避免 GitHub 用 Jekyll 处理构建产物 |

仓库 **Settings → Pages** 的 Source 已设为 **GitHub Actions**。  
之后只要把改动推到 `main`，就会自动重新部署。

---

## 1. 把代码推到 GitHub（本地）

在项目根目录：

```bash
git add .
git commit -m "说明这次改了什么"
git push origin main
```

没有新改动就不用这一步。推送成功后，浏览器里继续下面的检查。

---

## 2. 第一次开通 Pages（只做一次）

GitHub Actions **没有权限自己开通** Pages，必须在网页上点一次。本仓库已经点过；若换了新仓库，按下面做。

### 2.1 打开仓库

1. 浏览器打开 https://github.com/canfldjak/personal-profile
2. 右上角确认已登录（能看到头像、能看到 **Settings / 设置**）

### 2.2 进入 Pages 设置

1. 点仓库顶部导航最右侧的 **Settings**（设置）
2. 左侧栏找到 **Code, planning, and automation**（代码、规划与自动化）
3. 点 **Pages**

你会看到标题 **GitHub Pages**，以及 **Build and deployment**（构建和部署）。

### 2.3 把发布源改成 GitHub Actions

1. 找到 **Source**（源）这一行
2. 点当前按钮，默认多半是 **Deploy from a branch**（从分支部署）
3. 在弹出菜单里点 **GitHub Actions**  
   说明文字是：Best for using frameworks and customizing your build process（适合框架和自定义构建）
4. 页面顶部会出现绿条：**GitHub Pages source saved.**（已保存 GitHub Pages 源）

不要选 **Deploy from a branch**，也不要去选 `main` / `/docs`。本项目由 Vite 构建，必须走 Actions。

改完后，Source 按钮应显示 **GitHub Actions**。下面会出现 Jekyll / Static HTML 的 **Configure**（配置）模板卡片，**不要点**，本仓库已有自己的工作流。

---

## 3. 看自动构建有没有跑起来

### 3.1 打开 Actions

1. 点仓库顶部导航的 **Actions**（操作）
2. 左侧 **Workflows** 里点 **Deploy to GitHub Pages**
3. 右侧列表里看最新一次运行

推送到 `main` 后，通常几秒内会出现一条新记录，状态可能是：

| 英文 | 含义 |
|------|------|
| Queued | 排队 |
| In progress | 正在跑 |
| Success / completed successfully | 成功 |
| Failure / failed | 失败 |

点那一行的标题（例如提交说明那句话）进入详情。

### 3.2 成功时你会看到什么

- 标题旁是绿色对勾：**completed successfully**
- **Status** 为 **Success**
- 流程图里 **deploy** 为绿色
- 下方会出现站点链接：https://canfldjak.github.io/personal-profile/

点这个链接打开主页。第一次发布后可能要等 30 秒到 1 分钟 CDN 生效。

### 3.3 失败时怎么重跑

常见失败：还没做第 2 节，报 `Get Pages site failed` 或 `Resource not accessible by integration`。先做完第 2 节再重跑。

1. 打开失败的那次运行
2. 右上角点 **Re-run jobs**（重新运行作业）
3. 点 **Re-run all jobs**（重新运行所有作业）
4. 弹窗里再点右下角绿色的 **Re-run jobs**（不要点 Cancel）
5. 状态会变成 **Queued**，等它跑完

---

## 4. 不推代码、只想再部署一次

工作流开了手动触发（`workflow_dispatch`）。

1. 点顶部 **Actions**
2. 左侧点 **Deploy to GitHub Pages**
3. 右侧列表上方点 **Run workflow**（运行工作流）
4. 分支保持 **main**
5. 点绿色 **Run workflow**
6. 刷新页面，列表顶部会出现新的一次运行

---

## 5. 打开线上站点核对

地址：https://canfldjak.github.io/personal-profile/

核对：

1. 标题是 **DeGui Sun — Photonics & Optoelectronics**
2. 左侧身份区有姓名、邮箱、电话、ORCID
3. 照片能显示（地址应是 `https://canfldjak.github.io/personal-profile/photos/degui-sun.jpg`，**不能**少掉 `/personal-profile/`）
4. OVERVIEW / EDUCATION / RESEARCH / POSITIONS / PUBLICATIONS 能跳转

照片裂开：多半是 `profile.js` 里写成了 `/photos/...`，没有用 `import.meta.env.BASE_URL`。

---

## 6. 以后改内容怎么发

改履历、照片、样式后：

```bash
git add .
git commit -m "更新说明"
git push origin main
```

然后：

1. 打开仓库 → **Actions**
2. 等最新一次 **Deploy to GitHub Pages** 变绿
3. 浏览器打开 https://canfldjak.github.io/personal-profile/ ，必要时强制刷新（Mac：`Command + Shift + R`）

不必再进 Settings，也不必再点 Source。

---

## 7. 工作流在做什么（对应按钮背后）

文件：`.github/workflows/deploy-pages.yml`

推到 `main` 或手动 **Run workflow** 后，GitHub 会：

1. 检出代码
2. 安装 Node
3. 在 `code/faculty-homepage` 执行 `npm ci` 和 `npm run build`
4. 构建时注入 `BASE_PATH=/personal-profile/`（本地 `npm run dev` 仍是 `/`）
5. 把 `code/faculty-homepage/dist` 上传并发布到 Pages

本地预览不要走 Pages：

```bash
cd code/faculty-homepage
npm install
npm run dev
```

---

## 8. 常见问题

**Actions 里没有 Deploy to GitHub Pages**  
工作流文件不在 `main` 上。确认 `.github/workflows/deploy-pages.yml` 已推送。

**报 Pages site Not Found / Resource not accessible**  
第 2 节没做。去 **Settings → Pages → Source**，选 **GitHub Actions**，再 **Re-run jobs**。

**站点 404**  
等本次 Actions 成功；确认打开的是带 `/personal-profile/` 的地址，不是 `https://canfldjak.github.io/`。

**照片 404，其它正常**  
照片必须是 `/personal-profile/photos/degui-sun.jpg`。`profile.js` 里应是：

```js
"photo": `${import.meta.env.BASE_URL}photos/degui-sun.jpg`,
```

**想改回分支发布**  
不要改。选 **Deploy from a branch** 只会把仓库源码当静态页，Vue 项目打不开。
