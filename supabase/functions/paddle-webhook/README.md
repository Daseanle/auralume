# Paddle Webhook 部署指南

这个 Edge Function 用于处理 Paddle 支付成功后的 Webhook 通知，安全地更新用户的订阅状态。

## 📋 部署步骤

### 1. 安装 Supabase CLI

```bash
# macOS
brew install supabase/tap/supabase

# Windows
 scoop install supabase

# 或使用 npm
npm install -g supabase
```

### 2. 登录 Supabase

```bash
supabase login
```

### 3. 链接到项目

```bash
cd d:\桌面\AICODE\Aura
supabase link --project-ref xhytztwolyvbwrxpapmw
```

### 4. 部署 Edge Function

```bash
supabase functions deploy paddle-webhook
```

部署成功后会显示 Function URL：
```
https://xhytztwolyvbwrxpapmw.supabase.co/functions/v1/paddle-webhook
```

## ⚙️ 配置 Paddle Webhook

### 1. 获取 Webhook URL

部署后，你的 Webhook URL 是：
```
https://xhytztwolyvbwrxpapmw.supabase.co/functions/v1/paddle-webhook
```

### 2. 在 Paddle 后台配置 Webhook

1. 登录 [Paddle Vendor Console](https://vendors.paddle.com/)
2. 进入 **Developer Tools** → **Notifications** → **Webhooks**
3. 点击 **Create webhook**
4. 填写信息：
   - **Name**: Auralume Production Webhook
   - **Endpoint URL**: `https://xhytztwolyvbwrxpapmw.supabase.co/functions/v1/paddle-webhook`
   - **Description**: Handle subscription and payment events

### 3. 选择要监听的事件

勾选以下事件：

**订阅相关：**
- ✅ `subscription.activated` - 订阅激活
- ✅ `subscription.updated` - 订阅更新
- ✅ `subscription.cancelled` - 订阅取消

**支付相关：**
- ✅ `payment.succeeded` - 支付成功
- ✅ `transaction.completed` - 交易完成

### 4. 获取 Webhook Secret

创建后，Paddle 会提供一个 **Signing Secret**，格式类似：
```
paddle_webhook_secret_xxxxxxxxxxxxx
```

### 5. 配置环境变量

在 Supabase Dashboard 中配置：

1. 进入 **Settings** → **Edge Functions**
2. 添加环境变量：
   ```
   PADDLE_WEBHOOK_SECRET=paddle_webhook_secret_xxxxxxxxxxxxx
   ```

## 🗄️ 数据库表准备

确保 Supabase 数据库中有以下表：

### `profiles` 表（应该已存在）

```sql
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT,
  is_premium BOOLEAN DEFAULT false,
  subscription_id TEXT,
  subscription_status TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 启用 RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 允许用户查看自己的 profile
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- 允许用户更新自己的 profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- 允许 Edge Function 更新 profiles
CREATE POLICY "Edge Functions can update profiles"
  ON profiles FOR UPDATE
  TO service_role
  USING (true);
```

### `purchases` 表（记录一次性购买）

```sql
CREATE TABLE IF NOT EXISTS purchases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  product_type TEXT NOT NULL, -- 'oracle-unlock', etc.
  status TEXT DEFAULT 'completed',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_purchases_user_id ON purchases(user_id);
```

### `transactions` 表（记录所有交易）

```sql
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

CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_transaction_id ON transactions(transaction_id);
```

## 🧪 测试 Webhook

### 方法 1：使用 Paddle 沙盒

1. 设置环境变量：`VITE_ENABLE_PADDLE_SANDBOX=true`
2. 在 Paddle 后台创建 Sandbox 产品
3. 使用测试卡号完成支付
4. 检查 Supabase 数据库 `profiles` 表的 `is_premium` 字段

### 方法 2：模拟 Webhook 调用

```bash
curl -X POST https://xhytztwolyvbwrxpapmw.supabase.co/functions/v1/paddle-webhook \
  -H "Content-Type: application/json" \
  -H "paddle-signature: t=123456,v1=test" \
  -d '{
    "event_type": "subscription.activated",
    "event_id": "evt_test123",
    "data": {
      "id": "sub_test123",
      "status": "active"
    },
    "custom_data": {
      "userId": "your-user-id-here"
    }
  }'
```

## 🔒 安全最佳实践

### ✅ 生产环境必须：

1. **验证 Webhook 签名**
   - 在 `index.ts` 中实现完整的签名验证
   - 参考 [Paddle 签名验证文档](https://developer.paddle.com/webhooks/signature-verification)

2. **处理幂等性**
   - 使用 `event_id` 去重，避免重复处理
   - 在数据库中记录已处理的事件 ID

3. **监控和日志**
   - 使用 Supabase Dashboard 查看 Function Logs
   - 设置错误告警（如 Sentry）

4. **备份和重试**
   - Paddle 会重试失败的 Webhook
   - 实现适当的错误处理和重试逻辑

## 📊 监控

查看 Webhook 日志：

```bash
# 实时查看日志
supabase functions logs paddle-webhook --tail

# 查看最近 100 条日志
supabase functions logs paddle-webhook -n 100
```

## 🚨 故障排除

### Webhook 未触发？

1. 检查 Paddle Dashboard 的 Webhook 配置
2. 确认 URL 正确且可访问
3. 查看 Supabase Function Logs 是否有错误

### 用户状态未更新？

1. 检查 `custom_data.userId` 是否正确传递
2. 确认数据库表结构和权限
3. 查看 Edge Function 日志获取详细错误

### 签名验证失败？

1. 确认 `PADDLE_WEBHOOK_SECRET` 配置正确
2. 检查时间戳是否在允许的范围内（5分钟）
3. 验证签名计算逻辑

## 📚 相关资源

- [Paddle Webhooks 文档](https://developer.paddle.com/webhooks)
- [Supabase Edge Functions 文档](https://supabase.com/docs/guides/functions)
- [Paddle 事件参考](https://developer.paddle.com/webhooks/events)

---

**需要帮助？** 查看 Supabase Dashboard → Edge Functions → Logs 获取详细错误信息。
