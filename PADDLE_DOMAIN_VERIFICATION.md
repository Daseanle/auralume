# Paddle 域名验证指南

喵～ 浮浮酱帮主人详细说明 Paddle 域名验证的流程喵～

## 📋 当前状态

根据主人的截图和之前的信息：
- **域名：** auralume.shopauralume.com 或 shopauralume.com
- **状态：** Pending Review（等待审核）
- **问题：** 域名验证一直过不去

---

## 🔍 Paddle 域名验证的两种类型

### 类型 1：Client-side Token 验证（已添加域名）

**位置：** Paddle Vendor Console → Developer Tools → Authentication → Client-side Token

**用途：** 允许前端使用 Paddle.js SDK

**验证方式：**
- ✅ 域名已添加到 "Allowed Domains" 列表
- ⏳ 状态：Pending Review（等待 Paddle 审核）

**预计审核时间：** 1-2 个工作日

**说明：** 这个审核是**人工审核**，需要等待 Paddle 团队处理。无需额外操作喵～

---

### 类型 2：Webhook URL 验证（如果配置了 Webhook）

**用途：** 验证 Webhook 端点的所有权

**验证方式：** Paddle 会发送验证请求到 Webhook URL

---

## ✅ 确认域名已正确添加

### 步骤 1：检查 Paddle 后台配置

1. 登录 https://vendors.paddle.com/
2. 进入 **Developer Tools** → **Authentication**
3. 找到 **Client-side Token**
4. 点击 **"Allowed Domains"** 或 **"Manage Domains"**

**确认以下信息：**
- [ ] 域名格式正确：
  - ✅ `auralume.shopauralume.com`
  - ✅ `shopauralume.com`
  - ✅ `localhost:5173`（开发环境）
  - ❌ `http://auralume.shopauralume.com`（不要加 http://）
  - ❌ `www.auralume.shopauralume.com`（除非你使用了 www 子域名）

- [ ] 域名状态显示为 "Pending" 或 "Under Review"

---

## 🕐 审核时间说明

### Paddle 官方审核时间

| 地区 | 工作日 | 说明 |
|------|--------|------|
| **正常情况** | 1-2 个工作日 | 大部分域名在 24-48 小时内审核 |
| **高峰期** | 3-5 个工作日 | 节假日或大促期间可能延长 |
| **需要额外信息** | 5-7 个工作日 | 如果 Paddle 需要更多信息 |

**注意：** Paddle 的工作日是 **周一至周五**（英国时间），不包括周末和英国公众假期喵～

---

## 🚨 为什么域名验证一直过不去？

### 可能原因 1：还在审核中（最可能）

**症状：** 状态一直是 "Pending Review"

**原因：** Paddle 团队还在人工审核

**解决：** 耐心等待 1-2 个工作日

**如何确认：**
- 检查域名添加的时间戳
- 如果不满 48 小时，属于正常范围

---

### 可能原因 2：域名格式错误

**症状：** 域名被拒绝或显示 "Invalid Domain"

**检查：**
- [ ] 域名是否包含 `http://` 或 `https://`（不应该包含）
- [ ] 域名是否包含端口号（生产环境不应该）
- [ ] 域名拼写是否正确

**正确格式示例：**
```
✅ shopauralume.com
✅ auralume.shopauralume.com
✅ localhost:5173（仅开发环境）
```

**错误格式示例：**
```
❌ http://shopauralume.com
❌ https://shopauralume.com
❌ shopauralume.com:443
❌ www.shopauralume.com（除非你真的使用 www 子域名）
```

---

### 可能原因 3：域名无法访问

**症状：** 审核被拒绝，提示域名无法访问

**检查：**
1. 确保网站可以公开访问
2. 检查 DNS 解析是否正确
3. 确认防火墙没有阻止 Paddle 的访问

**测试方法：**
```bash
# 使用 curl 测试网站是否可访问
curl -I https://auralume.shopauralume.com

# 或使用在线工具
# https://www.site24x7.com/check-website-availability.html
```

---

### 可能原因 4：网站内容不符合 Paddle 政策

**症状：** 审核被拒绝，提示违反政策

**检查：**
- [ ] 网站是否有明确的产品/服务说明
- [ ] 网站是否有退款政策
- [ ] 网站是否有隐私政策
- [ ] 网站是否有联系方式

**Paddle 审核要求：**
1. ✅ 网站有实际内容（不是空网站）
2. ✅ 清楚说明你卖什么（Auralume - 占星服务）
3. ✅ 有定价信息（$9.99/月，$99.99/年）
4. ✅ 有联系邮箱或表单
5. ✅ 有隐私政策（可选但推荐）

---

## 🎯 当前最佳行动方案

### 方案 1：继续使用开发环境（推荐，立即可用）

**优点：**
- ✅ 无需等待审核
- ✅ 可以立即测试支付流程
- ✅ 支持本地开发

**配置：**
```bash
# .env 文件
VITE_ENABLE_PADDLE_SANDBOX=false  # 使用 Live Token
VITE_PADDLE_TOKEN=live_6933ec04038eb970fc34cd0c4a7
```

**Paddle 后台添加的域名：**
```
localhost
localhost:5173
127.0.0.1
```

**注意事项：**
- ⚠️ 生产环境域名审核通过后才能上线
- ⚠️ 本地测试不会触发实际扣款（Live 模式下）

---

### 方案 2：等待 Paddle 审核（需要 1-2 天）

**同时做以下准备：**

1. **完善网站内容**
   - [ ] 添加 About 页面
   - [ ] 添加 Privacy Policy
   - [ ] 添加 Terms of Service
   - [ ] 添加 Contact 信息
   - [ ] 确保 Pricing 清晰可见

2. **测试网站可访问性**
   ```bash
   # 确保网站可以公开访问
   curl https://auralume.shopauralume.com
   ```

3. **准备联系 Paddle 客服**
   - 如果超过 3 个工作日还在审核
   - 发邮件到：integration@paddle.com
   - 提供域名和 Vendor ID

---

## 📧 联系 Paddle 客服

如果等待超过 **3 个工作日**，可以主动联系 Paddle 喵～

### 邮件模板

```
收件人：integration@paddle.com
主题：Domain Verification Pending - [你的 Vendor ID]

Hi Paddle Team,

I submitted my domain for verification but it's been pending for over 3 business days.

Domain Details:
- Domain: auralume.shopauralume.com
- Vendor ID: [你的 Vendor ID，在 Paddle 后台可以找到]
- Submitted Date: [提交日期]

Website: https://auralume.shopauralume.com
Business Type: Astrology and AI-powered soulmate discovery

Could you please check the status of my domain verification?

Thank you!
[你的名字]
```

---

## 🔄 检查域名状态

### 每天检查一次

1. 登录 https://vendors.paddle.com/
2. **Developer Tools** → **Authentication** → **Client-side Token**
3. 查看 "Allowed Domains" 列表
4. 检查状态变化：
   - **Pending Review** → 还在审核
   - **Active** → ✅ 审核通过！
   - **Rejected** → 需要查看拒绝原因

---

## ✅ 审核通过后

域名审核通过后，状态会变成 **"Active"** 或 **"Verified"**，这时就可以：

1. ✅ 在生产环境使用 Paddle 支付
2. ✅ 用户可以正常完成支付
3. ✅ Paddle.js SDK 可以正常初始化

**不需要额外操作，直接上线即可喵～**

---

## 📝 临时解决方案

如果主人急需上线，可以：

### 使用 Vercel 预部署域名

1. 在 Vercel 部署时，Vercel 会提供一个临时域名：
   - `aura-project.vercel.app`
   - `aura-git-xxx.vercel.app`

2. 将这个临时域名添加到 Paddle（审核通常更快）

3. 等审核通过后，再添加自定义域名

---

## 🎯 当前建议

基于主人提供的信息，浮浮酱的建议是喵～

### 短期（今天）：
1. ✅ 使用 `localhost:5173` 继续开发和测试
2. ✅ 完善 Auralume 网站内容（About, Privacy, Contact）
3. ✅ 确保网站可以公开访问

### 中期（1-2 天）：
1. ⏳ 等待 Paddle 审核（正常 1-2 工作日）
2. 📧 如果超过 3 天未审核，联系 Paddle 客服

### 长期（审核通过后）：
1. 🚀 部署到生产环境
2. 🎉 开始接受真实用户支付

---

喵～ 浮浮酱的建议总结：

**域名 "Pending Review" 是正常状态，说明 Paddle 正在人工审核。这不是错误，只是需要等待而已喵～** (๑•̀ㅂ•́)و✧

主人现在可以：
1. ✅ 继续使用 localhost 开发和测试
2. ✅ 完善网站内容以帮助审核通过
3. ⏳ 耐心等待 1-2 个工作日

如果 3 天后还在 pending，浮浮酱帮主人写客服邮件喵～

有任何问题随时告诉浮浮酱喵～ ✨ฅ'ω'ฅ✨
