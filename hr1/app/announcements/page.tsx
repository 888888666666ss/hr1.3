'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Megaphone, Pin, Calendar } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

const announcements = [
  {
    id: 1,
    title: '公司年会通知',
    content: '公司年会将于2024年2月1日在XX酒店举行，请各部门做好准备...',
    author: '人力资源部',
    date: '2024-01-20',
    isPinned: true,
    category: '重要通知',
  },
  {
    id: 2,
    title: '春节放假安排',
    content: '根据国家法定节假日安排，春节放假时间为2024年2月10日至2月17日...',
    author: '行政部',
    date: '2024-01-18',
    isPinned: true,
    category: '放假通知',
  },
  {
    id: 3,
    title: '新员工培训通知',
    content: '1月入职的新员工请于本周五下午2点到会议室参加新员工培训...',
    author: '人力资源部',
    date: '2024-01-15',
    isPinned: false,
    category: '培训通知',
  },
]

export default function AnnouncementsPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <PageHeader
        title="公告通知"
        description="查看公司公告和重要通知"
      />

      <div className="flex-1 space-y-6 p-6">
        <div className="flex justify-end">
          <Button onClick={() => setIsCreateOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            发布公告
          </Button>
        </div>

        <div className="space-y-4">
          {announcements.map((announcement) => (
            <Card key={announcement.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    {announcement.isPinned ? (
                      <Pin className="h-6 w-6 text-primary" />
                    ) : (
                      <Megaphone className="h-6 w-6 text-primary" />
                    )}
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold">{announcement.title}</h3>
                          {announcement.isPinned && (
                            <Badge variant="default" className="gap-1">
                              <Pin className="h-3 w-3" />
                              置顶
                            </Badge>
                          )}
                          <Badge variant="outline">{announcement.category}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{announcement.author}</span>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {announcement.date}
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {announcement.content}
                    </p>
                    <Button variant="link" className="p-0 h-auto">
                      查看详情 →
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Create Announcement Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>发布公告</DialogTitle>
            <DialogDescription>创建新的公司公告或通知</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">公告标题 *</Label>
              <Input id="title" placeholder="输入公告标题..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">公告分类</Label>
              <Input id="category" placeholder="例如：重要通知、放假通知等" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">公告内容 *</Label>
              <Textarea
                id="content"
                placeholder="输入公告详细内容..."
                rows={8}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
              取消
            </Button>
            <Button>发布公告</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
