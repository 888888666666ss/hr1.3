# AI HR Pro - 企业级人力资源管理系统

一个完整的 AI 驱动的人力资源管理 SaaS 系统，专注于招聘流程管理、候选人管理和员工生命周期管理。

## 系统架构

### 核心模块

#### 1. 岗位需求管理 (`/job-reqs`)
- **岗位需求列表**：表格视图展示所有招聘需求
  - 支持搜索和筛选（状态、部门、地点）
  - 批量操作：批量发布、批量关闭、导出 CSV
  - 行内操作：打开详情、审批、导出
- **新建需求**：模态框表单
  - 必填字段：岗位标题、部门、负责人、人数、地点、级别、JD、截止日期
  - 可选字段：发布渠道（多选）、薪资范围、优先级、附件
  - 提交后自动进入"待审批"状态
- **需求详情** (`/job-reqs/[id]`)
  - 基本信息展示
  - 审批时间线（显示所有审批节点）
  - 关联申请人列表（点击查看简历）
  - 发布到渠道（多选发布）
  - AI 智能匹配（推荐匹配候选人）

**状态流转：** Draft → Pending Approval → Open → Closed

#### 2. 审批中心 (`/approvals`)
- **审批收件箱**：显示当前用户待处理的审批
- **审批类型**：
  - Job Requisition（岗位需求审批）
  - Offer Approval（Offer 审批）
- **审批操作**：
  - 批准（Approve）
  - 拒绝（Reject）+ 必填原因
  - 要求修改（Request Changes）+ 必填说明
- **统计数据**：待审批、已批准、已拒绝、待修改

#### 3. 渠道管理 (`/settings/channels`)
- **渠道列表**：显示所有配置的招聘渠道
- **渠道类型**：
  - Job Board（招聘网站）
  - Executive Search（猎头）
  - Social Media（社交媒体）
  - Internal Referral（内部推荐）
- **渠道配置**：
  - 渠道名称、类型
  - API Key 配置
  - 自动同步开关
  - 手动同步按钮
- **统计数据**：已配置渠道数、激活渠道数、今日同步简历数、同步成功率

#### 4. 招聘流程 (`/recruitment`)
**统一招聘中心，整合所有招聘相关功能**
- **流程看板**：可视化展示招聘流程（简历筛选 → AI 初筛 → 技术面试 → HR 面试 → Offer）
- **快速统计**：活跃候选人、本周面试、开放岗位、转化率
- **最近动态**：实时显示候选人、面试、Offer 等活动
- **快速操作**：
  - 创建新岗位需求
  - 上传候选人简历
  - 安排面试
  - 查看候选人列表
  - 管理 Offer

#### 5. 候选人管理 (`/candidates`)
- **看板视图**：5 个阶段的 Kanban 看板
- **候选人列表**：显示所有候选人及其评分、阶段
- **候选人详情** (`/candidates/[id]`)：
  - 基本信息（姓名、联系方式、评分）
  - 流程时间线
  - AI 评估总结
  - 申请岗位信息
  - 快速操作（查看简历、面试记录、生成 Offer）

#### 6. 面试管理 (`/interviews`)
- **面试列表**：显示近期面试及状态
- **AI 初筛面试** (`/interviews/new`)：
  - 对话式 AI 面试界面
  - 实时流式回复
  - 自动生成面试报告
- **面试报告** (`/interviews/[id]/report`)：
  - 综合评分和建议
  - 多维度评估（技术能力、工作经验、沟通能力、学习能力）
  - 优势和需要关注的点
  - 完整对话记录
- **面试标准配置** (`/interviews/standards`)：
  - 配置评估维度和权重
  - 管理 AI 面试问题库

#### 7. 简历库 (`/resumes`)
- **简历列表**：网格卡片视图
- **上传简历** (`/resumes/upload`)
- **AI 简历分析** (`/resumes/[id]/analysis`)：
  - 综合评分
  - 技能匹配度分析
  - 优势和劣势
  - 岗位匹配推荐

#### 8. Offer 管理 (`/offers`)
- Offer 生成和发送
- Offer 状态跟踪（已发送、已接受、已拒绝）

#### 9. 入职管理 (`/onboarding`)
- 入职流程跟踪
- 入职任务清单

#### 10. 员工档案 (`/employees`)
- 在职员工列表
- 员工详情（含 AI 档案总结）
- 统计：在职人数、本月入职、本月离职、离职率

#### 11. 绩效管理 (`/performance`)
- 绩效评估列表
- 绩效详情（含 AI 自动生成评语）
- 统计：平均绩效分、完成率、A 级员工数

#### 12. 数据分析 (`/analytics`)
- 招聘数据分析
- 员工数据分析
- 绩效数据分析

#### 13. 系统设置 (`/settings`)
- 招聘平台账号绑定
- 系统配置（AI 自动分析、邮件通知、自动归档）
- 快速导航到渠道管理

### AI 功能

**全局 AI 助手**
- 每个页面右下角的悬浮按钮
- 上下文感知的智能问答
- 快速操作建议

**AI 简历分析**
- 自动评分（0-100）
- 技能匹配度分析
- 优劣势总结
- 岗位匹配推荐

**AI 初筛面试**
- 自动化对话式面试
- 流式 AI 回复
- 多维度自动评估
- 生成详细面试报告

**AI 智能匹配**
- 在岗位需求详情页调用
- 分析简历库中的候选人
- 返回匹配度排名和原因
- 一键查看推荐候选人简历

**AI 绩效评语生成**
- 基于绩效数据自动生成评语
- 个性化、专业化的文字描述

**AI 档案总结**
- 员工详情页自动生成员工档案总结
- 综合工作表现、技能、项目经验

## 数据库设计

### 核心表结构

\`\`\`sql
-- 岗位需求表
job_reqs (id, title, department, location, owner, headcount, job_level, 
          description, salary_range, close_date, priority, status, 
          applicant_count, created_at, updated_at)

-- 渠道表
channels (id, name, type, api_key, sync_enabled, last_sync, status, 
          created_at, updated_at)

-- 审批表
approvals (id, type, title, submitter, department, submit_time, 
           status, priority, details, created_at, updated_at)

-- 审批时间线表
approval_timeline (id, approval_id, user_name, user_role, action, 
                   comment, action_time)

-- 候选人表
candidates (id, name, email, phone, position, job_req_id, stage, 
            score, resume_url, created_at, updated_at)

-- 面试表
interviews (id, candidate_id, type, status, scheduled_time, score, 
            evaluation, notes, created_at, updated_at)

-- Offer 表
offers (id, candidate_id, job_req_id, salary, start_date, status, 
        sent_at, accepted_at, created_at, updated_at)

-- 岗位需求-渠道关联表
job_req_channels (id, job_req_id, channel_id, published_at)
\`\`\`

### 初始化数据库

\`\`\`bash
# 1. 创建表结构
运行 scripts/create-tables.sql

# 2. 插入示例数据
运行 scripts/seed-data.sql
\`\`\`

## 技术栈

- **框架**: Next.js 16 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS v4
- **UI 组件**: shadcn/ui
- **状态管理**: SWR (推荐用于客户端数据同步)
- **AI**: Vercel AI SDK (支持多种 AI 提供商)
- **数据库**: Supabase / Neon (PostgreSQL)

## 设计规范

### 配色方案

- **Primary (主色)**: `#1668DC` - 科技蓝
- **Background (背景)**: 白色/浅灰
- **Border (边框)**: 中性灰
- **Success (成功)**: 绿色
- **Warning (警告)**: 橙色
- **Error (错误)**: 红色

### 设计原则

1. **卡片化布局**：所有内容区域使用卡片容器
2. **8px 圆角**：统一的圆角半径
3. **留白充足**：间距使用 4 的倍数（4px, 8px, 12px, 16px, 24px）
4. **表格视图优先**：数据密集型页面使用表格
5. **响应式设计**：适配桌面端和移动端

### 交互规范

1. **加载状态**：所有异步操作显示 loading
2. **Toast 提示**：操作成功/失败的即时反馈
3. **模态框**：创建/编辑操作使用模态框
4. **确认对话框**：删除等危险操作需要二次确认

## API 设计

### RESTful API 端点

\`\`\`typescript
// Job Requisitions
GET    /api/job-reqs          // 列表
GET    /api/job-reqs/:id      // 详情
POST   /api/job-reqs          // 创建
PUT    /api/job-reqs/:id      // 更新
DELETE /api/job-reqs/:id      // 删除
POST   /api/job-reqs/:id/approve    // 审批
POST   /api/job-reqs/:id/publish    // 发布到渠道

// Channels
GET    /api/channels          // 列表
POST   /api/channels          // 创建
PUT    /api/channels/:id      // 更新
POST   /api/channels/:id/sync // 手动同步

// Approvals
GET    /api/approvals         // 审批列表
POST   /api/approvals/:id/approve    // 批准
POST   /api/approvals/:id/reject     // 拒绝
POST   /api/approvals/:id/request-changes  // 要求修改

// Candidates
GET    /api/candidates        // 列表
GET    /api/candidates/:id    // 详情
POST   /api/candidates        // 创建
PUT    /api/candidates/:id    // 更新

// AI Endpoints
POST   /api/ai/resume-analysis      // 简历分析
POST   /api/ai/interview            // AI 面试
POST   /api/ai/match                // 智能匹配
POST   /api/ai/performance-comment  // 绩效评语生成
\`\`\`

## 部署

### Vercel 部署

1. 连接 GitHub 仓库到 Vercel
2. 配置环境变量（如果使用集成，会自动添加）
3. 部署

### 环境变量

\`\`\`bash
# 数据库（使用 Supabase 或 Neon 集成会自动配置）
DATABASE_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# AI Gateway（Vercel AI Gateway 自动配置）
# 无需手动配置，使用 "openai/gpt-4-mini" 等模型字符串即可

# 可选：特定 AI 提供商
XAI_API_KEY=          # xAI (Grok)
GROQ_API_KEY=         # Groq
FAL_KEY=              # Fal AI
DEEPINFRA_API_KEY=    # DeepInfra
\`\`\`

## 开发指南

### 本地开发

\`\`\`bash
# 安装依赖（自动推断，无需 package.json）
# Next.js 会从 import 语句自动推断依赖

# 启动开发服务器
# 在 v0 中直接预览，或部署到 Vercel 预览
\`\`\`

### 添加新功能

1. **添加新路由**：在 `app/` 下创建新文件夹
2. **使用现有组件**：优先使用 `components/ui/` 中的组件
3. **遵循设计规范**：保持一致的视觉风格
4. **集成 AI 助手**：每个页面添加 `<AIAssistant page="..." />`

### 数据对接

当前系统使用模拟数据。要对接真实后端：

1. **替换数据**：将组件中的 mock 数据替换为 API 调用
2. **使用 SWR**：推荐使用 SWR 进行数据获取和缓存
   \`\`\`typescript
   import useSWR from 'swr'
   const { data, error } = useSWR('/api/job-reqs', fetcher)
   \`\`\`
3. **Server Actions**：表单提交使用 Next.js Server Actions
4. **错误处理**：添加 try-catch 和错误提示

## 功能亮点

### 1. 完整的审批流程
- 岗位需求创建后自动进入待审批状态
- 支持多级审批流程
- 审批时间线可视化
- 审批意见和评论记录

### 2. 智能渠道管理
- 统一管理所有招聘渠道
- API 集成配置
- 自动同步开关
- 一键发布到多个渠道

### 3. AI 驱动的招聘流程
- 简历自动分析和评分
- AI 对话式初筛面试
- 智能候选人匹配
- 自动化面试报告生成

### 4. 统一的招聘中心
- 整合所有招聘相关功能
- 可视化招聘流程看板
- 实时活动动态
- 快速操作入口

### 5. 灵活的权限控制（预留）
- 不同角色看到不同功能
- 审批权限配置
- 数据访问控制

## 后续优化建议

1. **权限管理**：添加角色和权限系统
2. **通知系统**：邮件/站内信通知
3. **数据可视化**：增强 Analytics 页面的图表
4. **移动端优化**：响应式布局优化
5. **国际化**：支持多语言
6. **性能优化**：大数据量分页、虚拟滚动
7. **导出功能**：批量导出 Excel/PDF
8. **高级搜索**：全文搜索、多条件组合
9. **工作流自动化**：自定义招聘流程
10. **集成更多平台**：LinkedIn, Indeed 等

## 许可证

MIT License
