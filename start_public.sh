#!/bin/bash

# 外网访问启动脚本
# 使用 cloudflared 创建公网隧道

echo "========================================="
echo "正在启动公网访问服务..."
echo "========================================="
echo ""
echo "Flask 应用应运行在: http://localhost:5001"
echo ""
echo "正在创建 Cloudflare Tunnel..."
echo ""

# 检查 cloudflared 是否安装
if ! command -v cloudflared &> /dev/null; then
    echo "❌ cloudflared 未安装，正在安装..."
    brew install cloudflare/cloudflare/cloudflared
fi

# 启动 cloudflared 隧道
cloudflared tunnel --url http://localhost:5001

