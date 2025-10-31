#!/bin/bash

echo "========================================="
echo "🚀 启动公网访问服务"
echo "========================================="
echo ""
echo "📡 正在创建 Cloudflare Tunnel..."
echo ""

cloudflared tunnel --url http://localhost:5001

