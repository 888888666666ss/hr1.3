import { Sidebar } from '@/components/sidebar'
import { PageHeader } from '@/components/page-header'
import { AIAssistant } from '@/components/ai-assistant'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Edit, Pause, Play, Users } from 'lucide-react'
import Link from 'next/link'

export default function JobDetailPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <PageHeader title="高级前端工程师" description="岗位详情">
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            编辑
          </Button>
          <Button variant="outline">
            <Pause className="mr-2 h-4 w-4" />
            暂停招聘
          </Button>
        </PageHeader>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-5xl space-y-6">
            {/* Status */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Badge variant="default">招聘中</Badge>
                    <span className="text-sm text-muted-foreground">
                      发布于 2024-01-15
                    </span>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <div>
                      <span className="text-muted-foreground">申请者：</span>
                      <span className="ml-2 font-medium text-foreground">
                        45 人
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">浏览量：</span>
                      <span className="ml-2 font-medium text-foreground">
                        1,203
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 lg:grid-cols-3">
              {/* Job Details */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>基本信息</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">所属部门</span>
                      <span className="text-foreground">技术部</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">工作地点</span>
                      <span className="text-foreground">北京</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">岗位类型</span>
                      <span className="text-foreground">全职</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">薪资范围</span>
                      <span className="text-foreground">25k-40k</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>职位描述</CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-sm max-w-none text-foreground">
                    <p className="text-muted-foreground leading-relaxed">
                      我们正在寻找一位富有激情的高级前端工程师加入我们的团队。您将负责构建和维护我们的核心产品，与设计师和后端工程师紧密合作，为用户提供出色的体验。
                    </p>
                    <h4 className="mt-4 font-medium text-foreground">工作职责：</h4>
                    <ul className="text-muted-foreground">
                      <li>负责公司产品前端架构设计和技术选型</li>
                      <li>开发高质量、可维护的前端代码</li>
                      <li>优化产品性能，提升用户体验</li>
                      <li>参与产品需求讨论，提供技术方案</li>
                    </ul>
                    <h4 className="mt-4 font-medium text-foreground">任职要求：</h4>
                    <ul className="text-muted-foreground">
                      <li>5年以上前端开发经验</li>
                      <li>精通 React、Vue 等主流框架</li>
                      <li>熟悉 TypeScript、Webpack 等工具</li>
                      <li>具有良好的代码规范和团队协作能力</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>候选人管理</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full" asChild>
                      <Link href="/candidates">
                        <Users className="mr-2 h-4 w-4" />
                        查看所有候选人
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full">
                      导入简历
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>招聘渠道</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">BOSS 直聘</span>
                      <Badge variant="outline">已同步</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">智联招聘</span>
                      <Badge variant="secondary">未配置</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>

      <AIAssistant page="jobs" />
    </div>
  )
}
