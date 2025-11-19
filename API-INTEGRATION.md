# API Integration Guide

This document explains how the HR SaaS system integrates with backend APIs.

## API Client Library

Location: `lib/api/job-reqs.ts`

The API client provides type-safe functions for interacting with the job requisitions API:

### Functions

#### `getJobReqs(status?: string): Promise<JobReqResponse[]>`
Fetches all job requisitions with optional status filtering.

**Example:**
\`\`\`typescript
const allReqs = await getJobReqs()
const openReqs = await getJobReqs('Open')
\`\`\`

#### `createJobReq(data: JobReq): Promise<JobReqResponse>`
Creates a new job requisition.

**Example:**
\`\`\`typescript
const newReq = await createJobReq({
  title: '高级前端工程师',
  department: '技术部',
  hiring_manager: '张经理',
  headcount: 2,
  jd: '岗位职责...',
  channels: ['智联招聘', 'Boss直聘'],
  close_date: '2024-03-15'
})
\`\`\`

#### `approveJobReq(id: number, action: ApprovalAction): Promise<void>`
Processes approval actions (approve, reject, request_changes).

**Example:**
\`\`\`typescript
await approveJobReq(123, {
  action: 'approve',
  comment: '同意招聘'
})

await approveJobReq(456, {
  action: 'reject',
  comment: '暂不招聘'
})
\`\`\`

#### `getJobReqById(id: number): Promise<JobReqResponse>`
Fetches a single job requisition by ID.

**Example:**
\`\`\`typescript
const req = await getJobReqById(123)
\`\`\`

## Configuration

Set the API base URL via environment variable:

\`\`\`env
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
\`\`\`

If not set, defaults to `/api` for local API routes.

## Error Handling

All API functions throw errors on failure. Implement try-catch blocks:

\`\`\`typescript
try {
  const reqs = await getJobReqs()
  setJobReqs(reqs)
} catch (error) {
  console.error('Failed to load job requisitions:', error)
  // Fallback to mock data or show error message
}
\`\`\`

## API Endpoints

Based on the OpenAPI specification:

- `GET /job-reqs` - List job requisitions (with optional status query param)
- `POST /job-reqs` - Create new job requisition
- `POST /job-reqs/{id}/approve` - Approve/reject/request changes

## Data Types

### JobReq (Request)
\`\`\`typescript
{
  title: string
  department: string
  hiring_manager: string
  headcount: number
  jd: string
  channels: string[]
  close_date: string
}
\`\`\`

### JobReqResponse (Response)
\`\`\`typescript
{
  id: number
  status: string
  created_at: string
  updated_at: string
  applicants_count?: number
  ...JobReq
}
\`\`\`

### ApprovalAction
\`\`\`typescript
{
  action: 'approve' | 'reject' | 'request_changes'
  comment?: string
}
\`\`\`

## Integration Points

The following pages integrate with the API:

1. **Job Requisitions List** (`app/job-reqs/page.tsx`)
   - Loads job reqs on mount
   - Creates new job reqs via form submission
   - Filters by status

2. **Approvals** (`app/approvals/page.tsx`)
   - Processes approval actions with API calls
   - Handles approve/reject/request changes

3. **Job Req Detail** (`app/job-reqs/[id]/page.tsx`)
   - Can be extended to load single job req data

## Future Enhancements

- Add pagination support
- Implement real-time updates via WebSocket
- Add bulk operations API
- Implement search functionality
- Add file upload support for attachments
