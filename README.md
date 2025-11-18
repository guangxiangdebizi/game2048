# 🎮 2048 游戏

一个现代化、流畅且美观的2048游戏实现，支持Web和Android平台。

[![GitHub Repo](https://img.shields.io/badge/GitHub-game2048-purple?style=for-the-badge&logo=github)](https://github.com/guangxiangdebizi/game2048)
![2048 Game](https://img.shields.io/badge/Game-2048-purple?style=for-the-badge)
![Platform](https://img.shields.io/badge/Platform-Web%20%7C%20Android-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**🔗 仓库地址：** [https://github.com/guangxiangdebizi/game2048](https://github.com/guangxiangdebizi/game2048)

## ✨ 特点

### 🎯 核心功能
- ✅ **完美的游戏逻辑** - 准确的方块移动和合并算法
- ✅ **流畅的动画效果** - 弹出动画、过渡效果、脉冲动画
- ✅ **响应式设计** - 完美适配手机、平板和桌面
- ✅ **本地最高分存储** - 自动保存你的最佳成绩
- ✅ **双平台支持** - Web浏览器和Android应用

### 🎨 视觉设计
- 🌈 **渐变色彩** - 紫色主题，优雅的渐变背景
- 💎 **毛玻璃效果** - 现代化的半透明UI元素
- 🎪 **动态配色** - 每个数字都有独特的渐变色
- ✨ **2048特效** - 达到2048时的脉冲动画

### 🎮 操作方式
- ⌨️ **键盘控制** - 使用方向键 ←↑→↓
- 👆 **触摸控制** - 在屏幕上滑动
- 📱 **手机优化** - 优化的触摸响应

## 🚀 快速开始

### 克隆项目

```bash
# 克隆仓库
git clone https://github.com/guangxiangdebizi/game2048.git

# 进入项目目录
cd game2048

# 安装依赖
npm install
```

### 在线游玩 (Web版)

直接在浏览器中打开 `www/index.html` 文件即可开始游戏！

### Android安装

1. 从 [Releases](https://github.com/guangxiangdebizi/game2048/releases) 页面下载最新的APK文件
2. 在Android设备上允许"未知来源"安装
3. 安装并启动游戏

> 💡 **提示：** 如果还没有发布APK，可以自己构建（参见下面的"构建Android应用"部分）

## 🛠️ 开发和构建

### 环境要求

- **Node.js** (推荐 v16+)
- **npm** 或 **yarn**
- **Android SDK** (仅用于构建APK)
- **Java JDK 17** (仅用于构建APK)

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
# 启动本地开发服务器
npm run serve

# 浏览器访问
# http://localhost:5173
```

### 构建Android应用

```bash
# 同步Web资源到Android项目
npm run cap:sync

# 构建APK
cd android
./gradlew assembleDebug

# APK输出位置：
# android/app/build/outputs/apk/debug/app-debug.apk
```

## 📁 项目结构

```
game/
├── www/                          # Web源代码
│   ├── index.html               # HTML结构
│   ├── game.js                  # 游戏逻辑
│   └── style.css                # 样式表
├── android/                      # Android项目
│   ├── app/                     # 应用模块
│   └── ...                      # Gradle配置
├── node_modules/                # Node依赖 (不提交)
├── package.json                 # 项目配置
├── capacitor.config.ts          # Capacitor配置
├── .gitignore                   # Git忽略规则
└── README.md                    # 项目说明
```

## 🎯 游戏规则

1. **目标**：通过滑动合并相同数字的方块，达到 **2048**！
2. **操作**：使用方向键或滑动屏幕移动所有方块
3. **合并**：两个相同数字的方块碰撞时会合并成它们的和
4. **得分**：每次合并都会增加分数
5. **胜利**：创建出2048方块即可获胜（可继续游戏挑战更高分数）
6. **失败**：棋盘填满且无法移动时游戏结束

## 💻 技术栈

### 前端
- **HTML5** - 语义化结构
- **CSS3** - 渐变、动画、毛玻璃效果
- **JavaScript (ES6+)** - 面向对象编程

### 移动开发
- **Capacitor** - Web转原生应用框架
- **Android SDK** - Android平台支持

### 工具链
- **npm** - 包管理
- **Gradle** - Android构建工具

## 🎨 配色方案

| 数字 | 颜色 | 说明 |
|------|------|------|
| 2, 4 | 米色系 | 浅色背景，深色文字 |
| 8, 16, 32, 64 | 橙红渐变 | 暖色调 |
| 128, 256, 512 | 金黄渐变 | 带阴影效果 |
| 1024, 2048 | 明黄渐变 | 脉冲动画 |
| 4096+ | 蓝色渐变 | 高级配色 |

## 📱 兼容性

### Web浏览器
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ 移动浏览器

### Android
- ✅ Android 5.0 (API 21)+
- ✅ 推荐 Android 8.0+

## 🐛 已知问题

目前没有已知的重大bug。如果你发现任何问题，欢迎在 [Issues](https://github.com/guangxiangdebizi/game2048/issues) 页面提交！

## 🔧 自定义

### 修改网格大小

编辑 `www/game.js` 中的 `size` 属性：

```javascript
constructor() {
  this.size = 4;  // 改为5可创建5x5网格
  // ...
}
```

### 修改颜色主题

编辑 `www/style.css` 中的背景和方块颜色：

```css
body {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.tile-2048 {
  background: linear-gradient(135deg, #edc22e 0%, #ffea00 100%);
}
```

## 📄 许可证

MIT License - 可自由使用、修改和分发。

## 👨‍💻 作者

**guangxiangdebizi** - [GitHub](https://github.com/guangxiangdebizi)

游戏由AI助手重写优化，基于经典2048游戏概念。

## 🙏 致谢

- 原始2048游戏概念来自 [Gabriele Cirulli](https://github.com/gabrielecirulli/2048)
- 本项目为完全重写版本，优化了逻辑和视觉效果

## 📮 反馈与贡献

如果你有任何建议或想要贡献代码：

1. Fork 这个项目 ([点击 Fork](https://github.com/guangxiangdebizi/game2048/fork))
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 [Pull Request](https://github.com/guangxiangdebizi/game2048/pulls)

### 🐛 报告Bug

发现问题？请到 [Issues](https://github.com/guangxiangdebizi/game2048/issues/new) 页面提交详细的bug报告。

### 💡 功能建议

有好的想法？欢迎在 [Issues](https://github.com/guangxiangdebizi/game2048/issues/new) 中分享你的建议！

---

**享受游戏吧！🎉**

如果你喜欢这个项目，别忘了给个 ⭐️！

[![Star History Chart](https://img.shields.io/github/stars/guangxiangdebizi/game2048?style=social)](https://github.com/guangxiangdebizi/game2048/stargazers)

