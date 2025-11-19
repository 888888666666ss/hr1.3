'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Plus, UserX, Search } from 'lucide-react'
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

const offboardingRequests = [
  {
    id: 1,
    employeeName: '王五',
    position: 'UI设计师',
    department: '设计部',
    submittedDate: '2024-01-15',
    expectedDate: '2024-02-15',
    reason: '个人发展',
    status: 'pending',
    handoverProgress: 60,
  },
  {
    id: 2,
    employeeName: '赵六',
    position: '销售经理',
    department: '销售部',
    submittedDate: '2024-01-10',
    expectedDate: '2024-02-10',
    reason: '家庭原因',
    status: 'approved',
    handoverProgress: 100,
  },
]

export default function OffboardingPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="flex min-h-screen flex-col">
      <PageHeader
        title="离职申请"
        description="管理员工离职申请和审批流程"
      />

      <div className="flex-1 space-y-6 p-6">
        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground mb-2">待审批</div>
              <div className="text-3xl font-bold">2</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground mb-2">已批准</div>
              <div className="text-3xl font-bold">3</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground mb-2">交接中</div>
              <div className="text-3xl font-bold text-orange-600">1</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground mb-2">已完成</div>
              <div className="text-3xl font-bold text-green-600">2</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="搜索员工姓名..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button onClick={() => setIsCreateOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            提交离职申请
          </Button>
        </div>

        {/* Offboarding List */}
        <div className="space-y-4">
          {offboardingRequests.map((request) => (
            <Card key={request.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                      <UserX className="h-6 w-6 text-red-600" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-medium">{request.employeeName}</h3>
                        <Badge variant={
                          request.status === 'approved' ? 'default' : 'secondary'
                        }>
                          {request.status === 'approved' ? '已批准' : '待审批'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{request.position}</span>
                        <span>•</span>
                        <span>{request.department}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-8">
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground mb-1">申请日期</div>
                      <div className="text-sm font-medium">{request.submittedDate}</div>
                    </div>

                    <div className="text-center">
                      <div className="text-sm text-muted-foreground mb-1">预计离职</div>
                      <div className="text-sm font-medium">{request.expectedDate}</div>
                    </div>

                    <div className="text-center">
                      <div className="text-sm text-muted-foreground mb-1">交接进度</div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all"
                            style={{ width: `${request.handoverProgress}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{request.handoverProgress}%</span>
                      </div>
                    </div>

                    <Button variant="outline" size="sm">
                      查看详情
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Create Offboarding Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>提交离职申请</DialogTitle>
            <DialogDescription>填写离职信息并提交审批</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="expected-date">预计离职日期 *</Label>
              <Input id="expected-date" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reason">离职原因 *</Label>
              <Select>
                <SelectTrigger id="reason">
                  <SelectValue placeholder="选择离职原因" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="personal">个人发展</SelectItem>
                  <SelectItem value="family">家庭原因</SelectItem>
                  <SelectItem value="health">健康问题</SelectItem>
                  <SelectItem value="other">其他原因</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="details">详细说明</Label>
              <Textarea
                id="details"
                placeholder="请详细说明离职原因..."
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
              取消
            </Button>
            <Button>提交申请</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
