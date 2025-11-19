import { Sidebar } from '@/components/sidebar'
import { PageHeader } from '@/components/page-header'
import { AIAssistant } from '@/components/ai-assistant'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sparkles, CheckCircle, AlertCircle, Download } from 'lucide-react'
import Link from 'next/link'

export default function InterviewReportPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <PageHeader
          title="AI 面试报告"
          description="候选人：张三 - 高级前端工程师"
        >
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            导出
          </Button>
          <Button asChild>
            <Link href="/candidates">加入候选人池</Link>
          </Button>
        </PageHeader>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-4xl space-y-6">
            {/* Overall Score */}
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <Sparkles className="h-5 w-5" />
                      <span className="text-sm font-medium">AI 面试评分</span>
                    </div>
                    <div className="text-5xl font-bold">88</div>
                    <p className="mt-2 text-sm opacity-90">
                      该候选人表现良好，建议进入技术面试环节
                    </p>
                  </div>
                  <Badge className="bg-primary-foreground text-primary">
                    通过
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Evaluation Details */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    表现优秀
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="mb-1 text-sm font-medium text-foreground">
                      技术深度
                    </p>
                    <p className="text-xs text-muted-foreground">
                      对 React 生态有深入理解，能够清晰阐述技术原理
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 text-sm font-medium text-foreground">
                      问题解决能力
                    </p>
                    <p className="text-xs text-muted-foreground">
                      思路清晰，能够系统性地分析和解决问题
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 text-sm font-medium text-foreground">
                      表达能力
                    </p>
                    <p className="text-xs text-muted-foreground">
                      逻辑清晰，表达流畅，善于举例说明
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                    需要关注
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="mb-1 text-sm font-medium text-foreground">
                      后端经验
                    </p>
                    <p className="text-xs text-muted-foreground">
                      对后端技术了解较少，需要在后续工作中补充
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 text-sm font-medium text-foreground">
                      项目管理
                    </p>
                    <p className="text-xs text-muted-foreground">
                      缺乏项目整体把控经验，建议在面试中进一步确认
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Dimension Scores */}
            <Card>
              <CardHeader>
                <CardTitle>评估维度</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: '技术能力', score: 92 },
                  { name: '工作经验', score: 85 },
                  { name: '沟通能力', score: 88 },
                  { name: '学习能力', score: 90 },
                ].map((item) => (
                  <div key={item.name}>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">
                        {item.name}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {item.score}%
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-secondary">
                      <div
                        className="h-2 rounded-full bg-primary"
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Interview Conversation */}
            <Card>
              <CardHeader>
                <CardTitle>面试对话记录</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      role: 'ai',
                      content: '你好！请简单介绍一下你的工作经历。',
                    },
                    {
                      role: 'user',
                      content:
                        '我有5年前端开发经验，主要使用 React 技术栈...',
                    },
                    {
                      role: 'ai',
                      content: '能详细说说你在 React 项目中的具体职责吗？',
                    },
                    {
                      role: 'user',
                      content: '我主要负责前端架构设计和核心功能开发...',
                    },
                  ].map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg px-4 py-2 text-sm ${
                          message.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary text-secondary-foreground'
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recommendation */}
            <Card>
              <CardHeader>
                <CardTitle>AI 推荐建议</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  综合评估结果，该候选人技术能力扎实，工作经验丰富，表达清晰。建议安排技术面试，重点考察其在复杂项目中的实战能力和团队协作经验。同时可以了解其对后端技术的学习意愿和职业发展规划。
                </p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      <AIAssistant page="interviews" />
    </div>
  )
}
