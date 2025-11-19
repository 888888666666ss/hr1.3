-- Job Requisitions Table
CREATE TABLE IF NOT EXISTS job_reqs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  department VARCHAR(100) NOT NULL,
  location VARCHAR(100) NOT NULL,
  owner VARCHAR(100) NOT NULL,
  headcount INTEGER NOT NULL DEFAULT 1,
  job_level VARCHAR(50),
  description TEXT,
  salary_range VARCHAR(50),
  close_date DATE,
  priority VARCHAR(20) DEFAULT 'medium',
  status VARCHAR(50) DEFAULT 'Draft',
  applicant_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Channels Table
CREATE TABLE IF NOT EXISTS channels (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  type VARCHAR(50) NOT NULL,
  api_key VARCHAR(255),
  sync_enabled BOOLEAN DEFAULT false,
  last_sync TIMESTAMP,
  status VARCHAR(20) DEFAULT 'inactive',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Approvals Table
CREATE TABLE IF NOT EXISTS approvals (
  id SERIAL PRIMARY KEY,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  submitter VARCHAR(100) NOT NULL,
  department VARCHAR(100),
  submit_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(20) DEFAULT 'pending',
  priority VARCHAR(20) DEFAULT 'medium',
  details JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Approval Timeline Table
CREATE TABLE IF NOT EXISTS approval_timeline (
  id SERIAL PRIMARY KEY,
  approval_id INTEGER REFERENCES approvals(id) ON DELETE CASCADE,
  user_name VARCHAR(100) NOT NULL,
  user_role VARCHAR(100),
  action VARCHAR(50) NOT NULL,
  comment TEXT,
  action_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Candidates Table
CREATE TABLE IF NOT EXISTS candidates (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(50),
  position VARCHAR(255) NOT NULL,
  job_req_id INTEGER REFERENCES job_reqs(id),
  stage VARCHAR(50) DEFAULT 'resume_screening',
  score INTEGER,
  resume_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Interviews Table
CREATE TABLE IF NOT EXISTS interviews (
  id SERIAL PRIMARY KEY,
  candidate_id INTEGER REFERENCES candidates(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  status VARCHAR(20) DEFAULT 'scheduled',
  scheduled_time TIMESTAMP,
  score INTEGER,
  evaluation JSONB,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Offers Table  
CREATE TABLE IF NOT EXISTS offers (
  id SERIAL PRIMARY KEY,
  candidate_id INTEGER REFERENCES candidates(id) ON DELETE CASCADE,
  job_req_id INTEGER REFERENCES job_reqs(id),
  salary VARCHAR(50),
  start_date DATE,
  status VARCHAR(20) DEFAULT 'draft',
  sent_at TIMESTAMP,
  accepted_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Job Req Channels Mapping Table
CREATE TABLE IF NOT EXISTS job_req_channels (
  id SERIAL PRIMARY KEY,
  job_req_id INTEGER REFERENCES job_reqs(id) ON DELETE CASCADE,
  channel_id INTEGER REFERENCES channels(id) ON DELETE CASCADE,
  published_at TIMESTAMP,
  UNIQUE(job_req_id, channel_id)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_job_reqs_status ON job_reqs(status);
CREATE INDEX IF NOT EXISTS idx_candidates_stage ON candidates(stage);
CREATE INDEX IF NOT EXISTS idx_approvals_status ON approvals(status);
CREATE INDEX IF NOT EXISTS idx_interviews_candidate ON interviews(candidate_id);
