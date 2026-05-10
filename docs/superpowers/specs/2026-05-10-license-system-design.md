# MDskill-Web 付费会员系统设计文档

**创建时间：** 2026-05-10  
**作者：** Andy  
**状态：** 待实施

---

## 1. 项目背景

MDskill-Web 是一个基于 React + Vite 的在线 Markdown 排版工具，目前完全免费。为了支持项目持续发展，需要引入付费会员机制，区分普通版和高级版功能。

**核心需求：**
- 会员费：19元/月
- 新用户：7天免费试用
- 购买方式：联系微信 AIPMAndy
- 激活方式：授权码
- 部署环境：Netlify

---

## 2. 技术方案选择

### 2.1 认证方案

**选择：授权码系统（混合验证）**

**Why：**
- 无需完整的用户登录系统，降低开发复杂度
- 适合小规模手动销售场景
- 用户体验简单直接（输入码即可解锁）
- 混合验证平衡了安全性和用户体验

**How to apply：**
- 前端存储授权码到 localStorage，快速验证
- 后端定期校验（24小时），防止授权码被撤销或过期
- 关键功能（无水印导出）在后端处理，防止前端破解

### 2.2 数据存储方案

**选择：Supabase 免费数据库**

**Why：**
- 免费额度足够小规模使用（50,000 行数据）
- 提供 REST API，易于集成到 Netlify Functions
- 支持实时查询和更新
- 比 JSON 文件方案更安全和可扩展

**How to apply：**
- 创建 `licenses` 表存储授权码信息
- Netlify Functions 通过 Supabase Client 查询验证
- 管理工具直接操作 Supabase 数据库

---

## 3. 系统架构

### 3.1 整体架构图

```
┌─────────────────────────────────────────────────────────────┐
│                        用户浏览器                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  MDskill-Web (React App)                             │   │
│  │  - 授权码输入界面                                       │   │
│  │  - localStorage 存储                                  │   │
│  │  - 权限状态管理 (Context)                              │   │
│  │  - 定期校验逻辑 (24h)                                  │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↓ HTTPS
┌─────────────────────────────────────────────────────────────┐
│                    Netlify Functions                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  /api/verify-license   (激活授权码)                    │   │
│  │  /api/check-license    (定期校验)                      │   │
│  │  /api/export-premium   (无水印导出，可选)               │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↓ REST API
┌─────────────────────────────────────────────────────────────┐
│                    Supabase Database                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  licenses 表                                          │   │
│  │  - code (授权码)                                       │   │
│  │  - createdAt (创建时间)                                │   │
│  │  - expiresAt (到期时间)                                │   │
│  │  - status (状态)                                       │   │
│  │  - userId (用户标识)                                   │   │
│  │  - deviceFingerprint (设备指纹)                        │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↑
┌─────────────────────────────────────────────────────────────┐
│                    授权码管理工具                              │
│  - Node.js CLI 脚本                                          │
│  - 生成授权码                                                 │
│  - 查看/撤销授权码                                            │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 数据模型

#### licenses 表结构

```sql
CREATE TABLE licenses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code VARCHAR(50) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  status VARCHAR(20) DEFAULT 'active', -- active | expired | revoked
  user_id VARCHAR(100), -- 微信昵称或标识
  device_fingerprint TEXT,
  activated_at TIMESTAMP WITH TIME ZONE,
  last_verified_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_licenses_code ON licenses(code);
CREATE INDEX idx_licenses_status ON licenses(status);
```

#### 前端 localStorage 数据结构

```typescript
interface LicenseData {
  licenseCode: string;           // 授权码
  activatedAt: string;            // 激活时间 (ISO 8601)
  expiresAt: string;              // 到期时间 (ISO 8601)
  lastVerified: string;           // 最后校验时间 (ISO 8601)
  deviceFingerprint?: string;     // 设备指纹
}
```

---

## 4. 功能模块详细设计

### 4.1 授权码生成器

**位置：** `scripts/license-generator.js`

**功能：**
- 生成唯一授权码（格式：`MDSKILL-YYYY-XXXX-XXXX`）
- 设置有效期（默认 30 天，可自定义）
- 记录购买用户信息
- 批量生成支持

**使用方式：**
```bash
node scripts/license-generator.js --user "wechat_user_123" --days 30
```

**输出：**
```
✅ 授权码生成成功
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
授权码: MDSKILL-2026-A1B2-C3D4
用户: wechat_user_123
有效期: 30 天
到期时间: 2026-06-10 10:00:00
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 4.2 前端授权码输入界面

**组件：** `src/components/License/LicenseModal.tsx`

**UI 流程：**
1. Header 显示"解锁高级版"按钮（普通版）或"高级版已激活"徽章（高级版）
2. 点击按钮 → 弹出模态框
3. 模态框内容：
   - 购买引导（微信二维码 + 文案）
   - 授权码输入框
   - "激活"按钮
   - 试用倒计时（如果在试用期）

**状态管理：**
```typescript
// src/contexts/LicenseContext.tsx
interface LicenseContextType {
  isPro: boolean;
  license: LicenseData | null;
  isTrialing: boolean;
  trialDaysLeft: number;
  activateLicense: (code: string) => Promise<boolean>;
  checkLicense: () => Promise<void>;
}
```

**权限检查逻辑：**
```typescript
// 启动时检查
useEffect(() => {
  const stored = localStorage.getItem('mdskill_license');
  if (stored) {
    const license = JSON.parse(stored);
    const now = new Date();
    const expiresAt = new Date(license.expiresAt);
    
    if (expiresAt > now) {
      setIsPro(true);
      setLicense(license);
      
      // 如果超过24小时未校验，触发后端校验
      const lastVerified = new Date(license.lastVerified);
      const hoursSinceVerified = (now - lastVerified) / (1000 * 60 * 60);
      if (hoursSinceVerified > 24) {
        checkLicense();
      }
    } else {
      // 过期，清除本地数据
      localStorage.removeItem('mdskill_license');
      showExpiredNotice();
    }
  } else {
    // 检查是否需要启动试用
    checkTrialEligibility();
  }
}, []);
```

### 4.3 后端验证服务

#### API 1: 激活授权码

**端点：** `POST /api/verify-license`

**请求：**
```json
{
  "code": "MDSKILL-2026-A1B2-C3D4",
  "deviceFingerprint": "abc123..."
}
```

**响应（成功）：**
```json
{
  "success": true,
  "data": {
    "expiresAt": "2026-06-10T10:00:00Z",
    "daysLeft": 30
  }
}
```

**响应（失败）：**
```json
{
  "success": false,
  "error": "INVALID_CODE" | "EXPIRED" | "REVOKED" | "DEVICE_MISMATCH"
}
```

**实现逻辑：**
```typescript
// netlify/functions/verify-license.ts
export async function handler(event) {
  const { code, deviceFingerprint } = JSON.parse(event.body);
  
  // 1. 查询数据库
  const license = await supabase
    .from('licenses')
    .select('*')
    .eq('code', code)
    .single();
  
  if (!license) {
    return { statusCode: 400, body: JSON.stringify({ success: false, error: 'INVALID_CODE' }) };
  }
  
  // 2. 检查状态
  if (license.status === 'revoked') {
    return { statusCode: 400, body: JSON.stringify({ success: false, error: 'REVOKED' }) };
  }
  
  // 3. 检查过期
  if (new Date(license.expires_at) < new Date()) {
    await supabase.from('licenses').update({ status: 'expired' }).eq('code', code);
    return { statusCode: 400, body: JSON.stringify({ success: false, error: 'EXPIRED' }) };
  }
  
  // 4. 设备指纹检查（首次激活记录，后续验证）
  if (!license.device_fingerprint) {
    await supabase.from('licenses').update({
      device_fingerprint: deviceFingerprint,
      activated_at: new Date().toISOString()
    }).eq('code', code);
  } else if (license.device_fingerprint !== deviceFingerprint) {
    // 设备不匹配，标记为可疑
    return { statusCode: 400, body: JSON.stringify({ success: false, error: 'DEVICE_MISMATCH' }) };
  }
  
  // 5. 更新最后校验时间
  await supabase.from('licenses').update({
    last_verified_at: new Date().toISOString()
  }).eq('code', code);
  
  // 6. 返回成功
  const daysLeft = Math.ceil((new Date(license.expires_at) - new Date()) / (1000 * 60 * 60 * 24));
  return {
    statusCode: 200,
    body: JSON.stringify({
      success: true,
      data: {
        expiresAt: license.expires_at,
        daysLeft
      }
    })
  };
}
```

#### API 2: 定期校验

**端点：** `POST /api/check-license`

**请求：**
```json
{
  "code": "MDSKILL-2026-A1B2-C3D4"
}
```

**响应：**
```json
{
  "valid": true,
  "expiresAt": "2026-06-10T10:00:00Z"
}
```

**实现逻辑：**
- 简化版的 verify-license
- 只检查状态和过期时间
- 不更新设备指纹

### 4.4 功能权限控制

#### 主题限制

**位置：** `src/components/Sidebar/Sidebar.tsx`

```typescript
const Sidebar = ({ currentTemplate, onSelectTemplate, isOpen, onClose }) => {
  const { isPro } = useLicense();
  
  const freeTemplates = allTemplates.slice(0, 3);
  const proTemplates = allTemplates.slice(3);
  
  return (
    <div>
      {/* 免费主题 */}
      <div className="mb-6">
        <h3>免费主题</h3>
        {freeTemplates.map(template => (
          <TemplateCard 
            key={template.id}
            template={template}
            onClick={() => onSelectTemplate(template)}
          />
        ))}
      </div>
      
      {/* 高级主题 */}
      <div>
        <h3>高级主题 {!isPro && <ProBadge />}</h3>
        {proTemplates.map(template => (
          <TemplateCard 
            key={template.id}
            template={template}
            locked={!isPro}
            onClick={() => {
              if (isPro) {
                onSelectTemplate(template);
              } else {
                showLicenseModal();
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};
```

#### 导出功能限制

**位置：** `src/components/Header/Header.tsx`

```typescript
const handleExportPNG = async () => {
  const { isPro } = useLicense();
  
  if (!isPro) {
    // 添加水印
    await exportWithWatermark();
    showUpgradeNotice();
  } else {
    // 无水印导出
    await exportClean();
  }
};
```

### 4.5 试用功能

**实现逻辑：**

```typescript
// src/utils/trial.ts
export function checkTrialEligibility() {
  const trialData = localStorage.getItem('mdskill_trial');
  
  if (!trialData) {
    // 首次访问，启动试用
    const trial = {
      startedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    };
    localStorage.setItem('mdskill_trial', JSON.stringify(trial));
    return { isTrialing: true, daysLeft: 7 };
  }
  
  const trial = JSON.parse(trialData);
  const now = new Date();
  const expiresAt = new Date(trial.expiresAt);
  
  if (expiresAt > now) {
    const daysLeft = Math.ceil((expiresAt - now) / (1000 * 60 * 60 * 24));
    return { isTrialing: true, daysLeft };
  }
  
  return { isTrialing: false, daysLeft: 0 };
}
```

**UI 提示：**
- Header 显示"试用中 · 剩余 X 天"
- 试用到期前 1 天弹窗提醒
- 到期后降级为普通版，显示购买引导

---

## 5. 安全性设计

### 5.1 防止授权码共享

**设备指纹生成：**
```typescript
// src/utils/fingerprint.ts
export async function generateFingerprint(): Promise<string> {
  const components = [
    navigator.userAgent,
    navigator.language,
    screen.width + 'x' + screen.height,
    new Date().getTimezoneOffset(),
    navigator.hardwareConcurrency,
    navigator.platform
  ];
  
  const data = components.join('|');
  const buffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(data));
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}
```

**Why：**
- 设备指纹可以识别同一台设备
- 防止授权码在多个设备上使用
- 不依赖 Cookie，更难绕过

**How to apply：**
- 首次激活时记录设备指纹
- 后续校验时比对指纹
- 不匹配时拒绝激活，并标记为可疑

### 5.2 防止前端破解

**关键功能后端化：**
- 无水印导出功能在后端 Function 处理
- 前端只发送内容和授权码
- 后端验证授权后再生成无水印版本

**代码混淆：**
- Vite 生产构建自动混淆代码
- 授权验证逻辑分散在多个文件
- 避免明显的 `if (isPro)` 判断

### 5.3 授权码撤销机制

**管理工具命令：**
```bash
node scripts/license-manager.js revoke MDSKILL-2026-A1B2-C3D4
```

**实现：**
```typescript
// scripts/license-manager.js
async function revokeLicense(code) {
  await supabase
    .from('licenses')
    .update({ status: 'revoked' })
    .eq('code', code);
  
  console.log(`✅ 授权码 ${code} 已撤销`);
}
```

**用户体验：**
- 被撤销的授权码在下次校验时失效
- 用户看到"授权码已失效，请联系客服"提示
- 支持退款场景

---

## 6. 用户体验流程

### 6.1 新用户首次使用

```
1. 打开 MDskill-Web
   ↓
2. 自动启动 7 天试用
   ↓
3. Header 显示"试用中 · 剩余 7 天"
   ↓
4. 可以使用所有 13 种主题
   ↓
5. 试用到期前 1 天弹窗提醒
   ↓
6. 点击"立即购买" → 显示微信二维码
   ↓
7. 添加微信 AIPMAndy → 支付 19 元
   ↓
8. 收到授权码（如：MDSKILL-2026-A1B2-C3D4）
   ↓
9. 输入授权码 → 激活成功
   ↓
10. 享受 30 天高级版权限
```

### 6.2 老用户续费

```
1. 授权码到期前 3 天收到提醒
   ↓
2. 点击"续费" → 显示微信二维码
   ↓
3. 联系客服续费 → 获得新授权码
   ↓
4. 输入新授权码 → 续费成功
```

### 6.3 异常场景处理

**授权码输入错误：**
- 提示"授权码格式不正确，请检查后重试"
- 显示正确格式示例

**授权码已过期：**
- 提示"授权码已过期，请联系客服续费"
- 显示微信二维码

**授权码被撤销：**
- 提示"授权码已失效，如有疑问请联系客服"
- 显示客服微信

**设备不匹配：**
- 提示"该授权码已在其他设备激活，如需更换设备请联系客服"
- 提供申诉入口

---

## 7. 开发计划

### 7.1 MVP（第一阶段，预计 3-5 天）

**目标：** 实现基础的授权码激活和权限控制

**任务清单：**
1. ✅ 设置 Supabase 项目和数据库表
2. ✅ 开发授权码生成工具（CLI）
3. ✅ 实现前端授权码输入界面
4. ✅ 实现 LicenseContext 状态管理
5. ✅ 开发 Netlify Functions 验证 API
6. ✅ 实现主题权限控制
7. ✅ 实现导出水印控制
8. ✅ 测试完整流程

**验收标准：**
- 用户可以输入授权码并激活
- 激活后可以使用所有 13 种主题
- 导出 PNG 时无水印
- 授权码过期后自动降级

### 7.2 第二阶段（预计 2-3 天）

**目标：** 增强安全性和用户体验

**任务清单：**
1. ✅ 实现设备指纹绑定
2. ✅ 实现 7 天试用功能
3. ✅ 添加到期提醒功能
4. ✅ 开发授权码管理工具（查看/撤销）
5. ✅ 优化 UI 和交互动画

### 7.3 第三阶段（未来迭代）

**目标：** 自动化和数据分析

**任务清单：**
1. 自动续费提醒（邮件/微信通知）
2. 授权码使用统计（激活率、续费率）
3. 管理后台 Web 界面
4. 更多高级功能（自定义主题配色）

---

## 8. 技术栈总结

| 层级 | 技术选型 | 说明 |
|------|---------|------|
| 前端框架 | React 18 + TypeScript | 现有技术栈 |
| 状态管理 | Context API | 轻量级，适合小规模状态 |
| 本地存储 | localStorage | 存储授权码和试用信息 |
| 后端服务 | Netlify Functions | Serverless，与部署平台集成 |
| 数据库 | Supabase (PostgreSQL) | 免费额度充足，易于集成 |
| 设备指纹 | Web Crypto API | 浏览器原生支持 |
| 授权码生成 | Node.js + uuid | CLI 工具 |
| 部署平台 | Netlify | 现有部署环境 |

---

## 9. 风险与应对

### 9.1 技术风险

**风险：** localStorage 可能被用户清除

**应对：**
- 提供"恢复授权"功能，用户可以重新输入授权码
- 后端记录激活历史，允许同一授权码多次激活（同一设备）

**风险：** 设备指纹可能不够准确

**应对：**
- 允许用户申请更换设备（手动审核）
- 设备指纹作为辅助手段，不作为唯一验证

### 9.2 业务风险

**风险：** 授权码被大规模共享

**应对：**
- 设备指纹绑定
- 异常检测（同一授权码短时间内多次激活）
- 手动审核和撤销机制

**风险：** 用户对价格敏感

**应对：**
- 7 天试用降低决策门槛
- 提供年付优惠（如 199 元/年，相当于 16.6 元/月）

---

## 10. 成功指标

**技术指标：**
- 授权码激活成功率 > 95%
- API 响应时间 < 500ms
- 前端加载时间增加 < 100ms

**业务指标：**
- 试用转化率 > 10%
- 月续费率 > 60%
- 授权码共享率 < 5%

---

## 附录

### A. 授权码格式规范

**格式：** `MDSKILL-YYYY-XXXX-XXXX`

**说明：**
- `MDSKILL`：产品标识
- `YYYY`：年份（如 2026）
- `XXXX-XXXX`：随机字符（大写字母 + 数字）

**示例：**
- `MDSKILL-2026-A1B2-C3D4`
- `MDSKILL-2026-X9Y8-Z7W6`

### B. 环境变量配置

**Netlify 环境变量：**
```
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**本地开发（.env.local）：**
```
VITE_API_BASE_URL=http://localhost:8888/.netlify/functions
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### C. 参考资源

- [Supabase 文档](https://supabase.com/docs)
- [Netlify Functions 文档](https://docs.netlify.com/functions/overview/)
- [FingerprintJS](https://github.com/fingerprintjs/fingerprintjs)（可选的更强大的指纹方案）

---

**文档版本：** v1.0  
**最后更新：** 2026-05-10
