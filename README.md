# AgentWHY · [agentwhy.cn](https://agentwhy.cn)

**AgentWHY** — 探索高效应用 AI 的实验项目。本站是它的项目主页：
分享用法拆解、工作流实录与踩坑体会。

**纯 HTML / CSS / JS，零构建、零依赖**，可直接托管在 GitHub Pages。

## 目录结构（为「挂在 GitHub 上直接改」设计）

```
├── index.html            # 页面骨架与固定文案（要改的地方都标了 ✏️ 注释）
├── content.js            # ★ 日常最常改：GitHub 链接、邮箱、分享卡片列表
├── 404.html              # 404 页面
├── CNAME                 # 自定义域名 agentwhy.cn（勿删）
├── .nojekyll             # 跳过 Jekyll 构建
├── robots.txt / sitemap.xml
├── README.md
└── assets/               # 样式 / 脚本 / 图片（一般不用动）
```

## 日常怎么改（GitHub 网页端直接编辑，保存后自动发布）

| 想改什么 | 改哪里 |
|---------|--------|
| **加一条分享** | `content.js`：在 `share` 列表复制一段 `{ … }`，填 `title / desc / tags / link` |
| 换 GitHub 仓库地址 | `content.js` 顶部 `github` 一行（页面上所有 GitHub 按钮自动跟着变） |
| 换邮箱 | `content.js` 顶部 `email` 一行 |
| 改标语、项目简介 | `index.html` 搜索 `✏️` |
| 换主题色 | `assets/css/style.css` 顶部 `--accent` / `--accent-2` |
| 换图标 / 分享图 | `assets/img/favicon.svg` 和 `og.png`（1200 × 630） |

加卡片示例（往 `share` 数组里追加即可）：

```js
{
  title: "一篇新分享的标题",
  desc: "一句话介绍这篇内容讲了什么。",
  tags: ["标签1", "标签2"],
  link: "https://github.com/whykits/AgentWHY",  // 换成文章地址
},
```

- 自动适配深色 / 浅色模式（右上角可手动切换，记忆偏好）
- 响应式布局，桌面 / 平板 / 手机均可用
- 滚动入场动画、一键复制邮箱、自定义 404 页
- SEO / 分享卡片（Open Graph）、sitemap、robots 已配好

## 本地预览

```bash
cd AgentWHY
python3 -m http.server 8000
# 打开 http://localhost:8000
```

## 部署到 GitHub Pages 并绑定 agentwhy.cn

1. **建仓库**：在 GitHub 新建一个公开仓库（名字随意，比如 `agentwhy`；用 `<用户名>.github.io` 也行）。

2. **推送代码**：

   ```bash
   git init
   git add .
   git commit -m "init: agentwhy.cn homepage"
   git remote add origin git@github.com:<你的用户名>/<仓库名>.git
   git push -u origin main
   ```

3. **开启 Pages**：仓库 `Settings → Pages`，Source 选 `main` 分支 / `root`，保存。
   仓库里已有 `CNAME` 文件（内容为 `agentwhy.cn`），Pages 会自动读取。

4. **配置域名解析**（在你的域名服务商，如阿里云 / 腾讯云 DNS）：

   | 记录类型 | 主机记录 | 记录值 |
   |---------|---------|--------|
   | A | `@` | `185.199.108.153` |
   | A | `@` | `185.199.109.153` |
   | A | `@` | `185.199.110.153` |
   | A | `@` | `185.199.111.153` |
   | CNAME | `www` | `<你的用户名>.github.io` |

5. **开启 HTTPS**：DNS 生效后（几分钟到几小时），回到 `Settings → Pages`，
   勾选 **Enforce HTTPS**。GitHub 会自动为 agentwhy.cn 签发免费证书。

## License

MIT
