# 发布到 GitHub Pages 指南

本项目提供了两种部署方式：
1. **静态版本**（推荐）- 适配 GitHub Pages，使用 localStorage 存储数据
2. **完整版本** - 需要 Flask 后端，可部署到 Railway、Render 等平台

## 方法一：发布静态版本到 GitHub Pages（推荐）

### 步骤 1：准备仓库

1. 在 GitHub 创建新仓库（如果还没有）
2. 将代码推送到 GitHub：
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/你的用户名/你的仓库名.git
git push -u origin main
```

### 步骤 2：配置 GitHub Pages

1. 进入仓库的 **Settings** 页面
2. 在左侧菜单中找到 **Pages**
3. 在 **Source** 部分选择：
   - **Source**: `GitHub Actions`（推荐）
   - 或者选择 **Source**: `main branch`，**Folder**: `/docs`

### 步骤 3：如果使用 GitHub Actions（推荐）

1. 仓库已包含 `.github/workflows/deploy-pages.yml` 工作流
2. 推送代码到 main 分支后，GitHub Actions 会自动部署
3. 在仓库的 **Actions** 标签页查看部署进度
4. 部署完成后，网站地址为：`https://你的用户名.github.io/你的仓库名/`

### 步骤 4：如果使用手动部署

1. 在 **Settings** > **Pages** 中
2. 选择 **Source**: `main branch`，**Folder**: `/docs`
3. 点击 **Save**
4. 等待几分钟，网站就会发布

### 静态版本特性

✅ **优点：**
- 完全免费
- 自动部署
- 使用 localStorage，数据保存在浏览器本地
- 无需服务器

⚠️ **限制：**
- 数据仅保存在本地浏览器
- 不能跨设备同步
- 清除浏览器数据会丢失笔记

---

## 方法二：部署完整 Flask 版本到其他平台

如果需要在多设备间同步数据，建议部署完整的 Flask 版本。

### 推荐平台：

#### 1. **Railway** (https://railway.app) - 推荐

**步骤：**
1. 注册 Railway 账号（支持 GitHub 登录）
2. 创建新项目，连接 GitHub 仓库
3. Railway 会自动检测 Flask 应用
4. 添加环境变量（如需要）
5. 部署完成后会获得公网 URL

**优点：**
- 免费额度：每月 $5 额度
- 自动部署
- 支持自定义域名
- 简单易用

---

#### 2. **Render** (https://render.com)

**步骤：**
1. 注册 Render 账号
2. 创建新的 Web Service
3. 连接 GitHub 仓库
4. 配置：
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn -w 4 -b 0.0.0.0:$PORT app:app`
5. 部署

**优点：**
- 免费套餐可用（有休眠限制）
- 自动部署
- 支持自定义域名

---

#### 3. **Fly.io** (https://fly.io)

**优点：**
- 免费额度
- 全球 CDN
- 高性能

---

## 方法三：使用 GitHub Actions 部署到云平台

可以配置 GitHub Actions 自动部署到 Railway、Render 等平台。

### 部署到 Railway 的示例

创建 `.github/workflows/deploy-railway.yml`:

```yaml
name: Deploy to Railway

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: bervProject/railway-deploy@main
        with:
          railway_token: ${{ secrets.RAILWAY_TOKEN }}
```

---

## 本地测试静态版本

在部署前，可以本地测试静态版本：

```bash
# 使用 Python 内置服务器
cd docs
python3 -m http.server 8000

# 或使用其他静态服务器
npx serve docs
```

然后访问 http://localhost:8000

---

## 文件说明

- `docs/index.html` - 静态版本主页面
- `docs/static-site.js` - 静态版本 JavaScript（使用 localStorage）
- `app.py` - Flask 完整版本
- `templates/index.html` - Flask 版本模板
- `static/js/main.js` - Flask 版本 JavaScript（使用 API）

---

## 常见问题

### Q: 为什么静态版本的数据不能同步？
A: 静态版本使用浏览器 localStorage，数据保存在本地。如需多设备同步，请部署完整 Flask 版本。

### Q: 如何迁移数据？
A: 目前需要手动迁移。可以在浏览器开发者工具的 Console 中执行：
```javascript
// 导出数据
localStorage.getItem('osaka_trip_notes')

// 导入数据（在另一个浏览器）
localStorage.setItem('osaka_trip_notes', '你的JSON数据')
```

### Q: GitHub Pages 部署失败？
A: 检查：
1. `docs` 文件夹是否存在且包含 `index.html`
2. GitHub Actions 是否有权限
3. 查看 Actions 标签页的错误日志

---

## 推荐方案

**个人项目/演示：** 使用 GitHub Pages 静态版本  
**需要数据同步：** 部署到 Railway 或 Render

祝你部署顺利！🎉

