-- Insert sample job requisitions
INSERT INTO job_reqs (title, department, location, owner, headcount, job_level, description, salary_range, close_date, priority, status, applicant_count) VALUES
('高级前端工程师', '技术部', '北京', '张经理', 2, '高级', '负责公司核心产品的前端开发工作', '25-40K', '2024-03-15', 'high', 'Open', 45),
('产品经理', '产品部', '上海', '李总监', 1, '中级', '负责产品规划和需求管理', '20-30K', '2024-03-20', 'medium', 'Open', 32),
('UI 设计师', '设计部', '深圳', '王主管', 1, '中级', '负责产品界面设计和用户体验优化', '15-25K', '2024-03-25', 'medium', 'Pending Approval', 28),
('后端工程师', '技术部', '北京', '张经理', 3, '高级', '负责后端服务开发和架构设计', '25-45K', '2024-04-01', 'low', 'Draft', 0);

-- Insert sample channels
INSERT INTO channels (name, type, api_key, sync_enabled, last_sync, status) VALUES
('BOSS 直聘', 'Job Board', 'boss_api_***********', true, '2024-01-22 10:30:00', 'active'),
('智联招聘', 'Job Board', 'zhilian_***********', true, '2024-01-22 09:15:00', 'active'),
('前程无忧', 'Job Board', 'not_configured', false, NULL, 'inactive'),
('拉勾网', 'Job Board', 'lagou_***********', true, '2024-01-22 11:00:00', 'active'),
('猎聘', 'Executive Search', 'not_configured', false, NULL, 'inactive');

-- Insert sample approvals
INSERT INTO approvals (type, title, submitter, department, status, priority, details) VALUES
('Job Requisition', 'UI 设计师', '王主管', '设计部', 'pending', 'medium', '{"headcount": 1, "location": "深圳", "salary": "15-25K"}'),
('Job Requisition', '数据分析师', '李总监', '产品部', 'pending', 'high', '{"headcount": 2, "location": "北京", "salary": "20-35K"}'),
('Offer Approval', '张三 - 高级前端工程师', '张经理', '技术部', 'pending', 'urgent', '{"salary": "35K", "startDate": "2024-02-15"}');

-- Insert sample candidates
INSERT INTO candidates (name, email, phone, position, job_req_id, stage, score, resume_url) VALUES
('张三', 'zhangsan@email.com', '138-0000-0001', '高级前端工程师', 1, 'technical_interview', 92, '/resumes/1.pdf'),
('李四', 'lisi@email.com', '138-0000-0002', '产品经理', 2, 'hr_interview', 88, '/resumes/2.pdf'),
('王五', 'wangwu@email.com', '138-0000-0003', 'UI 设计师', 3, 'ai_screening', 85, '/resumes/3.pdf');

-- Insert sample interviews
INSERT INTO interviews (candidate_id, type, status, score, evaluation) VALUES
(1, 'AI Screening', 'completed', 88, '{"technical": 92, "experience": 85, "communication": 88, "learning": 90}'),
(2, 'On-site', 'scheduled', NULL, NULL),
(3, 'AI Screening', 'in_progress', NULL, NULL);
