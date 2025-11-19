# Supabase 集成指南

## 1. Supabase 项目设置

### 创建 Supabase 项目
1. 访问 [Supabase Dashboard](https://app.supabase.com)
2. 点击 "New Project"
3. 选择组织，输入项目名称和密码
4. 选择区域（推荐选择离用户最近的区域）
5. 等待项目创建完成（通常需要2-3分钟）

### 获取必要的凭据
在项目创建完成后，您需要获取以下信息：

1. **项目 URL**: 在 Settings → API 中找到
   - 格式：`https://[your-project-id].supabase.co`

2. **匿名密钥 (anon key)**: 在 Settings → API 中找到
   - 用于客户端应用连接

3. **服务端密钥 (service_role key)**: 在 Settings → API 中找到
   - ⚠️ 重要：仅在服务端使用，不要暴露给客户端

4. **数据库密码**: 创建项目时设置的密码

## 2. 数据库迁移执行

### 方法一：通过 Supabase Dashboard（推荐新手）

1. 登录到 Supabase Dashboard
2. 选择你的项目
3. 导航到 SQL Editor
4. 点击 "New query"
5. 将 `database/supabase-schema.sql` 的内容复制粘贴到编辑器中
6. 点击 "Run" 执行 SQL

### 方法二：通过 Supabase CLI（推荐开发者）

```bash
# 1. 安装 Supabase CLI
npm install -g supabase

# 2. 登录到 Supabase
supabase login

# 3. 初始化项目
supabase init

# 4. 链接到你的远程项目
supabase link --project-ref YOUR_PROJECT_ID

# 5. 执行迁移
supabase db push

# 或者直接执行 SQL 文件
supabase db reset --db-url "postgresql://postgres:[YOUR_PASSWORD]@db.[YOUR_PROJECT_ID].supabase.co:5432/postgres" --local false < database/supabase-schema.sql
```

### 方法三：通过 psql 连接

```bash
psql -h db.[YOUR_PROJECT_ID].supabase.co -p 5432 -d postgres -U postgres -f database/supabase-schema.sql
```

## 3. 环境变量配置

### 创建环境变量文件

创建 `.env.local` 文件：

```bash
# Supabase 配置
NEXT_PUBLIC_SUPABASE_URL=https://[your-project-id].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# 数据库连接（可选，用于直接数据库操作）
DATABASE_URL=postgresql://postgres:[your-password]@db.[your-project-id].supabase.co:5432/postgres

# 应用配置
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
```

### 安全注意事项

1. **永远不要** 将 `.env.local` 文件提交到版本控制系统
2. **服务端密钥** 只能在服务端使用，不要暴露给客户端
3. 在生产环境中使用强密码
4. 定期轮换 API 密钥

## 4. Supabase 客户端设置

### 安装依赖

```bash
npm install @supabase/supabase-js
```

### 创建 Supabase 客户端

创建 `lib/supabase/client.ts`：

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### 服务端客户端（用于 API 路由）

创建 `lib/supabase/server.ts`：

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseServiceRoleKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)
```

## 5. TypeScript 类型定义

### 生成类型定义

```bash
# 使用 Supabase CLI 生成类型
supabase gen types typescript --project-id YOUR_PROJECT_ID --schema public > lib/supabase/types.ts
```

### 类型定义示例

创建 `lib/supabase/types.ts`：

```typescript
export interface Database {
  public: {
    Tables: {
      companies: {
        Row: {
          id: string
          name: string
          domain: string
          subscription_plan: string
          subscription_status: string
          settings: any
          logo_url: string | null
          industry: string | null
          size_category: string | null
          country: string | null
          timezone: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          domain: string
          subscription_plan?: string
          subscription_status?: string
          settings?: any
          logo_url?: string | null
          industry?: string | null
          size_category?: string | null
          country?: string | null
          timezone?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          domain?: string
          subscription_plan?: string
          subscription_status?: string
          settings?: any
          logo_url?: string | null
          industry?: string | null
          size_category?: string | null
          country?: string | null
          timezone?: string
          created_at?: string
          updated_at?: string
        }
      }
      // ... 其他表的类型定义
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
```

## 6. 行级安全性 (RLS) 配置

### 设置 RLS 策略

我们的 schema 已经包含了基本的 RLS 设置，但你可能需要根据具体需求调整：

```sql
-- 示例：更细粒度的权限控制
CREATE POLICY "users_can_view_own_data" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "hr_can_view_all_users" ON users
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users u
            JOIN roles r ON u.role_id = r.id
            WHERE u.id = auth.uid() 
            AND r.name IN ('hr_admin', 'hr_manager')
        )
    );
```

## 7. 认证集成

### 更新认证上下文

修改 `lib/auth/auth-context.tsx` 以使用 Supabase：

```typescript
import { supabase } from '@/lib/supabase/client'

// 登录函数
const login = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  
  if (error) throw error
  
  // 获取用户的公司信息
  const { data: userData } = await supabase
    .from('users')
    .select('*, companies(*), roles(*)')
    .eq('id', data.user.id)
    .single()
    
  setUser(userData)
}

// 登出函数
const logout = async () => {
  await supabase.auth.signOut()
  setUser(null)
}
```

## 8. 数据库操作示例

### 基本 CRUD 操作

```typescript
// 创建候选人
export async function createCandidate(candidate: CandidateInsert) {
  const { data, error } = await supabase
    .from('candidates')
    .insert(candidate)
    .select()
    .single()
  
  if (error) throw error
  return data
}

// 获取候选人列表
export async function getCandidates(companyId: string) {
  const { data, error } = await supabase
    .from('candidates')
    .select('*')
    .eq('company_id', companyId)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

// 更新候选人状态
export async function updateCandidateStatus(
  candidateId: string, 
  status: string
) {
  const { data, error } = await supabase
    .from('candidates')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', candidateId)
    .select()
    .single()
  
  if (error) throw error
  return data
}
```

## 9. 实时订阅

### 设置实时数据订阅

```typescript
// 订阅候选人状态变更
useEffect(() => {
  const subscription = supabase
    .channel('candidates_changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'candidates'
      },
      (payload) => {
        console.log('Candidate changed:', payload)
        // 更新本地状态
      }
    )
    .subscribe()

  return () => {
    subscription.unsubscribe()
  }
}, [])
```

## 10. 存储配置（文件上传）

### 设置存储桶

```sql
-- 在 Supabase SQL Editor 中执行
INSERT INTO storage.buckets (id, name, public) 
VALUES ('resumes', 'resumes', false);

INSERT INTO storage.buckets (id, name, public) 
VALUES ('avatars', 'avatars', true);
```

### 存储策略

```sql
-- 简历上传策略
CREATE POLICY "Users can upload their own resumes" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'resumes' AND
        auth.uid()::text = (storage.foldername(name))[1]
    );

-- 头像上传策略
CREATE POLICY "Users can upload their own avatars" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'avatars' AND
        auth.uid()::text = (storage.foldername(name))[1]
    );
```

## 11. 部署注意事项

### 生产环境配置

1. **环境变量**: 在部署平台设置环境变量
2. **数据库备份**: 启用自动备份
3. **SSL 证书**: 确保使用 HTTPS
4. **监控**: 设置性能和错误监控

### Vercel 部署示例

```bash
# 设置环境变量
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY

# 部署
vercel deploy
```

## 12. 性能优化建议

### 数据库优化

1. **索引优化**: 为经常查询的字段添加索引
2. **连接池**: 使用 Supabase 的连接池功能
3. **查询优化**: 只选择需要的字段，使用分页

### 客户端优化

```typescript
// 使用 React Query 缓存数据
import { useQuery } from '@tanstack/react-query'

function useCandidates(companyId: string) {
  return useQuery({
    queryKey: ['candidates', companyId],
    queryFn: () => getCandidates(companyId),
    staleTime: 5 * 60 * 1000 // 5 分钟
  })
}
```

## 13. 安全最佳实践

1. **输入验证**: 使用 Zod 等库验证输入
2. **SQL 注入防护**: 使用 Supabase 的参数化查询
3. **权限检查**: 在每个操作前检查用户权限
4. **日志记录**: 记录所有重要操作
5. **速率限制**: 实现 API 速率限制

---

按照以上步骤，你就可以成功将 HR SaaS 系统与 Supabase 集成。记得在生产环境中测试所有功能，并根据实际使用情况优化性能。