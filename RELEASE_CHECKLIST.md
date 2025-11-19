# ✅ 发布前检查清单

## 📋 已完成项目

### ✅ 1. 签名密钥
- [x] 生成签名密钥文件: `game2048-release-key.keystore`
- [x] 记录密钥信息:
  - 别名 (Alias): `game2048-key`
  - 密码 (Password): `Game2048@2024`
- [x] 备份密钥文件（⚠️ **非常重要**）

### ✅ 2. Android 项目配置
- [x] 配置 `build.gradle` 使用签名
- [x] 设置应用 ID: `com.example.apple2048`
- [x] 设置版本号: `versionCode 1`, `versionName "1.0"`

### ✅ 3. 应用资源
- [x] 应用图标: `icon.png` (根目录)
- [x] 应用描述（中英文）: 见 `STORE_LISTING.md`
- [x] 隐私政策: 见 `PRIVACY_POLICY.md`
- [x] 发布指南: 见 `RELEASE_GUIDE.md`

## 🔄 进行中

### ⏳ 4. 构建发布版本
- [ ] Release APK 构建中...
- [ ] Release AAB 构建中...

## 📌 待完成项目

### 🎨 5. 图标适配
为了更好的视觉效果，建议生成多种尺寸的图标：

**方法一：使用在线工具（推荐）**
1. 访问 https://icon.kitchen/
2. 上传 `icon.png`
3. 选择 "Android Adaptive Icon"
4. 下载并替换到 `android/app/src/main/res/mipmap-*/` 目录

**方法二：手动生成**
需要以下尺寸（像素）：
- [ ] 512×512 - Google Play 商店图标
- [ ] 192×192 - xxxhdpi
- [ ] 144×144 - xxhdpi
- [ ] 96×96 - xhdpi
- [ ] 72×72 - hdpi
- [ ] 48×48 - mdpi

### 📸 6. 准备截图
至少需要 2 张，建议 4-6 张：
- [ ] 游戏开始界面
- [ ] 游戏进行中
- [ ] 达成高分（512 或 1024）
- [ ] 达成 2048 获胜画面
- [ ] （可选）游戏结束界面
- [ ] （可选）最高分记录界面

**截图规格**：
- 尺寸：最小 320px，最大 3840px
- 格式：PNG 或 JPEG
- 建议：1080×1920 (手机竖屏)

### 📱 7. 真机测试
在发布前，请在真实设备上测试：
- [ ] 安装测试（安装/卸载正常）
- [ ] 功能测试（所有功能正常工作）
- [ ] 性能测试（流畅运行，无卡顿）
- [ ] UI 测试（不同屏幕尺寸显示正常）
- [ ] 崩溃测试（长时间使用无崩溃）

### 🌐 8. 应用商店注册

#### Google Play
- [ ] 注册 Google Play 开发者账号
  - 费用：$25 美元（一次性）
  - 网址：https://play.google.com/console
- [ ] 创建应用
- [ ] 填写商店详情
- [ ] 上传 AAB 文件
- [ ] 设置内容分级
- [ ] 提交审核

#### 国内应用商店（可选）
选择要发布的平台：
- [ ] 小米应用商店 (https://dev.mi.com)
- [ ] 华为应用市场 (https://developer.huawei.com)
- [ ] OPPO 软件商店 (https://open.oppomobile.com)
- [ ] vivo 应用商店 (https://dev.vivo.com.cn)
- [ ] 应用宝 (https://open.tencent.com)

每个平台都需要：
- [ ] 注册开发者账号（实名认证）
- [ ] 上传 APK 文件
- [ ] 填写应用信息
- [ ] 提交审核

## 🔧 构建命令快速参考

### 同步 Web 资源
```bash
npm run cap:sync
```

### 构建 Release APK（国内商店）
```bash
cd android
.\gradlew assembleRelease
```
输出：`android/app/build/outputs/apk/release/app-release.apk`

### 构建 AAB（Google Play）
```bash
cd android
.\gradlew bundleRelease
```
输出：`android/app/build/outputs/bundle/release/app-release.aab`

### 复制到桌面（方便传输）
```bash
copy android\app\build\outputs\apk\release\app-release.apk C:\Users\26214\Desktop\2048-release.apk
```

## 📦 发布文件清单

发布前请确保准备好以下文件：

### 必需文件
- [ ] `app-release.apk` (或 `app-release.aab`)
- [ ] 应用图标 (512×512)
- [ ] 应用截图（至少 2 张）
- [ ] 应用描述（中英文）
- [ ] 隐私政策链接

### 可选但推荐
- [ ] 宣传图 (1024×500)
- [ ] 演示视频 (30秒-2分钟)
- [ ] 软件著作权证书（国内商店）

## ⚠️ 重要提醒

### 密钥安全
- ✅ **已备份密钥文件**: `game2048-release-key.keystore`
- ✅ **已记录密码**: `Game2048@2024`
- ⚠️ **请将密钥文件备份到安全的地方**（U盘、云盘等）
- ⚠️ **密钥丢失将无法更新应用！**

### 版本管理
当前版本：
- versionCode: 1
- versionName: "1.0"

更新应用时记得递增 versionCode！

### 应用 ID
`com.example.apple2048`

⚠️ 应用 ID 一旦发布就不能更改！如果想修改，建议在首次发布前更改。

## 📞 获取帮助

如遇到问题，可以：
1. 查看 `RELEASE_GUIDE.md` 获取详细指南
2. 查看 `STORE_LISTING.md` 获取商店详情
3. 联系开发者：guangxiangdebizi@gmail.com
4. 在 GitHub 提 Issue：https://github.com/guangxiangdebizi/game2048/issues

## 🎉 发布流程总结

```
1. ✅ 生成签名密钥
2. ✅ 配置 Android 项目
3. ⏳ 构建 Release 版本
4. ⏹️ 生成多尺寸图标
5. ⏹️ 准备应用截图
6. ⏹️ 注册开发者账号
7. ⏹️ 上传到应用商店
8. ⏹️ 提交审核
9. ⏹️ 等待审核通过
10. ⏹️ 发布成功！🎊
```

---

**当前进度**: 步骤 3 - 构建 Release 版本

**下一步**: 等待构建完成，然后测试 APK 文件

加油！您已经完成了大部分工作！🚀

