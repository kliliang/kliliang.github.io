# 🚀 快速部署到 GitHub Pages

## 最简单的方法（3步完成）

### 1️⃣ 推送代码到 GitHub

```bash
# 如果没有初始化 Git
git init
git add .
git commit -m "Initial commit"

# 连接到 GitHub（替换为你的仓库地址）
git remote add origin https://github.com/你的用户名/Osaka_Family_Trip.git
git branch -M main
git push -u origin main
```

### 2️⃣ 配置 GitHub Pages

1. 进入你的 GitHub 仓库
2. 点击 **Settings** → **Pages**
3. 在 **Source** 中选择：
   - **Deploy from a branch** → **main** → **/docs** → **Save**

### 3️⃣ 等待部署完成

- 等待 1-2 分钟
- 在 **Settings** > **Pages** 页面会显示你的网站地址
- 格式：`https://你的用户名.github.io/Osaka_Family_Trip/`

---

## 📁 项目结构说明

```
Osaka_Family_Trip/
├── docs/                 # GitHub Pages 静态文件（部署这个）
│   ├── index.html       # 主页面
│   └── static-site.js   # 使用 localStorage 的 JS
├── app.py               # Flask 完整版本（可部署到 Railway 等）
├── templates/           # Flask 模板
├── static/             # 静态资源（CSS、JS）
│   ├── css/
│   └── js/
├── .github/
│   └── workflows/
│       └── deploy-pages.yml  # 自动部署工作流
└── GITHUB_PAGES_DEPLOY.md   # 详细部署指南
```

---

## ✅ 验证部署

部署成功后，访问你的网站：
- 应该能看到完整的页面
- 可以添加行程笔记（保存在浏览器本地）
- 笔记会在本地保存，刷新页面不会丢失

---

## 💡 提示

- **静态版本**：数据保存在浏览器 localStorage，仅本地可用
- **完整版本**：需要 Flask 后端，可部署到 Railway/Render 实现数据同步

---

## 🆘 遇到问题？

查看详细指南：`GITHUB_PAGES_DEPLOY.md`

