# 外网发布指南

## 方法一：使用 ngrok（推荐，最简单快速）

### 安装 ngrok

#### macOS 安装：
```bash
# 使用 Homebrew 安装
brew install ngrok/ngrok/ngrok

# 或者下载二进制文件
# 访问 https://ngrok.com/download 下载并解压到 PATH
```

#### 注册账号（免费）
1. 访问 https://dashboard.ngrok.com/signup 注册免费账号
2. 获取 authtoken
3. 配置 authtoken：
```bash
ngrok config add-authtoken YOUR_AUTHTOKEN
```

### 使用步骤

1. 确保 Flask 应用正在运行（当前端口 5001）
2. 在另一个终端窗口运行：
```bash
ngrok http 5001
```

3. ngrok 会提供一个公网 URL，例如：
   ```
   Forwarding: https://xxxx-xxx-xxx.ngrok-free.app -> http://localhost:5001
   ```

4. 复制这个 URL，即可在任意设备上访问你的应用

**优点：**
- ✅ 免费（有使用限制）
- ✅ 零配置，几分钟即可完成
- ✅ 自动提供 HTTPS

**缺点：**
- ⚠️ 免费版每次重启 URL 会变化
- ⚠️ 有流量限制

---

## 方法二：使用 Cloudflare Tunnel（永久免费）

### 安装 cloudflared

```bash
# macOS
brew install cloudflare/cloudflare/cloudflared

# 或下载二进制
# https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/
```

### 使用步骤

1. 登录 Cloudflare（免费账号即可）
2. 运行：
```bash
cloudflared tunnel --url http://localhost:5001
```

3. 会得到一个 `*.trycloudflare.com` 的临时域名

**优点：**
- ✅ 完全免费
- ✅ 无需注册即可使用
- ✅ 自动 HTTPS

---

## 方法三：使用 localtunnel（无需注册）

### 安装

```bash
npm install -g localtunnel
```

### 使用步骤

```bash
lt --port 5001
```

会生成一个类似 `https://xxx.loca.lt` 的公网地址

**优点：**
- ✅ 完全免费，无需注册
- ✅ 安装简单

---

## 方法四：部署到云服务器（适合长期使用）

### 推荐平台：

1. **Heroku** (https://www.heroku.com)
   - 免费套餐已停止，需要付费

2. **Railway** (https://railway.app)
   - 有免费额度
   - 支持 GitHub 直接部署

3. **Render** (https://render.com)
   - 免费套餐可用
   - 自动部署

4. **Fly.io** (https://fly.io)
   - 有免费额度
   - 全球 CDN

5. **国内云服务器**
   - 阿里云 ECS
   - 腾讯云 CVM
   - 华为云 ECS

### 云服务器部署步骤（示例）

1. 准备生产环境配置（修改 app.py）：
```python
if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0', port=5001)
```

2. 使用 gunicorn 部署：
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5001 app:app
```

3. 配置 Nginx 反向代理
4. 配置 SSL 证书（Let's Encrypt 免费）
5. 配置防火墙开放端口

---

## 方法五：使用 frp（内网穿透，自建服务器）

适合有自己服务器的用户，可以搭建自己的内网穿透服务。

---

## 快速开始（推荐 ngrok）

如果只是临时测试，推荐使用 **ngrok** 或 **cloudflared**：

```bash
# 方法1：ngrok（需要注册）
ngrok http 5001

# 方法2：cloudflared（无需注册）
cloudflared tunnel --url http://localhost:5001

# 方法3：localtunnel（需要 Node.js）
lt --port 5001
```

选择最适合你的方式开始吧！

