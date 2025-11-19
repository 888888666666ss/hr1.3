'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Calendar, Clock } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const leaveRequests = [
  {
    id: 1,
    type: '年假',
    startDate: '2024-02-01',
    endDate: '2024-02-03',
    days: 3,
    status: 'approved',
    reason: '家庭旅行',
    approver: '李经理',
    submitDate: '2024-01-20',
  },
  {
    id: 2,
    type: '病假',
    startDate: '2024-01-15',
    endDate: '2024-01-15',
    days: 1,
    status: 'pending',
    reason: '身体不适',
    approver: '李经理',
    submitDate: '2024-01-14',
  },
]

const overtimeRequests = [
  {
    id: 1,
    date: '2024-01-20',
    startTime: '18:00',
    endTime: '22:00',
    hours: 4,
    status: 'approved',
    reason: '项目上线',
    approver: '李经理',
  },
]

export default function LeavePage() {
  const [isLeaveDialogOpen, setIsLeaveDialogOpen] = useState(false)
  const [isOvertimeDialogOpen, setIsOvertimeDialogOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <PageHeader
        title="请假加班"
        description="申请请假和加班，查看审批记录"
      />

      <div className="flex-1 space-y-6 p-6">
        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>剩余年假</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">7天</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>已用年假</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">3天</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>本月加班</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">12小时</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>可调休</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">1.5天</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="leave" className="w-full">
          <div className="flex items-center justify-between mb-6">
            <TabsList>
              <TabsTrigger value="leave">请假记录</TabsTrigger>
              <TabsTrigger value="overtime">加班记录</TabsTrigger>
            </TabsList>
            <div className="flex gap-2">
              <Button onClick={() => setIsLeaveDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                申请请假
              </Button>
              <Button variant="outline" onClick={() => setIsOvertimeDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                申请加班
              </Button>
            </div>
          </div>

          <TabsContent value="leave" className="space-y-4">
            {leaveRequests.map((request) => (
              <Card key={request.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6 flex-1">
                      <div className="flex flex-col items-center gap-2">
                        <Calendar className="h-8 w-8 text-primary" />
                        <Badge>{request.type}</Badge>
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-muted-foreground">请假时间:</span>
                          <span className="font-medium">
                            {request.startDate} ~ {request.endDate} (共{request.days}天)
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-muted-foreground">请假原因:</span>
                          <span>{request.reason}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-muted-foreground">审批人:</span>
                          <span>{request.approver}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant={
                      request.status === 'approved' ? 'default' :
                      request.status === 'pending' ? 'secondary' : 'destructive'
                    }>
                      {request.status === 'approved' ? '已批准' :
                       request.status === 'pending' ? '审批中' : '已拒绝'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="overtime" className="space-y-4">
            {overtimeRequests.map((request) => (
              <Card key={request.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6 flex-1">
                      <div className="flex flex-col items-center gap-2">
                        <Clock className="h-8 w-8 text-primary" />
                        <span className="text-sm font-medium">{request.hours}小时</span>
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-muted-foreground">加班日期:</span>
                          <span className="font-medium">{request.date}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-muted-foreground">加班时段:</span>
                          <span>{request.startTime} - {request.endTime}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-muted-foreground">加班原因:</span>
                          <span>{request.reason}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant={request.status === 'approved' ? 'default' : 'secondary'}>
                      {request.status === 'approved' ? '已批准' : '审批中'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      {/* Leave Request Dialog */}
      <Dialog open={isLeaveDialogOpen} onOpenChange={setIsLeaveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>申请请假</DialogTitle>
            <DialogDescription>填写请假信息并提交审批</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="leave-type">请假类型 *</Label>
              <Select>
                <SelectTrigger id="leave-type">
                  <SelectValue placeholder="选择请假类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="annual">年假</SelectItem>
                  <SelectItem value="sick">病假</SelectItem>
                  <SelectItem value="personal">事假</SelectItem>
                  <SelectItem value="compensatory">调休</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-date">开始日期 *</Label>
                <Input id="start-date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-date">结束日期 *</Label>
                <Input id="end-date" type="date" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="leave-reason">请假原因 *</Label>
              <Textarea id="leave-reason" placeholder="请说明请假原因..." rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsLeaveDialogOpen(false)}>
              取消
            </Button>
            <Button>提交申请</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Overtime Request Dialog */}
      <Dialog open={isOvertimeDialogOpen} onOpenChange={setIsOvertimeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>申请加班</DialogTitle>
            <DialogDescription>填写加班信息并提交审批</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="overtime-date">加班日期 *</Label>
              <Input id="overtime-date" type="date" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-time">开始时间 *</Label>
                <Input id="start-time" type="time" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-time">结束时间 *</Label>
                <Input id="end-time" type="time" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="overtime-reason">加班原因 *</Label>
              <Textarea id="overtime-reason" placeholder="请说明加班原因..." rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOvertimeDialogOpen(false)}>
              取消
            </Button>
            <Button>提交申请</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
