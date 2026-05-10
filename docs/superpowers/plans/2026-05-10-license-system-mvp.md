# MDskill-Web 付费会员系统 MVP 实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 实现基于授权码的付费会员系统，支持激活、验证和权限控制

**Architecture:** 前端使用 Context API 管理授权状态，localStorage 存储授权信息；后端使用 Netlify Functions + Supabase 验证授权码；设备指纹绑定防止共享

**Tech Stack:** React 18, TypeScript, Context API, Netlify Functions, Supabase, Web Crypto API

---

## 文件结构规划

### 新建文件

**前端核心：**
- `src/contexts/LicenseContext.tsx` - 授权状态管理（Context + Provider）
- `src/components/License/LicenseModal.tsx` - 授权码输入弹窗
- `src/components/License/LicenseBadge.tsx` - Header 授权状态徽章
- `src/components/License/ProBadge.tsx` - 高级版标识组件
- `src/utils/fingerprint.ts` - 设备指纹生成
- `src/utils/trial.ts` - 试用功能逻辑
- `src/types/license.ts` - 授权相关类型定义

**后端服务：**
- `netlify/functions/verify-license.ts` - 激活授权码 API
- `netlify/functions/check-license.ts` - 定期校验 API
- `netlify/functions/lib/supabase.ts` - Supabase 客户端封装

**管理工具：**
- `scripts/license-generator.js` - 授权码生成工具
- `scripts/license-manager.js` - 授权码管理工具（查看/撤销）
- `scripts/setup-supabase.sql` - 数据库初始化脚本

**配置文件：**
- `.env.local.example` - 环境变量示例
- `netlify.toml` - Netlify 配置（Functions 路径）

### 修改文件

- `src/App.tsx` - 集成 LicenseProvider
- `src/components/Header/Header.tsx` - 添加授权状态显示
- `src/components/Sidebar/Sidebar.tsx` - 主题权限控制
- `src/components/Poster/PosterModal.tsx` - 导出水印控制
- `package.json` - 添加依赖（@supabase/supabase-js）

---

## Task 1: 环境准备和依赖安装

**Files:**
- Modify: `package.json`
- Create: `.env.local.example`
- Create: `netlify.toml`

- [ ] **Step 1: 安装 Supabase 客户端**

```bash
cd /Users/andy/Desktop/04\ AICode/MDskill-Web
npm install @supabase/supabase-js
```

Expected: Package installed successfully

- [ ] **Step 2: 创建环境变量示例文件**

```bash
cat > .env.local.example << 'EOF'
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Netlify Functions (本地开发)
VITE_API_BASE_URL=http://localhost:8888/.netlify/functions

# Supabase Service Key (仅用于 Netlify Functions)
SUPABASE_SERVICE_KEY=your-service-key
EOF
```

- [ ] **Step 3: 创建 Netlify 配置文件**

```bash
cat > netlify.toml << 'EOF'
[build]
  command = "npm run build"
  publish = "dist"
  functions = "netlify/functions"

[dev]
  command = "npm run dev"
  port = 3000
  targetPort = 3000
  framework = "#custom"
  functionsPort = 8888

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200
EOF
```

- [ ] **Step 4: 验证配置**

```bash
cat netlify.toml
cat .env.local.example
```

Expected: 文件内容正确显示

- [ ] **Step 5: 提交配置文件**

```bash
git add package.json netlify.toml .env.local.example
git commit -m "chore: 添加 Supabase 依赖和 Netlify 配置"
```

---

## Task 2: Supabase 数据库初始化

**Files:**
- Create: `scripts/setup-supabase.sql`

- [ ] **Step 1: 创建数据库初始化脚本**

```bash
mkdir -p scripts
cat > scripts/setup-supabase.sql << 'EOF'
-- MDskill-Web 授权码表
CREATE TABLE IF NOT EXISTS licenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(50) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'expired', 'revoked')),
  user_id VARCHAR(100),
  device_fingerprint TEXT,
  activated_at TIMESTAMP WITH TIME ZONE,
  last_verified_at TIMESTAMP WITH TIME ZONE
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_licenses_code ON licenses(code);
CREATE INDEX IF NOT EXISTS idx_licenses_status ON licenses(status);
CREATE INDEX IF NOT EXISTS idx_licenses_expires_at ON licenses(expires_at);

-- 添加注释
COMMENT ON TABLE licenses IS 'MDskill-Web 授权码表';
COMMENT ON COLUMN licenses.code IS '授权码（格式：MDSKILL-YYYY-XXXX-XXXX）';
COMMENT ON COLUMN licenses.status IS '状态：active=有效, expired=已过期, revoked=已撤销';
COMMENT ON COLUMN licenses.user_id IS '用户标识（微信昵称等）';
COMMENT ON COLUMN licenses.device_fingerprint IS '设备指纹（SHA-256）';
EOF
```

- [ ] **Step 2: 手动执行数据库初始化**

**操作步骤：**
1. 访问 https://supabase.com/dashboard
2. 创建新项目或选择现有项目
3. 进入 SQL Editor
4. 复制 `scripts/setup-supabase.sql` 内容
5. 执行 SQL
6. 验证表创建成功

Expected: licenses 表创建成功，包含所有字段和索引

- [ ] **Step 3: 获取 Supabase 凭证**

**操作步骤：**
1. 在 Supabase Dashboard 进入 Settings > API
2. 复制 Project URL
3. 复制 anon public key
4. 复制 service_role key（仅用于后端）

- [ ] **Step 4: 创建本地环境变量文件**

```bash
cat > .env.local << 'EOF'
VITE_SUPABASE_URL=你的_PROJECT_URL
VITE_SUPABASE_ANON_KEY=你的_ANON_KEY
VITE_API_BASE_URL=http://localhost:8888/.netlify/functions
SUPABASE_SERVICE_KEY=你的_SERVICE_ROLE_KEY
EOF
```

**注意：** 将上面的占位符替换为实际的 Supabase 凭证

- [ ] **Step 5: 提交初始化脚本**

```bash
git add scripts/setup-supabase.sql
git commit -m "feat: 添加 Supabase 数据库初始化脚本"
```

---

## Task 3: 类型定义

**Files:**
- Create: `src/types/license.ts`

- [ ] **Step 1: 创建授权类型定义文件**

```typescript
// src/types/license.ts
export interface LicenseData {
  licenseCode: string
  activatedAt: string
  expiresAt: string
  lastVerified: string
  deviceFingerprint?: string
}

export interface TrialData {
  startedAt: string
  expiresAt: string
}

export interface LicenseContextType {
  isPro: boolean
  license: LicenseData | null
  isTrialing: boolean
  trialDaysLeft: number
  activateLicense: (code: string) => Promise<ActivationResult>
  checkLicense: () => Promise<void>
  showLicenseModal: () => void
}

export interface ActivationResult {
  success: boolean
  error?: 'INVALID_CODE' | 'EXPIRED' | 'REVOKED' | 'DEVICE_MISMATCH' | 'NETWORK_ERROR'
  data?: {
    expiresAt: string
    daysLeft: number
  }
}

export interface VerifyLicenseRequest {
  code: string
  deviceFingerprint: string
}

export interface VerifyLicenseResponse {
  success: boolean
  error?: string
  data?: {
    expiresAt: string
    daysLeft: number
  }
}

export interface CheckLicenseRequest {
  code: string
}

export interface CheckLicenseResponse {
  valid: boolean
  expiresAt?: string
}
```

- [ ] **Step 2: 验证类型定义**

```bash
npx tsc --noEmit src/types/license.ts
```

Expected: No errors

- [ ] **Step 3: 提交类型定义**

```bash
git add src/types/license.ts
git commit -m "feat: 添加授权系统类型定义"
```

---

## Task 4: 设备指纹生成工具

**Files:**
- Create: `src/utils/fingerprint.ts`

- [ ] **Step 1: 创建设备指纹生成函数**

```typescript
// src/utils/fingerprint.ts
export async function generateFingerprint(): Promise<string> {
  const components = [
    navigator.userAgent,
    navigator.language,
    `${screen.width}x${screen.height}`,
    `${new Date().getTimezoneOffset()}`,
    `${navigator.hardwareConcurrency || 'unknown'}`,
    navigator.platform,
  ]

  const data = components.join('|')
  const encoder = new TextEncoder()
  const dataBuffer = encoder.encode(data)
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')

  return hashHex
}

export function isFingerprintSupported(): boolean {
  return typeof crypto !== 'undefined' && 
         typeof crypto.subtle !== 'undefined' &&
         typeof crypto.subtle.digest === 'function'
}
```

- [ ] **Step 2: 验证类型检查**

```bash
npx tsc --noEmit src/utils/fingerprint.ts
```

Expected: No errors

- [ ] **Step 3: 提交设备指纹工具**

```bash
git add src/utils/fingerprint.ts
git commit -m "feat: 添加设备指纹生成工具"
```

---

## Task 5: 试用功能逻辑

**Files:**
- Create: `src/utils/trial.ts`

- [ ] **Step 1: 创建试用功能函数**

```typescript
// src/utils/trial.ts
import type { TrialData } from '../types/license'

const TRIAL_STORAGE_KEY = 'mdskill_trial'
const TRIAL_DAYS = 7

export interface TrialStatus {
  isTrialing: boolean
  daysLeft: number
  expiresAt?: string
}

export function checkTrialEligibility(): TrialStatus {
  const trialDataStr = localStorage.getItem(TRIAL_STORAGE_KEY)

  if (!trialDataStr) {
    const now = new Date()
    const expiresAt = new Date(now.getTime() + TRIAL_DAYS * 24 * 60 * 60 * 1000)

    const trial: TrialData = {
      startedAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
    }

    localStorage.setItem(TRIAL_STORAGE_KEY, JSON.stringify(trial))

    return {
      isTrialing: true,
      daysLeft: TRIAL_DAYS,
      expiresAt: expiresAt.toISOString(),
    }
  }

  try {
    const trial: TrialData = JSON.parse(trialDataStr)
    const now = new Date()
    const expiresAt = new Date(trial.expiresAt)

    if (expiresAt > now) {
      const daysLeft = Math.ceil((expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
      return {
        isTrialing: true,
        daysLeft,
        expiresAt: trial.expiresAt,
      }
    }

    return {
      isTrialing: false,
      daysLeft: 0,
    }
  } catch (error) {
    console.error('Failed to parse trial data:', error)
    localStorage.removeItem(TRIAL_STORAGE_KEY)
    return {
      isTrialing: false,
      daysLeft: 0,
    }
  }
}

export function clearTrial(): void {
  localStorage.removeItem(TRIAL_STORAGE_KEY)
}
```

- [ ] **Step 2: 验证类型检查**

```bash
npx tsc --noEmit src/utils/trial.ts
```

Expected: No errors

- [ ] **Step 3: 提交试用功能**

```bash
git add src/utils/trial.ts
git commit -m "feat: 添加 7 天试用功能逻辑"
```

---

## Task 6: Supabase 客户端封装

**Files:**
- Create: `netlify/functions/lib/supabase.ts`

- [ ] **Step 1: 创建 Supabase 客户端**

```bash
mkdir -p netlify/functions/lib
cat > netlify/functions/lib/supabase.ts << 'EOF'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || ''

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

export interface License {
  id: string
  code: string
  created_at: string
  expires_at: string
  status: 'active' | 'expired' | 'revoked'
  user_id: string | null
  device_fingerprint: string | null
  activated_at: string | null
  last_verified_at: string | null
}
EOF
```

- [ ] **Step 2: 验证类型检查**

```bash
npx tsc --noEmit netlify/functions/lib/supabase.ts
```

Expected: No errors

- [ ] **Step 3: 提交 Supabase 客户端**

```bash
git add netlify/functions/lib/supabase.ts
git commit -m "feat: 添加 Netlify Functions Supabase 客户端"
```

---

## Task 7: 授权码激活 API

**Files:**
- Create: `netlify/functions/verify-license.ts`

- [ ] **Step 1: 创建激活 API**

```typescript
// netlify/functions/verify-license.ts
import type { Handler, HandlerEvent } from '@netlify/functions'
import { supabase, type License } from './lib/supabase'

interface VerifyRequest {
  code: string
  deviceFingerprint: string
}

export const handler: Handler = async (event: HandlerEvent) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    }
  }

  try {
    const { code, deviceFingerprint }: VerifyRequest = JSON.parse(event.body || '{}')

    if (!code || !deviceFingerprint) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, error: 'INVALID_REQUEST' }),
      }
    }

    const { data: license, error: fetchError } = await supabase
      .from('licenses')
      .select('*')
      .eq('code', code)
      .single<License>()

    if (fetchError || !license) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, error: 'INVALID_CODE' }),
      }
    }

    if (license.status === 'revoked') {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, error: 'REVOKED' }),
      }
    }

    const now = new Date()
    const expiresAt = new Date(license.expires_at)

    if (expiresAt < now) {
      await supabase
        .from('licenses')
        .update({ status: 'expired' })
        .eq('code', code)

      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, error: 'EXPIRED' }),
      }
    }

    if (!license.device_fingerprint) {
      await supabase
        .from('licenses')
        .update({
          device_fingerprint: deviceFingerprint,
          activated_at: now.toISOString(),
          last_verified_at: now.toISOString(),
        })
        .eq('code', code)
    } else if (license.device_fingerprint !== deviceFingerprint) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, error: 'DEVICE_MISMATCH' }),
      }
    } else {
      await supabase
        .from('licenses')
        .update({ last_verified_at: now.toISOString() })
        .eq('code', code)
    }

    const daysLeft = Math.ceil((expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        data: {
          expiresAt: license.expires_at,
          daysLeft,
        },
      }),
    }
  } catch (error) {
    console.error('Verify license error:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: 'INTERNAL_ERROR' }),
    }
  }
}
```

- [ ] **Step 2: 验证类型检查**

```bash
npx tsc --noEmit netlify/functions/verify-license.ts
```

Expected: No errors

- [ ] **Step 3: 提交激活 API**

```bash
git add netlify/functions/verify-license.ts
git commit -m "feat: 添加授权码激活 API"
```

---

## Task 8: 授权码校验 API

**Files:**
- Create: `netlify/functions/check-license.ts`

- [ ] **Step 1: 创建校验 API**

```typescript
// netlify/functions/check-license.ts
import type { Handler, HandlerEvent } from '@netlify/functions'
import { supabase, type License } from './lib/supabase'

interface CheckRequest {
  code: string
}

export const handler: Handler = async (event: HandlerEvent) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    }
  }

  try {
    const { code }: CheckRequest = JSON.parse(event.body || '{}')

    if (!code) {
      return {
        statusCode: 400,
        body: JSON.stringify({ valid: false }),
      }
    }

    const { data: license, error: fetchError } = await supabase
      .from('licenses')
      .select('*')
      .eq('code', code)
      .single<License>()

    if (fetchError || !license) {
      return {
        statusCode: 200,
        body: JSON.stringify({ valid: false }),
      }
    }

    if (license.status !== 'active') {
      return {
        statusCode: 200,
        body: JSON.stringify({ valid: false }),
      }
    }

    const now = new Date()
    const expiresAt = new Date(license.expires_at)

    if (expiresAt < now) {
      await supabase
        .from('licenses')
        .update({ status: 'expired' })
        .eq('code', code)

      return {
        statusCode: 200,
        body: JSON.stringify({ valid: false }),
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        valid: true,
        expiresAt: license.expires_at,
      }),
    }
  } catch (error) {
    console.error('Check license error:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ valid: false }),
    }
  }
}
```

- [ ] **Step 2: 验证类型检查**

```bash
npx tsc --noEmit netlify/functions/check-license.ts
```

Expected: No errors

- [ ] **Step 3: 提交校验 API**

```bash
git add netlify/functions/check-license.ts
git commit -m "feat: 添加授权码定期校验 API"
```

---

## Task 9: License Context Provider

**Files:**
- Create: `src/contexts/LicenseContext.tsx`

- [ ] **Step 1: 创建 License Context**

```typescript
// src/contexts/LicenseContext.tsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import type { LicenseContextType, LicenseData, ActivationResult } from '../types/license'
import { generateFingerprint, isFingerprintSupported } from '../utils/fingerprint'
import { checkTrialEligibility, clearTrial } from '../utils/trial'

const LicenseContext = createContext<LicenseContextType | undefined>(undefined)

const LICENSE_STORAGE_KEY = 'mdskill_license'
const VERIFY_INTERVAL = 24 * 60 * 60 * 1000

export function LicenseProvider({ children }: { children: React.ReactNode }) {
  const [isPro, setIsPro] = useState(false)
  const [license, setLicense] = useState<LicenseData | null>(null)
  const [isTrialing, setIsTrialing] = useState(false)
  const [trialDaysLeft, setTrialDaysLeft] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)

  const checkLicense = useCallback(async () => {
    if (!license) return

    try {
      const response = await fetch('/api/check-license', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: license.licenseCode }),
      })

      const data = await response.json()

      if (!data.valid) {
        localStorage.removeItem(LICENSE_STORAGE_KEY)
        setIsPro(false)
        setLicense(null)
      } else {
        const updatedLicense = {
          ...license,
          lastVerified: new Date().toISOString(),
        }
        localStorage.setItem(LICENSE_STORAGE_KEY, JSON.stringify(updatedLicense))
        setLicense(updatedLicense)
      }
    } catch (error) {
      console.error('License check failed:', error)
    }
  }, [license])

  const activateLicense = useCallback(async (code: string): Promise<ActivationResult> => {
    if (!isFingerprintSupported()) {
      return {
        success: false,
        error: 'NETWORK_ERROR',
      }
    }

    try {
      const deviceFingerprint = await generateFingerprint()

      const response = await fetch('/api/verify-license', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, deviceFingerprint }),
      })

      const data = await response.json()

      if (data.success) {
        const licenseData: LicenseData = {
          licenseCode: code,
          activatedAt: new Date().toISOString(),
          expiresAt: data.data.expiresAt,
          lastVerified: new Date().toISOString(),
          deviceFingerprint,
        }

        localStorage.setItem(LICENSE_STORAGE_KEY, JSON.stringify(licenseData))
        setLicense(licenseData)
        setIsPro(true)
        clearTrial()
        setIsTrialing(false)
        setTrialDaysLeft(0)

        return {
          success: true,
          data: data.data,
        }
      }

      return {
        success: false,
        error: data.error,
      }
    } catch (error) {
      console.error('License activation failed:', error)
      return {
        success: false,
        error: 'NETWORK_ERROR',
      }
    }
  }, [])

  const showLicenseModal = useCallback(() => {
    setModalOpen(true)
  }, [])

  useEffect(() => {
    const storedLicense = localStorage.getItem(LICENSE_STORAGE_KEY)

    if (storedLicense) {
      try {
        const parsedLicense: LicenseData = JSON.parse(storedLicense)
        const now = new Date()
        const expiresAt = new Date(parsedLicense.expiresAt)

        if (expiresAt > now) {
          setIsPro(true)
          setLicense(parsedLicense)

          const lastVerified = new Date(parsedLicense.lastVerified)
          const hoursSinceVerified = (now.getTime() - lastVerified.getTime()) / (1000 * 60 * 60)

          if (hoursSinceVerified > 24) {
            checkLicense()
          }
        } else {
          localStorage.removeItem(LICENSE_STORAGE_KEY)
        }
      } catch (error) {
        console.error('Failed to parse license:', error)
        localStorage.removeItem(LICENSE_STORAGE_KEY)
      }
    }

    if (!isPro) {
      const trialStatus = checkTrialEligibility()
      setIsTrialing(trialStatus.isTrialing)
      setTrialDaysLeft(trialStatus.daysLeft)

      if (trialStatus.isTrialing) {
        setIsPro(true)
      }
    }
  }, [])

  const value: LicenseContextType = {
    isPro,
    license,
    isTrialing,
    trialDaysLeft,
    activateLicense,
    checkLicense,
    showLicenseModal,
  }

  return <LicenseContext.Provider value={value}>{children}</LicenseContext.Provider>
}

export function useLicense() {
  const context = useContext(LicenseContext)
  if (context === undefined) {
    throw new Error('useLicense must be used within a LicenseProvider')
  }
  return context
}
```

- [ ] **Step 2: 验证类型检查**

```bash
npx tsc --noEmit src/contexts/LicenseContext.tsx
```

Expected: No errors

- [ ] **Step 3: 提交 License Context**

```bash
git add src/contexts/LicenseContext.tsx
git commit -m "feat: 添加授权状态管理 Context"
```

---

## Task 10: 授权码输入弹窗组件

**Files:**
- Create: `src/components/License/LicenseModal.tsx`

- [ ] **Step 1: 创建授权码输入弹窗**

```typescript
// src/components/License/LicenseModal.tsx
import React, { useState } from 'react'
import { X, AlertCircle, CheckCircle2 } from 'lucide-react'
import { useLicense } from '../../contexts/LicenseContext'

interface LicenseModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LicenseModal({ isOpen, onClose }: LicenseModalProps) {
  const { activateLicense, isTrialing, trialDaysLeft } = useLicense()
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  if (!isOpen) return null

  const handleActivate = async () => {
    if (!code.trim()) {
      setError('请输入授权码')
      return
    }

    setLoading(true)
    setError(null)

    const result = await activateLicense(code.trim().toUpperCase())

    setLoading(false)

    if (result.success) {
      setSuccess(true)
      setTimeout(() => {
        onClose()
        setCode('')
        setSuccess(false)
      }, 2000)
    } else {
      const errorMessages = {
        INVALID_CODE: '授权码无效，请检查后重试',
        EXPIRED: '授权码已过期，请联系客服续费',
        REVOKED: '授权码已被撤销，请联系客服',
        DEVICE_MISMATCH: '该授权码已在其他设备激活，如需更换设备请联系客服',
        NETWORK_ERROR: '网络错误，请稍后重试',
      }
      setError(errorMessages[result.error || 'NETWORK_ERROR'])
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">解锁高级版</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {isTrialing && (
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
              <p className="text-sm text-blue-800">
                🎉 您正在试用高级版，剩余 <strong>{trialDaysLeft}</strong> 天
              </p>
            </div>
          )}

          <div>
            <h3 className="text-sm font-bold text-gray-700 mb-3">购买方式</h3>
            <div className="bg-gray-50 rounded-2xl p-4 text-center">
              <p className="text-sm text-gray-600 mb-2">添加微信购买授权码</p>
              <p className="text-2xl font-black text-rose-500 mb-2">AIPMAndy</p>
              <p className="text-xs text-gray-500">会员费：19元/月</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              输入授权码
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="MDSKILL-2026-XXXX-XXXX"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent font-mono text-sm"
              disabled={loading || success}
            />
            <p className="text-xs text-gray-500 mt-2">
              格式：MDSKILL-年份-随机码
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 rounded-xl p-3 flex items-start gap-2">
              <AlertCircle size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-100 rounded-xl p-3 flex items-start gap-2">
              <CheckCircle2 size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-green-700">激活成功！正在刷新...</p>
            </div>
          )}

          <button
            onClick={handleActivate}
            disabled={loading || success}
            className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold py-3 rounded-xl hover:from-rose-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '激活中...' : success ? '激活成功' : '激活授权码'}
          </button>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: 验证类型检查**

```bash
npx tsc --noEmit src/components/License/LicenseModal.tsx
```

Expected: No errors

- [ ] **Step 3: 提交授权码输入弹窗**

```bash
git add src/components/License/LicenseModal.tsx
git commit -m "feat: 添加授权码输入弹窗组件"
```

---

## Task 11: 授权状态徽章组件

**Files:**
- Create: `src/components/License/LicenseBadge.tsx`
- Create: `src/components/License/ProBadge.tsx`

- [ ] **Step 1: 创建授权状态徽章**

```typescript
// src/components/License/LicenseBadge.tsx
import React from 'react'
import { Crown, Clock } from 'lucide-react'
import { useLicense } from '../../contexts/LicenseContext'

export default function LicenseBadge({ onClick }: { onClick: () => void }) {
  const { isPro, isTrialing, trialDaysLeft, license } = useLicense()

  if (!isPro) {
    return (
      <button
        onClick={onClick}
        className="px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-sm font-bold rounded-full hover:from-rose-600 hover:to-pink-600 transition-all shadow-md hover:shadow-lg"
      >
        解锁高级版
      </button>
    )
  }

  if (isTrialing) {
    return (
      <button
        onClick={onClick}
        className="px-4 py-2 bg-blue-50 text-blue-700 text-sm font-bold rounded-full border border-blue-200 hover:bg-blue-100 transition-all flex items-center gap-2"
      >
        <Clock size={16} />
        试用中 · 剩余 {trialDaysLeft} 天
      </button>
    )
  }

  if (license) {
    const expiresAt = new Date(license.expiresAt)
    const now = new Date()
    const daysLeft = Math.ceil((expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

    return (
      <button
        onClick={onClick}
        className="px-4 py-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-white text-sm font-bold rounded-full hover:from-amber-500 hover:to-yellow-600 transition-all shadow-md flex items-center gap-2"
      >
        <Crown size={16} />
        高级版 · {daysLeft} 天
      </button>
    )
  }

  return null
}
```

- [ ] **Step 2: 创建高级版标识**

```typescript
// src/components/License/ProBadge.tsx
import React from 'react'
import { Lock } from 'lucide-react'

export default function ProBadge() {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-amber-400 to-yellow-500 text-white text-xs font-bold rounded-full">
      <Lock size={12} />
      高级版
    </span>
  )
}
```

- [ ] **Step 3: 验证类型检查**

```bash
npx tsc --noEmit src/components/License/LicenseBadge.tsx src/components/License/ProBadge.tsx
```

Expected: No errors

- [ ] **Step 4: 提交徽章组件**

```bash
git add src/components/License/
git commit -m "feat: 添加授权状态徽章和高级版标识组件"
```

---

## Task 12: 集成到 App.tsx

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: 导入 LicenseProvider**

在 `src/App.tsx` 顶部添加导入：

```typescript
import { LicenseProvider } from './contexts/LicenseContext'
```

- [ ] **Step 2: 包裹应用组件**

修改 App 组件的返回值，用 LicenseProvider 包裹：

```typescript
export default function App() {
  // ... 现有代码 ...

  return (
    <LicenseProvider>
      <div className="h-screen flex flex-col overflow-hidden app-shell">
        {/* ... 现有内容 ... */}
      </div>
    </LicenseProvider>
  )
}
```

- [ ] **Step 3: 验证类型检查**

```bash
npx tsc --noEmit src/App.tsx
```

Expected: No errors

- [ ] **Step 4: 提交集成**

```bash
git add src/App.tsx
git commit -m "feat: 集成 LicenseProvider 到应用"
```

---

## Task 13: 修改 Header 添加授权状态

**Files:**
- Modify: `src/components/Header/Header.tsx`

- [ ] **Step 1: 导入授权组件**

在 Header.tsx 顶部添加：

```typescript
import { useState } from 'react'
import LicenseBadge from '../License/LicenseBadge'
import LicenseModal from '../License/LicenseModal'
```

- [ ] **Step 2: 添加模态框状态**

在 Header 组件内部添加：

```typescript
const [licenseModalOpen, setLicenseModalOpen] = useState(false)
```

- [ ] **Step 3: 在 Header 中添加徽章**

在 Header 的右侧按钮区域添加 LicenseBadge：

```typescript
<div className="flex items-center gap-2">
  <LicenseBadge onClick={() => setLicenseModalOpen(true)} />
  {/* ... 其他按钮 ... */}
</div>
```

- [ ] **Step 4: 添加模态框**

在 Header 组件返回的 JSX 末尾添加：

```typescript
<LicenseModal 
  isOpen={licenseModalOpen} 
  onClose={() => setLicenseModalOpen(false)} 
/>
```

- [ ] **Step 5: 验证类型检查**

```bash
npx tsc --noEmit src/components/Header/Header.tsx
```

Expected: No errors

- [ ] **Step 6: 提交 Header 修改**

```bash
git add src/components/Header/Header.tsx
git commit -m "feat: Header 添加授权状态显示和弹窗"
```

---

## Task 14: 修改 Sidebar 实现主题权限控制

**Files:**
- Modify: `src/components/Sidebar/Sidebar.tsx`

- [ ] **Step 1: 导入授权 Hook 和组件**

```typescript
import { useLicense } from '../../contexts/LicenseContext'
import ProBadge from '../License/ProBadge'
```

- [ ] **Step 2: 使用授权状态**

在 Sidebar 组件内部：

```typescript
const { isPro, showLicenseModal } = useLicense()
```

- [ ] **Step 3: 分离免费和高级主题**

```typescript
const freeTemplates = allTemplates.slice(0, 3)
const proTemplates = allTemplates.slice(3)
```

- [ ] **Step 4: 渲染免费主题区域**

```typescript
<div className="mb-6">
  <h3 className="text-sm font-bold text-gray-700 mb-3">免费主题</h3>
  <div className="space-y-2">
    {freeTemplates.map(template => (
      <TemplateCard
        key={template.id}
        template={template}
        isActive={currentTemplate.id === template.id}
        onClick={() => onSelectTemplate(template)}
      />
    ))}
  </div>
</div>
```

- [ ] **Step 5: 渲染高级主题区域**

```typescript
<div>
  <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
    高级主题
    {!isPro && <ProBadge />}
  </h3>
  <div className="space-y-2">
    {proTemplates.map(template => (
      <TemplateCard
        key={template.id}
        template={template}
        isActive={currentTemplate.id === template.id}
        locked={!isPro}
        onClick={() => {
          if (isPro) {
            onSelectTemplate(template)
          } else {
            showLicenseModal()
          }
        }}
      />
    ))}
  </div>
</div>
```

- [ ] **Step 6: 修改 TemplateCard 支持锁定状态**

在 TemplateCard 组件中添加 locked 属性处理：

```typescript
interface TemplateCardProps {
  template: Template
  isActive: boolean
  locked?: boolean
  onClick: () => void
}

function TemplateCard({ template, isActive, locked = false, onClick }: TemplateCardProps) {
  return (
    <button
      onClick={onClick}
      className={`relative w-full p-3 rounded-xl border-2 transition-all ${
        isActive
          ? 'border-rose-500 bg-rose-50'
          : 'border-gray-200 hover:border-gray-300 bg-white'
      } ${locked ? 'opacity-60' : ''}`}
    >
      {locked && (
        <div className="absolute top-2 right-2">
          <Lock size={16} className="text-gray-400" />
        </div>
      )}
      {/* ... 其他内容 ... */}
    </button>
  )
}
```

- [ ] **Step 7: 验证类型检查**

```bash
npx tsc --noEmit src/components/Sidebar/Sidebar.tsx
```

Expected: No errors

- [ ] **Step 8: 提交 Sidebar 修改**

```bash
git add src/components/Sidebar/Sidebar.tsx
git commit -m "feat: Sidebar 实现主题权限控制"
```

---

## Task 15: 授权码生成工具

**Files:**
- Create: `scripts/license-generator.js`

- [ ] **Step 1: 创建授权码生成脚本**

```bash
cat > scripts/license-generator.js << 'EOF'
#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js')
const crypto = require('crypto')

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ 缺少环境变量：VITE_SUPABASE_URL 或 SUPABASE_SERVICE_KEY')
  console.error('请先创建 .env.local 文件并配置 Supabase 凭证')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

function generateCode() {
  const year = new Date().getFullYear()
  const part1 = crypto.randomBytes(2).toString('hex').toUpperCase()
  const part2 = crypto.randomBytes(2).toString('hex').toUpperCase()
  return `MDSKILL-${year}-${part1}-${part2}`
}

async function createLicense(userId, days = 30) {
  const code = generateCode()
  const now = new Date()
  const expiresAt = new Date(now.getTime() + days * 24 * 60 * 60 * 1000)

  const { data, error } = await supabase
    .from('licenses')
    .insert({
      code,
      user_id: userId,
      expires_at: expiresAt.toISOString(),
      status: 'active',
    })
    .select()
    .single()

  if (error) {
    console.error('❌ 创建授权码失败:', error.message)
    process.exit(1)
  }

  console.log('
✅ 授权码生成成功')
  console.log('━'.repeat(50))
  console.log(`授权码: ${code}`)
  console.log(`用户: ${userId}`)
  console.log(`有效期: ${days} 天`)
  console.log(`到期时间: ${expiresAt.toLocaleString('zh-CN')}`)
  console.log('━'.repeat(50))
  console.log('
请将授权码发送给用户
')
}

const args = process.argv.slice(2)
const userIndex = args.indexOf('--user')
const daysIndex = args.indexOf('--days')

if (userIndex === -1 || !args[userIndex + 1]) {
  console.error('用法: node scripts/license-generator.js --user <用户标识> [--days <天数>]')
  console.error('示例: node scripts/license-generator.js --user wechat_andy --days 30')
  process.exit(1)
}

const userId = args[userIndex + 1]
const days = daysIndex !== -1 && args[daysIndex + 1] ? parseInt(args[daysIndex + 1]) : 30

createLicense(userId, days)
EOF

chmod +x scripts/license-generator.js
```

- [ ] **Step 2: 测试生成授权码**

```bash
node scripts/license-generator.js --user test_user --days 30
```

Expected: 成功生成授权码并显示信息

- [ ] **Step 3: 提交生成工具**

```bash
git add scripts/license-generator.js
git commit -m "feat: 添加授权码生成工具"
```

---

## Task 16: 本地测试完整流程

**Files:**
- None (测试任务)

- [ ] **Step 1: 启动本地开发服务器**

```bash
npm run dev
```

Expected: 服务器在 http://localhost:3000 启动

- [ ] **Step 2: 启动 Netlify Functions 本地服务**

在新终端窗口：

```bash
netlify dev
```

Expected: Functions 在 http://localhost:8888 启动

- [ ] **Step 3: 生成测试授权码**

```bash
node scripts/license-generator.js --user test_user --days 30
```

记录生成的授权码

- [ ] **Step 4: 测试授权码激活**

1. 打开浏览器访问 http://localhost:3000
2. 点击 Header 的"解锁高级版"按钮
3. 输入生成的授权码
4. 点击"激活授权码"
5. 验证激活成功提示
6. 验证 Header 显示"高级版"徽章
7. 验证 Sidebar 所有主题可选

- [ ] **Step 5: 测试试用功能**

1. 清除浏览器 localStorage
2. 刷新页面
3. 验证自动启动 7 天试用
4. 验证 Header 显示"试用中"徽章
5. 验证所有主题可用

- [ ] **Step 6: 测试权限控制**

1. 清除 localStorage（退出试用和授权）
2. 刷新页面
3. 验证只有前 3 个主题可用
4. 点击高级主题，验证弹出授权弹窗

- [ ] **Step 7: 记录测试结果**

创建测试报告：

```bash
cat > docs/test-report-mvp.md << 'EOF'
# MVP 测试报告

## 测试时间
2026年 5月11日 星期一 00时04分04秒 CST

## 测试项目

### 1. 授权码激活
- [ ] 授权码格式验证
- [ ] 激活成功流程
- [ ] 无效授权码提示
- [ ] 设备指纹绑定

### 2. 试用功能
- [ ] 自动启动试用
- [ ] 试用倒计时显示
- [ ] 试用到期降级

### 3. 权限控制
- [ ] 免费版主题限制
- [ ] 高级版主题解锁
- [ ] 锁定状态显示

### 4. UI/UX
- [ ] 授权弹窗交互
- [ ] 徽章显示正确
- [ ] 错误提示友好

## 问题记录

(记录测试中发现的问题)

## 结论

(测试通过/需要修复)
EOF
```

---

## Task 17: 部署到 Netlify

**Files:**
- None (部署任务)

- [ ] **Step 1: 配置 Netlify 环境变量**

在 Netlify Dashboard 中设置：
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_KEY`

- [ ] **Step 2: 提交所有代码**

```bash
git status
git add .
git commit -m "feat: 完成付费会员系统 MVP"
```

- [ ] **Step 3: 推送到 GitHub**

```bash
git push origin main
```

- [ ] **Step 4: 触发 Netlify 部署**

Netlify 会自动检测到推送并开始部署

- [ ] **Step 5: 验证部署成功**

1. 访问 Netlify 部署的 URL
2. 测试授权码激活
3. 测试试用功能
4. 验证 Functions 正常工作

- [ ] **Step 6: 生产环境测试**

使用真实授权码测试完整流程

---

## 验收标准

完成以上所有任务后，系统应满足：

✅ **功能完整性**
- 用户可以输入授权码并激活
- 激活后可以使用所有 13 种主题
- 新用户自动获得 7 天试用
- 授权码过期后自动降级

✅ **安全性**
- 设备指纹绑定防止共享
- 后端验证授权码有效性
- 定期校验机制（24小时）

✅ **用户体验**
- 授权状态清晰显示
- 错误提示友好明确
- 交互流畅无卡顿

✅ **代码质量**
- TypeScript 类型检查通过
- 代码结构清晰
- 提交信息规范

---

## 后续优化（第二阶段）

1. 授权码管理工具（查看/撤销）
2. 到期提醒功能
3. 导出水印控制
4. UI 动画优化
5. 错误日志收集

---

**计划版本：** v1.0  
**创建时间：** 2026-05-10  
**预计完成时间：** 3-5 天

