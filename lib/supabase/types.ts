// 基础类型定义 - 这个文件应该通过 Supabase CLI 自动生成
// 运行: supabase gen types typescript --project-id YOUR_PROJECT_ID --schema public > lib/supabase/types.ts

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
      users: {
        Row: {
          id: string
          company_id: string
          employee_id: string | null
          role_id: string | null
          email: string
          phone: string | null
          full_name: string | null
          avatar_url: string | null
          department_id: string | null
          position_id: string | null
          manager_id: string | null
          hire_date: string | null
          employment_status: string
          is_active: boolean
          last_login_at: string | null
          preferences: any
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          company_id: string
          employee_id?: string | null
          role_id?: string | null
          email: string
          phone?: string | null
          full_name?: string | null
          avatar_url?: string | null
          department_id?: string | null
          position_id?: string | null
          manager_id?: string | null
          hire_date?: string | null
          employment_status?: string
          is_active?: boolean
          last_login_at?: string | null
          preferences?: any
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          employee_id?: string | null
          role_id?: string | null
          email?: string
          phone?: string | null
          full_name?: string | null
          avatar_url?: string | null
          department_id?: string | null
          position_id?: string | null
          manager_id?: string | null
          hire_date?: string | null
          employment_status?: string
          is_active?: boolean
          last_login_at?: string | null
          preferences?: any
          created_at?: string
          updated_at?: string
        }
      }
      candidates: {
        Row: {
          id: string
          company_id: string
          email: string
          phone: string | null
          full_name: string
          resume_url: string | null
          portfolio_url: string | null
          linkedin_url: string | null
          github_url: string | null
          current_company: string | null
          current_position: string | null
          experience_years: number | null
          expected_salary_min: number | null
          expected_salary_max: number | null
          availability_date: string | null
          location: string | null
          is_remote_preferred: boolean
          source: string | null
          source_details: string | null
          tags: any
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_id: string
          email: string
          phone?: string | null
          full_name: string
          resume_url?: string | null
          portfolio_url?: string | null
          linkedin_url?: string | null
          github_url?: string | null
          current_company?: string | null
          current_position?: string | null
          experience_years?: number | null
          expected_salary_min?: number | null
          expected_salary_max?: number | null
          availability_date?: string | null
          location?: string | null
          is_remote_preferred?: boolean
          source?: string | null
          source_details?: string | null
          tags?: any
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          email?: string
          phone?: string | null
          full_name?: string
          resume_url?: string | null
          portfolio_url?: string | null
          linkedin_url?: string | null
          github_url?: string | null
          current_company?: string | null
          current_position?: string | null
          experience_years?: number | null
          expected_salary_min?: number | null
          expected_salary_max?: number | null
          availability_date?: string | null
          location?: string | null
          is_remote_preferred?: boolean
          source?: string | null
          source_details?: string | null
          tags?: any
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      jobs: {
        Row: {
          id: string
          company_id: string
          recruitment_request_id: string | null
          title: string
          slug: string | null
          description: string | null
          requirements: string | null
          benefits: string | null
          location: string | null
          employment_type: string
          remote_allowed: boolean
          salary_range_min: number | null
          salary_range_max: number | null
          application_deadline: string | null
          status: string
          is_internal_only: boolean
          posted_at: string | null
          job_board_settings: any
          application_form_fields: any
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_id: string
          recruitment_request_id?: string | null
          title: string
          slug?: string | null
          description?: string | null
          requirements?: string | null
          benefits?: string | null
          location?: string | null
          employment_type?: string
          remote_allowed?: boolean
          salary_range_min?: number | null
          salary_range_max?: number | null
          application_deadline?: string | null
          status?: string
          is_internal_only?: boolean
          posted_at?: string | null
          job_board_settings?: any
          application_form_fields?: any
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          recruitment_request_id?: string | null
          title?: string
          slug?: string | null
          description?: string | null
          requirements?: string | null
          benefits?: string | null
          location?: string | null
          employment_type?: string
          remote_allowed?: boolean
          salary_range_min?: number | null
          salary_range_max?: number | null
          application_deadline?: string | null
          status?: string
          is_internal_only?: boolean
          posted_at?: string | null
          job_board_settings?: any
          application_form_fields?: any
          created_at?: string
          updated_at?: string
        }
      }
      // 添加更多表的类型定义...
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// 便捷类型别名
export type Company = Database['public']['Tables']['companies']['Row']
export type CompanyInsert = Database['public']['Tables']['companies']['Insert']
export type CompanyUpdate = Database['public']['Tables']['companies']['Update']

export type User = Database['public']['Tables']['users']['Row']
export type UserInsert = Database['public']['Tables']['users']['Insert']
export type UserUpdate = Database['public']['Tables']['users']['Update']

export type Candidate = Database['public']['Tables']['candidates']['Row']
export type CandidateInsert = Database['public']['Tables']['candidates']['Insert']
export type CandidateUpdate = Database['public']['Tables']['candidates']['Update']

export type Job = Database['public']['Tables']['jobs']['Row']
export type JobInsert = Database['public']['Tables']['jobs']['Insert']
export type JobUpdate = Database['public']['Tables']['jobs']['Update']

// 用户角色类型
export type UserRole = 'hr_admin' | 'hr_manager' | 'recruiter' | 'employee' | 'manager'

// 候选人状态类型
export type CandidateStatus = 'new' | 'screening' | 'interviewing' | 'offer' | 'hired' | 'rejected'

// 职位状态类型
export type JobStatus = 'draft' | 'published' | 'paused' | 'closed'

// 就业类型
export type EmploymentType = 'full_time' | 'part_time' | 'contract' | 'intern'