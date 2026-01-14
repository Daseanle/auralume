# Resend 域名验证指南

喵～ 浮浮酱帮主人详细说明如何配置 Resend 域名验证喵～

## 📋 需要添加的 DNS 记录

在 Resend 后台添加域名后，系统会提供 3 条 DNS 记录。主人需要在域名 DNS 管理面板添加这些记录喵～

### DNS 记录类型（通常包含以下 3 条）：

#### 记录 1：DKIM 记录
```
类型: CNAME
名称/主机: resend._domainkey
值/目标: [XXXXXXXX]._domainkey.resend.com
```

#### 记录 2：SPF 记录（可能需要）
```
类型: TXT
名称/主机: @ 或 shopauralume.com
值/目标: v=spf1 include:resend.com ~all
```

#### 记录 3：验证记录
```
类型: TXT
名称/主机: resend._domainkey 或 _resend
值/目标: [verification-key]
```

---

## 🌐 在不同的 DNS 提供商处添加记录

### 选项 1：如果域名在 Cloudflare

1. 登录 https://dash.cloudflare.com/
2. 选择域名 `shopauralume.com`
3. 点击 **"DNS"** → **"Records"**
4. 点击 **"Add record"**

**添加记录 1 (DKIM)：**
- Type: `CNAME`
- Name: `resend._domainkey`
- Target: `[从 Resend 后台复制]`
- Proxy status: `DNS only`（灰色云朵）

**添加记录 2 (SPF)：**
- Type: `TXT`
- Name: `@`
- Content: `v=spf1 include:resend.com ~all`

**添加记录 3 (验证)：**
- Type: `TXT`
- Name: `[从 Resend 后台复制]`
- Content: `[从 Resend 后台复制]`

### 选项 2：如果域名在 GoDaddy

1. 登录 GoDaddy Dashboard
2. 选择 **"DNS Management"**
3. 点击 **"Add"**

**添加记录：**
- Type: `CNAME` 或 `TXT`
- Name: `resend._domainkey`
- Value: `[从 Resend 后台复制]`
- TTL: `1 hour` 或 `3600`

### 选项 3：如果域名在 Namecheap

1. 登录 Namecheap
2. 选择 **"Domain List"** → **"Manage"**
3. 点击 **"Advanced DNS"**
4. 点击 **"Add New Record"**

按照 Resend 提供的信息添加记录

### 选项 4：如果域名在阿里云/腾讯云

**阿里云：**
1. 登录 https://dns.console.aliyun.com/
2. 选择域名 `shopauralume.com`
3. 点击 **"添加记录"**
4. 记录类型：`CNAME` 或 `TXT`
5. 主机记录：`resend._domainkey`
6. 记录值：`[从 Resend 复制]`

**腾讯云：**
1. 登录 https://console.cloud.tencent.com/cns
2. 选择域名 → **"DNS 解析"**
3. 点击 **"添加记录"**
4. 主机记录：`resend._domainkey`
5. 记录类型：`CNAME` 或 `TXT`
6. 记录值：`[从 Resend 复制]`

---

## ⏱️ DNS 生效时间

DNS 记录添加后需要时间生效喵～

| DNS 提供商 | 生效时间 |
|-----------|---------|
| Cloudflare | 5-10 分钟 |
| GoDaddy | 1-24 小时 |
| Namecheap | 30 分钟 - 2 小时 |
| 阿里云 | 10 分钟 - 1 小时 |
| 腾讯云 | 10 分钟 - 1 小时 |
| 其他 | 最多 48 小时 |

---

## 🔍 如何检查 DNS 记录是否生效

### 方法 1：使用 dig 命令（推荐）

```bash
# 检查 CNAME 记录
dig resend._domainkey.shopauralume.com CNAME

# 检查 TXT 记录
dig resend._domainkey.shopauralume.com TXT
```

### 方法 2：使用在线工具

访问以下网站检查 DNS 记录：
- https://dnschecker.org/
- https://www.whatsmydns.net/
- https://mxtoolbox.com/

### 方法 3：使用 nslookup（Windows）

```cmd
nslookup -type=CNAME resend._domainkey.shopauralume.com
nslookup -type=TXT resend._domainkey.shopauralume.com
```

---

## ✅ 验证域名

DNS 记录生效后：

1. 返回 Resend 后台：https://resend.com/domains
2. 找到 `shopauralume.com` 域名
3. 点击 **"Verify"** 按钮
4. 等待验证完成（几秒钟）

---

## 🐛 常见问题排查

### 问题 1：验证失败

**可能原因：**
- DNS 记录值复制错误（有空格或换行）
- DNS 记录类型选择错误（CNAME vs TXT）
- DNS 记录名称输入错误

**解决方案：**
1. 重新从 Resend 后台复制 DNS 记录值
2. 确保没有多余的空格或换行符
3. 双击值字段确保复制完整

### 问题 2：仍在 Pending 状态

**可能原因：**
- DNS 记录还未全球生效
- DNS 缓存问题

**解决方案：**
1. 等待更长时间（最多 48 小时）
2. 使用在线 DNS 工具检查不同地区的状态
3. 清除本地 DNS 缓存：
   ```cmd
   ipconfig /flushdns  # Windows
   ```

### 问题 3：部分 DNS 记录缺失

**可能原因：**
- DNS 提供商限制某些记录类型
- 记录被过滤或屏蔽

**解决方案：**
1. 联系 DNS 提供商客服
2. 尝试使用 Cloudflare DNS（免费且支持所有记录类型）

---

## 📝 完整配置清单

- [ ] 在 Resend 添加域名 `shopauralume.com`
- [ ] 复制 Resend 提供的 DNS 记录
- [ ] 登录域名 DNS 管理面板
- [ ] 添加所有 3 条 DNS 记录
- [ ] 使用 DNS 工具验证记录已生效
- [ ] 在 Resend 后台点击 "Verify"
- [ ] 验证成功，状态变为 "Verified"

---

## 🚀 验证成功后

域名验证成功后，就可以使用自定义发件人地址啦喵～

```javascript
// 修改发送邮件的代码
const FROM_EMAIL = 'noreply@shopauralume.com';  // ✅ 生产模式
// const FROM_EMAIL = 'onboarding@resend.dev';  // ❌ 测试模式（只能发给账号所有者）
```

这样就可以发送到任何邮箱，不限于 `daseanleelee@gmail.com` 啦喵～

---

## 💡 临时解决方案

如果主人暂时不想配置 DNS，浮浮酱有个建议喵～

**继续使用测试模式：**
- 发件人：`onboarding@resend.dev`
- 收件人限制：只能发给 `daseanleelee@gmail.com`
- 适用场景：开发测试阶段

等网站正式上线后，再配置自定义域名也不迟喵～

---

喵～ 如果主人需要浮浮酱帮忙：
1. 查看具体的 DNS 记录值
2. 找到域名的 DNS 管理面板位置
3. 验证 DNS 记录是否正确

随时告诉浮浮酱喵～ (๑•̀ㅂ•́)و✧

**祝主人的域名验证顺利！✨ฅ'ω'ฅ✨**
