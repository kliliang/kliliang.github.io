// 静态站点版本 - 使用 localStorage 存储数据
// 适配 GitHub Pages

// 存储键名
const STORAGE_KEY = 'osaka_trip_notes';

// DOM元素
const dataForm = document.getElementById('dataForm');
const messageInput = document.getElementById('messageInput');
const dataList = document.getElementById('dataList');
const refreshBtn = document.getElementById('refreshBtn');
const clearBtn = document.getElementById('clearBtn');

// 页面加载时获取数据
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    
    // 刷新按钮事件
    refreshBtn.addEventListener('click', () => {
        loadData();
        showNotification('列表已刷新！', 'success');
    });
    
    // 清空按钮事件
    clearBtn.addEventListener('click', () => {
        if (confirm('确定要清空所有行程笔记吗？此操作不可恢复！')) {
            clearAllData();
        }
    });
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
        const newItem = {
            id: Date.now(), // 使用时间戳作为ID
            message: message,
            timestamp: new Date().toLocaleString('zh-CN')
        };
        
        // 获取现有数据
        const existingData = getDataFromStorage();
        existingData.push(newItem);
        
        // 保存到 localStorage
        saveDataToStorage(existingData);
        
        messageInput.value = '';
        loadData();
        showNotification('行程笔记添加成功！', 'success');
    } catch (error) {
        console.error('Error:', error);
        showNotification('添加失败，请稍后重试', 'error');
    }
});

// 从 localStorage 加载数据
function loadData() {
    dataList.innerHTML = '<p class="loading">加载中...</p>';
    
    try {
        const data = getDataFromStorage();
        displayData(data);
    } catch (error) {
        console.error('Error:', error);
        dataList.innerHTML = '<p class="error">加载失败</p>';
    }
}

// 从 localStorage 获取数据
function getDataFromStorage() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error('读取数据失败:', error);
        return [];
    }
}

// 保存数据到 localStorage
function saveDataToStorage(data) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
        console.error('保存数据失败:', error);
        showNotification('保存失败，可能是存储空间不足', 'error');
    }
}

// 显示数据
function displayData(data) {
    if (!data || data.length === 0) {
        dataList.innerHTML = '<p class="empty">暂无笔记，开始添加你的行程笔记吧！</p>';
        return;
    }

    // 按ID倒序排列（最新的在前）
    const sortedData = [...data].sort((a, b) => b.id - a.id);

    const html = sortedData.map(item => `
        <div class="data-item" data-id="${item.id}">
            <div class="item-content">
                <div class="item-message">${escapeHtml(item.message)}</div>
                <div class="item-timestamp">${item.timestamp || '未知时间'}</div>
            </div>
            <button class="btn btn-danger btn-small" onclick="deleteItem(${item.id})">删除</button>
        </div>
    `).join('');

    dataList.innerHTML = html;
}

// 删除数据
function deleteItem(id) {
    if (!confirm('确定要删除这条行程笔记吗？')) {
        return;
    }

    try {
        const data = getDataFromStorage();
        const filteredData = data.filter(item => item.id !== id);
        saveDataToStorage(filteredData);
        loadData();
        showNotification('删除成功！', 'success');
    } catch (error) {
        console.error('Error:', error);
        showNotification('删除失败，请稍后重试', 'error');
    }
}

// 清空所有数据
function clearAllData() {
    try {
        localStorage.removeItem(STORAGE_KEY);
        loadData();
        showNotification('所有笔记已清空！', 'success');
    } catch (error) {
        console.error('Error:', error);
        showNotification('清空失败，请稍后重试', 'error');
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
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// HTML转义，防止XSS攻击
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

