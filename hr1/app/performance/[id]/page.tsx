'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/sidebar'
import { PageHeader } from '@/components/page-header'
import { AIAssistant } from '@/components/ai-assistant'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sparkles } from 'lucide-react'

export default function PerformanceDetailPage() {
  const [aiComment, setAiComment] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const generateAIComment = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setAiComment(
        '张伟在本季度表现优异，技术能力突出，完成了多个重点项目的开发工作。在团队协作方面表现积极，主动帮助团队成员解决技术难题。建议继续保持学习热情，同时可以在技术管理方向进一步发展。'
      )
      setIsGenerating(false)
    }, 2000)
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <PageHeader
          title="绩效详情"
          description="张伟 - 2024-Q1 绩效评估"
        >
          <Button variant="outline">导出报告</Button>
          <Button>提交评估</Button>
        </PageHeader>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-4xl space-y-6">
            {/* Score Card */}
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="mb-2 text-sm font-medium">综合评分</div>
                    <div className="text-5xl font-bold">92</div>
                    <div className="mt-2 flex items-center gap-2">
                      <Badge className="bg-primary-foreground text-primary">
                        A 级
                      </Badge>
                      <span className="text-sm opacity-90">优秀员工</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm opacity-90">评估周期</p>
                    <p className="text-lg font-medium">2024 第一季度</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Evaluation Criteria */}
            <Card>
              <CardHeader>
                <CardTitle>评估维度</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: '工作业绩', score: 95, weight: 40 },
                  { name: '专业能力', score: 92, weight: 30 },
                  { name: '团队协作', score: 88, weight: 20 },
                  { name: '学习成长', score: 90, weight: 10 },
                ].map((item) => (
                  <div key={item.name}>
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground">
                          {item.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          (权重 {item.weight}%)
                        </span>
                      </div>
                      <span className="text-sm font-medium text-foreground">
                        {item.score} 分
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

            {/* AI Generated Comment */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>绩效评语</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={generateAIComment}
                  disabled={isGenerating}
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  {isGenerating ? '生成中...' : 'AI 生成评语'}
                </Button>
              </CardHeader>
              <CardContent>
                <textarea
                  rows={6}
                  value={aiComment}
                  onChange={(e) => setAiComment(e.target.value)}
                  placeholder="点击右上角按钮使用 AI 生成评语，或手动输入..."
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </CardContent>
            </Card>

            {/* Work Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>主要成绩</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
                  <li>主导完成核心产品前端架构升级，性能提升 40%</li>
                  <li>带领团队完成 3 个重点项目按时交付</li>
                  <li>编写技术文档 10 篇，进行技术分享 5 次</li>
                  <li>指导 2 名初级工程师快速成长</li>
                </ul>
              </CardContent>
            </Card>

            {/* Development Plan */}
            <Card>
              <CardHeader>
                <CardTitle>发展计划</CardTitle>
              </CardHeader>
              <CardContent>
                <textarea
                  rows={4}
                  placeholder="输入下季度发展计划和目标..."
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      <AIAssistant page="performance" />
    </div>
  )
}
