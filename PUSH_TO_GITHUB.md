# 📤 推送到 GitHub 指南

代码已经提交到本地仓库，现在需要推送到 GitHub。

## ✅ 当前状态

- ✅ 代码已提交到本地（commit: 5bfa1fa）
- ✅ 远程仓库已配置为：`git@github.com:kliliang/kliliang.github.io.git`
- ⚠️ 需要 GitHub 身份验证才能推送

## 🔐 身份验证方式（选择一种）

### 方式 1：使用 GitHub CLI（推荐，最简单）

```bash
# 安装 GitHub CLI（如果还没安装）
brew install gh

# 登录 GitHub
gh auth login

# 然后推送代码
git push origin master:main
```

### 方式 2：使用 Personal Access Token

1. **生成 Token**：
   - 访问：https://github.com/settings/tokens
   - 点击 "Generate new token" → "Generate new token (classic)"
   - 勾选 `repo` 权限
   - 生成并复制 token

2. **使用 Token 推送**：
```bash
# 使用 HTTPS 方式
git remote set-url origin https://github.com/kliliang/kliliang.github.io.git

# 推送时会提示输入用户名和密码
# 用户名：你的 GitHub 用户名
# 密码：粘贴刚才生成的 token
git push origin master:main
```

### 方式 3：配置 SSH 密钥

```bash
# 检查是否已有 SSH 密钥
ls -al ~/.ssh

# 如果没有，生成新的 SSH 密钥
ssh-keygen -t ed25519 -C "your_email@example.com"

# 启动 ssh-agent
eval "$(ssh-agent -s)"

# 添加 SSH 密钥
ssh-add ~/.ssh/id_ed25519

# 复制公钥到剪贴板
cat ~/.ssh/id_ed25519.pub | pbcopy

# 将公钥添加到 GitHub：
# 1. 访问：https://github.com/settings/ssh/new
# 2. 粘贴公钥，保存

# 然后推送
git push origin master:main
```

### 方式 4：使用 GitHub Desktop

1. 打开 GitHub Desktop
2. 添加本地仓库
3. 点击 "Publish repository"

---

## 🚀 快速推送命令

配置好身份验证后，执行：

```bash
cd /Users/liliang/Downloads/Osaka_Family_Trip
git push origin master:main
```

---

## 📋 推送后的步骤

推送成功后：

1. **配置 GitHub Pages**：
   - 访问：https://github.com/kliliang/kliliang.github.io
   - Settings → Pages
   - Source：`Deploy from a branch`
   - Branch：`main`
   - Folder：`/ (root)`
   - 保存

2. **等待部署**：
   - 等待 1-2 分钟
   - 访问：https://kliliang.github.io

---

## 💡 提示

如果你已经在 GitHub 配置了 SSH 密钥或使用过 GitHub CLI，可能只需要直接推送即可。

选择一个最适合你的身份验证方式！

