// API基础URL
const API_BASE = '/api/data';

// DOM元素
const dataForm = document.getElementById('dataForm');
const messageInput = document.getElementById('messageInput');
const dataList = document.getElementById('dataList');
const refreshBtn = document.getElementById('refreshBtn');

// 页面加载时获取数据
document.addEventListener('DOMContentLoaded', () => {
    loadData();
});

// 表单提交事件
dataForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = messageInput.value.trim();
    
    if (!message) {
        alert('请输入行程笔记或提醒内容');
        return;
    }

    try {
        const response = await fetch(API_BASE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: message,
                timestamp: new Date().toLocaleString('zh-CN')
            })
        });

        const result = await response.json();
        
        if (result.status === 'success') {
            messageInput.value = '';
            loadData();
            showNotification('行程笔记添加成功！', 'success');
        } else {
            showNotification('添加失败：' + result.message, 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('网络错误，请稍后重试', 'error');
    }
});

// 刷新按钮事件
refreshBtn.addEventListener('click', () => {
    loadData();
});

// 加载数据
async function loadData() {
    dataList.innerHTML = '<p class="loading">加载中...</p>';
    
    try {
        const response = await fetch(API_BASE);
        const result = await response.json();
        
        if (result.status === 'success') {
            displayData(result.data);
        } else {
            dataList.innerHTML = '<p class="error">加载失败：' + result.message + '</p>';
        }
    } catch (error) {
        console.error('Error:', error);
        dataList.innerHTML = '<p class="error">网络错误，无法加载数据</p>';
    }
}

// 显示数据
function displayData(data) {
    if (!data || data.length === 0) {
        dataList.innerHTML = '<p class="empty">暂无数据</p>';
        return;
    }

    const html = data.map(item => `
        <div class="data-item" data-id="${item.id}">
            <div class="item-content">
                <div class="item-id">ID: ${item.id}</div>
                <div class="item-message">${escapeHtml(item.message)}</div>
                <div class="item-timestamp">${item.timestamp || '未知时间'}</div>
            </div>
            <button class="btn btn-danger btn-small" onclick="deleteItem(${item.id})">删除</button>
        </div>
    `).join('');

    dataList.innerHTML = html;
}

// 删除数据
async function deleteItem(id) {
    if (!confirm('确定要删除这条行程笔记吗？')) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/${id}`, {
            method: 'DELETE'
        });

        const result = await response.json();
        
        if (result.status === 'success') {
            loadData();
            showNotification('删除成功！', 'success');
        } else {
            showNotification('删除失败：' + result.message, 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('网络错误，请稍后重试', 'error');
    }
}

// 显示通知
function showNotification(message, type = 'info') {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // 添加到页面
    document.body.appendChild(notification);
    
    // 显示动画
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // 3秒后移除
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// HTML转义，防止XSS攻击
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

