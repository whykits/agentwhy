# Agent WHY · [agentwhy.cn](https://agentwhy.cn)

简约大方的个人主页。**纯 HTML / CSS / JS，零构建、零依赖**，可直接托管在 GitHub Pages。

- 自动适配深色 / 浅色模式（右上角可手动切换，记忆偏好）
- 响应式布局，桌面 / 平板 / 手机均可用
- 滚动入场动画、一键复制邮箱、自定义 404 页
- SEO / 分享卡片（Open Graph）、sitemap、robots 已配好

## 目录结构

```
├── index.html            # 主页面（文案都在这里改）
├── 404.html              # 404 页面
├── CNAME                 # 自定义域名：agentwhy.cn（GitHub Pages 用）
├── .nojekyll             # 跳过 Jekyll 构建
├── robots.txt / sitemap.xml
└── assets/
    ├── css/style.css     # 样式（主题色变量在文件顶部）
    ├── js/main.js        # 交互脚本
    └── img/              # favicon、og 分享图等
```

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

## 修改成自己的内容

- **文案 / 链接**：都在 `index.html`，搜索 `yourname` 替换成你的 GitHub 用户名（共 5 处，都有 TODO 注释标记）。
- **邮箱**：搜索 `hello@agentwhy.cn`（2 处）。
- **主题色**：`assets/css/style.css` 顶部的 `--accent` / `--accent-2` 两个变量。
- **图标 / 分享图**：替换 `assets/img/favicon.svg` 和 `og.png`（1200 × 630）。

## License

MIT
