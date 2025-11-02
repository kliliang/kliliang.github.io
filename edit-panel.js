// 编辑面板 - 支持编辑交通、美食、景点等信息

let isEditing = false;
let editMode = ''; // 'traffic', 'accommodation', 'attractions', 'food'

// 显示编辑面板
function showEditPanel(mode) {
  editMode = mode;
  isEditing = true;
  
  const panel = document.getElementById('editPanel');
  const overlay = document.getElementById('editOverlay');
  
  if (!panel || !overlay) {
    createEditPanel();
    showEditPanel(mode);
    return;
  }
  
  // 加载当前数据到编辑表单
  loadEditData(mode);
  
  // 显示面板
  overlay.style.display = 'block';
  panel.style.display = 'block';
  
  // 阻止背景滚动
  document.body.style.overflow = 'hidden';
}

// 隐藏编辑面板
function hideEditPanel() {
  const panel = document.getElementById('editPanel');
  const overlay = document.getElementById('editOverlay');
  
  if (panel) panel.style.display = 'none';
  if (overlay) overlay.style.display = 'none';
  
  document.body.style.overflow = '';
  isEditing = false;
  editMode = '';
}

// 创建编辑面板HTML
function createEditPanel() {
  const overlay = document.createElement('div');
  overlay.id = 'editOverlay';
  overlay.className = 'edit-overlay';
  overlay.onclick = hideEditPanel;
  
  const panel = document.createElement('div');
  panel.id = 'editPanel';
  panel.className = 'edit-panel';
  panel.onclick = (e) => e.stopPropagation();
  
  panel.innerHTML = `
    <div class="edit-header">
      <h2>编辑信息</h2>
      <button class="btn-close" onclick="hideEditPanel()">×</button>
    </div>
    <div class="edit-content" id="editContent">
      <!-- 编辑表单将动态加载到这里 -->
    </div>
    <div class="edit-footer">
      <button class="btn btn-secondary" onclick="hideEditPanel()">取消</button>
      <button class="btn btn-primary" onclick="saveEditData()">保存</button>
    </div>
  `;
  
  document.body.appendChild(overlay);
  document.body.appendChild(panel);
}

// 加载编辑数据
function loadEditData(mode) {
  const content = document.getElementById('editContent');
  if (!content) return;
  
  const config = window.tripDataManager.getConfig();
  
  switch(mode) {
    case 'traffic':
      content.innerHTML = renderTrafficEdit(config.traffic);
      break;
    case 'accommodation':
      content.innerHTML = renderAccommodationEdit(config.accommodation);
      break;
    case 'attractions':
      content.innerHTML = renderAttractionsEdit(config.attractions);
      break;
    case 'food':
      content.innerHTML = renderFoodEdit(config.food);
      break;
  }
}

// 渲染交通编辑表单
function renderTrafficEdit(traffic) {
  return `
    <div class="edit-section">
      <h3>交通路线</h3>
      <div class="edit-group">
        <label>关西机场 → 大阪酒店</label>
        <textarea id="traffic_airport" rows="5" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">${JSON.stringify(traffic.kansai_airport_to_hotel || {}, null, 2)}</textarea>
      </div>
      <div class="edit-group">
        <label>大阪 → 长野</label>
        <textarea id="traffic_osaka_nagano" rows="5" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">${JSON.stringify(traffic.osaka_to_nagano || {}, null, 2)}</textarea>
      </div>
      <div class="edit-group">
        <label>长野 → 关西机场</label>
        <textarea id="traffic_nagano_airport" rows="5" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">${JSON.stringify(traffic.nagano_to_airport || {}, null, 2)}</textarea>
      </div>
      <p style="font-size: 0.85em; color: #666; margin-top: 10px;">💡 提示：JSON格式，可以直接编辑</p>
    </div>
  `;
}

// 渲染住宿编辑表单
function renderAccommodationEdit(accommodation) {
  let html = '<div class="edit-section"><h3>住宿信息</h3>';
  
  if (accommodation.osaka) {
    html += `
      <div class="edit-group">
        <label>大阪酒店名称</label>
        <input type="text" id="acc_osaka_name" value="${accommodation.osaka.name || ''}" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
      </div>
      <div class="edit-group">
        <label>大阪酒店日期</label>
        <input type="text" id="acc_osaka_dates" value="${accommodation.osaka.dates || ''}" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
      </div>
      <div class="edit-group">
        <label>大阪酒店位置</label>
        <input type="text" id="acc_osaka_location" value="${accommodation.osaka.location || ''}" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
      </div>
    `;
  }
  
  if (accommodation.nagano) {
    html += `
      <div class="edit-group">
        <label>长野酒店名称</label>
        <input type="text" id="acc_nagano_name" value="${accommodation.nagano.name || ''}" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
      </div>
      <div class="edit-group">
        <label>长野酒店日期</label>
        <input type="text" id="acc_nagano_dates" value="${accommodation.nagano.dates || ''}" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
      </div>
      <div class="edit-group">
        <label>长野酒店距离</label>
        <input type="text" id="acc_nagano_distance" value="${accommodation.nagano.distance || ''}" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
      </div>
    `;
  }
  
  html += '</div>';
  return html;
}

// 景点库（预设模板）
const ATTRACTION_TEMPLATES = [
  { name: "大阪环球影城", icon: "🎢", age_range: "全年龄段", highlights: "哈利波特主题区、小黄人乐园、适合亲子的游乐设施", duration: "全天（建议购买快速通行证）" },
  { name: "地狱谷野猿公苑", icon: "🐵", age_range: "3岁以上", highlights: "观赏野生日本猕猴在温泉中泡澡的独特景象", duration: "2-3小时" },
  { name: "上高地", icon: "🏔️", age_range: "5岁以上", highlights: "日本阿尔卑斯山美景，亲子徒步路线，自然教育", duration: "半天至一天" },
  { name: "大阪海游馆", icon: "🐋", age_range: "全年龄段", highlights: "亚洲最大的水族馆之一，近距离接触海洋生物", duration: "3-4小时" },
  { name: "大阪城公园", icon: "🏯", age_range: "全年龄段", highlights: "历史遗迹，适合散步和拍照", duration: "1-2小时" },
  { name: "心斋桥/道顿堀", icon: "🛍️", age_range: "全年龄段", highlights: "购物、美食、娱乐一条街", duration: "2-3小时" },
  { name: "善光寺", icon: "🌸", age_range: "全年龄段", highlights: "日本最古老的寺庙之一，体验传统文化", duration: "1小时" },
  { name: "白马滑雪场", icon: "🏂", age_range: "5岁以上", highlights: "优质雪场，适合亲子滑雪体验", duration: "半天至一天" }
];

// 渲染景点编辑表单
function renderAttractionsEdit(attractions) {
  let html = '<div class="edit-section"><h3>推荐景点</h3>';
  
  // 添加从下拉选择的功能
  html += `
    <div class="edit-group" style="margin-bottom: 20px; padding: 15px; background: #f8f9fa; border-radius: 5px;">
      <label><strong>快速添加景点（从模板选择）：</strong></label>
      <select id="attractionTemplate" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; margin-top: 5px;" onchange="addFromTemplate()">
        <option value="">-- 选择景点模板 --</option>
        ${ATTRACTION_TEMPLATES.map((tpl, idx) => 
          `<option value="${idx}">${tpl.icon} ${tpl.name}</option>`
        ).join('')}
      </select>
    </div>
  `;
  
  // 显示当前景点列表
  if (attractions && attractions.length > 0) {
    html += '<div style="margin-bottom: 15px;"><strong>当前景点列表：</strong></div>';
    attractions.forEach((attraction, index) => {
      html += `
        <div class="edit-group" style="border: 1px solid #ddd; padding: 15px; margin-bottom: 15px; border-radius: 5px; position: relative;">
          <button type="button" class="btn btn-danger btn-small" onclick="removeAttraction(${index})" style="position: absolute; top: 10px; right: 10px;">删除</button>
          <h4>景点 ${index + 1}</h4>
          <label>名称</label>
          <input type="text" id="attr_name_${index}" value="${escapeHtml(attraction.name || '')}" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; margin-bottom: 10px;">
          <label>图标/表情</label>
          <input type="text" id="attr_icon_${index}" value="${escapeHtml(attraction.icon || '')}" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; margin-bottom: 10px;">
          <label>适合年龄</label>
          <input type="text" id="attr_age_${index}" value="${escapeHtml(attraction.age_range || '')}" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; margin-bottom: 10px;">
          <label>亮点</label>
          <textarea id="attr_highlights_${index}" rows="2" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; margin-bottom: 10px;">${escapeHtml(attraction.highlights || '')}</textarea>
          <label>建议游玩时间</label>
          <input type="text" id="attr_duration_${index}" value="${escapeHtml(attraction.duration || '')}" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
        </div>
      `;
    });
  } else {
    html += '<p style="color: #666; margin-bottom: 15px;">暂无景点，请添加</p>';
  }
  
  html += '<button type="button" class="btn btn-secondary btn-small" onclick="addNewAttraction()" style="margin-top: 10px;">+ 添加空白景点</button>';
  html += '</div>';
  return html;
}

// 从模板添加景点
function addFromTemplate() {
  const select = document.getElementById('attractionTemplate');
  if (!select || !select.value) return;
  
  const templateIndex = parseInt(select.value);
  if (isNaN(templateIndex) || templateIndex < 0 || templateIndex >= ATTRACTION_TEMPLATES.length) return;
  
  const template = ATTRACTION_TEMPLATES[templateIndex];
  const config = window.tripDataManager.getConfig();
  
  // 检查是否已存在
  const exists = config.attractions.some(attr => attr.name === template.name);
  if (exists) {
    showNotification('该景点已存在！', 'error');
    select.value = '';
    return;
  }
  
  // 添加新景点
  config.attractions.push({...template});
  loadEditData('attractions');
  select.value = '';
  showNotification(`已添加景点：${template.name}`, 'success');
}

// 删除景点
function removeAttraction(index) {
  if (!confirm('确定要删除这个景点吗？')) return;
  
  const config = window.tripDataManager.getConfig();
  config.attractions.splice(index, 1);
  loadEditData('attractions');
  showNotification('景点已删除', 'success');
}

// HTML转义
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// 美食模板
const FOOD_TEMPLATES = [
  "大阪烧、章鱼烧（道顿堀）",
  "长野荞麦面",
  "和牛烤肉（适合孩子）",
  "寿司（新鲜海鲜）",
  "拉面（适合孩子口味）",
  "天妇罗（炸物）",
  "日式咖喱饭",
  "抹茶甜品"
];

// 渲染美食编辑表单
function renderFoodEdit(food) {
  let html = '<div class="edit-section"><h3>美食推荐</h3>';
  
  // 添加从下拉选择的功能
  html += `
    <div class="edit-group" style="margin-bottom: 20px; padding: 15px; background: #f8f9fa; border-radius: 5px;">
      <label><strong>快速添加美食（从模板选择）：</strong></label>
      <select id="foodTemplate" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; margin-top: 5px;" onchange="addFoodFromTemplate()">
        <option value="">-- 选择美食模板 --</option>
        ${FOOD_TEMPLATES.map(food => 
          `<option value="${escapeHtml(food)}">${food}</option>`
        ).join('')}
      </select>
    </div>
  `;
  
  // 显示当前美食列表
  if (food && food.length > 0) {
    html += '<div style="margin-bottom: 10px;"><strong>当前美食列表：</strong></div>';
    food.forEach((item, index) => {
      html += `
        <div class="edit-group" style="margin-bottom: 10px; display: flex; gap: 5px;">
          <input type="text" id="food_${index}" value="${escapeHtml(item)}" style="flex: 1; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
          <button type="button" class="btn btn-danger btn-small" onclick="removeFoodItem(${index})" style="padding: 8px 12px;">删除</button>
        </div>
      `;
    });
  } else {
    html += '<p style="color: #666; margin-bottom: 10px;">暂无美食，请添加</p>';
  }
  
  html += '<button type="button" class="btn btn-secondary btn-small" onclick="addNewFoodItem()" style="margin-top: 10px;">+ 添加自定义美食</button>';
  html += '</div>';
  return html;
}

// 从模板添加美食
function addFoodFromTemplate() {
  const select = document.getElementById('foodTemplate');
  if (!select || !select.value) return;
  
  const foodText = select.value;
  const config = window.tripDataManager.getConfig();
  
  if (!config.food) config.food = [];
  
  // 检查是否已存在
  if (config.food.includes(foodText)) {
    showNotification('该美食已存在！', 'error');
    select.value = '';
    return;
  }
  
  // 添加新美食
  config.food.push(foodText);
  loadEditData('food');
  select.value = '';
  showNotification(`已添加美食：${foodText}`, 'success');
}

// 保存编辑的数据
function saveEditData() {
  const config = window.tripDataManager.getConfig();
  
  try {
    switch(editMode) {
      case 'traffic':
        // 解析JSON
        const airport = document.getElementById('traffic_airport').value;
        const osaka_nagano = document.getElementById('traffic_osaka_nagano').value;
        const nagano_airport = document.getElementById('traffic_nagano_airport').value;
        
        config.traffic.kansai_airport_to_hotel = JSON.parse(airport);
        config.traffic.osaka_to_nagano = JSON.parse(osaka_nagano);
        config.traffic.nagano_to_airport = JSON.parse(nagano_airport);
        break;
        
      case 'accommodation':
        if (config.accommodation.osaka) {
          config.accommodation.osaka.name = document.getElementById('acc_osaka_name').value;
          config.accommodation.osaka.dates = document.getElementById('acc_osaka_dates').value;
          config.accommodation.osaka.location = document.getElementById('acc_osaka_location').value;
        }
        if (config.accommodation.nagano) {
          config.accommodation.nagano.name = document.getElementById('acc_nagano_name').value;
          config.accommodation.nagano.dates = document.getElementById('acc_nagano_dates').value;
          config.accommodation.nagano.distance = document.getElementById('acc_nagano_distance').value;
        }
        break;
        
      case 'attractions':
        const attractions = [];
        let index = 0;
        while (document.getElementById(`attr_name_${index}`)) {
          attractions.push({
            name: document.getElementById(`attr_name_${index}`).value,
            icon: document.getElementById(`attr_icon_${index}`).value,
            age_range: document.getElementById(`attr_age_${index}`).value,
            highlights: document.getElementById(`attr_highlights_${index}`).value,
            duration: document.getElementById(`attr_duration_${index}`).value
          });
          index++;
        }
        config.attractions = attractions;
        break;
        
      case 'food':
        const food = [];
        let foodIndex = 0;
        while (document.getElementById(`food_${foodIndex}`)) {
          const value = document.getElementById(`food_${foodIndex}`).value.trim();
          if (value) food.push(value);
          foodIndex++;
        }
        config.food = food;
        break;
    }
    
    window.tripDataManager.setConfig(config);
    hideEditPanel();
    showNotification('信息已更新！', 'success');
  } catch (error) {
    console.error('保存失败:', error);
    showNotification('保存失败：' + error.message, 'error');
  }
}

// 添加新景点（空白）
function addNewAttraction() {
  const config = window.tripDataManager.getConfig();
  if (!config.attractions) config.attractions = [];
  
  config.attractions.push({
    name: '',
    icon: '🎯',
    age_range: '',
    highlights: '',
    duration: ''
  });
  loadEditData('attractions');
  showNotification('已添加空白景点，请填写信息', 'info');
}

// 添加新美食（空白）
function addNewFoodItem() {
  const config = window.tripDataManager.getConfig();
  if (!config.food) config.food = [];
  
  config.food.push('');
  loadEditData('food');
  showNotification('已添加空白美食项，请填写', 'info');
}

// 删除美食项
function removeFoodItem(index) {
  const config = window.tripDataManager.getConfig();
  config.food.splice(index, 1);
  loadEditData('food');
}

// 暴露函数到全局
window.showEditPanel = showEditPanel;
window.hideEditPanel = hideEditPanel;
window.saveEditData = saveEditData;
window.addNewAttraction = addNewAttraction;
window.addNewFoodItem = addNewFoodItem;
window.removeFoodItem = removeFoodItem;
window.addFromTemplate = addFromTemplate;
window.addFoodFromTemplate = addFoodFromTemplate;
window.removeAttraction = removeAttraction;

