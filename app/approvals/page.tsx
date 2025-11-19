'use client'

import { Sidebar } from '@/components/sidebar'
import { PageHeader } from '@/components/page-header'
import { AIAssistant } from '@/components/ai-assistant'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, XCircle, AlertCircle, Clock, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { approveJobReq } from '@/lib/api/job-reqs'

export default function ApprovalsPage() {
  const [selectedApproval, setSelectedApproval] = useState<number | null>(null)
  const [comment, setComment] = useState('')
  const [processing, setProcessing] = useState(false)

  const approvals = [
    {
      id: 1,
      type: 'Job Requisition',
      title: 'UI 设计师',
      submitter: '王主管',
      department: '设计部',
      submitTime: '2024-01-22 10:30',
      status: 'pending',
      priority: 'medium',
      details: {
        headcount: 1,
        location: '深圳',
        salary: '15-25K',
      },
    },
    {
      id: 2,
      type: 'Job Requisition',
      title: '数据分析师',
      submitter: '李总监',
      department: '产品部',
      submitTime: '2024-01-22 14:20',
      status: 'pending',
      priority: 'high',
      details: {
        headcount: 2,
        location: '北京',
        salary: '20-35K',
      },
    },
    {
      id: 3,
      type: 'Offer Approval',
      title: '张三 - 高级前端工程师',
      submitter: '张经理',
      department: '技术部',
      submitTime: '2024-01-21 16:45',
      status: 'pending',
      priority: 'urgent',
      details: {
        salary: '35K',
        startDate: '2024-02-15',
      },
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'destructive'
      case 'high':
        return 'default'
      case 'medium':
        return 'secondary'
      default:
        return 'outline'
    }
  }

  const handleApprove = async (id: number) => {
    setProcessing(true)
    try {
      await approveJobReq(id, { action: 'approve', comment })
      alert(`已批准审批 #${id}`)
      setSelectedApproval(null)
      setComment('')
      // Reload approvals list here
    } catch (error) {
      console.error('[v0] Failed to approve:', error)
      alert('操作失败，请重试')
    } finally {
      setProcessing(false)
    }
  }

  const handleReject = async (id: number) => {
    if (!comment.trim()) {
      alert('请填写拒绝原因')
      return
    }
    setProcessing(true)
    try {
      await approveJobReq(id, { action: 'reject', comment })
      alert(`已拒绝审批 #${id}，原因：${comment}`)
      setSelectedApproval(null)
      setComment('')
      // Reload approvals list here
    } catch (error) {
      console.error('[v0] Failed to reject:', error)
      alert('操作失败，请重试')
    } finally {
      setProcessing(false)
    }
  }

  const handleRequestChanges = async (id: number) => {
    if (!comment.trim()) {
      alert('请填写需要修改的内容')
      return
    }
    setProcessing(true)
    try {
      await approveJobReq(id, { action: 'request_changes', comment })
      alert(`已要求修改审批 #${id}，说明：${comment}`)
      setSelectedApproval(null)
      setComment('')
      // Reload approvals list here
    } catch (error) {
      console.error('[v0] Failed to request changes:', error)
      alert('操作失败，请重试')
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <PageHeader title="审批中心" description="处理待审批的事项" />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid gap-6 md:grid-cols-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="text-2xl font-bold text-foreground">8</div>
                    <Clock className="h-8 w-8 text-orange-500" />
                  </div>
                  <p className="text-sm text-muted-foreground">待审批</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="text-2xl font-bold text-foreground">25</div>
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <p className="text-sm text-muted-foreground">已批准</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="text-2xl font-bold text-foreground">3</div>
                    <XCircle className="h-8 w-8 text-red-600" />
                  </div>
                  <p className="text-sm text-muted-foreground">已拒绝</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="text-2xl font-bold text-foreground">2</div>
                    <AlertCircle className="h-8 w-8 text-yellow-600" />
                  </div>
                  <p className="text-sm text-muted-foreground">待修改</p>
                </CardContent>
              </Card>
            </div>

            {/* Approval List */}
            <Card>
              <CardHeader>
                <CardTitle>待处理审批</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {approvals.map((approval) => (
                    <div
                      key={approval.id}
                      className="rounded-lg border border-border p-4 hover:bg-muted/30"
                    >
                      <div className="mb-3 flex items-start justify-between">
                        <div className="flex-1">
                          <div className="mb-2 flex items-center gap-2">
                            <Badge variant="outline">{approval.type}</Badge>
                            <Badge variant={getPriorityColor(approval.priority)}>
                              {approval.priority === 'urgent' ? '紧急' : approval.priority === 'high' ? '高' : '中'}
                            </Badge>
                          </div>
                          <h3 className="text-lg font-semibold text-foreground">
                            {approval.title}
                          </h3>
                          <div className="mt-2 flex flex-wrap gap-3 text-sm text-muted-foreground">
                            <span>提交人：{approval.submitter}</span>
                            <span>•</span>
                            <span>{approval.department}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {approval.submitTime}
                            </span>
                          </div>
                          {approval.type === 'Job Requisition' && (
                            <div className="mt-2 flex gap-4 text-sm text-foreground">
                              <span>招聘人数：{approval.details.headcount}</span>
                              <span>地点：{approval.details.location}</span>
                              <span>薪资：{approval.details.salary}</span>
                            </div>
                          )}
                          {approval.type === 'Offer Approval' && (
                            <div className="mt-2 flex gap-4 text-sm text-foreground">
                              <span>薪资：{approval.details.salary}</span>
                              <span>入职日期：{approval.details.startDate}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {selectedApproval === approval.id ? (
                        <div className="space-y-3 border-t border-border pt-3">
                          <div>
                            <label className="mb-1 block text-sm font-medium text-foreground">
                              审批意见
                            </label>
                            <textarea
                              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                              rows={3}
                              placeholder="请输入审批意见或需要修改的内容..."
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                              disabled={processing}
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleApprove(approval.id)}
                              className="bg-green-600 hover:bg-green-700"
                              disabled={processing}
                            >
                              {processing ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : <CheckCircle className="mr-1 h-4 w-4" />}
                              批准
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleRequestChanges(approval.id)}
                              disabled={processing}
                            >
                              <AlertCircle className="mr-1 h-4 w-4" />
                              要求修改
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleReject(approval.id)}
                              disabled={processing}
                            >
                              <XCircle className="mr-1 h-4 w-4" />
                              拒绝
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                setSelectedApproval(null)
                                setComment('')
                              }}
                              disabled={processing}
                            >
                              取消
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex gap-2 border-t border-border pt-3">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedApproval(approval.id)}
                          >
                            处理审批
                          </Button>
                          <Button size="sm" variant="ghost" asChild>
                            <Link href={`/job-reqs/${approval.id}`}>查看详情</Link>
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      <AIAssistant page="approvals" />
    </div>
  )
}
