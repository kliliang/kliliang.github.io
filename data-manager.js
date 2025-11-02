// 数据管理器 - 支持多端修改交通路线、美食、景点等信息

const CONFIG_STORAGE_KEY = 'trip_config_data';
// 自动检测路径（docs目录或根目录）
const DEFAULT_CONFIG_PATH = window.location.pathname.includes('/docs/') 
    ? '../data/config.json' 
    : 'data/config.json';

// 默认配置数据（从config.json加载或使用内置默认值）
let tripConfig = {
  traffic: {},
  accommodation: {},
  attractions: [],
  food: []
};

// 初始化：从localStorage或JSON文件加载配置
async function loadConfig() {
  try {
    // 首先尝试从localStorage加载（用户已修改过的）
    const stored = localStorage.getItem(CONFIG_STORAGE_KEY);
    if (stored) {
      tripConfig = JSON.parse(stored);
      console.log('从localStorage加载配置');
      return;
    }
    
    // 如果localStorage没有，从JSON文件加载
    try {
      const response = await fetch(DEFAULT_CONFIG_PATH);
      if (response.ok) {
        tripConfig = await response.json();
        console.log('从JSON文件加载配置');
      } else {
        console.warn('无法加载JSON文件，使用默认配置');
        initDefaultConfig();
      }
    } catch (error) {
      console.warn('加载JSON文件失败，使用默认配置:', error);
      initDefaultConfig();
    }
  } catch (error) {
    console.error('加载配置失败:', error);
    initDefaultConfig();
  }
  
  // 渲染页面
  renderPage();
}

// 初始化默认配置
function initDefaultConfig() {
  tripConfig = {
    traffic: {
      kansai_airport_to_hotel: {
        date: "12.17",
        route: "关西机场 → 大阪酒店",
        steps: [
          {
            transport: "南海特急",
            from: "关西机场",
            to: "新今宫",
            duration: "34分钟",
            schedule: "6:53～23:00（半小时一趟）",
            ticket: "IC卡 + 特急券"
          },
          {
            transport: "大阪环状线",
            from: "新今宫",
            to: "大阪城公园",
            duration: "18分钟",
            schedule: "04:57～00:02（5min～10min一趟）",
            ticket: "IC卡"
          },
          {
            transport: "步行",
            from: "大阪城公园",
            to: "大阪新大谷酒店",
            duration: "4分钟",
            distance: "350米"
          }
        ]
      },
      osaka_to_nagano: {
        date: "12.20",
        route: "大阪 → 长野",
        total_time: "5小时5分钟左右",
        options: [
          {
            name: "方式1",
            steps: [
              { transport: "叫车", from: "大阪新大谷酒店", to: "新大阪", ticket: "现金" },
              { transport: "東海道・山陽 新干线", from: "新大阪", to: "名古屋", duration: "50分钟", schedule: "6:00～10:30", ticket: "新干线票" },
              { transport: "JR特急", from: "名古屋", to: "长野", duration: "2小时57分钟", schedule: "7:05～22:05", ticket: "IC卡 + 特急券" }
            ]
          }
        ],
        hotel_transfer: {
          from: "长野站",
          to: "Dormy inn长野善光之汤温泉酒店",
          duration: "4分钟",
          distance: "240米",
          transport: "步行"
        }
      },
      nagano_to_airport: {
        date: "12.23",
        route: "长野 → 关西机场",
        total_time: "4小时30min",
        steps: [
          { transport: "北陆新干线", from: "长野", to: "敦贺", duration: "1小时48分钟", schedule: "6:11～23:50", ticket: "新干线票" },
          { transport: "雷鸟 16特急", from: "敦贺", to: "大阪", duration: "1小时22分钟", schedule: "7:05～22:05", ticket: "IC卡 + 特急券" },
          { transport: "关西机场交通车", from: "大阪梅田", to: "关西机场", duration: "50分钟", schedule: "4:55～21:35", ticket: "IC卡" }
        ]
      }
    },
    accommodation: {
      osaka: {
        name: "大阪新大谷酒店",
        dates: "12.17-12.20",
        location: "大阪城公园附近",
        distance: "步行4分钟，350米"
      },
      nagano: {
        name: "Dormy inn长野善光之汤温泉酒店",
        dates: "12.20-12.23",
        location: "长野站附近",
        distance: "步行4分钟，240米"
      }
    },
    attractions: [
      {
        name: "大阪环球影城",
        icon: "🎢",
        age_range: "全年龄段",
        highlights: "哈利波特主题区、小黄人乐园、适合亲子的游乐设施",
        duration: "全天（建议购买快速通行证）"
      },
      {
        name: "地狱谷野猿公苑",
        icon: "🐵",
        age_range: "3岁以上",
        highlights: "观赏野生日本猕猴在温泉中泡澡的独特景象",
        duration: "2-3小时"
      },
      {
        name: "上高地",
        icon: "🏔️",
        age_range: "5岁以上",
        highlights: "日本阿尔卑斯山美景，亲子徒步路线，自然教育",
        duration: "半天至一天"
      },
      {
        name: "大阪海游馆",
        icon: "🐋",
        age_range: "全年龄段",
        highlights: "亚洲最大的水族馆之一，近距离接触海洋生物",
        duration: "3-4小时"
      }
    ],
    food: [
      "大阪烧、章鱼烧（道顿堀）",
      "长野荞麦面",
      "和牛烤肉（适合孩子）"
    ]
  };
}

// 保存配置到localStorage
function saveConfig() {
  try {
    localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(tripConfig, null, 2));
    showNotification('配置已保存！', 'success');
  } catch (error) {
    console.error('保存配置失败:', error);
    showNotification('保存失败，可能是存储空间不足', 'error');
  }
}

// 渲染交通信息
function renderTraffic() {
  const container = document.getElementById('trafficInfo');
  if (!container) return;
  
  const traffic = tripConfig.traffic || {};
  let html = '';
  
  // 关西机场 → 大阪酒店
  if (traffic.kansai_airport_to_hotel) {
    const route = traffic.kansai_airport_to_hotel;
    html += `<p><strong>${route.date} ${route.route}：</strong></p><ul style="font-size: 0.9em; margin: 5px 0;">`;
    if (route.steps && Array.isArray(route.steps)) {
      route.steps.forEach(step => {
        if (step.transport === '步行') {
          html += `<li>${step.transport}：${step.from} → ${step.to}（${step.duration || ''}，${step.distance || ''}）</li>`;
        } else {
          html += `<li>${step.transport}：${step.from} → ${step.to}（${step.duration || ''}，${step.schedule || ''}）</li>`;
        }
      });
    }
    html += '</ul>';
  }
  
  // 大阪 → 长野
  if (traffic.osaka_to_nagano) {
    const route = traffic.osaka_to_nagano;
    html += `<p style="margin-top: 10px;"><strong>${route.date} ${route.route}：</strong></p><ul style="font-size: 0.9em; margin: 5px 0;">`;
    if (route.options && Array.isArray(route.options) && route.options.length > 0) {
      route.options.forEach(option => {
        html += `<li><strong>${option.name || ''}：</strong>`;
        if (option.steps && Array.isArray(option.steps)) {
          option.steps.forEach((step, idx) => {
            if (idx > 0) html += ' → ';
            html += `${step.from || ''} → ${step.to || ''}（${step.duration || ''}）`;
          });
        }
        html += '</li>';
      });
    }
    if (route.hotel_transfer) {
      html += `<li>${route.hotel_transfer.from || ''} → ${route.hotel_transfer.to || ''}（${route.hotel_transfer.transport || ''} ${route.hotel_transfer.duration || ''}，${route.hotel_transfer.distance || ''}）</li>`;
    }
    html += '</ul>';
  }
  
  // 长野 → 关西机场
  if (traffic.nagano_to_airport) {
    const route = traffic.nagano_to_airport;
    html += `<p style="margin-top: 10px;"><strong>${route.date} ${route.route}：</strong></p><ul style="font-size: 0.9em; margin: 5px 0;">`;
    if (route.steps && Array.isArray(route.steps)) {
      route.steps.forEach(step => {
        html += `<li>${step.transport || ''}：${step.from || ''} → ${step.to || ''}（${step.duration || ''}，${step.schedule || ''}）</li>`;
      });
    }
    html += '</ul>';
  }
  
  html += '<p style="margin-top: 10px; font-size: 0.85em; opacity: 0.9;">💡 购票：IC卡/现金，新干线需单独购票</p>';
  container.innerHTML = html;
}

// 渲染住宿信息
function renderAccommodation() {
  const container = document.getElementById('accommodationInfo');
  if (!container) return;
  
  const acc = tripConfig.accommodation;
  let html = '<ul>';
  
  if (acc.osaka) {
    html += `<li><strong>大阪：</strong>${acc.osaka.name}（${acc.osaka.dates}）</li>`;
  }
  if (acc.nagano) {
    html += `<li><strong>长野：</strong>${acc.nagano.name}（${acc.nagano.dates}）</li>`;
    html += `<li>长野酒店距离长野站${acc.nagano.distance}</li>`;
  }
  
  html += '</ul>';
  container.innerHTML = html;
}

// 渲染景点信息
function renderAttractions() {
  const container = document.getElementById('attractionsList');
  if (!container) return;
  
  const attractions = tripConfig.attractions || [];
  let html = '';
  
  if (attractions.length === 0) {
    html = '<p class="empty">暂无景点，点击编辑添加</p>';
  } else {
    attractions.forEach((attraction, index) => {
      html += `
        <div class="attraction-card" style="position: relative;">
          <h3>${attraction.icon || '🎯'} ${escapeHtml(attraction.name || '未命名景点')}</h3>
          <p><strong>适合年龄：</strong>${escapeHtml(attraction.age_range || '')}</p>
          <p><strong>亮点：</strong>${escapeHtml(attraction.highlights || '')}</p>
          <p><strong>建议游玩时间：</strong>${escapeHtml(attraction.duration || '')}</p>
        </div>
      `;
    });
  }
  
  container.innerHTML = html;
}

// HTML转义
function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// 渲染美食信息
function renderFood() {
  const container = document.getElementById('foodInfo');
  if (!container) return;
  
  const food = tripConfig.food || [];
  let html = '<ul>';
  
  food.forEach(item => {
    html += `<li>${item}</li>`;
  });
  
  html += '</ul>';
  container.innerHTML = html;
}

// 渲染整个页面
function renderPage() {
  renderTraffic();
  renderAccommodation();
  renderAttractions();
  renderFood();
}

// 导出配置为JSON（用于备份或分享）
function exportConfig() {
  const dataStr = JSON.stringify(tripConfig, null, 2);
  const dataBlob = new Blob([dataStr], {type: 'application/json'});
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'trip_config.json';
  link.click();
  URL.revokeObjectURL(url);
  showNotification('配置已导出！', 'success');
}

// 导入配置（从JSON文件）
function importConfig(file) {
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      tripConfig = JSON.parse(e.target.result);
      saveConfig();
      renderPage();
      showNotification('配置已导入并应用！', 'success');
    } catch (error) {
      showNotification('导入失败：JSON格式错误', 'error');
    }
  };
  reader.readAsText(file);
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', () => {
  loadConfig();
});

// 暴露函数到全局作用域（供HTML调用）
window.tripDataManager = {
  loadConfig,
  saveConfig,
  renderPage,
  exportConfig,
  importConfig,
  getConfig: () => tripConfig,
  setConfig: (config) => {
    tripConfig = config;
    saveConfig();
    renderPage();
  }
};

