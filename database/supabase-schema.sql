-- ===========================================
-- HR SaaS System - Supabase SQL Schema
-- ===========================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ===========================================
-- 1. CORE SYSTEM TABLES
-- ===========================================

-- Companies (Multi-tenant)
CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    domain VARCHAR(100) UNIQUE NOT NULL, -- company subdomain
    subscription_plan VARCHAR(50) DEFAULT 'basic', -- basic, pro, enterprise
    subscription_status VARCHAR(20) DEFAULT 'active', -- active, suspended, cancelled
    settings JSONB DEFAULT '{}', -- company-specific settings
    logo_url TEXT,
    industry VARCHAR(100),
    size_category VARCHAR(50), -- startup, small, medium, large
    country VARCHAR(100),
    timezone VARCHAR(50) DEFAULT 'UTC',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===========================================
-- 2. USER MANAGEMENT & AUTHENTICATION
-- ===========================================

-- Roles
CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    is_system_role BOOLEAN DEFAULT false, -- system vs custom roles
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(company_id, name)
);

-- Permissions
CREATE TABLE permissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL, -- e.g., 'recruit.create', 'employee.view'
    module VARCHAR(50) NOT NULL, -- e.g., 'recruitment', 'employee'
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Role Permissions (RBAC)
CREATE TABLE role_permissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
    permission_id UUID REFERENCES permissions(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(role_id, permission_id)
);

-- Users (extends Supabase auth.users)
CREATE TABLE users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    employee_id VARCHAR(50), -- employee number
    role_id UUID REFERENCES roles(id),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    full_name VARCHAR(255),
    avatar_url TEXT,
    department_id UUID, -- FK to departments
    position_id UUID, -- FK to positions
    manager_id UUID REFERENCES users(id), -- self-reference for hierarchy
    hire_date DATE,
    employment_status VARCHAR(20) DEFAULT 'active', -- active, inactive, terminated
    is_active BOOLEAN DEFAULT true,
    last_login_at TIMESTAMP WITH TIME ZONE,
    preferences JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===========================================
-- 3. ORGANIZATION STRUCTURE
-- ===========================================

-- Departments
CREATE TABLE departments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    parent_id UUID REFERENCES departments(id), -- for hierarchical structure
    manager_id UUID REFERENCES users(id),
    budget DECIMAL(15,2),
    cost_center VARCHAR(50),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Positions/Job Titles
CREATE TABLE positions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    department_id UUID REFERENCES departments(id),
    level VARCHAR(50), -- junior, mid, senior, lead, manager, director
    salary_range_min DECIMAL(12,2),
    salary_range_max DECIMAL(12,2),
    requirements JSONB, -- skills, experience, education
    responsibilities JSONB,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add foreign key constraints for users table
ALTER TABLE users 
ADD CONSTRAINT fk_users_department 
FOREIGN KEY (department_id) REFERENCES departments(id),
ADD CONSTRAINT fk_users_position 
FOREIGN KEY (position_id) REFERENCES positions(id);

-- ===========================================
-- 4. RECRUITMENT MODULE
-- ===========================================

-- Recruitment Requests
CREATE TABLE recruitment_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    position_id UUID REFERENCES positions(id),
    department_id UUID REFERENCES departments(id),
    requested_by UUID REFERENCES users(id),
    approved_by UUID REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    required_skills JSONB,
    preferred_skills JSONB,
    headcount INTEGER DEFAULT 1,
    urgency_level VARCHAR(20) DEFAULT 'medium', -- low, medium, high, urgent
    employment_type VARCHAR(50) DEFAULT 'full_time', -- full_time, part_time, contract, intern
    remote_allowed BOOLEAN DEFAULT false,
    salary_budget_min DECIMAL(12,2),
    salary_budget_max DECIMAL(12,2),
    target_start_date DATE,
    status VARCHAR(20) DEFAULT 'draft', -- draft, pending, approved, rejected, on_hold, completed
    approval_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Jobs/Job Postings
CREATE TABLE jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    recruitment_request_id UUID REFERENCES recruitment_requests(id),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE, -- for public URLs
    description TEXT,
    requirements TEXT,
    benefits TEXT,
    location VARCHAR(255),
    employment_type VARCHAR(50) DEFAULT 'full_time',
    remote_allowed BOOLEAN DEFAULT false,
    salary_range_min DECIMAL(12,2),
    salary_range_max DECIMAL(12,2),
    application_deadline DATE,
    status VARCHAR(20) DEFAULT 'draft', -- draft, published, paused, closed
    is_internal_only BOOLEAN DEFAULT false, -- internal vs external posting
    posted_at TIMESTAMP WITH TIME ZONE,
    job_board_settings JSONB, -- settings for external job boards
    application_form_fields JSONB, -- custom form fields
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Candidates
CREATE TABLE candidates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    full_name VARCHAR(255) NOT NULL,
    resume_url TEXT,
    portfolio_url TEXT,
    linkedin_url TEXT,
    github_url TEXT,
    current_company VARCHAR(255),
    current_position VARCHAR(255),
    experience_years INTEGER,
    expected_salary_min DECIMAL(12,2),
    expected_salary_max DECIMAL(12,2),
    availability_date DATE,
    location VARCHAR(255),
    is_remote_preferred BOOLEAN DEFAULT false,
    source VARCHAR(100), -- referral, job_board, social_media, etc.
    source_details TEXT,
    tags JSONB, -- skills, notes, etc.
    status VARCHAR(20) DEFAULT 'new', -- new, screening, interviewing, offer, hired, rejected
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(company_id, email)
);

-- Job Applications
CREATE TABLE job_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
    candidate_id UUID REFERENCES candidates(id) ON DELETE CASCADE,
    cover_letter TEXT,
    custom_responses JSONB, -- responses to custom application questions
    application_status VARCHAR(20) DEFAULT 'submitted', -- submitted, screening, interviewing, offer, hired, rejected
    current_stage VARCHAR(100), -- application, phone_screen, technical_interview, final_interview, etc.
    stage_order INTEGER DEFAULT 1,
    applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    rejection_reason TEXT,
    notes JSONB, -- recruiter notes, interview feedback
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(job_id, candidate_id)
);

-- ===========================================
-- 5. AI FEATURES
-- ===========================================

-- AI Resume Analysis
CREATE TABLE ai_resume_analyses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    candidate_id UUID REFERENCES candidates(id) ON DELETE CASCADE,
    job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
    resume_text TEXT,
    analysis_results JSONB, -- skills match, experience match, overall score, etc.
    match_score DECIMAL(5,2), -- 0-100 match score
    extracted_skills JSONB,
    extracted_experience JSONB,
    strengths JSONB,
    concerns JSONB,
    recommendations JSONB,
    ai_model_version VARCHAR(50),
    processed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI Interview Questions
CREATE TABLE ai_interview_questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    job_id UUID REFERENCES jobs(id),
    position_type VARCHAR(255),
    category VARCHAR(100), -- technical, behavioral, situational, company_culture
    question_text TEXT NOT NULL,
    ideal_answer TEXT,
    evaluation_criteria JSONB,
    difficulty_level VARCHAR(20) DEFAULT 'medium', -- easy, medium, hard
    estimated_duration INTEGER, -- in minutes
    tags JSONB,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Interview Records
CREATE TABLE interview_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_application_id UUID REFERENCES job_applications(id) ON DELETE CASCADE,
    interviewer_id UUID REFERENCES users(id),
    interview_type VARCHAR(50) DEFAULT 'video_call', -- video_call, phone, in_person, ai_assisted
    scheduled_at TIMESTAMP WITH TIME ZONE,
    started_at TIMESTAMP WITH TIME ZONE,
    ended_at TIMESTAMP WITH TIME ZONE,
    status VARCHAR(20) DEFAULT 'scheduled', -- scheduled, in_progress, completed, cancelled, no_show
    meeting_url TEXT,
    location TEXT,
    questions_asked JSONB, -- array of question IDs and responses
    interviewer_notes TEXT,
    candidate_evaluation JSONB, -- scores, feedback
    overall_rating INTEGER CHECK (overall_rating >= 1 AND overall_rating <= 5),
    recommendation VARCHAR(20), -- hire, no_hire, maybe
    recording_url TEXT,
    transcript TEXT,
    ai_analysis JSONB, -- AI analysis of interview performance
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===========================================
-- 6. EMPLOYEE MASTER DATA
-- ===========================================

-- Employee Details (extends users table)
CREATE TABLE employee_details (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
    employee_number VARCHAR(50) UNIQUE,
    personal_email VARCHAR(255),
    date_of_birth DATE,
    gender VARCHAR(20),
    nationality VARCHAR(100),
    marital_status VARCHAR(20),
    emergency_contact_name VARCHAR(255),
    emergency_contact_phone VARCHAR(20),
    emergency_contact_relationship VARCHAR(100),
    address_line1 TEXT,
    address_line2 TEXT,
    city VARCHAR(100),
    state_province VARCHAR(100),
    postal_code VARCHAR(20),
    country VARCHAR(100),
    tax_id VARCHAR(50),
    bank_account_number VARCHAR(100),
    bank_name VARCHAR(255),
    bank_routing_number VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Employment History
CREATE TABLE employment_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    position_id UUID REFERENCES positions(id),
    department_id UUID REFERENCES departments(id),
    start_date DATE NOT NULL,
    end_date DATE,
    salary DECIMAL(12,2),
    employment_type VARCHAR(50),
    status VARCHAR(20) DEFAULT 'active', -- active, terminated, transferred
    reason_for_change TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===========================================
-- 7. ATTENDANCE MANAGEMENT
-- ===========================================

-- Attendance Records
CREATE TABLE attendance_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    clock_in_time TIMESTAMP WITH TIME ZONE,
    clock_out_time TIMESTAMP WITH TIME ZONE,
    break_start_time TIMESTAMP WITH TIME ZONE,
    break_end_time TIMESTAMP WITH TIME ZONE,
    total_hours DECIMAL(4,2),
    overtime_hours DECIMAL(4,2),
    status VARCHAR(20) DEFAULT 'present', -- present, absent, half_day, late, early_departure
    location VARCHAR(255), -- office, remote, client_site
    ip_address INET, -- for remote attendance tracking
    device_info JSONB, -- device used for clock in/out
    notes TEXT,
    approved_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, date)
);

-- Leave Requests
CREATE TABLE leave_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    leave_type VARCHAR(50) NOT NULL, -- vacation, sick, personal, maternity, paternity
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    days_requested DECIMAL(3,1), -- can be half days
    reason TEXT,
    status VARCHAR(20) DEFAULT 'pending', -- pending, approved, rejected, cancelled
    approved_by UUID REFERENCES users(id),
    approval_date TIMESTAMP WITH TIME ZONE,
    rejection_reason TEXT,
    attachment_url TEXT, -- medical certificate, etc.
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Leave Balances
CREATE TABLE leave_balances (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    leave_type VARCHAR(50) NOT NULL,
    year INTEGER NOT NULL,
    allocated_days DECIMAL(4,1),
    used_days DECIMAL(4,1) DEFAULT 0,
    carried_forward_days DECIMAL(4,1) DEFAULT 0,
    expires_on DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, leave_type, year)
);

-- ===========================================
-- 8. SYSTEM LOGS & AUDIT
-- ===========================================

-- System Logs
CREATE TABLE system_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(100), -- e.g., 'candidate', 'job', 'user'
    resource_id UUID, -- ID of the affected resource
    ip_address INET,
    user_agent TEXT,
    details JSONB, -- additional context about the action
    severity VARCHAR(20) DEFAULT 'info', -- debug, info, warning, error, critical
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===========================================
-- 9. NOTIFICATION SYSTEM
-- ===========================================

-- Notifications
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT,
    type VARCHAR(50), -- email, push, in_app
    category VARCHAR(50), -- recruitment, attendance, system
    priority VARCHAR(20) DEFAULT 'medium', -- low, medium, high
    is_read BOOLEAN DEFAULT false,
    action_url TEXT,
    metadata JSONB,
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    read_at TIMESTAMP WITH TIME ZONE
);

-- ===========================================
-- 10. INDEXES FOR PERFORMANCE
-- ===========================================

-- Companies
CREATE INDEX idx_companies_domain ON companies(domain);

-- Users
CREATE INDEX idx_users_company_id ON users(company_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_department_id ON users(department_id);
CREATE INDEX idx_users_manager_id ON users(manager_id);

-- Candidates
CREATE INDEX idx_candidates_company_id ON candidates(company_id);
CREATE INDEX idx_candidates_email ON candidates(email);
CREATE INDEX idx_candidates_status ON candidates(status);

-- Job Applications
CREATE INDEX idx_job_applications_job_id ON job_applications(job_id);
CREATE INDEX idx_job_applications_candidate_id ON job_applications(candidate_id);
CREATE INDEX idx_job_applications_status ON job_applications(application_status);

-- Attendance
CREATE INDEX idx_attendance_user_date ON attendance_records(user_id, date);
CREATE INDEX idx_attendance_date ON attendance_records(date);

-- System Logs
CREATE INDEX idx_system_logs_company_id ON system_logs(company_id);
CREATE INDEX idx_system_logs_user_id ON system_logs(user_id);
CREATE INDEX idx_system_logs_timestamp ON system_logs(timestamp);
CREATE INDEX idx_system_logs_action ON system_logs(action);

-- ===========================================
-- 11. ROW LEVEL SECURITY (RLS) SETUP
-- ===========================================

-- Enable RLS on all tables
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_logs ENABLE ROW LEVEL SECURITY;

-- Basic RLS Policies (these can be customized based on specific requirements)

-- Users can only see data from their own company
CREATE POLICY "users_own_company" ON users
    FOR ALL USING (company_id = get_user_company_id());

CREATE POLICY "candidates_own_company" ON candidates
    FOR ALL USING (company_id = get_user_company_id());

CREATE POLICY "jobs_own_company" ON jobs
    FOR ALL USING (company_id = get_user_company_id());

-- Function to get current user's company_id
CREATE OR REPLACE FUNCTION get_user_company_id()
RETURNS UUID AS $$
    SELECT company_id FROM users WHERE id = auth.uid()
$$ LANGUAGE sql SECURITY DEFINER;

-- ===========================================
-- 12. TRIGGERS FOR AUTOMATIC UPDATES
-- ===========================================

-- Update timestamp trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

-- Add updated_at triggers to relevant tables
CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON companies
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_candidates_updated_at BEFORE UPDATE ON candidates
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_jobs_updated_at BEFORE UPDATE ON jobs
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_job_applications_updated_at BEFORE UPDATE ON job_applications
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();