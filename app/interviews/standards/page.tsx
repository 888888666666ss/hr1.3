import { Sidebar } from '@/components/sidebar'
import { PageHeader } from '@/components/page-header'
import { AIAssistant } from '@/components/ai-assistant'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

export default function InterviewStandardsPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <PageHeader
          title="面试标准配置"
          description="配置 AI 面试的评价标准和问题库"
        />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-4xl space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>技能评估标准</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>技术能力权重 (40%)</Label>
                  <textarea
                    rows={3}
                    defaultValue="评估候选人的专业技能、技术深度、解决问题能力"
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div className="space-y-2">
                  <Label>工作经验权重 (30%)</Label>
                  <textarea
                    rows={3}
                    defaultValue="考察项目经验、团队协作、业务理解能力"
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div className="space-y-2">
                  <Label>沟通能力权重 (20%)</Label>
                  <textarea
                    rows={3}
                    defaultValue="评估表达能力、逻辑思维、问题理解能力"
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div className="space-y-2">
                  <Label>学习能力权重 (10%)</Label>
                  <textarea
                    rows={3}
                    defaultValue="考察学习意愿、适应能力、成长潜力"
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI 面试问题库</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  '请介绍一下你的工作经历和主要项目',
                  '描述一个你解决过的技术难题',
                  '你如何保持技术学习和成长',
                  '谈谈你对团队协作的理解',
                ].map((question, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border border-border p-3"
                  >
                    <span className="text-sm text-foreground">{question}</span>
                    <Button variant="ghost" size="sm">
                      编辑
                    </Button>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  添加问题
                </Button>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-3">
              <Button variant="outline">重置</Button>
              <Button>保存配置</Button>
            </div>
          </div>
        </main>
      </div>

      <AIAssistant page="interviews" />
    </div>
  )
}
