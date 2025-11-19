# 🚀 2048 游戏发布指南

## 📦 已完成的准备工作

### ✅ 签名密钥信息
- **密钥文件**: `game2048-release-key.keystore`
- **密钥别名**: `game2048-key`
- **密码**: `Game2048@2024`
- **⚠️ 重要**: 请妥善保管此密钥文件和密码，丢失后将无法更新应用！

### ✅ 开发者信息
- **姓名**: Xingyu Chen (陈星宇)
- **邮箱**: guangxiangdebizi@gmail.com
- **GitHub**: https://github.com/guangxiangdebizi
- **地址**: Shanghai, China

---

## 📱 应用图标配置

### 您的图标文件
您已经有一个漂亮的 2048 图标！现在需要生成不同尺寸的版本。

### Android 所需的图标尺寸
Android 需要以下尺寸的图标：
- **512x512** - Google Play 商店展示图标
- **192x192** - xxxhdpi (超超超高密度屏幕)
- **144x144** - xxhdpi (超超高密度屏幕)
- **96x96** - xhdpi (超高密度屏幕)
- **72x72** - hdpi (高密度屏幕)
- **48x48** - mdpi (中密度屏幕)

### 🛠️ 生成图标的方法

#### 方法一：使用在线工具（推荐）
1. 访问：https://icon.kitchen/
2. 上传您的图标文件
3. 选择 "Android Adaptive Icon"
4. 下载生成的资源包
5. 将生成的文件复制到 `android/app/src/main/res/` 目录

#### 方法二：使用图像编辑软件
使用 Photoshop、GIMP 或其他工具手动调整大小，保存到对应目录：
```
android/app/src/main/res/
├── mipmap-mdpi/ic_launcher.png (48x48)
├── mipmap-hdpi/ic_launcher.png (72x72)
├── mipmap-xhdpi/ic_launcher.png (96x96)
├── mipmap-xxhdpi/ic_launcher.png (144x144)
└── mipmap-xxxhdpi/ic_launcher.png (192x192)
```

---

## 📦 构建发布版本

### 已配置的构建命令

#### 1. 同步 Web 资源
```bash
npm run cap:sync
```

#### 2. 构建签名 APK（国内应用商店）
```bash
cd android
.\gradlew assembleRelease
```
输出位置：`android/app/build/outputs/apk/release/app-release.apk`

#### 3. 构建 AAB 包（Google Play）
```bash
cd android
.\gradlew bundleRelease
```
输出位置：`android/app/build/outputs/bundle/release/app-release.aab`

---

## 🌐 发布到 Google Play

### 前置要求
1. **注册 Google Play 开发者账号**
   - 网址：https://play.google.com/console
   - 费用：$25 美元（一次性，终身有效）
   - 支付方式：Visa/MasterCard 信用卡

2. **准备材料**
   - ✅ 应用图标 (512x512)
   - ✅ 应用截图（至少 2 张，最多 8 张）
   - ✅ 应用描述
   - ✅ AAB 文件 (app-release.aab)

### 发布步骤

#### 第一步：创建应用
1. 登录 Google Play Console
2. 点击 "Create app"
3. 填写基本信息：
   - **App name**: 2048 - 经典数字益智游戏
   - **Default language**: 简体中文
   - **App or Game**: Game
   - **Free or Paid**: Free
   - **Privacy Policy**: 可使用：https://www.freeprivacypolicy.com

#### 第二步：上传 AAB 文件
1. 进入 "Production" -> "Create new release"
2. 上传 `app-release.aab` 文件
3. 填写版本说明：
```
首个版本发布：
- 经典 2048 玩法
- 流畅的移动动画效果
- 精美的渐变配色
- 本地最高分记录
```

#### 第三步：设置内容分级
1. 进入 "Content rating"
2. 填写问卷（这是一个益智游戏，无暴力内容）
3. 系统会自动生成分级

#### 第四步：准备商店展示页面

**应用描述（中文）**：
```
🎮 经典 2048 数字益智游戏

通过滑动合并相同数字，挑战最高分 2048！

✨ 特色功能：
• 流畅的移动动画 - 清晰展示每个方块的移动轨迹
• 精美渐变配色 - 每个数字都有独特的视觉效果
• 本地最高分存储 - 记录你的最佳成绩
• 完美触控体验 - 支持滑动和方向键操作
• 无广告纯净版 - 专注游戏体验

🎯 游戏规则：
1. 滑动屏幕移动所有方块
2. 相同数字的方块碰撞时会合并
3. 每次操作后会随机出现新方块
4. 创建出 2048 方块即可获胜
5. 无法移动时游戏结束

适合所有年龄段的玩家，快来挑战你的大脑吧！
```

**应用描述（英文）**：
```
🎮 Classic 2048 Number Puzzle Game

Swipe to merge identical numbers and challenge the highest score 2048!

✨ Features:
• Smooth movement animations
• Beautiful gradient colors
• Local high score storage
• Perfect touch experience
• No ads, pure gameplay

🎯 How to Play:
1. Swipe to move all tiles
2. Tiles with the same number merge when they touch
3. A new tile appears after each move
4. Create a 2048 tile to win
5. Game over when no moves available

Perfect for all ages. Challenge your brain now!
```

**截图要求**：
- 尺寸：至少 320 像素，最多 3840 像素
- 格式：PNG 或 JPEG（24 位 RGB，无 Alpha）
- 数量：2-8 张
- 建议：展示游戏开始、游戏中、达成 2048 等场景

#### 第五步：提交审核
1. 确认所有信息填写完整
2. 点击 "Submit for review"
3. 等待审核（通常 1-7 天）

---

## 🇨🇳 发布到国内应用商店

### 主流应用商店

#### 1. 小米应用商店
- 网址：https://dev.mi.com
- 费用：免费
- 要求：实名认证（身份证）
- 审核时间：1-3 天

#### 2. 华为应用市场
- 网址：https://developer.huawei.com
- 费用：免费
- 要求：实名认证（身份证或企业营业执照）
- 审核时间：1-5 天

#### 3. OPPO 软件商店
- 网址：https://open.oppomobile.com
- 费用：免费
- 审核时间：1-3 天

#### 4. vivo 应用商店
- 网址：https://dev.vivo.com.cn
- 费用：免费
- 审核时间：1-3 天

#### 5. 应用宝（腾讯）
- 网址：https://open.tencent.com
- 费用：免费
- 审核时间：1-7 天

### 国内商店通用步骤
1. 注册开发者账号（实名认证）
2. 创建应用
3. 上传 APK 文件（使用 `app-release.apk`）
4. 填写应用信息（名称、描述、截图、图标）
5. 填写软著信息（可选，但建议申请）
6. 提交审核

### 国内商店注意事项
- ⚠️ 需要《软件著作权登记证书》（可选但推荐）
- ⚠️ 部分商店需要 ICP 备案（如有服务器）
- ⚠️ 隐私政策是必需的
- ⚠️ 应用名称不能与已有应用重复

---

## 📋 发布清单

### 上架前检查
- [ ] 签名密钥已生成并备份
- [ ] 所有尺寸的图标已准备
- [ ] 应用截图已准备（至少 2 张）
- [ ] 应用描述已撰写（中英文）
- [ ] 隐私政策已准备
- [ ] Release APK/AAB 已构建成功
- [ ] 应用已在真机上测试通过

### 发布后维护
- [ ] 监控用户评论和反馈
- [ ] 及时修复 bug 并更新版本
- [ ] 定期更新应用（保持活跃度）
- [ ] 备份好每个版本的签名密钥

---

## 🔧 版本更新流程

### 更新版本号
编辑 `android/app/build.gradle`：
```gradle
defaultConfig {
    versionCode 2      // 每次更新递增（整数）
    versionName "1.1"  // 显示给用户的版本号
}
```

### 构建新版本
```bash
# 1. 修改代码
# 2. 更新版本号
# 3. 同步资源
npm run cap:sync

# 4. 构建新版本
cd android
.\gradlew assembleRelease
.\gradlew bundleRelease
```

### 上传更新
1. 登录对应的开发者后台
2. 创建新版本
3. 上传新的 APK/AAB
4. 填写更新日志
5. 提交审核

---

## 📞 支持与联系

- **开发者**: Xingyu Chen (陈星宇)
- **邮箱**: guangxiangdebizi@gmail.com
- **GitHub**: https://github.com/guangxiangdebizi/game2048

---

## 🎉 祝您发布顺利！

记住：
1. **备份签名密钥** - 这是最重要的！
2. **测试再测试** - 在多种设备上测试
3. **及时回复用户** - 好评从沟通开始
4. **持续优化** - 根据反馈不断改进

Good luck! 🚀

