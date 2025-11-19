# 招聘渠道自动对接设计方案

## 1. 渠道对接架构

### 支持的招聘渠道
- **智联招聘** - API 接口
- **前程无忧** - API 接口  
- **Boss直聘** - 爬虫/API
- **拉勾网** - API 接口
- **猎聘网** - API 接口
- **LinkedIn** - API 接口
- **内推渠道** - 内部系统

### 对接方式
1. **API 直连** - 官方 API 接口（推荐）
2. **邮件同步** - 通过邮件解析简历
3. **文件导入** - 批量导入简历文件
4. **Webhook 推送** - 渠道主动推送

## 2. 数据同步流程

```
招聘渠道 → 数据清洗 → AI 预筛选 → 入库存储 → 通知 HR
```

### 同步频率
- **实时同步** - Webhook 推送（优先级：高）
- **定时同步** - 每小时/每日同步
- **手动同步** - HR 主动触发

## 3. 实现架构

### 技术栈
- **队列处理**: Redis + Bull Queue
- **数据解析**: 各渠道适配器
- **AI 处理**: GLM-4 智能筛选
- **存储**: Supabase PostgreSQL

### 核心组件
```
ChannelManager → ChannelAdapter → DataProcessor → AIScreener → DatabaseSaver
```

## 4. 配置方案

### 渠道配置表
```sql
CREATE TABLE recruitment_channels (
    id UUID PRIMARY KEY,
    company_id UUID REFERENCES companies(id),
    channel_name VARCHAR(100), -- '智联招聘', 'Boss直聘' etc
    channel_type VARCHAR(50),  -- 'api', 'email', 'webhook'
    config JSONB,             -- API密钥、邮箱配置等
    is_active BOOLEAN DEFAULT true,
    sync_frequency VARCHAR(20) DEFAULT 'hourly',
    last_sync_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);
```

### 同步配置
```json
{
  "zhaopin": {
    "api_key": "your_api_key",
    "api_secret": "your_secret", 
    "sync_jobs": true,
    "auto_screen": true,
    "ai_threshold": 60
  }
}
```

## 5. 企业使用流程

### 企业接入步骤
1. **渠道认证** - 提供各平台 API 密钥
2. **配置同步** - 设置同步频率和筛选条件  
3. **测试对接** - 验证数据同步正常
4. **开启自动** - 启用自动同步和 AI 筛选

### 自动化处理
- ✅ **自动拉取简历** - 定时从各渠道获取新简历
- ✅ **AI 智能筛选** - 自动匹配职位需求
- ✅ **重复简历检测** - 防止重复候选人
- ✅ **状态同步** - 面试状态双向同步
- ✅ **数据统计** - 各渠道转化效果分析

## 6. 权限与安全

### API 密钥管理
- **加密存储** - 敏感信息加密
- **权限控制** - 基于角色的访问控制
- **审计日志** - 记录所有同步操作

### 数据安全
- **HTTPS 传输** - 全程加密传输
- **访问限制** - IP 白名单
- **数据备份** - 定期备份候选人数据

## 7. 监控与报警

### 同步监控
- **成功率监控** - 同步成功/失败比例
- **延迟监控** - 数据同步延迟时间
- **错误报警** - 同步失败及时通知

### 渠道效果分析
- **简历质量** - AI 评分分布
- **转化率** - 各渠道面试通过率
- **成本分析** - 每个录用候选人成本

## 8. 未来扩展

### 智能推荐
- **职位匹配** - AI 推荐最适合的职位
- **渠道优化** - 推荐最有效的招聘渠道
- **薪资建议** - 基于市场数据的薪资建议

### 高级功能
- **批量操作** - 批量邀请面试
- **自动回复** - AI 自动回复候选人
- **视频面试** - 集成在线面试系统