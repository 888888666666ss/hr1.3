'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Search, Eye, Upload, Download, AlertCircle } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const mockContracts = [
  {
    id: 1,
    employeeName: '张三',
    position: '前端工程师',
    contractType: '劳动合同',
    startDate: '2024-01-15',
    endDate: '2027-01-14',
    daysLeft: 1095,
    status: 'active',
    uploadDate: '2024-01-10',
  },
  {
    id: 2,
    employeeName: '李四',
    position: '产品经理',
    contractType: '劳动合同',
    startDate: '2023-06-01',
    endDate: '2024-05-31',
    daysLeft: 45,
    status: 'expiring',
    uploadDate: '2023-05-25',
  },
  {
    id: 3,
    employeeName: '王五',
    position: 'UI设计师',
    contractType: '劳务合同',
    startDate: '2023-03-01',
    endDate: '2024-02-29',
    daysLeft: -15,
    status: 'expired',
    uploadDate: '2023-02-20',
  },
]

export default function ContractsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredContracts = mockContracts.filter(contract => {
    const matchesSearch = contract.employeeName.includes(searchTerm) || 
                         contract.position.includes(searchTerm)
    const matchesStatus = statusFilter === 'all' || contract.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="flex min-h-screen flex-col">
      <PageHeader
        title="合同管理"
        description="管理员工劳动合同，跟踪合同到期提醒"
      />

      <div className="flex-1 space-y-6 p-6">
        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground mb-2">有效合同</div>
              <div className="text-3xl font-bold">48</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground mb-2">即将到期(90天内)</div>
              <div className="text-3xl font-bold text-orange-600">5</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground mb-2">已过期</div>
              <div className="text-3xl font-bold text-red-600">2</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground mb-2">本月续签</div>
              <div className="text-3xl font-bold text-green-600">3</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="搜索员工姓名或岗位..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="状态筛选" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部状态</SelectItem>
                <SelectItem value="active">有效</SelectItem>
                <SelectItem value="expiring">即将到期</SelectItem>
                <SelectItem value="expired">已过期</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            上传新合同
          </Button>
        </div>

        {/* Contracts List */}
        <div className="space-y-4">
          {filteredContracts.map((contract) => (
            <Card key={contract.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <span className="text-lg font-medium text-primary">
                        {contract.employeeName.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-medium">{contract.employeeName}</h3>
                        <Badge variant={
                          contract.status === 'active' ? 'default' :
                          contract.status === 'expiring' ? 'secondary' : 'destructive'
                        }>
                          {contract.status === 'active' ? '有效' :
                           contract.status === 'expiring' ? '即将到期' : '已过期'}
                        </Badge>
                        {contract.status !== 'active' && (
                          <div className="flex items-center gap-1 text-orange-600">
                            <AlertCircle className="h-4 w-4" />
                            <span className="text-sm">需要处理</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{contract.position}</span>
                        <span>•</span>
                        <span>{contract.contractType}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-8">
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground mb-1">合同期限</div>
                      <div className="text-sm font-medium">
                        {contract.startDate} ~ {contract.endDate}
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-sm text-muted-foreground mb-1">剩余天数</div>
                      <div className={cn(
                        'text-lg font-bold',
                        contract.daysLeft < 0 ? 'text-red-600' :
                        contract.daysLeft < 90 ? 'text-orange-600' : ''
                      )}>
                        {contract.daysLeft < 0 ? '已过期' : `${contract.daysLeft}天`}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="mr-1.5 h-3.5 w-3.5" />
                        查看
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="mr-1.5 h-3.5 w-3.5" />
                        下载
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
