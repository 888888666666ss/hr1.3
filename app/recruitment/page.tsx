'use client'

import { Sidebar } from '@/components/sidebar'
import { PageHeader } from '@/components/page-header'
import { AIAssistant } from '@/components/ai-assistant'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Users, Calendar, FileText, Gift, TrendingUp, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function RecruitmentPage() {
  const stages = [
    { name: '简历筛选', count: 24, color: 'bg-blue-500', icon: FileText },
    { name: 'AI 初筛', count: 12, color: 'bg-purple-500', icon: Users },
    { name: '技术面试', count: 8, color: 'bg-orange-500', icon: Calendar },
    { name: 'HR 面试', count: 5, color: 'bg-green-500', icon: Calendar },
    { name: 'Offer', count: 2, color: 'bg-primary', icon: Gift },
  ]

  const recentActivity = [
    {
      type: 'candidate',
      name: '张三',
      action: '进入技术面试阶段',
      position: '高级前端工程师',
      time: '10分钟前',
    },
    {
      type: 'interview',
      name: '李四',
      action: '完成 AI 初筛面试',
      position: '产品经理',
      score: 88,
      time: '1小时前',
    },
    {
      type: 'offer',
      name: '王五',
      action: '接受 Offer',
      position: 'UI 设计师',
      time: '2小时前',
    },
    {
      type: 'resume',
      name: '赵六',
      action: '提交简历',
      position: '后端工程师',
      time: '3小时前',
    },
  ]

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <PageHeader
          title="招聘流程"
          description="统一的招聘流程管理中心"
        />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid gap-6 md:grid-cols-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="text-2xl font-bold text-foreground">51</div>
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">活跃候选人</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="text-2xl font-bold text-foreground">12</div>
                    <Calendar className="h-8 w-8 text-orange-500" />
                  </div>
                  <p className="text-sm text-muted-foreground">本周面试</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="text-2xl font-bold text-foreground">8</div>
                    <FileText className="h-8 w-8 text-blue-500" />
                  </div>
                  <p className="text-sm text-muted-foreground">开放岗位</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="text-2xl font-bold text-foreground">85%</div>
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                  <p className="text-sm text-muted-foreground">转化率</p>
                </CardContent>
              </Card>
            </div>

            {/* Pipeline Kanban */}
            <Card>
              <CardHeader>
                <CardTitle>招聘流程看板</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 overflow-x-auto pb-4">
                  {stages.map((stage, index) => (
                    <div key={stage.name} className="min-w-[200px] flex-shrink-0">
                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${stage.color}`}>
                            <stage.icon className="h-4 w-4 text-white" />
                          </div>
                          <h3 className="font-medium text-foreground">{stage.name}</h3>
                        </div>
                        <Badge variant="secondary">{stage.count}</Badge>
                      </div>
                      <div className="rounded-lg border-2 border-dashed border-border bg-muted/30 p-4 text-center">
                        <p className="text-sm text-muted-foreground">
                          {stage.count} 位候选人
                        </p>
                        <Button
                          variant="link"
                          size="sm"
                          className="mt-2"
                          asChild
                        >
                          <Link href="/candidates">查看详情 →</Link>
                        </Button>
                      </div>
                      {index < stages.length - 1 && (
                        <div className="mt-4 flex justify-center">
                          <ArrowRight className="h-5 w-5 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>最近动态</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                          activity.type === 'candidate' ? 'bg-blue-100 dark:bg-blue-900/30' :
                          activity.type === 'interview' ? 'bg-purple-100 dark:bg-purple-900/30' :
                          activity.type === 'offer' ? 'bg-green-100 dark:bg-green-900/30' :
                          'bg-orange-100 dark:bg-orange-900/30'
                        }`}>
                          <span className="text-sm font-semibold">
                            {activity.name[0]}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">
                            {activity.name} {activity.action}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {activity.position}
                            {activity.score && ` • 评分：${activity.score}`}
                          </p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>快速操作</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline" asChild>
                    <Link href="/job-reqs/new">
                      <FileText className="mr-2 h-4 w-4" />
                      创建新岗位需求
                    </Link>
                  </Button>
                  <Button className="w-full justify-start" variant="outline" asChild>
                    <Link href="/resumes/upload">
                      <Users className="mr-2 h-4 w-4" />
                      上传候选人简历
                    </Link>
                  </Button>
                  <Button className="w-full justify-start" variant="outline" asChild>
                    <Link href="/interviews/new">
                      <Calendar className="mr-2 h-4 w-4" />
                      安排面试
                    </Link>
                  </Button>
                  <Button className="w-full justify-start" variant="outline" asChild>
                    <Link href="/candidates">
                      <Users className="mr-2 h-4 w-4" />
                      查看候选人列表
                    </Link>
                  </Button>
                  <Button className="w-full justify-start" variant="outline" asChild>
                    <Link href="/offers">
                      <Gift className="mr-2 h-4 w-4" />
                      管理 Offer
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>

      <AIAssistant page="recruitment" />
    </div>
  )
}
