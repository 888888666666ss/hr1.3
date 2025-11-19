'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, Search, Edit, Eye, Sparkles, ExternalLink } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const mockPositions = [
  {
    id: 1,
    title: '高级前端工程师',
    department: '技术部',
    status: 'active',
    openPositions: 2,
    applicants: 23,
    description: '负责公司核心产品的前端开发工作，要求3年以上React经验...',
    requirements: '本科及以上学历\n3年以上前端开发经验\n熟练掌握React/Vue...',
    salary: '25K-40K',
    location: '北京',
    publishedAt: '2024-01-15',
  },
  {
    id: 2,
    title: '产品经理',
    department: '产品部',
    status: 'active',
    openPositions: 1,
    applicants: 45,
    description: '负责产品规划、需求分析和项目管理...',
    requirements: '本科及以上学历\n5年以上产品经验\n有B端产品经验优先...',
    salary: '30K-50K',
    location: '北京',
    publishedAt: '2024-01-10',
  },
  {
    id: 3,
    title: 'UI设计师',
    department: '设计部',
    status: 'closed',
    openPositions: 0,
    applicants: 67,
    description: '负责产品界面设计、交互设计等工作...',
    requirements: '本科及以上学历\n3年以上UI设计经验\n精通Figma...',
    salary: '20K-35K',
    location: '上海',
    publishedAt: '2023-12-20',
  },
]

export default function PositionsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isGeneratingJD, setIsGeneratingJD] = useState(false)

  const filteredPositions = mockPositions.filter(pos => {
    const matchesSearch = pos.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pos.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || pos.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleGenerateJD = () => {
    setIsGeneratingJD(true)
    setTimeout(() => {
      setIsGeneratingJD(false)
      // AI生成JD内容会填充到表单中
    }, 2000)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <PageHeader
        title="岗位管理"
        description="管理所有在招岗位，编辑职位描述和任职要求"
      />

      <div className="flex-1 space-y-6 p-6">
        {/* Filters */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-1 items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="搜索岗位名称或部门..."
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
                <SelectItem value="active">招聘中</SelectItem>
                <SelectItem value="closed">已关闭</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={() => setIsCreateOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            创建新岗位
          </Button>
        </div>

        {/* Position Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPositions.map((position) => (
            <Card key={position.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{position.title}</CardTitle>
                    <CardDescription>{position.department}</CardDescription>
                  </div>
                  <Badge variant={position.status === 'active' ? 'default' : 'secondary'}>
                    {position.status === 'active' ? '招聘中' : '已关闭'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">薪资范围</span>
                    <span className="font-medium">{position.salary}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">工作地点</span>
                    <span className="font-medium">{position.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">开放岗位</span>
                    <span className="font-medium">{position.openPositions} 个</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">申请人数</span>
                    <span className="font-medium text-primary">{position.applicants} 人</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="mr-1.5 h-3.5 w-3.5" />
                    查看详情
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="mr-1.5 h-3.5 w-3.5" />
                    编辑
                  </Button>
                </div>

                {position.status === 'active' && (
                  <Button variant="secondary" size="sm" className="w-full">
                    <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                    发布到渠道
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Create Position Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>创建新岗位</DialogTitle>
            <DialogDescription>填写岗位信息，或使用AI生成职位描述</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">岗位名称 *</Label>
                <Input id="title" placeholder="例如：高级前端工程师" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">所属部门 *</Label>
                <Select>
                  <SelectTrigger id="department">
                    <SelectValue placeholder="选择部门" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tech">技术部</SelectItem>
                    <SelectItem value="product">产品部</SelectItem>
                    <SelectItem value="design">设计部</SelectItem>
                    <SelectItem value="sales">销售部</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="salary">薪资范围</Label>
                <Input id="salary" placeholder="例如：25K-40K" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">工作地点</Label>
                <Input id="location" placeholder="例如：北京" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="description">职位描述</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleGenerateJD}
                  disabled={isGeneratingJD}
                >
                  <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                  {isGeneratingJD ? 'AI生成中...' : 'AI生成JD'}
                </Button>
              </div>
              <Textarea
                id="description"
                placeholder="描述岗位职责和工作内容..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="requirements">任职要求</Label>
              <Textarea
                id="requirements"
                placeholder="列出任职要求和技能要求..."
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
              取消
            </Button>
            <Button>创建岗位</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
