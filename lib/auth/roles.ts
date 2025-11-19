export type UserRole = 'super_admin' | 'hr_admin' | 'recruiter' | 'hiring_manager' | 'employee' | 'finance'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
}

export const roleConfig: Record<UserRole, {
  label: string
  description: string
  dashboardPath: string
}> = {
  super_admin: {
    label: 'Super Admin',
    description: 'Full system access and enterprise controls',
    dashboardPath: '/admin/dashboard',
  },
  hr_admin: {
    label: 'HR Admin',
    description: 'Complete HR workflow management',
    dashboardPath: '/hr/dashboard',
  },
  recruiter: {
    label: 'Recruiter',
    description: 'Candidate pipeline and recruitment',
    dashboardPath: '/recruitment/dashboard',
  },
  hiring_manager: {
    label: 'Hiring Manager',
    description: 'Hiring requests and candidate review',
    dashboardPath: '/hiring/dashboard',
  },
  employee: {
    label: 'Employee',
    description: 'Personal profile and attendance',
    dashboardPath: '/employee/dashboard',
  },
  finance: {
    label: 'Finance',
    description: 'Payroll and financial management',
    dashboardPath: '/finance/dashboard',
  },
}

// Define navigation items for each role
export const navigationByRole: Record<UserRole, string[]> = {
  super_admin: [
    'dashboard',
    'job-reqs',
    'channels',
    'candidates',
    'ai-screening',
    'resumes',
    'interviews',
    'offers',
    'employees',
    'attendance',
    'performance',
    'salary',
    'announcements',
    'culture',
    'settings',
    'permissions',
  ],
  hr_admin: [
    'dashboard',
    'job-reqs',
    'channels',
    'candidates',
    'ai-screening',
    'resumes',
    'interviews',
    'offers',
    'onboarding',
    'employees',
    'attendance',
    'performance',
    'announcements',
    'culture',
    'settings',
  ],
  recruiter: [
    'dashboard',
    'job-reqs',
    'candidates',
    'ai-screening',
    'resumes',
    'interviews',
    'offers',
  ],
  hiring_manager: [
    'dashboard',
    'job-reqs',
    'candidates',
    'interviews',
    'employees',
    'performance',
  ],
  employee: [
    'dashboard',
    'attendance',
    'leave',
    'salary',
    'performance',
    'announcements',
    'culture',
  ],
  finance: [
    'dashboard',
    'employees',
    'salary',
    'contracts',
    'analytics',
  ],
}

// Check if user has access to a specific page
export function hasAccess(userRole: UserRole, page: string): boolean {
  return navigationByRole[userRole]?.includes(page) ?? false
}

// Mock current user - in real app, this would come from auth context
export function getCurrentUser(): User {
  // This would normally come from session/token
  return {
    id: '1',
    name: 'Admin User',
    email: 'admin@company.com',
    role: 'hr_admin',
  }
}
