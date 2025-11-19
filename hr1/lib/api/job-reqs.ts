// Job Requisitions API Client

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || ''

// Helper function to build full URL
function buildURL(path: string): string {
  // If API_BASE_URL is empty or relative, use relative path for client-side fetch
  if (!API_BASE_URL || API_BASE_URL.startsWith('/')) {
    return `/api${path}`
  }
  // Otherwise use the full base URL
  return `${API_BASE_URL}${path}`
}

export interface JobReq {
  title: string
  department: string
  hiring_manager: string
  headcount: number
  jd: string
  channels: string[]
  close_date: string
  location?: string
  level?: string
  salary_range?: string
  priority?: string
}

export interface JobReqResponse extends JobReq {
  id: number
  status: string
  created_at: string
  updated_at: string
  applicants_count?: number
}

export interface ApprovalAction {
  action: 'approve' | 'reject' | 'request_changes'
  comment?: string
}

// Fetch all job requisitions with optional status filter
export async function getJobReqs(status?: string): Promise<JobReqResponse[]> {
  let url = buildURL('/job-reqs')
  if (status) {
    url += `?status=${encodeURIComponent(status)}`
  }

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to fetch job requisitions: ${response.statusText}`)
  }
  return response.json()
}

// Create a new job requisition
export async function createJobReq(data: JobReq): Promise<JobReqResponse> {
  const response = await fetch(buildURL('/job-reqs'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error(`Failed to create job requisition: ${response.statusText}`)
  }
  return response.json()
}

// Approve/reject/request changes for a job requisition
export async function approveJobReq(id: number, action: ApprovalAction): Promise<void> {
  const response = await fetch(buildURL(`/job-reqs/${id}/approve`), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(action),
  })

  if (!response.ok) {
    throw new Error(`Failed to process approval: ${response.statusText}`)
  }
}

// Get single job requisition by ID
export async function getJobReqById(id: number): Promise<JobReqResponse> {
  const response = await fetch(buildURL(`/job-reqs/${id}`))
  if (!response.ok) {
    throw new Error(`Failed to fetch job requisition: ${response.statusText}`)
  }
  return response.json()
}
