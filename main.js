// 行程数据
const itineraryData = [
    {
        day: 1,
        title: "大阪经典亲子游",
        location: "大阪",
        image: "https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/with/993423fe-11e4-4c78-899a-2cf9ab5f4911/image_1761732380_2_1.jpg",
        activities: [
            {
                time: "上午",
                title: "大阪城公园",
                description: "登天守阁了解战国历史，西之丸庭园适合孩子奔跑。可以近距离观赏大阪城的壮丽建筑，拍摄美丽的照片。",
                highlights: ["历史文化", "亲子友好"]
            },
            {
                time: "下午",
                title: "海游馆 + 天保山摩天轮",
                description: "世界最大级水族馆，近距离观察鲸鲨和企鹅。之后乘坐天保山摩天轮俯瞰大阪港夜景，有透明舱体可选。",
                highlights: ["海洋生物", "夜景观赏"]
            },
            {
                time: "晚上",
                title: "道顿堀美食街",
                description: "品尝章鱼小丸子、大阪烧等地道美食，体验大阪的繁华夜生活。可以尝试蟹道乐螃蟹宴。",
                highlights: ["美食体验", "夜景"]
            }
        ]
    },
    {
        day: 2,
        title: "大阪环球影城全日游",
        location: "大阪",
        image: "https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/with/12eafc0f-7d6f-40e3-850c-6d6ffbe6b5e3/image_1761732389_1_1.jpg",
        activities: [
            {
                time: "全天",
                title: "环球影城主题乐园",
                description: "必玩马里奥园区和哈利波特主题区，建议购买快速通票。园区内有亲子餐厅和婴儿车租赁服务。",
                highlights: ["主题乐园", "亲子娱乐", "快速通票"]
            },
            {
                time: "游玩建议",
                title: "游园攻略",
                description: "非周末人较少，建议提前下载官方APP查看等候时间。带好防晒用品和舒适的鞋子，园区较大需要大量步行。",
                highlights: ["提前规划", "舒适装备"]
            }
        ]
    },
    {
        day: 3,
        title: "大阪→长野 自然探索",
        location: "大阪 → 长野",
        image: "https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/with/f55f7aa8-4faa-4877-936b-215a43afe316/image_1761732402_2_1.jpg",
        activities: [
            {
                time: "上午",
                title: "新干线前往长野",
                description: "乘坐JR新干线从大阪前往长野，约2.5小时。沿途可欣赏日本乡村风光，建议购买关西广域JR Pass。",
                highlights: ["新干线体验", "风景优美"]
            },
            {
                time: "下午",
                title: "地狱谷野猿公苑",
                description: "观察雪猴泡温泉（冬季最佳，夏季可见幼猴活动）。需徒步35分钟山路，穿舒适鞋。这是世界上唯一能看到猴子泡温泉的地方。",
                highlights: ["雪猴观赏", "自然体验", "徒步"]
            },
            {
                time: "晚上",
                title: "长野温泉酒店",
                description: "入住温泉酒店，体验日式榻榻米和家庭温泉。享受正宗的日式晚餐和温泉浴。",
                highlights: ["温泉体验", "日式住宿"]
            }
        ]
    },
    {
        day: 4,
        title: "轻井泽自然之旅",
        location: "长野 → 轻井泽",
        image: "https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/with/639c5f9a-7ac3-4709-bee0-243490d5141d/image_1761732411_2_1.jpg",
        activities: [
            {
                time: "上午",
                title: "白丝瀑布 + 森林步道",
                description: "清凉避暑胜地，沿途森林步道适合亲子徒步。瀑布宽70米，水流如白丝般优美，是轻井泽的代表性景观。",
                highlights: ["瀑布美景", "森林徒步", "避暑"]
            },
            {
                time: "中午",
                title: "旧轻井泽银座",
                description: "逛手工艺品店，品尝当地果酱和冰淇淋。这里有许多特色小店和咖啡馆，适合悠闲漫步。",
                highlights: ["购物", "美食", "特色小店"]
            },
            {
                time: "下午",
                title: "王子购物广场",
                description: "奥特莱斯购物，有儿童游乐区。可以购买日本品牌商品，价格优惠。",
                highlights: ["购物", "儿童游乐"]
            }
        ]
    },
    {
        day: 5,
        title: "诹访湖返程",
        location: "长野 → 大阪",
        image: "https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/with/c5e32dd8-2473-4c09-a7db-565ff0293a09/image_1761732459_1_1.jpg",
        activities: [
            {
                time: "上午",
                title: "诹访湖观光",
                description: "打卡《你的名字》取景地，立石公园观湖景。诹访湖是长野县最大的湖泊，风景优美，适合拍照留念。",
                highlights: ["动漫圣地", "湖景", "拍照"]
            },
            {
                time: "下午",
                title: "返回大阪",
                description: "乘坐新干线返回大阪。如果时间充裕，可以逛黑门市场尝鲜或在难波站购物，为旅程画上完美句号。",
                highlights: ["返程", "购物"]
            },
            {
                time: "建议",
                title: "松本城（可选）",
                description: "如果时间允许，可以在返程途中游览松本城。这是日本国宝级天守阁，孩子可体验武士盔甲试穿。",
                highlights: ["历史建筑", "文化体验"]
            }
        ]
    }
];

// 渲染行程
function renderItinerary() {
    const container = document.getElementById('itineraryContainer');
    
    itineraryData.forEach((day, index) => {
        const dayCard = document.createElement('div');
        dayCard.className = 'day-card';
        dayCard.style.animationDelay = `${index * 0.1}s`;
        
        dayCard.innerHTML = `
            <div class="day-header">
                <div class="flex items-center justify-between mb-2">
                    <h3 class="text-3xl font-bold">Day ${day.day}</h3>
                    <span class="bg-white/20 px-4 py-1 rounded-full text-sm">${day.location}</span>
                </div>
                <p class="text-xl">${day.title}</p>
            </div>
            <div class="day-content">
                <img src="${day.image}" alt="${day.title}" class="destination-image mb-6">
                <div class="space-y-4">
                    ${day.activities.map(activity => `
                        <div class="activity-item">
                            <span class="activity-time">${activity.time}</span>
                            <h4 class="activity-title">${activity.title}</h4>
                            <p class="activity-desc">${activity.description}</p>
                            <div class="flex flex-wrap gap-2 mt-3">
                                ${activity.highlights.map(tag => `
                                    <span class="highlight-tag">${tag}</span>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        container.appendChild(dayCard);
    });
}

// 移动端菜单切换
function initMobileMenu() {
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        
        // 点击菜单项后关闭菜单
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }
}

// 返回顶部按钮
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// 平滑滚动
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 滚动动画
function initScrollAnimation() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 观察所有卡片元素
    const cards = document.querySelectorAll('.day-card, .overview-card, .tips-card, .transport-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });
}

// 图片懒加载
function initLazyLoading() {
    const images = document.querySelectorAll('img[src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// 初始化所有功能
function init() {
    renderItinerary();
    initMobileMenu();
    initBackToTop();
    initSmoothScroll();
    
    // 延迟执行动画，确保DOM已完全加载
    setTimeout(() => {
        initScrollAnimation();
        initLazyLoading();
    }, 100);
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
