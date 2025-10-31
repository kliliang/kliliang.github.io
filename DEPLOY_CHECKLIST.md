# 📋 GitHub Pages 部署检查清单

## ✅ 部署前检查

### 必需文件

- [x] `docs/index.html` - 静态版本主页
- [x] `docs/static-site.js` - 静态版本 JS（使用 localStorage）
- [x] `static/css/style.css` - 样式文件
- [x] `.github/workflows/deploy-pages.yml` - GitHub Actions 工作流
- [x] `.nojekyll` - 禁用 Jekyll（用于 GitHub Pages）

### 文件路径检查

确保 `docs/index.html` 中的路径正确：
```html
<link rel="stylesheet" href="../static/css/style.css">
```

### Git 准备

```bash
# 检查文件是否已添加
git status

# 应该看到 docs/、.github/、static/ 等文件夹
```

---

## 🚀 部署步骤

### 方法 A：使用 GitHub Actions（推荐）

1. **推送代码**
```bash
git add .
git commit -m "准备部署到 GitHub Pages"
git push origin main
```

2. **启用 GitHub Pages**
   - Settings → Pages
   - Source: GitHub Actions
   - 保存

3. **查看部署**
   - Actions 标签页查看进度
   - 完成后在 Settings → Pages 查看地址

---

### 方法 B：手动部署

1. **推送代码**
```bash
git add .
git commit -m "准备部署到 GitHub Pages"
git push origin main
```

2. **配置 Pages**
   - Settings → Pages
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/docs`
   - 保存

3. **等待**
   - 等待 1-2 分钟
   - 刷新 Pages 设置页面查看地址

---

## 🧪 本地测试（部署前）

在部署前，可以本地测试静态版本：

```bash
cd docs
python3 -m http.server 8000
```

访问 http://localhost:8000 测试功能

---

## ✅ 部署后验证

- [ ] 网站可以正常访问
- [ ] 页面样式正常显示
- [ ] 可以添加行程笔记
- [ ] 笔记可以保存和删除
- [ ] 刷新页面后笔记还在（localStorage 工作正常）

---

## 🐛 常见问题排查

### 问题：页面样式丢失

**解决：** 检查 CSS 路径是否正确
- 确保 `static/css/style.css` 存在
- 确保 `docs/index.html` 中的路径是 `../static/css/style.css`

### 问题：GitHub Actions 部署失败

**检查：**
1. Settings → Pages → 是否启用了 Pages
2. Actions 标签页查看错误日志
3. 确保 `.github/workflows/deploy-pages.yml` 文件存在

### 问题：JavaScript 不工作

**检查：**
1. 浏览器控制台是否有错误
2. 确保 `docs/static-site.js` 文件存在
3. 检查 HTML 中是否引用了该文件

---

## 📝 部署命令速查

```bash
# 1. 初始化 Git（如果还没有）
git init
git add .
git commit -m "Initial commit"

# 2. 添加远程仓库（替换为你的仓库地址）
git remote add origin https://github.com/你的用户名/Osaka_Family_Trip.git

# 3. 推送代码
git branch -M main
git push -u origin main

# 后续更新
git add .
git commit -m "更新内容"
git push
```

---

## 🎉 完成！

部署成功后，你的网站地址将是：
`https://你的用户名.github.io/Osaka_Family_Trip/`

可以在社交媒体、博客等地方分享这个链接！

