# HR SaaS System - Entity Relationship Diagram Description

## 核心关系概述

### 1. 多租户架构 (Multi-tenant Architecture)
```
companies (1) ---- (n) users
companies (1) ---- (n) departments
companies (1) ---- (n) positions
companies (1) ---- (n) candidates
companies (1) ---- (n) jobs
```

### 2. 用户与权限管理 (User & Permission Management)
```
users (n) ---- (1) roles ---- (n) role_permissions ---- (1) permissions
users (1) ---- (n) users (self-reference for manager hierarchy)
users (1) ---- (n) departments (manager relationship)
```

### 3. 组织架构 (Organization Structure)
```
companies (1) ---- (n) departments (1) ---- (n) positions
departments (1) ---- (n) departments (self-reference for hierarchy)
users (n) ---- (1) departments
users (n) ---- (1) positions
```

### 4. 招聘流程 (Recruitment Process)
```
recruitment_requests (1) ---- (n) jobs
positions (1) ---- (n) recruitment_requests
departments (1) ---- (n) recruitment_requests

jobs (1) ---- (n) job_applications ---- (1) candidates
job_applications (1) ---- (n) interview_records
jobs (1) ---- (n) ai_interview_questions
candidates (1) ---- (n) ai_resume_analyses
```

### 5. AI 功能关系 (AI Features)
```
candidates (1) ---- (n) ai_resume_analyses ---- (1) jobs
interview_records (1) ---- (n) ai_interview_questions
positions ---- (n) ai_interview_questions
```

### 6. 员工管理 (Employee Management)
```
users (1) ---- (1) employee_details
users (1) ---- (n) employment_history
users (1) ---- (n) attendance_records
users (1) ---- (n) leave_requests
users (1) ---- (n) leave_balances
```

### 7. 系统审计 (System Audit)
```
companies (1) ---- (n) system_logs
users (1) ---- (n) system_logs
users (1) ---- (n) notifications
```

## 详细实体关系

### 核心业务实体

#### 1. Company 企业
- **核心实体**，所有其他实体的租户根节点
- 包含订阅信息、公司设置、时区等
- 通过 company_id 实现多租户数据隔离

#### 2. User 用户
- 扩展 Supabase auth.users
- 关联：role, department, position, manager
- 支持员工层级关系（manager_id 自引用）

#### 3. Role & Permission 角色权限
- RBAC 模型：roles ↔ role_permissions ↔ permissions
- 支持公司级自定义角色
- 模块化权限管理

### 招聘模块实体

#### 4. Recruitment Request 招聘需求
- 招聘流程起点
- 关联：position, department, requester, approver
- 状态流转：draft → pending → approved → completed

#### 5. Job 职位
- 基于招聘需求创建的具体职位
- 关联：recruitment_request
- 支持内外部发布

#### 6. Candidate 候选人
- 候选人主档案
- 关联多个 job_applications
- 跟踪来源渠道和状态

#### 7. Job Application 求职申请
- 候选人与职位的多对多关系
- 包含申请阶段和状态跟踪
- 关联面试记录

### AI 增强功能

#### 8. AI Resume Analysis AI简历分析
- 候选人简历的AI分析结果
- 关联：candidate, job
- 存储匹配分数、技能提取等

#### 9. AI Interview Questions AI面试题
- 基于职位生成的面试问题
- 分类：technical, behavioral, situational
- 难度级别和预估时长

#### 10. Interview Record 面试记录
- 面试过程记录
- 关联：job_application, interviewer, questions
- 支持AI辅助评估

### 员工管理实体

#### 11. Employee Details 员工详情
- 扩展用户基本信息
- 个人信息、联系方式、银行信息

#### 12. Employment History 雇佣历史
- 员工职位变更记录
- 工资、部门、职位变更轨迹

#### 13. Attendance 考勤
- 日常考勤打卡记录
- 支持远程办公跟踪
- 加班时间计算

#### 14. Leave Management 请假管理
- leave_requests: 请假申请
- leave_balances: 假期余额
- 支持多种假期类型

### 系统支撑实体

#### 15. System Logs 系统日志
- 审计跟踪所有用户操作
- 包含IP、用户代理等安全信息

#### 16. Notifications 通知
- 应用内、邮件、推送通知
- 分类和优先级管理

## 关键设计特点

### 1. 多租户隔离
- 所有业务表包含 company_id
- RLS (Row Level Security) 策略
- 确保数据完全隔离

### 2. RBAC 权限体系
- 角色-权限多对多关系
- 模块化权限设计
- 支持公司级自定义

### 3. 层级组织架构
- 部门层级（parent_id 自引用）
- 用户管理层级（manager_id 自引用）
- 灵活的组织结构支持

### 4. 完整的招聘流程
- 需求 → 职位 → 申请 → 面试 → 录用
- AI 辅助简历分析和面试
- 状态追踪和转换

### 5. 扩展性设计
- JSONB 字段存储灵活配置
- 审计日志记录所有变更
- 触发器自动维护时间戳

### 6. 性能优化
- 关键字段索引
- 复合索引优化查询
- 分页查询支持

### 7. 数据完整性
- 外键约束确保引用完整性
- 检查约束验证数据范围
- 唯一约束防止重复数据

## 扩展建议

1. **文档管理**: 添加 documents 表存储合同、简历等文件
2. **工作流引擎**: 添加 workflow_definitions 和 workflow_instances
3. **薪酬管理**: 添加 payroll, salary_components 等表
4. **培训管理**: 添加 training_programs, training_records 等
5. **绩效考核**: 添加 performance_reviews, goals 等表