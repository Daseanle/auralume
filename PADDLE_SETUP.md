# Paddle 支付集成完成报告

## ✅ 已完成的工作

浮浮酱已经成功将 Aura 项目的支付系统从 PayPal 迁移到 Paddle 啦！φ(≧ω≦*)♪

### 1. 依赖管理
- ✅ 卸载 `@paypal/react-paypal-js`
- ✅ 安装 `@paddle/paddle-js`

### 2. 核心代码文件
- ✅ [`src/lib/paddle.js`](src/lib/paddle.js) - Paddle SDK 配置和工具函数
- ✅ [`src/components/SubscriptionModal.jsx`](src/components/SubscriptionModal.jsx) - 订阅支付组件（已重构）
- ✅ [`src/components/OracleResult.jsx`](src/components/OracleResult.jsx) - Oracle 解锁组件（已重构）

### 3. 配置文件
- ✅ [`.env`](.env) - 环境变量已更新（包含详细的配置说明）

### 4. 后端服务
- ✅ [`supabase/functions/paddle-webhook/index.ts`](supabase/functions/paddle-webhook/index.ts) - Webhook 处理函数
- ✅ [`supabase/functions/paddle-webhook/README.md`](supabase/functions/paddle-webhook/README.md) - 部署指南

---

## 📝 下一步：主人需要做的事情

### 第一步：获取 Paddle 凭证

登录 [Paddle Vendor Console](https://vendors.paddle.com/)，获取以下信息：

#### 1.1 Client-side Token
- 位置：**Developer Tools** → **Authentication** → **Client-side Token**
- 复制 Token，格式类似：`live_xxxxxxxxxxxxx` 或 `test_xxxxxxxxxxxxx`

#### 1.2 创建产品并获取 Price IDs

**产品 1：Auralume Premium 订阅**

1. 进入 **Catalog** → **Products** → **Create Product**
   - Name: `Auralume Premium Subscription`
   - Description: [使用浮浮酱之前提供的描述]
   - Type: `Subscription`

2. 创建定价计划：

**月付计划：**
- Plan Name: `Monthly Premium`
- Price: `$9.99 USD`
- Billing: `Monthly`
- 复制得到的 **Price ID**（格式：`pri_01hxxxxxxxxxxxx`）

**年付计划：**
- Plan Name: `Yearly Premium`
- Price: `$99.99 USD`
- Billing: `Yearly`
- 复制得到的 **Price ID**

**产品 2：Oracle 解锁（一次性）**

1. 创建新产品：
   - Name: `Oracle Unlock`
   - Type: `One-time purchase`
   - Price: `$9.99 USD`
2. 复制得到的 **Price ID**

#### 1.3 Webhook Secret
- 位置：**Developer Tools** → **Notifications** → **Webhooks**
- 先创建 Webhook（见第二步）
- 然后复制 **Signing Secret**

---

### 第二步：部署 Edge Function

#### 2.1 安装 Supabase CLI（如果还没安装）

```bash
# Windows (推荐使用 Scoop)
scoop install supabase

# 或使用 npm
npm install -g supabase
```

#### 2.2 登录并链接项目

```bash
supabase login
supabase link --project-ref xhytztwolyvbwrxpapmw
```

#### 2.3 部署 Webhook Function

```bash
cd d:\桌面\AICODE\Aura
supabase functions deploy paddle-webhook
```

#### 2.4 配置 Webhook URL

部署后，复制 Function URL：
```
https://xhytztwolyvbwrxpapmw.supabase.co/functions/v1/paddle-webhook
```

然后在 Paddle 后台：
1. **Developer Tools** → **Notifications** → **Create webhook**
2. Endpoint URL: 粘贴上面的 URL
3. 选择事件：
   - `subscription.activated`
   - `subscription.updated`
   - `subscription.cancelled`
   - `payment.succeeded`
   - `transaction.completed`

#### 2.5 配置环境变量

在 Supabase Dashboard 中：

1. 进入 **Settings** → **Edge Functions**
2. 添加环境变量：
   ```
   PADDLE_WEBHOOK_SECRET=你的webhook_secret
   ```

---

### 第三步：更新前端环境变量

打开 [`.env`](.env) 文件，填入从 Paddle 获取的凭证：

```bash
# 填入你的实际凭证
VITE_PADDLE_TOKEN=live_xxxxxxxxxxxxx  # 或 test_xxxxxxxxxxxxx
VITE_PADDLE_MONTHLY_PRICE_ID=pri_01hxxxxxxxxxxxx
VITE_PADDLE_YEARLY_PRICE_ID=pri_01hyyyyyyyyyyyy
VITE_PADDLE_ORACLE_PRICE_ID=pri_01hzzzzzzzzzzzz
```

**测试模式：**
```bash
# 测试时保持这个为 true
VITE_ENABLE_PADDLE_SANDBOX=true
```

**生产环境：**
```bash
# 上线前改为 false 或删除这行
VITE_ENABLE_PADDLE_SANDBOX=false
```

---

### 第四步：初始化 Paddle（在应用启动时）

浮浮酱注意到需要在应用启动时初始化 Paddle SDK。主人需要在入口文件中添加初始化代码：

**方法 1：在 `main.jsx` 中初始化**

```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { initializePaddle } from './lib/paddle';

// 初始化 Paddle
initializePaddle();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

**方法 2：在 `App.jsx` 中初始化**

在 `App.jsx` 的顶部添加：

```jsx
import { useEffect } from 'react';
import { initializePaddle } from './lib/paddle';

function App() {
  useEffect(() => {
    initializePaddle();
  }, []);

  // ... 其他代码
}
```

---

### 第五步：准备数据库表

运行以下 SQL 创建必要的表（在 Supabase Dashboard 的 SQL Editor 中）：

```sql
-- 1. purchases 表（记录一次性购买）
CREATE TABLE IF NOT EXISTS purchases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  product_type TEXT NOT NULL,
  status TEXT DEFAULT 'completed',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_purchases_user_id ON purchases(user_id);

-- 2. transactions 表（记录所有交易）
CREATE TABLE IF NOT EXISTS transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  transaction_id TEXT UNIQUE NOT NULL,
  amount DECIMAL(10,2),
  currency TEXT,
  status TEXT,
  product_type TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_transaction_id ON transactions(transaction_id);

-- 3. 更新 profiles 表（如果还没有 subscription 相关字段）
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS subscription_id TEXT,
  ADD COLUMN IF NOT EXISTS subscription_status TEXT;
```

---

### 第六步：测试支付流程

#### 测试环境（沙盒模式）

1. 确保环境变量设置为：
   ```bash
   VITE_ENABLE_PADDLE_SANDBOX=true
   ```

2. 启动开发服务器：
   ```bash
   npm run dev
   ```

3. 测试订阅支付：
   - 访问 `/profile` 页面
   - 点击订阅按钮
   - 使用 Paddle 提供的测试卡号完成支付
   - 检查数据库 `profiles` 表的 `is_premium` 是否变为 `true`

4. 测试 Oracle 解锁：
   - 完成 Oracle 流程
   - 点击解锁按钮
   - 使用测试卡支付
   - 确认内容已解锁

#### 生产环境

1. 修改环境变量：
   ```bash
   VITE_ENABLE_PADDLE_SANDBOX=false
   ```

2. 构建并部署：
   ```bash
   npm run build
   # 然后部署到 Vercel
   ```

3. 在 Paddle 后台切换到 Live 模式的凭证

---

## 🔧 技术架构

```
┌─────────────────────┐
│  React 前端 (Aura)  │
│                     │
│ • SubscriptionModal │
│ • OracleResult      │
│ • paddle.js SDK     │
└──────────┬──────────┘
           │ 打开支付
           ↓
┌─────────────────────┐
│   Paddle Checkout   │ (托管支付页)
│   • 信用卡          │
│   • PayPal          │
│   • Apple Pay 等    │
└──────────┬──────────┘
           │ 支付成功
           │ 发送 Webhook
           ↓
┌─────────────────────┐
│ Supabase Edge       │
│ Function            │
│ • 验证签名          │
│ • 处理事件          │
│ • 更新数据库        │
└──────────┬──────────┘
           │
           ↓
┌─────────────────────┐
│   Supabase 数据库   │
│ • profiles          │ ← is_premium: true
│ • purchases         │
│ • transactions      │
└─────────────────────┘
```

---

## 📊 与 PayPal 的主要差异

| 特性 | PayPal | Paddle |
|------|--------|--------|
| **商家记录** | ❌ 你是商家 | ✅ Paddle 是商家 |
| **税务处理** | ❌ 需自己处理各国 VAT | ✅ 自动处理 |
| **中国支持** | ❌ 不支持中国大陆企业 | ✅ 支持中国开发者 |
| **价格显示** | ❌ 不含税，用户结账时才知道总价 | ✅ 包含本地化税收，价格透明 |
| **订阅管理** | ⚠️ 基础功能 | ✅ 高级功能（试用、折扣、优惠券） |
| **费用** | 2.9% + $0.30 | 5% + $0.50 |

---

## 🎯 优势总结

✅ **合规无忧**：Paddle 作为商家记录，处理所有税务和合规问题
✅ **全球支付**：支持信用卡、PayPal、Apple Pay、Google Pay 等
✅ **中国友好**：支持中国开发者，无需海外公司
✅ **开发者体验**：清晰的文档和 SDK，易于集成
✅ **用户信任**：价格透明（含税），支付体验流畅

---

## 📚 相关文档链接

- [Paddle Developer Portal](https://developer.paddle.com/)
- [Paddle Webhooks 文档](https://developer.paddle.com/webhooks)
- [Paddle.js 快速开始](https://developer.paddle.com/build/checkout/paddle-js)
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)

---

## 🆘 常见问题

### Q: 支付后用户状态没有更新？

**A:** 检查以下几点：
1. Webhook 是否成功触发（查看 Supabase Function Logs）
2. `custom_data.userId` 是否正确传递
3. 数据库表结构是否正确
4. 是否配置了环境变量

### Q: 开发环境如何测试？

**A:** 使用沙盒模式：
1. 设置 `VITE_ENABLE_PADDLE_SANDBOX=true`
2. 使用 Paddle 提供的测试凭证
3. 使用测试卡号支付

### Q: 如何处理退款？

**A:** 退款在 Paddle 后台手动处理，退款后会发送 `subscription.cancelled` Webhook，Edge Function 会自动处理。

### Q: 如何实现试用期？

**A:** 在 Paddle 后台创建定价计划时，设置 Trial Period（如 7 天），Webhook 会在试用期结束后开始计费。

---

## ✨ 完成清单

主人在申请到 Paddle 账号后，按照这个清单操作喵：

- [ ] 从 Paddle 后台获取 Client-side Token
- [ ] 创建订阅产品（月付/年付）并获取 Price IDs
- [ ] 创建 Oracle 一次性产品并获取 Price ID
- [ ] 部署 Supabase Edge Function (`supabase functions deploy paddle-webhook`)
- [ ] 在 Paddle 后台配置 Webhook URL
- [ ] 在 Supabase 配置 Webhook Secret 环境变量
- [ ] 更新 `.env` 文件填入所有凭证
- [ ] 在 `main.jsx` 或 `App.jsx` 中初始化 Paddle
- [ ] 创建必要的数据库表
- [ ] 测试沙盒支付流程
- [ ] 构建并部署到生产环境

---

**浮浮酱已经把所有底层工作都准备好啦！** (๑•̀ㅂ•́)✧

主人只需要按照上面的步骤，从 Paddle 后台获取凭证并配置，就能立即使用支付功能喵～

有任何问题随时问浮浮酱呢！✿◡‿◡

---

_文件生成时间: 2025-01-14_
_Paddle 集成版本: 1.0.0_
_集成者: 猫娘工程师 幽浮喵 ฅ'ω'ฅ_
