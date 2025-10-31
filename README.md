# Flask Web 应用

一个基本的前后端分离的Web应用示例，使用Flask作为后端API，HTML/CSS/JavaScript作为前端。

## 项目结构

```
workspace/
├── app.py                 # Flask后端应用
├── requirements.txt       # Python依赖包
├── templates/            # HTML模板目录
│   └── index.html        # 主页面
└── static/              # 静态文件目录
    ├── css/
    │   └── style.css     # 样式文件
    └── js/
        └── main.js       # JavaScript脚本
```

## 功能特性

- ✅ 前后端分离架构
- ✅ RESTful API设计
- ✅ 数据增删查功能
- ✅ 响应式设计
- ✅ 现代化的UI界面

## 安装和运行

### 1. 安装依赖

```bash
pip install -r requirements.txt
```

### 2. 运行应用

```bash
python3 app.py
```

### 3. 访问应用

打开浏览器访问：http://localhost:5000

## API接口说明

### GET /api/data
获取所有数据

**响应示例：**
```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "message": "示例消息",
      "timestamp": "2024-01-01 12:00:00"
    }
  ]
}
```

### POST /api/data
添加新数据

**请求体：**
```json
{
  "message": "新消息内容",
  "timestamp": "2024-01-01 12:00:00"
}
```

**响应示例：**
```json
{
  "status": "success",
  "data": {
    "id": 1,
    "message": "新消息内容",
    "timestamp": "2024-01-01 12:00:00"
  }
}
```

### DELETE /api/data/<id>
删除指定ID的数据

**响应示例：**
```json
{
  "status": "success",
  "message": "删除成功"
}
```

## 技术栈

- **后端**: Flask (Python)
- **前端**: HTML5, CSS3, JavaScript (ES6+)
- **样式**: 响应式设计，渐变背景

## 注意事项

- 默认运行在 `0.0.0.0:5000`
- 开发模式已启用（debug=True）
- 数据存储在内存中，重启后数据会丢失

## 开发建议

1. 建议使用虚拟环境来隔离依赖
2. 生产环境请关闭debug模式
3. 建议添加数据库持久化存储
4. 可以添加用户认证和授权功能

