# 🎯 Supabase 快速设置指南

## ✅ 已完成配置

我已经用你提供的信息自动配置了以下内容：

- ✅ **项目 URL**: `https://gafmznznlssggrywszhc.supabase.co`
- ✅ **Anon Key**: 已配置到 `.env.local`
- ✅ **依赖安装**: @supabase/supabase-js, @tanstack/react-query
- ✅ **认证集成**: 更新了 auth-context 使用 Supabase Auth
- ✅ **类型生成**: 配置了正确的项目 ID

## 🔴 需要你完成的步骤

### 1. 获取 Service Role Key

需要获取 Service Role Key 来完成配置：

1. 访问 [你的 Supabase Dashboard](https://app.supabase.com/project/gafmznznlssggrywszhc)
2. 进入 **Settings** → **API**  
3. 复制 **service_role** secret key
4. 编辑 `.env.local` 文件，替换这行：
   ```bash
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   ```

### 2. 执行数据库迁移

**方式 1: 通过 Supabase Dashboard（推荐）**
1. 进入 [SQL Editor](https://app.supabase.com/project/gafmznznlssggrywszhc/sql)
2. 点击 "New query"
3. 复制 `database/supabase-schema.sql` 的全部内容
4. 粘贴到编辑器中
5. 点击 "Run" 执行

**方式 2: 通过 Supabase CLI**
```bash
# 安装 CLI（如果还没有）
npm install -g supabase

# 登录
supabase login

# 链接项目
supabase link --project-ref gafmznznlssggrywszhc

# 执行 SQL
supabase db reset --db-url "postgresql://postgres:YOUR_PASSWORD@db.gafmznznlssggrywszhc.supabase.co:5432/postgres" --local false < database/supabase-schema.sql
```

### 3. 测试连接

运行以下命令测试数据库连接：

```bash
# 重新安装依赖（如果有问题）
npm install --legacy-peer-deps

# 启动开发服务器
npm run dev
```

### 4. 创建测试用户（可选）

在 Supabase Dashboard 的 Authentication 部分创建测试用户：

1. 进入 [Authentication](https://app.supabase.com/project/gafmznznlssggrywszhc/auth/users)
2. 点击 "Add user"
3. 输入邮箱和密码
4. 创建用户

## 🚀 验证设置

完成上述步骤后，你应该能够：

1. ✅ 访问 `http://localhost:3000` 会重定向到登录页面
2. ✅ 使用 Supabase 中创建的用户登录
3. ✅ 成功进入系统首页
4. ✅ 在浏览器开发者工具中看到 Supabase 连接日志

## 🛠️ 下一步开发

数据库设置完成后，你可以：

1. **添加候选人管理**: 实现候选人 CRUD 操作
2. **职位发布**: 创建和管理职位
3. **AI 功能集成**: 接入 OpenAI API 进行简历分析
4. **文件上传**: 配置 Supabase Storage 用于简历上传
5. **实时通知**: 使用 Supabase Realtime 功能

## 🚨 重要提醒

⚠️ **不要忘记获取 Service Role Key！** 这是完成设置的关键步骤。

没有 Service Role Key，某些服务端功能将无法正常工作。